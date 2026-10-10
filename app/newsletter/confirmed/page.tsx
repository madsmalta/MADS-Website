import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { MOLAR_UNSUBSCRIBE_URL } from "@/lib/newsletter";

export const metadata = {
  title: "The Molar subscription confirmed | MADS",
  description: "Your subscription to The Molar has been confirmed.",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmed() {
  return <PageShell>
    <section className="shell page-hero newsletter-confirmed-hero" data-dental-icon="tooth" aria-labelledby="newsletter-confirmed-title">
      <p className="eyebrow">The Molar</p>
      <h1 id="newsletter-confirmed-title">You’re subscribed</h1>
      <p>Thanks for confirming. You’ll now receive MADS events, opportunities and news by email. Every issue will include a link to unsubscribe.<br />To leave before the first issue, <a href="mailto:info@mads.org.mt?subject=Unsubscribe%20from%20The%20Molar">Email MADS</a> or use the button below.</p>
      <div className="newsletter-confirmed-actions">
        <a className="button button--light" href={MOLAR_UNSUBSCRIBE_URL}>Unsubscribe</a>
        <Link className="button button--dark" href="/">Back to MADS</Link>
      </div>
    </section>
  </PageShell>;
}
