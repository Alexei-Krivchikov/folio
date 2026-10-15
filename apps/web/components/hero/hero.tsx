"use client";

import { AccentText, buttonVariants, cn } from "@folio/ui";
import { motion } from "motion/react";
import Link from "next/link";
import { type ComponentType, type ReactNode, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { fadeUpVariants, staggerVariants } from "@/components/motion/variants";
import { afterFirstPaint } from "@/lib/after-first-paint";
import { HeroPoster } from "./hero-poster";
import type { HeroShaderProps, ShaderStatus } from "./hero-shader";

const STEP = 0.1;
const RISE = 28;
const DURATION = 0.7;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ facts }: { facts: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [shader, setShader] = useState<ShaderStatus | null>(null);
  const [Shader, setShaderComponent] = useState<ComponentType<HeroShaderProps> | null>(null);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const cancelSchedule = afterFirstPaint(() => {
      import("./hero-shader")
        .then((module) => {
          if (!cancelled) setShaderComponent(() => module.HeroShader);
        })
        .catch(() => {
          if (!cancelled) setShader("unavailable");
        });
    });
    return () => {
      cancelled = true;
      cancelSchedule();
    };
  }, [reduced]);

  const container = staggerVariants(reduced, { staggerChildren: 0 });
  const headline = staggerVariants(reduced, { staggerChildren: STEP });
  const enter = (index: number) =>
    fadeUpVariants(reduced, { y: RISE, duration: DURATION, delay: STEP * index, ease: EASE });
  const line = enter(0);
  const pill = enter(2);
  const subtitle = enter(3);
  const actions = enter(4);
  const factsStrip = enter(5);

  return (
    <section id="hero" className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden">
      <HeroPoster visible={reduced || shader === "unavailable"} />
      {Shader && !reduced && shader !== "unavailable" && <Shader onStatus={setShader} />}
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={pill}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.04em] text-foreground md:text-xs md:tracking-[0.12em]"
          >
            <span className={cn("h-2 w-2 rounded-full bg-green-500", !reduced && "animate-pulse")} />
            <span className="md:hidden">Open to opportunities</span>
            <span className="hidden md:inline">Building at Anthill · open to the right opportunity</span>
          </motion.p>

          <motion.h1
            variants={headline}
            className="font-extrabold uppercase leading-[0.92] tracking-tight text-foreground text-[clamp(2.25rem,calc((100vw-3rem)/6.1),8rem)]"
          >
            <motion.span variants={line} className="block">
              Alexei{" "}
            </motion.span>
            <motion.span variants={line} className="block">
              Krivchikov
            </motion.span>
          </motion.h1>

          <motion.p
            variants={subtitle}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-2xl"
          >
            Frontend <AccentText className="text-foreground">developer</AccentText> shipping CRM &amp; chatbot UIs
          </motion.p>

          <motion.div variants={actions} className="mt-8 flex flex-wrap gap-3">
            <Link href="#contact" className={cn(buttonVariants(), "max-md:h-11")}>
              Let&apos;s Talk
            </Link>
            <Link href="#projects" className={cn(buttonVariants({ variant: "outline" }), "max-md:h-11")}>
              View Projects
            </Link>
          </motion.div>

          <motion.div variants={factsStrip} className="mt-14 md:mt-20">
            {facts}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
