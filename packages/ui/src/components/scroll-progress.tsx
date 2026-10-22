"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "../lib/utils";

const PROGRESS_SPRING = { stiffness: 400, damping: 40, restDelta: 0.0005 };

export interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const eased = useSpring(scrollYProgress, PROGRESS_SPRING);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 origin-left select-none bg-accent",
        className,
      )}
      style={{ scaleX: reduced ? scrollYProgress : eased }}
    />
  );
}
