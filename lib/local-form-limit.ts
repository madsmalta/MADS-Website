import "server-only";
import { createHmac, randomBytes } from "node:crypto";

// Best-effort only: serverless instances do not share memory. A shared store is
// required before this can be counted as a production rate limit.
const salt = randomBytes(32);
const entries = new Map<string, { count: number; reset: number }>();
const maxEntries = 10_000;

function key(scope: string, value: string): string {
  return `${scope}:${createHmac("sha256", salt).update(value).digest("hex")}`;
}

export function visitorKey(request: Request): string {
  const ip = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")
    : request.headers.get("x-forwarded-for");
  return ip?.split(",", 1)[0].trim() || "unknown";
}

export function localLimit(scope: string, identifier: string, maximum: number, windowMs: number) {
  const now = Date.now();
  const id = key(scope, identifier);
  const current = entries.get(id);
  if (current && current.reset > now) {
    if (current.count >= maximum) return { allowed: false, retryAfter: Math.ceil((current.reset - now) / 1000) };
    current.count++;
    return { allowed: true, retryAfter: 0 };
  }
  if (entries.size >= maxEntries) {
    for (const [item, state] of entries) if (state.reset <= now) entries.delete(item);
  }
  if (entries.size >= maxEntries) return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
  entries.set(id, { count: 1, reset: now + windowMs });
  return { allowed: true, retryAfter: 0 };
}

export function releaseLocalLimit(scope: string, identifier: string) {
  entries.delete(key(scope, identifier));
}
