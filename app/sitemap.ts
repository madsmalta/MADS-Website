import type { MetadataRoute } from "next";
import { siteRoutes } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({ url: `https://mads-malta.example${route.href}`, changeFrequency: "weekly", priority: route.href === "/" ? 1 : 0.7 }));
}
