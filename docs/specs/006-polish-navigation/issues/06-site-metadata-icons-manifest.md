# 06: Site metadata, favicon and manifest

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

The site currently has a title, a description, and nothing else: no favicon, no base URL, no social metadata. This ticket lays the metadata foundation that the OG images (ticket 07) sit on.

- `metadataBase` in the root metadata reads `NEXT_PUBLIC_SITE_URL`, falling back to `http://localhost:3000`. Spec 007 then only sets an environment variable in Vercel — no code change.
- Root metadata gains `openGraph` (type, title, description, siteName, locale) and `twitter` with `card: "summary_large_image"`. The image itself arrives in ticket 07.
- `app/icon.tsx` and `app/apple-icon.tsx` generate an "AK" monogram through `next/og`: light glyph on the site's dark background, no binary assets, no `.ico`.
- `app/manifest.ts` returns the site name, short name, description, background and theme colours, and the icons.
- Add an ADR recording that all icons and preview images on this site are generated from code rather than stored as files — it is the reason `public/` holds nothing but Project screenshots.
- Add `NEXT_PUBLIC_SITE_URL` to the web app's `.env.example` (creating it if absent), documented as the public origin with no trailing slash.

## Acceptance criteria

- [ ] The browser tab shows the monogram favicon on the home page and on a Case study
- [ ] `/icon` and `/apple-icon` return PNGs
- [ ] `/manifest.webmanifest` returns the site name, short name and icons as JSON
- [ ] The rendered HTML of `/` contains `og:title`, `og:description`, `og:site_name` and `twitter:card`
- [ ] With `NEXT_PUBLIC_SITE_URL` unset the build works against `localhost`; setting it changes the absolute URLs in the metadata with no code edit
- [ ] A new ADR exists under `docs/adr/` and is numbered after the highest existing one
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
