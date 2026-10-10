import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/data/site";
import { formatEventTimeRange } from "@/lib/event-format";
import { getEventLocationUrl } from "@/lib/event-location";
import { eventDisplayStatus, formatEventDate } from "@/lib/events";
export function EventCard({ event }: { event: EventItem }) {
 const href = `/events/${event.slug}`;
 const locationUrl = getEventLocationUrl(event);
 const status = eventDisplayStatus(event);
 const postponed = event.status === "Postponed";

 return <article className={`event-card${event.poster ? " event-card--poster" : ""}`} data-scroll-reveal>
  {event.poster ? <Link className="event-card-poster" href={href} scroll={false} aria-label={`View ${event.title} event details`}>
   <Image src={event.poster.src} alt={event.poster.alt} width={320} height={320} sizes="(max-width: 480px) 96px, 150px" />
  </Link> : <div className="event-date"><span>{postponed ? "Date" : formatEventDate(event, { month: "short" })}</span><strong>{postponed ? "TBD" : formatEventDate(event, { day: "numeric" })}</strong></div>}
  <div className="event-card-copy">
   <p className="tag">{event.category}</p>
   <h3><Link href={href} scroll={false}>{event.title}</Link></h3>
   {status !== "Upcoming" && <p className="event-status">{status}</p>}
   <p className="event-meta event-card-date"><CalendarDays size={15} aria-hidden="true" /> {postponed ? "New date to be confirmed" : formatEventDate(event, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
   {!postponed && <p className="event-meta"><Clock size={15} aria-hidden="true" /> {formatEventTimeRange(event)}</p>}
   <p className="event-meta"><MapPin size={15} aria-hidden="true" /> {locationUrl ? <a className="event-location-link" href={locationUrl} target="_blank" rel="noopener noreferrer">{event.location}</a> : event.location}</p>
   <p>{event.description}</p>
  </div>
  <Link className="round-link" href={href} scroll={false} aria-label={`View ${event.title}`}><ArrowUpRight size={20} /></Link>
 </article>;
}
