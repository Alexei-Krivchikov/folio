# 02: Grain overlay

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

A fine film grain over the whole site, as a generic primitive in `packages/ui`.

- `Grain` in `packages/ui/src/components/grain.tsx`, exported from `packages/ui/src/index.ts`. It knows nothing about the site: it renders one fixed, full-viewport, `pointer-events: none` layer with `aria-hidden`.
- The noise is static: an inline SVG `feTurbulence` data URI or a tiny tiled PNG, whichever is lighter and sharper on a high-DPI screen. Not an animated canvas, not a filter on `body`.
- Opacity is low enough that text contrast is unaffected; the value is tuned in the browser and written under Comments.
- Mounted once in `apps/web/app/layout.tsx`, stacked above the page background but below interactive content, so clicks, focus rings and text selection are never blocked.
- It stays under `prefers-reduced-motion`, because it does not move.

Independent of ticket 01: it uses no palette token, only black/white noise at low opacity.

## Acceptance criteria

- [ ] Grain is visible on the Hero background at 1440px and 375px, and subtle enough that body text is not harder to read
- [ ] Every link, button and the Header remain clickable and keep their focus rings; text can be selected
- [ ] Scrolling stays smooth: no new paint cost visible in the Performance panel (the layer is composited, not repainted)
- [ ] No horizontal scrollbar appears at 375px
- [ ] With reduced motion on, the grain is still there and nothing moves
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
