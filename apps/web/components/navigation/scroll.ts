import type Lenis from "lenis";
import { isNavSectionId } from "@/lib/sections";
import { lockSection, releaseSection } from "./active-section";
import { HEADER_OFFSET } from "./header-geometry";

const ANCHOR_SCROLL_SKIP_ATTR = "data-anchor-scroll-skip";

export const anchorScrollSkipProps = { [ANCHOR_SCROLL_SKIP_ATTR]: "" } as const;

export function skipsAnchorScroll(anchor: HTMLAnchorElement): boolean {
  return anchor.hasAttribute(ANCHOR_SCROLL_SKIP_ATTR);
}

function scrollToY(lenis: Lenis | null, top: number, options?: { immediate?: boolean; behavior?: ScrollBehavior }) {
  if (lenis) {
    lenis.scrollTo(top, { immediate: options?.immediate });
  } else {
    window.scrollTo({ top, behavior: options?.behavior });
  }
}

export function scrollToSection(lenis: Lenis | null, section: HTMLElement, options?: { immediate?: boolean }) {
  const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (isNavSectionId(section.id)) {
    lockSection(section.id, Math.max(0, Math.min(top, maxScroll)));
  } else {
    releaseSection();
  }
  scrollToY(lenis, top, options);
}

export function navigateToSection(lenis: Lenis | null, section: HTMLElement, hash: string) {
  window.history.pushState(null, "", hash);
  scrollToSection(lenis, section);
}

export function scrollToTop(lenis: Lenis | null, { reducedMotion }: { reducedMotion: boolean }) {
  scrollToY(lenis, 0, { immediate: reducedMotion, behavior: reducedMotion ? "auto" : "smooth" });
}
