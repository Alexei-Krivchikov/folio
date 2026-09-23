"use client";

import { type RefObject, useEffect } from "react";

const FOCUSABLE_SELECTOR = "a[href], button:not([disabled])";

function focusableWithin(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

function wrapFocus(panel: HTMLElement, event: KeyboardEvent) {
  const items = focusableWithin(panel);
  if (items.length === 0) return;

  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  const outside = !(active instanceof Node) || !panel.contains(active);

  if (event.shiftKey && (outside || active === first)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (outside || active === last)) {
    event.preventDefault();
    first.focus();
  }
}

export function useFocusTrap(panelRef: RefObject<HTMLElement | null>, trapped: boolean) {
  useEffect(() => {
    if (!trapped) return;

    const panel = panelRef.current;
    if (!panel) return;

    focusableWithin(panel)[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") wrapFocus(panel, event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [panelRef, trapped]);
}
