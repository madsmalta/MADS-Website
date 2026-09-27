import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { EventItem } from "@/data/site";
export function EventCard({ event }: { event: EventItem }) { const date = new Date(event.date); return <article className="event-card" data-scroll-reveal><div className="event-date"><span>{date.toLocaleDateString("en-GB", { month: "short" })}</span><strong>{date.getDate()}</strong></div><div><p className="tag">{event.category} <span>• Sample event</span></p><h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3><p className="event-meta"><MapPin size={15} /> {event.location}</p><p>{event.description}</p></div><Link className="round-link" href={`/events/${event.slug}`} aria-label={`View ${event.title}`}><ArrowUpRight size={20} /></Link></article>; }
