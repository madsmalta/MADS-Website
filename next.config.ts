import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  images: { remotePatterns: [], qualities: [75, 90] },
  turbopack: { root: process.cwd() },
  async redirects() {
    // Resolve this legacy URL before rendering, so crawlers receive a real 308.
    return [
      { source: "/new-students", destination: "/", permanent: true },
      { source: "/news", destination: "/student-life", permanent: true },
      ...["pembroke", "mosta", "scouts", "attard", "sitc"].map((slug) => ({ source: `/news/${slug}`, destination: `/outreach/${slug}`, permanent: true })),
      ...["open-wide", "volleyball"].map((slug) => ({ source: `/news/${slug}`, destination: `/student-life/${slug}`, permanent: true })),
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      { key: "Content-Security-Policy", value: "base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'" },
    ] }];
  },
};

export default withBotId(nextConfig);
