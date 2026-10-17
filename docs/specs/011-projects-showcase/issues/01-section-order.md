# 01: Projects directly after the Hero

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

Move the Projects Section to follow the Hero and make every place that knows the Section order agree with it. No visual change to the cards; that is tickets 04 and 05.

- `apps/web/lib/navigation.ts`: `SECTION_IDS` becomes `hero, projects, about, stack, experience, contact`; `NAV_SECTION_IDS` and `NAV_LINKS` become `projects, about, stack, experience, contact`. The order of `NAV_SECTION_IDS` is not cosmetic: `currentSection()` in `use-header-state.ts` walks it and keeps the last Section whose top has passed the Header offset, so it must match the order of the Sections in the DOM.
- `apps/web/app/page.tsx`: render `Hero`, `Projects`, `About`, `Stack`, `Experience`, `Contact`, then `Footer`.
- The Header links and the Nav overlay map over `NAV_LINKS`, so they should follow without edits; confirm that and touch them only if something is hard-coded.
- HUD labels are numbered by position, so they are renumbered to match: Projects `[ 01 / PROJECTS ]` (in `components/projects/project-grid.tsx`), About `02`, Stack `03`, Experience `04`, Contact `05`. Spec 012 renumbers again when Stack goes; this ticket only keeps the page consistent in between.
- Check the seam: Projects now sits right under the Hero (and its Facts strip). Look at the spacing between the Facts strip and the Projects heading, and between Projects and About, at 1440 and 375px. Adjust the Section's vertical padding if the seam looks cramped or doubled; write what was changed under Comments.

## Acceptance criteria

- [x] The page reads Hero, Projects, About, Stack, Experience, Contact in the browser at 1440 and 375px
- [x] Header links and the Nav overlay list Projects first, then About, Stack, Experience, Contact
- [x] The active-section highlight is right while scrolling through every Section, including Contact at the very bottom
- [x] "View Projects" in the Hero lands the Projects Section below the Header pill, and the Case study "← Back" link still returns to `/#projects`
- [x] A direct visit to `/#projects`, `/#about` and `/#contact` scrolls to the right Section
- [x] HUD labels run `01` to `05` in page order with no duplicates or gaps
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Done: `SECTION_IDS`, `NAV_SECTION_IDS`, `NAV_LINKS` and `page.tsx` reordered; HUD labels now Projects 01, About 02, Stack 03, Experience 04, Contact 05. Header and Nav overlay map over `NAV_LINKS`, nothing hard-coded, no edits needed. The Hero "View Projects" link (`#projects`) and the Case study back link (`/#projects`) are untouched.
- Seam: Hero (with Facts strip) ends flush, Projects keeps its own 64px top and bottom padding, so the heading sits 64px under the Facts strip and About starts 64px under the last card. Looked right at 1440 and 375, no padding changed.
- Active highlight: after the reorder Experience, Contact and the Footer are shorter than the viewport, so at 1440x900 Experience's top could not reach the Header offset (needs scrollY 3055, max 2999) and was never highlighted. A `min-height` on Contact fixed it but left about 350px of empty space under Contact, rejected as ugly. Fix: `currentSection()` in `use-header-state.ts` now treats a Section as current when its top is above `max(HEADER_OFFSET + 1, 35% of the viewport height)` (`ACTIVE_VIEWPORT_FRACTION`); the at-the-bottom rule still returns Contact. Checked at 1440x900: Projects, About, Stack, Experience (shortly before the bottom) and Contact (at the bottom) are each highlighted in order. The threshold applies to every Section, so highlights switch a little earlier than before.
- Active section after a link: the threshold alone still lit Contact after clicking "Experience", because the click lands at the page bottom, the same position as scrolling to the end. So following a link now locks the Active section (term added to `CONTEXT.md`): `scrollToSection` calls `lockSection(id, targetY)` in the new `components/navigation/section-lock.ts`, a small module store that `useActiveSection` reads and subscribes to. This covers every link through `scrollToSection` (Header, Nav overlay, "View Projects", "Let's talk") and a first visit to `/#experience`. The highlight jumps to the chosen Section at once instead of running through the Sections on the way. The lock is released by wheel, touch or scroll keys at any time, and by the page moving more than 40px from where the click landed once it has arrived there (covers dragging the scrollbar). Checked at 1440x900: clicking Experience, Stack, Contact, Projects and About each lights that link throughout and after the scroll, with no flicker; drift under 40px keeps the lock, wheel during the animation and after arrival releases it; `/#experience` lands lit. Not checked at 375px (the Header links are desktop-only there).
