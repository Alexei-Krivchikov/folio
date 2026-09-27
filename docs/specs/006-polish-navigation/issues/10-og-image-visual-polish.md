# 10: Visual polish for Open Graph images

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 07 (already Done — can start immediately)

**Status:** ready-for-agent

## What to build

The OG images shipped in ticket 07 are legible but visually flat: name, title, and a meta line on a plain dark background. This ticket gives them a real designed look while staying entirely code-generated through `next/og` — no binary assets enter the repo.

- Replace the plain background with a gradient, or a decorative SVG pattern/grid/noise, drawn inline through `next/og` (Satori supports SVG, gradients and shapes).
- Add at least one graphical accent beyond text — for example a large decorative shape or line, the project's order number rendered oversized and low-opacity, or the project's stack icons (the same `@icons-pack/react-simple-icons` already used in the Stack Section, which count as code, not binary assets, so reusing them here does not violate the "no binary assets" rule).
- Give the typography real hierarchy — an accent colour/weight for the primary element (project name, or "Frontend Developer" on the home page) instead of everything at one size and tone.
- The home page and a Case study should feel visually distinct within one shared system (fonts, spacing, palette) — e.g. the Case study leans on its stack icons as the accent, the home page uses something else.
- Still text/colour/SVG/gradients only. No PNG/JPG or other binary image assets.

## Acceptance criteria

- [ ] Background is not a flat colour: a gradient or decorative SVG pattern/grid/noise renders behind the content
- [ ] At least one graphical accent beyond plain text is present on both the home page image and the Case study images
- [ ] Typography shows clear hierarchy (accent colour/weight on the primary element, not uniform styling)
- [ ] The home page image and Case study images feel visually distinct from each other while sharing the same design system
- [ ] No binary image assets are introduced; everything renders via `next/og` (text, colour, SVG, gradients)
- [ ] Images remain 1200×630, stay legible, and do not look cluttered
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
