"use client";

import { buttonVariants, cn } from "@folio/ui";
import { motion } from "motion/react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, staggerVariants } from "@/components/motion/variants";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const container = staggerVariants(reduced, { staggerChildren: 0.12, delayChildren: 0.15 });
  const item = fadeUpVariants(reduced, { y: 25, duration: 0.6 });

  return (
    <section id="hero" className="mx-auto flex min-h-[90vh] w-full max-w-5xl flex-col justify-center px-6 py-20">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-300"
        >
          <span className={cn("h-2 w-2 rounded-full bg-green-500", !reduced && "animate-pulse")} />
          Available for full-time opportunities
        </motion.p>

        <motion.p variants={item} className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Hi! I&apos;m Alexei Krivchikov.
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl"
        >
          FRONTEND
          <br />
          DEVELOPER
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
          A creative Frontend Developer building high-performance, scalable, and responsive web solutions.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Link href="#contact" className={buttonVariants()}>
            Let&apos;s Talk
          </Link>
          <Link href="#projects" className={buttonVariants({ variant: "outline" })}>
            View Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
