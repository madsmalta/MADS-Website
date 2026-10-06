import { ContactPage } from "@/components/contact-page";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.contact;

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const outreach = (await searchParams).topic === "outreach";
  return <ContactPage key={outreach ? "outreach" : "general"} outreach={outreach} />;
}
