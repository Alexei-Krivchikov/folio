"use client";

import { cn } from "@folio/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { useLenis } from "@/components/providers/lenis-provider";
import { HEADER_PILL_HEIGHT, HEADER_TOP_GAP, NAV_LINKS } from "@/lib/navigation";
import { NavOverlay } from "./nav-overlay";
import { useCloseOnDesktop } from "./use-close-on-desktop";
import { useActiveSection, useHeroPassed } from "./use-header-state";

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.75">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function NavLinks({ active }: { active: string | null }) {
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            aria-current={active === link.id ? "true" : undefined}
            className={cn(
              "text-sm transition-colors hover:text-foreground",
              focusRing,
              active === link.id ? "text-accent" : "text-muted",
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  const visible = useHeroPassed();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const reducedMotion = usePrefersReducedMotion();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useCloseOnDesktop(closeMenu);

  const handleLogoClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { immediate: reducedMotion });
      } else {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      }
    },
    [pathname, lenis, reducedMotion],
  );

  return (
    <>
      <header
        style={{ top: HEADER_TOP_GAP, height: HEADER_PILL_HEIGHT }}
        className={cn(
          "fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-pill border border-border bg-background/70 backdrop-blur-md transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        inert={!visible}
      >
        <nav className="flex h-full w-full items-center justify-between pr-3 pl-6">
          <Link
            href="/"
            onClick={handleLogoClick}
            className={cn("flex h-11 items-center text-sm md:h-auto font-semibold text-foreground", focusRing)}
          >
            Alexei Krivchikov
          </Link>

          <NavLinks active={active} />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-foreground md:hidden",
              focusRing,
            )}
          >
            <MenuIcon />
          </button>
        </nav>
      </header>

      <NavOverlay open={menuOpen} onClose={closeMenu} />
    </>
  );
}
