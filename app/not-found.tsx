import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return <PageShell><section className="error-page shell" aria-labelledby="not-found-title">
    <div className="error-page-mark" aria-hidden="true">404<span className="error-page-mark-line" /></div>
    <div className="error-page-copy">
      <h1 id="not-found-title">Page not found</h1>
      <p>The link may have changed, or the page may not be public. Let’s get you back to MADS.</p>
      <div className="error-page-actions"><Link className="button button--dark" href="/">Return home</Link></div>
    </div>
  </section></PageShell>;
}
