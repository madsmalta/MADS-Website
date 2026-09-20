"use client";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
 return <button className="back-to-top" type="button" onClick={() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  document.querySelector<HTMLAnchorElement>(".site-header .logo")?.focus({ preventScroll: true });
 }}>Back to top <ArrowUp size={18} aria-hidden="true" /></button>;
}
