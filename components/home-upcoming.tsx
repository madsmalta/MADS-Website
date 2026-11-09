"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarPlus, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type HomeUpcomingEvent = {
  slug: string;
  title: string;
  location: string;
  locationHref: string | null;
  dateLabel: string;
  timeLabel: string;
  ticketUrl?: string;
};

const ROTATION_MS = 6_000;

export function HomeUpcoming({ events }: { events: HomeUpcomingEvent[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [timerReset, setTimerReset] = useState(0);
  const [manualSelection, setManualSelection] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (events.length < 2 || reducedMotion || !inView || !pageVisible) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % events.length);
      setManualSelection(false);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [events.length, reducedMotion, inView, pageVisible, timerReset]);

  const selectEvent = (offset: number) => {
    setCurrent((index) => (index + offset + events.length) % events.length);
    setManualSelection(true);
    setTimerReset((count) => count + 1);
  };

  return <div
    ref={container}
    className="quiet-state home-upcoming"
    data-scroll-reveal
    role={events.length > 1 ? "region" : undefined}
    aria-roledescription={events.length > 1 ? "carousel" : undefined}
    aria-label={events.length > 1 ? "Upcoming events" : undefined}
  >
    {events.length ? <>
      <div className="home-upcoming-track">
        {events.map((event, index) => {
          const active = index === current;
          return <article
            className={`home-upcoming-item home-upcoming-slide${active ? " is-active" : ""}`}
            aria-roledescription={events.length > 1 ? "slide" : undefined}
            aria-label={events.length > 1 ? `${index + 1} of ${events.length}` : undefined}
            aria-hidden={!active}
            key={event.slug}
          >
            <p className="home-event-date">{event.dateLabel} · {event.timeLabel}</p>
            <h3>{event.title}</h3>
            <p>
              {event.locationHref ? <a className="event-location-link home-event-location" href={event.locationHref} target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" />{event.location}</a> : <span className="home-event-location"><MapPin size={20} aria-hidden="true" />{event.location}</span>}
            </p>
            {event.ticketUrl ? <div className="home-upcoming-actions">
              <a className="button button--outline" href={event.ticketUrl} target="_blank" rel="noopener noreferrer">Buy tickets here</a>
              <Link className="home-upcoming-details-link" href={`/events/${event.slug}`} scroll={false}>Event details <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div> : <Link className="button button--outline" href={`/events/${event.slug}`} scroll={false}>Event details</Link>}
          </article>;
        })}
      </div>
      {events.length > 1 && <div className="home-upcoming-controls">
        <button type="button" aria-label="Previous event" onClick={() => selectEvent(-1)}><ChevronLeft size={19} aria-hidden="true" /></button>
        <button type="button" aria-label="Next event" onClick={() => selectEvent(1)}><ChevronRight size={19} aria-hidden="true" /></button>
        <span className="home-upcoming-announcement" role="status">{manualSelection ? `Showing ${events[current].title}, ${current + 1} of ${events.length}` : ""}</span>
      </div>}
    </> : <>
      <CalendarPlus size={28} aria-hidden="true" />
      <h3>No upcoming events yet</h3>
      <p>We’ll share the next MADS gathering here as soon as its details are ready.</p>
      <Link className="button button--outline" href="/events">View events & calendar</Link>
    </>}
  </div>;
}
