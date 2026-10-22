# 01: Scroll progress line

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

A thin Ember line fixed at the top edge of the viewport whose length shows how far down the page the visitor is. A generic `ScrollProgress` in `packages/ui`, mounted once in the root layout so it works on the home page and on the Case study pages.

- **Component.** `ScrollProgress` in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts` with its props type if it has any. A `motion.div` with `position: fixed`, top and left at 0, full width, about 2px tall, `bg-accent`, `transform-origin: left`, `scaleX` bound to `useScroll().scrollYProgress`. `aria-hidden` and `pointer-events-none`, so it is invisible to assistive technology and never blocks a click.
- **Easing.** When motion is allowed, `scaleX` goes through `useSpring` with a stiff, short spring so the line feels attached to the scroll and not laggy. Under reduced motion, `scaleX` is the raw `scrollYProgress`: the line still reflects position (that is information, not decoration) but changes without easing. Use Motion's `useReducedMotion` inside the component; `packages/ui` cannot import the `usePrefersReducedMotion` hook that lives in `apps/web`.
- **Layering.** It sits above the Header pill and the Nav overlay, below nothing that matters; check the z-index values used by `apps/web/components/navigation` and pick one above them. `Grain` is a full-screen decoration and may sit above or below, whichever looks right.
- **Mount.** In `apps/web/app/layout.tsx`, next to `Grain`, inside `body`.
- **Lenis.** The site scrolls through Lenis, which drives the native scroll position, so `useScroll` should work unchanged. Confirm that the line is in step with a Lenis-smoothed scroll and with a click on a Header link that scrolls the page.
- **Cost.** Only `transform` changes. No React state is updated on scroll.

## Acceptance criteria

- [ ] `ScrollProgress` is exported from `@folio/ui` and mounted in the root layout
- [ ] At the top of the page the line has zero length, at the very bottom it spans the full width exactly (check at 1440px and 375px, with the mobile browser UI in mind)
- [ ] The same holds on a Case study page (`/projects/<slug>`)
- [ ] With reduced motion forced on, the line still follows position and has no easing
- [ ] The line does not block clicks on anything under it and is absent from the accessibility tree
- [ ] It stays above the Header and the Nav overlay
- [ ] No React re-render per scroll event (React DevTools or a render counter shows none)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
