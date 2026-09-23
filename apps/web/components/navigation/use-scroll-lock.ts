"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/lenis-provider";

export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    lenis?.stop();
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [locked, lenis]);
}
