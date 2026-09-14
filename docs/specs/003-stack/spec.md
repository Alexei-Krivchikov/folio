# Spec 003 — Stack grid

Status: Done

## Problem Statement

After the About section the page just ends. A recruiter can't see which technologies the developer works with. Following the tajmirul.site reference, a "My Stack" section is needed that shows technologies grouped in a grid.

## Solution

Below About, a "My Stack" section shows technology groups (Frontend, Backend, Database, Tools) as a grid of text tiles. Groups cascade in when the section scrolls into view, and each tile lifts slightly on hover.

## User Stories

1. As a recruiter, I want to see the developer's technologies grouped by area, so that I can match them against a job's requirements quickly.
2. As a recruiter, I want the groups to be Frontend, Backend, Database, and Tools, so that the grouping matches how job descriptions are usually written.
3. As a visitor, I want the groups to appear in a cascade when I scroll to the section, so that the animation style matches Hero and About.
4. As a visitor, I want the section animation to play only once, so that it doesn't repeat on every scroll.
5. As a visitor, I want tiles to scale in from slightly smaller, so that they feel like they're settling into place.
6. As a visitor, I want a tile to lift by 4px and show a lighter border on hover, so that the grid feels interactive.
7. As the developer, I want the stack data to live next to the component, so that updating my stack is a single-file change.

## Implementation Decisions

- New client component for the Stack section, with its `groups` data (Frontend/Backend/Database/Tools) colocated.
- Animation: the section uses `whileInView` once with `staggerChildren` across groups; tiles animate `scale 0.92 → 1` and use `whileHover` with `y: -4`.
- The home page adds `<Stack />` right after `<About />`.
- Text tiles only for the MVP; technology logo icons are deferred to Phase 5 polish.

## Testing Decisions

- No automated tests; behaviour is verified manually in the browser plus static checks.
- Acceptance:
  - `pnpm dev` → `/` shows My Stack, groups cascade in on scroll
  - Hovering a tile lifts it by 4px and shows a lighter border
  - `biome check`, `tsc`, and `turbo build --filter=@folio/web` pass
- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Technology logos/icons (Phase 5 polish).
- Filtering, proficiency levels, or any data source other than the colocated list.

## Further Notes

- Reference: tajmirul.site.
- Rewritten from Russian into English and the current template without changing its decisions.
