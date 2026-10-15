"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { useInView } from "@/components/motion/use-in-view";
import { usePageVisible } from "@/components/motion/use-page-visible";
import { fragment, vertex } from "./hero-shader.glsl";

const MAX_DPR = 1.5;
const FADE_IN_MS = 1600;
const RESIZE_DEBOUNCE_MS = 150;
const POINTER_SMOOTHING = 6;
const DRIFT_AMOUNT = 0.7;
const FINE_POINTER = "(pointer: fine) and (hover: hover)";

const aurora = { scale: 2.2, speed: 0.09, warp: 1.7, low: 0.3, high: 0.6 } as const;

function readColor(name: string) {
  return new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

export type ShaderStatus = "running" | "unavailable";

export type HeroShaderProps = { onStatus: (status: ShaderStatus) => void };

export function HeroShader({ onStatus }: HeroShaderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<((run: boolean) => void) | null>(null);
  const inView = useInView(hostRef);
  const pageVisible = usePageVisible();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 h-full w-full";
    canvas.style.opacity = "0";
    canvas.style.transition = `opacity ${FADE_IN_MS}ms ease-out`;
    host.appendChild(canvas);

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio, MAX_DPR),
        alpha: false,
        antialias: false,
        webgl: 2,
      });
    } catch {
      canvas.remove();
      onStatus("unavailable");
      return;
    }
    const gl = renderer.gl;

    if (!gl || !renderer.isWebgl2) {
      canvas.remove();
      onStatus("unavailable");
      return;
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uBackground: { value: readColor("--background") },
        uFrom: { value: readColor("--accent-from") },
        uTo: { value: readColor("--accent-to") },
        uScale: { value: aurora.scale },
        uSpeed: { value: aurora.speed },
        uWarp: { value: aurora.warp },
        uLow: { value: aurora.low },
        uHigh: { value: aurora.high },
        uPointer: { value: [0.5, 0.5] },
        uPointerAmount: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const fine = window.matchMedia(FINE_POINTER).matches;
    const section = host.parentElement;
    const target = { x: 0.5, y: 0.5, amount: fine ? 0 : DRIFT_AMOUNT };
    const current = { x: 0.5, y: 0.5, amount: target.amount };
    const pointer = { clientX: 0, clientY: 0, seen: false, snap: false };
    const bounds = { top: 0, width: 1, height: 1 };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      bounds.top = rect.top + window.scrollY;
      bounds.width = rect.width;
      bounds.height = rect.height;
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value = [rect.width * renderer.dpr, rect.height * renderer.dpr];
    };
    resize();
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, RESIZE_DEBOUNCE_MS);
    });
    observer.observe(host);

    const onPointerMove = (event: PointerEvent) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      if (!pointer.seen || current.amount < 0.02) pointer.snap = true;
      pointer.seen = true;
      target.amount = 1;
    };
    const onPointerLeave = () => {
      target.amount = 0;
    };
    if (fine && section) {
      section.addEventListener("pointermove", onPointerMove, { passive: true });
      section.addEventListener("pointerleave", onPointerLeave);
    }

    let seconds = 0;
    let last = 0;
    let frame = 0;
    let active = false;
    let shown = false;
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      seconds += delta;
      const ease = 1 - Math.exp(-delta * POINTER_SMOOTHING);

      if (fine) {
        if (pointer.seen) {
          target.x = pointer.clientX / bounds.width;
          target.y = 1 - (pointer.clientY + window.scrollY - bounds.top) / bounds.height;
        }
        if (pointer.snap) {
          pointer.snap = false;
          current.x = target.x;
          current.y = target.y;
        }
      } else {
        target.x = 0.5 + 0.28 * Math.sin(seconds * 0.21) + 0.12 * Math.sin(seconds * 0.53 + 1);
        target.y = 0.5 + 0.22 * Math.cos(seconds * 0.17) + 0.1 * Math.cos(seconds * 0.41 + 2);
      }
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.amount += (target.amount - current.amount) * ease;

      program.uniforms.uTime.value = seconds;
      program.uniforms.uPointer.value = [current.x, current.y];
      program.uniforms.uPointerAmount.value = current.amount;
      renderer.render({ scene: mesh });
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
        onStatus("running");
      }
      frame = requestAnimationFrame(tick);
    };

    const setActive = (run: boolean) => {
      if (run === active) return;
      active = run;
      if (run) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    };
    controlRef.current = setActive;

    return () => {
      controlRef.current = null;
      active = false;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      section?.removeEventListener("pointermove", onPointerMove);
      section?.removeEventListener("pointerleave", onPointerLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [onStatus]);

  useEffect(() => {
    controlRef.current?.(inView && pageVisible);
  }, [inView, pageVisible]);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />;
}
