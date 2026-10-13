# MADS website launch and committee handover

Reviewed 11 October 2026. This is an internal operating record. Keep passwords, recovery codes, personal requests and photo-permission evidence outside this repository in restricted MADS storage.

## Release and recovery

- The verified website code baseline is commit `c497a1cee3d4aacebbbce41ca519546c877a3dee` on `main` in `madsmalta/MADS-Website`. Vercel listed its Production deployment as Ready: [current deployment](https://vercel.com/madsmalta/mads-website/84RiuBbYSobveuuuCwyBvM9ZBGWF). Before the President approves an announcement, record the *then-current* Production commit and deployment URL here or in the committee release register; a later documentation-only commit may create a newer deployment.
- The immediately previous Production deployment, commit `444cfe5`, was still listed as Ready on 11 October: [previous deployment](https://vercel.com/madsmalta/mads-website/Ae3GjMwvUo5VBiKtBmcaGhMWcRmU). Do not delete it. Vercel's deployment-retention setting is enabled, so recheck availability immediately before launch and before relying on it later.
- If a release breaks public pages, images or forms, the website editor and President should decide whether to roll back. In Vercel, open **mads-website → Overview → Production Deployment → Instant Rollback**, select the immediately previous Production deployment, check the domains shown, and confirm. On Hobby, only the immediately previous Production deployment is eligible. A rollback changes the website build; it does not undo data, Brevo, Purelymail, Upstash, Google Calendar, DNS or environment-variable changes. Recheck those services separately.
- After a rollback, test the homepage, contact availability and inbox delivery, newsletter, calendar and domain redirects. Vercel disables automatic Production-domain assignment after rollback; use **Undo Rollback** or promote a corrected deployment when ready, then verify that future `main` pushes deploy normally. Keep the bad commit and incident details for diagnosis instead of deleting history. [Vercel rollback instructions](https://vercel.com/docs/instant-rollback).

## Owners and response routes

| Work | Lead | Backup or coordination |
| --- | --- | --- |
| Final public-launch announcement approval | President | No announcement before explicit approval. |
| Website code and content releases | Jeremy Austin, Secretary General and website editor | President coordinates if Jeremy is unavailable. |
| `info@mads.org.mt` enquiries and privacy/photo requests | Shakira Yusuf and Vice President Nicole Caruana | Jeremy and President can assist; assign a deputy during absences. |
| `events@mads.org.mt` and public Google Calendar | Events Officer | Website editor updates matching site entry. |
| `partnerships@mads.org.mt` | PR team | Confirm a named checker and cover for absences. |
| The Molar sign-ups and Brevo | Jeremy Austin | Check consent, suppression and delivery records; restrict Brevo access to people doing this work. |
| The Molar issue preparation | Kylie Zerafa, Shakira Yusuf and Nicole Caruana | Coordinate each issue with Jeremy before sending. |

The public contact form sends to `info@mads.org.mt`. The role email addresses stay with the roles when committee members change. Confirm mailbox access and a response routine for each role before announcing the site. See [privacy operations](privacy-operations.md) for request handling.

## Routine website updates

1. Confirm facts and approval from the relevant MADS officer before editing. Keep source files and original photos in the restricted MADS Drive; prepare smaller public images in `public/media` and use only images cleared for publication.
2. Edit the relevant source: `data/site.ts` for events and principal site content; `data/gallery.ts` for galleries; About page data and assets for committee changes; `app/privacy/page.tsx` for an approved privacy-notice change. Do not put credentials or personal permission records in Git.
3. For events, update the public **MADS | Official Events** Google Calendar separately. The website calendar and Google Calendar do not sync. Check Malta time, status, venue, poster and links on both surfaces. Follow [event operations](event-operations.md).
4. Review the change locally, run `npm run lint`, `npm run typecheck` and `npm run build`, then check the affected page at mobile and desktop sizes. For a page, link or image change, run `npm run seo:audit` against a local build or the deployed site as appropriate.
5. Commit the change with a descriptive message. Jeremy pushes `main` after review; Vercel builds Production automatically. Open Vercel Deployments and wait for **Ready**, then check the live page and any affected inbox or service before sharing it. Never assume a successful push proves the live site works.
6. If a change concerns an event, newsletter, contact route, privacy practice or photograph, tell the corresponding owner and update the committee's Drive record.

## Access and backups

- MADS should keep an account register in restricted Drive listing the registrar, Google/Drive and public Calendar, GitHub, Vercel, Brevo, Purelymail and Upstash account owners, authorised users, billing/renewal owner, 2FA method and recovery custodian. Do **not** put recovery codes or passwords in this file or Git. Verify two authorised committee members can recover each critical account without relying on one member's personal device. Remove former members promptly at handover.
- Jeremy reports that access recovery and 2FA have been checked for the important MADS accounts. **The direct Vercel check showed Two-Factor Authentication: Inactive on 11 October 2026.** Jeremy has deferred setting it up. Keep this exception visible to the President, limit Vercel access to authorised people, and enable an authenticator app or passkey with a securely stored recovery method when Jeremy is ready. This review has not independently verified the other providers. The registrar account and domain-renewal owner still need to be recorded explicitly.
- The GitHub repository holds the website source and all 462 published media files. Keep the GitHub organisation controlled by MADS and verify at least two authorised maintainers can access it. A GitHub remote is a source copy, but committee records and original full-resolution photos need their own backup.
- Jeremy identified Google Drive as the location for original photos and essential MADS records. Adam Demajo manages the source photographs and has shared a Drive link containing originals and images used for social posts. Jeremy also identified a **pics** folder inside the Events Drive folder. A connected Drive search found **MADS 2026–2027**, event and outreach folders, **Official Documents and Constitution**, and a committee handover handbook. The complete photo collection and a restore test were not independently verified here; Adam owns that part of the handover.
- Do not treat public website copies as an archive of originals. Keep source images, consent/permission evidence and essential records in appropriately restricted Drive locations and consider a separate periodic export held by MADS. Review sharing permissions during every committee handover.

## Live check before announcement

Run this short check after the final deployment reaches **Ready** and before the President announces the site:

1. Confirm the Vercel Production commit and `www.mads.org.mt` domain. Open Home, Events, Contact, About, Outreach, Student Life and Privacy on a phone and computer. Check the featured event, an album in each collection and an event poster or portrait. Check that old `/news` album links redirect to their new locations.
2. Check `https://mads.org.mt/contact?topic=outreach` redirects to `https://www.mads.org.mt/contact?topic=outreach`, and a nonexistent page returns 404.
3. Check the site calendar moves between months, selects the next event and links to its detail page. Confirm the public Google Calendar shows the same date, Malta time and venue.
4. Submit one clearly labelled enquiry from a normal browser. Verify it reaches `info@mads.org.mt`, and that Reply addresses the sender. Automated browser submissions may be blocked by the bot check and cannot replace this manual delivery test.
5. Check that The Molar form renders and that a consented test address can receive a confirmation email. Confirm only after deciding to subscribe that address; verify the correct list and unsubscribe if doing a full journey. Avoid repeated attempts against the same address while the confirmation limit is active.
6. If anything fails, do not announce. Tell the responsible owner, check Vercel and provider status, and use the rollback procedure above if restoring the previous build is the fastest safe recovery.

The website has been publicly reachable during preparation. “Launch” here means the final committee approval and public announcement; it does not imply the domain was hidden before that decision.

### Smoke check observed on 11 October 2026

- The refreshed homepage featured **MADS Christmas Gala**. Home, Events, Contact, About, News & Photos, Privacy and the Gala detail page returned HTTP 200. The social image and icon returned HTTP 200; the earlier complete production audit checked all 18 public pages and 687 image/icon URLs.
- The live calendar moved between November and December and showed the Gala on 19 December. The separate **MADS | Official Events** Google Calendar listed it as confirmed for 19 December 20:00 to 20 December 00:00 Malta time at Haywharf, Floriana, matching the website at the time. Jeremy later revised the end time to 01:00 on 20 December; this bullet remains a record of the 11 October check.
- `GET /api/contact` reported `configured:true`. An unknown event returned HTTP 404. HTTP and non-`www` requests redirected with HTTP 308 to the canonical HTTPS `www` address while preserving the contact path and query.
- The newsletter form rendered. Its live endpoint rejected an invalid, non-consented request with HTTP 400 without sending mail.
- An automated, clearly labelled contact submission was rejected by the production bot check. Jeremy then submitted a normal-browser contact enquiry and confirmed it reached `info@mads.org.mt` and that Reply addressed the sender correctly.
- Jeremy submitted a fresh, consented newsletter test address and confirmed the confirmation email and confirmation page worked. This short smoke check did not independently inspect the Brevo list or test an unsubscribe; those belong to the full newsletter journey check.

## Open committee decisions

- President must give final announcement approval after the live check and review of the open items below.
- Confirm the PR team's specific mailbox checker and deputy, domain renewal responsibility and role mailbox access.
- Vercel 2FA remains inactive by Jeremy's decision to defer it. Record its eventual setup and recovery custody; review the other providers' settings at the next access audit.
- Adam owns the source-photo Drive handover. The committee should verify that another authorised officer can recover the essential records and source photographs.
- Complete the outstanding child/clinical photo-permission review and privacy-provider agreements described in [privacy operations](privacy-operations.md). MADS previously chose to keep the galleries visible while reviewing those records; this handover does not clear the publication risk.
