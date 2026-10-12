# MADS search visibility audit

**Prepared 12 October 2026.** Search results and Search Console observations: 11 October. Source review and final live crawl: 12 October. Website: https://www.mads.org.mt.

## Executive assessment

MADS has a largely sound technical foundation, but its website has not yet established itself as the clearest online destination for the association. The most useful work now is to strengthen official references to the website, make its real activities more understandable in visible text, and complete Search Console follow-up.

The website appeared on the first page for **“mads malta”** in the observed search, below Facebook. It did not appear on the observed first results page for **“mads”**. That distinction matters: the short query also competes with a film, people and unrelated acronyms. First-page visibility for the qualified brand is already achievable; dominance of the ambiguous acronym is a harder and less predictable objective.

There is no honest way to guarantee a first-page result after a checklist. Google chooses results, and those results vary by location, query, device and time. A technically valid site is eligible to compete; it has not automatically earned a particular position.

**My priority order:** official University links → Search Console submission and follow-up → visible association identity and useful page content → first-visit experience and measured performance → consistent publication of genuine activities.

This is an audit and implementation backlog. No application code, Search Console settings, social profiles or external directory entries were changed during this audit.

## 1. What the evidence actually establishes

| Finding | Evidence | Interpretation |
|---|---|---|
| Homepage is indexed | Search Console URL Inspection said “URL is on Google” and “Page is indexed” | This is not a website-wide invisibility diagnosis |
| Current homepage can be indexed | Live inspection on 11 October succeeded, with crawling and indexing allowed | No current homepage crawl/index block was found |
| Plain “mads” is difficult | Facebook first; film and other entities prominent; website absent from observed first page | Ambiguous query plus stronger competing destinations |
| “mads malta” already surfaces the site | Homepage and About page appeared on first page | There is already a recognisable association between the website and qualified brand |
| Search data is extremely sparse | 0 clicks, 5 impressions, average position 2.6 in available report | Insufficient evidence to estimate reliable rankings, CTR or trends |
| No sitemap submitted in GSC | Submitted sitemaps table was empty on 11 October | Submit the existing sitemap; absence is not itself an indexing ban |
| Important official directory points to Facebook | University student-societies directory MADS link targets Facebook | A concrete opportunity to establish the website as the primary destination |
| Gallery descriptions are not visible | Descriptions exist in data and metadata but are not rendered as page text | Useful approved content is currently missing from the visitor-facing pages |
| First-session animation delays the view | Source animation completes after approximately 3.4 seconds | Clear user-experience improvement available; not a measured Core Web Vitals result |

Search observations used Malta localisation, English and a Google page stating that results were not personalised. The browser was signed in. These were not a controlled signed-out ranking study and are not permanent positions.

### Search Console baseline: use carefully

The report was set to three months but contained a chart covering 4–8 October and reported an update approximately 65 hours earlier. It showed:

- 0 clicks; 5 impressions; 0% CTR; aggregate average position 2.6.
- 3 impressions attributed to `http://mads.org.mt/` and 2 to `https://www.mads.org.mt/`.
- No query rows. We cannot assign position 2.6 to “mads”.
- Links report still processing; no verified backlink total.
- No Core Web Vitals experience data available.

The indexed homepage snapshot was last crawled on 6 October. It showed no user-declared canonical, with Google selecting the inspected URL. The **11 October live test did show the correct HTTPS www canonical**. This suggests Google’s stored snapshot had not caught up with the current implementation. It does not establish a current missing-canonical defect.

## 2. Technical audit: mostly healthy, with important boundaries

The 12 October live crawler checked **19 linked pages and 687 image/icon resource URLs**. The 18 intended indexable pages passed its checks. The nineteenth page was the newsletter unsubscribe utility.

The script exited with six warnings, all for `/newsletter/unsubscribe`: noindex, sitemap exclusion and missing canonical/social metadata. Inspection confirmed deliberate noindex. These are inappropriate indexable-page expectations for an unsubscribe utility. **Keep it out of search and out of the sitemap.** Update the audit script to distinguish indexable content from utilities; do not “fix” this by indexing the unsubscribe form. Optional social metadata there is a very low priority.

### Confirmed by current server-response checks

- Intended public pages return successful responses and have server-rendered headings, titles and descriptions.
- Canonicals and sharing URLs use `https://www.mads.org.mt` consistently for indexable pages.
- Public content is not marked noindex in those responses.
- Robots and sitemap respond successfully and use the production domain.
- Intended sitemap pages have internal links; tested internal page links resolve.
- Tested image/icon URLs respond successfully. This does not assess visual quality or actual download cost.
- Homepage Organization and WebSite data, event data and detail-page breadcrumbs are present and parseable.
- Event dates include timezone information and valid end-after-start ordering.
- Tested unknown page/event/gallery URLs return real 404 responses.
- `/new-students` permanently redirects home; the contact enquiry parameter canonicalises to `/contact`.

### Source-confirmed or not fully verified

Preview noindex and an empty preview sitemap are implemented in source. A fresh deployed preview response was not independently rechecked for this audit. The crawler does not prove every domain redirect variation, Google’s final canonical choice, rich-result eligibility, JavaScript rendering, external-link availability or mobile performance. Existing deployment checks should be retained, with domain redirects rechecked at release time.

Do not rebuild the website, change its domain or add an SEO plugin to solve this ranking problem. Those changes have no demonstrated need here.

## 3. Highest-priority action: correct official references

The [University student-societies directory](https://www.um.edu.mt/studentlife/studentsocieties/) links its MADS entry to Facebook. Its label also uses “Association for Dental Students”, whereas MADS’ approved name uses “of”. The [Faculty MADS page](https://www.um.edu.mt/ds/students/mads/) describes the association but does not expose an official website link in the inspected page links, and its description still refers to Dental Surgery alone.

Ask the relevant University editors to:

1. Use **Malta Association of Dental Students (MADS)** consistently.
2. Make `https://www.mads.org.mt/` the association’s primary website link.
3. Retain Facebook as an additional social link if useful.
4. Review the committee-approved representation of Dental Surgery, Dental Hygiene, Dental Technology and Dental Assistance.

This is the most concrete external opportunity found. A relevant official institution pointing to the website helps users discover it and clarifies its identity. It is not possible to quantify a ranking gain from one link.

Facebook’s ranking is plausibly supported by established references such as this one. A complete link comparison was unavailable, so I cannot claim its exact authority, backlink count or the precise reason Google ranks it first.

### Other places to check

| Destination | Recommended action | Evidence/status |
|---|---|---|
| MADS Facebook | Put the canonical website in the website field and a helpful launch/pinned post | Official social identity approved previously; current website-field value not audited |
| MADS Instagram | Make the website easy to reach from the profile | Official account approved; current bio-link configuration not audited |
| University faculty | Add primary website and update approved representation wording | Specific inspected page identified above |
| Relevant student-union directory | Request a correct listing if one exists | Opportunity to verify, not a confirmed existing broken listing |
| Current international association directory | Update MADS website if membership is current | Historical IADS mention does not establish current membership |
| Real outreach/event partners | Ask for a useful event/recap link where they already describe MADS work | Only genuine relationships; no bulk link requests |
| Future posters and committee email signatures | Include the website consistently | A discovery and branding measure, not a guaranteed ranking signal |

Jeremy can coordinate website details; the PR team can coordinate public profiles; the President can approve official wording. These are proposed SEO responsibilities, not newly assigned account permissions. No outreach messages have been sent.

## 4. Search Console: finish the discovery work

In the verified `mads.org.mt` property:

1. Submit `https://www.mads.org.mt/sitemap.xml` under Sitemaps.
2. Check that submission succeeds and that Google subsequently reads it.
3. Inspect the homepage and key pages: About, Events, Outreach, Contact and Christmas Gala.
4. Request indexing once for substantially updated important pages. Repeated daily requests are unnecessary.
5. Review Page indexing exclusions by URL and reason. Redirects, duplicates and deliberate noindex utility pages can be normal. Investigate failures affecting pages intended to rank.
6. Recheck the homepage’s indexed canonical after another crawl. Confirm the www HTTPS version is selected.
7. Review Manual actions and Security issues. They were not inspected successfully in this audit; do not assume a penalty or a clean report without opening them.

The live sitemap already exists. Submission makes its processing status easier to track; it does not promise indexing or rankings. Google says crawling can take days to weeks, and repeated indexing requests do not speed it up. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## 5. Page-by-page content improvements

### Homepage — make identity immediately explicit

The current title, **MADS | Malta Association of Dental Students**, is appropriate. Keep it. The creative heading “One dental community” is not a fatal SEO error, but the page would benefit from a clear, visible introduction connecting the acronym, full name, Malta and represented programmes.

Suggested copy, based on the committee-approved remit:

> MADS—the Malta Association of Dental Students—represents students in Dental Surgery, Dental Hygiene, Dental Technology and Dental Assistance at the University of Malta. We organise student events, support oral-health outreach and connect our dental community.

This can sit below the existing heading. Alternatively use an explicit heading such as “MADS: Malta’s dental student community” if it fits the design. Repeating “MADS Malta” throughout the page is unnecessary.

The metadata already does much of the identification work. Adding visible context improves understanding for visitors as well as search engines; it is not a magic ranking switch.

### About — make the committee readable as text

Names and roles are largely presented inside portrait graphics, with image alternative text. Add visible HTML names and roles alongside each portrait. Keep the image styling if desired.

Add a concise verified explanation of how students join, how representation works and how to contact the relevant role. Include history or formal recognition only with evidence and approval. Avoid an inflated mission statement when a concrete description would answer more questions.

### Outreach — explain the actual service

The current page is brief and gallery-led. Add practical information: what MADS does, who activities are for, how a school or organisation can enquire, and what arrangements need agreement. Use descriptive links to relevant activity recaps.

Possible topic targets include “oral health outreach Malta” and “dental student outreach Malta”. These are relevance-based suggestions, not measured high-volume keywords. Do not claim clinical services, professional supervision or outcomes unless verified.

### Seven gallery pages — the clearest content omission

Pembroke, Mosta, Scouts, Attard, Science in the City, Open Wide Open Bar and Volleyball pages contain titles, images and photo counts. Their existing descriptions are used in metadata but not displayed in the page body.

First render the approved description. Then add whatever can be verified:

- Event date and place.
- Why the activity took place and who organised it.
- What participants did, described accurately.
- Relevant partner credit and links where appropriate.
- A link to the related event, outreach enquiry or next activity.

No minimum word count is needed. A useful short recap is better than several paragraphs of generic filler. Do not invent dates, attendance numbers, quotes, outcomes or affiliations. Do not identify children or add sensitive clinical information for search visibility. Existing photo-permission concerns remain separate and unresolved by SEO.

Improve repetitive image alternatives where a meaningful scene description helps accessibility. Avoid stuffing every image with the association name and target keywords. [Google’s people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Events and event detail pages

Keep the automatic future-event handling. For upcoming events, add confirmed audience eligibility, booking arrangements, price, accessibility and organiser contact when available. The Christmas Gala’s confirmed start/end time is useful; never fabricate ticket availability to complete a schema field.

Retain useful past event pages with a clear “past event” state and, where available, a recap. They can preserve references and association history. Remove genuinely unwanted content deliberately; do not erase all past activity purely to appear fresh.

### Remaining pages

| Page | Assessment and next action |
|---|---|
| News & Photos | Honest photo index; add genuine reports as activities happen. Avoid manufacturing articles just to increase page count |
| Opportunities | Truthful coming-soon state is acceptable. Low traffic potential until real listings exist; not a launch-ranking emergency |
| Contact | Useful role addresses and contact route; keep names, responsibilities and links current |
| Calendar subscription | Useful instructions; not a primary acquisition page. Maintain the phone/computer guidance |
| Privacy | Keep accurate for visitors; do not turn it into keyword copy |
| Newsletter confirmation/unsubscribe | Keep utility pages excluded from indexing; they are not search landing pages |
| Future Molar issues | Consider accessible web editions when real issues are ready and approved, with email linking to them |

## 6. First-visit experience and performance

### Remove or shorten the visual intro

The source shows an animation delay of 2.75 seconds plus a 0.65-second exit. On a first session, content is visually covered until roughly 3.4 seconds have elapsed. Reduced-motion handling exists.

My recommendation is to remove the full-screen delay or use a brief animation that does not cover the content. Someone arriving from Google wants the association, event or contact details immediately.

This is a source-based UX finding. It does **not** prove an LCP of 3.4 seconds or a Google penalty.

### Measure before optimising the rest

Test the production homepage, About, Events and the largest gallery on mobile and desktop. Record both lab results and field data where available. Inspect first visit as well as repeat visit.

Areas worth measuring:

- Actual optimised image transfer sizes. The hero source is about 7.9 MB locally, but Next.js transforms it; that is not proof visitors download 7.9 MB.
- Five local TTF font files total approximately 564 KB on disk. Evaluate WOFF2/subsetting and used weights; this is not an assertion that every page transfers all files.
- Server response time on dynamic pages. Preserve correct event expiry if introducing caching.
- Gallery loading, image dimensions, responsive image selection and layout stability.
- Interaction responsiveness on calendar and forms.

Google’s good Core Web Vitals thresholds are LCP at most 2.5 seconds, INP at most 200 ms and CLS at most 0.1, evaluated at the 75th percentile. A small website may lack enough field data; that is not a failure. [Web Vitals](https://web.dev/articles/vitals).

Good scores support user experience but do not guarantee rankings. Do not sacrifice useful content to chase a perfect lab score. [Google page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience).

## 7. Metadata, structured data and search appearance

Existing titles and descriptions are broadly sensible and distinct. Keep the homepage title stable rather than repeatedly changing it in response to single searches. Meta descriptions can help communicate value, but Google may choose a different snippet.

Organization, WebSite, Event and breadcrumb markup already provide an appropriate foundation. Verify Google’s interpretation with its testing tools after material changes. Passing JSON parsing alone does not establish rich-result eligibility.

Do not add ratings, professional credentials, FAQs, tickets or reviews that are not represented accurately on the page. Do not describe MADS as a dental clinic or fabricate a staffed business location. A Google Business Profile is not a prerequisite for an association website to rank.

Keep the logo and official identity consistent across the website and controlled profiles. Use page-specific social artwork where it genuinely improves sharing; it is lower priority than the official directory link or visible gallery descriptions. [Organization structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).

## 8. Practical implementation backlog

Effort estimates are planning estimates, not guaranteed turnaround times or ranking gains.

| Priority | Action | Owner suggestion | Effort | Completion evidence |
|---|---|---|---|---|
| 1 | Submit sitemap and inspect key URLs | Jeremy | 30–60 minutes | Submission status and dated inspection results |
| 1 | Request University primary-link/name corrections | Jeremy/President | 30–60 minutes plus editor turnaround | Live directory and faculty links |
| 1 | Review indexing exclusions, security and manual-action reports | Jeremy | 30–60 minutes | URLs/reasons classified; real problems tracked |
| 2 | Put website prominently on official social profiles | PR team | 30–60 minutes | Verified live profile links |
| 2 | Add clear homepage introduction | Website editor | Small change | Rendered text and responsive check |
| 2 | Add visible committee names/roles | Website editor | Small change | Readable text on phone and desktop |
| 2 | Display existing gallery descriptions | Website editor | Small change | Descriptions visible on all seven pages |
| 2 | Remove/shorten first-visit covering animation | Website editor | Small change | First-visit and reduced-motion checks |
| 3 | Measure performance and fix demonstrated bottlenecks | Website editor | Half day initially | Saved before/after results |
| 3 | Add verified event/outreach context | Events/PR/content owners | Depends on records | Approved facts and useful links |
| 3 | Correct crawler utility-page classification | Website editor | Small change | Indexable pages and utility pages tested separately |
| Ongoing | Publish genuine updates and check search trends | Jeremy with content owners | Brief monthly review | Dated reporting and next actions |

## 9. A sensible 90-day evaluation plan

**First week:** complete discovery checks, request official-link corrections, verify social links, implement small content improvements. Establish a saved Search Console baseline with query, country, device and date filters.

**Weeks 2–4:** check whether Google recrawled key pages and selected the intended canonical; resolve actual indexability failures. Finish performance measurements. Add approved descriptions and useful event details. Do not treat tiny day-to-day changes as a trend.

**Days 30–60:** compare equivalent periods for branded impressions/clicks, key indexed pages and referral visits where measured appropriately. Review whether “mads malta” and the full association name are reliably finding the site. Publish real event/outreach recaps as they become available.

**Days 60–90:** evaluate the plain acronym separately. If qualified-brand visibility improves but “mads” remains dominated by other meanings, continue strengthening official recognition and useful content; do not jump to keyword stuffing or a domain change. If qualified-brand visibility remains poor, investigate the specific indexed URLs, canonical choice, country/device differences and external references again.

### Track these separately

- `mads` — ambiguous brand ambition.
- `mads malta` — principal qualified-brand target.
- `Malta Association of Dental Students` — full identity.
- `mads events`, `mads contact`, `mads christmas gala` — task-specific brand searches.
- Relevant outreach or student-event queries — exploratory until data confirms demand.

Use Search Console’s Malta country filter and compare mobile with desktop. Keep a consistent manual search method for occasional spot checks. Average position is an aggregate across impressions, not a universal fixed ranking. Do not encourage committee members to repeatedly search and click to manipulate results.

Success means people finding the official site for the association and completing useful tasks. Plain “mads” remains worth tracking, but it should not be the only measure.

## 10. Spending and tactics to avoid

Start with the existing site, Search Console and free diagnostic tools. There is no current evidence that a paid SEO subscription is the missing ingredient.

Avoid guaranteed-ranking packages, bought backlinks, bulk directory submissions, fabricated reviews, generic AI article volume, meta keywords, keyword stuffing, fake update dates and changing domains for an exact-match keyword. Ads can provide paid visibility but do not purchase an organic position. Do not add analytics or tracking merely to perform this audit; any new collection should fit the privacy arrangements.

Do not force every accessible URL into the sitemap. Do not remove noindex from confirmation or unsubscribe pages. Do not advertise services or membership affiliations that have not been verified. Google's guidance centres on understandable, useful content and legitimate discovery rather than a special SEO trick. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## 11. Remaining evidence gaps and limits

- PageSpeed opening was blocked by automatic approval review because of its usage limit. No production PageSpeed score or current LCP/INP/CLS measurement is claimed.
- On 12 October, browser connection timeouts prevented fresh Search Console report access. The report retains the clearly dated 11 October observations.
- Current detailed indexing exclusions, Manual actions and Security issues remain unchecked.
- The Links report was processing; a complete backlink profile and competitor comparison were unavailable.
- Search demand volumes and an exact nationwide rank are not established.
- Current preview response headers and every domain redirect combination were not independently repeated in this SEO crawl.
- Resource HTTP success is not a visual, accessibility, image-permission or speed audit.
- No ranking improvement can be measured before the recommended changes have been implemented and Google has had time to respond.

Local source reference: HEAD `72ee6cc` during this review. An existing modification to `app/about/page.tsx` was preserved. Source-level findings and live response findings are distinguished above; a matching deployed commit was not independently established in this audit.

**Final judgement:** the website is technically capable of being found, and qualified-brand results already demonstrate that. The best next investment is making it the officially referenced, informative home of MADS. That requires a few website improvements and committee/University coordination—not an expensive ranking promise.
