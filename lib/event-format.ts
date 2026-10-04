import type { EventItem } from "@/data/site";

export function formatEventTimeRange(event: Pick<EventItem, "date" | "end">) {
  const start = event.date.slice(11, 16);
  if (!event.end) return start;

  const end = event.end.slice(11, 16);
  return `${start} - ${end}`;
}
