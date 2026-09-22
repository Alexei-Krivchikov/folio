"use client";

import { cn } from "@folio/ui";
import Link from "next/link";
import { HEADER_OFFSET, NAV_LINKS } from "@/lib/navigation";
import { useActiveSection, useHeroPassed } from "./use-header-state";

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function Header() {
  const visible = useHeroPassed();
  const active = useActiveSection();

  return (
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
      </nav>
    </header>
  );
}
