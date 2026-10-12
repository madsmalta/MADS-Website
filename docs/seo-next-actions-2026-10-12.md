# MADS SEO: changes made and decisions for later

**12 October 2026.** Based on [the ranking audit](./seo-ranking-audit-2026-10-12.md). This file distinguishes changes already made locally from visible changes awaiting Jeremy's choice and external actions that need the committee or account owner. No ranking position is guaranteed.

## Done locally without changing the website UI

1. Refined the homepage search description to state the approved four-programme remit and University of Malta connection. The page title, displayed copy and layout are unchanged. Google may use its own snippet.
2. Corrected the SEO crawler so it checks the confirmation and unsubscribe utility pages for `noindex` and sitemap exclusion, while testing the 18 indexable pages separately. The utilities remain accessible to users but intentionally absent from search.
3. Checked the public server: the corrected crawl passed for 18 indexable pages and 687 image/icon URLs. Checked the local production build, lint, TypeScript and a local crawl. The rendered homepage source contains the new description. Public ranking cannot be tested from these code checks.

These edits must be pushed and deployed before the new description reaches the public site. The corrected crawler only improves audit accuracy; it is not a ranking factor.

## Visible site changes for Jeremy to decide later

No items in this section were applied. They are ordered by likely usefulness for visitors and search relevance, not by an assured ranking gain.

| Page | Proposed visible change | Why it is useful | Scope |
|---|---|---|---|
| Home | Add a short, clear paragraph beneath the existing headline: “MADS—the Malta Association of Dental Students—represents students in Dental Surgery, Dental Hygiene, Dental Technology and Dental Assistance at the University of Malta. We organise student events, support oral-health outreach and connect our dental community.” | Makes the acronym and remit obvious to visitors and crawlers; keeps the current creative headline | Text addition; may alter hero height |
| About | Add each committee member's name and role as visible text beside or below the existing portrait; retain current portrait artwork | People can read and search the information without relying on words embedded in an image or alt text | Nine labels and responsive spacing |
| Gallery detail pages | Display the already approved gallery description under each title or cover | Currently the description is metadata only; the visible pages mostly show photos and counts | Short paragraph on seven pages |
| Outreach | Add concise factual details about the activities, intended audiences and how a school or organisation can enquire | Answers practical visitor questions; helps the page describe what MADS actually does | New text section or expanded introduction; factual review required |
| Event details | Add verified booking, eligibility, price, organiser and accessibility details when confirmed; add truthful recaps to past events | Helps people act on event pages and keeps past pages useful | Content within existing event layouts; must be verified per event |
| First visit | Remove the covering intro or shorten it enough that content is visible promptly | Current animation covers the page for about 3.4 seconds on a first session | Site-wide visual behaviour change; measure first-visit experience |
| Future Molar issues | Publish approved web editions when issues exist | Gives real newsletter content a shareable, indexable home | New pages later, subject to editorial and privacy review |

The first three content items are the strongest visible opportunities. Do not insert search-only hidden text or invent dates, partners, clinical claims, event attendance or news.

## Actions Jeremy or an authorised MADS representative must do

| Priority | Action | Exact next step | How to confirm completion |
|---|---|---|---|
| Highest | Submit the existing sitemap in the MADS Google Search Console Domain property | Open Sitemaps; enter `https://www.mads.org.mt/sitemap.xml`; submit once | Search Console reports the sitemap submitted and later read successfully |
| Highest | Request University directory correction | Ask the [student-societies directory](https://www.um.edu.mt/studentlife/studentsocieties/) editor to make `https://www.mads.org.mt/` the primary MADS link and use “Malta Association of Dental Students (MADS)” | Directory entry links to the site with the correct name |
| Highest | Request University Faculty profile update | Ask the [Faculty MADS page](https://www.um.edu.mt/ds/students/mads/) editor to link the official website and review the committee-approved four-programme remit | Live Faculty page links to the site and has approved wording |
| High | Check Search Console indexing issues | Open Page indexing; identify reasons affecting *intended public pages*. Redirects and noindexed newsletter utilities may be correct. Open Manual actions and Security issues too | Real issues recorded by URL and reason; normal exclusions separated |
| High | Inspect updated pages after deployment | Use URL Inspection on home, About, Events, Outreach, Contact and Christmas Gala; check live accessibility and later Google-selected canonical. Request indexing once for materially changed pages | Inspection shows the intended HTTPS www URL and no block |
| High | Update official MADS profiles | Check Facebook's website field and Instagram's profile link; make the official site easy to reach. The PR team can handle this | Both public profiles link to `https://www.mads.org.mt/` |
| Medium | Gather approved facts for the proposed UI copy | Events officer: event booking/eligibility/accessibility and recaps. PR/outreach owners: gallery dates, places, organisers and partners. Committee: joining/representation details | Short fact sheet and approval, without guesses or photo-identification issues |
| Medium | Coordinate real partner references | Where a University, student-union or real activity partner already describes MADS, ask for a useful link to the relevant page | Live, relevant links; no paid or mass-generated links |
| Ongoing | Review actual search performance monthly | In Search Console, compare Malta/mobile and desktop for `mads`, `mads malta`, full association name and task-specific searches over equivalent date ranges | Dated notes on impressions, clicks, indexed pages and meaningful changes |

Google Search Console was accessible during the earlier audit, but the connected MADS browser timed out in this implementation session. No Search Console setting was changed here. The University and social-profile edits require their authorised owners. I did not send requests on MADS' behalf.

## Later measurements

Run production PageSpeed Insights on home, About, Events and a large gallery on mobile and desktop; record actual transfer sizes and Core Web Vitals. The earlier PageSpeed attempt was blocked by automatic approval review's usage limit, so there is no measured score to optimise against. The source hero file size is not the visitor download size because Next.js transforms it. Avoid a font or image replacement until a bottleneck is measured and the appearance is checked.

## Avoid

No paid-link schemes, fabricated reviews, keyword stuffing, mass AI articles, fake freshness dates, forced indexing of unsubscribe/confirmation pages or promised first-page rank for the ambiguous query `mads`.
