import "server-only";
import { checkEmail } from "@/lib/email-validation";

export const runtime = "nodejs";
import { NextResponse } from "next/server";

const emailPattern = /^\S+@\S+\.\S+$/;
const sameOrigin = (request: Request) => { const origin = request.headers.get("origin"); return !origin || new URL(origin).host === new URL(request.url).host; };
const text = (value: unknown, max = 160) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "This request must come from the MADS website.", configured: false }, { status: 403 });
  let body: Record<string, unknown>; try { body = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "We could not read that form submission.", configured: false }, { status: 400 }); }
  const name = text(body.name, 120); const email = text(body.email, 254);
  if (!name || !emailPattern.test(email) || !body.consent) return NextResponse.json({ message: "Enter your name, a valid email and consent to continue.", configured: false }, { status: 400 });
  const emailStatus = await checkEmail(email);
  if (emailStatus !== "valid") return NextResponse.json({
    message: emailStatus === "invalid" ? "Check your email address: its format or domain is not valid for receiving email." : "We could not check your email domain just now. Please try again shortly.",
    configured: false,
    field: "email",
  }, { status: emailStatus === "invalid" ? 400 : 503 });
  const listId = Number(process.env.BREVO_LIST_ID); const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || !Number.isSafeInteger(listId) || listId < 1) return NextResponse.json({ message: "The form is ready, but The Molar is not connected to Brevo yet. Your details were not saved.", configured: false }, { status: 503 });
  const response = await fetch("https://api.brevo.com/v3/contacts", { method: "POST", headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, listIds: [listId], updateEnabled: false, attributes: { FNAME: name } }), cache: "no-store" });
  if (response.ok) return NextResponse.json({ message: "Subscription accepted. Please check your inbox to confirm it if double opt-in is enabled.", configured: true });
  if (response.status === 400) return NextResponse.json({ message: "This email may already be subscribed. Please check your inbox or use the unsubscribe link there.", configured: false }, { status: 409 });
  return NextResponse.json({ message: "The newsletter service could not accept your subscription. Please try again later.", configured: false }, { status: 502 });
}
