import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { opportunities } from "@/data/site";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.opportunities;

export default function Opportunities() {
  return <PageShell>
    <section className="page-hero shell" data-dental-icon="scalpel">
      <p className="eyebrow">Opportunities</p>
      <h1>Beyond the timetable</h1>
      <p>Explore exchanges, conferences, courses and volunteering.</p>
    </section>
    <section className="shell section compact-section">
      <div className="opportunity-list">
        {opportunities.map((item) => <article key={item.title} data-scroll-reveal>
          <div className="opportunity-list__intro">
            <p className="tag">{item.type}</p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <a className="button button--dark opportunity-list__action" href={item.actionUrl} target="_blank" rel="noopener noreferrer">{item.actionLabel} <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <dl>
            <div><dt>When</dt><dd>{item.dates}</dd></div>
            <div><dt>Eligibility</dt><dd>{item.eligibility}</dd></div>
            <div><dt>Apply by</dt><dd>{item.deadline}</dd></div>
            <div><dt>Where</dt><dd>{item.location}</dd></div>
          </dl>
        </article>)}
      </div>
    </section>
  </PageShell>;
}
