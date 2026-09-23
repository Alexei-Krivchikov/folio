"use client";

import { cn } from "@folio/ui";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { HEADER_OFFSET, NAV_LINKS } from "@/lib/navigation";
import { NavOverlay } from "./nav-overlay";
import { useCloseOnDesktop } from "./use-close-on-desktop";
import { useActiveSection, useHeroPassed } from "./use-header-state";

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

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
              "text-sm transition-colors hover:text-white",
              focusRing,
              active === link.id ? "text-white underline decoration-2 underline-offset-8" : "text-zinc-400",
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

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useCloseOnDesktop(closeMenu);

  return (
    <>
      <header
        style={{ height: HEADER_OFFSET }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-background/70 backdrop-blur transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        inert={!visible}
      >
        <nav className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className={cn("text-sm font-semibold text-white", focusRing)}>
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
              "-mr-3 flex h-11 w-11 items-center justify-center text-zinc-300 transition-colors hover:text-white md:hidden",
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
