"use client";

import { motion } from "motion/react";

const links = [
  { label: "GitHub", href: "https://github.com/Alexey-Krivcikov", external: true },
  { label: "Telegram", href: "https://t.me/AlexeiKrivchikov", external: true },
  { label: "Email", href: "mailto:krivchikov.alexei@gmail.com", external: false },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Contact() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
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
        viewport={{ once: true, margin: "-80px" }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {links.map((link) => (
          <motion.a
            key={link.label}
            variants={fadeUp}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm text-zinc-200 transition hover:border-zinc-600 hover:text-white"
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
