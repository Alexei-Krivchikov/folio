# 03: MagneticButton

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** 02

**Status:** ready-for-human

## What to build

A generic `MagneticButton` in `packages/ui` that pulls its content slightly toward the pointer when the pointer is near. Ticket 05 applies it to the card's "Open Case study" affordance; specs 010 and 013 reuse it for their buttons.

- **Not an interactive element.** The card is a single link, and a link must not contain a `button` or another link. So `MagneticButton` renders a plain wrapper (a `span`) around whatever child it is given and only moves that wrapper with `transform`. The same component then works around a `Button`, a `Link` or a non-interactive span inside a link. The name stays as the spec fixes it; say under Comments if it reads wrong once it is used, and the rename is the developer's call.
- **Gate.** It uses `usePointerMotion` from ticket 02: fine pointer with hover, reduced motion off. When the gate is `false` it renders the wrapper and the child, with no listeners and no transform.
- **Behaviour.** Within a small radius of the element (a `radius` prop, default chosen by looking) the content moves toward the pointer by a fraction of the distance, capped at a few pixels (`strength` prop). Built with `useMotionValue` and `useSpring`; on leave it springs back to zero.
- **Constraints.**
  - Pointer movement writes to motion values only, with no React state per move.
  - The element's rectangle is read when the pointer enters its zone, not on every move.
  - The wrapper's layout box does not change (transform only), and the larger detection zone must not steal clicks or hover from neighbouring elements. If the zone is a padded ancestor, it needs `pointer-events` handled so that what is under it still works; if it is a listener on the parent, it is added and removed with the effect.
  - Listeners are passive and removed on unmount or when the gate flips.
  - Keyboard focus is never affected: no focus handling, and the focus ring of the child is not displaced from its element.
- Generic: it knows nothing about Projects.

## Acceptance criteria

- [ ] `MagneticButton` is exported from `@folio/ui`
- [ ] With a mouse, a test control drifts toward the pointer inside the radius, never by more than the cap, and returns smoothly on leave
- [ ] With touch emulation and with reduced motion on, nothing moves and no listeners are attached
- [ ] Wrapping a `Button`, a `Link` and a span inside an outer link all work, and clicks still go to the right target
- [ ] No React re-render and no layout read per pointer move; no layout shift
- [ ] The detection zone does not block clicks on elements next to it
- [ ] A note under Comments gives the knobs (radius, strength, spring) and the values chosen
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
