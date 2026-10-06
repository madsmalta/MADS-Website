import type { Metadata } from "next";

export const siteName = "Malta Association of Dental Students";
export const siteDescription = "MADS represents and connects dental students in Malta. Discover student events, oral-health outreach, opportunities and the MADS committee.";

// Keep this origin consistent with Vercel's primary-domain redirect.
const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.mads.org.mt");
if (configuredUrl.protocol !== "https:" || configuredUrl.username || configuredUrl.password || configuredUrl.pathname !== "/" || configuredUrl.search || configuredUrl.hash || configuredUrl.hostname.endsWith(".example")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS site origin, such as https://www.mads.org.mt, without a path, credentials, query or fragment.");
}
export const siteUrl = configuredUrl.origin;
export const isPreview = process.env.VERCEL_ENV === "preview";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function pageMetadata({ title, description, path, image = "/media/mads-social.jpg", imageAlt = "Malta Association of Dental Students — MADS" }: PageMetadata): Metadata {
  const fullTitle = path === "/" ? title : `${title} | MADS`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website", locale: "en_GB", siteName: "MADS", title: fullTitle,
      description, url: absoluteUrl(path), images: [{ url: absoluteUrl(image), alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: absoluteUrl(image), alt: imageAlt }] },
  };
}

export const sectionMetadata = {
  home: pageMetadata({ title: "MADS | Malta Association of Dental Students", description: siteDescription, path: "/" }),
  about: pageMetadata({ title: "About MADS & the 2026–2027 Committee", description: "Meet the MADS committee and learn how the Malta Association of Dental Students represents Dental Surgery, Hygiene, Technology and Assistance students.", path: "/about" }),
  events: pageMetadata({ title: "Dental Student Events & Calendar in Malta", description: "Find MADS dental student events in Malta, including freshers gatherings, dates and venues. Add the public MADS calendar to keep up with upcoming events.", path: "/events" }),
  opportunities: pageMetadata({ title: "Dental Student Opportunities — Coming Soon", description: "MADS is preparing opportunities for dental students in Malta, including exchanges, volunteering, courses and conferences. Verified listings are coming soon.", path: "/opportunities" }),
  outreach: pageMetadata({ title: "Oral-Health Outreach in Malta", description: "Explore MADS oral-health outreach with schools, scouts and other communities in Malta. View activity photos and contact MADS about a collaboration.", path: "/outreach" }),
  news: pageMetadata({ title: "MADS News, Events & Outreach Photos", description: "Browse MADS photographs from oral-health outreach, Science in the City, Open Wide Open Bar and the MADS Volleyball Tournament.", path: "/news" }),
  contact: pageMetadata({ title: "Contact the Malta Association of Dental Students", description: "Contact MADS about student concerns, event ideas, oral-health outreach collaborations or dental student opportunities in Malta.", path: "/contact" }),
  privacy: pageMetadata({ title: "Privacy Policy & Photo Requests", description: "Read how MADS handles website visits, enquiries, newsletter sign-ups and event photographs, and how to request a photograph review or removal.", path: "/privacy" }),
};

export function organizationSchema() {
  return {
    "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteName,
    alternateName: "MADS", url: absoluteUrl(), logo: absoluteUrl("/media/mads-logo.png"),
    description: siteDescription, email: "madsmalta@gmail.com",
    sameAs: ["https://www.instagram.com/mads.malta", "https://www.facebook.com/madsonline", "https://www.um.edu.mt/ds/students/mads/"],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite", "@id": absoluteUrl("/#website"), name: "MADS",
    alternateName: siteName, url: absoluteUrl(), inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
