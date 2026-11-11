# 02: One seam for moving around the page and for the Active section

**Spec:** [017-navigation-depth](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

Make the navigation code a deeper module: a small interface in front of the lock, the measuring and the Lenis fallback.

Today (all in `apps/web/components/navigation/`):

- `section-lock.ts` exports `lockSection`, `releaseSection`, `getLockedSection`, `subscribeToSectionLock`. Only `use-header-state.ts` reads the last two, only `scroll-to-section.ts` calls the first two.
- `use-header-state.ts` holds `useHeroPassed`, `useActiveSection` and the private `currentSection()` measuring.
- `scroll-to-section.ts` holds `scrollToSection` and the attribute that tells the anchor handler to skip a link.
- `header.tsx` re-implements "Lenis or `window.scrollTo`" for the logo click and is the only place that reads reduced motion for scrolling.

Target:

- `active-section.ts`: the lock and `currentSection()` and `useActiveSection()` together. Exports `useActiveSection`, `lockSection`, `releaseSection`. `getLockedSection` and `subscribeToSectionLock` become internal.
- `scroll.ts` (the current `scroll-to-section.ts`): exports `scrollToSection(lenis, section, options)`, a new `scrollToTop(lenis, { reducedMotion })`, `anchorScrollSkipProps`, `skipsAnchorScroll`. The "Lenis or `window.scrollTo`" branch is written once, in a private helper both functions use.
- `use-hero-passed.ts`: `useHeroPassed` moves out of `use-header-state.ts`, which is deleted.
- `header.tsx`: the logo click calls `scrollToTop`; the component no longer imports `useLenis` for this. Reduced-motion handling for the logo stays exactly as it is now (immediate with Lenis, `behavior: "auto"` without).

Deletion test, for the record: removing `section-lock.ts` makes its logic reappear in `scroll-to-section.ts` and in the active-section hook, so it is worth keeping; what changes is that its internals stop being part of any interface.

## Acceptance criteria

- [ ] `getLockedSection` and `subscribeToSectionLock` are not exported
- [ ] The "Lenis or `window.scrollTo`" branch exists once
- [ ] The logo click goes through `scrollToTop`; with reduced motion it jumps, without it it scrolls smoothly, with and without Lenis
- [ ] Following a link to Contact on a page that cannot scroll to put Contact at the top keeps Contact as the Active section until the visitor scrolls away (wheel, touch, a scroll key, or a drag of more than 40px after arriving)
- [ ] Scrolling by hand moves the Active section as before, and the last Section is active at the bottom of the page
- [ ] A link in the Nav overlay closes it, scrolls and locks as before; a hash in the URL on load scrolls to its Section as before
- [ ] No behaviour or markup change at 1440px and 375px
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
- [ ] `docs/architecture.md` is up to date

## Comments

Note for later, not part of this ticket: `active-section.ts` and `scroll.ts` are pure browser logic with a small interface, so they are the right first place to add a unit-test setup if the project ever gets one.
