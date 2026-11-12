"use client";

import { useEffect, useState } from "react";
import { NAV_SECTION_IDS, type NavSectionId } from "@/lib/sections";
import { HEADER_OFFSET } from "./header-geometry";

const ARRIVED_TOLERANCE = 2;
const RELEASE_DISTANCE = 40;
const RELEASE_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
const BOTTOM_EPSILON = 2;
const ACTIVE_VIEWPORT_FRACTION = 0.35;

type Lock = { id: NavSectionId; targetY: number; arrived: boolean };

let lock: Lock | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function handleScroll() {
  if (!lock) return;
  const distance = Math.abs(window.scrollY - lock.targetY);
  if (distance <= ARRIVED_TOLERANCE) {
    lock.arrived = true;
  } else if (lock.arrived && distance > RELEASE_DISTANCE) {
    releaseSection();
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (RELEASE_KEYS.has(event.key)) releaseSection();
}

function attach() {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("wheel", releaseSection, { passive: true });
  window.addEventListener("touchmove", releaseSection, { passive: true });
  window.addEventListener("keydown", handleKeydown);
}

function detach() {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("wheel", releaseSection);
  window.removeEventListener("touchmove", releaseSection);
  window.removeEventListener("keydown", handleKeydown);
}

export function lockSection(id: NavSectionId, targetY: number) {
  if (!lock) attach();
  lock = { id, targetY, arrived: Math.abs(window.scrollY - targetY) <= ARRIVED_TOLERANCE };
  notify();
}

export function releaseSection() {
  if (!lock) return;
  lock = null;
  detach();
  notify();
}

function getLockedSection(): NavSectionId | null {
  return lock?.id ?? null;
}

function subscribeToSectionLock(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function currentSection(): NavSectionId | null {
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_EPSILON;
  if (atBottom) return NAV_SECTION_IDS[NAV_SECTION_IDS.length - 1];

  const threshold = Math.max(HEADER_OFFSET + 1, window.innerHeight * ACTIVE_VIEWPORT_FRACTION);
  let current: NavSectionId | null = null;
  for (const id of NAV_SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= threshold) current = id;
  }
  return current;
}

export function useActiveSection(): NavSectionId | null {
  const [active, setActive] = useState<NavSectionId | null>(null);

  useEffect(() => {
    let frame = 0;

    function measure() {
      frame = 0;
      setActive(getLockedSection() ?? currentSection());
    }

    function schedule() {
      if (frame === 0) frame = requestAnimationFrame(measure);
    }

    measure();
    const unsubscribe = subscribeToSectionLock(schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      unsubscribe();
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}
