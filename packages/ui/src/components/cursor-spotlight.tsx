"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { usePointerMotion } from "../lib/use-pointer-motion";

const SPOTLIGHT_SPRING = { stiffness: 120, damping: 30, mass: 0.8 };
const PRESENCE_SPRING = { stiffness: 200, damping: 30 };

function SpotlightSurface() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const presence = useMotionValue(0);

  const x = useSpring(pointerX, SPOTLIGHT_SPRING);
  const y = useSpring(pointerY, SPOTLIGHT_SPRING);
  const opacity = useSpring(presence, PRESENCE_SPRING);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      if (presence.get() === 0) {
        x.jump(event.clientX);
        y.jump(event.clientY);
        presence.set(1);
      }
    };

    const onLeave = () => presence.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerX, pointerY, presence, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 -mt-[210px] -ml-[210px] h-[420px] w-[420px] select-none bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)] mix-blend-screen will-change-transform"
      style={{ x, y, opacity }}
    />
  );
}

export function CursorSpotlight() {
  const enabled = usePointerMotion();
  return enabled ? <SpotlightSurface /> : null;
}
