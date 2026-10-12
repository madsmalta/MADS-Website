import Link from "next/link";
import { CalendarPlus, ChevronLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { CopyCalendarLink } from "@/components/copy-calendar-link";
import { googleCalendarSubscriptionUrl, outlookCalendarSubscriptionUrl } from "@/data/calendar";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata = pageMetadata({
  title: "Follow the MADS events calendar",
  description: "Follow MADS public events in Google Calendar, Outlook, or Apple Calendar, on your phone or computer.",
  path: "/events/subscribe",
});

export default function SubscribeToEvents() {
  return <PageShell>
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: "Follow our calendar", path: "/events/subscribe" }])} />
    <section className="page-hero shell">
      <p className="eyebrow">MADS events</p>
      <h1>Follow MADS events</h1>
      <p>Choose the calendar you use. Follow MADS | Official Events to see new and updated events on your devices.</p>
    </section>
    <div className="shell section calendar-subscribe">
      <Link href="/events" className="back-link"><ChevronLeft size={17} /> Back to events</Link>
      <div className="calendar-subscribe-grid">
        <section className="calendar-subscribe-card">
          <h2>Google Calendar</h2>
          <p>Add our events to your Google Calendar.</p>
          <a className="button button--dark" href={googleCalendarSubscriptionUrl} target="_blank" rel="noopener noreferrer"><CalendarPlus size={17} aria-hidden="true" /> Add to Google Calendar</a>
          <p className="calendar-subscribe-note">Can’t add it on your phone? Use a computer with the same Google account. It will then appear on your phone.</p>
        </section>
        <section className="calendar-subscribe-card">
          <h2>Outlook &amp; Apple Calendar</h2>
          <p>Add our events to your Outlook or Apple Calendar.</p>
          <div className="calendar-subscribe-follow">
            <p><strong>Outlook:</strong> Add calendar → Subscribe from web, then paste the link</p>
            <p><strong>Apple Calendar:</strong> Add Calendar → Add Subscription Calendar, then paste the link</p>
            <CopyCalendarLink url={outlookCalendarSubscriptionUrl} />
          </div>
        </section>
      </div>
    </div>
  </PageShell>;
}
