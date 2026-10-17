import type Lenis from "lenis";
import { HEADER_OFFSET, isNavSectionId } from "@/lib/navigation";
import { lockSection, releaseSection } from "./section-lock";

const ANCHOR_SCROLL_SKIP_ATTR = "data-anchor-scroll-skip";

export const anchorScrollSkipProps = { [ANCHOR_SCROLL_SKIP_ATTR]: "" } as const;

export function skipsAnchorScroll(anchor: HTMLAnchorElement): boolean {
  return anchor.hasAttribute(ANCHOR_SCROLL_SKIP_ATTR);
}

export function scrollToSection(lenis: Lenis | null, section: HTMLElement, options?: { immediate?: boolean }) {
  const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (isNavSectionId(section.id)) {
    lockSection(section.id, Math.max(0, Math.min(top, maxScroll)));
  } else {
    releaseSection();
  }
  if (lenis) {
    lenis.scrollTo(top, options);
  } else {
    window.scrollTo({ top });
  }
}
