"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "[data-scroll-reveal]";
const motion = {
  duration: 760,
  easing: "cubic-bezier(0.22, 0.8, 0.25, 1)",
  distance: 44,
  mobileDistance: 28,
  triggerInset: 96,
};

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window) || !("animate" in HTMLElement.prototype)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const hashTarget = document.getElementById(window.location.hash.slice(1));
    const distance = window.matchMedia("(max-width: 700px)").matches ? motion.mobileDistance : motion.distance;

    const pending = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    const reveal = (element: HTMLElement, animate = true) => {
      if (!pending.delete(element)) return;
      observer.unobserve(element);
      if (!animate || reducedMotion.matches) {
        element.classList.remove("scroll-reveal-pending");
        element.style.removeProperty("--scroll-reveal-distance");
        return;
      }

      const animation = element.animate(
        [
          { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        { duration: motion.duration, easing: motion.easing, fill: "none" },
      );
      element.classList.remove("scroll-reveal-pending");
      element.style.removeProperty("--scroll-reveal-distance");
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    }, { rootMargin: `0px 0px -${motion.triggerInset}px 0px`, threshold: 0 });

    const active = document.activeElement;
    for (const element of main.querySelectorAll<HTMLElement>(selector)) {
      const bounds = element.getBoundingClientRect();
      // The first screen, restored scroll positions and focused content stay ready to use.
      if (bounds.top <= window.innerHeight - motion.triggerInset || bounds.bottom <= 0 || (active && element.contains(active)) || (hashTarget && (hashTarget.contains(element) || element.contains(hashTarget)))) continue;
      element.style.setProperty("--scroll-reveal-distance", `${distance}px`);
      element.classList.add("scroll-reveal-pending");
      pending.add(element);
      observer.observe(element);
    }

    const revealFocused = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>(selector);
      if (element) reveal(element, false);
    };
    const revealAll = () => {
      for (const element of Array.from(pending)) reveal(element, false);
      for (const animation of animations) animation.cancel();
    };
    const revealHashTarget = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      for (const element of Array.from(pending)) {
        if (target.contains(element) || element.contains(target)) reveal(element, false);
      }
    };
    document.addEventListener("focusin", revealFocused);
    window.addEventListener("hashchange", revealHashTarget);
    reducedMotion.addEventListener("change", revealAll);

    return () => {
      document.removeEventListener("focusin", revealFocused);
      window.removeEventListener("hashchange", revealHashTarget);
      reducedMotion.removeEventListener("change", revealAll);
      revealAll();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
