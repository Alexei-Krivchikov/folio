"use client";

import { HudLabel, Marquee, SectionHeading, WordReveal } from "@folio/ui";
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
import { sectionIndex } from "@/lib/navigation";

const INTRODUCTION =
  "At Anthill I work on DominoCRM, a no-code chatbot builder with a shared inbox for messengers. I build the parts users spend their day in: the visual flow editor, where a graph of steps has to stay in sync while it is dragged, edited and validated, and live chats and group chats that update in real time. I'm a frontend developer and go fullstack when the product needs it.";

const PATH_LINE =
  "Started with Yandex Practicum and its community, kept learning new technologies on my own, and have shipped in production ever since.";

const practices = [
  {
    title: "Predictable under real use.",
    text: "Deep forms, live data and screens people keep open all day. I push for one shared vocabulary for loading, empty and error states instead of each screen inventing its own.",
  },
  {
    title: "At home in teams of any size.",
    text: "I've shipped with a handful of developers and with many, inside a standard review and release flow, and I led a small team on the product's landing site.",
  },
];

const marqueeItems = groups.flatMap((group) => group.items);

const MARQUEE_SECONDS_PER_ITEM = 3.5;

const CARD = "rounded-xl border border-border bg-foreground/3 p-6 md:p-8";

export function About() {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.1 });
  const fadeUp = fadeUpVariants(reduced, { y: 25, duration: 0.6 });
  const cardAnim = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const tileAnim = scaleInVariants(reduced, { scale: 0.92, duration: 0.35 });
  const tileHover = liftOnHover(reduced, -4);

  return (
    <section id="about" className="w-full py-16">
      <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="mx-auto max-w-5xl px-6">
          <SectionHeading label={sectionIndex("about")}>About</SectionHeading>
        </motion.div>

        <motion.div variants={fadeUp} aria-hidden="true" className="mt-10">
          <Marquee duration={marqueeItems.length * MARQUEE_SECONDS_PER_ITEM} itemClassName="px-5">
            {marqueeItems.map(({ name, Icon, hex }) => (
              <span key={name} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <Icon size={20} title="" color={brandOverrides[name] ?? hex} className="shrink-0" />
                {name}
              </span>
            ))}
          </Marquee>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 px-6 md:grid-cols-12">
          <motion.div
            variants={cardAnim}
            className={`${CARD} flex flex-col justify-between gap-8 md:col-span-8 md:row-span-2`}
          >
            <WordReveal className="text-xl leading-relaxed text-foreground md:text-2xl">{INTRODUCTION}</WordReveal>
            <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted">{PATH_LINE}</p>
          </motion.div>

          {practices.map((practice) => (
            <motion.div key={practice.title} variants={cardAnim} className={`${CARD} md:col-span-4`}>
              <h3 className="text-lg font-semibold text-foreground">{practice.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{practice.text}</p>
            </motion.div>
          ))}

          <motion.div variants={cardAnim} className={`${CARD} md:col-span-12`}>
            <div className="flex flex-col gap-6">
              {groups.map((group) => (
                <div key={group.title} className="grid gap-3 md:grid-cols-[8.5rem_1fr] md:items-start md:gap-6">
                  <HudLabel as="h3" className="font-semibold md:pt-2.5">
                    {group.title}
                  </HudLabel>
                  <div className="flex flex-wrap gap-2.5">
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
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
