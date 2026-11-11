# 01: One module for the Sections, Header geometry next to the Header

**Spec:** [017-navigation-depth](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

Split `apps/web/lib/navigation.ts` by what each part is about.

- `apps/web/lib/sections.ts`: the Sections of the home page in their order, written once. It holds the five ids (`hero`, `projects`, `about`, `experience`, `contact`), `NAV_SECTION_IDS` and `NavSectionId` derived from that list (the Sections that have a link, so everything but `hero`), `NAV_LINKS`, `isSectionHash`, `isNavSectionId` and `sectionIndex`.
- `apps/web/components/navigation/header-geometry.ts`: `HEADER_TOP_GAP`, `HEADER_PILL_HEIGHT`, `HEADER_OFFSET`. The Header and the Nav overlay read them for their own size, and the scroll code reads `HEADER_OFFSET` so a Section stops below the pill.
- Delete `lib/navigation.ts` and update every import (callers today: `about`, `contact`, `experience`, `project-grid`, `header`, `nav-overlay`, `scroll-to-section`, `section-lock`, `use-anchor-scroll`, `use-header-state`).

Why: the order of the Sections is a domain fact (`CONTEXT.md`, Section) and today it is written in two lists; the geometry is a property of the Header and has nothing to do with the list of Sections.

## Acceptance criteria

- [ ] The order of the Sections exists in exactly one place; `NAV_SECTION_IDS` is derived from it, not retyped
- [ ] `lib/navigation.ts` is gone and nothing imports it
- [ ] The values of the three Header constants are unchanged
- [ ] The Header, the Nav overlay, the HUD indices (`[ 01 / 04 ]` … `[ 04 / 04 ]`) and the anchor links behave as before at 1440px and 375px
- [ ] `docs/architecture.md` lists the new files instead of `lib/navigation.ts`
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
