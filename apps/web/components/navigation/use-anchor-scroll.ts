"use client";

import { useEffect, useRef } from "react";
import { useLenis, useLenisReady } from "@/components/providers/lenis-provider";
import { isSectionHash } from "@/lib/sections";
import { navigateToSection, scrollToSection, skipsAnchorScroll } from "./scroll";

function getSectionFromHash(hash: string): HTMLElement | null {
  return isSectionHash(hash) ? document.getElementById(hash.slice(1)) : null;
}

export function useAnchorScroll() {
  const lenis = useLenis();
  const lenisReady = useLenisReady();
  const didHashScroll = useRef(false);

  useEffect(() => {
    function scrollToHash(options?: { immediate?: boolean }) {
      const section = getSectionFromHash(window.location.hash);
      if (section) scrollToSection(lenis, section, options);
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || skipsAnchorScroll(anchor)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const section = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!section) return;

      event.preventDefault();
      navigateToSection(lenis, section, hash);
    }

    function handlePopState() {
      scrollToHash();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenisReady || didHashScroll.current) return;

    const section = getSectionFromHash(window.location.hash);
    if (!section) {
      didHashScroll.current = true;
      return;
    }

    const frame = requestAnimationFrame(() => {
      didHashScroll.current = true;
      lenis?.resize();
      scrollToSection(lenis, section, { immediate: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [lenis, lenisReady]);
}
