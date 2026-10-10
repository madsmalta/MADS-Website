import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { localLimit, releaseLocalLimit } from "@/lib/local-form-limit";

type Scope = "contact-ip" | "newsletter-ip";
type LimitResult = { allowed: boolean; retryAfter: number };
type Reservation = LimitResult & { release: () => Promise<void> };

let shared: {
  url: string;
  token: string;
  redis: Redis;
  contact: Ratelimit;
  newsletter: Ratelimit;
} | null = null;

function sharedStore() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !url.startsWith("https://")) throw new Error("Shared form rate limiting is not configured");
  if (shared?.url === url && shared.token === token) return shared;

  const redis = new Redis({ url, token });
  shared = {
    url, token, redis,
    contact: new Ratelimit({ redis, prefix: "mads:forms:contact:v1", limiter: Ratelimit.fixedWindow(12, "10 m"), timeout: 0, ephemeralCache: false }),
    newsletter: new Ratelimit({ redis, prefix: "mads:forms:newsletter:v1", limiter: Ratelimit.fixedWindow(20, "10 m"), timeout: 0, ephemeralCache: false }),
  };
  return shared;
}

function hashedIdentifier(value: string, token: string) {
  return createHmac("sha256", token).update(value).digest("hex");
}

function shouldUseLocalLimiter() {
  return !process.env.VERCEL && !process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_TOKEN;
}

export async function formRateLimit(scope: Scope, identifier: string): Promise<LimitResult> {
  if (shouldUseLocalLimiter()) return localLimit(scope, identifier, scope === "contact-ip" ? 12 : 20, 10 * 60_000);
  const store = sharedStore();
  const limiter = scope === "contact-ip" ? store.contact : store.newsletter;
  const result = await limiter.limit(hashedIdentifier(identifier, store.token));
  // The SDK's timeout fallback allows a request through; form protection must fail closed.
  if (result.reason === "timeout") throw new Error("Shared form rate limiting timed out");
  return { allowed: result.success, retryAfter: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)) };
}

export async function reserveConfirmation(email: string): Promise<Reservation> {
  if (shouldUseLocalLimiter()) {
    const result = localLimit("newsletter-email", email, 1, 10 * 60_000);
    return { ...result, release: async () => releaseLocalLimit("newsletter-email", email) };
  }

  const store = sharedStore();
  const key = `mads:forms:doi:v1:${hashedIdentifier(email, store.token)}`;
  const reservation = randomUUID();
  const result = await store.redis.set(key, reservation, { nx: true, ex: 600 });
  if (result !== "OK") {
    const ttl = await store.redis.ttl(key);
    return { allowed: false, retryAfter: Math.max(1, ttl), release: async () => undefined };
  }
  return {
    allowed: true, retryAfter: 0,
    release: async () => {
      // Only release our own reservation; never clear a newer one after expiry.
      await store.redis.eval<[string], number>(
        "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end",
        [key], [reservation],
      );
    },
  };
}
