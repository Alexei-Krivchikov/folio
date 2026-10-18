"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(pointer: fine) and (hover: hover)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const pointer = window.matchMedia(FINE_POINTER_QUERY);
  const reduce = window.matchMedia(REDUCE_QUERY);
  pointer.addEventListener("change", onStoreChange);
  reduce.addEventListener("change", onStoreChange);
  return () => {
    pointer.removeEventListener("change", onStoreChange);
    reduce.removeEventListener("change", onStoreChange);
  };
}

function getSnapshot(): boolean {
  return window.matchMedia(FINE_POINTER_QUERY).matches && !window.matchMedia(REDUCE_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePointerMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
