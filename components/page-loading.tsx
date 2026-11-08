type Variant = "home" | "events" | "calendar-subscribe" | "opportunities" | "outreach" | "news" | "about" | "contact" | "privacy" | "event-detail" | "photo-detail" | "newsletter-confirmed" | "newsletter-unsubscribe";

function Shape({ kind }: { kind: string }) {
  return <span className={`loading-shape loading-shape--${kind}`} />;
}

function Lines({ title = "section-title" }: { title?: string }) {
  return <><Shape kind={title} /><Shape kind="body" /><Shape kind="body-short" /></>;
}

function Header() {
  return <div className="page-loading__header"><Shape kind="logo" /><div className="page-loading__nav"><Shape kind="nav" /><Shape kind="nav-wide" /><Shape kind="nav" /><Shape kind="nav" /><Shape kind="nav-wide" /></div><Shape kind="calendar" /></div>;
}

function Hero({ action = false }: { action?: boolean }) {
  return <div className="page-loading__hero"><div className="page-loading__shell page-loading__hero-inner"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" />{action && <Shape kind="button" />}</div></div>;
}

function HomeHero() {
  return <div className="page-loading__home-clinical"><div className="page-loading__home-clinical-inner"><div className="page-loading__home-image-wrap"><Shape kind="home-image" /><div className="page-loading__home-caption"><Shape kind="label" /></div></div><div className="page-loading__home-mission"><Shape kind="heading" /><div className="page-loading__home-mission-aside"><Shape kind="heading-short" /><Shape kind="body-short" /></div></div></div></div>;
}

function Body({ variant }: { variant: Variant }) {
  switch (variant) {
    case "home": return <HomeHero />;
    case "events": return <><Hero action /><div className="page-loading__shell page-loading__body"><div className="page-loading__calendar-toolbar"><Shape kind="section-title" /><div><Shape kind="pill" /><Shape kind="pill" /></div></div><div className="page-loading__calendar-grid">{Array.from({ length: 35 }, (_, index) => <Shape kind="day" key={index} />)}</div><Shape kind="section-title" /><div className="page-loading__event-card"><Shape kind="date" /><div><Shape kind="card-title" /><Shape kind="body" /><Shape kind="body-short" /></div></div></div></>;
    case "calendar-subscribe": return <><Hero /><div className="page-loading__shell page-loading__body"><Shape kind="back" /><div className="page-loading__subscribe-grid">{[0, 1].map(index => <div className="page-loading__subscribe-card" key={index}><Shape kind="section-title" /><Shape kind="body" /><Shape kind="button" /><Shape kind="body-short" /></div>)}</div></div></>;
    case "opportunities": return <><Hero /><div className="page-loading__shell page-loading__body page-loading__opportunities">{[0, 1].map(index => <div className="page-loading__opportunity-card" key={index}><div><Shape kind="label" /><Shape kind="card-title" /><Shape kind="body" /><Shape kind="body-short" /><Shape kind="button" /></div><div className="page-loading__opportunity-facts">{[0, 1, 2, 3].map(fact => <Shape kind="fact" key={fact} />)}</div></div>)}</div></>;
    case "outreach": return <><Hero /><div className="page-loading__invitation"><div className="page-loading__shell page-loading__invitation-inner"><div><Lines /></div><Shape kind="button" /></div></div><div className="page-loading__shell page-loading__body page-loading__split"><Shape kind="story-image" /><div><Shape kind="label" /><Lines /></div></div></>;
    case "news": return <><Hero /><div className="page-loading__invitation"><div className="page-loading__shell page-loading__invitation-inner"><div><Lines /></div><Shape kind="button" /></div></div><div className="page-loading__shell page-loading__body page-loading__gallery">{[0, 1].map(index => <div key={index}><Shape kind="tile-image" /><Shape kind="label" /><Shape kind="card-title" /></div>)}</div></>;
    case "about": return <><Hero /><div className="page-loading__shell page-loading__about-image"><Shape kind="feature-image" /></div><div className="page-loading__shell page-loading__about-copy"><Lines /><Lines /></div><div className="page-loading__shell page-loading__portraits">{[0, 1, 2].map(index => <Shape kind="portrait" key={index} />)}</div></>;
    case "contact": return <><Hero /><div className="page-loading__shell page-loading__body page-loading__contact-grid"><div><Shape kind="section-title" />{[0, 1, 2, 3, 4].map(index => <Shape kind="route" key={index} />)}</div><div className="page-loading__contact-aside"><Shape kind="label" /><Lines title="card-title" /></div></div><div className="page-loading__shell page-loading__form-preview"><div><Shape kind="section-title" /><Shape kind="body" /></div><div className="page-loading__form-fields">{[0, 1, 2, 3].map(index => <Shape kind="field" key={index} />)}<Shape kind="message" /><Shape kind="button" /></div></div></>;
    case "privacy": return <div className="page-loading__legal page-loading__body"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" />{[0, 1].map(index => <div className="page-loading__legal-section" key={index}><Lines /><Shape kind="body" /></div>)}</div>;
    case "event-detail": return <div className="page-loading__shell page-loading__body page-loading__detail"><Shape kind="back" /><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" /><div className="page-loading__event-info">{[0, 1, 2].map(index => <Shape kind="fact" key={index} />)}</div><Shape kind="poster" /></div>;
    case "photo-detail": return <div className="page-loading__shell page-loading__body page-loading__detail"><Shape kind="back" /><Shape kind="heading" /><Shape kind="feature-image" /><div className="page-loading__photo-intro"><Shape kind="label" /><Shape kind="body-short" /></div><div className="page-loading__gallery">{[0, 1, 2, 3].map(index => <Shape kind="tile-image" key={index} />)}</div></div>;
    case "newsletter-confirmed": return <div className="page-loading__confirmed"><div className="page-loading__shell"><Shape kind="eyebrow" /><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" /><div className="page-loading__actions"><Shape kind="button" /><Shape kind="button" /></div></div></div>;
    case "newsletter-unsubscribe": return <div className="page-loading__unsubscribe"><div className="page-loading__shell page-loading__unsubscribe-grid"><div><Shape kind="heading" /><Shape kind="body" /><Shape kind="body-short" /><Shape kind="back" /></div><div className="page-loading__unsubscribe-panel"><Shape kind="section-title" /><Shape kind="body-short" /><Shape kind="field" /><Shape kind="button" /></div></div></div>;
  }
}

export function PageLoading({ variant, label }: { variant: Variant; label: string }) {
  return <div className={`page-loading page-loading--${variant}`} role="status" aria-live="polite" aria-busy="true"><span className="sr-only">Loading {label}</span><div aria-hidden="true"><Header /><Body variant={variant} /></div></div>;
}
