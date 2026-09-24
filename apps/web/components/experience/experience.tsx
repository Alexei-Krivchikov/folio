"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, viewportOnce } from "@/components/motion/variants";

const jobs: { role: string; org: string; period: string }[] = [
  {
    role: "Frontend / FullStack Developer",
    org: "Anthill",
    period: "2023 — Present",
  },
];

export function Experience() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 24, duration: 0.5 });

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Career</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">My Experience</h2>

        <div className="mt-10 border-l border-zinc-800 pl-6">
          {jobs.map((job) => (
            <div key={job.org} className="relative pb-2">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-white" />
              <p className="text-sm text-zinc-500">{job.period}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{job.role}</h3>
              <p className="mt-0.5 text-sm text-zinc-400">{job.org}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
