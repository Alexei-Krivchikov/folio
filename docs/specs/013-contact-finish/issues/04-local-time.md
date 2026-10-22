# 04: Local-time clock

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A generic live clock in `packages/ui` that shows the time at a fixed UTC offset. Ticket 06 puts it in the Footer.

- **Component.** `LocalTime` in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts`. Props: `utcOffset` (hours, a number; the Footer passes `3`), `className`. It renders a `<time>` element with `HH:MM` in 24-hour form. Compute the time from `Date.now()` plus the offset and read it with `getUTCHours()` / `getUTCMinutes()`; do not depend on the visitor's time zone or on an IANA zone with daylight saving.
- **No hydration mismatch, no layout shift.** The server renders a stable placeholder of the same width as a real time (`--:--` in tabular figures, or a fixed `ch` width). The real time is set in an effect after hydration. Use `tabular-nums` (or the mono font) so the width does not change as digits change.
- **Ticking.** Update once a minute, aligned to the next minute boundary with a `setTimeout` chain, not a one-second `setInterval`. Clear the timer on unmount. Also refresh when the tab becomes visible again (`visibilitychange`), since timers are throttled in background tabs.
- **Reduced motion.** A clock that changes digits is information, not motion; no special handling and no animation on the digits.
- **No label inside.** The component renders only the time. The label ("Local time", the `UTC+3` suffix) belongs to the Footer composition in ticket 06.

## Acceptance criteria

- [x] `LocalTime` is exported from `@folio/ui`
- [x] A test render shows the correct `HH:MM` at UTC+3 (compare with the system time converted to UTC+3 at two different moments)
- [x] First paint shows the placeholder, then the real time, with no hydration warning in the console and no layout shift (CLS 0 on that region)
- [x] The time rolls over on the minute without a page interaction
- [ ] No timer is left running after unmount (cleanup is in the code but was not exercised at runtime)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Built as `LocalTime` in `packages/ui/src/components/local-time.tsx`, exported with `LocalTimeProps`. Props: `utcOffset` (hours, fractions allowed) and `className`. It renders `<time>` with `HH:MM`, computed as `Date.now() + utcOffset * 3600000` read through `getUTCHours()` / `getUTCMinutes()`, so it does not depend on the visitor's zone. The server HTML is `--:--`; the real time is set in an effect. `min-w-[5ch]` and `tabular-nums` keep the width stable. The next tick is scheduled with `setTimeout` for the next minute boundary; `visibilitychange` to visible clears the timer and ticks again; the effect cleanup clears both.
- Nothing mounts it yet (ticket 06 does). For the checks it was mounted temporarily in the root layout at UTC+3, UTC+0 and UTC+5.5, and then removed; `layout.tsx` is back to its committed state.
- Checked in the built-in browser: the server HTML contains `<time ...>--:--</time>`. The three clocks matched `Intl.DateTimeFormat` for `Europe/Moscow`, `UTC` and `Asia/Kolkata` (12:05, 09:05, 14:35 at the time). The machine's own zone is also UTC+3, so the UTC+0 and UTC+5.5 clocks are what shows the value does not come from the visitor's zone. A MutationObserver saw the text change once, at 09:06:00.005 UTC, to 12:06, with no interaction.
- Width: in Geist Mono the placeholder, `12:06` and `00:00` all measure 48px, so swapping the placeholder for the time cannot move a neighbour. In a proportional font `min-w-[5ch]` keeps the width from shrinking below five zero-widths; the Footer will use the mono font (`HudLabel` style). A layout-shift observer was not used; the equal widths are the evidence.
- No hydration warning in the console (searched for "hydrat"; the buffer also holds old errors from earlier edits of other tickets, not from this component).
- Not run: an unmount check that no timer is left (the code clears it in the effect cleanup, and the component is in the layout so it does not unmount in practice). Ticket 06 puts it in the Footer.
- Closed in ticket 07: layout shift observed on the production build from load through a full page scroll was 0 on desktop and on mobile, with the clock in the Footer. The unmount criterion stays open: the cleanup is in the code but was not exercised.
