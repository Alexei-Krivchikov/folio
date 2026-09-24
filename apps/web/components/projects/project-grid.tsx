"use client";

import { cn } from "@folio/ui";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, liftOnHover, staggerVariants, viewportOnce } from "@/components/motion/variants";

export type ProjectCard = {
  slug: string;
  number: string;
  name: string;
  meta: string;
  summary: string;
  stack: string[];
  cover: string;
};

const MAX_TAGS = 4;

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.12 });
  const fadeUp = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const cardHover = liftOnHover(reduced, -6);

  return (
    <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
      <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.3em] text-zinc-500">
        Selected work
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-white md:text-4xl">
        Projects
      </motion.h2>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const tags = project.stack.slice(0, MAX_TAGS);
          const hiddenTags = project.stack.length - tags.length;

          return (
            <motion.li key={project.slug} variants={fadeUp} whileHover={cardHover}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-800">
                  <Image
                    src={project.cover}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                    priority={index === 0}
                    className={cn(
                      "object-cover",
                      !reduced &&
                        "transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105",
                    )}
                  />
                </div>

                <div className="p-6">
                  <p className="font-mono text-sm text-zinc-500">{project.number}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{project.meta}</p>
                  <p className="mt-3 text-zinc-400">{project.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {tag}
                      </li>
                    ))}
                    {hiddenTags > 0 && <li className="px-1 py-1 text-xs text-zinc-500">+{hiddenTags}</li>}
                  </ul>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
