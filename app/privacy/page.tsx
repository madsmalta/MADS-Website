import { PageShell } from "@/components/page-shell";
import { MOLAR_UNSUBSCRIBE_URL } from "@/lib/newsletter";
import { sectionMetadata } from "@/lib/seo";
export const metadata = sectionMetadata.privacy;

export default function Privacy() {
  return <PageShell>
    <section className="shell legal-page">
      <h1>Privacy</h1>
      <p>This notice explains how the Malta Association of Dental Students (MADS) handles personal information through this website. It covers visits, enquiries, newsletter sign-ups and published photographs. Last updated: 10 October 2026.</p>

      <h2 data-scroll-reveal>Who is responsible?</h2>
      <p>MADS decides how personal information submitted to or published on this website is used. For privacy questions, access requests or photo-removal requests, email <a href="mailto:info@mads.org.mt">info@mads.org.mt</a>.</p>

      <h2 data-scroll-reveal>Visiting the website</h2>
      <p>Vercel hosts the site and may process technical information needed to deliver and protect it, such as your IP address, browser, requested pages and request times. MADS uses this processing to operate and secure the website, relying on its legitimate interests in providing a reliable public site. The site does not currently include MADS advertising pixels or an embedded analytics service. Hosting-provider records and settings are separate from the website code.</p>
      <p>Form submissions use Vercel BotID to check technical browser signals for automated abuse. Short-lived hashed identifiers are held in Upstash Redis to limit repeated submissions across the website. These checks are used to protect the forms, not for advertising.</p>
      <p>A first-party session-storage setting remembers that you have seen the opening logo animation, so it normally appears only once per browser session. It is not used to follow you across sites. The site does not currently set its own marketing cookies.</p>

      <h2 data-scroll-reveal>Contacting MADS</h2>
      <p>The Contact form asks for your name, email address, enquiry category and message. You may also provide your course. MADS uses those details to route and answer your enquiry, on the basis of its legitimate interests in responding to people who contact it. The form checks the email address format and whether its domain can receive email. It does not verify that an individual mailbox belongs to you.</p>
      <p>When the form accepts your enquiry, the website sends those details through Brevo&apos;s transactional email service to MADS at <a href="mailto:info@mads.org.mt">info@mads.org.mt</a>. Purelymail provides that mailbox. MADS uses the email address you provide to reply. You can also email MADS directly. Please avoid including sensitive health information unless it is needed for your request.</p>

      <h2 data-scroll-reveal>The Molar newsletter</h2>
      <p>The Molar form asks for your name, email address and your agreement to receive MADS updates about events, opportunities and news. The website checks your email address, including whether its domain can receive email. If you submit the form, it sends your name and email address to Brevo, which emails you a confirmation link. You are added to The Molar mailing list only after you click that link. MADS sends the newsletter on the basis of your consent.</p>
      <p>Brevo records confirmation, delivery, list membership and unsubscribe activity to help MADS manage and evidence subscriptions. For future newsletter campaigns, MADS has enabled anonymous email tracking: opens and link clicks are counted in totals without linking them to individual subscribers. Earlier campaigns may retain individual tracking records. MADS uses your details to send The Molar and manage the subscription. Each newsletter includes an unsubscribe link. You can also <a href={MOLAR_UNSUBSCRIBE_URL}>unsubscribe</a> at any time, including before the first issue, or ask <a href="mailto:info@mads.org.mt">info@mads.org.mt</a> to remove you. Withdrawing consent does not affect earlier lawful processing.</p>

      <h2 data-scroll-reveal>Committee and event photographs</h2>
      <p>This website publishes committee portraits and photographs of MADS events and outreach. Some outreach photographs show children. MADS is reviewing the permission records for these photographs. Photographs, names and committee roles are public and may be viewed, copied or indexed by others; removal from this website cannot guarantee removal of copies elsewhere.</p>
      <p>If you appear in a photograph and want to ask about its use, object to publication, or request review or removal, email <a href="mailto:info@mads.org.mt">info@mads.org.mt</a> and identify the image or page. MADS will assess the request and any applicable rights. For a child, a parent or guardian may contact MADS on the child&apos;s behalf.</p>

      <h2 data-scroll-reveal>Who receives information?</h2>
      <p>Vercel provides website hosting and processes website requests. Upstash stores short-lived form rate-limit identifiers. Brevo handles contact-form enquiries for email delivery to MADS&apos;s Purelymail mailbox. Brevo also handles The Molar confirmation emails, mailing list and newsletter delivery. MADS committee members handling enquiries, newsletters or publication requests may access the information needed for their role. MADS does not sell submitted form details.</p>
      <p>For more about the services currently in use, see <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel&apos;s privacy notice</a>, <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer">Upstash&apos;s privacy policy</a>, <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">Brevo&apos;s privacy policy</a> and <a href="https://purelymail.com/privacy" target="_blank" rel="noopener noreferrer">Purelymail&apos;s privacy policy</a>.</p>
      <p>The site links to Google Calendar, Instagram, Facebook and other external websites. These are links, not embedded feeds. If you follow one, that service processes your visit under its own privacy notice. The public Google Calendar is separate from this website; it does not give MADS access to your private calendar.</p>

      <h2 data-scroll-reveal>Where information is processed and how long it is kept</h2>
      <p>Brevo and the Upstash database used for form limits are hosted in the European Union. Vercel and Purelymail may process information outside the European Economic Area; MADS is reviewing their processing locations and transfer arrangements. Enquiry correspondence is reviewed when the conversation ends and periodically thereafter, normally around six months later. MADS deletes it when it is no longer needed for follow-up, an ongoing matter or a legal obligation; this is a manual decision, so there is no automatic deletion date. Public photographs remain online until MADS removes them or responds to a valid request. Newsletter subscription details are kept while you are subscribed; after you unsubscribe, MADS may retain limited records needed to honour that choice and show how consent was obtained. The opening-animation setting lasts for the browser session. Provider logs and backups follow the relevant provider&apos;s retention arrangements.</p>

      <h2 data-scroll-reveal>Your choices and rights</h2>
      <p>Depending on the circumstances, you can ask MADS to access, correct or erase your information, restrict its use, object to processing based on legitimate interests, or receive information you supplied in a portable format. Where processing relies on consent, you may withdraw it. You may also complain to Malta&apos;s <a href="https://idpc.org.mt/file-a-complaint/" target="_blank" rel="noopener noreferrer">Information and Data Protection Commissioner</a>. Send requests to <a href="mailto:info@mads.org.mt">info@mads.org.mt</a>; MADS may need to confirm your identity before acting on a request. MADS aims to respond within one month, as required by data-protection law.</p>
      <p>Providing form details is voluntary, but MADS needs the requested contact information and message to reply to an enquiry. There are no student accounts on this site and no automated decisions about you or profiling by MADS through the website.</p>
    </section>
  </PageShell>;
}
