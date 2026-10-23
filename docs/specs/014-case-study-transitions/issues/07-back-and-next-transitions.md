# 07: Back to home and next Project transitions

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 05, 06

**Status:** ready-for-agent

## What to build

The same cover morph on the other two navigations: Case study to home, and Case study to the next Project.

- **Back.** The Back link goes to `/#projects`. The Case study cover (name `project-cover-<slug>`) should morph into the matching card cover on the home page. Check that the Projects section is in view on arrival so the card exists to receive the morph; if the page lands at the top and the card is off screen, the morph degrades to a cross-fade. The fix (scroll position, or accepting the fallback) is decided and written under Comments. Watch the interplay with Lenis and the hash scroll.
- **Next project.** The cover in the Next project block (ticket 05) is wrapped in a `ViewTransition` with the next Project's name, so it morphs into that Project's header cover on the next page. Two names must never clash on one page: on a Case study the header cover has the current slug and the Next block has another one.
- **Browser Back and Forward.** The browser's own Back button after a card click plays the reverse morph or falls back cleanly.
- **Reduced motion and fallback** as in ticket 06: instant, no errors.

## Acceptance criteria

- [ ] The Back link from each Case study returns to the Projects section with the cover morphing into its card, or with the documented fallback
- [ ] The Next project block morphs its cover into the next Case study's cover for all three Projects, including the wrap from the last to the first
- [ ] The browser Back button after opening a Case study returns to the home page without a broken frame or console errors
- [ ] No duplicate transition name on any page (checked with a script over the DOM)
- [ ] Reduced-motion emulation: all three navigations are instant
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
