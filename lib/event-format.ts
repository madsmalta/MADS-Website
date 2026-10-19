import type { EventItem } from "@/data/site";
import { formatEventDate } from "@/lib/events";

export function formatEventTimeRange(event: Pick<EventItem, "date" | "end">) {
  const start = event.date.slice(11, 16);
  if (!event.end) return start;

  const end = event.end.slice(11, 16);
  if (Date.parse(`${event.end.slice(0, 10)}T00:00:00Z`) - Date.parse(`${event.date.slice(0, 10)}T00:00:00Z`) >= 2 * 86400000) {
    const weekday = (date: string) => new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" }).format(new Date(`${date.slice(0, 10)}T12:00:00Z`));
    return `${weekday(event.date)} ${start} – ${weekday(event.end)} ${end}`;
  }
  return `${start} - ${end}`;
}

export function formatEventDateRange(event: Pick<EventItem, "date" | "end" | "utcOffset">) {
  if (event.end && Date.parse(`${event.end.slice(0, 10)}T00:00:00Z`) - Date.parse(`${event.date.slice(0, 10)}T00:00:00Z`) >= 2 * 86400000) {
    const start = new Date(`${event.date}${event.utcOffset}`);
    const end = new Date(`${event.end}${event.utcOffset}`);
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Malta" }).formatRange(start, end);
  }
  return formatEventDate(event, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
