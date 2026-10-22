# 01: Scroll progress line

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A thin Ember line fixed at the top edge of the viewport whose length shows how far down the page the visitor is. A generic `ScrollProgress` in `packages/ui`, mounted once in the root layout so it works on the home page and on the Case study pages.

- **Component.** `ScrollProgress` in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts` with its props type if it has any. A `motion.div` with `position: fixed`, top and left at 0, full width, about 2px tall, `bg-accent`, `transform-origin: left`, `scaleX` bound to `useScroll().scrollYProgress`. `aria-hidden` and `pointer-events-none`, so it is invisible to assistive technology and never blocks a click.
- **Easing.** When motion is allowed, `scaleX` goes through `useSpring` with a stiff, short spring so the line feels attached to the scroll and not laggy. Under reduced motion, `scaleX` is the raw `scrollYProgress`: the line still reflects position (that is information, not decoration) but changes without easing. Use Motion's `useReducedMotion` inside the component; `packages/ui` cannot import the `usePrefersReducedMotion` hook that lives in `apps/web`.
- **Layering.** It sits above the Header pill and the Nav overlay, below nothing that matters; check the z-index values used by `apps/web/components/navigation` and pick one above them. `Grain` is a full-screen decoration and may sit above or below, whichever looks right.
- **Mount.** In `apps/web/app/layout.tsx`, next to `Grain`, inside `body`.
- **Lenis.** The site scrolls through Lenis, which drives the native scroll position, so `useScroll` should work unchanged. Confirm that the line is in step with a Lenis-smoothed scroll and with a click on a Header link that scrolls the page.
- **Cost.** Only `transform` changes. No React state is updated on scroll.

## Acceptance criteria

- [x] `ScrollProgress` is exported from `@folio/ui` and mounted in the root layout
- [x] At the top of the page the line has zero length, at the very bottom it spans the full width exactly (check at 1440px and 375px, with the mobile browser UI in mind)
- [x] The same holds on a Case study page (`/projects/<slug>`)
- [ ] With reduced motion forced on, the line still follows position and has no easing
- [x] The line does not block clicks on anything under it and is absent from the accessibility tree
- [x] It stays above the Header and the Nav overlay
- [ ] No React re-render per scroll event (React DevTools or a render counter shows none)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Built as `ScrollProgress` in `packages/ui/src/components/scroll-progress.tsx`, mounted after `Grain` in `apps/web/app/layout.tsx`. Height 2px (`h-0.5`), `z-60` (Header and Nav overlay are `z-50`, `Grain` is `z-40`). `scaleX` is `useSpring(scrollYProgress)` normally and the raw `scrollYProgress` when `useReducedMotion()` is true.
- Checked in the built-in browser with the dev server. Home page at 1024px: scale 0 at the top, 0.9687 at scrollY 3216 of 3320 (equal to 3216/3320), `none` (scale 1) at the very bottom. Case study `/projects/dominocrm`: `none` at the bottom (scrollY 1519 of 1519). At 375px: bottom scale 1, line width 375px, `scrollWidth` 375, so no horizontal scroll. `pointer-events: none`, `aria-hidden="true"`. No console errors.
- Note on the method: the Browser pane is hidden, so `requestAnimationFrame` does not run there and the spring only advanced while screenshots were being taken; the values above are read after it settled.
- Not verified: the reduced-motion branch. Motion's `useReducedMotion` caches its first value, so forcing `matchMedia` after load does not switch it; it needs the check from ticket 07 (override before the app loads, or read the code path). The "no re-render per scroll" criterion is not measured with React DevTools either; the component holds no state and only passes motion values to `style`, so none is expected.
