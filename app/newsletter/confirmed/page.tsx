import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "The Molar subscription confirmed | MADS",
  description: "Your subscription to The Molar has been confirmed.",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmed() {
  return <PageShell>
    <section className="shell page-hero" aria-labelledby="newsletter-confirmed-title">
      <p className="eyebrow">The Molar</p>
      <h1 id="newsletter-confirmed-title">You’re subscribed</h1>
      <p>Thanks for confirming. You’ll now receive MADS events, opportunities and news by email. Every issue will include a link to unsubscribe.</p>
      <Link className="button button--dark" href="/">Back to MADS</Link>
    </section>
  </PageShell>;
}
