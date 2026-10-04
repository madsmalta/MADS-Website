import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {notFound} from "next/navigation";
import {PageShell} from "@/components/page-shell";
import {Photo} from "@/components/photo";
import {galleries} from "@/data/gallery";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 return {title:galleries.find(g=>g.slug===slug)?.title||"Photos"};
}

export default async function GalleryPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const gallery=galleries.find(g=>g.slug===slug);
 if(!gallery) notFound();

 return <PageShell><article className="shell gallery-detail">
  <Link className="back-link" href="/news">Back to News &amp; Photos</Link>
  <p className="eyebrow">{gallery.category}</p>
  <h1>{gallery.title}</h1>
  <p className="lede">{gallery.description}</p>
  {gallery.photos ? <>
   <a className="gallery-cover-link" href={gallery.image} target="_blank" rel="noopener noreferrer" aria-label={`View the cover photo from ${gallery.title} in a new tab`} data-scroll-reveal><Photo src={gallery.image} alt={gallery.alt} className="gallery-full gallery-cover" priority/></a>
   <div className="gallery-intro"><p>{gallery.photos.length} photographs</p><p>Select a photo to view it larger.</p></div>
   <div className="gallery-photo-grid">
    {gallery.photos.slice(1).map((photo,index)=><a href={photo.src} target="_blank" rel="noopener noreferrer" key={photo.src} aria-label={`View photo ${index+2} of ${gallery.photos!.length} from ${gallery.title} in a new tab`}>
     <Photo src={photo.src} alt={photo.alt} className="gallery-tile"/>
     <span className="gallery-photo-meta"><span>{String(index+2).padStart(2,"0")}</span><span>View photo <ArrowUpRight size={17}/></span></span>
    </a>)}
   </div>
   <div className="photo-policy" data-scroll-reveal><div><h2>About these photos</h2><p>Need a copy, or want a photo reviewed for removal? Get in touch with MADS.</p></div><Link className="text-link" href="/contact">Contact MADS</Link></div>
  </> : <>
   <div data-scroll-reveal><Photo src={gallery.image} alt={gallery.alt} className="gallery-full" priority/></div>
   <p className="photo-note">MADS event photograph. Dates and further event details have not been provided.</p>
   <div className="photo-policy" data-scroll-reveal><div><h2>Looking for downloads?</h2><p>No full-resolution download folder is currently available for this collection.</p></div><Link className="text-link" href="/contact">Ask about this photograph</Link></div>
  </>}
 </article></PageShell>;
}
