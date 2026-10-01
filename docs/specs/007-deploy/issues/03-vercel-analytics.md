# 03: Vercel Web Analytics

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

The developer wants to know whether anyone visits the site and where they come from, without a consent banner.

- Add `@vercel/analytics` to `apps/web` and mount `<Analytics />` (from `@vercel/analytics/next`) once in `app/layout.tsx`, inside `<body>` next to `LenisProvider`.
- It is cookieless, so no banner and no consent logic are added. Speed Insights is not added.
- The component only reports from a Vercel deployment; locally and in CI it does nothing. Do not add any environment check of your own.
- Enabling Web Analytics in the Vercel project dashboard is part of ticket 06, not this one.

## Acceptance criteria

- [ ] `@vercel/analytics` is a dependency of `@folio/web` and `pnpm-lock.yaml` is updated
- [ ] `<Analytics />` is rendered once, in the root layout, and nowhere else
- [ ] The site renders and behaves exactly as before in local dev and in the production build; the browser console shows no new errors
- [ ] No cookie is set by the site
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
