// Decorative instrument silhouettes inherit the page's muted accent colour.
export function DentalDetail({kind = "mirror"}: {kind?: "mirror" | "tweezers"}) {
 return <span className="dental-detail" data-dental-icon={kind} aria-hidden="true"/>;
}
