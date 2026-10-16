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

- [ ] The page reads Hero, Projects, About, Stack, Experience, Contact in the browser at 1440 and 375px
- [ ] Header links and the Nav overlay list Projects first, then About, Stack, Experience, Contact
- [ ] The active-section highlight is right while scrolling through every Section, including Contact at the very bottom
- [ ] "View Projects" in the Hero lands the Projects Section below the Header pill, and the Case study "← Back" link still returns to `/#projects`
- [ ] A direct visit to `/#projects`, `/#about` and `/#contact` scrolls to the right Section
- [ ] HUD labels run `01` to `05` in page order with no duplicates or gaps
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
