import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { publicEvents } from "@/data/site";
import { formatEventTimeRange } from "@/lib/event-format";
import { getEventLocationUrl } from "@/lib/event-location";
import { absoluteUrl, breadcrumbSchema, pageMetadata, siteName } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return publicEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = publicEvents.find((item) => item.slug === slug);
  if (!event) notFound();
  return pageMetadata({ title: `${event.title} — MADS Event in Malta`, description: `${event.description} Venue: ${event.location}.`, path: `/events/${event.slug}`, image: event.poster?.src, imageAlt: event.poster?.alt });
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = publicEvents.find((item) => item.slug === slug);
  if (!event) notFound();

  const date = new Date(event.date);
  const locationUrl = getEventLocationUrl(event);
  const withOffset = (value: string) => /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? value : `${value}${event.utcOffset ?? ""}`;
  const eventSchema = {
    "@type": "Event", "@id": absoluteUrl(`/events/${event.slug}#event`),
    name: event.title, description: event.longDescription, url: absoluteUrl(`/events/${event.slug}`),
    startDate: withOffset(event.date), endDate: event.end ? withOffset(event.end) : undefined,
    eventStatus: `https://schema.org/${event.status === "Cancelled" ? "EventCancelled" : event.status === "Postponed" ? "EventPostponed" : "EventScheduled"}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: event.poster ? absoluteUrl(event.poster.src) : undefined,
    location: { "@type": "Place", name: event.venue?.name ?? event.location, address: event.venue ? { "@type": "PostalAddress", streetAddress: event.venue.streetAddress, addressLocality: event.venue.addressLocality, addressCountry: event.venue.addressCountry } : event.location },
    organizer: { "@type": "Organization", name: siteName, url: absoluteUrl() },
  };
  return <PageShell><article className="shell event-detail">
    <StructuredData data={[eventSchema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: event.title, path: `/events/${event.slug}` }])]} />
    <Link href="/events" className="back-link"><ChevronLeft size={17} /> All events</Link>
    <p className="eyebrow">{event.category}</p>
    <h1>{event.title}</h1>
    <p className="lede">{event.longDescription}</p>
    <div className="event-info" data-scroll-reveal>
      <div><span>Date & time</span><strong>{date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {formatEventTimeRange(event)}</strong></div>
      <div><span>Location</span><strong><MapPin size={16} /> {locationUrl ? <a className="event-location-link" href={locationUrl} target="_blank" rel="noopener noreferrer">{event.location}</a> : event.location}</strong></div>
      <div><span>Status</span><strong>{event.status}</strong></div>
    </div>
    {event.poster && <figure className="event-poster" data-scroll-reveal><Image src={event.poster.src} alt={event.poster.alt} width={1254} height={1254} sizes="(max-width: 600px) calc(100vw - 40px), 520px" /></figure>}
  </article></PageShell>;
}
