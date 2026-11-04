import { AccentText, buttonVariants, HudLabel } from "@folio/ui";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Alexei Krivchikov",
};

const glow = [
  "radial-gradient(55% 50% at 50% 38%, color-mix(in srgb, var(--accent-to) 22%, transparent), transparent 72%)",
  "radial-gradient(45% 40% at 20% 85%, color-mix(in srgb, var(--accent-from) 14%, transparent), transparent 72%)",
].join(", ");

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: glow }} />
      <HudLabel as="p">[ 404 · signal lost ]</HudLabel>
      <h1 className="mt-5 text-[clamp(2.25rem,9vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
        Nothing <AccentText>here</AccentText>
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
        This page was moved, renamed, or never existed.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8 max-md:h-11`}>
        Back to home
      </Link>
    </main>
  );
}
