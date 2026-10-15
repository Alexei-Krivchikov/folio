# 03: Primitives and Button for Ember

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01

**Status:** ready-for-human

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

- [x] `HudLabel`, `AccentText`, `SectionHeading` exist, are typed, and are exported from `@folio/ui`
- [x] The Hero's two buttons render in the Ember style with no change to `hero.tsx`
- [x] Button focus ring is visible on the Ember background and passes the 3:1 non-text contrast rule
- [x] No `zinc-*`, raw `white` or `black` class remains in `packages/ui/src`
- [x] `SectionHeading` outputs a real heading element so heading order on the page is unchanged
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `HudLabel` renders a `span` by default, `as` swaps the element. Classes: `font-mono text-xs uppercase tracking-[0.2em] text-muted`. The brackets are part of the text the caller passes, as in `[ 01 / PROJECTS ]`.
- `AccentText` renders `em` with `font-serif italic font-normal`. `font-normal` is needed because Instrument Serif ships only the regular weight in italic, and a parent heading's `font-semibold` would otherwise trigger a faux bold.
- `SectionHeading` returns a fragment: a block `HudLabel` plus the heading element. Props: `label`, `as` (`h1` to `h4`, default `h2`), `className` for the heading, `labelClassName` for the label. It sets no wrapper, so the Section keeps control of layout.
- `Button` variants: `default` is `bg-accent-gradient text-background hover:brightness-110`, `outline` is `border-border text-foreground hover:bg-foreground/5`, `ghost` is `text-foreground hover:bg-foreground/5`, `link` is `text-accent`. Sizes and the `variant`/`size` API are unchanged. Text on the gradient is the dark `background` colour, as ticket 01 requires.
- Focus ring: `ring-accent` with `ring-offset-background`. Measured box-shadow on keyboard focus: `rgb(11,9,8)` 2px offset, `rgb(255,107,61)` 2px ring. Accent on background is 7.02:1, well above the 3:1 non-text minimum.

### Verification

- Temporary `/scratch` route rendered all four primitives and all four button variants; heading is a real `H2`, label uses Geist Mono, `AccentText` uses Instrument Serif. The route is removed.
- Hero's "Let's Talk" and "View Projects" buttons compute to the gradient and the outline styles with `hero.tsx` untouched.
- `grep` for `zinc`, `white`, `black` in `packages/ui/src` returns nothing.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
