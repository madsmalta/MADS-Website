import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { NewsletterUnsubscribeForm } from "@/components/newsletter-unsubscribe-form";

export const metadata = {
  title: "Unsubscribe from The Molar",
  description: "Unsubscribe from The Molar newsletter by the Malta Association of Dental Students.",
  robots: { index: false, follow: false },
};

export default function NewsletterUnsubscribe() {
  return <PageShell><section className="unsubscribe-page">
    <div className="shell unsubscribe-layout">
      <div className="unsubscribe-intro">
        <span className="unsubscribe-tooth" aria-hidden="true" />
        <h1>Leaving The Molar?</h1>
        <p>We’re sorry to see you go. Enter the email address that receives <span className="unsubscribe-gold">The Molar</span> and we’ll remove it from this newsletter.</p>
        <Link className="unsubscribe-back" href="/"><ArrowLeft size={17} /> Back to MADS</Link>
      </div>
      <div className="unsubscribe-panel"><h2>Unsubscribe</h2><p>This removes you from The Molar mailing list.</p><NewsletterUnsubscribeForm /></div>
    </div>
  </section></PageShell>;
}
