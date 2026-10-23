# 05: Prominent "Next project" block

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 02

**Status:** ready-for-agent

## What to build

Replace the small text link at the end of the Case study with a large block that invites the next Project: HUD label, the next Project's cover, its name and number, and an arrow. The whole block is one link to `/projects/<slug>`.

- **Content.** `[ Next project ]` as `HudLabel`, the next Project's cover at the same `aspect-video` crop as ticket 02, the name in the display font, the `formatProjectNumber(order)` index. Keep using `getNextProject(slug)` from `apps/web/lib/projects.ts`; it wraps around, so with three Projects the last links to the first.
- **Interaction.** Hover and focus-visible states in the style of the home cards (accent border, small lift) and an arrow that moves on hover, still under reduced motion. Tap target and focus ring on the whole block.
- **Cover reuse.** Share one small cover component (or the same class set) with ticket 02, so ticket 07 wraps one markup in `ViewTransition`, not two.
- **Images.** `next/image` with `sizes` for the block's real width; it is below the fold, so no `priority`.

## Acceptance criteria

- [ ] The block shows the correct next Project for each of the three Case studies, wrapping from the last to the first
- [ ] The whole block is a single link, keyboard focusable, with a visible focus ring
- [ ] Hover and focus states work; the arrow motion is off under reduced motion
- [ ] No horizontal scroll at 375px; the tap target is well over 44px
- [ ] The cover shares markup or classes with the header cover from ticket 02
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
