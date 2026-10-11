# 03: Primitives and Button for Ember

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

The remaining generic pieces in `packages/ui`, plus the restyled `Button`. The rule: a component that does not know the site's content lives in `packages/ui`.

- `HudLabel`: small Geist Mono, uppercase, wide tracking, bracketed text such as `[ 01 / PROJECTS ]`. Renders a `span` (or the element passed through `as`), muted colour by default.
- `AccentText`: inline emphasis in Instrument Serif italic, for one or two words per page. Renders `em`.
- `SectionHeading`: a `HudLabel` plus a heading. Props: the label text, the heading level (`h2` by default), children. Does not decide the Section's layout.
- `Button` and `buttonVariants` restyled for Ember: the default variant uses the accent (gradient or flat, as ticket 01 settled), `outline` uses the token border, `ghost` and `link` use token colours. The focus ring becomes the accent colour with `ring-offset-background`. Sizes and the `variant`/`size` API stay as they are, so `Hero`'s `buttonVariants()` calls keep working unchanged.
- All four exported from `packages/ui/src/index.ts`.
- Colours come only from tokens; no `zinc-*`, `white` or `black` literals in these files.

The primitives get their first real consumers in tickets 05 to 07; here they are checked in the browser by temporarily rendering them, and that scratch code is removed before the ticket closes.

## Acceptance criteria

- [ ] `HudLabel`, `AccentText`, `SectionHeading` exist, are typed, and are exported from `@folio/ui`
- [ ] The Hero's two buttons render in the Ember style with no change to `hero.tsx`
- [ ] Button focus ring is visible on the Ember background and passes the 3:1 non-text contrast rule
- [ ] No `zinc-*`, raw `white` or `black` class remains in `packages/ui/src`
- [ ] `SectionHeading` outputs a real heading element so heading order on the page is unchanged
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
