import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Photo } from "@/components/photo";
import { galleryPath, studentLifeGalleries } from "@/data/gallery";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.studentLife;

export default function StudentLife() {
  return <PageShell>
    <section className="shell page-hero" data-dental-icon="aligners">
      <h1>The social scene</h1>
      <p>Explore photos from MADS events and student activities.</p>
    </section>
    <section className="student-band student-life-invitation"><div className="shell student-band-inner" data-scroll-reveal>
      <div><h2>Have an event idea?</h2><p>Tell us what you’d like MADS to organise.</p></div>
      <Link className="button button--light" href="/contact?topic=events#ask-mads">Suggest an event</Link>
    </div></section>
    <section className="shell gallery-grid student-life-gallery-grid" aria-label="Student life photo galleries">
      {studentLifeGalleries.map((gallery) => <Link className="story" href={galleryPath(gallery)} scroll={false} key={gallery.slug} data-scroll-reveal>
        <Photo src={gallery.image} alt={gallery.alt} />
        <div className="story-caption"><div><h2>{gallery.title}</h2><p>{gallery.description}</p></div><ArrowUpRight size={22} aria-hidden="true" /></div>
      </Link>)}
    </section>
    <section className="shell student-life-events" data-scroll-reveal>
      <div><h2>See what’s coming up</h2><p>Find dates and details for upcoming events.</p></div>
      <Link className="text-link student-life-events-link" href="/events">View events <ArrowRight size={18} aria-hidden="true" /></Link>
    </section>
  </PageShell>;
}
