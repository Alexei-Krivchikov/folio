"use client";

import { SectionHeading } from "@folio/ui";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, viewportOnce } from "@/components/motion/variants";

export function About() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 25, duration: 0.6 });

  return (
    <section id="about" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <SectionHeading label="[ 01 / ABOUT ]">About</SectionHeading>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          I&apos;m a frontend developer dedicated to turning ideas into creative solutions. I specialize in creating
          seamless and intuitive user experiences.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          My approach focuses on scalable, high-performing solutions tailored to both user needs and business
          objectives. By prioritizing performance, accessibility, and responsiveness, I deliver experiences that engage
          users and drive tangible results.
        </p>
      </motion.div>
    </section>
  );
}
