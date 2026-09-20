# 09: Mobile pass at 375px

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07, 08

**Status:** ready-for-agent

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

- [ ] Every item in the list above meets all three criteria at 375×812
- [ ] No page scrolls horizontally at 320px
- [ ] Screenshots for each item are attached in this ticket's comments
- [ ] No regression at desktop width: the site looks as it did before this ticket
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

_Screenshots from the mobile pass go here._
