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

- [x] `MagneticButton` is exported from `@folio/ui`
- [x] With a mouse, a test control drifts toward the pointer inside the radius, never by more than the cap, and returns smoothly on leave
- [ ] With touch emulation and with reduced motion on, nothing moves and no listeners are attached
- [x] Wrapping a `Button`, a `Link` and a span inside an outer link all work, and clicks still go to the right target
- [x] No React re-render and no layout read per pointer move; no layout shift
- [x] The detection zone does not block clicks on elements next to it
- [x] A note under Comments gives the knobs (radius, strength, spring) and the values chosen
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Done: `MagneticButton` in `packages/ui/src/components/magnetic-button.tsx`, exported from `@folio/ui`. It renders a `span` (`inline-block`, plus the passed `className`) in both states, so the DOM box is the same with or without the effect; the child is rendered untouched inside. It is not an interactive element and has no focus handling.
- Structure: like `TiltCard`, the gate (`usePointerMotion`) is read in the exported component; when `false` it renders the bare `span` and children. When `true` it renders `MagneticSurface`, which owns the motion values and the listeners, so they disappear on unmount or when the gate flips.
- Detection zone without a zone element: there is no padded ancestor and no overlay, so nothing can steal a click or hover from neighbours. Instead one passive `pointermove` listener sits on `window` and measures the distance from the pointer to the element's cached rectangle; inside `radius` the content is pulled, outside it springs back to 0. A passive `scroll` (capture) and `resize` listener only drop the cached rectangle, and `pointerleave` on `<html>` releases the pull when the pointer leaves the window.
- Layout read: the rectangle is read lazily on the first move after mount or after a scroll/resize, not on every move, and the current spring offset is subtracted from it so a read taken mid-pull is still the resting box. This is slightly different from "read when the pointer enters the zone": entering the zone cannot be detected without a listener over the zone, which would have to be a stealing element or a window listener anyway. Idle cost per move is arithmetic only.
- Knobs (props with defaults): `radius` 80px, measured from the element's edge, not its centre; `strength` 0.3, the fraction of the pointer-to-centre distance the content moves; `maxOffset` 8px, the cap on the length of the pull. Spring `stiffness 220, damping 18, mass 0.5`. `maxOffset` is an extra prop beyond the `radius`/`strength` the ticket named, since the cap needs its own value.
- Checked in the browser on a temporary page (deleted afterwards): a `Button`, a `Link` and a span inside an outer link, each wrapped. With the pointer 25px to the right of the Button its wrapper read `translateX(7.9px) translateY(1.1px)` (cap 8px, towards the pointer) and the Link and span stayed at `none`; with the pointer in the far corner all three read `none` after 2s, so the return works. Clicks went to the right targets: the Link set `#linked`, the span inside the outer link set `#outer`, and the neighbouring link directly below the span, clicked at its top edge inside the radius, set `#neighbour`. With the pane emulating mobile the gate was `false` and the wrapper had no `style`.
- Not checked: `prefers-reduced-motion` could not be emulated in the pane; it uses the same gate as touch. No re-render per move was established by reading the code (handlers only write motion values), not in the React profiler.
- Naming: reads fine as a wrapper around a `Button`; around a span inside a link (the ticket 05 case) "Magnetic" alone would be a more honest name, but I left it as the spec fixes it.
