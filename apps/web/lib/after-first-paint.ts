const IDLE_TIMEOUT_MS = 1500;
const FALLBACK_DELAY_MS = 100;
const PAINT_WAIT_LIMIT_MS = 3000;

export function afterFirstPaint(callback: () => void): () => void {
  let cancelled = false;
  let idle: number | undefined;
  let timer: number | undefined;
  let limit: number | undefined;
  let observer: PerformanceObserver | undefined;
  let scheduled = false;

  const run = () => {
    if (!cancelled) callback();
  };

  const scheduleIdle = () => {
    if (scheduled || cancelled) return;
    scheduled = true;
    observer?.disconnect();
    window.clearTimeout(limit);
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS });
    } else {
      timer = window.setTimeout(run, FALLBACK_DELAY_MS);
    }
  };

  const painted = performance.getEntriesByName("first-contentful-paint").length > 0;
  if (painted) {
    scheduleIdle();
  } else if (typeof PerformanceObserver === "function") {
    try {
      observer = new PerformanceObserver((list) => {
        if (list.getEntriesByName("first-contentful-paint").length > 0) scheduleIdle();
      });
      observer.observe({ type: "paint", buffered: true });
      limit = window.setTimeout(scheduleIdle, PAINT_WAIT_LIMIT_MS);
    } catch {
      limit = window.setTimeout(scheduleIdle, FALLBACK_DELAY_MS);
    }
  } else {
    limit = window.setTimeout(scheduleIdle, FALLBACK_DELAY_MS);
  }

  return () => {
    cancelled = true;
    observer?.disconnect();
    window.clearTimeout(limit);
    if (idle !== undefined) window.cancelIdleCallback(idle);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
