"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import {
  fadeUpVariants,
  liftOnHover,
  scaleInVariants,
  staggerVariants,
  viewportOnce,
} from "@/components/motion/variants";

const groups: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Motion", "Sass"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "Drizzle", "Prisma"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Vercel", "Biome", "Turborepo"],
  },
];

export function Stack() {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.1 });
  const groupAnim = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const tileAnim = scaleInVariants(reduced, { scale: 0.92, duration: 0.35 });
  const tileHover = liftOnHover(reduced, -4);

  return (
    <section id="stack" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.p variants={groupAnim} className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Toolbox
        </motion.p>
        <motion.h2 variants={groupAnim} className="mt-3 text-3xl font-bold text-white md:text-4xl">
          My Stack
        </motion.h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <motion.div key={group.title} variants={groupAnim}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={tileAnim}
                    whileHover={tileHover}
                    className="cursor-default rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
