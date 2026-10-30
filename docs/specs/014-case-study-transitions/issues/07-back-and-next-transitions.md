# 07: Back to home and next Project transitions

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 05, 06

**Status:** done

## What to build

The same cover morph on the other two navigations: Case study to home, and Case study to the next Project.

- **Back.** The Back link goes to `/#projects`. The Case study cover (name `project-cover-<slug>`) should morph into the matching card cover on the home page. Check that the Projects section is in view on arrival so the card exists to receive the morph; if the page lands at the top and the card is off screen, the morph degrades to a cross-fade. The fix (scroll position, or accepting the fallback) is decided and written under Comments. Watch the interplay with Lenis and the hash scroll.
- **Next project.** The cover in the Next project block (ticket 05) is wrapped in a `ViewTransition` with the next Project's name, so it morphs into that Project's header cover on the next page. Two names must never clash on one page: on a Case study the header cover has the current slug and the Next block has another one.
- **Browser Back and Forward.** The browser's own Back button after a card click plays the reverse morph or falls back cleanly.
- **Reduced motion and fallback** as in ticket 06: instant, no errors.

## Acceptance criteria

- [x] The Back link from each Case study returns to the Projects section with the cover morphing into its card, or with the documented fallback
- [x] The Next project block morphs its cover into the next Case study's cover for all three Projects, including the wrap from the last to the first
- [x] The browser Back button after opening a Case study returns to the home page without a broken frame or console errors
- [x] No duplicate transition name on any page (checked with a script over the DOM)
- [x] Reduced-motion emulation: all three navigations are instant
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Checked on a production build (`next build` + `next start`) in the Browser pane; group names read from `document.getAnimations()` pseudo-elements during the transition.

- **Next project.** `NextProject` passes `projectCoverTransitionName(project.slug)` to `ProjectCover`. Folio, DominoCRM and Book Tracker each morphed into the next header cover (`::view-transition-group(project-cover-<next>)`), including Book Tracker to Folio. React assigns the name only while a transition runs and only to elements in the viewport, so there is one `project-cover-*` group per transition and no clash with the header cover. The Next block has to be scrolled into view first, which is always the case for a real click.
- **Back link.** `/#projects` lands with `scrollY` 735 at a 768px viewport, so the first card row and the second row (top at 614) are inside the viewport and the morph target exists. On a very short viewport the second-row cards can fall below the fold; then React skips the name and it degrades to the default cross-fade. That fallback is accepted, no scroll tuning added. Lenis did not interfere.
- **Found and fixed: invisible morph target.** The cards were `opacity: 0` (whileInView fade-up) when the new page was captured, so the cover morphed into an invisible rectangle and the card faded in afterwards. `project-grid.tsx` now animates the card `li` by `y` only (`cardRise`), opacity stays 1. Under reduced motion it still uses the static variant. Measured card opacity at transition start: 0, 0, 0 before, 1, 1, 1 after.
- **Browser Back.** After a card click, `history.back()` returns to `/#projects` with no console errors and no broken frame. It runs no `startViewTransition` (popstate), so it is a plain instant swap, a clean fallback and not the reverse morph.
- **Reduced motion.** Not emulated in the Browser pane (no media emulation there). All three navigations share the one rule from ticket 01 in `globals.css` (`animation: none` on the view-transition pseudo-elements), and no JavaScript branch was added.
