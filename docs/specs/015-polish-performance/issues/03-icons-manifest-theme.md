# 03: Ember icons, manifest colours and theme-color

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

The tab icon, the home-screen icon, the installed-app colours and the mobile browser chrome all match the Ember background instead of the old `#0a0a0a`.

- **`app/icon.tsx` and `app/apple-icon.tsx`.** Ember background `#0b0908`, "AK" in the display font from ticket 01, with the ember accent (a gradient or an underline mark) so the icon reads as the site at 32px. It must stay legible at 16px in a browser tab; check it zoomed.
- **`app/manifest.ts`.** `background_color` and `theme_color` follow the Ember background. Keep the two icon entries, and add a maskable 512 icon only if it needs no new binary (generated from code).
- **`theme-color`.** Add a `viewport` export in `app/layout.tsx` with `themeColor` set to the Ember background, so the mobile browser bar matches.

## Acceptance criteria

- [ ] `/icon` and `/apple-icon` render the new mark in the display font, readable at 16px
- [ ] `/manifest.webmanifest` answers 200 with Ember `background_color` and `theme_color`
- [ ] The rendered HTML contains `<meta name="theme-color">` with the Ember value
- [ ] No `#0a0a0a` remains anywhere in `apps/web`
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
