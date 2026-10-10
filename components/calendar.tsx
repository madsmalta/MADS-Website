"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventMountArg } from "@fullcalendar/core";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { EventItem } from "@/data/site";
import { formatEventTimeRange } from "@/lib/event-format";
import { eventDisplayStatus, formatEventDate } from "@/lib/events";

type Preview = { event: EventItem; anchor: HTMLElement };

function EventPreview({ preview, id, keepOpen, leave }: {
 preview: Preview; id: string; keepOpen: () => void; leave: () => void;
}) {
 const panel = useRef<HTMLDivElement>(null);
 useLayoutEffect(() => {
  const el = panel.current;
  if (!el) return;
  const anchor = preview.anchor.getBoundingClientRect();
  const width = el.offsetWidth, height = el.offsetHeight, margin = 12;
  const left = Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin));
  const below = anchor.bottom + 8;
  const top = below + height <= window.innerHeight - margin
   ? below : Math.max(margin, anchor.top - height - 8);
  el.style.left = left + "px";
  el.style.top = top + "px";
  el.style.visibility = "visible";
 }, [preview]);
 const event = preview.event;
 const timed = event.date.includes("T");
 return createPortal(
  <div ref={panel} id={id} role="tooltip" className="calendar-tooltip" onPointerEnter={keepOpen} onPointerLeave={leave}>
   <p className="calendar-tooltip-category">{event.category} · {eventDisplayStatus(event)}</p>
   <h3>{event.title}</h3>
   <div className="calendar-tooltip-details">
    <p>{formatEventDate(event, { weekday:"long", day:"numeric", month:"long", year:"numeric" })}<br/>{timed ? `${formatEventTimeRange(event)} Malta time` : "All day"}</p>
    <p>{event.location || "Location to be confirmed"}</p>
   </div>
   <p className="calendar-tooltip-description">{event.description}</p>
  </div>, document.body
 );
}

export function Calendar({ events, initialDate }: { events: EventItem[]; initialDate?: string }) {
 const [preview, setPreview] = useState<Preview | null>(null);
 const id = useId();
 const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const active = useRef<HTMLElement | null>(null);
 const cleanups = useRef(new Map<HTMLElement, () => void>());
 const cancelTimers = useCallback(() => {
  if (openTimer.current) clearTimeout(openTimer.current);
  if (closeTimer.current) clearTimeout(closeTimer.current);
 }, []);
 const dismiss = useCallback(() => {
  cancelTimers();
  active.current?.removeAttribute("aria-describedby");
  active.current = null;
  setPreview(null);
 }, [cancelTimers]);
 const leave = useCallback(() => {
  cancelTimers();
  closeTimer.current = setTimeout(dismiss, 180);
 }, [cancelTimers, dismiss]);
 const mount = useCallback((info: EventMountArg) => {
  const el = info.el;
  const anchor = el.matches("a") ? el : el.querySelector<HTMLAnchorElement>("a[href]") || el;
  const show = (delay: number) => {
   cancelTimers();
   openTimer.current = setTimeout(() => {
    active.current?.removeAttribute("aria-describedby");
    active.current = anchor;
    anchor.setAttribute("aria-describedby", id);
    setPreview({ event: info.event.extendedProps.details as EventItem, anchor: el });
   }, delay);
  };
  const enter = (e: PointerEvent) => { if (e.pointerType !== "touch") show(140); };
  const focus = () => show(0);
  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointerleave", leave);
  el.addEventListener("focusin", focus);
  el.addEventListener("focusout", leave);
  el.addEventListener("click", dismiss);
  cleanups.current.set(el, () => {
   el.removeEventListener("pointerenter", enter);
   el.removeEventListener("pointerleave", leave);
   el.removeEventListener("focusin", focus);
   el.removeEventListener("focusout", leave);
   el.removeEventListener("click", dismiss);
   anchor.removeAttribute("aria-describedby");
  });
 }, [cancelTimers, dismiss, id, leave]);
 useEffect(() => {
  const key = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
  const scroll = (e: Event) => {
   if (e.target instanceof Element && e.target.closest(".calendar-tooltip")) return;
   dismiss();
  };
  document.addEventListener("keydown", key);
  window.addEventListener("scroll", scroll, true);
  window.addEventListener("resize", dismiss);
  return () => {
   cancelTimers();
   document.removeEventListener("keydown", key);
   window.removeEventListener("scroll", scroll, true);
   window.removeEventListener("resize", dismiss);
  };
 }, [cancelTimers, dismiss]);
 const calendarEvents = useMemo(() => events.map(event => ({
  id: event.slug, title: event.status === "Cancelled" ? `${event.title} — Cancelled` : event.title, start: `${event.date}${event.utcOffset}`, end: event.end ? `${event.end}${event.utcOffset}` : undefined,
  url: `/events/${event.slug}`, classNames: [`category-${event.category.toLowerCase()}`, ...(event.slug === "christmas-gala-2026" ? ["calendar-event-centered"] : [])],
  extendedProps: { details: event },
 })), [events]);
 const unmount = useCallback((info: EventMountArg) => {
  cleanups.current.get(info.el)?.();
  cleanups.current.delete(info.el);
  dismiss();
 }, [dismiss]);
 return <div className="calendar-wrap">
  <FullCalendar
   plugins={[dayGridPlugin]} initialDate={initialDate} initialView="dayGridMonth" timeZone="Europe/Malta"
   headerToolbar={{ left:"title", center:"", right:"prev,next" }}
   displayEventTime={false}
   events={calendarEvents}
   eventDidMount={mount}
   eventWillUnmount={unmount}
   datesSet={dismiss}
   height="auto"
  />
  {preview && <EventPreview preview={preview} id={id} keepOpen={cancelTimers} leave={leave}/>}
 </div>;
}
