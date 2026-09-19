# 05: Case study — links row, gallery, metadata

**Spec:** [005-projects](../spec.md)

**Blocked by:** 01

**Status:** Done

## What to build

Complete the Case study page around the MDX body: links to code and the live product, the screenshot gallery, and per-page metadata.

- Under the title, type, and year, a links row shows a GitHub link for each entry in `links.github` (using its label, for example "GitHub — UI") and a Website link when `links.website` exists. Links open in a new tab with `rel="noopener noreferrer"`. Missing links are left out entirely, with no empty or disabled placeholders.
- After the MDX body, a screenshot gallery renders `gallery` entries with `next/image`, using their `alt` text, as a simple responsive grid that lazy-loads below the fold. If `gallery` is empty, the gallery block is not rendered. Placeholder images are fine until the developer provides real ones.
- `generateMetadata` sets the page title from `name` and the description from `summary`.
- Page order matches the spec: Back + title → type, year, links → MDX body → gallery → next-project link (if ticket 02 has landed).

## Acceptance criteria

- [x] A Project with GitHub and Website shows both links; a Project without GitHub shows only Website; a Project with no links shows no links row
- [x] External links open in a new tab
- [x] The gallery shows images with alt text, and is hidden when `gallery` is empty
- [x] Each `/projects/<slug>` has its own `<title>` and meta description
- [x] No horizontal scroll at a narrow viewport
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
