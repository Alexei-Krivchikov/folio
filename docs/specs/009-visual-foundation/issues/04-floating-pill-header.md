# 04: Floating pill Header

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01

**Status:** ready-for-human

## What to build

The fixed full-width bar in `apps/web/components/navigation/header.tsx` becomes a rounded, blurred pill centred at the top of the viewport, holding the name and the nav links. The Nav overlay is re-skinned, not restructured.

- Pill: `fixed`, centred, with a gap from the top edge, fully rounded, translucent token background with `backdrop-blur`, a hairline token border. Max width fits the five links and the name at `md` and up.
- At mobile width the pill holds the name and the menu button; the button still opens `NavOverlay` and focus returns to it on close.
- The active-link style moves from white underline to the accent.
- Behaviour is kept exactly: the Header is `inert` and transparent until Hero has scrolled off (`useHeroPassed`), the active Section comes from `useActiveSection`, `use-focus-trap`, `use-scroll-lock`, `use-escape-key` and `use-close-on-desktop` are untouched.
- `NavOverlay` switches `zinc-*` to tokens and the new fonts; the link list, the dialog semantics and the close button stay.
- The anchor landing offset. `HEADER_OFFSET` in `apps/web/lib/navigation.ts` is today both the bar's height and the offset that anchors, `scrollToSection` and `useActiveSection` use to land clear of it. A floating pill has a height and a top gap, so the constant must cover pill height plus gap plus breathing room. Decide the new value in the browser, keep it the single source, and keep using it as an inline style where the Header reads it.
- `CONTEXT.md`: update the **Header** term from "fixed bar" to the pill, keeping _Avoid_: navbar, top bar.

## Acceptance criteria

- [x] At 1440px the Header is a centred rounded pill; it is hidden while Hero fills the viewport and fades in after, as before
- [x] At 375px the pill shows the name and the menu button; the button opens the overlay, Escape and the close button close it, focus goes back to the menu button
- [x] Each of the five links lands with its Section heading clearly visible below the pill (no heading hidden behind it)
- [x] The active Section's link is shown in the accent and follows the scroll, including the last Section at the very bottom
- [x] The pill is readable over every Section and over Project card covers
- [x] Tab order and focus rings are as before, with rings visible on the new colours; the hidden pill is still out of the tab order
- [x] `/projects/dominocrm` still shows no Header
- [x] `CONTEXT.md` describes the Header as the floating pill
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
