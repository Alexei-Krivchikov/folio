import { buttonVariants } from "@folio/ui";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Alexei Krivchikov",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">404</p>
      <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
        The page you&apos;re looking for was moved, renamed, or never existed.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8`}>
        Back to home
      </Link>
    </main>
  );
}
