# MADS search visibility: implementation and launch plan

Reviewed 5 October 2026. Canonical website: **https://www.mads.org.mt**.

## What changed

- Replaced the placeholder `mads-malta.example` origin with the real `www` domain. Each public page has a self-referencing canonical; the outreach enquiry parameter canonicalizes to `/contact`.
- Added distinct, accurate titles and search descriptions to all section, event and gallery pages. The existing visual design and homepage headline are preserved.
- Expanded the sitemap from seven section URLs to all 15 public pages, including the event, six photo galleries and privacy policy. Gallery and event images are included. No invented modification dates or priority values.
- Added truthful Organization and WebSite identity data on the homepage, Event data on the event page, and breadcrumbs on event/gallery details. Event times explicitly include Malta's applicable UTC offset. No invented reviews, prices, affiliations or attendance figures.
- Added branded square icons and a social sharing image. Share URLs and images use the canonical domain. Social cards improve sharing presentation; they are not claimed as direct ranking factors.
- Improved responsive image sizing and removed the footer logo's unnecessary high-priority loading.
- Made contact-page metadata server-rendered and outreach preselection available in initial HTML. The local preview now uses the existing public enquiry service; redundant email text beside the form was removed following review.
- Added an official University of Malta MADS profile link to the About page.
- Vercel preview deployments receive `noindex` and do not advertise a public sitemap. Public pages and rendering resources remain crawlable.
- Added a repeatable server-response audit: `npm run seo:audit` (defaults to port 3001). To inspect another deployment: `npm run seo:audit -- https://www.mads.org.mt`. This checks implementation, not Google's index.

## Evidence boundaries

The live non-www domain permanently redirected to `www` during inspection, including an `/about` path test. The live sitemap and robots file still contained the placeholder origin before these changes. Local changes must be published before they benefit the public website.

The inspected Search Console account showed its welcome/setup screen; no MADS property was accessible there. This does not establish whether another account already has a verified property. Index coverage, actual queries, impressions, clicks and ranking positions remain unverified.

A perfect Lighthouse SEO score is not a ranking guarantee: the baseline already scored 100 despite the wrong sitemap origin and omitted detail pages. Use the custom crawl, Search Console and real content evidence together. Local speed measurements are laboratory diagnostics, not real-user Core Web Vitals.

Final local verification used a fresh production server on port 3002 (the existing port 3001 preview was stale):

- Production build, lint, TypeScript and diff-format checks passed.
- The complete crawl passed for all 15 public pages and 233 image/icon resources, including canonical URLs, unique metadata, internal links, JSON-LD, unknown-page 404s, enquiry-query canonicalization and the legacy HTTP 308 redirect.
- Lighthouse: homepage/mobile, event/mobile and contact/desktop each scored 100 for SEO, accessibility and best practices, with no failed audits. These automated scores are not a complete accessibility review or a ranking prediction.
- A local unthrottled homepage trace observed LCP 299 ms and CLS 0.04. No real-user field data was available; do not present this as public-site mobile performance.
- Browser verification confirmed the outreach enquiry selection and anchor jump. The preview environment flag was separately checked; a deployed Vercel preview still needs its own response-level `noindex` verification.

## Publish and verify

1. Publish the tested changes. Set `NEXT_PUBLIC_SITE_URL=https://www.mads.org.mt` if the deployment overrides the default. Keep Vercel's primary-domain redirect pointing to `www`.
2. Re-run the audit against the public website. Confirm all canonical pages return 200, unknown pages return 404, HTTPS/non-www redirects preserve paths, and production pages are not `noindex`.
3. Open Search Console with the MADS-managed account. Prefer a DNS-verified Domain property for `mads.org.mt`, covering both hostnames and protocols. If already verified, reuse it. A URL-prefix property for `https://www.mads.org.mt/` is also usable; optional `GOOGLE_SITE_VERIFICATION` supports its HTML meta-token method. DNS verification does not require this token.
4. Submit `https://www.mads.org.mt/sitemap.xml`. Use URL Inspection for the homepage, About, Outreach, event and a gallery. Compare the indexed URL and Google-selected canonical, and run a live test if needed. Request indexing for these key pages; do not repeatedly submit unchanged URLs.
5. Validate deployed event and breadcrumb markup with Google's Rich Results Test. WebSite site-name markup is not supported by that test. Structured data does not guarantee a special search display. Google's event experience currently lists supported regions that do not include Malta, so do not promise event rich results locally.
6. Record an initial Search Console baseline. Review indexing issues after launch and compare queries, impressions and clicks over the following weeks. Distinguish branded from non-branded searches. Search Console's Core Web Vitals report may need sufficient real-user data before showing results.

## Ranking growth: useful content and genuine discovery

These are proposed search intents, **not measured keyword volumes or promised positions**:

| Page | Useful intent to serve | Next content improvement |
| --- | --- | --- |
| Home/About | MADS; Malta Association of Dental Students | Keep representation, committee, contact and official identity accurate. |
| Events | MADS events; dental student events Malta | Publish individual real event pages with confirmed date, venue, audience and booking information. Update cancellations and completed events accurately. |
| Outreach | oral-health outreach Malta; school outreach collaboration | Add approved project dates, participating communities, what happened and how to arrange a collaboration. Useful context should accompany photos, not generic SEO filler. |
| Opportunities | dental student opportunities Malta | Replace Coming Soon with verified listings when available: organizer, eligibility, location, deadline and an authoritative application link. Do not manufacture listings to target queries. |
| News & Photos | named MADS events and outreach activities | Add concise first-hand recaps and accurate captions where information and publication permission are available. Preserve meaningful image alternatives. |

Ask the University directory owner to link its MADS entry to the new website, and update MADS-managed social profile website links after publication. Share relevant event and outreach pages through genuine partners. These external updates require account access/coordination and have not been made here. Avoid purchased links, reciprocal-link schemes, mass-generated location pages and keyword stuffing. Do not publish unsupported medical advice merely to attract traffic.

## Guidance used instead of the skill's outdated advice

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) and [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [sitemap construction](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [site names](https://developers.google.com/search/docs/appearance/site-names), [events](https://developers.google.com/search/docs/appearance/structured-data/event) and [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Page experience](https://developers.google.com/search/docs/appearance/page-experience)
- [URL Inspection](https://support.google.com/webmasters/answer/9012289): use this for indexing diagnosis. [`site:` results are not exhaustive](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site).
- [Google's documentation updates](https://developers.google.com/search/updates): How-to and FAQ rich-result opportunities in the downloaded skill are outdated. Neither was added.

No one can guarantee a particular Google position. The technical work removes avoidable obstacles; sustained visibility depends on useful, trustworthy content, genuine references, search demand and Google's indexing/ranking decisions.
