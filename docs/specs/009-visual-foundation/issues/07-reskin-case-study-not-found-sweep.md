# 07: Re-skin Case study and not-found, then sweep

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 03, 05, 06

**Status:** ready-for-agent

## What to build

The last two pages, and the proof that the re-skin is complete.

- `apps/web/app/projects/[slug]/page.tsx`: tokens and fonts for the title, metadata line, tech list, links, gallery frame and the "← Back" link. The MDX body styles (headings, paragraphs, lists, code) move to tokens too. Layout and content are not changed; the View Transitions redesign is spec 014.
- `apps/web/app/not-found.tsx`: tokens and fonts, a `HudLabel` for the 404 marker, the link back home as a `Button`.
- Sweep: `grep -rn "zinc-" apps/web packages/ui --include=*.ts --include=*.tsx --include=*.css --include=*.mdx` (excluding `.next` and `node_modules`) returns nothing. Raw `text-white`, `bg-black` and `bg-white` literals are checked too and replaced where they stand for a token.
- `components/og/og-template.tsx` is **not** touched: OG images are restyled in spec 015.

## Acceptance criteria

- [ ] `/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio` and a missing URL render in the new palette and fonts at 1440px and 375px
- [ ] The Case study gallery and cover frames show no layout shift and nothing is cut off
- [ ] The sweep command above returns no matches in source files
- [ ] The Case study pages still show no Header, only their own "← Back" link
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
