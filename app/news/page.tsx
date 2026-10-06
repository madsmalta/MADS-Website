import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {PageShell} from "@/components/page-shell";
import {Photo} from "@/components/photo";
import {galleries} from "@/data/gallery";
import { sectionMetadata } from "@/lib/seo";
export const metadata = sectionMetadata.news;
export default function News(){return <PageShell><section className="shell page-hero" data-dental-icon="aligners"><p className="eyebrow">News & Photos</p><h1>Life around the dental faculty</h1><p>Outreach, events and the moments in between.<br/>Browse photographs from our community.</p></section><section className="shell gallery-grid">{galleries.map(g=><Link className="story" href={`/news/${g.slug}`} scroll={false} key={g.slug} data-scroll-reveal><Photo src={g.image} alt={g.alt}/><div className="story-caption"><div><p className="eyebrow">{g.category}</p><h2>{g.title}</h2></div><ArrowUpRight size={22}/></div></Link>)}</section></PageShell>;}
