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

- [ ] About shows, top to bottom: the marquee, then the bento grid with the introduction, the toolbox and the "how I work" cards
- [ ] The text matches the approved copy in ticket 04 word for word
- [ ] At 1440px the grid has a clear hierarchy (the introduction largest); at 375px it is one column with no horizontal scroll and nothing clipped
- [ ] The marquee shows every tech from the four groups, with the four white overrides still visible on the dark background
- [ ] The toolbox names are in the DOM as grouped text, not only inside the marquee
- [ ] The introduction reveals word by word once on entering the viewport
- [ ] With reduced motion on, the marquee is a static wrapped list and all text is visible at once
- [ ] Tab order through About contains no stop inside the marquee
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
