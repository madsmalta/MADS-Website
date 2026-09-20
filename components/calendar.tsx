"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import type { EventMountArg } from "@fullcalendar/core";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { EventItem } from "@/data/site";

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
 const date = new Date(event.date);
 const day = new Intl.DateTimeFormat("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
 const time = new Intl.DateTimeFormat("en-GB", { hour:"2-digit", minute:"2-digit" });
 const timed = event.date.includes("T");
 return createPortal(
  <div ref={panel} id={id} role="tooltip" className="calendar-tooltip" onPointerEnter={keepOpen} onPointerLeave={leave}>
   <p className="calendar-tooltip-category">{event.category} · {event.status}</p>
   <h3>{event.title}</h3>
   <dl>
    <div><dt>When</dt><dd>{day.format(date)}<br/>{timed ? time.format(date) + (event.end ? " – " + (event.end.slice(0,10) !== event.date.slice(0,10) ? day.format(new Date(event.end)) + ", " : "") + time.format(new Date(event.end)) : "") : "All day"}</dd></div>
    <div><dt>Where</dt><dd>{event.location || "Location to be confirmed"}</dd></div>
   </dl>
   <p className="calendar-tooltip-description">{event.description}</p>
   <span className="calendar-tooltip-hint">Click the event to open its page</span>
  </div>, document.body
 );
}

export function Calendar({ events }: { events: EventItem[] }) {
 const [category, setCategory] = useState("All");
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
 const categories = ["All", ...Array.from(new Set(events.map(event => event.category)))];
 const visible = useMemo(() => category === "All" ? events : events.filter(event => event.category === category), [category, events]);
 const calendarEvents = useMemo(() => visible.map(event => ({
  id: event.slug, title: event.title.replace("Sample: ", ""), start: event.date, end: event.end,
  url: `/events/${event.slug}`, classNames: [`category-${event.category.toLowerCase()}`],
  extendedProps: { details: event },
 })), [visible]);
 const unmount = useCallback((info: EventMountArg) => {
  cleanups.current.get(info.el)?.();
  cleanups.current.delete(info.el);
  dismiss();
 }, [dismiss]);
 const initialView = typeof window !== "undefined" && window.innerWidth < 640 ? "listMonth" : "dayGridMonth";
 return <div className="calendar-wrap">
  <div className="calendar-filters" aria-label="Filter calendar events"><span>Show</span>{categories.map(item =>
   <button key={item} onClick={() => { dismiss(); setCategory(item); }} className={category === item ? "active" : ""} aria-pressed={category === item}>{item}</button>
  )}</div>
  <FullCalendar
   plugins={[dayGridPlugin, listPlugin]} initialDate={events[0]?.date} initialView={initialView}
   headerToolbar={{ left:"title", center:"", right:"dayGridMonth,listMonth" }}
   buttonText={{ dayGridMonth:"Month", listMonth:"Agenda" }}
   events={calendarEvents}
   eventDidMount={mount}
   eventWillUnmount={unmount}
   datesSet={dismiss}
   height="auto" noEventsContent="No public events match this filter yet."
  />
  {preview && <EventPreview preview={preview} id={id} keepOpen={cancelTimers} leave={leave}/>}
 </div>;
}
