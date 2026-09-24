"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

type LenisState = {
  instance: Lenis | null;
  ready: boolean;
};

const LenisContext = createContext<LenisState>({ instance: null, ready: false });

export function useLenis(): Lenis | null {
  return useContext(LenisContext).instance;
}

export function useLenisReady(): boolean {
  return useContext(LenisContext).ready;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LenisState>({ instance: null, ready: false });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setState({ instance: null, ready: true });
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      stopInertiaOnNavigate: true,
    });
    setState({ instance, ready: true });

    return () => {
      instance.destroy();
      setState({ instance: null, ready: false });
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={state}>{children}</LenisContext.Provider>;
}
