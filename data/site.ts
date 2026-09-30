export type Category = "Academic" | "Social" | "Freshers" | "Outreach" | "International" | "Wellbeing";
export type EventItem = { slug: string; title: string; date: string; end?: string; category: Category; location: string; status: "Upcoming" | "Postponed" | "Cancelled" | "Sold out"; description: string; longDescription: string; registrationLabel?: string; registrationUrl?: string };

export const siteRoutes = [
  { href: "/", label: "Home" }, { href: "/events", label: "Events" }, { href: "/opportunities", label: "Opportunities" }, { href: "/outreach", label: "Outreach" }, { href: "/news", label: "News & Photos" }, { href: "/about", label: "About MADS" }, { href: "/contact", label: "Contact" },
];

// These are intentionally labelled demonstrations until a public MADS calendar is supplied.
export const sampleEvents: EventItem[] = [
  { slug: "sample-freshers-welcome", title: "Sample: Freshers welcome", date: "2026-10-05T17:30:00", end: "2026-10-05T19:00:00", category: "Freshers", location: "Location to be confirmed", status: "Upcoming", description: "Calendar demonstration — awaiting official MADS event details.", longDescription: "This sample event demonstrates the information MADS can publish after it has been verified: a clear time, location, accessibility note and external registration link." },
  { slug: "sample-outreach-day", title: "Sample: outreach day", date: "2026-10-18T09:30:00", end: "2026-10-18T13:00:00", category: "Outreach", location: "Location to be confirmed", status: "Upcoming", description: "Calendar demonstration — awaiting official MADS event details.", longDescription: "This is placeholder content. It will be replaced by a verified public calendar feed and MADS-approved event information." },
  { slug: "sample-student-forum", title: "Sample: student forum", date: "2026-11-12T18:00:00", category: "Academic", location: "Location to be confirmed", status: "Upcoming", description: "Calendar demonstration — awaiting official MADS event details.", longDescription: "This is sample content only, and is not an announcement of a MADS activity." },
];

// Category examples only: these are not open applications or verified listings.
export const opportunities: { title: string; type: string; eligibility: string; deadline: string; location: string; funding: string; description: string; source: string; checked: string }[] = [
  { title: "Opportunity listings are being prepared", type: "International", eligibility: "To be confirmed", deadline: "No verified deadline", location: "To be confirmed", funding: "To be confirmed", description: "A clearly sourced opportunity will appear here once it is approved for publication.", source: "MADS source pending", checked: "Not yet checked" },
  { title: "Volunteering opportunities", type: "Volunteering", eligibility: "To be confirmed", deadline: "No verified deadline", location: "Malta / to be confirmed", funding: "Not applicable / to be confirmed", description: "MADS will share verified ways to contribute to outreach and community activity here.", source: "MADS source pending", checked: "Not yet checked" },
  { title: "Courses and conferences", type: "Courses", eligibility: "To be confirmed", deadline: "No verified deadline", location: "To be confirmed", funding: "To be confirmed", description: "A holding place for verified courses, workshops and conferences.", source: "MADS source pending", checked: "Not yet checked" },
];

export const articles = [
  { title: "News will appear here once approved", category: "Announcement", date: "Publication date pending", excerpt: "A source-backed home for MADS announcements, recaps and student notices." },
  { title: "Photo collections are handled with care", category: "Photos", date: "Information pending", excerpt: "Eligible event galleries will show a download expiry and link only to a MADS-owned Drive folder." },
  { title: "The Molar", category: "Newsletter", date: "Current issue pending", excerpt: "A concise route to events, opportunities and verified student information." },
];

export const contacts = [
  { need: "General enquiry", role: "MADS general enquiries", note: "Students, schools and dental professionals can start here.", action: "Ask MADS" },
  { need: "Student concern", role: "Bring a concern to MADS", note: "Whether it’s about your course or student life, tell us what’s going on. We can raise concerns with the faculty when appropriate.", action: "Raise a concern" },
  { need: "Event suggestion", role: "MADS events team", note: "Have an idea for a MADS event? Tell us what you’d like to see.", action: "Send an idea" },
  { need: "Outreach collaboration", role: "MADS outreach contact", note: "Schools, organisations and dental professionals can contact us about a joint oral-health activity or community project.", action: "Discuss an activity" },
  { need: "International opportunity", role: "MADS opportunities contact", note: "Know of an opportunity dental students should hear about? Send us the link and application deadline.", action: "Share an opportunity" },
];
