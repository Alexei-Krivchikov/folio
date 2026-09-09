"use client";

import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const viewportOnce = { once: true, margin: "-80px" } as const;

export function About() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">This is me.</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">About</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
          I&apos;m a frontend developer dedicated to turning ideas into creative solutions. I specialize in creating
          seamless and intuitive user experiences.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          My approach focuses on scalable, high-performing solutions tailored to both user needs and business
          objectives. By prioritizing performance, accessibility, and responsiveness, I deliver experiences that engage
          users and drive tangible results.
        </p>
      </motion.div>
    </section>
  );
}
