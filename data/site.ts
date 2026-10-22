export type Category = "Academic" | "Social" | "Freshers" | "Outreach" | "International" | "Wellbeing";
export type EventItem = { slug: string; title: string; date: string; end?: string; utcOffset: "+01:00" | "+02:00"; category: Category; location: string; locationUrl?: string; venue?: { name: string; streetAddress: string; addressLocality: string; addressCountry: string }; organizerName?: string; status: "Upcoming" | "Postponed" | "Cancelled" | "Sold out"; description: string; longDescription: string; poster?: { src: string; alt: string; width?: number; height?: number }; photoGalleryUrl?: string; registrationLabel?: string; registrationUrl?: string };

export const siteRoutes = [
  { href: "/", label: "Home" }, { href: "/events", label: "Events" }, { href: "/opportunities", label: "Opportunities" }, { href: "/outreach", label: "Outreach" }, { href: "/student-life", label: "Student Life" }, { href: "/about", label: "About MADS" }, { href: "/contact", label: "Contact" },
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
    description: "Photos from the Primary Impressions freshers meet-up at Queen Victoria Pub in Valletta.",
    longDescription: "Primary Impressions brought freshers and fellow dental students together at Queen Victoria Pub in Valletta on 9 October 2026. Browse photos from the evening.",
    poster: {
      src: "/media/primary-impressions.jpg",
      alt: "Primary Impressions poster featuring Valletta and a dental impression tray.",
    },
    photoGalleryUrl: "/student-life/primary-impressions",
  },
  {
    slug: "world-diabetes-day-2026",
    title: "World Diabetes Day",
    date: "2026-11-14T09:00:00",
    end: "2026-11-14T16:00:00",
    utcOffset: "+01:00",
    category: "Outreach",
    location: "In front of Parliament, Valletta",
    status: "Upcoming",
    description: "Join MADS and MMSA on World Diabetes Day in Valletta. Student volunteers can help throughout the day.",
    longDescription: "Join MADS and MMSA for World Diabetes Day in front of Parliament, Valletta, on Saturday 14 November. The stand runs from 09:00 to 16:00, with full-day and shorter volunteer shifts. Students from all dental courses and years can help at the stand. Clinical check-ups are for MDS3–5 and DH2–3 students; see the sign-up form for shift times and requirements.",
    registrationLabel: "Volunteer for WDD",
    registrationUrl: "https://forms.gle/6nK3MddCyignKy6SA",
  },
  {
    slug: "trd-2026",
    title: "TRD Weekend",
    date: "2026-11-20T15:00:00",
    end: "2026-11-22T11:00:00",
    utcOffset: "+01:00",
    category: "Academic",
    location: "San Antonio Hotel",
    organizerName: "Malta Medical Students' Association",
    status: "Upcoming",
    description: "A residential MMSA training weekend open to all dental faculty students, with talks and time to connect.",
    longDescription: "MMSA’s Training and Resource Development Weekend (TRD) runs from Friday 20 November at 15:00 to Sunday 22 November at 11:00 at San Antonio Hotel. It is open to all dental faculty students.\n\nMADS is planning four one-hour lecturer talks, two on Friday and two on Saturday, alongside social activities. The €150 fee covers two nights’ accommodation and the meals and activities listed in the application form.\n\nApply by Wednesday 28 October at 23:59. Places are first come, first served; the form requires proof of payment and a signed waiver. Saturday talk times, topics and speakers have not yet been confirmed.",
    poster: {
      src: "/media/trd-2026-mads-will-be-there.png",
      alt: "MADS and MMSA TRD 2026 poster with a Vegas sign, db San Antonio venue and 20–22 November dates.",
      width: 1121,
      height: 1403,
    },
    registrationLabel: "Apply for TRD",
    registrationUrl: "https://forms.gle/FQy25KNtm18s69QDA",
  },
  {
    slug: "christmas-gala-2026",
    title: "MADS Christmas Gala",
    date: "2026-12-19T20:00:00",
    end: "2026-12-20T01:00:00",
    utcOffset: "+01:00", // Malta is on standard time in December.
    category: "Social",
    location: "Haywharf, Floriana",
    status: "Upcoming",
    description: "Join MADS for the annual Christmas Gala at Haywharf. Ticketing and booking details will follow.",
    longDescription: "The MADS annual Christmas Gala brings dental students and lecturers together at Haywharf in Floriana on Saturday 19 December. Join us from 20:00 until 01:00 the next morning for a festive evening. Ticketing and booking details will be shared closer to the event.",
  },
];

export const opportunities = [
  {
    title: "World Diabetes Day",
    type: "Volunteering",
    summary: "Volunteer with MADS and MMSA at the World Diabetes Day stand in Valletta. All dental students can help; clinical roles have year-specific eligibility.",
    dates: "14 November 2026\n09:00–16:00",
    eligibility: "All dental students for the stand; MDS3–5 and DH2–3 for clinical roles",
    deadline: "See sign-up form",
    location: "In front of Parliament, Valletta",
    actionLabel: "Volunteer for WDD",
    actionUrl: "https://forms.gle/6nK3MddCyignKy6SA",
  },
  {
    title: "TRD Weekend",
    type: "Training & development",
    summary: "A residential weekend with MMSA and four planned one-hour talks. The €150 fee includes two hotel nights, meals and activities detailed in the application form.",
    dates: "20 November, 15:00 – 22 November, 11:00",
    eligibility: "All dental faculty students",
    deadline: "28 October · 23:59",
    location: "San Antonio Hotel",
    actionLabel: "Apply for TRD",
    actionUrl: "https://forms.gle/FQy25KNtm18s69QDA",
  },
];

export const contacts = [
  { need: "General enquiry", role: "General enquiries", note: "Have a question or something you’d like to share? We’d love to hear from you.", action: "Ask MADS" },
  { need: "Student concern", role: "Bring a concern to MADS", note: "Whether it’s about your course or student life, tell us what’s going on. We can raise concerns with the faculty when appropriate.", action: "Raise a concern" },
  { need: "Event suggestion", role: "MADS events team", note: "Have an idea for a MADS event? Tell us what you’d like to see.", action: "Send an idea" },
  { need: "Outreach collaboration", role: "MADS outreach", note: "Schools, organisations and dental professionals can contact us about a joint oral-health activity or community project.", action: "Discuss an activity" },
  { need: "Opportunities", role: "MADS opportunities", note: "Know of an opportunity dental students should hear about? Send it to us.", action: "Share an opportunity" },
];
