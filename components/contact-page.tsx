"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { contacts } from "@/data/site";

const routeCategory: Record<string, string> = Object.fromEntries(contacts.map((contact) => [contact.need, contact.need]));

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
      <div data-scroll-reveal><h2 className="contact-section-title">Ask MADS</h2>{category === "Outreach collaboration" && <p>For outreach projects, it helps to mention who the activity is for, where it could take place and any dates you’re considering.</p>}</div>
      <ContactForm category={category} onCategoryChange={setCategory} />
    </section>
  </PageShell>;
}
