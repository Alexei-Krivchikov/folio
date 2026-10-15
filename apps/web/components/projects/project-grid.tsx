"use client";

import { cn, SectionHeading } from "@folio/ui";
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
      <motion.div variants={fadeUp}>
        <SectionHeading label="[ 04 / PROJECTS ]">Projects</SectionHeading>
      </motion.div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const tags = project.stack.slice(0, MAX_TAGS);
          const hiddenTags = project.stack.length - tags.length;

          return (
            <motion.li key={project.slug} variants={fadeUp} whileHover={cardHover}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-foreground/[0.03] transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative aspect-video overflow-hidden border-b border-border">
                  <Image
                    src={project.cover}
                    alt={`${project.name} preview`}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 476px, (min-width: 768px) calc((100vw - 72px) / 2), 100vw"
                    priority={index === 0}
                    className={cn(
                      "object-cover",
                      !reduced &&
                        "transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105",
                    )}
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="font-mono text-sm text-muted">{project.number}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted">{project.meta}</p>
                  <p className="mt-3 text-muted">{project.summary}</p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border bg-foreground/5 px-2.5 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                    {hiddenTags > 0 && <li className="px-1 py-1 text-xs text-muted">+{hiddenTags}</li>}
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
