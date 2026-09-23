"use client";

import { cn } from "@folio/ui";
import { useId, useRef } from "react";
import { useLenis } from "@/components/providers/lenis-provider";
import { HEADER_OFFSET, NAV_LINKS } from "@/lib/navigation";
import { anchorScrollSkipProps, scrollToSection } from "./scroll-to-section";
import { useEscapeKey } from "./use-escape-key";
import { useFocusTrap } from "./use-focus-trap";
import { useScrollLock } from "./use-scroll-lock";

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const linkClassName = cn(
  "flex min-h-[56px] items-center text-3xl font-semibold text-zinc-300 transition-colors hover:text-white",
  focusRing,
);

const iconButtonClassName = cn(
  "-mr-3 flex h-11 w-11 items-center justify-center text-zinc-300 transition-colors hover:text-white",
  focusRing,
);

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.75">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useScrollLock(open);
  useFocusTrap(panelRef, open);
  useEscapeKey(open, onClose);

  if (!open) return null;

  function followLink(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    onClose();

    const section = document.getElementById(id);
    if (!section) return;
    requestAnimationFrame(() => scrollToSection(lenis, section));
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
    >
      <div className="flex shrink-0 items-center justify-between px-6" style={{ height: HEADER_OFFSET }}>
        <h2 id={titleId} className="text-sm font-semibold text-white">
          Menu
        </h2>
        <button type="button" onClick={onClose} aria-label="Close menu" className={iconButtonClassName}>
          <CloseIcon />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-6 pb-12">
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                {...anchorScrollSkipProps}
                onClick={(event) => followLink(event, link.id)}
                className={linkClassName}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
