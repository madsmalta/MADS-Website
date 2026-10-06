export type Category = "Academic" | "Social" | "Freshers" | "Outreach" | "International" | "Wellbeing";
export type EventItem = { slug: string; title: string; date: string; end?: string; utcOffset?: "+01:00" | "+02:00"; category: Category; location: string; locationUrl?: string; venue?: { name: string; streetAddress: string; addressLocality: string; addressCountry: string }; status: "Upcoming" | "Postponed" | "Cancelled" | "Sold out"; description: string; longDescription: string; poster?: { src: string; alt: string }; registrationLabel?: string; registrationUrl?: string };

export const siteRoutes = [
  { href: "/", label: "Home" }, { href: "/events", label: "Events" }, { href: "/opportunities", label: "Opportunities" }, { href: "/outreach", label: "Outreach" }, { href: "/news", label: "News & Photos" }, { href: "/about", label: "About MADS" }, { href: "/contact", label: "Contact" },
];

export const publicEvents: EventItem[] = [
  {
    slug: "primary-impressions",
    title: "Primary Impressions",
    date: "2026-10-09T20:00:00",
    end: "2026-10-10T00:00:00",
    utcOffset: "+02:00", // Malta is on summer time on 9–10 October 2026.
    category: "Freshers",
    location: "Queen Victoria Pub, Valletta",
    venue: { name: "Queen Victoria Pub", streetAddress: "20 South Street", addressLocality: "Valletta", addressCountry: "MT" },
    locationUrl: "https://www.google.com/maps/search/?api=1&query=The+Queen+Victoria+City+Pub%2C+20+South+Street%2C+Valletta%2C+Malta",
    status: "Upcoming",
    description: "A MADS freshers meet-up to meet new faces and catch up with fellow dental students after summer.",
    longDescription: "Join MADS for an evening with freshers and fellow dental students. Primary Impressions is a chance to meet people from your course, reconnect after summer and get to know each other at Queen Victoria Pub in Valletta.",
    poster: {
      src: "/media/primary-impressions.jpg",
      alt: "Primary Impressions poster featuring Valletta and a dental impression tray.",
    },
  },
];

// Category examples only: these are not open applications or verified listings.
export const opportunities: { title: string; type: string; eligibility: string; deadline: string; location: string }[] = [
  { title: "Opportunity listings are being prepared", type: "International", eligibility: "To be confirmed", deadline: "No verified deadline", location: "To be confirmed" },
  { title: "Volunteering opportunities", type: "Volunteering", eligibility: "To be confirmed", deadline: "No verified deadline", location: "Malta / to be confirmed" },
  { title: "Courses and conferences", type: "Courses", eligibility: "To be confirmed", deadline: "No verified deadline", location: "To be confirmed" },
];

export const articles = [
  { title: "News will appear here once approved", category: "Announcement", date: "Publication date pending", excerpt: "A source-backed home for MADS announcements, recaps and student notices." },
  { title: "Photo collections are handled with care", category: "Photos", date: "Information pending", excerpt: "Eligible event galleries will show a download expiry and link only to a MADS-owned Drive folder." },
  { title: "The Molar", category: "Newsletter", date: "Current issue pending", excerpt: "A concise route to events, opportunities and verified student information." },
];

export const contacts = [
  { need: "General enquiry", role: "MADS general enquiries", note: "Have a question or something you’d like to share? We’d love to hear from you.", action: "Ask MADS" },
  { need: "Student concern", role: "Bring a concern to MADS", note: "Whether it’s about your course or student life, tell us what’s going on. We can raise concerns with the faculty when appropriate.", action: "Raise a concern" },
  { need: "Event suggestion", role: "MADS events team", note: "Have an idea for a MADS event? Tell us what you’d like to see.", action: "Send an idea" },
  { need: "Outreach collaboration", role: "MADS outreach contact", note: "Schools, organisations and dental professionals can contact us about a joint oral-health activity or community project.", action: "Discuss an activity" },
  { need: "Opportunities", role: "MADS opportunities contact", note: "Know of an opportunity dental students should hear about? Send it to us.", action: "Share an opportunity" },
];
