import type { MetadataRoute } from "next";
import { publicEvents, siteRoutes } from "@/data/site";
import { galleries } from "@/data/gallery";
import { absoluteUrl, isPreview } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  return [
    ...siteRoutes.map((route) => ({ url: absoluteUrl(route.href) })),
    { url: absoluteUrl("/events/subscribe") },
    { url: absoluteUrl("/privacy") },
    ...publicEvents.map((event) => ({ url: absoluteUrl(`/events/${event.slug}`), images: event.poster ? [absoluteUrl(event.poster.src)] : undefined })),
    ...galleries.map((gallery) => ({ url: absoluteUrl(`/news/${gallery.slug}`), images: (gallery.photos ?? [{ src: gallery.image }]).map((photo) => absoluteUrl(photo.src)) })),
  ];
}
