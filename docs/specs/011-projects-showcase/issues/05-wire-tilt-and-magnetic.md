# 05: Tilt and magnetic CTA on the cards

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** 02, 03, 04

**Status:** ready-for-human

## What to build

Put the two effects on the showcase cards and decide how they sit with the existing hover feedback. File: `apps/web/components/projects/project-grid.tsx`.

- **Tilt.** Each card's `Link` is wrapped in `TiltCard`, with the card's border radius passed so the light is clipped to the card. The entrance animation (`fadeUp`, a `transform` on the `li`) and the tilt (a `transform` inside `TiltCard`) must live on different elements, otherwise they overwrite each other.
- **Magnetic.** The "Open Case study" affordance from ticket 04 is wrapped in `MagneticButton`. It stays a non-interactive element inside the card link; the click still goes to the Case study from anywhere on the card.
- **Hover feedback.** Today the `li` lifts by 6px on hover (`liftOnHover`). With tilt running that would stack two motions on one card, so the lift is dropped while `usePointerMotion` is `true`. `liftOnHover` stays as the fallback for a fine pointer where the tilt does not run for any other reason, as the spec says, and under reduced motion it is already off. Say under Comments which combination ended up applying where.
- **Image zoom.** The cover zoom on hover stays (off under reduced motion). Check it together with the tilt: if zoom plus tilt plus the border glow is too much, drop the zoom on fine pointers and record it.
- **Tune by looking.** Angle, light size and strength, and the magnetic radius and cap are set on the real cards at 1440px, not on the test card. Record the final values under Comments.
- **Touch and reduced motion.** With touch emulation and with reduced motion on, the cards render exactly as in ticket 04: no overlay element, no transform, no listeners.

## Acceptance criteria

- [ ] With a mouse, each card tilts toward the pointer with a soft light, the CTA drifts toward the pointer, and both settle when the pointer leaves
- [ ] Clicking anywhere on a card, including while it is tilted and while the CTA is displaced, opens the right Case study
- [ ] The entrance animation and the tilt do not interfere (reload with the Section in view and again after scrolling to it)
- [ ] Only one hover motion runs per card (tilt, or the lift fallback), never both
- [ ] With touch emulation and with reduced motion on, nothing tilts, no light appears, the CTA stays put, and the cards look as in ticket 04
- [ ] Keyboard: one tab stop per card, visible focus ring, Enter opens the Case study, and focusing a card does not trigger tilt or magnetic motion
- [ ] No layout shift and no page-level horizontal scroll while tilting cards at the edges of the grid, at 1440 and 1024px
- [ ] Final tilt and magnetic values are written under Comments
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
