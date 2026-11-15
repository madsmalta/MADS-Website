import { PageShell } from "@/components/page-shell";
import { opportunities } from "@/data/site";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.opportunities;

export default function Opportunities() {
  return <PageShell>
    <section className="page-hero shell" data-dental-icon="scalpel" data-hero="opportunities">
      <p className="eyebrow">Opportunities</p>
      <h1>Beyond the timetable</h1>
      <p>Explore exchanges, conferences, courses and volunteering.</p>
    </section>
    <section className="shell section compact-section">
      <div className="section-heading"><h2>Current opportunities</h2></div>
      <div className="event-empty-state"><p>No current opportunities are open. Check back soon for new ways to get involved.</p></div>
    </section>
    <section className="shell section compact-section">
      <div className="section-heading"><h2>Past opportunities</h2></div>
      <div className="opportunity-list">
        {opportunities.map((item) => <article key={item.title} data-scroll-reveal>
          <div className="opportunity-list__intro">
            <p className="tag">{item.type} · Closed</p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </div>
          <dl>
            <div><dt>When</dt><dd>{item.dates}</dd></div>
            <div><dt>Eligibility</dt><dd>{item.eligibility}</dd></div>
            <div><dt>Where</dt><dd>{item.location}</dd></div>
          </dl>
        </article>)}
      </div>
    </section>
  </PageShell>;
}
