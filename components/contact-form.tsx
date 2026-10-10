"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

const categories = [
  "General enquiry",
  "Student concern",
  "Event suggestion",
  "Outreach collaboration",
  "Opportunities",
  "Privacy or photo request",
] as const;

type FieldName = "name" | "email" | "course" | "message" | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type DeliveryStatus = "checking" | "ready" | "unavailable" | "unknown";

type ContactFormProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const emailPattern = /^\S+@\S+\.\S+$/;

function validateControl(control: Control): string | undefined {
  if (control.name === "consent") return (control as HTMLInputElement).checked ? undefined : "Please confirm that MADS may use these details to reply.";
  if (control.name === "email") return !control.value.trim() ? "Enter your email address." : emailPattern.test(control.value.trim()) ? undefined : "Enter an email address in the format name@example.com.";
  if (control.name === "message") return !control.value.trim() ? "Write a message so MADS knows how to help." : undefined;
  return control.required && !control.value.trim() ? `Enter your ${control.name}.` : undefined;
}

function resizeMessage(control: HTMLTextAreaElement) {
  control.style.height = "auto";
  control.style.height = `${Math.max(170, control.scrollHeight)}px`;
}

function readResponse(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const result = value as { message?: unknown; configured?: unknown };
  return {
    message: typeof result.message === "string" ? result.message : "We could not confirm the result of your enquiry. Please try again.",
    configured: result.configured === true,
  };
}

export function FieldLabel({ children }: { children: string }) {
  return <>
    <span className="contact-field__label">{children}</span>
    <fieldset className="contact-field__outline" aria-hidden="true"><legend><span>{children}</span></legend></fieldset>
  </>;
}

export function ContactForm({ category, onCategoryChange }: ContactFormProps) {
  const formId = useId();
  const controls = useRef<Partial<Record<FieldName, Control>>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [delivery, setDelivery] = useState<DeliveryStatus>("checking");
  const needsCourse = category !== "Outreach collaboration";

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    fetch("/api/contact", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as { configured?: unknown };
        if (!response.ok || typeof result.configured !== "boolean") throw new Error("Invalid availability response");
        if (active) setDelivery(result.configured ? "ready" : "unavailable");
      })
      .catch(() => {
        if (active) setDelivery("unknown");
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const message = controls.current.message;
      if (message instanceof HTMLTextAreaElement) resizeMessage(message);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function setControlRef(name: FieldName, control: Control | null) {
    if (control) controls.current[name] = control;
    else delete controls.current[name];
  }

  function updateError(control: Control, show = true) {
    const name = control.name as FieldName;
    if (!(name in controls.current) || (!show && !touched[name])) return;
    const error = validateControl(control);
    setErrors((current) => ({ ...current, [name]: error }));
  }

  function handleBlur(control: Control) {
    const name = control.name as FieldName;
    if (!(name in controls.current)) return;
    setTouched((current) => ({ ...current, [name]: true }));
    updateError(control, true);
  }

  function handleInput(control: Control) {
    const name = control.name as FieldName;
    if (touched[name] || errors[name]) updateError(control, true);
    if (control instanceof HTMLTextAreaElement) {
      resizeMessage(control);
    }
  }

  function validateForm() {
    const nextErrors: FieldErrors = {};
    (["name", "email", "course", "message", "consent"] as FieldName[]).forEach((name) => {
      if (name === "course" && !needsCourse) return;
      const control = controls.current[name];
      if (!control) return;
      const error = validateControl(control);
      if (error) nextErrors[name] = error;
    });
    setTouched({ name: true, email: true, course: true, message: true, consent: true });
    setErrors(nextErrors);
    return nextErrors;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading" || delivery === "unavailable") return;
    const form = event.currentTarget;

    setState("idle");
    setMessage("");
    const nextErrors = validateForm();
    const firstError = (["name", "email", "course", "message", "consent"] as FieldName[]).find((name) => nextErrors[name]);
    if (firstError) {
      controls.current[firstError]?.focus();
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    setState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });
      const result = readResponse(await response.json().catch(() => null));
      if (!result) throw new Error("Invalid form response");
      if (response.ok && result.configured) {
        form.reset();
        setErrors({});
        setTouched({});
        setState("success");
      } else {
        setState("error");
      }
      setMessage(result.message);
    } catch {
      setState("error");
      setMessage("We could not send your enquiry. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const fieldClass = (name: FieldName, extra = "") => `contact-field ${errors[name] ? "contact-field--error" : touched[name] ? "contact-field--valid" : ""} ${extra}`.trim();
  const describedBy = (name: FieldName) => errors[name] ? `${formId}-${name}-error` : undefined;

  return <form onSubmit={submit} className="contact-form" noValidate>
    <fieldset className="contact-form__fields" disabled={delivery === "checking" || delivery === "unavailable"}>
    <div className="form-pair">
      <div className="contact-field-group"><label className={fieldClass("name")}><FieldLabel>Name</FieldLabel><input ref={(control) => setControlRef("name", control)} className="contact-field__control" required name="name" autoComplete="name" placeholder=" " aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} onBlur={(event) => handleBlur(event.currentTarget)} onInput={(event) => handleInput(event.currentTarget)} /></label>{errors.name && <p className="contact-field-feedback" id={`${formId}-name-error`}>{errors.name}</p>}</div>
      <div className="contact-field-group"><label className={fieldClass("email")}><FieldLabel>Email</FieldLabel><input ref={(control) => setControlRef("email", control)} className="contact-field__control" required type="email" name="email" autoComplete="email" inputMode="email" placeholder=" " aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} onBlur={(event) => handleBlur(event.currentTarget)} onInput={(event) => handleInput(event.currentTarget)} /></label>{errors.email && <p className="contact-field-feedback" id={`${formId}-email-error`}>{errors.email}</p>}</div>
    </div>
    <div className={`form-pair ${needsCourse ? "" : "form-pair--single"}`}>
      {needsCourse && <div className="contact-field-group"><label className={fieldClass("course")}><FieldLabel>Course (optional)</FieldLabel><input ref={(control) => setControlRef("course", control)} className="contact-field__control" name="course" maxLength={100} placeholder=" " aria-invalid={Boolean(errors.course)} aria-describedby={describedBy("course")} onBlur={(event) => handleBlur(event.currentTarget)} onInput={(event) => handleInput(event.currentTarget)} /></label>{errors.course && <p className="contact-field-feedback" id={`${formId}-course-error`}>{errors.course}</p>}</div>}
      <div className="contact-field-group"><label className="contact-field contact-field--select"><FieldLabel>Enquiry category</FieldLabel><select className="contact-field__control" name="category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label></div>
    </div>
    <div className="contact-field-group"><label className={fieldClass("message", "contact-field--textarea")}><FieldLabel>Message</FieldLabel><textarea ref={(control) => setControlRef("message", control)} className="contact-field__control" required name="message" rows={6} maxLength={5000} placeholder=" " aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} onBlur={(event) => handleBlur(event.currentTarget)} onInput={(event) => handleInput(event.currentTarget)} /></label>{errors.message && <p className="contact-field-feedback" id={`${formId}-message-error`}>{errors.message}</p>}</div>
    <label className={`checkbox ${errors.consent ? "checkbox--error" : ""}`}><input ref={(control) => setControlRef("consent", control)} required type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} onChange={(event) => updateError(event.currentTarget, true)} /> <span>I agree that MADS may use these details to respond to this enquiry.</span></label>
    {errors.consent && <p className="contact-field-feedback" id={`${formId}-consent-error`}>{errors.consent}</p>}
    </fieldset>
    <p className="form-privacy-link"><Link href="/privacy">Privacy policy</Link></p>
    <button className="button button--dark" disabled={state === "loading" || delivery === "unavailable"}>{state === "loading" ? "Sending…" : delivery === "checking" ? "Checking availability…" : delivery === "unavailable" ? "Enquiries unavailable" : "Send enquiry"}</button>
    {state !== "idle" && <p aria-live="polite" className={state === "success" ? "form-success" : "form-error"}>{message}</p>}
  </form>;
}
