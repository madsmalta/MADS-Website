import { HomeOpening } from "@/components/home-opening";
import { HomeOutreachPhotos } from "@/components/home-outreach-photos";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Photo } from "@/components/photo";
import { Newsletter } from "@/components/newsletter";
import { HomeExperience } from "@/components/home-experience";
import { HomeUpcoming } from "@/components/home-upcoming";
import { publicEvents } from "@/data/site";
import { studentLifeGalleries, galleryPath } from "@/data/gallery";
import { formatEventDateRange, formatEventTimeRange } from "@/lib/event-format";
import { getEventLocationUrl } from "@/lib/event-location";
import { partitionEvents } from "@/lib/events";
import { sectionMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata = sectionMetadata.home;
export const dynamic = "force-dynamic";

export default function Home() {
  const featuredEvents = partitionEvents(publicEvents).upcoming.map(event => ({
    slug: event.slug,
    title: event.title,
    location: event.location,
    locationHref: getEventLocationUrl(event),
    dateLabel: formatEventDateRange(event),
    timeLabel: formatEventTimeRange(event),
  }));

  return <PageShell>
    <StructuredData data={[organizationSchema(), websiteSchema()]} />
    <HomeExperience>
      <HomeOpening />

      <section className="home-agenda" aria-labelledby="home-events-title">
        <div className="home-width home-agenda-grid">
          <div className="home-agenda-intro">
            <h2 id="home-events-title">What’s coming up?</h2>
            <p>Keep space in your calendar for MADS</p>
            <Link href="/events" className="home-inline-link">View the full calendar <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <HomeUpcoming events={featuredEvents} />
        </div>
      </section>

      <section className="home-outreach" aria-labelledby="home-outreach-title">
        <div className="home-width home-outreach-grid">
          <HomeOutreachPhotos />
          <div className="home-outreach-copy">
            <h2 id="home-outreach-title">Small conversations.<br />A wider community.</h2>
            <p>From oral-health talks to volunteering, discover how MADS students get involved beyond campus.</p>
            <Link href="/outreach" className="button button--dark">Explore our outreach <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-width home-student-life" aria-labelledby="home-student-life-title">
        <div className="home-section-heading">
          <h2 id="home-student-life-title">More than a timetable</h2>
          <Link href="/student-life" className="home-inline-link">Discover student life <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="home-life-grid">
          {studentLifeGalleries.filter(gallery => gallery.slug !== "open-wide").map(gallery => <Link href={galleryPath(gallery)} className="home-life-story" key={gallery.slug}>
            <Photo src={gallery.image} alt={gallery.alt} className="home-life-image" />
            <div className="home-life-story-caption"><h3>{gallery.title}</h3><span className="home-story-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span></div>
          </Link>)}
        </div>
      </section>

      <section className="home-opportunities" aria-labelledby="home-opportunities-title">
        <div className="home-width home-opportunities-inner">
          <div><h2 id="home-opportunities-title">Explore what’s possible</h2>
          <p>Exchanges, volunteering, conferences and courses.</p></div>
          <Link href="/opportunities" className="button button--dark">Explore opportunities <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <Newsletter />
    </HomeExperience>
  </PageShell>;
}
