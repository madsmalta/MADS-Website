"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { contacts } from "@/data/site";

const routeCategory: Record<string, string> = Object.fromEntries(contacts.map((contact) => [contact.need, contact.need]));

export default function Contact() {
  const [selected, setSelected] = useState(contacts[0]);
  const [category, setCategory] = useState("General enquiry");

  function selectRoute(contact: typeof contacts[number]) {
    setSelected(contact);
    setCategory(routeCategory[contact.need] ?? "General enquiry");
  }

  return <PageShell><section className="page-hero shell" data-dental-icon="handpiece"><p className="eyebrow">Contact MADS</p><h1>Start with what you need.</h1><p>Pick a route and see where your question belongs. MADS will not diagnose concerns or stand in for official, medical, wellbeing or emergency services.</p></section><section className="shell contact-router"><div><div data-scroll-reveal><p className="eyebrow">Who should I contact?</p><h2>What do you need help with?</h2></div><div className="route-options" aria-label="Choose an enquiry route">{contacts.map((contact) => <button key={contact.need} type="button" className={selected.need === contact.need ? "selected" : ""} aria-current={selected.need === contact.need ? "true" : undefined} onClick={() => selectRoute(contact)}>{contact.need}<ChevronRight size={17} /></button>)}</div></div><aside><h3>{selected.role}</h3><p>{selected.note}</p><a className="text-link" href="#ask-mads" onClick={() => setCategory(routeCategory[selected.need] ?? "General enquiry")}>{selected.action} <ChevronRight size={16} /></a></aside></section><section className="shell section contact-section" id="ask-mads"><div data-scroll-reveal><p className="eyebrow">Ask MADS</p><h2>Enquiry options.</h2><p>Share your question using the form when enquiries are enabled. No attachment is requested at this stage.</p></div><ContactForm category={category} onCategoryChange={setCategory} /></section></PageShell>;
}
