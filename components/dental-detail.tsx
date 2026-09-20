// Small decorative line artwork; the surrounding content supplies its meaning.
export function DentalDetail({ mirror = false }: { mirror?: boolean }) {
 return <svg className="dental-detail" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {mirror ? <><ellipse cx="19" cy="15" rx="10" ry="11" transform="rotate(-30 19 15)"/><path d="m24 24 12 18m-9-20 12 18M14 13c0-3 2-5 5-5"/></> : <><path d="M24 10c-5 0-7-4-12-2-8 3-6 12-3 18 2 4 2 14 6 15 4 1 4-15 9-15s5 16 9 15c4-1 4-11 6-15 3-6 5-15-3-18-5-2-7 2-12 2Z"/><path d="M16 12c3 0 4 3 9 3M39 4v6m-3-3h6"/></>}
 </svg>;
}
