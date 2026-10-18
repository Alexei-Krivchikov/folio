# 02: TiltCard and the shared pointer-motion gate

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A generic `TiltCard` in `packages/ui`, plus the one small hook that decides whether pointer effects may run at all. Nothing uses it yet; ticket 05 puts it on the cards.

- **Dependency.** `motion` is today only a dependency of `apps/web`; `packages/ui` has none. Add `motion` to `packages/ui/package.json` at the same range as `apps/web` and refresh the lockfile. `packages/ui` must not import from `apps/web`, so it gets its own small hook rather than reusing `usePrefersReducedMotion`.
- **The gate.** A hook in `packages/ui/src/lib/` (name: `usePointerMotion`) returns `true` only when the device has a fine pointer with hover (`(pointer: fine) and (hover: hover)`) and `prefers-reduced-motion` is not set. It follows the pattern of the existing `usePrefersReducedMotion`: `useSyncExternalStore`, a server snapshot of `false`, so the server render and the first client render match and a touch device never flashes an effect. It is exported from the package because ticket 03 and the cards (ticket 05) use it too.
- **Behaviour.** `TiltCard` rotates its content toward the pointer by a few degrees (`rotateX`/`rotateY`, a `max angle` prop with a default chosen by looking, around 5 to 8) and moves a soft light with the pointer.
  - Built with `useMotionValue` and `useSpring`; the pointer position goes into motion values, never into React state, so a move causes no re-render.
  - Listeners (`pointermove`, `pointerleave`) are attached only when the gate is `true`, are passive, and are removed on unmount or when the gate flips to `false`.
  - On leave the card springs back to flat and the light fades out.
  - The light is an absolutely positioned radial-gradient layer, `aria-hidden`, `pointer-events-none`, clipped by the card's own rounded corners (the component takes a `className` for the wrapper so the consumer can pass the radius). Its colour comes from the Ember tokens, not a hard-coded value.
  - `perspective` is set on the wrapper, and the rotation is a `transform` on an inner element. The card's layout box never changes, so there is no layout shift and no overlap with neighbours.
- **When the gate is `false`** the same wrapper `div` is rendered with the children and nothing else: no overlay, no listeners, no transform. Keeping the wrapper means the DOM box is identical whether or not the effect runs.
- The component is generic: it knows nothing about Projects, links or images, and passes `children` and `className` through.

## Acceptance criteria

- [x] `TiltCard` and `usePointerMotion` are exported from `@folio/ui`
- [x] `packages/ui/package.json` declares `motion`, the lockfile is updated, and `apps/web` still builds
- [x] With a mouse, a test card tilts toward the pointer and the light follows it; on leave both return smoothly
- [ ] With device emulation set to touch, and with reduced motion on, the rendered DOM is the wrapper and the children only (no overlay element) and no pointer listeners are attached
- [x] Moving the pointer causes no React re-render (checked in the React/Performance panel or by reading the code path) and no layout shift
- [ ] Listeners are gone after unmount (navigate away and back, no duplicates)
- [x] A note under Comments gives the knobs (max angle, spring stiffness, light size and strength) and the values chosen
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Done: `usePointerMotion` in `packages/ui/src/lib/use-pointer-motion.ts` (`useSyncExternalStore`, server snapshot `false`, true only for `(pointer: fine) and (hover: hover)` without `prefers-reduced-motion`), `TiltCard` in `packages/ui/src/components/tilt-card.tsx`, both exported from `@folio/ui`. `motion ^13.2.0` added to `packages/ui/package.json`, lockfile refreshed.
- Structure: `TiltCard` reads the gate. When `false` it renders `<div className>{children}</div>` and nothing else. When `true` it renders `TiltSurface`, which owns the motion values and the listeners, so the hooks are never conditional and unmounting the surface (unmount or gate flip) removes `pointerenter`/`pointermove`/`pointerleave`, all passive. The wrapper carries `perspective: 1000px`; the rotation is a transform on an inner `motion.div` (`rounded-[inherit]`), the light is an `aria-hidden` `pointer-events-none` overlay inside it with `rounded-[inherit]`, so the consumer's radius on `className` clips it.
- Knobs (props with defaults): `maxAngle` 6 deg; `lightSize` 520px radius; `lightStrength` 14% of `--accent` mixed with transparent (`color-mix(in oklab, var(--accent) N%, transparent)`, fading to transparent at 70%). Constants in the file: tilt spring `stiffness 180, damping 20, mass 0.6`; light spring `stiffness 220, damping 28, mass 0.5`; `PERSPECTIVE` 1000. The light jumps to the entry point on `pointerenter` so it does not sweep in from the centre, then fades in; on leave the tilt springs to 0 and the light fades out.
- No re-render on move: pointer position only goes into `useMotionValue`s and `useTransform`/`useMotionTemplate` outputs bound to `style`; no React state is set in the handlers.
- Checked in the browser on a temporary page (deleted afterwards), 1440 wide, mouse: at the top-right of the card the inner transform read `rotateX(4.9deg) rotateY(5.1deg)` and the gradient sat at 92% / 9%; after leaving, transform `none`, overlay opacity 0, and the wrapper rect stayed 384x320 throughout (no layout shift). With the pane emulating mobile the gate was `false`: the wrapper had no `style`, one child (the card) and no overlay.
- Not checked: `prefers-reduced-motion` could not be emulated in the pane; it goes through the same `matchMedia` gate as touch. Listener cleanup on navigation was verified by reading the effect's cleanup, not by navigating away and back. Ticket 05 should look at the tilt on a real card (image, link) and retune `maxAngle` / `lightStrength` there if needed.
