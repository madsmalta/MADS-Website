"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { FieldLabel } from "./contact-form";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [validity, setValidity] = useState<Record<string, boolean>>({});
  function validate(input: HTMLInputElement) {
    setValidity(current => ({ ...current, [input.name]: input.checkValidity() && Boolean(input.value.trim()) }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form)),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json() as { message: string; configured: boolean };
      setState(response.ok && result.configured ? "success" : "error");
      setMessage(result.message);
    } catch {
      setState("error");
      setMessage("We could not start your subscription. Please try again later.");
    }
  }

  return <section className="newsletter" id="newsletter">
    <div data-scroll-reveal><h2 className="newsletter-title">The Molar</h2><p className="newsletter-tagline">Keep the useful things close</p><p>Updates on MADS events, opportunities and news.</p></div>
    <form onSubmit={submit}>
      <label className={`contact-field ${validity.name === undefined ? "" : validity.name ? "contact-field--valid" : "contact-field--error"}`}><FieldLabel>Name</FieldLabel><input className="contact-field__control" required name="name" autoComplete="name" placeholder=" " aria-invalid={validity.name === false} onBlur={event => validate(event.currentTarget)} onInput={event => { if (validity.name !== undefined) validate(event.currentTarget); }} /></label>
      <label className={`contact-field ${validity.email === undefined ? "" : validity.email ? "contact-field--valid" : "contact-field--error"}`}><FieldLabel>Email</FieldLabel><input className="contact-field__control" required type="email" name="email" autoComplete="email" placeholder=" " aria-invalid={validity.email === false} onBlur={event => validate(event.currentTarget)} onInput={event => { if (validity.email !== undefined) validate(event.currentTarget); }} /></label>
      <label className="checkbox"><input required type="checkbox" name="consent" /> <span>I agree to receive The Molar and understand I can unsubscribe at any time.</span></label>
      <button className="button button--light" disabled={state === "loading"}>{state === "loading" ? "Checking…" : "Subscribe"}</button>
      {state === "success" && <p aria-live="polite" className="form-success newsletter-confirmation">Check your inbox to confirm <span>The Molar.</span></p>}
      {state === "error" && <p aria-live="polite" className="form-error">{message}</p>}
      <small>Read our <Link href="/privacy">Privacy notice</Link>.</small>
    </form>
  </section>;
}
