# 03: Nav overlay (mobile menu)

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 02

**Status:** ready-for-agent

## What to build

Below `md`, five links do not fit in a bar, so they collapse into a menu button that opens a full-screen Nav overlay.

- Below `md` the Header shows the name and a menu button instead of the link list.
- The button opens a full-screen overlay: the same five links at large type with generous spacing, plus a close button. Touch targets are at least 44px.
- It closes on: a link click, `Escape`, and the close button.
- While open, `lenis.stop()` holds the page behind still; `lenis.start()` on close. With no Lenis instance (reduced motion, ticket 04), fall back to locking `overflow` on the document element.
- Focus moves into the overlay on open, stays inside it while open, and returns to the menu button on close. The overlay is marked up so assistive technology knows it is a dialog.
- Picking a link closes the overlay and then scrolls to the Section — the scroll must not happen behind a still-open overlay.
- `CONTEXT.md` gains the term **Nav overlay**: the full-screen mobile menu opened from the Header. _Avoid_: drawer, burger menu.

## Acceptance criteria

- [ ] At 375px the Header shows a menu button; at desktop width the five links, with no trace of the button
- [ ] The overlay opens full-screen, covering the page, with all five links and a close button
- [ ] It closes on a link click, on `Escape`, and on the close button
- [ ] The page behind does not drift or scroll while the overlay is open, including on a touch device
- [ ] Picking a link closes the overlay and lands on the right Section, clear of the Header
- [ ] Tab cycles only through elements inside the open overlay; closing it returns focus to the menu button
- [ ] Every target in the overlay is at least 44px
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
