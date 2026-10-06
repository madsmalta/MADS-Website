import { googleCalendarSubscriptionUrl } from "@/data/calendar";
import { CalendarPlus, Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Calendar } from "@/components/calendar";
import { EventCard } from "@/components/event-card";
import { publicEvents } from "@/data/site";
import { sectionMetadata } from "@/lib/seo";
export const metadata = sectionMetadata.events;
export default function Events() { return <PageShell><section className="page-hero shell" data-dental-icon="syringe"><p className="eyebrow">Events & calendar</p><h1>See what’s on</h1><p>Find the next MADS gathering below.<br/>Add the MADS Google Calendar to keep up with what’s coming.</p><div className="hero-actions"><a className="button button--dark" href={process.env.NEXT_PUBLIC_MADS_CALENDAR_SUBSCRIPTION_URL || googleCalendarSubscriptionUrl} target="_blank" rel="noopener noreferrer"><CalendarPlus size={17} /> Add to Google Calendar</a>{process.env.NEXT_PUBLIC_MADS_CALENDAR_ICS_URL && <a className="button button--outline" href={process.env.NEXT_PUBLIC_MADS_CALENDAR_ICS_URL}><Download size={17} /> Apple & Outlook (ICS)</a>}</div></section><section className="shell section compact-section" id="calendar-status"><Calendar events={publicEvents} /></section><section className="shell section"><div className="section-heading" data-scroll-reveal><div><h2>Upcoming</h2></div></div><div className="event-stack">{publicEvents.map((event) => <EventCard key={event.slug} event={event} />)}</div></section></PageShell>; }
