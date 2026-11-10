import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import "./theme.css";
import "./sitewide.css";
import { Intro } from "@/components/intro";
import { RouteScroll } from "@/components/route-scroll";
import { isPreview, siteDescription, siteName, siteUrl } from "@/lib/seo";

const manrope = localFont({
  src: [
    { path: "../public/fonts/manrope-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--mads-manrope",
  display: "swap",
  adjustFontFallback: "Arial",
});
const marcellus = localFont({
  src: "../public/fonts/marcellus-regular.woff2",
  variable: "--mads-marcellus",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const sourceSans = localFont({
  src: "../public/fonts/source-sans-3-semibold.woff2",
  variable: "--mads-source-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: { default: "MADS | Malta Association of Dental Students", template: "%s | MADS" },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "MADS",
  publisher: siteName,
  robots: { index: !isPreview, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [{ url: "/media/mads-icon-48-v4.png", sizes: "48x48", type: "image/png" }, { url: "/media/mads-icon-192-v4.png", sizes: "192x192", type: "image/png" }],
    apple: { url: "/media/mads-apple-icon-v4.png", sizes: "180x180", type: "image/png" },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${marcellus.variable} ${sourceSans.variable}`} suppressHydrationWarning><body><Script id="intro-once" strategy="beforeInteractive">{`try { if (!sessionStorage.getItem('mads-intro-seen')) { sessionStorage.setItem('mads-intro-seen', '1'); document.documentElement.dataset.reveal = 'play'; } } catch { document.documentElement.dataset.reveal = 'play'; }`}</Script><RouteScroll /><Intro />{children}</body></html>;
}
