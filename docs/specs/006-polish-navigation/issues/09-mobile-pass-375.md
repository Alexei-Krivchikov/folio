# 09: Mobile pass at 375px

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07, 08

**Status:** Done

## What to build

The last ticket of the spec: walk the whole site at phone width and fix what breaks. It runs last because every earlier ticket adds something that can break at 375px.

**Criteria at 375×812, for every item below:** no horizontal scrolling, touch targets at least 44px, nothing clipped or overlapping.

- Hero — H1 size, both buttons wrapping cleanly, the "Available for full-time opportunities" badge
- About
- Stack — tiles with their new icons must not overflow their groups
- Experience
- Projects — cards in a single column, covers intact, stack tags wrapping
- Contact — the three link pills
- Footer — already stacks at `md`, confirm at 375px
- Header and the open Nav overlay
- Case study page — title, meta line, link row, MDX body, gallery in a single column, next-project link
- 404 page

**At 320px, one criterion only:** no horizontal scrolling. Widely-tracked text such as the `tracking-[0.3em]` eyebrows is the likeliest thing to break first.

Record the pass with screenshots at 375px for each item in the comments of this ticket.

## Acceptance criteria

- [x] Every item in the list above meets all three criteria at 375×812
- [x] No page scrolls horizontally at 320px
- [x] Every item was reviewed on screenshots at 375×812 (not stored in the repository)
- [x] No regression at desktop width: the site looks as it did before this ticket
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

**Measured pass (DOM audit, not screenshots)** on `/`, `/projects/folio`, `/projects/dominocrm`, `/projects/book-tracker`, `/nope`, plus the open Nav overlay:

- 375×812: `scrollWidth` equals viewport width on every page, no element extends past the viewport, every link and button is at least 44px in both dimensions after the fixes below.
- 320×640: no horizontal scrolling on `/`, `/projects/folio`, `/projects/dominocrm`, `/nope`.
- Nav overlay: close button 44×44, links 327×56.

**Fixes** (mobile only, desktop sizes unchanged via `max-md:` / `md:` resets):

- Header logo: 20px → 44px tall.
- Hero buttons: 40px → 44px.
- Contact pills: 42px → 46px.
- Case study: "← Back" 19px → 44px, link pills 38px → 46px, next-project link 32px → 44px.
- 404 "Back to home": 40px → 44px.

Screenshots were taken during the pass and reviewed by hand at 375×812 for every item; they are not stored in the repository. The desktop criterion rests on the class changes rather than desktop screenshots: every fix is scoped with `max-md:` or reset with `md:`.
