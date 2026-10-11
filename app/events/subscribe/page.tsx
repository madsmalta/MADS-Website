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
      <section className="calendar-subscribe-card calendar-subscribe-card--single">
        <h2>Add the MADS calendar</h2>
        <p>Open the link below and sign in to the Google account you use for your calendar. If Google offers to add <strong>MADS | Official Events</strong>, confirm it there.</p>
        <a className="button button--dark" href={googleCalendarSubscriptionUrl} target="_blank" rel="noopener noreferrer"><CalendarPlus size={17} /> Open Google Calendar</a>
        <p className="calendar-subscribe-note">On a phone, the Google Calendar app cannot add a new subscription. If the link opens the app without an Add option, open it in a computer browser using the same Google account. The calendar will then appear in the phone app; check the app’s calendar list if it is hidden.</p>
      </section>
      <p className="calendar-subscribe-footer">The website calendar and Google Calendar are updated separately by MADS. Check the event page for the latest details.</p>
    </div>
  </PageShell>;
}
