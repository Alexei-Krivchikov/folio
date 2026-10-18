"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { usePointerMotion } from "../lib/use-pointer-motion";

const TILT_SPRING = { stiffness: 180, damping: 20, mass: 0.6 };
const LIGHT_SPRING = { stiffness: 220, damping: 28, mass: 0.5 };
const PERSPECTIVE = 1000;

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxAngle?: number;
  lightSize?: number;
  lightStrength?: number;
}

function TiltSurface({
  children,
  className,
  maxAngle,
  lightSize,
  lightStrength,
}: Required<Omit<TiltCardProps, "className">> & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const lightOpacity = useMotionValue(0);

  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);
  const smoothLightX = useSpring(lightX, LIGHT_SPRING);
  const smoothLightY = useSpring(lightY, LIGHT_SPRING);
  const smoothLightOpacity = useSpring(lightOpacity, LIGHT_SPRING);

  const rotateX = useTransform(smoothY, (value) => -value * maxAngle);
  const rotateY = useTransform(smoothX, (value) => value * maxAngle);

  const lightBackground = useMotionTemplate`radial-gradient(${lightSize}px circle at ${smoothLightX}% ${smoothLightY}%, color-mix(in oklab, var(--accent) ${lightStrength}%, transparent), transparent 70%)`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const locate = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const onEnter = (event: PointerEvent) => {
      const { x, y } = locate(event);
      smoothLightX.jump(x * 100);
      smoothLightY.jump(y * 100);
      lightOpacity.set(1);
    };

    const onMove = (event: PointerEvent) => {
      const { x, y } = locate(event);
      pointerX.set(x * 2 - 1);
      pointerY.set(y * 2 - 1);
      lightX.set(x * 100);
      lightY.set(y * 100);
    };

    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
      lightOpacity.set(0);
    };

    element.addEventListener("pointerenter", onEnter, { passive: true });
    element.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [lightOpacity, lightX, lightY, pointerX, pointerY, smoothLightX, smoothLightY]);

  return (
    <div ref={ref} className={className} style={{ perspective: PERSPECTIVE }}>
      <motion.div className="relative h-full rounded-[inherit]" style={{ rotateX, rotateY }}>
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ backgroundImage: lightBackground, opacity: smoothLightOpacity }}
        />
      </motion.div>
    </div>
  );
}

export function TiltCard({ children, className, maxAngle = 6, lightSize = 520, lightStrength = 14 }: TiltCardProps) {
  const enabled = usePointerMotion();

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <TiltSurface className={className} maxAngle={maxAngle} lightSize={lightSize} lightStrength={lightStrength}>
      {children}
    </TiltSurface>
  );
}
