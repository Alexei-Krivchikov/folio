"use client";

import { AccentText, buttonVariants, cn } from "@folio/ui";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, staggerVariants } from "@/components/motion/variants";
import { HeroPoster } from "./hero-poster";

export function Hero({ facts }: { facts: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const container = staggerVariants(reduced, { staggerChildren: 0.12, delayChildren: 0.15 });
  const item = fadeUpVariants(reduced, { y: 25, duration: 0.6 });

  return (
    <section id="hero" className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden">
      <HeroPoster />
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.04em] text-foreground md:text-xs md:tracking-[0.12em]"
          >
            <span className={cn("h-2 w-2 rounded-full bg-green-500", !reduced && "animate-pulse")} />
            <span className="md:hidden">Open to opportunities</span>
            <span className="hidden md:inline">Building at Anthill · open to the right opportunity</span>
          </motion.p>

          <motion.h1
            variants={item}
            className="font-extrabold uppercase leading-[0.92] tracking-tight text-foreground text-[clamp(2.25rem,calc((100vw-3rem)/6.1),8rem)]"
          >
            Alexei
            <br />
            Krivchikov
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-2xl">
            Frontend <AccentText className="text-foreground">developer</AccentText> shipping CRM &amp; chatbot UIs
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link href="#contact" className={cn(buttonVariants(), "max-md:h-11")}>
              Let&apos;s Talk
            </Link>
            <Link href="#projects" className={cn(buttonVariants({ variant: "outline" }), "max-md:h-11")}>
              View Projects
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-14 md:mt-20">
            {facts}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
