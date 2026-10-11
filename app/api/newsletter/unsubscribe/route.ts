import "server-only";
import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { boundedText, hasOnlyFields, isSameOrigin, readLimitedJson } from "@/lib/form-security";
import { visitorKey } from "@/lib/local-form-limit";
import { formRateLimit } from "@/lib/form-rate-limit";

export const runtime = "nodejs";

const reply = (message: string, status = 200) =>
  NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV === "preview") return reply("Unsubscribing is unavailable on preview sites. Please use the public MADS website.", 503);
  if (!isSameOrigin(request)) return reply("This request must come from the MADS website.", 403);

  const parsed = await readLimitedJson(request, 1024);
  if ("status" in parsed) return reply("We could not read that request.", parsed.status);
  if (!hasOnlyFields(parsed.body, ["email", "mads_hp_url"]) || parsed.body.mads_hp_url) return reply("We could not read that request.", 400);
  const email = boundedText(parsed.body.email, 254)?.toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n\x00-\x1f]/.test(email)) {
    return reply("Enter a valid email address.", 400);
  }

  if (process.env.VERCEL) {
    try {
      if ((await checkBotId()).isBot) return reply("We could not verify this request. Please try again later.", 403);
    } catch {
      return reply("We could not verify this request. Please try again later.", 503);
    }
  }

  try {
    const limit = await formRateLimit("newsletter-ip", visitorKey(request));
    if (!limit.allowed) return NextResponse.json({ message: "Too many attempts. Please try again later." }, {
      status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(limit.retryAfter) },
    });
  } catch {
    return reply("Unsubscribing is temporarily unavailable. Please try again later.", 503);
  }

  const listId = Number(process.env.BREVO_LIST_ID);
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || !Number.isSafeInteger(listId) || listId <= 0) {
    return reply("Unsubscribing is temporarily unavailable.", 503);
  }

  let response: Response;
  try {
    response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ unlinkListIds: [listId] }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return reply("We could not process this request right now. Please try again later.", 502);
  }

  // An unknown address is treated the same as a subscribed one to avoid revealing list membership.
  if (response.ok || response.status === 404) {
    return reply("If that address was subscribed to The Molar, it has been removed from the mailing list.");
  }
  console.error("Brevo unsubscribe failed", { status: response.status });
  return reply("We could not process this request right now. Please try again later.", 502);
}
