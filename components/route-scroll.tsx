"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteScroll() {
 const path = usePathname();
 useEffect(() => {
  if (window.location.hash) return;
  // Let the router finish its layout/scroll pass before resetting the new page.
  let second = 0;
  const first = requestAnimationFrame(() => {
   window.scrollTo({top:0,left:0,behavior:"instant"});
   second = requestAnimationFrame(() => window.scrollTo({top:0,left:0,behavior:"instant"}));
  });
  return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
 }, [path]);
 return null;
}
