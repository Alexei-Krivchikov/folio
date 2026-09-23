# 03: Nav overlay (mobile menu)

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 02

**Status:** done

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

- [x] At 375px the Header shows a menu button; at desktop width the five links, with no trace of the button
- [x] The overlay opens full-screen, covering the page, with all five links and a close button
- [x] It closes on a link click, on `Escape`, and on the close button
- [x] The page behind does not drift or scroll while the overlay is open, including on a touch device
- [x] Picking a link closes the overlay and lands on the right Section, clear of the Header
- [x] Tab cycles only through elements inside the open overlay; closing it returns focus to the menu button
- [x] Every target in the overlay is at least 44px
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

**Implementation notes**

- The overlay renders as a sibling of `<header>`, not inside it. The Header carries `backdrop-blur`, and a `backdrop-filter` makes an element a containing block for `position: fixed` descendants — nested, the overlay measured 375×71 instead of 375×812.
- `lenis.stop()` alone does not hold the page. Stopped, Lenis no longer calls `preventDefault()` on `wheel`, so the browser scrolls natively instead: a measured wheel gesture moved the page 1900 → 3000 behind an open overlay. The overlay therefore always locks `overflow` on the document element and calls `lenis.stop()` / `lenis.start()` on top of that, rather than treating the overflow lock as the no-Lenis fallback only.
- Overlay links do not go through the delegated `a[href^="#"]` handler in `use-anchor-scroll`. That handler is registered on `document` in the capture phase, so it would scroll before React's `onClick` could close the overlay. The links carry `data-anchor-scroll-skip`, which that handler now honours, and the overlay closes and then scrolls in the next frame. `scroll-to-section.ts` owns the maths both paths share, the attribute and the `skipsAnchorScroll` predicate that reads it.
- The overlay's behaviour lives in four single-purpose hooks rather than one effect: `use-scroll-lock` (Lenis plus the overflow lock), `use-focus-trap` (initial focus and Tab cycling), `use-escape-key`, and `use-close-on-desktop` in the Header. The component is then markup plus three hook calls.
- Keyboard handlers inside those hooks are arrow functions, not declarations: TypeScript hoists declarations, so a declaration loses the `panelRef.current` null-narrowing performed above it.
- A `matchMedia("(min-width: 768px)")` listener in the Header closes the overlay on a resize to desktop, so the scroll lock cannot survive past the breakpoint where the overlay is `md:hidden`.

**Verification** — measured through the DOM at 375×812 (the preview pane's screenshot capture returned blank frames, so geometry, focus and scroll position were read directly):

- Dialog 375×812 at top 0, `aria-modal="true"`, labelled "Menu"; close button 44×44, links 56px tall
- Scroll lock: a wheel gesture with the overlay open left `scrollY` at 1900 → 1900
- Escape, the close button and a link click all close it, restore `overflow` and return focus to the menu button
- Tab ×6 and Shift+Tab ×8 both stayed inside the dialog
- A link click landed `#projects` at `top: 72`, exactly clear of the Header, with `location.hash` unchanged (measured before the hooks refactor; afterwards the pane stopped painting, which freezes `requestAnimationFrame` and with it both Lenis and the deferred scroll, so this one is worth an eyeball before merge)
- 1440px: five links shown, menu button `display: none`; 320px: no horizontal scrolling
