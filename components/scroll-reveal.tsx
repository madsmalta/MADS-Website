"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "[data-scroll-reveal]";
const motion = {
  duration: 760,
  easing: "cubic-bezier(0.22, 0.8, 0.25, 1)",
  distance: 44,
  triggerInset: 96,
};

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const setup = () => {
    const main = document.querySelector("main");
    if (!main || !("animate" in HTMLElement.prototype)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const hashTarget = document.getElementById(window.location.hash.slice(1));
    const distance = motion.distance;
    const visibleRange = () => {
      const top = window.visualViewport?.offsetTop ?? 0;
      const height = window.visualViewport?.height ?? window.innerHeight;
      return { top, bottom: top + height - Math.min(motion.triggerInset, height * 0.2) };
    };

    const pending = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    let frame = 0;
    const reveal = (element: HTMLElement, animate = true) => {
      if (!pending.delete(element)) return;
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

    const checkPending = () => {
      frame = 0;
      const { top, bottom } = visibleRange();
      for (const element of Array.from(pending)) {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom <= top) reveal(element, false);
        else if (bounds.top <= bottom) reveal(element);
      }
    };
    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkPending);
    };

    const active = document.activeElement;
    const { top, bottom } = visibleRange();
    for (const element of main.querySelectorAll<HTMLElement>(selector)) {
      const bounds = element.getBoundingClientRect();
      // The first screen, restored scroll positions and focused content stay ready to use.
      if ((bounds.top <= bottom && bounds.bottom > top) || bounds.bottom <= top || (active && element.contains(active)) || (hashTarget && (hashTarget.contains(element) || element.contains(hashTarget)))) continue;
      element.style.setProperty("--scroll-reveal-distance", `${distance}px`);
      element.classList.add("scroll-reveal-pending");
      pending.add(element);
    }
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    window.visualViewport?.addEventListener("scroll", scheduleCheck, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleCheck);
    scheduleCheck();

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
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      window.visualViewport?.removeEventListener("scroll", scheduleCheck);
      window.visualViewport?.removeEventListener("resize", scheduleCheck);
      document.removeEventListener("focusin", revealFocused);
      window.removeEventListener("hashchange", revealHashTarget);
      reducedMotion.removeEventListener("change", revealAll);
      window.cancelAnimationFrame(frame);
      revealAll();
    };
    };

    // On phones, arm the reveals after RouteScroll's two-frame scroll reset.
    // Otherwise the previous page's scroll position can mark new content as seen.
    // Keep the existing synchronous desktop setup and motion values unchanged.
    if (!window.matchMedia("(max-width: 600px)").matches) return setup();
    let secondFrame = 0;
    let cleanup: (() => void) | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => { cleanup = setup(); });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
