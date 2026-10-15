"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { fragment, vertex } from "./hero-shader.glsl";

const MAX_DPR = 1.5;
const FADE_IN_MS = 1600;

const aurora = { scale: 2.2, speed: 0.09, warp: 1.7, low: 0.3, high: 0.6 } as const;

function readColor(name: string) {
  return new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

export type ShaderStatus = "running" | "unavailable";

export function HeroShader({ onStatus }: { onStatus: (status: ShaderStatus) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

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
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width * renderer.dpr, height * renderer.dpr];
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const start = performance.now();
    let frame = 0;
    let shown = false;
    const tick = (now: number) => {
      program.uniforms.uTime.value = (now - start) / 1000;
      renderer.render({ scene: mesh });
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
        onStatus("running");
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [onStatus]);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />;
}
