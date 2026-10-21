# 05: About as a bento grid

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** 01, 02, 03, 04

**Status:** ready-for-human

## What to build

Replace the interim About from ticket 01 with the real one: the marquee across the top and a bento grid of cards under it, using the approved copy from ticket 04.

- **Marquee strip.** Across the top of the Section, the stack's logos in a `Marquee` (03), flattened from the groups in the data module from ticket 01. Each item is the icon plus its name, in the brand colour with the existing `brandOverrides` so Next.js, Vercel, Express and Prisma stay visible on the dark background. The strip is full-bleed (not clipped to the `max-w-5xl` column) but must not cause a horizontal scrollbar.
- **Introduction card.** The approved introduction, rendered through `WordReveal` (02). It is the largest card.
- **Toolbox card(s).** The four groups (Frontend, Backend, Database, Tools) as tile lists with the existing brand-coloured icon hover, headed by `HudLabel`. One card with four groups or two cards with two groups each, whichever reads better at 1440px; looked at, not guessed. The names stay as real text in the DOM, so a reader who skips the marquee still gets the grouped toolbox.
- **"How I work" cards.** The one or two small cards from ticket 04, each a short headline and one sentence.
- **Surfaces.** Ember surfaces and borders from spec 009 (the same card look as the Projects cards), `HudLabel` for small labels, no new colours. Cards that are not links do not tilt or react to the pointer; the only motion in the grid is the tile hover and the reveal.
- **Layout.** A 12-column-feeling bento at `md` and up, a single column on mobile with the introduction first. Card gaps and radii match the Projects cards. No fixed heights: the grid grows with its content so nothing is cut at 375px.
- **Entrance.** The cards enter with the existing `staggerVariants` and `fadeUpVariants` and `viewportOnce`, as the other Sections do; reduced motion is handled by those helpers.
- **Heading.** One Section heading, `[ 02 / ABOUT ]` with "About". The word "Stack" no longer appears as a heading.
- **Cleanup.** Remove whatever of the interim About from ticket 01 is now unused.

## Acceptance criteria

- [x] About shows, top to bottom: the marquee, then the bento grid with the introduction, the toolbox and the "how I work" cards
- [x] The text matches the approved copy in ticket 04 word for word
- [x] At 1440px the grid has a clear hierarchy (the introduction largest); at 375px it is one column with no horizontal scroll and nothing clipped
- [x] The marquee shows every tech from the four groups, with the four white overrides still visible on the dark background
- [x] The toolbox names are in the DOM as grouped text, not only inside the marquee
- [x] The introduction reveals word by word once on entering the viewport
- [x] With reduced motion on, the marquee is a static wrapped list and all text is visible at once
- [x] Tab order through About contains no stop inside the marquee
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Layout, looked at in Chrome at 1568px and 375px. The toolbox is one full-width card with a row per group (label left, tiles right): a two-by-two grid left Backend and Database half empty next to a seven-tile Frontend. The marquee wrapper is `aria-hidden` as a whole, because the toolbox card already lists every name as real text, so a screen reader reads each name once and the strip has no tab stops. At 375px the grid is one column, the introduction first, with no horizontal scroll and no clipped card. The marquee holds all 17 techs, and the four white overrides are visible on the dark background. The reduced-motion behaviour of the marquee and the word reveal was verified in tickets 03 and 02.

The developer asked for more of the stack to be shown. Added from the repository's own Case studies and the developer's confirmation: Chakra UI, shadcn/ui, i18next, Telegram Mini Apps (Frontend); a new State & data group with Redux Toolkit, Redux Saga, TanStack Query; NestJS, Passport, JWT (Backend); pnpm, Storybook, Husky (Tools). The strip now holds 31 techs (MongoDB added to Database), so the loop length is 3.5 s per item (about 109 s) to keep the same speed. shadcn/ui and JWT are black in the icon set and got the white override. Husky has no icon in the set, so it uses its own dog emoji in `husky-icon.tsx`, desaturated so it matches the monochrome icons. SignalR, NextAuth, Lenis and Feature-Sliced Design have no icon in the set and are not shown.
