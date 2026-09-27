type Variant = "home" | "events" | "opportunities" | "outreach" | "news" | "about" | "contact" | "privacy" | "event-detail" | "photo-detail";

function Shape({ kind }: { kind: string }) {
  return <span className={`loading-shape loading-shape--${kind}`} />;
}

function Lines({ title = "section-title" }: { title?: string }) {
  return <><Shape kind={title} /><Shape kind="body" /><Shape kind="body-short" /></>;
}

function Header() {
  return <div className="page-loading__header"><Shape kind="logo" /><div className="page-loading__nav"><Shape kind="nav" /><Shape kind="nav-wide" /><Shape kind="nav" /><Shape kind="nav" /><Shape kind="nav-wide" /></div><Shape kind="calendar" /></div>;
}

function Hero() {
  return <div className="page-loading__hero"><div className="page-loading__shell page-loading__hero-inner"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" /></div></div>;
}

function HomeHero() {
  return <div className="page-loading__home-opening"><div className="page-loading__home-copy"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="heading-short" /><Shape kind="body" /><Shape kind="body-short" /><Shape kind="button" /></div><Shape kind="home-image" /></div>;
}

function Body({ variant }: { variant: Variant }) {
  switch (variant) {
    case "home": return <><HomeHero /><div className="page-loading__shell page-loading__quick-links"><Shape kind="link-row" /><Shape kind="link-row" /></div></>;
    case "events": return <><Hero /><div className="page-loading__shell page-loading__body"><div className="page-loading__filters"><Shape kind="pill" /><Shape kind="pill" /><Shape kind="pill" /><Shape kind="pill" /></div><div className="page-loading__calendar-grid">{Array.from({ length: 21 }, (_, index) => <Shape kind="day" key={index} />)}</div><div className="page-loading__event-row"><Shape kind="date" /><div><Lines title="card-title" /></div></div></div></>;
    case "opportunities": return <><Hero /><div className="page-loading__shell page-loading__body"><div className="page-loading__filters"><Shape kind="pill" /><Shape kind="pill" /><Shape kind="pill" /></div>{[0, 1].map(index => <div className="page-loading__listing" key={index}><div><Shape kind="label" /><Lines title="card-title" /></div><div className="page-loading__facts">{[0, 1, 2, 3].map(fact => <Shape kind="fact" key={fact} />)}</div></div>)}</div></>;
    case "outreach": return <><Hero /><div className="page-loading__invitation"><div className="page-loading__shell page-loading__invitation-inner"><div><Lines /></div><Shape kind="button" /></div></div><div className="page-loading__shell page-loading__body page-loading__split"><Shape kind="story-image" /><div><Shape kind="label" /><Lines /></div></div></>;
    case "news": return <><Hero /><div className="page-loading__shell page-loading__body page-loading__gallery">{[0, 1].map(index => <div key={index}><Shape kind="tile-image" /><Shape kind="label" /><Shape kind="card-title" /></div>)}</div></>;
    case "about": return <><Hero /><div className="page-loading__shell page-loading__body"><Shape kind="feature-image" /><div className="page-loading__about-copy"><Lines /></div><div className="page-loading__portraits">{[0, 1, 2].map(index => <Shape kind="portrait" key={index} />)}</div></div></>;
    case "contact": return <><Hero /><div className="page-loading__shell page-loading__body page-loading__contact-grid"><div><Shape kind="section-title" />{[0, 1, 2].map(index => <Shape kind="route" key={index} />)}</div><div className="page-loading__contact-aside"><Shape kind="label" /><Lines title="card-title" /></div></div><div className="page-loading__shell page-loading__form-preview"><Shape kind="section-title" /><div><Shape kind="field" /><Shape kind="field" /></div></div></>;
    case "privacy": return <div className="page-loading__legal page-loading__body"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" />{[0, 1].map(index => <div className="page-loading__legal-section" key={index}><Lines /><Shape kind="body" /></div>)}</div>;
    case "event-detail": return <div className="page-loading__shell page-loading__body page-loading__detail"><Shape kind="back" /><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><div className="page-loading__facts page-loading__facts--wide">{[0, 1, 2].map(index => <Shape kind="fact" key={index} />)}</div><div className="page-loading__detail-panel"><Lines /></div></div>;
    case "photo-detail": return <div className="page-loading__shell page-loading__body page-loading__detail"><Shape kind="back" /><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body-short" /><Shape kind="feature-image" /><Shape kind="body-short" /></div>;
  }
}

export function PageLoading({ variant, label }: { variant: Variant; label: string }) {
  return <div className={`page-loading page-loading--${variant}`} role="status" aria-live="polite" aria-busy="true"><span className="sr-only">Loading {label}</span><div aria-hidden="true"><Header /><Body variant={variant} /></div></div>;
}
