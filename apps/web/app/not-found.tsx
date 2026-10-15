import { buttonVariants, HudLabel } from "@folio/ui";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Alexei Krivchikov",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <HudLabel as="p">[ 404 ]</HudLabel>
      <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you&apos;re looking for was moved, renamed, or never existed.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8 max-md:h-11`}>
        Back to home
      </Link>
    </main>
  );
}
