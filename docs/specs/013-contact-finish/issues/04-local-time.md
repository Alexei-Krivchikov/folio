# 04: Local-time clock

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

A generic live clock in `packages/ui` that shows the time at a fixed UTC offset. Ticket 06 puts it in the Footer.

- **Component.** `LocalTime` in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts`. Props: `utcOffset` (hours, a number; the Footer passes `3`), `className`. It renders a `<time>` element with `HH:MM` in 24-hour form. Compute the time from `Date.now()` plus the offset and read it with `getUTCHours()` / `getUTCMinutes()`; do not depend on the visitor's time zone or on an IANA zone with daylight saving.
- **No hydration mismatch, no layout shift.** The server renders a stable placeholder of the same width as a real time (`--:--` in tabular figures, or a fixed `ch` width). The real time is set in an effect after hydration. Use `tabular-nums` (or the mono font) so the width does not change as digits change.
- **Ticking.** Update once a minute, aligned to the next minute boundary with a `setTimeout` chain, not a one-second `setInterval`. Clear the timer on unmount. Also refresh when the tab becomes visible again (`visibilitychange`), since timers are throttled in background tabs.
- **Reduced motion.** A clock that changes digits is information, not motion; no special handling and no animation on the digits.
- **No label inside.** The component renders only the time. The label ("Local time", the `UTC+3` suffix) belongs to the Footer composition in ticket 06.

## Acceptance criteria

- [ ] `LocalTime` is exported from `@folio/ui`
- [ ] A test render shows the correct `HH:MM` at UTC+3 (compare with the system time converted to UTC+3 at two different moments)
- [ ] First paint shows the placeholder, then the real time, with no hydration warning in the console and no layout shift (CLS 0 on that region)
- [ ] The time rolls over on the minute without a page interaction
- [ ] No timer is left running after unmount
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
