import Link from "next/link";
export default function NotFound() { return <main className="error-page"><p className="eyebrow">Page not found</p><h1>This page has moved, or is not public.</h1><Link className="button button--dark" href="/">Return home</Link></main>; }
