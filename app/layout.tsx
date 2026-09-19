import type { Metadata } from "next";
import "./globals.css";
import { Intro } from "@/components/intro";
import { RouteScroll } from "@/components/route-scroll";

export const metadata: Metadata = {
  title: { default: "MADS | Malta Association of Dental Students", template: "%s | MADS" },
  description: "The public home of the Malta Association of Dental Students.",
  metadataBase: new URL("https://mads-malta.example"),
  openGraph: { title: "MADS | Malta Association of Dental Students", description: "Students, representation and community.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{if(!sessionStorage.getItem('mads-reveal-v2')){document.documentElement.dataset.reveal='play';sessionStorage.setItem('mads-reveal-v2','seen')}}catch(e){}`}} /></head><body><RouteScroll /><Intro />{children}</body></html>;
}
