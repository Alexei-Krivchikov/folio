"use client";

import { useEffect, useRef } from "react";
import { useLenis, useLenisReady } from "@/components/providers/lenis-provider";
import { HEADER_OFFSET, isSectionHash } from "@/lib/navigation";

function scrollTargetFor(section: HTMLElement): number {
  return section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
}

export function useAnchorScroll() {
  const lenis = useLenis();
  const lenisReady = useLenisReady();
  const didHashScroll = useRef(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const section = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!section) return;

      event.preventDefault();
      const top = scrollTargetFor(section);
      if (lenis) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({ top });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [lenis]);

  useEffect(() => {
    if (!lenisReady || didHashScroll.current) return;

    const hash = window.location.hash;
    const section = isSectionHash(hash) ? document.getElementById(hash.slice(1)) : null;
    if (!section) {
      didHashScroll.current = true;
      return;
    }

    const frame = requestAnimationFrame(() => {
      didHashScroll.current = true;
      const top = scrollTargetFor(section);
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(top, { immediate: true });
      } else {
        window.scrollTo({ top });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [lenis, lenisReady]);
}
