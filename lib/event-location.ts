import type { EventItem } from "@/data/site";

export function getEventLocationUrl(event: Pick<EventItem, "location" | "locationUrl">): string | null {
  if (event.locationUrl) return event.locationUrl;
  if (!event.location || /to be confirmed|tbc|\bonline\b|virtual|remote/i.test(event.location)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ", Malta")}`;
}
