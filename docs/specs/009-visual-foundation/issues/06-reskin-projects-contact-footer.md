# 06: Re-skin Projects, Contact, Footer

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 03

**Status:** ready-for-human

## What to build

The same re-skin as ticket 05 for the second half of the home page: `components/projects/project-grid.tsx`, `components/projects/projects.tsx`, `components/contact/contact.tsx`, `components/footer/footer.tsx`.

- Colour classes become tokens; fonts become the new families.
- `projects.tsx` and `contact.tsx` headings go through `SectionHeading` with a `HudLabel`.
- Project cards: border, hover and focus ring move to tokens and the accent; the cover image frame, the grid, the card content and the motion on them stay as they are. Tilt and spotlight effects belong to spec 011 and are not added here.
- Contact: links and the Telegram/e-mail actions use `Button`/`buttonVariants` or token-coloured links; the contact behaviour and copy are untouched.
- Footer: tokens only.

## Acceptance criteria

- [x] None of the four files contains a `zinc-*` class
- [x] At 1440px and 375px the Projects, Contact and Footer look intentional in the new palette; the card grid and Contact layout are identical to before
- [x] Project card focus and hover states are visible in the accent, and the card is still one focusable link with the same label
- [x] Contact links work as before, including the Telegram link
- [x] Text over Project covers stays readable
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `zinc-*`, `text-white` are gone from the four files. Text is `text-foreground` / `text-muted`, borders `border-border`, fills `bg-foreground/5` (card body `bg-foreground/[0.03]`).
- The Projects heading lives in `project-grid.tsx`, so the `SectionHeading` is there: `[ 04 / PROJECTS ]`, wrapped in one `motion.div` with `fadeUp` so it keeps its place in the stagger. Contact uses `[ 05 / CONTACT ]`. Both stay `h2`; the old eyebrows ("Selected work", "Contact") are replaced by the labels.
- Project card: still one `Link` with the same content and `alt`. Hover border is `border-accent`, focus outline is `outline-accent` (measured on keyboard focus: `rgb(255,107,61)` solid 2px). Cover frame, grid, content and motion are unchanged. No text sits over covers.
- Contact: kept as token-coloured pill links so the layout stays identical (`buttonVariants` sizes would change it). Hover is `border-accent` plus `text-accent`; added an accent `focus-visible` outline, which the old links did not have. Hrefs, targets and copy are untouched.
- Footer: both lines are `text-muted`. The old `text-zinc-600` second line was below AA on this background, so it moved up to muted (7.18:1).
- `SectionHeading` sizes follow the ticket 05 note.

### Verification

- At 375px: no horizontal scroll, headings `H2`, three Contact links with the original hrefs, card border `rgb(42,36,33)`, link text `rgb(245,239,233)`, footer `rgb(163,154,145)`.
- Contrast uses only the foreground and muted pairs from ticket 01.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
- Not done: screenshot comparison at 1440px and 375px (the pane renders the emulated viewport too small), so layout identity rests on unchanged structure and classes plus the 375px metrics.
