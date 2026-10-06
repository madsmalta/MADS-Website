import type { MetadataRoute } from "next";
import { absoluteUrl, isPreview } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Keep pages and rendering resources crawlable so robots meta tags can be read.
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: isPreview ? undefined : absoluteUrl("/sitemap.xml") };
}
