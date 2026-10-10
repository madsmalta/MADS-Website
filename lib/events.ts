import type { EventItem } from "@/data/site";

const MALTA_TIME_ZONE = "Europe/Malta";

export function eventStart(event: Pick<EventItem, "date" | "utcOffset">): Date {
  return new Date(`${event.date}${event.utcOffset}`);
}

export function eventEnd(event: Pick<EventItem, "date" | "end" | "utcOffset">): Date {
  // If no finish was published, keep the listing current through its Malta date.
  return new Date(`${event.end ?? `${event.date.slice(0, 10)}T23:59:59`}${event.utcOffset}`);
}

export function formatEventDate(event: Pick<EventItem, "date" | "utcOffset">, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: MALTA_TIME_ZONE }).format(eventStart(event));
}

export function partitionEvents(events: EventItem[], now = new Date()) {
  const ordered = [...events].sort((a, b) => eventStart(a).getTime() - eventStart(b).getTime());
  return {
    upcoming: ordered.filter(event => eventEnd(event) > now && event.status !== "Cancelled" && event.status !== "Postponed"),
    updates: ordered.filter(event => eventEnd(event) > now && (event.status === "Cancelled" || event.status === "Postponed")),
    past: ordered.filter(event => eventEnd(event) <= now).reverse(),
  };
}

export function eventDisplayStatus(event: EventItem, now = new Date()) {
  if (event.status === "Cancelled" || event.status === "Postponed") return event.status;
  if (eventEnd(event) <= now) return "Past event";
  return event.status;
}
