"use client";

import { useEffect, useState } from "react";
import { HEADER_OFFSET, NAV_SECTION_IDS, type NavSectionId } from "@/lib/navigation";
import { getLockedSection, subscribeToSectionLock } from "./section-lock";

const BOTTOM_EPSILON = 2;
const ACTIVE_VIEWPORT_FRACTION = 0.35;

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

function currentSection(): NavSectionId | null {
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_EPSILON;
  if (atBottom) return NAV_SECTION_IDS[NAV_SECTION_IDS.length - 1];

  const threshold = Math.max(HEADER_OFFSET + 1, window.innerHeight * ACTIVE_VIEWPORT_FRACTION);
  let current: NavSectionId | null = null;
  for (const id of NAV_SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= threshold) current = id;
  }
  return current;
}

export function useActiveSection(): NavSectionId | null {
  const [active, setActive] = useState<NavSectionId | null>(null);

  useEffect(() => {
    let frame = 0;

    function measure() {
      frame = 0;
      setActive(getLockedSection() ?? currentSection());
    }

    function schedule() {
      if (frame === 0) frame = requestAnimationFrame(measure);
    }

    measure();
    const unsubscribe = subscribeToSectionLock(schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      unsubscribe();
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}
