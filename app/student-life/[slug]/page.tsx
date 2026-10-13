import { notFound } from "next/navigation";
import { GalleryDetail } from "@/components/gallery-detail";
import { galleryPath, studentLifeGalleries } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return studentLifeGalleries.map(gallery => ({ slug: gallery.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = studentLifeGalleries.find(g => g.slug === slug);
  if (!gallery) notFound();
  return pageMetadata({ title: `${gallery.title} — Photos`, description: gallery.description, path: galleryPath(gallery), image: gallery.image, imageAlt: gallery.alt });
}

export default async function StudentLifeGallery({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = studentLifeGalleries.find(g => g.slug === slug);
  if (!gallery) notFound();
  return <GalleryDetail gallery={gallery} />;
}
