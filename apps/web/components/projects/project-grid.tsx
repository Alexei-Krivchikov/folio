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
  type: "commercial" | "personal";
  typeLabel: string;
  meta: string;
  summary: string;
  stack: string[];
  cover: string;
};

const MAX_TAGS = 4;

const FEATURED_SIZES = "(min-width: 1024px) 440px, calc(100vw - 48px)";
const REGULAR_SIZES = "(min-width: 1024px) 476px, (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

const TYPE_STYLES: Record<ProjectCard["type"], string> = {
  commercial: "border-accent/40 bg-accent/10 text-accent",
  personal: "border-border bg-foreground/5 text-muted",
};

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.12 });
  const fadeUp = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const cardHover = liftOnHover(reduced, -6);

  return (
    <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
      <motion.div variants={fadeUp}>
        <SectionHeading label="[ 01 / PROJECTS ]">Projects</SectionHeading>
      </motion.div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const featured = index === 0;
          const tags = project.stack.slice(0, MAX_TAGS);
          const hiddenTags = project.stack.length - tags.length;

          return (
            <motion.li
              key={project.slug}
              variants={fadeUp}
              whileHover={cardHover}
              className={cn(featured && "md:col-span-2")}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-foreground/3 transition-[border-color,box-shadow] duration-300",
                  "hover:border-accent hover:shadow-[0_0_40px_-12px_var(--accent)]",
                  "focus-visible:border-accent focus-visible:shadow-[0_0_40px_-12px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  featured && "lg:flex-row",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden border-b border-border",
                    featured && "lg:aspect-auto lg:w-[45%] lg:shrink-0 lg:border-r lg:border-b-0",
                  )}
                >
                  <Image
                    src={project.cover}
                    alt={`${project.name} preview`}
                    fill
                    quality={90}
                    sizes={featured ? FEATURED_SIZES : REGULAR_SIZES}
                    priority={featured}
                    className={cn(
                      "object-cover object-top-left",
                      !reduced &&
                        "transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105",
                    )}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-sm text-muted">{project.number}</p>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-[0.15em]",
                        TYPE_STYLES[project.type],
                      )}
                    >
                      {project.typeLabel}
                    </span>
                  </div>
                  <h3 className={cn("mt-4 font-semibold text-foreground", featured ? "text-2xl" : "text-xl")}>
                    {project.name}
                  </h3>
                  {project.meta && <p className="mt-1 text-sm text-muted">{project.meta}</p>}
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

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    View project
                    <span
                      aria-hidden="true"
                      className={cn(!reduced && "transition-transform duration-300 group-hover:translate-x-1")}
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
