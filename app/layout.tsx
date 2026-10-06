import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { Intro } from "@/components/intro";
import { RouteScroll } from "@/components/route-scroll";
import { isPreview, siteDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { default: "MADS | Malta Association of Dental Students", template: "%s | MADS" },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "MADS",
  publisher: siteName,
  robots: { index: !isPreview, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [{ url: "/media/mads-icon-48.png", sizes: "48x48", type: "image/png" }, { url: "/media/mads-icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: { url: "/media/mads-apple-icon.png", sizes: "180x180", type: "image/png" },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{if(!sessionStorage.getItem('mads-reveal-v2')){document.documentElement.dataset.reveal='play';sessionStorage.setItem('mads-reveal-v2','seen')}}catch(e){}`}} /></head><body><RouteScroll /><Intro />{children}</body></html>;
}
