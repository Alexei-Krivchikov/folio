# 06: Re-skin Projects, Contact, Footer

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 03

**Status:** ready-for-agent

## What to build

The same re-skin as ticket 05 for the second half of the home page: `components/projects/project-grid.tsx`, `components/projects/projects.tsx`, `components/contact/contact.tsx`, `components/footer/footer.tsx`.

- Colour classes become tokens; fonts become the new families.
- `projects.tsx` and `contact.tsx` headings go through `SectionHeading` with a `HudLabel`.
- Project cards: border, hover and focus ring move to tokens and the accent; the cover image frame, the grid, the card content and the motion on them stay as they are. Tilt and spotlight effects belong to spec 011 and are not added here.
- Contact: links and the Telegram/e-mail actions use `Button`/`buttonVariants` or token-coloured links; the contact behaviour and copy are untouched.
- Footer: tokens only.

## Acceptance criteria

- [ ] None of the four files contains a `zinc-*` class
- [ ] At 1440px and 375px the Projects, Contact and Footer look intentional in the new palette; the card grid and Contact layout are identical to before
- [ ] Project card focus and hover states are visible in the accent, and the card is still one focusable link with the same label
- [ ] Contact links work as before, including the Telegram link
- [ ] Text over Project covers stays readable
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
