# Deployment and domain review — 11 October 2026

This records the checks for the current public release. Recheck after a hosting, registrar, DNS or email-provider change.

## Hosting and release

- The Vercel project `madsmalta/mads-website` is accessible from the MADS account. Jeremy confirmed that MADS owns `mads.org.mt`; Vercel lists its registrar as a third party and its nameservers as Vercel. Record the registrar account and renewal owner in the committee handover notes.
- Vercel Production tracks `main` from `github.com/madsmalta/MADS-Website`. Release `087e331` was marked Ready and Current on 11 October 2026. The Vercel build log shows a fresh Git clone of that commit and a successful `npm run build` on Vercel's build machine. It used a dependency cache, but no local Desktop or temporary files.
- All 462 files in `public/media` are Git tracked. Representative committee portraits, the Primary Impressions poster and a gallery image returned HTTP 200 from the live site. Photo preparation scripts refer to local source folders, but the production build command does not run them.
- The cloud build reported one non-blocking package install-script warning for `unrs-resolver`; the Next.js build completed successfully.

## Domains and email DNS

- Vercel marks both `mads.org.mt` and `www.mads.org.mt` as valid. The root domain redirects with HTTP 308 to the chosen `www` address, retaining path and query. HTTP first upgrades to HTTPS. The `www` site returns HTTP 200 over HTTPS with HSTS.
- Public DNS still has Purelymail MX, SPF, all three DKIM CNAMEs and DMARC. Keep these records when changing website DNS. Vercel's account also lists the domain's DNS records.

## Secrets and previews

- Vercel keeps Brevo's API key, contact sender/recipient, mailing-list ID, confirmation template ID and confirmation destination in Production. Upstash URL and token are secret variables scoped to Production and Preview. No team shared variables are linked to this project. Local `.env.local` is ignored by Git; only `.env.example` is tracked.
- Production is attached to `main` and `www.mads.org.mt`. Preview is attached to other branches and has no custom domain; Vercel Authentication is on for non-production deployments. A Preview cannot become the current Production release through an ordinary branch push.
- No Preview deployment was available for a hosted end-to-end test at review time. The contact and newsletter handlers now reject all submissions when `VERCEL_ENV=preview`, even if delivery secrets are later copied into Preview. A local production build run in preview mode returned `configured:false` for contact availability and HTTP 503 for both submission routes, before any provider call. Recheck this on the next actual Preview deployment.

## Logs

- Vercel's available one-hour runtime-log window showed zero Warning, Error and Fatal console entries, and no visible 5xx responses. This is a bounded check, not a guarantee about older traffic. Continue reviewing logs after launches and provider changes without copying personal message contents into reports.
