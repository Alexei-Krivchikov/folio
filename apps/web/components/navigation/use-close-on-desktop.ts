"use client";

import { useEffect } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

export function useCloseOnDesktop(close: () => void) {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);

    const handleChange = () => {
      if (desktop.matches) close();
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, [close]);
}
