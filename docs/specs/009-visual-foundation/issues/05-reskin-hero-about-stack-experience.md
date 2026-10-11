# 05: Re-skin Hero, About, Stack, Experience

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 03

**Status:** ready-for-agent

## What to build

Move four Sections from `zinc-*` and `system-ui` to the Ember tokens and fonts, with no change to layout, copy or animations. Files: `components/hero/hero.tsx`, `components/about/about.tsx`, `components/stack/stack.tsx`, `components/experience/experience.tsx`.

- Replace every `zinc-*`, `white` and `black` colour class with the semantic token (`text-foreground`, `text-muted`, `border-border`, `bg-background`, accent where it marks emphasis or interaction).
- Headings use the sans family. The `h2` of About, Stack and Experience is rendered through `SectionHeading`, with a `HudLabel` like `[ 01 / ABOUT ]`; the numbers follow the current Section order and are updated by specs 011 and 012 when the order changes.
- Hero: the small uppercase line and the status pill switch to `HudLabel`-style text and token colours; the green dot and its pulse (with its reduced-motion rule) stay as they are. The `h1` keeps its size and copy.
- Stack: icon tiles and hover states move to tokens; the icon assets and `motion-icon.tsx` are not touched.
- No new animation and no layout change; the existing `fadeUpVariants` and `staggerVariants` usage is kept.

## Acceptance criteria

- [ ] None of the four files contains a `zinc-*` class
- [ ] At 1440px and 375px the four Sections look intentional in the new palette and fonts, and their layout is identical to before
- [ ] About, Stack and Experience headings show their HUD label and are still the same heading level as before
- [ ] Accent colour is used only for emphasis, links and hover/focus states
- [ ] Every text/background pair is within the AA ratios recorded in ticket 01
- [ ] With reduced motion on, behaviour is as before
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
