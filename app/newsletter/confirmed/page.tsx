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
      <p>Thanks for confirming. You’ll now receive MADS events, opportunities and news by email. Every issue will include a link to unsubscribe. You can also leave before the first issue below.</p>
      <div className="newsletter-confirmed-actions">
        <Link className="button button--light" href={MOLAR_UNSUBSCRIBE_URL}>Unsubscribe</Link>
        <Link className="button button--dark" href="/">Back to MADS</Link>
      </div>
      <p className="newsletter-confirmed-email">Prefer to email us? <a href="mailto:info@mads.org.mt?subject=Unsubscribe%20from%20The%20Molar">Use your default email app</a> or <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info%40mads.org.mt&su=Unsubscribe%20from%20The%20Molar" target="_blank" rel="noopener noreferrer">open Gmail</a>.</p>
    </section>
  </PageShell>;
}
