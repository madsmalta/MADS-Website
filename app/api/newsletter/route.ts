import "server-only";
import { NextResponse } from "next/server";
import { checkEmail } from "@/lib/email-validation";
import { boundedText, hasOnlyFields, isSameOrigin, readLimitedJson } from "@/lib/form-security";
import { localLimit, releaseLocalLimit, visitorKey } from "@/lib/local-form-limit";
import { checkBotId } from "botid/server";

export const runtime = "nodejs";

const positiveId = (value: string | undefined) => {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

const brevoSettings = () => {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = positiveId(process.env.BREVO_LIST_ID);
  const templateId = positiveId(process.env.BREVO_DOI_TEMPLATE_ID);
  const redirect = process.env.BREVO_DOI_REDIRECT_URL;
  if (!apiKey || !listId || !templateId || !redirect) return null;

  try {
    const url = new URL(redirect);
    if (url.protocol !== "https:") return null;
    return { apiKey, listId, templateId, redirect: url.toString() };
  } catch {
    return null;
  }
};

const json = (message: string, configured: boolean, status = 200) =>
  NextResponse.json({ message, configured }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json("This request must come from the MADS website.", false, 403);
  }
  const parsed = await readLimitedJson(request, 2048);
  if ("status" in parsed) return json("We could not read that form submission.", false, parsed.status);
  const body = parsed.body;
  if (!hasOnlyFields(body, ["name", "email", "consent", "mads_hp_url"]) ||
      (body.mads_hp_url !== undefined && body.mads_hp_url !== "")) {
    return json("We could not read that form submission.", false, 400);
  }
  const name = boundedText(body.name, 120);
  const email = boundedText(body.email, 254)?.toLowerCase();
  if (!name || !email || body.consent !== "on" || /[\r\n\x00-\x1f]/.test(name)) {
    return json("Enter your name, a valid email and consent to continue.", false, 400);
  }

  if (process.env.VERCEL) {
    try {
      if ((await checkBotId()).isBot) return json("We could not verify this request. Please try again later.", false, 403);
    } catch {
      return json("We could not verify this request. Please try again later.", false, 503);
    }
  }

  const visitor = localLimit("newsletter-ip", visitorKey(request), 20, 10 * 60_000);
  if (!visitor.allowed) return NextResponse.json({
    message: "Too many subscription attempts were made recently. Please try again later.", configured: true,
  }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(visitor.retryAfter) } });

  const emailStatus = await checkEmail(email);
  if (emailStatus !== "valid") {
    return NextResponse.json({
      message: emailStatus === "invalid"
        ? "Check your email address: its format or domain is not valid for receiving email."
        : "We could not check your email domain just now. Please try again shortly.",
      configured: false,
      field: "email",
    }, { status: emailStatus === "invalid" ? 400 : 503, headers: { "Cache-Control": "no-store" } });
  }

  const brevo = brevoSettings();
  if (!brevo) {
    return json("The Molar is not connected to Brevo yet. Your details were not saved.", false, 503);
  }
  const recipient = localLimit("newsletter-email", email, 1, 10 * 60_000);
  if (!recipient.allowed) return NextResponse.json({
    message: "A confirmation email was requested recently. Please check your inbox before trying again.", configured: true,
  }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(recipient.retryAfter) } });

  let response: Response;
  try {
    response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: { "api-key": brevo.apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        includeListIds: [brevo.listId],
        templateId: brevo.templateId,
        redirectionUrl: brevo.redirect,
        contactPixelTrackingConsent: false,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    releaseLocalLimit("newsletter-email", email);
    return json("We could not start your subscription. Please try again later.", true, 502);
  }

  if (!response.ok) {
    releaseLocalLimit("newsletter-email", email);
    // The provider may echo submitted details. Log only the status, never its body.
    console.error("Brevo DOI failed", { status: response.status });
    return json("We could not start your subscription. Please try again later.", true, 502);
  }

  return json("Please check your inbox and confirm your subscription to The Molar.", true);
}
