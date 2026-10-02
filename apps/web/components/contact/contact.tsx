"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, staggerVariants, viewportOnce } from "@/components/motion/variants";

const links = [
  { label: "GitHub", href: "https://github.com/Alexei-Krivchikov", external: true },
  { label: "Telegram", href: "https://t.me/A1exe1ch", external: true },
  { label: "Email", href: "mailto:krivchikov.alexei@gmail.com", external: false },
] as const;

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 16, duration: 0.5 });
  const stagger = staggerVariants(reduced, { staggerChildren: 0.08 });

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Contact</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Get in touch</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Open for frontend / fullstack opportunities. Fastest way — Telegram or Email.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-8 flex flex-wrap gap-3"
      >
        {links.map((link) => (
          <motion.a
            key={link.label}
            variants={fadeUp}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm md:py-2.5 text-zinc-200 transition hover:border-zinc-600 hover:text-white"
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
