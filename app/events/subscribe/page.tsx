import Link from "next/link";
import { CalendarPlus, ChevronLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { googleCalendarSubscriptionUrl } from "@/data/calendar";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata = pageMetadata({
  title: "Follow the MADS Google Calendar",
  description: "Add MADS public events to your Google Calendar, then view them on your phone or computer.",
  path: "/events/subscribe",
});

export default function SubscribeToEvents() {
  return <PageShell>
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: "Follow our Google Calendar", path: "/events/subscribe" }])} />
    <section className="page-hero shell">
      <p className="eyebrow">MADS events</p>
      <h1>Follow our Google Calendar</h1>
      <p>Add the public MADS | Official Events calendar once, then see its updates in Google Calendar on your devices.</p>
    </section>
    <div className="shell section calendar-subscribe">
      <Link href="/events" className="back-link"><ChevronLeft size={17} /> Back to events</Link>
      <div className="calendar-subscribe-grid">
        <section className="calendar-subscribe-card">
          <p className="eyebrow">On a computer</p>
          <h2>Add the calendar</h2>
          <p>Sign in to the Google account you use for your calendar, then open the link below and confirm that you want to add <strong>MADS | Official Events</strong>.</p>
          <a className="button button--dark" href={googleCalendarSubscriptionUrl} target="_blank" rel="noopener noreferrer"><CalendarPlus size={17} /> Open Google Calendar</a>
          <p className="calendar-subscribe-note">If Google asks you to sign in, use the account where you want MADS events to appear.</p>
        </section>
        <section className="calendar-subscribe-card">
          <p className="eyebrow">On an iPhone or Android phone</p>
          <h2>See events on your phone</h2>
          <p>Google does not let you add this subscription from its phone app or mobile website. Add it on a computer first using the same Google account you use on your phone.</p>
          <p>Then open Google Calendar on your phone. If MADS events are hidden, open the app menu and tick <strong>MADS | Official Events</strong> in the calendar list.</p>
        </section>
      </div>
      <p className="calendar-subscribe-footer">The website calendar and Google Calendar are updated separately by MADS. Check the event page for the latest details.</p>
    </div>
  </PageShell>;
}
