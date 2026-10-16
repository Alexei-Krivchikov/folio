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

- [ ] `TiltCard` and `usePointerMotion` are exported from `@folio/ui`
- [ ] `packages/ui/package.json` declares `motion`, the lockfile is updated, and `apps/web` still builds
- [ ] With a mouse, a test card tilts toward the pointer and the light follows it; on leave both return smoothly
- [ ] With device emulation set to touch, and with reduced motion on, the rendered DOM is the wrapper and the children only (no overlay element) and no pointer listeners are attached
- [ ] Moving the pointer causes no React re-render (checked in the React/Performance panel or by reading the code path) and no layout shift
- [ ] Listeners are gone after unmount (navigate away and back, no duplicates)
- [ ] A note under Comments gives the knobs (max angle, spring stiffness, light size and strength) and the values chosen
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
