# 10: Visual polish for Open Graph images

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 07 (already Done — can start immediately)

**Status:** Done

## What to build

The OG images shipped in ticket 07 are legible but visually flat: name, title, and a meta line on a plain dark background. This ticket gives them a real designed look while staying entirely code-generated through `next/og` — no binary assets enter the repo.

- Replace the plain background with a gradient, or a decorative SVG pattern/grid/noise, drawn inline through `next/og` (Satori supports SVG, gradients and shapes).
- Add at least one graphical accent beyond text — for example a large decorative shape or line, the project's order number rendered oversized and low-opacity, or the project's stack icons (the same `@icons-pack/react-simple-icons` already used in the Stack Section, which count as code, not binary assets, so reusing them here does not violate the "no binary assets" rule).
- Give the typography real hierarchy — an accent colour/weight for the primary element (project name, or "Frontend Developer" on the home page) instead of everything at one size and tone.
- The home page and a Case study should feel visually distinct within one shared system (fonts, spacing, palette) — e.g. the Case study leans on its stack icons as the accent, the home page uses something else.
- Still text/colour/SVG/gradients only. No PNG/JPG or other binary image assets.

## Acceptance criteria

- [x] Background is not a flat colour: a gradient or decorative SVG pattern/grid/noise renders behind the content
- [x] At least one graphical accent beyond plain text is present on both the home page image and the Case study images
- [x] Typography shows clear hierarchy (accent colour/weight on the primary element, not uniform styling)
- [x] The home page image and Case study images feel visually distinct from each other while sharing the same design system
- [x] No binary image assets are introduced; everything renders via `next/og` (text, colour, SVG, gradients)
- [x] Images remain 1200×630, stay legible, and do not look cluttered
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- `OgTemplate` (`apps/web/components/og/og-template.tsx`) now draws a faint dot/line grid via two `linear-gradient` layers on `backgroundImage` + `backgroundSize`, a radial-gradient corner glow tinted by an `accent` prop, and an optional oversized low-opacity `watermark` glyph — all CSS/text, no binary assets.
- Home page (`apps/web/app/opengraph-image.tsx`): accent `#22c55e` (matches the existing "available" green dot in the Hero), "Frontend Developer" set in that accent colour, watermark `>_`.
- Case study page (`apps/web/app/projects/[slug]/opengraph-image.tsx`): accent varies by `project.type` (`commercial` → sky `#38bdf8`, `personal` → violet `#a78bfa`), watermark is the project's oversized order number (`formatProjectNumber`), reusing existing `lib/projects.ts` helpers. Project `stack` values (e.g. "Next.js 16", "shadcn/ui") don't map cleanly onto the curated Simple Icons set used in the Stack section, so the order-number watermark was used as the graphical accent instead of stack icons.
- Verified all three routes (`/opengraph-image`, `/projects/folio/opengraph-image`, `/projects/dominocrm/opengraph-image`) in the browser against the dev server — grid, glow, and watermark render correctly, text stays legible, no clipping at 1200×630.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, and `npx turbo run build --filter=@folio/web` all pass; the production build prerenders all three OG image routes.
