# MADS privacy operations — committee working record

Reviewed 10 October 2026. This is an internal checklist, not a public promise or a legal opinion. Keep individual requests, permission forms and credentials out of this repository.

## Owners and access

- MADS is named as the organisation responsible for the website in the public notice. The committee must confirm its formal legal name/status and a suitable postal contact address with its governing body or privacy adviser.
- Use `info@mads.org.mt` for privacy requests. Shakira and the Vice President lead monitoring and replies; Jeremy and the President can assist. Assign a deputy whenever either lead is unavailable. These responsibilities can change on committee handover.
- Give mailbox and Brevo access only to people doing the relevant work. Review access at each handover and remove former committee members. As checked on 10 October, Brevo had one active Owner login (`madsmalta@gmail.com`); that account is shared/managed separately from the intended role allocation and needs an access review.

## Handling a privacy request

1. Recognise requests for access, correction, deletion, objection, restriction, portability, consent withdrawal and photo removal. A parent or guardian may raise a request about a child. Do not limit this workflow to photographs.
2. Record the date received, request type, owner and deadline in a restricted committee register. Do not place the request or identity documents in Git.
3. Acknowledge promptly. Verify identity only to the extent reasonably necessary; avoid collecting copies of identity documents by default.
4. Search the `info` mailbox, relevant Purelymail folders, Brevo contacts/list/consent records, and website content. Check other committee mailboxes if the matter was forwarded. Record what was checked.
5. Assess the applicable right and any exception; consult a qualified privacy adviser if unclear. Complete or explain the decision within one month. If a lawful extension is needed for a complex request, tell the requester within the first month.
6. For unsubscribe, stop future campaign sends promptly and retain only what is necessary to honour the opt-out and demonstrate the consent history. For photographs, identify every page/file and assess cached/copy limitations honestly.
7. Log the response date and actions with minimal detail. Restrict the register and review it periodically.

## Retention and review

- Do not set automatic 12-month deletion for ordinary enquiries. Review a conversation when it closes, then review resolved enquiries roughly every six months. Delete when no longer needed for a real follow-up, ongoing matter or legal obligation. Some can be deleted in days; others need longer. Document the reason for exceptional retention.
- Newsletter contact details stay while subscribed. On withdrawal, keep only the minimum suppression/consent evidence required for opt-out and accountability; periodically review historical records. Brevo transactional logs were configured to delete after one month and never store message previews when checked on 10 October 2026. Confirm this again after account changes.
- Check the actual mailbox, Brevo and hosting retention settings at least at each committee handover. Do not promise deletion from provider backups earlier than a provider allows.

## Photograph publication gate — open

- MADS reported that it **does not have a retrievable written publication permission record for every identifiable child and clinical photograph on the live site**. The public notice previously said it did; that claim has been removed.
- The public Pembroke cover image visibly includes identifiable children. The Scouts cover shows children, largely from behind. The Pembroke, Mosta, Attard, Scouts and Science in the City galleries, including mobile clinic photos, all need an image-by-image review. Do not infer permission from attendance, a venue's permission or a photographer's ownership.
- Keep a restricted release register with image/file, event, identifiable people (or reference), child/guardian authority where relevant, purpose, publication channels, date, withdrawal terms and where evidence is stored. Avoid uploading forms or children's names to this repository.
- Ask an appropriate Malta/EU privacy professional to assess children, clinical context, lawful basis and any special-category data before treating these galleries as cleared. User chose to keep galleries visible pending that review on 10 October 2026. Prioritise this review and remove any image for which MADS cannot establish an appropriate basis or receives a valid removal request.

## Provider and tracking checks

| Service | Verified use on 10 October 2026 | Remaining review |
| --- | --- | --- |
| Vercel | Website hosting; Web Analytics and Speed Insights dashboard features showed disabled/unconfigured. | Confirm the applicable processor agreement on the current Hobby plan, processing locations, subprocessors and transfer safeguards. Review hosting logs and cookies with the provider. |
| Upstash | Frankfurt Redis database holding short-lived hashed form-limit identifiers. | Retain its DPA/terms and recheck region if the database changes. |
| Brevo | Contact delivery, double opt-in, mailing list and campaigns. Anonymous campaign open/click reporting enabled for future campaigns. | Retain the applicable DPA; review historical named tracking, consent evidence and account access. Transactional email tracking is a separate setting and was not changed. |
| Purelymail | `info@mads.org.mt` mailbox. | Confirm its processor terms, actual storage location, subprocessors and any EEA transfer safeguards; its public privacy policy alone does not establish these. |

The production project used Brevo for contact delivery when checked; no contact webhook was configured. The code still supports an alternate webhook, so revisit this notice if production routing changes. The code uses first-party session storage for the logo animation and BotID/form protection. No advertising pixel or embedded analytics was found in source, and dashboard analytics products appeared off. Recheck the deployed site and hosting settings after adding any marketing, analytics or third-party embed. A cookie banner is required only if the actual technologies and legal basis call for one; do not add a decorative banner.

Relevant sources: [GDPR](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679), [Malta IDPC rights guidance](https://idpc.org.mt/for-individuals/your-rights/), [EDPB international transfers](https://www.edpb.europa.eu/sme/be-compliant/international-data-transfers_en), [Brevo tracking explanation](https://help.brevo.com/hc/en-us/articles/11643306229906-Can-I-anonymize-the-tracking-of-opens-and-clicks-for-my-emails), [Upstash DPA](https://upstash.com/trust/dpa.pdf), [Vercel DPA](https://vercel.com/legal/dpa), [Purelymail privacy policy](https://purelymail.com/privacy).
