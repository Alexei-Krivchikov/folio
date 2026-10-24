# 01: Re-check the API and add the reduced-motion rule

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

The foundation for the transition tickets: confirm what the installed Next and React expose, add the global CSS the transitions need, and prove the production build survives it. No visible change yet.

- **Re-check first.** Read the Next docs for view transitions for the installed version (`next` 16.3.8, `react` 19.2.4 in `apps/web/package.json`) and the React docs for `ViewTransition` (import path, props such as `name`, `share`, `enter`, `exit`, `default`, and how it is turned off). Record under Comments the exact import and any change from what ADR 0006 and the spec assumed.
- **No flag.** The re-check found that `experimental.viewTransition` no longer exists in Next 16.3.8, and that the App Router runs `ViewTransition` with no configuration. `apps/web/next.config.ts` is not changed.
- **Global CSS.** In `apps/web/app/globals.css`: a `@media (prefers-reduced-motion: reduce)` rule setting `animation: none` on `::view-transition-group(*)`, `::view-transition-old(*)` and `::view-transition-new(*)`, so no JavaScript branch is needed, and `::view-transition { pointer-events: none; }` so clicks during a transition reach the page. Tickets 06 and 07 only wrap elements.
- **ADR 0006 and spec 014.** Fix every statement about the flag.

## Acceptance criteria

- [x] The exact `ViewTransition` import for the installed versions is written under Comments, with the docs page it came from
- [x] The absence of `experimental.viewTransition` is recorded, and `next.config.ts` is unchanged
- [x] A reduced-motion rule disabling the view transition pseudo-elements, and the `pointer-events` rule, are in the global CSS
- [x] The production build serves the home page and all three Case study pages (HTTP 200 from `next start`); the full effect is checked in ticket 06
- [x] ADR 0006 and spec 014 match reality
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

**Re-check result (2026-10-24).** Source: `next@16.3.8` bundled docs, `dist/docs/01-app/02-guides/view-transitions.md` (also `01-app/03-api-reference/02-components/link.md` for `transitionTypes`).

- Import: `import { ViewTransition } from 'react'`.
- Props used by the guide: `name`, `share`, `enter`, `exit`, `default`; `enter`/`exit` accept an object keyed by transition type. `Link` takes `transitionTypes={['nav-forward']}`.
- No config flag: the guide states view transitions work in the App Router with no configuration; the string `viewTransition` is absent from Next's config schema and types. ADR 0006 and spec 014 assumed `experimental.viewTransition: true`, and both were corrected.
- `ViewTransition` is a React canary feature that the App Router bundles. Route navigations are transitions, so animations activate on navigation without extra code.
- A named pair morphs only if the destination renders in the same commit as the navigation (prefetched pages). If it suspends into a fallback first, the content uses its enter animation instead. This matters for ticket 06.
- With `default="none"` on a named pair the `share` prop must be set explicitly, or the pair stops morphing.
- Reduced motion is a CSS-only switch. The guide uses `animation-duration: 0s !important`; this repo uses `animation: none` instead, because biome flags `!important`. If a later ticket adds `.class`-scoped view transition rules, they outrank `(*)`, so check reduced motion again in ticket 08.
- Not checked in a browser: console errors on the four pages. The CSS-only change adds no scripts; the browser pass is ticket 08.
