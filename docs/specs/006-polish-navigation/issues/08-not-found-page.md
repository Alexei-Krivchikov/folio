# 08: Custom 404 page

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** Done

## What to build

The Case study route already sets `dynamicParams = false`, so an unknown slug 404s — onto Next's default white system page, which looks like a broken deployment on a dark site.

- `app/not-found.tsx` in the site's own style: dark background, the same type scale and spacing as the other pages, a short line saying the page does not exist, and a link back to the home page.
- It serves both unknown `/projects/<slug>` and any other unknown path.
- No Header and no anchor links — this page is not the home page and must not offer navigation that would only half-work.
- Static, no client-side JavaScript beyond what the link needs.

## Acceptance criteria

- [x] `/does-not-exist` renders the site's own 404, dark and consistent with the rest of the site
- [x] `/projects/unknown` renders the same page
- [x] Both return HTTP 404, not 200
- [x] The link back to `/` works and is reachable by keyboard with a visible focus ring
- [x] The page carries a sensible title in the tab
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
