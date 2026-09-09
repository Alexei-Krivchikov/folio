"use client";

import { Button } from "@folio/ui";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[90vh] w-full max-w-5xl flex-col justify-center px-6 py-20">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
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
          <Button>Let&apos;s Talk</Button>
          <Button variant="outline">View Projects</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
