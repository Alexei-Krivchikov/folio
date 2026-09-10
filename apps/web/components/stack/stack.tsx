"use client";

import { motion } from "motion/react";

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

const section = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const groupAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const tileAnim = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};
const tileHover = { y: -4, transition: { duration: 0.2 } };
const viewportOnce = { once: true, margin: "-80px" } as const;

export function Stack() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
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
