"use client";

import { useCallback, useEffect, useState } from "react";

export function usePhotoSlideshow(photoCount: number) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [ready, setReady] = useState(true);

  const browse = useCallback((direction: number) => {
    setPrevious(current);
    setReady(false);
    setCurrent((current + direction + photoCount) % photoCount);
  }, [current, photoCount]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => browse(1), 6000);
    return () => window.clearTimeout(timer);
  }, [browse]);

  useEffect(() => {
    if (previous === null || !ready) return;
    const timer = window.setTimeout(() => setPrevious(null), 900);
    return () => window.clearTimeout(timer);
  }, [previous, ready]);

  return { current, previous, ready, browse, markReady: () => setReady(true) };
}
