# 04: Project cards — preview, stack tags, motion

**Spec:** [005-projects](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

Turn the plain card links into the cards from the spec (sayedanowar-style), with the same motion vocabulary as Stack and Experience.

- Each card shows its number as `_0N.`, name, type label, year, summary, a limited number of stack tags, and a cover preview rendered with `next/image` from the frontmatter `cover`.
- Screenshots live in the web app's public folder, one subfolder per slug. Until real images arrive, covers point to one neutral placeholder image, and the build and page still work.
- The whole card is still one link, with no buttons or nested links inside. It has a visible `focus-visible` ring and opens with Enter.
- Grid layout: multiple columns on wide screens, single column on narrow screens.
- Motion: the Section uses the shared `fadeUp` variant with `whileInView` once and `staggerChildren` across cards. On hover the card lifts, and the preview scales slightly inside an `overflow-hidden` frame. No page transitions.
- The card list stays server-fetched; only the animated grid is a client component and receives plain props.

## Acceptance criteria

- [ ] Every card on `/` shows number, name, type, year, summary, stack tags, and preview
- [ ] Cards cascade in once when the Section scrolls into view, and don't replay on scroll back
- [ ] Hovering a card lifts it and zooms the preview slightly, without layout shift
- [ ] Tab reaches each card with a visible focus ring; Enter opens its Case study
- [ ] At a narrow viewport the cards are a single column, with no horizontal scroll
- [ ] Replacing a placeholder with a real image in a Project's folder needs only the file and its frontmatter path, no code changes
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
