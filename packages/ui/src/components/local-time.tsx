"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const PLACEHOLDER = "--:--";

export interface LocalTimeProps {
  utcOffset: number;
  className?: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

function formatTime(utcOffset: number, now: number): string {
  const shifted = new Date(now + utcOffset * MS_PER_HOUR);
  return `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}`;
}

export function LocalTime({ utcOffset, className }: LocalTimeProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const now = Date.now();
      setTime(formatTime(utcOffset, now));
      timer = setTimeout(tick, MS_PER_MINUTE - (now % MS_PER_MINUTE));
    };

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      clearTimeout(timer);
      tick();
    };

    tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [utcOffset]);

  return (
    <time dateTime={time ?? undefined} className={cn("inline-block min-w-[5ch] tabular-nums", className)}>
      {time ?? PLACEHOLDER}
    </time>
  );
}
