import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Calendar } from "@/components/calendar";
import { EventCard } from "@/components/event-card";
import { publicEvents } from "@/data/site";
import { partitionEvents } from "@/lib/events";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.events;
export const dynamic = "force-dynamic";

export default function Events() {
  const { upcoming, updates, past } = partitionEvents(publicEvents);
  return <PageShell>
    <section className="page-hero shell" data-dental-icon="syringe">
      <p className="eyebrow">Events & calendar</p>
      <h1>See what’s on</h1>
      <p>Find the next MADS gathering below.<br/>Follow the MADS Google Calendar to keep up with what’s coming.</p>
      <div className="hero-actions">
        <Link className="button button--dark" href="/events/subscribe"><CalendarPlus size={17} /> Follow our Google Calendar</Link>
      </div>
    </section>
    <section className="shell section compact-section" id="calendar-status"><Calendar events={[...upcoming, ...updates.filter(event => event.status === "Cancelled"), ...past]} initialDate={upcoming[0]?.date.slice(0, 10)} /></section>
    <section className="shell section">
      <div className="section-heading" data-scroll-reveal><h2>Upcoming</h2></div>
      {upcoming.length ? <div className="event-stack">{upcoming.map(event => <EventCard key={event.slug} event={event} />)}</div> : <div className="event-empty-state"><p>No upcoming events have been announced yet. Check back soon or subscribe to The Molar for updates.</p></div>}
    </section>
    {updates.length > 0 && <section className="shell section compact-section"><div className="section-heading" data-scroll-reveal><h2>Event updates</h2></div><div className="event-stack">{updates.map(event => <EventCard key={event.slug} event={event} />)}</div></section>}
    {past.length > 0 && <section className="shell section compact-section"><div className="section-heading" data-scroll-reveal><h2>Past events</h2></div><div className="event-stack">{past.map(event => <EventCard key={event.slug} event={event} />)}</div></section>}
  </PageShell>;
}
