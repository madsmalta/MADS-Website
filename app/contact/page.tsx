import { ContactPage } from "@/components/contact-page";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata.contact;

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const requestedTopic = (await searchParams).topic;
  const topic = requestedTopic === "outreach" || requestedTopic === "events" ? requestedTopic : "general";
  return <ContactPage key={topic} topic={topic} />;
}
