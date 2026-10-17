import type { NavSectionId } from "@/lib/navigation";

const ARRIVED_TOLERANCE = 2;
const RELEASE_DISTANCE = 40;
const RELEASE_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

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

export function getLockedSection(): NavSectionId | null {
  return lock?.id ?? null;
}

export function subscribeToSectionLock(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
