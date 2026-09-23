import type Lenis from "lenis";
import { HEADER_OFFSET } from "@/lib/navigation";

const ANCHOR_SCROLL_SKIP_ATTR = "data-anchor-scroll-skip";

export const anchorScrollSkipProps = { [ANCHOR_SCROLL_SKIP_ATTR]: "" } as const;

export function skipsAnchorScroll(anchor: HTMLAnchorElement): boolean {
  return anchor.hasAttribute(ANCHOR_SCROLL_SKIP_ATTR);
}

export function scrollToSection(lenis: Lenis | null, section: HTMLElement, options?: { immediate?: boolean }) {
  const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  if (lenis) {
    lenis.scrollTo(top, options);
  } else {
    window.scrollTo({ top });
  }
}
