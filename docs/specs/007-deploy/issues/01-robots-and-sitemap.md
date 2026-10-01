# 01: robots.txt and sitemap

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

The site has nothing for search engines to follow. Add `robots.txt` and `sitemap.xml` generated from code, in line with ADR 0004: no static files in `public/`.

- The origin is read in exactly one place today, `metadataBase` in `app/layout.tsx`. `robots.ts` and `sitemap.ts` need the same value, so extract it into one shared constant (for example `lib/site.ts`) holding the `NEXT_PUBLIC_SITE_URL` read and its `http://localhost:3000` fallback, and make `layout.tsx`, `robots.ts` and `sitemap.ts` import it. There must be one copy of the fallback, not three.
- `app/robots.ts` allows every crawler on every path and names the sitemap by its absolute URL.
- `app/sitemap.ts` lists `/` and one `/projects/<slug>` for every Project, taken from `getProjects()`, all as absolute URLs. Do not hard-code the slugs; adding a Project must add it to the sitemap with no further edit.

## Acceptance criteria

- [ ] `/robots.txt` returns 200, allows all crawlers, and its `Sitemap:` line is an absolute URL
- [ ] `/sitemap.xml` returns 200 and lists `/` and `/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio`, all absolute
- [ ] With `NEXT_PUBLIC_SITE_URL` set, every URL in both files uses that origin; with it unset they fall back to `http://localhost:3000`
- [ ] The origin and its fallback live in one shared module imported by `layout.tsx`, `robots.ts` and `sitemap.ts`
- [ ] No new file appears in `public/`
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
