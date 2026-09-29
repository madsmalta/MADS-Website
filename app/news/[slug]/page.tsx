import Link from "next/link";
import {notFound} from "next/navigation";
import {PageShell} from "@/components/page-shell";
import {Photo} from "@/components/photo";
import {galleries} from "@/data/gallery";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:galleries.find(g=>g.slug===slug)?.title||"Photos"};}
export default async function GalleryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=galleries.find(g=>g.slug===slug);if(!g)notFound();return <PageShell><article className="shell gallery-detail"><Link className="back-link" href="/news">Back to News & Photos</Link><p className="eyebrow">{g.category}</p><h1>{g.title}</h1><p className="lede">{g.description}</p><div data-scroll-reveal><Photo src={g.image} alt={g.alt} className="gallery-full" priority/></div><p className="photo-note">MADS event photograph. Dates and further event details have not been provided.</p><div className="photo-policy" data-scroll-reveal><div><h2>Looking for downloads?</h2><p>No full-resolution download folder is currently available for this collection.</p></div><Link className="text-link" href="/contact">Ask about this photograph</Link></div></article></PageShell>;}
