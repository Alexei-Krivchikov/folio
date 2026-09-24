import type { TargetAndTransition, Variants } from "motion/react";

export const viewportOnce = { once: true, margin: "-80px" } as const;

const instant = { duration: 0 } as const;
const easeOut = "easeOut" as const;

const staticShow: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1, transition: instant },
};

const staticStagger: Variants = {
  hidden: {},
  show: { transition: instant },
};

export function staggerVariants(
  reduced: boolean,
  { staggerChildren, delayChildren = 0 }: { staggerChildren: number; delayChildren?: number },
): Variants {
  if (reduced) return staticStagger;
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}

export function fadeUpVariants(reduced: boolean, { y, duration }: { y: number; duration: number }): Variants {
  if (reduced) return staticShow;
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: easeOut } },
  };
}

export function scaleInVariants(reduced: boolean, { scale, duration }: { scale: number; duration: number }): Variants {
  if (reduced) return staticShow;
  return {
    hidden: { opacity: 0, scale },
    show: { opacity: 1, scale: 1, transition: { duration, ease: easeOut } },
  };
}

export function liftOnHover(reduced: boolean, y: number): TargetAndTransition | undefined {
  if (reduced) return undefined;
  return { y, transition: { duration: 0.2 } };
}
