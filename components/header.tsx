"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarPlus, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { siteRoutes } from "@/data/site";

export function Header() {
 const [open, setOpen] = useState(false);
 const path = usePathname();
 const toggle = useRef<HTMLButtonElement>(null);
 const header = useRef<HTMLElement>(null);
 const menu = useRef<HTMLElement>(null);

 useEffect(() => {
  const logo = header.current?.querySelector<HTMLAnchorElement>(".logo");
  const goHome = () => { setOpen(false); if (path === "/") window.scrollTo({ top: 0, behavior: "instant" }); };
  logo?.addEventListener("click", goHome);
  return () => logo?.removeEventListener("click", goHome);
 }, [path]);

 useEffect(() => {
  let last = window.scrollY, distance = 0, direction = 0, frame = 0;
  const update = () => {
   frame = 0;
   const y = Math.max(0, window.scrollY);
   const delta = y - last;
   last = y;
   if (open || y < 110) { header.current?.classList.remove("header-hidden"); distance = 0; return; }
   const next = Math.sign(delta);
   if (next !== direction) { distance = 0; direction = next; }
   distance += delta;
   if (distance > 65) header.current?.classList.add("header-hidden");
   if (distance < -22) header.current?.classList.remove("header-hidden");
  };
  const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  header.current?.classList.remove("header-hidden");
  window.addEventListener("scroll", scroll, { passive: true });
  return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
 }, [open, path]);

 useEffect(() => {
  if (!open) return;
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  menu.current?.scrollTo({ top: 0 });
  const focusFrame = requestAnimationFrame(() => menu.current?.focus({ preventScroll: true }));
  const close = (event: KeyboardEvent) => {
   if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
   if (event.key !== "Tab") return;
   const focusable = Array.from(header.current?.querySelectorAll<HTMLElement>('a:not([tabindex="-1"]), button:not([disabled])') ?? []);
   const first = focusable[0], last = focusable.at(-1);
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
   if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
  document.addEventListener("keydown", close);
  window.addEventListener("resize", onResize);
  return () => {
   document.body.style.overflow = previousOverflow;
   cancelAnimationFrame(focusFrame);
   document.removeEventListener("keydown", close);
   window.removeEventListener("resize", onResize);
  };
 }, [open]);

 return <header ref={header} className="site-header" data-menu-open={open}>
  <div className="header-inner">
   <Logo />
   <nav className="desktop-nav" aria-label="Primary navigation">{siteRoutes.map(route => <Link key={route.href} href={route.href} scroll={false} aria-current={path === route.href ? "page" : undefined}>{route.label}</Link>)}</nav>
   <div className="header-actions">
    <Link className="calendar-link" href="/events#calendar-status" onClick={() => setOpen(false)}><CalendarPlus size={18} />Calendar</Link>
    <button ref={toggle} className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
   </div>
  </div>
  <nav ref={menu} id="mobile-navigation" className="mobile-menu" data-open={open} aria-label="Mobile navigation" aria-hidden={!open} inert={!open} tabIndex={-1}>
   <div className="mobile-menu-inner">
    <div className="mobile-menu-links">{siteRoutes.map(route => <Link key={route.href} className="mobile-menu-link" href={route.href} scroll={false} aria-current={path === route.href ? "page" : undefined} onClick={() => setOpen(false)}>{route.label}</Link>)}</div>
    <div className="mobile-menu-footer"><span>Malta Association of Dental Students</span><SocialLinks /></div>
   </div>
  </nav>
 </header>;
}
