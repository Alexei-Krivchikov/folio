# 04: Reduced motion across the site

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

Right now nothing on the site honours `prefers-reduced-motion`: Lenis always runs and every Section animates in. This is the one spec that touches all the motion at once, so the policy lands here.

- A `usePrefersReducedMotion()` hook over the `(prefers-reduced-motion: reduce)` media query, reacting to changes at runtime, and SSR-safe (no window access during render).
- `LenisProvider` does not instantiate Lenis when the preference is set; the context yields `null` and `useAnchorScroll` from ticket 01 falls back to native, non-smooth scrolling.
- The shared animation variants collapse to their final state with zero duration and no stagger, so the `whileInView` cascades in Stack, Experience, Projects and Contact, and the Hero entrance, render statically.
- Hover effects (card lift, tile lift, cover zoom) are also dropped under the preference.
- Content must be identical either way: nothing may remain stuck at `opacity: 0` when animations are disabled. This is the failure mode to watch for.

## Acceptance criteria

- [ ] With reduced motion enabled at the OS level, the page loads with every Section fully visible and readable, nothing faded or offset
- [ ] Anchor clicks jump instantly instead of gliding, and still land on the right Section clear of the Header
- [ ] Hovering a Project card, a Stack tile or a cover produces no movement
- [ ] Toggling the OS setting and reloading switches behaviour both ways
- [ ] With the preference off, all existing motion is unchanged from before this ticket
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
