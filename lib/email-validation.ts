import { Resolver } from "node:dns/promises";

// Conservative syntax for the ordinary email addresses supported by our forms.
export function hasEmailFormat(email: string): boolean {
  if (email.length > 254) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return local.length > 0 && local.length <= 64 &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) &&
    !local.startsWith(".") && !local.endsWith(".") && !local.includes("..") &&
    domain.includes(".") && domain.split(".").every(label =>
      /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(label));
}

const missing = (error: unknown) =>
  ["ENODATA", "ENOTFOUND"].includes((error as NodeJS.ErrnoException)?.code ?? "");

export async function checkEmail(email: string): Promise<"valid" | "invalid" | "unavailable"> {
  if (!hasEmailFormat(email)) return "invalid";
  const domain = email.split("@")[1].toLowerCase();
  const resolver = new Resolver({ timeout: 1500, tries: 1 });
  const timer = setTimeout(() => resolver.cancel(), 4000);
  try {
    const mx = await resolver.resolveMx(domain).catch(error => {
      if (missing(error)) return [];
      throw error;
    });
    // A null MX explicitly declares that this domain does not accept email.
    if (mx.some(record => record.exchange === "." || record.exchange === "")) return "invalid";
    if (mx.length) return "valid";
    // SMTP permits an address-record fallback when no MX is published.
    const addresses = await Promise.allSettled([resolver.resolve4(domain), resolver.resolve6(domain)]);
    if (addresses.some(result => result.status === "fulfilled" && result.value.length)) return "valid";
    if (addresses.some(result => result.status === "rejected" && !missing(result.reason))) return "unavailable";
    return "invalid";
  } catch {
    return "unavailable";
  } finally {
    clearTimeout(timer);
    resolver.cancel();
  }
}
