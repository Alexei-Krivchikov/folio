"use client";

import { SectionHeading } from "@folio/ui";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, viewportOnce } from "@/components/motion/variants";

type Job = { role: string; org: string; period: string; current?: boolean };

const jobs: Job[] = [
  {
    role: "Frontend / FullStack Developer",
    org: "Anthill",
    period: "2023 — Present",
    current: true,
  },
];

const DOT_FILL_RANGE = 0.04;

function Entry({
  job,
  index,
  total,
  progress,
  reduced,
}: {
  job: Job;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const reachedAt = index / total;
  const fill = useTransform(progress, [reachedAt, reachedAt + DOT_FILL_RANGE], [0, 1]);

  return (
    <li className="relative">
      <span aria-hidden="true" className="absolute top-2 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full bg-muted/40">
        <motion.span
          className="absolute inset-0 rounded-full bg-accent motion-reduce:opacity-100!"
          style={{ opacity: reduced ? 1 : fill }}
        />
        {job.current && !reduced && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent motion-reduce:hidden"
            animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
            transition={{ duration: 2.4, ease: "easeOut", repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{job.period}</p>
      <h3 className="mt-1 text-xl font-semibold text-foreground">{job.role}</h3>
      <p className="mt-0.5 text-sm text-muted">{job.org}</p>
    </li>
  );
}

export function Experience() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 60%"] });

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <SectionHeading label="[ 03 / EXPERIENCE ]">My Experience</SectionHeading>

        <div className="relative mt-10 pl-8">
          <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-border" />
          <motion.span
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-px origin-top bg-linear-to-b from-accent-from to-accent-to motion-reduce:transform-none!"
            style={{ scaleY: reduced ? 1 : scrollYProgress }}
          />
          <ol ref={listRef} className="flex flex-col gap-10">
            {jobs.map((job, index) => (
              <Entry
                key={job.org}
                job={job}
                index={index}
                total={jobs.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
