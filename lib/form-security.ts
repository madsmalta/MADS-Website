import "server-only";

type ParsedBody = { body: Record<string, unknown> } | { status: 400 | 413 | 415 };

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    const requestUrl = new URL(request.url);
    const host = request.headers.get("host") || requestUrl.host;
    return parsed.protocol === requestUrl.protocol &&
      parsed.host.toLowerCase() === host.toLowerCase() &&
      parsed.username === "" && parsed.password === "" &&
      parsed.pathname === "/" && !parsed.search && !parsed.hash;
  } catch {
    return false;
  }
}

// Read a bounded stream before JSON parsing; Content-Length alone cannot be trusted.
export async function readLimitedJson(request: Request, maxBytes: number): Promise<ParsedBody> {
  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return { status: 415 };
  }
  const length = request.headers.get("content-length");
  if (length && /^\d+$/.test(length) && Number(length) > maxBytes) return { status: 413 };
  if (!request.body) return { status: 400 };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { status: 413 };
      }
      chunks.push(value);
    }
    const raw = Buffer.concat(chunks).toString("utf8");
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) return { status: 400 };
    return { body: body as Record<string, unknown> };
  } catch {
    return { status: 400 };
  } finally {
    reader.releaseLock();
  }
}

export function boundedText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed : null;
}

export function hasOnlyFields(body: Record<string, unknown>, allowed: readonly string[]): boolean {
  return Object.keys(body).every(key => allowed.includes(key));
}
