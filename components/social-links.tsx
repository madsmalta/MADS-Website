function Instagram() {return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;}
function Facebook() {return <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.3-2 2-2h2V1.4C17.4 1.2 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z"/></svg>;}

export function SocialLinks({ showSeparator = false }: { showSeparator?: boolean }) {
 return <div className="social-links" aria-label="MADS social media">
  <a href="https://www.instagram.com/mads.malta" target="_blank" rel="noopener noreferrer" aria-label="MADS on Instagram — @mads.malta" title="@mads.malta"><Instagram/></a>
  {showSeparator && <span className="social-links__separator" aria-hidden="true">&amp;</span>}
  <a href="https://www.facebook.com/madsonline" target="_blank" rel="noopener noreferrer" aria-label="MADS on Facebook — Malta Association of Dental Students" title="Malta Association of Dental Students"><Facebook/></a>
 </div>;
}
