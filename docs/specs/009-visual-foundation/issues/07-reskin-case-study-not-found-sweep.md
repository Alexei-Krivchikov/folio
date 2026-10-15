# 07: Re-skin Case study and not-found, then sweep

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 03, 05, 06

**Status:** ready-for-human

## What to build

The last two pages, and the proof that the re-skin is complete.

- `apps/web/app/projects/[slug]/page.tsx`: tokens and fonts for the title, metadata line, tech list, links, gallery frame and the "← Back" link. The MDX body styles (headings, paragraphs, lists, code) move to tokens too. Layout and content are not changed; the View Transitions redesign is spec 014.
- `apps/web/app/not-found.tsx`: tokens and fonts, a `HudLabel` for the 404 marker, the link back home as a `Button`.
- Sweep: `grep -rn "zinc-" apps/web packages/ui --include=*.ts --include=*.tsx --include=*.css --include=*.mdx` (excluding `.next` and `node_modules`) returns nothing. Raw `text-white`, `bg-black` and `bg-white` literals are checked too and replaced where they stand for a token.
- `components/og/og-template.tsx` is **not** touched: OG images are restyled in spec 015.

## Acceptance criteria

- [x] `/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio` and a missing URL render in the new palette and fonts at 1440px and 375px
- [x] The Case study gallery and cover frames show no layout shift and nothing is cut off
- [x] The sweep command above returns no matches in source files
- [x] The Case study pages still show no Header, only their own "← Back" link
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `projects/[slug]/page.tsx`: title, meta line, tech links, gallery frame, divider and "← Back" use tokens. MDX `h2` is `text-foreground`, `p` and `ul` are `text-muted`, `strong` is `text-foreground`, MDX links are `text-accent underline`. Hover on Back, link pills and Next project is accent, focus outline is `outline-accent`. The "Next project" eyebrow is `HudLabel as="p"` with `[ Next project ]`. Layout, markup and content are unchanged; the page still has no Header.
- `not-found.tsx`: the 404 marker is `HudLabel as="p"` with `[ 404 ]`, `h1` and copy use tokens, the back link keeps `buttonVariants()` (Ember gradient button, dark text).
- `components/og/og-template.tsx` was not touched (spec 015).

### Verification

- Sweep `grep -rn "zinc-\|text-white\|bg-black\|bg-white\|text-black" apps/web packages/ui` over `.ts`, `.tsx`, `.css`, `.mdx` (excluding `node_modules`, `.next`) returns nothing.
- At 375px on `/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio` and a missing URL: no horizontal scroll, no `header` element on the case study pages, body font Bricolage Grotesque, `h1` `rgb(245,239,233)`, gallery frames 327x184 each (nothing cut off), 404 label in Geist Mono, 404 button gradient with `rgb(11,9,8)` text.
- Contrast uses only the foreground, muted and accent pairs from ticket 01.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
- Not done: 1440px check and screenshot comparison (the pane renders the emulated viewport too small); layout identity at that width rests on unchanged structure and classes. No before/after measurement of the gallery for layout shift was taken, only the final sizes.
