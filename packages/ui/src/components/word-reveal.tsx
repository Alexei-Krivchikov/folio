"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment } from "react";
import { cn } from "../lib/utils";

const WORD_RISE = 8;
const WORD_DURATION = 0.4;
const WORD_STAGGER = 0.03;
const viewport = { once: true, margin: "-80px" } as const;

const containers = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
} as const;

export interface WordRevealProps {
  children: string;
  className?: string;
  as?: keyof typeof containers;
}

const animatedContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: WORD_STAGGER } },
};

const animatedWord: Variants = {
  hidden: { opacity: 0, y: WORD_RISE },
  show: { opacity: 1, y: 0, transition: { duration: WORD_DURATION, ease: "easeOut" } },
};

const staticContainer: Variants = { hidden: {}, show: {} };

const staticWord: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function WordReveal({ children, className, as = "p" }: WordRevealProps) {
  const reduced = useReducedMotion();
  const Container = containers[as];
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Container
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={reduced ? staticContainer : animatedContainer}
    >
      <span className="sr-only select-none">{children}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            {index > 0 && " "}
            <motion.span
              className={cn("inline-block", "motion-reduce:transform-none! motion-reduce:opacity-100!")}
              variants={reduced ? staticWord : animatedWord}
            >
              {word}
            </motion.span>
          </Fragment>
        ))}
      </span>
    </Container>
  );
}
