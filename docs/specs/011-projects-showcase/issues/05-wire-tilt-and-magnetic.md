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

- [x] With a mouse, each card tilts toward the pointer with a soft light, the CTA drifts toward the pointer, and both settle when the pointer leaves
- [x] Clicking anywhere on a card, including while it is tilted and while the CTA is displaced, opens the right Case study
- [x] The entrance animation and the tilt do not interfere (reload with the Section in view and again after scrolling to it)
- [x] Only one hover motion runs per card (tilt, or the lift fallback), never both
- [ ] With touch emulation and with reduced motion on, nothing tilts, no light appears, the CTA stays put, and the cards look as in ticket 04
- [x] Keyboard: one tab stop per card, visible focus ring, Enter opens the Case study, and focusing a card does not trigger tilt or magnetic motion
- [ ] No layout shift and no page-level horizontal scroll while tilting cards at the edges of the grid, at 1440 and 1024px
- [x] Final tilt and magnetic values are written under Comments
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Done in `project-grid.tsx`: each card's `Link` is wrapped in `<TiltCard className="h-full rounded-xl">` inside the `motion.li`, so the entrance `fadeUp` (transform on the `li`) and the tilt (transform on `TiltCard`'s inner element) are on different elements. The "View project" span from ticket 04 is wrapped in `<MagneticButton className="mt-5 self-start">`; `self-start` keeps the wrapper the size of the label instead of stretching across the flex column, which would have made the detection rectangle and the pull centre wrong. It stays a non-interactive span inside the single link.
- Hover feedback: `usePointerMotion()` decides. When it is `true` the `li` has no `whileHover` and the tilt is the only hover motion; when it is `false` the old `liftOnHover(reduced, -6)` applies, which `liftOnHover` itself turns off under reduced motion. Since the gate is "fine pointer with hover and not reduced", the lift therefore only remains on devices that fail the pointer test, in practice touch (a tap-and-hold lifts the card as it did before this spec). Checked with a mouse: the `li` transform stays `none` while the card tilts.
- Image zoom: kept as it was (`group-hover:scale-105`, off under reduced motion). With the toned-down colour, tilt and zoom together read acceptably in the developer's Chrome; if it still feels busy, dropping the zoom on fine pointers is the next step.
- Values, tuned by looking in the developer's own Chrome (1920px, fine pointer, reduced motion off): the first pass (default light 14%, border at full accent, a 40px accent glow, 6 deg) was too much colour on hover. Final: tilt `maxAngle` 3 deg on the featured card and 5 deg on the others (a 976px-wide card at 6 deg bulges, its near edge sticks out of the border), `lightSize` 520px and `lightStrength` 7%; hover and focus border `accent/40` with a soft under-glow `0 12px 32px -18px var(--accent)` instead of the all-round glow (the 2px accent focus outline is unchanged); magnetic left at `radius` 80px, `strength` 0.3, `maxOffset` 8px. Retune by passing the props on the two components in `project-grid.tsx`. Measured with a mouse at 1440: tilt reached about 5 deg, the CTA drifted 5 to 8px towards the pointer and the light followed.
- Checked in the browser: with a mouse the featured card tilted (`rotateX(2.2deg) rotateY(-4.3deg)` in one position, about 5 deg in another) with the light on, the other cards stayed flat with light 0, and the CTA moved while the card was tilted. A click on the displaced CTA of the third card, while it was tilted, opened `/projects/folio`. Keyboard: Tab focused the first card with `:focus-visible`, the outline shown, no tilt, light 0 and no CTA offset, there are three tab stops in the list, and Enter opened `/projects/dominocrm`. Reloading with the Section in view left all three `li`s at opacity 1 and transform `none`. With the pane emulating mobile (gate `false`): the link is the direct child of the `li`, no wrapper `style`, no overlay element, no CTA `style`; the page has no horizontal scroll (scroll width 1425 inside 1440 while a card was tilted).
- Not checked: `prefers-reduced-motion` (cannot be emulated in the pane; it goes through the same gate as touch), and tilting cards at the grid edges at 1024px (checked at 1440 only; the grid has 24px of margin and the tilt moves corners by a few px). Neither box is ticked.
