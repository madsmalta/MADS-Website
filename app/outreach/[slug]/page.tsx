import { notFound } from "next/navigation";
import { GalleryDetail } from "@/components/gallery-detail";
import { galleryPath, outreachGalleries } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return outreachGalleries.map(gallery => ({ slug: gallery.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = outreachGalleries.find(g => g.slug === slug);
  if (!gallery) notFound();
  return pageMetadata({ title: `${gallery.title} — Photos`, description: gallery.description, path: galleryPath(gallery), image: gallery.image, imageAlt: gallery.alt });
}

export default async function OutreachGallery({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = outreachGalleries.find(g => g.slug === slug);
  if (!gallery) notFound();
  return <GalleryDetail gallery={gallery} />;
}
