"use client";

import { AccentText, buttonVariants, cn, MagneticButton, SectionHeading } from "@folio/ui";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, staggerVariants, viewportOnce } from "@/components/motion/variants";
import { sectionIndex } from "@/lib/navigation";

const links = [
  { label: "Telegram", href: "https://t.me/A1exe1ch", external: true, primary: true },
  { label: "Email", href: "mailto:krivchikov.alexei@gmail.com", external: false, primary: true },
  { label: "GitHub", href: "https://github.com/Alexei-Krivchikov", external: true, primary: false },
] as const;

const CLOSING_FONT_SIZE = "clamp(2.25rem, calc((100vw - 3rem) / 7), 6rem)";

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const fadeUp = fadeUpVariants(reduced, { y: 16, duration: 0.5 });
  const stagger = staggerVariants(reduced, { staggerChildren: 0.08 });

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <SectionHeading
          label={sectionIndex("contact")}
          className="font-extrabold uppercase leading-[0.92]"
          style={{ fontSize: CLOSING_FONT_SIZE }}
        >
          Let&apos;s build something <AccentText className="text-accent">together</AccentText>
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Open for frontend / fullstack opportunities. Fastest way: Telegram or Email.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 flex flex-wrap gap-3 md:gap-4"
      >
        {links.map((link) => (
          <motion.div key={link.label} variants={fadeUp}>
            <MagneticButton>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className={cn(
                  buttonVariants({ variant: link.primary ? "default" : "outline" }),
                  "h-14 px-8 text-base md:h-16 md:px-10",
                )}
              >
                {link.label}
              </a>
            </MagneticButton>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
