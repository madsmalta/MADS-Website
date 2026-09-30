import "server-only";
import { checkEmail } from "@/lib/email-validation";

export const runtime = "nodejs";
import { NextResponse } from "next/server";

const emailPattern = /^\S+@\S+\.\S+$/;
const sameOrigin = (request: Request) => { const origin = request.headers.get("origin"); return !origin || new URL(origin).host === new URL(request.url).host; };
const text = (value: unknown, max = 160) => typeof value === "string" ? value.trim().slice(0, max) : "";
const webhookSettings = () => {
  try {
    const url = new URL(process.env.CONTACT_FORM_WEBHOOK_URL || "");
    return url.protocol === "https:" ? url : null;
  } catch { return null; }
};
const brevoSettings = () => {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  const recipient = process.env.CONTACT_TO_EMAIL;
  return apiKey && sender && recipient && emailPattern.test(sender) && emailPattern.test(recipient)
    ? { apiKey, sender, recipient }
    : null;
};

export function GET() {
  return NextResponse.json({
    configured: Boolean(webhookSettings() || brevoSettings()),
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "This request must come from the MADS website.", configured: false }, { status: 403 });
  let body: Record<string, unknown>; try { body = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "We could not read that form submission.", configured: false }, { status: 400 }); }
  const name = text(body.name, 120); const email = text(body.email, 254); const message = text(body.message, 5000);
  const category = text(body.category, 100) || "General enquiry";
  const course = text(body.course, 100);
  if (!name || !emailPattern.test(email) || !message || !body.consent) return NextResponse.json({ message: "Complete every required field and provide a valid email address.", configured: false }, { status: 400 });
  const emailStatus = await checkEmail(email);
  if (emailStatus !== "valid") return NextResponse.json({
    message: emailStatus === "invalid" ? "Check your email address: its format or domain is not valid for receiving email." : "We could not check your email domain just now. Please try again shortly.",
    configured: false,
    field: "email",
  }, { status: emailStatus === "invalid" ? 400 : 503 });
  const webhook = webhookSettings();
  const brevo = brevoSettings();
  if (!webhook && !brevo) return NextResponse.json({ message: "Enquiry delivery has not been configured. Your message was not sent.", configured: false }, { status: 503 });
  const subject = `MADS WEBSITE CONTACT FORM — ${category}`;
  let response: Response;
  try {
    if (webhook) {
      response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.CONTACT_FORM_API_KEY ? { Authorization: `Bearer ${process.env.CONTACT_FORM_API_KEY}` } : {}) }, body: JSON.stringify({ name, email, subject, message, category, course }), cache: "no-store", signal: AbortSignal.timeout(10000) });
    } else {
      response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevo!.apiKey, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          sender: { email: brevo!.sender, name: "MADS Website" },
          to: [{ email: brevo!.recipient, name: "MADS" }],
          replyTo: { email, name },
          subject,
          textContent: `Name: ${name}\nEmail: ${email}\n${course ? `Course: ${course}\n` : ""}Category: ${category}\n\nMessage:\n${message}`,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
    }
  } catch {
    return NextResponse.json({ message: "The enquiry service could not accept your message. Please try again later.", configured: true }, { status: 502 });
  }
  if (!response.ok) return NextResponse.json({ message: "The enquiry service could not accept your message. Please try again later.", configured: true }, { status: 502 });
  return NextResponse.json({ message: "Your enquiry was submitted to MADS.", configured: true });
}
