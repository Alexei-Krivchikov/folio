"use client";

import { SectionHeading } from "@folio/ui";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, viewportOnce } from "@/components/motion/variants";
import { sectionIndex } from "@/lib/sections";

type Job = { role: string; org: string; period: string; current?: boolean; points?: string[] };

const jobs: Job[] = [
  {
    role: "Frontend / FullStack Developer",
    org: "Anthill",
    period: "2023 — Present",
    current: true,
    points: [
      "Built the visual flow editor: a graph of steps and connections that stays in sync with the canvas while it's dragged, edited and validated.",
      "Real-time chats and group chats over SignalR: messages, status changes and bot-to-operator hand-offs land in the right thread, in order, including after a reconnect.",
      "Broadcasts, automation rules and contact filters: deep conditional forms kept predictable.",
      "Interface in four languages with i18next: structured translation keys, no hard-coded copy.",
    ],
  },
  {
    role: "Developer",
    org: "Yandex Practicum · Workshop",
    period: "2022 — 2023",
  },
];

const DOT_FILL_RANGE = 0.04;

function Entry({
  job,
  reachedAt,
  progress,
  reduced,
}: {
  job: Job;
  reachedAt: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const fill = useTransform(progress, [reachedAt, reachedAt + DOT_FILL_RANGE], [0, 1]);

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        data-timeline-dot
        className="absolute top-2 -left-[calc(2rem+5px)] size-[11px] rounded-full bg-muted/40"
      >
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
      {job.points && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {job.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Experience() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 60%"] });
  const [dotPositions, setDotPositions] = useState<number[]>([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || reduced) return;

    const dots = Array.from(list.querySelectorAll("[data-timeline-dot]"));
    const measure = () => {
      const { top, height } = list.getBoundingClientRect();
      if (height > 0) {
        setDotPositions(dots.map((dot) => (dot.getBoundingClientRect().top - top) / height));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const entry of list.children) observer.observe(entry);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <SectionHeading label={sectionIndex("experience")}>My Experience</SectionHeading>

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
                reachedAt={dotPositions[index] ?? 1}
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
