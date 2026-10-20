# 01: Stack stops being a Section

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

Remove Stack as a Section and make every place that knows the Section order agree with that. The stack's tiles stay visible, inside About, so nothing is lost while tickets 04 and 05 build the real layout. No visual redesign here.

- **Data.** `stack.tsx` holds the four groups (Frontend, Backend, Database, Tools) and `brandOverrides`. The marquee (03) and the toolbox card (05) both need the same data, so move `groups`, `brandOverrides` and the `Tech` type out of the component into a plain data module next to `icon.ts` and `motion-icon.tsx` in `apps/web/components/stack/` (for example `tech.ts`). `Stack` the component and its file are deleted; `icon.ts` and `motion-icon.tsx` stay.
- **Interim About.** About renders the existing tile groups under its two paragraphs, reusing the markup that `Stack` has today, with the "My Stack" heading dropped so About has one heading. Ticket 05 replaces this composition; it only has to be correct and not broken.
- **Navigation.** In `apps/web/lib/navigation.ts` remove `stack` from `SECTION_IDS`, `NAV_SECTION_IDS` and `NAV_LINKS`. The Header, the Nav overlay and `currentSection()` map over those constants, so they should follow without edits; confirm that and touch them only if something is hard-coded.
- **Page.** `apps/web/app/page.tsx` renders `Hero`, `Projects`, `About`, `Experience`, `Contact`, then `Footer`.
- **HUD labels** are numbered by position: Projects `[ 01 / PROJECTS ]`, About `[ 02 / ABOUT ]`, Experience `[ 03 / EXPERIENCE ]`, Contact `[ 04 / CONTACT ]`. Spec 013 later generates these from the Section order; this ticket only keeps the page consistent.
- **Old links.** `/#stack` must degrade quietly: `isSectionHash` no longer matches it, so no scroll is attempted and the page opens at the top. Check there is no console error and nothing else (sitemap, README, Open Graph, other specs' docs) still links to `#stack`; grep for it.

## Acceptance criteria

- [x] The page reads Hero, Projects, About, Experience, Contact at 1440 and 375px, and the tiles are still shown inside About
- [x] Header links and the Nav overlay list Projects, About, Experience, Contact only
- [x] The Active section highlight is right through every Section, including Contact at the very bottom and after following each link
- [x] A direct visit to `/#stack` opens the top of the page with no console error; `/#about`, `/#experience`, `/#contact` still scroll to the right Section
- [x] HUD labels run `01` to `04` in page order with no gaps
- [x] `grep -r "stack" apps/web/lib apps/web/app apps/web/components/navigation` finds no Section reference left
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
