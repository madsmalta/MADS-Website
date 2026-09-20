// Small decorative line artwork; the surrounding content supplies its meaning.
export function DentalDetail({ mirror = true }: { mirror?: boolean }) {
 return <svg className="dental-detail" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <g transform={mirror ? undefined : "translate(48 0) scale(-1 1)"}><circle cx="16" cy="13" r="9"/><circle cx="16" cy="13" r="6.5"/><path d="m12 12 3-3m-1 7 5-5m3 9 4 4-1 4"/><path d="m25 28 3-2 13 15c1 2-2 4-3 2Z"/><path d="m29 31 2-2m1 5 2-2m1 5 2-2"/></g>
 </svg>;
}
