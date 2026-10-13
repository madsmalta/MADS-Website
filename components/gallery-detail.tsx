import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Photo } from "@/components/photo";
import { StructuredData } from "@/components/structured-data";
import { Gallery, galleryPath } from "@/data/gallery";
import { breadcrumbSchema } from "@/lib/seo";

export function GalleryDetail({ gallery }: { gallery: Gallery }) {
  const section = gallery.category === "Outreach"
    ? { label: "Outreach", path: "/outreach" }
    : { label: "Student Life", path: "/student-life" };

  return <PageShell><article className="shell gallery-detail">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: section.label, path: section.path }, { name: gallery.title, path: galleryPath(gallery) }])} />
    <Link className="back-link" href={section.path}>Back to {section.label}</Link>
    <h1>{gallery.title}</h1>
    {gallery.photos ? <>
      <a className="gallery-cover-link" href={gallery.image} target="_blank" rel="noopener noreferrer" aria-label={`View the cover photo from ${gallery.title} in a new tab`} data-scroll-reveal><Photo src={gallery.image} alt={gallery.alt} className="gallery-full gallery-cover" priority/></a>
      <div className="gallery-intro"><p>{gallery.photos.length} photographs</p><p>Select a photo to view it larger.</p></div>
      <div className="gallery-photo-grid">
        {gallery.photos.slice(1).map((photo, index) => <a href={photo.src} target="_blank" rel="noopener noreferrer" key={photo.src} aria-label={`View photo ${index + 2} of ${gallery.photos!.length} from ${gallery.title} in a new tab`}>
          <Photo src={photo.src} alt={photo.alt} className="gallery-tile"/>
          <span className="gallery-photo-meta"><span>{String(index + 2).padStart(2, "0")}</span><span>View photo <ArrowUpRight size={17}/></span></span>
        </a>)}
      </div>
      <div className="photo-policy" data-scroll-reveal><div><h2>About these photos</h2><p>Need a copy, or want a photo reviewed for removal? Get in touch with MADS.</p></div><Link className="text-link" href="/contact">Contact MADS</Link></div>
    </> : <div data-scroll-reveal><Photo src={gallery.image} alt={gallery.alt} className="gallery-full" priority/></div>}
  </article></PageShell>;
}
