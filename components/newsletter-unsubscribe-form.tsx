"use client";

import { FormEvent, useState } from "react";

export function NewsletterUnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result: { message?: string } = await response.json();
      setMessage(result.message ?? "We could not process this request. Please try again later.");
      setStatus(response.ok ? "success" : "error");
    } catch {
      setMessage("We could not process this request. Please try again later.");
      setStatus("error");
    }
  }

  const subject = encodeURIComponent("Unsubscribe from The Molar");
  return <div className="unsubscribe-form-wrap">
    {status === "success" ? <p className="unsubscribe-result unsubscribe-result--success" role="status">{message}</p> : <>
      <form className="unsubscribe-form" onSubmit={submit}>
        <label htmlFor="unsubscribe-email">Email used for The Molar</label>
        <input id="unsubscribe-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
        <button className="button button--dark" disabled={status === "loading"} type="submit">{status === "loading" ? "Processing…" : "Unsubscribe"}</button>
      </form>
      {status === "error" && <p className="unsubscribe-result unsubscribe-result--error" role="alert">{message} Email <a href={`mailto:info@mads.org.mt?subject=${subject}`}>info@mads.org.mt</a></p>}
    </>}
  </div>;
}
