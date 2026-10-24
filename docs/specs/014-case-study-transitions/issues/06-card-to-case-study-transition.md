# 06: Card to Case study cover morph

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 01, 02

**Status:** ready-for-agent

## What to build

Clicking a Project card on the home page morphs the card's cover into the Case study's cover. This is the core of the spec.

- **Shared name.** A `ViewTransition` from React with a name derived from the Project `slug` (for example `project-cover-<slug>`) wraps the cover container in `apps/web/components/projects/project-grid.tsx` and the cover in the Case study header from ticket 02. Put the name builder in one place (`apps/web/lib/projects.ts` or next to the cover component) so the two sides cannot drift. Names must be unique on a page: one per card.
- **Client and server.** `ProjectGrid` is a client component and the Case study page is a server component; check that `ViewTransition` works in both, per the docs recorded in ticket 01.
- **Rest of the page.** Default cross-fade only. No per-element transitions elsewhere (out of scope).
- **Interplay with existing motion.** The card sits inside `TiltCard` and a `motion.li` with a hover lift, and the cover scales on hover. Check that a card mid-hover or mid-tilt does not make the morph start from a distorted rectangle; if it does, scope the `ViewTransition` so the snapshot is taken from the cover's visual rectangle, and say what was done under Comments.
- **Reduced motion.** Governed by the CSS rule added in ticket 01. Confirm it; add no JavaScript branch.
- **Interruption.** Clicking another card or Back during a running transition must be safe.
- **Fallback.** Where the API is missing, navigation stays a plain instant one; no feature-detection code.

## Acceptance criteria

- [ ] In Chrome, clicking each of the three cards morphs its cover into the Case study cover with no flash, no layout jump and no wrong-image frame
- [ ] The cover is in the Case study page's HTML on arrival (view source shows it)
- [ ] Clicking again mid-transition does not break navigation or leave the page stuck
- [ ] With `prefers-reduced-motion: reduce` emulated before load, navigation is instant
- [ ] Hovered or tilted cards still morph from the cover's visual rectangle
- [ ] The behaviour is checked on a production build (`next build` and `next start`), not only `next dev`
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
