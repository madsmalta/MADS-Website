"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { contacts } from "@/data/site";

const routeCategory: Record<string, string> = Object.fromEntries(contacts.map((contact) => [contact.need, contact.need]));
const enquiryGuidance: Record<string, string> = {
  "General enquiry": "Have a question about MADS or something you’d like to share? Tell us a little about it below so we can help.",
  "Student concern": "Tell us what’s happening and how it affects you or other students. Share only the details you’re comfortable including, and let us know what support you’re looking for.",
  "Event suggestion": "What would you like MADS to organise? Share your idea, who it would be for and any dates or activities you have in mind.",
  "Outreach collaboration": "For outreach projects, it helps to mention who the activity is for, where it could take place and any dates you’re considering.",
  "Opportunities": "Know of a course, exchange, conference or volunteering opportunity? Include a link, who can apply and any deadlines so we can find out more.",
};

export function ContactPage({ outreach = false }: { outreach?: boolean }) {
  const initialContact = outreach ? contacts.find((contact) => contact.need === "Outreach collaboration") ?? contacts[0] : contacts[0];
  const [selected, setSelected] = useState(initialContact);
  const [category, setCategory] = useState(initialContact.need);

  useEffect(() => {
    if (!outreach) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("ask-mads")?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [outreach]);

  function selectRoute(contact: typeof contacts[number]) {
    setSelected(contact);
    setCategory(routeCategory[contact.need] ?? "General enquiry");
  }

  return <PageShell>
    <section className="page-hero shell" data-dental-icon="message"><p className="eyebrow">Contact MADS</p><h1>We’re here to listen</h1><p>For questions, event ideas or outreach projects, choose a topic below to get started.</p></section>
    <section className="shell contact-router">
      <div><div data-scroll-reveal><h2>What do you need help with?</h2></div><div className="route-options" aria-label="Choose an enquiry route">{contacts.map((contact) => <button key={contact.need} type="button" className={selected.need === contact.need ? "selected" : ""} aria-current={selected.need === contact.need ? "true" : undefined} onClick={() => selectRoute(contact)}>{contact.need}<ChevronRight size={17} /></button>)}</div></div>
      <aside><h3>{selected.role}</h3><p>{selected.note}</p><a className="text-link" href="#ask-mads" onClick={() => setCategory(routeCategory[selected.need] ?? "General enquiry")}>{selected.action} <ChevronRight size={16} /></a></aside>
    </section>
    <section className="shell section contact-section" id="ask-mads">
      <div data-scroll-reveal><h2 className="contact-section-title">Ask MADS</h2><p>{enquiryGuidance[category] ?? enquiryGuidance["General enquiry"]}</p><p className="contact-alternative">Having trouble with the form? Email <a href="mailto:info@mads.org.mt">info@mads.org.mt</a> directly.</p></div>
      <ContactForm category={category} onCategoryChange={setCategory} />
    </section>
  </PageShell>;
}
