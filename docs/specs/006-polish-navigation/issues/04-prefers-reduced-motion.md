# 04: Reduced motion across the site

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01

**Status:** Done

## What to build

Right now nothing on the site honours `prefers-reduced-motion`: Lenis always runs and every Section animates in. This is the one spec that touches all the motion at once, so the policy lands here.

- A `usePrefersReducedMotion()` hook over the `(prefers-reduced-motion: reduce)` media query, reacting to changes at runtime, and SSR-safe (no window access during render).
- `LenisProvider` does not instantiate Lenis when the preference is set; the context yields `null` and `useAnchorScroll` from ticket 01 falls back to native, non-smooth scrolling.
- The shared animation variants collapse to their final state with zero duration and no stagger, so the `whileInView` cascades in Stack, Experience, Projects and Contact, and the Hero entrance, render statically.
- Hover effects (card lift, tile lift, cover zoom) are also dropped under the preference.
- Content must be identical either way: nothing may remain stuck at `opacity: 0` when animations are disabled. This is the failure mode to watch for.

## Acceptance criteria

- [x] With reduced motion enabled at the OS level, the page loads with every Section fully visible and readable, nothing faded or offset
- [x] Anchor clicks jump instantly instead of gliding, and still land on the right Section clear of the Header
- [x] Hovering a Project card, a Stack tile or a cover produces no movement
- [x] Toggling the OS setting and reloading switches behaviour both ways
- [x] With the preference off, all existing motion is unchanged from before this ticket
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Implemented as `apps/web/components/motion/`:

- `use-prefers-reduced-motion.ts` — `useSyncExternalStore` over `(prefers-reduced-motion: reduce)`; the server snapshot is `false`, so SSR keeps the full-motion markup and the hook flips after hydration.
- `variants.ts` — `staggerVariants` / `fadeUpVariants` / `scaleInVariants` / `liftOnHover` factories take the flag and the component's own distances and durations, so motion with the preference off is byte-identical to before; with it on they collapse to `opacity: 1, y: 0, scale: 1` with `duration: 0`, no stagger, and `liftOnHover` returns `undefined` so `whileHover` is dropped. `viewportOnce` moved here too.
- `LenisProvider` skips `new Lenis()` under the preference and still reports `ready: true`, so the hash-on-load effect runs and falls back to `window.scrollTo`.
- Cover zoom: the `transition-transform … group-hover:scale-105` classes are omitted under the preference. The Hero availability dot's `animate-pulse` is dropped too — not listed in the ticket, but it is the one other piece of always-on motion on the page.

Verified in the dev server by temporarily forcing the hook to `true`: every Section rendered at `opacity: 1` with `transform: none`, the `lenis` class was absent from `<html>`, the cover image carried no transition, the pulse animation was `none`, and an anchor click jumped in one frame landing `#contact` at 72px (`HEADER_OFFSET`). With the force removed, the earlier behaviour returned (`lenis` class present, off-screen Sections back at `opacity: 0`).
