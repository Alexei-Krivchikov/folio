# 06: Experience timeline that draws itself

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** 01

**Status:** ready-for-human

## What to build

Restyle the Experience timeline: an Ember line that draws as the Section scrolls through, a pulse on the current role, and a structure that takes more entries without layout work. The content stays what it is today (one entry: role, Employer, period).

- **Structure.** The entries become an ordered list (`ol` with `li`), newest first, so the order is meaningful to a screen reader. An entry is `{ role, org, period, current?: boolean }`; adding the self-study year or a future job is one more object in the array and no layout change. `current` is explicit data, not inferred from the period text.
- **The line.** A track line in the border colour runs down the left of the list; on top of it an Ember line is drawn from the top to the bottom of the list as the Section scrolls, with `useScroll` on the list element (`offset` so the line starts as the list enters and finishes before it leaves) and `scaleY` with `transform-origin: top`, from a motion value, never from React state. Only `transform` is animated.
- **Dots and pulse.** Each entry has a dot on the line. The dot of the `current` entry has a slow, soft Ember pulse (a ring that scales and fades). A dot is filled with the accent once the drawn line has reached it, and stays the neutral colour before; with a single entry the dot is reached almost at once, which is fine.
- **Type.** Period in `HudLabel`-style mono, role as the heading, Employer under it, on the same tokens as the rest of the Ember pass. The Section heading becomes `[ 03 / EXPERIENCE ]`.
- **Reduced motion.** The Ember line is fully drawn from the first paint with no scroll linking, and nothing pulses. Use the same preference source as the rest of `apps/web` (`usePrefersReducedMotion`).
- **Layout.** No layout shift as the line draws, and the list never overflows at 375px. The Section stays short; this is not a place for padding to fill space.

## Acceptance criteria

- [x] The list is an `ol` of `li` items and the DOM order is newest first
- [x] The Ember line scales with scroll through the Section and ends fully drawn; scrolling back up undraws it
- [x] The current entry's dot pulses; other entries' dots do not
- [x] Adding a second object to the array renders a second entry with the line spanning both and no other code change (checked by trying it locally, then removed)
- [x] With reduced motion on, the line is fully drawn, nothing pulses and nothing is linked to scroll
- [x] No horizontal scroll at 375px and CLS 0
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Checked in Chrome at 1214px and 375px. With two entries tried locally (then removed) the line spans both, the second dot fills after the first and only the current entry's dot pulses. Scrolling back to the top undraws the line to 0. The reduced-motion state was checked by applying the `prefers-reduced-motion` rules of the built CSS unconditionally (line transform none, dot opaque, ring hidden), since the media feature cannot be toggled from the automation. No horizontal scroll at 375px, CLS 0.
