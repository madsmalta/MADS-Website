// Crawl real server responses. This checks implementation, not Google's index or rankings.
const base = new URL(process.argv.find((arg) => /^https?:\/\//.test(arg)) || "http://127.0.0.1:3001");
const preview = process.argv.includes("--preview");
const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mads.org.mt";
const failures = [];
const pages = [];
const links = new Set();
const resources = new Set();
const titles = new Map();
const descriptions = new Map();
const fail = (path, condition, message) => { if (!condition) failures.push(`${path}: ${message}`); };
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const text = (html) => decode(html.replace(/<[^>]*>/g, "")).trim();
const get = async (path) => {
  const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(20000), headers: { "User-Agent": "MADS-SEO-Audit/1.0" } });
  return { response, html: await response.text() };
};

const { response: robotsResponse, html: robots } = await get("/robots.txt");
fail("/robots.txt", robotsResponse.status === 200, "must return HTTP 200");
fail("/robots.txt", /Allow: \/\s/.test(robots), "public pages must be crawlable");
fail("/robots.txt", !/Disallow: \/(?:\s|$)/m.test(robots), "must not block all public content");
fail("/robots.txt", !/Disallow: \/(?:_next|media|fonts)/.test(robots), "must allow rendering and image resources");
fail("/robots.txt", preview || robots.includes(`${expectedOrigin}/sitemap.xml`), "must advertise the canonical sitemap");

const { response: sitemapResponse, html: sitemap } = await get("/sitemap.xml");
fail("/sitemap.xml", sitemapResponse.status === 200, "must return HTTP 200");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
const paths = sitemapUrls.map((url) => new URL(url).pathname);
fail("/sitemap.xml", preview ? sitemapUrls.length === 0 : sitemapUrls.length > 0, preview ? "preview sitemap must be empty" : "sitemap must include public pages");
fail("/sitemap.xml", new Set(sitemapUrls).size === sitemapUrls.length, "duplicate URLs");
for (const url of sitemapUrls) {
  fail("/sitemap.xml", new URL(url).origin === expectedOrigin, `wrong origin: ${url}`);
  fail("/sitemap.xml", !new URL(url).search && !new URL(url).hash, `URL has a query or fragment: ${url}`);
}
for (const match of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
  const image = new URL(decode(match[1]));
  fail("/sitemap.xml", image.origin === expectedOrigin, `wrong image origin: ${image}`);
  resources.add(image.pathname);
}

const queue = preview ? ["/"] : [...new Set(paths)];
const visited = new Set();
while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);
  const { response, html } = await get(path);
  fail(path, response.status === 200, `HTTP ${response.status}; sitemap and internal links must point directly to pages`);
  if (response.status !== 200) continue;
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || "";
  const titleMatches = [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  const title = text(titleMatches[0]?.[1] || "");
  const meta = [...head.matchAll(/<meta\b[^>]*>/g)].map((match) => attrs(match[0]));
  const descriptionMatches = meta.filter((tag) => tag.name === "description");
  const description = descriptionMatches[0]?.content || "";
  const canonicalMatches = [...head.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0])).filter((tag) => tag.rel === "canonical");
  const canonical = canonicalMatches[0]?.href;
  const h1 = [...html.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/g)].map((match) => text(match[1]));
  const robotsTag = meta.filter((tag) => tag.name === "robots").map((tag) => tag.content).join(",");
  fail(path, titleMatches.length === 1 && title.length > 0, "needs one non-empty title in the server-rendered head");
  fail(path, descriptionMatches.length === 1 && description.length > 0, "needs one non-empty search description in the head");
  fail(path, canonicalMatches.length === 1 && canonical && new URL(canonical).href === new URL(path, expectedOrigin).href, `incorrect canonical: ${canonical}`);
  fail(path, h1.length === 1 && h1[0].length > 0, "needs one readable main heading in server HTML");
  fail(path, /<html[^>]*lang="en"/.test(html), "English document language missing");
  fail(path, preview ? /noindex/.test(robotsTag) : !/noindex/.test(robotsTag), preview ? "preview must be noindex" : "public page is noindex");
  fail(path, !/noindex/i.test(response.headers.get("x-robots-tag") || "") || preview, "HTTP header prevents indexing");
  fail(path, meta.some((tag) => tag.property === "og:url" && tag.content === canonical), "share URL must match canonical");
  fail(path, meta.some((tag) => tag.property === "og:title" && tag.content === title), "share title must match page title");
  fail(path, meta.some((tag) => tag.name === "twitter:card" && tag.content === "summary_large_image"), "large-image share card missing");
  fail(path, !/mads-malta\.example/.test(html), "example domain remains in HTML");
  fail(path, !titles.has(title), `duplicate title (also used on ${titles.get(title)})`);
  fail(path, !descriptions.has(description), `duplicate description (also used on ${descriptions.get(description)})`);
  titles.set(title, path);
  descriptions.set(description, path);

  const iconLinks = [...head.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0])).filter((tag) => tag.rel === "icon" || tag.rel === "apple-touch-icon");
  fail(path, iconLinks.length > 0, "site icon missing");
  for (const icon of iconLinks) resources.add(new URL(icon.href, base).pathname);
  for (const tag of meta.filter((tag) => tag.property === "og:image")) {
    const url = new URL(tag.content);
    fail(path, url.origin === expectedOrigin, "share image must use the canonical origin");
    resources.add(url.pathname);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const image = attrs(match[0]);
    fail(path, Object.hasOwn(image, "alt"), "image lacks an alt attribute");
    if (image.src) resources.add(new URL(image.src, base).pathname + new URL(image.src, base).search);
  }
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(match[0]).href;
    if (!href || /^(?:mailto:|tel:|#)/.test(href)) continue;
    const url = new URL(href, base);
    if (![base.origin, expectedOrigin].includes(url.origin)) continue;
    if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/media/")) { resources.add(url.pathname); continue; }
    links.add(url.pathname);
    if (!visited.has(url.pathname)) queue.push(url.pathname);
  }
  const schema = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(match[1]);
      fail(path, parsed["@context"] === "https://schema.org", "JSON-LD context missing");
      schema.push(...(parsed["@graph"] || [parsed]));
    } catch { failures.push(`${path}: invalid JSON-LD`); }
  }
  const schemaTypes = schema.map((item) => item["@type"]);
  fail(path, !schemaTypes.some((type) => ["FAQPage", "HowTo"].includes(type)), "deprecated rich-result markup must not be added");
  if (path === "/") fail(path, schemaTypes.includes("Organization") && schemaTypes.includes("WebSite"), "homepage identity data missing");
  if (/^\/(events|news)\//.test(path)) fail(path, schemaTypes.includes("BreadcrumbList"), "detail-page breadcrumb data missing");
  for (const event of schema.filter((item) => item["@type"] === "Event")) {
    fail(path, /(?:Z|[+-]\d{2}:\d{2})$/.test(event.startDate), "event start time needs an explicit timezone");
    fail(path, !event.endDate || new Date(event.endDate) > new Date(event.startDate), "event end must be after its start");
    fail(path, event.url === canonical && event.name === h1[0], "event identity must match the actual page");
    fail(path, Boolean(event.location?.name && event.location?.address), "event venue missing");
  }
  pages.push({ path, title, canonical, schema: schemaTypes.join(", ") || "—" });
}

if (!preview) {
  for (const link of links) fail(link, paths.includes(link), "public linked page is missing from the sitemap");
  for (const path of paths.filter((path) => path !== "/")) fail(path, links.has(path), "sitemap page has no internal link");
}
for (const path of resources) {
  const response = await fetch(new URL(path, base), { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(20000) });
  fail(path, response.status === 200, `image/icon resource returned HTTP ${response.status}`);
}
for (const path of ["/seo-audit-missing-page", "/events/seo-audit-missing-event", "/news/seo-audit-missing-gallery"]) {
  const { response, html } = await get(path);
  fail(path, response.status === 404, `unknown content returned HTTP ${response.status} instead of 404`);
  fail(path, /name="robots"[^>]*content="[^"]*noindex/.test(html), "missing-page response needs noindex");
}
const { response: redirect } = await get("/new-students");
fail("/new-students", [301, 308].includes(redirect.status) && redirect.headers.get("location") === "/", "legacy route must permanently redirect to the homepage");
const { html: enquiry } = await get("/contact?topic=outreach");
fail("/contact?topic=outreach", enquiry.includes(`rel="canonical" href="${expectedOrigin}/contact"`), "enquiry parameters must canonicalize to /contact");

console.table(pages);
console.log(`Checked ${pages.length} public pages and ${resources.size} image/icon resources. Mode: ${preview ? "preview" : "production"}.`);
if (failures.length) {
  console.error(`${failures.length} SEO check(s) failed:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else console.log("All server-response SEO checks passed. Google indexing and rankings require Search Console verification.");
