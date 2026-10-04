"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { contacts } from "@/data/site";

const routeCategory: Record<string, string> = Object.fromEntries(contacts.map((contact) => [contact.need, contact.need]));

export default function Contact() {
  const [selected, setSelected] = useState(contacts[0]);
  const [category, setCategory] = useState("General enquiry");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("topic") !== "outreach") return;
    const outreachContact = contacts.find((contact) => contact.need === "Outreach collaboration");
    if (outreachContact) {
      setSelected(outreachContact);
      setCategory(outreachContact.need);
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById("ask-mads")?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function selectRoute(contact: typeof contacts[number]) {
    setSelected(contact);
    setCategory(routeCategory[contact.need] ?? "General enquiry");
  }

  return <PageShell><section className="page-hero shell" data-dental-icon="message"><p className="eyebrow">Contact MADS</p><h1>Start with what you need.</h1><p>For questions, event ideas or outreach projects, choose a topic below to get started.</p></section><section className="shell contact-router"><div><div data-scroll-reveal><h2>What do you need help with?</h2></div><div className="route-options" aria-label="Choose an enquiry route">{contacts.map((contact) => <button key={contact.need} type="button" className={selected.need === contact.need ? "selected" : ""} aria-current={selected.need === contact.need ? "true" : undefined} onClick={() => selectRoute(contact)}>{contact.need}<ChevronRight size={17} /></button>)}</div></div><aside><h3>{selected.role}</h3><p>{selected.note}</p><a className="text-link" href="#ask-mads" onClick={() => setCategory(routeCategory[selected.need] ?? "General enquiry")}>{selected.action} <ChevronRight size={16} /></a></aside></section><section className="shell section contact-section" id="ask-mads"><div data-scroll-reveal><h2 className="contact-section-title">Ask MADS</h2><p>Tell us what you have in mind. Include any details that would help MADS understand your question or idea.</p>{category === "Outreach collaboration" && <p>For outreach projects, it helps to mention who the activity is for, where it could take place and any dates you’re considering.</p>}</div><ContactForm category={category} onCategoryChange={setCategory} /></section></PageShell>;
}
