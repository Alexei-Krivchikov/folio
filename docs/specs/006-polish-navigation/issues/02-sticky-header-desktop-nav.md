# 02: Sticky Header with desktop navigation and active Section

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

The Header itself, at desktop width only. It rides on the anchors and the scroll module from ticket 01, so its links are plain `#id` anchors and need no scroll code of their own.

- A fixed Header mounted in the home page, not in the root layout. Case study pages must not render it.
- It is hidden while Hero fills the viewport and fades in once Hero has scrolled out, via an `IntersectionObserver` on the Hero Section. Background is `backdrop-blur` with a translucent fill and a bottom border, so it stays readable over any Section.
- Left: "Alexei Krivchikov", linking to `/`. Right: About, Stack, Experience, Projects, Contact — anchors to the ids from ticket 01.
- An `IntersectionObserver` over the Sections tracks the current one; its link renders in the active style. The URL hash is never rewritten while scrolling — no `history.replaceState`.
- The Header's height matches `HEADER_OFFSET` from ticket 01.
- Links carry a visible `focus-visible` ring, matching the rings already used on Project cards.
- At this stage the links may simply be hidden below `md`; the mobile menu is ticket 03.
- `CONTEXT.md` gains the term **Header**: the fixed bar with links to the Sections, shown once Hero has scrolled off. _Avoid_: navbar, top bar.

## Acceptance criteria

- [ ] On load the Header is not visible; scrolling past Hero fades it in, scrolling back up hides it again
- [ ] Each of the five links glides to its Section and lands clear of the Header
- [ ] The link for the Section currently on screen is visibly active, and the highlight follows the scroll
- [ ] The URL stays at `/` while scrolling: no hash is appended
- [ ] The Header is readable over every Section, including over Project card covers
- [ ] `/projects/dominocrm` shows no Header, only its own "← Back" link
- [ ] Tab reaches the name and all five links with a visible focus ring; Enter follows them
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
