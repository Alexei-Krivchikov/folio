# 02: Sticky Header with desktop navigation and active Section

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 01

**Status:** Done

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

- [x] On load the Header is not visible; scrolling past Hero fades it in, scrolling back up hides it again
- [x] Each of the five links glides to its Section and lands clear of the Header
- [x] The link for the Section currently on screen is visibly active, and the highlight follows the scroll
- [x] The URL stays at `/` while scrolling: no hash is appended
- [x] The Header is readable over every Section, including over Project card covers
- [x] `/projects/dominocrm` shows no Header, only its own "← Back" link
- [x] Tab reaches the name and all five links with a visible focus ring; Enter follows them
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

The Header lives in `components/navigation/header.tsx`, its visibility and active-Section hooks in `use-header-state.ts`, and the link list in `lib/navigation.ts` next to `HEADER_OFFSET`. Height is set as an inline `style={{ height: HEADER_OFFSET }}`, so the constant stays the single source.

Two things the browser pass settled:

- The active Section is **not** tracked with an `IntersectionObserver` band. A band keyed on `rootMargin` lit the next link while the previous Section still filled the screen — standing on "My Experience" highlighted Projects. `useActiveSection` instead measures on scroll (a passive listener, coalesced into one `requestAnimationFrame`): the active Section is the last one whose top has passed the Header line. At the very bottom of the page it is the last Section outright, because Contact plus Footer are shorter than one viewport and Contact's top never reaches the line.
- While hidden the Header is `inert`, not `aria-hidden` plus `pointer-events-none`. Focusable links inside an `aria-hidden` subtree are an a11y conflict, and Tab still reached them; `inert` takes them out of the tab order until the Header fades in.

Hero visibility is the one place an observer earns its keep: an `IntersectionObserver` on `#hero` with `rootMargin: HEADER_OFFSET 0 0 0`, so the fade-out on the way back up starts a Header height early.

Verified in the browser at desktop width: hidden at the top, faded in past Hero, each link lands its Section at exactly 72px, the highlight matches the Section under the Header at every scroll position including the page bottom, the URL stays at `/` with no hash, focus rings are 2px at 4px offset (they arrive white through `transition-colors`, so a reading taken mid-transition shows the link colour), and `/projects/dominocrm` renders no Header.

Not from this ticket, seen in dev while testing: opening `/#experience` in a fresh tab lands the Section at the very top rather than at `HEADER_OFFSET` — the browser's own hash jump appears to land after the mount-time Lenis scroll. Ticket 01's criterion ("lands on the Section") still holds; the offset does not. Left for a follow-up.
