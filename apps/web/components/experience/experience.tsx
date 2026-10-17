"use client";

import { SectionHeading } from "@folio/ui";
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
        <SectionHeading label="[ 04 / EXPERIENCE ]">My Experience</SectionHeading>

        <div className="mt-10 border-l border-border pl-6">
          {jobs.map((job) => (
            <div key={job.org} className="relative pb-2">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-sm text-muted">{job.period}</p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">{job.role}</h3>
              <p className="mt-0.5 text-sm text-muted">{job.org}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
