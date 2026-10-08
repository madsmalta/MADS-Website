import "server-only";
import { NextResponse } from "next/server";
import { checkEmail } from "@/lib/email-validation";

export const runtime = "nodejs";

const text = (value: unknown, max = 160) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

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
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json("This request must come from the MADS website.", false, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json("We could not read that form submission.", false, 400);
  }

  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  if (!name || !email || body.consent !== "on") {
    return json("Enter your name, a valid email and consent to continue.", false, 400);
  }

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
    return json("We could not start your subscription. Please try again later.", true, 502);
  }

  if (!response.ok) {
    return json("We could not start your subscription. Please try again later.", true, 502);
  }

  return json("Please check your inbox and confirm your subscription to The Molar.", true);
}
