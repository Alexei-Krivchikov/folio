# 01: Re-check the API and enable the experimental flag

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

The foundation for the transition tickets: confirm the feature still exists in the installed Next and React, turn the flag on, and prove the production build survives it. No visible change yet.

- **Re-check first.** Spec 014 says the first ticket re-checks the current API before any code is written. Read the Next docs for `experimental.viewTransition` for the installed version (`next` 16.3.8, `react` 19.2.4 in `apps/web/package.json`) and the React docs for `ViewTransition` (import path, props such as `name`, `share`, `enter`, `exit`, `default`, and how it is turned off). Record under Comments the exact flag name, the import, and any change from what ADR 0006 and the spec assume.
- **Flag.** Add `experimental: { viewTransition: true }` to `apps/web/next.config.ts`, next to the existing options and still wrapped by `withContentCollections`.
- **Reduced-motion rule.** Decide here, from the docs, where the reduced-motion switch lives. The expected shape is a `@media (prefers-reduced-motion: reduce)` rule in the global CSS that sets `animation: none` on `::view-transition-group(*)`, `::view-transition-old(*)` and `::view-transition-new(*)`, so no JavaScript branch is needed. Add it now so tickets 06 and 07 only wrap elements.
- **If the flag is gone or renamed.** Stop and tell the developer before changing the plan; the spec accepts a break in the experimental API only as a reason to drop the animation, not to invent a workaround.
- **ADR 0006.** It already exists. Fix any statement the re-check shows is wrong and leave it otherwise.

## Acceptance criteria

- [ ] The exact flag and `ViewTransition` import for the installed versions are written under Comments, with the docs page they came from
- [ ] `experimental.viewTransition` is `true` in `apps/web/next.config.ts`
- [ ] A reduced-motion rule disabling the view transition pseudo-elements is in the global CSS
- [ ] The production build serves the home page and all three Case study pages with no console errors, and navigation between them still works (the full effect is checked in ticket 06)
- [ ] ADR 0006 matches reality
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
