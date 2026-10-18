"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { usePointerMotion } from "../lib/use-pointer-motion";
import { cn } from "../lib/utils";

const MAGNETIC_SPRING = { stiffness: 220, damping: 18, mass: 0.5 };

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  maxOffset?: number;
}

function MagneticSurface({
  children,
  className,
  radius,
  strength,
  maxOffset,
}: Required<Omit<MagneticButtonProps, "className">> & { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, MAGNETIC_SPRING);
  const y = useSpring(offsetY, MAGNETIC_SPRING);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rect: DOMRect | null = null;

    const invalidate = () => {
      rect = null;
    };

    const measure = () => {
      const measured = element.getBoundingClientRect();
      rect = new DOMRect(measured.left - x.get(), measured.top - y.get(), measured.width, measured.height);
      return rect;
    };

    const release = () => {
      offsetX.set(0);
      offsetY.set(0);
    };

    const onMove = (event: PointerEvent) => {
      const zone = rect ?? measure();
      const dx = Math.max(zone.left - event.clientX, 0, event.clientX - zone.right);
      const dy = Math.max(zone.top - event.clientY, 0, event.clientY - zone.bottom);
      if (Math.hypot(dx, dy) > radius) {
        release();
        return;
      }
      const pullX = (event.clientX - (zone.left + zone.width / 2)) * strength;
      const pullY = (event.clientY - (zone.top + zone.height / 2)) * strength;
      const length = Math.hypot(pullX, pullY);
      const scale = length > maxOffset ? maxOffset / length : 1;
      offsetX.set(pullX * scale);
      offsetY.set(pullY * scale);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true, capture: true });
    window.addEventListener("resize", invalidate, { passive: true });
    document.documentElement.addEventListener("pointerleave", release, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", invalidate, { capture: true });
      window.removeEventListener("resize", invalidate);
      document.documentElement.removeEventListener("pointerleave", release);
    };
  }, [maxOffset, offsetX, offsetY, radius, strength, x, y]);

  return (
    <motion.span ref={ref} className={cn("inline-block", className)} style={{ x, y }}>
      {children}
    </motion.span>
  );
}

export function MagneticButton({
  children,
  className,
  radius = 80,
  strength = 0.3,
  maxOffset = 8,
}: MagneticButtonProps) {
  const enabled = usePointerMotion();

  if (!enabled) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <MagneticSurface className={className} radius={radius} strength={strength} maxOffset={maxOffset}>
      {children}
    </MagneticSurface>
  );
}
