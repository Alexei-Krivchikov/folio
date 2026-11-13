"use client";

import { useEffect, useState } from "react";
import { HEADER_OFFSET } from "./header-geometry";

export function useHeroPassed(): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setPassed(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: `${HEADER_OFFSET}px 0px 0px 0px`,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return passed;
}
