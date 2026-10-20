"use client";

import { HudLabel, SectionHeading } from "@folio/ui";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import {
  fadeUpVariants,
  liftOnHover,
  scaleInVariants,
  staggerVariants,
  viewportOnce,
} from "@/components/motion/variants";
import { brandOverrides, groups } from "@/components/stack/tech";

export function About() {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.1 });
  const fadeUp = fadeUpVariants(reduced, { y: 25, duration: 0.6 });
  const groupAnim = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const tileAnim = scaleInVariants(reduced, { scale: 0.92, duration: 0.35 });
  const tileHover = liftOnHover(reduced, -4);

  return (
    <section id="about" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.div variants={fadeUp}>
          <SectionHeading label="[ 02 / ABOUT ]">About</SectionHeading>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            I&apos;m a frontend developer dedicated to turning ideas into creative solutions. I specialize in creating
            seamless and intuitive user experiences.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            My approach focuses on scalable, high-performing solutions tailored to both user needs and business
            objectives. By prioritizing performance, accessibility, and responsiveness, I deliver experiences that
            engage users and drive tangible results.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <motion.div key={group.title} variants={groupAnim}>
              <HudLabel as="h3" className="font-semibold">
                {group.title}
              </HudLabel>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map(({ name, Icon, hex }) => (
                  <motion.span
                    key={name}
                    variants={tileAnim}
                    whileHover={tileHover}
                    style={{ "--brand": brandOverrides[name] ?? hex } as CSSProperties}
                    className="group/tile flex cursor-default items-center gap-2 rounded-lg border border-border bg-foreground/5 px-4 py-2 text-sm text-foreground hover:border-accent"
                  >
                    <Icon
                      size={16}
                      title=""
                      aria-hidden
                      className="shrink-0 transition-colors duration-200 group-hover/tile:text-(--brand)"
                    />
                    {name}
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
