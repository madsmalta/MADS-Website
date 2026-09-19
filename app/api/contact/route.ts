import "server-only";
import { NextResponse } from "next/server";

const emailPattern = /^\S+@\S+\.\S+$/;
const sameOrigin = (request: Request) => { const origin = request.headers.get("origin"); return !origin || new URL(origin).host === new URL(request.url).host; };
const text = (value: unknown, max = 160) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "This request must come from the MADS website.", configured: false }, { status: 403 });
  let body: Record<string, unknown>; try { body = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "We could not read that form submission.", configured: false }, { status: 400 }); }
  const name = text(body.name, 120); const email = text(body.email, 254); const subject = text(body.subject, 180); const message = text(body.message, 5000);
  if (!name || !emailPattern.test(email) || !subject || !message || !body.consent) return NextResponse.json({ message: "Complete every required field and provide a valid email address.", configured: false }, { status: 400 });
  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ message: "The enquiry form is ready, but delivery has not been configured. Your message was not sent.", configured: false }, { status: 503 });
  let target: URL; try { target = new URL(webhook); } catch { return NextResponse.json({ message: "The enquiry delivery service is not configured correctly.", configured: false }, { status: 503 }); }
  if (target.protocol !== "https:") return NextResponse.json({ message: "The enquiry delivery service is not configured correctly.", configured: false }, { status: 503 });
  const response = await fetch(target, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.CONTACT_FORM_API_KEY ? { Authorization: `Bearer ${process.env.CONTACT_FORM_API_KEY}` } : {}) }, body: JSON.stringify({ name, email, subject, message, category: text(body.category, 100), course: text(body.course, 100) }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ message: "The enquiry service could not accept your message. Please try again later.", configured: false }, { status: 502 });
  return NextResponse.json({ message: "Your enquiry was sent to MADS.", configured: true });
}
