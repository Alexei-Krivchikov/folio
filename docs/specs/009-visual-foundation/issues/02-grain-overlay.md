# 02: Grain overlay

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A fine film grain over the whole site, as a generic primitive in `packages/ui`.

- `Grain` in `packages/ui/src/components/grain.tsx`, exported from `packages/ui/src/index.ts`. It knows nothing about the site: it renders one fixed, full-viewport, `pointer-events: none` layer with `aria-hidden`.
- The noise is static: an inline SVG `feTurbulence` data URI or a tiny tiled PNG, whichever is lighter and sharper on a high-DPI screen. Not an animated canvas, not a filter on `body`.
- Opacity is low enough that text contrast is unaffected; the value is tuned in the browser and written under Comments.
- Mounted once in `apps/web/app/layout.tsx`, stacked above the page background but below interactive content, so clicks, focus rings and text selection are never blocked.
- It stays under `prefers-reduced-motion`, because it does not move.

Independent of ticket 01: it uses no palette token, only black/white noise at low opacity.

## Acceptance criteria

- [x] Grain is visible on the Hero background at 1440px and 375px, and subtle enough that body text is not harder to read
- [x] Every link, button and the Header remain clickable and keep their focus rings; text can be selected
- [ ] Scrolling stays smooth: no new paint cost visible in the Performance panel (the layer is composited, not repainted)
- [x] No horizontal scrollbar appears at 375px
- [x] With reduced motion on, the grain is still there and nothing moves
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `Grain` in `packages/ui/src/components/grain.tsx`, exported from `packages/ui/src/index.ts`, mounted once in `apps/web/app/layout.tsx` after the page content. It takes only an optional `className`.
- The noise is a 200x200 inline SVG (`feTurbulence` fractalNoise, `baseFrequency` 0.8, 3 octaves, `stitchTiles`, desaturated by `feColorMatrix`) used as a tiled `background-image` data URI. It is vector, so it stays sharp on high-DPI screens, and adds no network request.
- Layer: `fixed inset-0 z-40 pointer-events-none select-none`, below the Header and the Nav overlay (`z-50`), above the static page content, so the grain also covers section backgrounds and images.
- Opacity `0.06`, set by the developer after tuning in the browser. For reference, at `0.07` the black level already lifted visibly (`#0b0908` towards `#111`), at `0.14` the background turned clearly grey. The grain is neutral grey noise, so any value above zero lifts near-black a little.

### Verification

- Dev server, 1440px and 375px: overlay computed `pointer-events: none`, `z-index: 40`, `opacity: 0.05` (measured before the developer raised it to `0.06`), full-viewport size; `scrollWidth` equals `clientWidth` at 375px (no horizontal scroll); `elementFromPoint` over the "Let's Talk" button returns the button.
- Reduced motion: the component has no animation and no motion hook, so there is nothing to switch off.
- Not measured: the Performance panel check. The layer is a fixed element with a static background and no filter or blend mode, which the browser normally composites once, but this has not been confirmed in a trace. Left unchecked for the developer.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
