import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {PageShell} from "@/components/page-shell";
import {Photo} from "@/components/photo";
import {galleryPath, outreachGalleries} from "@/data/gallery";
import { sectionMetadata } from "@/lib/seo";
export const metadata = sectionMetadata.outreach;
export default function Outreach() {
 const featured = outreachGalleries.find(g => g.slug === "sitc")!;
 const talks = outreachGalleries.filter(g => g.slug !== "sitc");
 return <PageShell>
  <section className="shell page-hero" data-dental-icon="mask"><p className="eyebrow">Outreach</p><h1>Sharing what we learn</h1><p>Through oral-health talks and outreach activities, we aim to raise awareness and contribute positively to the wider community.<br/>Explore our work with schools, scouts and other communities.</p></section>
  <section className="student-band outreach-invitation"><div className="shell student-band-inner" data-scroll-reveal><div><h2>Get involved with MADS</h2><p>Interested in organising a community activity together?</p></div><Link className="button button--light" href="/contact?topic=outreach#ask-mads">Let’s talk</Link></div></section>
  <div className="shell outreach-collection">
   <section className="outreach-feature" aria-labelledby="outreach-feature-title" data-scroll-reveal>
    <Photo src="/media/galleries/sitc/140.webp" alt="MADS volunteers speaking with visitors at Science in the City" />
    <div className="outreach-feature-copy"><h2 id="outreach-feature-title">{featured.title}</h2><p>{featured.description}</p><Link href={galleryPath(featured)} scroll={false} className="text-link">View photos <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
   </section>
   <section className="outreach-talks" aria-labelledby="outreach-talks-title">
    <div className="outreach-talks-heading"><h2 id="outreach-talks-title">Oral-health talks</h2><p>Activities with schools and Scouts around Malta</p></div>
    <div className="outreach-talks-grid">{talks.map(g => <Link className="outreach-talk" href={galleryPath(g)} scroll={false} key={g.slug} data-scroll-reveal>
     <Photo src={g.image} alt={g.alt}/><div><h3>{g.title}</h3><ArrowUpRight size={20} aria-hidden="true"/></div>
    </Link>)}</div>
   </section>
  </div>
 </PageShell>;
}
