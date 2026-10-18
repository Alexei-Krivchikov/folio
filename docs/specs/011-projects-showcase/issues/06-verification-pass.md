# 06: Verification pass for the Projects showcase

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05

**Status:** ready-for-human

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished Section, with findings fixed or written down. Steps that need the preview deployment or a real device are the developer's.

- **Browser pass at 1440px and 375px:** the order is Hero, Projects, About, Stack, Experience, Contact; the featured card spans the row on desktop; nothing overflows at 375px.
- **Navigation pass:** the Header links, the active-section highlight, the Nav overlay and the Hero's "View Projects" all land on the right Sections after the reorder, and the Case study "← Back" returns to `/#projects`.
- **Pointer pass:** tilt and magnetic work with a mouse and are completely absent with touch emulation and with reduced motion on. Check the DOM, not only the look: no overlay element, no inline transform on the card.
- **Keyboard pass:** each card is one tab stop with a visible focus ring and opens with Enter.
- **Contrast:** every text/background pair on the cards (marker, meta, summary, tags, affordance), including over the hover glow and the tilt light, is AA; ratios recorded.
- **Lighthouse mobile on the preview deployment:** Performance, LCP, CLS, and the size of the images served for the three covers. CLS must be 0. The spec asks for Performance of at least 90; if it is lower and the cause is the Hero shader rather than the cards, record that and tell the developer instead of closing quietly, since reaching the numbers is also the work of spec 016.
- **Docs:** `CONTEXT.md` already lists the Sections as Hero, Projects, About, Experience, Contact; add a term only if one settled during the work and is worth a name.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [x] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [x] Navigation pass done; every link and CTA lands on the right Section
- [x] Pointer pass done; effects are absent in the DOM under touch emulation and reduced motion
- [x] Keyboard pass done; one tab stop per card, visible focus ring
- [x] Contrast table written under Comments; every pair is AA
- [ ] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [x] `CONTEXT.md` is up to date
- [ ] Spec 011 is marked Done
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Browser pass: at 1440 the Sections are `hero, projects, about, stack, experience, contact`, the featured card is 976px wide on its own row and the other two are 476px side by side; no horizontal scroll. At 375 (mobile emulation) the same order, scroll width 375, no element wider than the viewport.
- Navigation pass (1440): the Hero "View Projects" lands Projects at 88px under the Header; Header links Projects, About, Stack, Experience, Contact in that order, each one lands its Section at 88px and lights its own link (Experience and Contact cannot reach 88px because the page ends, and still stay lit through the Active section lock). Nav overlay (375): the same five links in the same order, each closes the menu and lands its Section. "← Back" on the DominoCRM Case study goes to `/#projects` and Projects was at 88px afterwards.
- Pointer pass: with a mouse, three overlay elements existed (one per card). Under touch emulation (375 mobile preset) earlier tickets and this pass found no overlay, no wrapper `style`, no CTA `style`. Reduced motion cannot be emulated in the pane or in the real Chrome, so `matchMedia('(prefers-reduced-motion: reduce)')` was forced to `true` in the page and the cards were remounted by a client-side round trip (card link, then "← Back"): 0 overlay elements, no wrapper or inner `style`, no CTA `style`, and each `li` was `opacity: 1; transform: none` (no lift either). Since no `TiltSurface` or `MagneticSurface` is mounted, no pointer listeners exist in these states.
- Keyboard pass: done in tickets 04 and 05 on the same markup (real Tab: first card `:focus-visible`, solid 2px accent outline, no tilt or CTA motion; three tab stops in the list; Enter opened `/projects/dominocrm`); the layout has not changed since.
- Contrast (1440, computed in the page: text and background composited over the page background through every ancestor, colours converted to sRGB; the second figure is the worst case under the tilt light, which tints text and background with 7% accent): index `[0N]` 6.86 (6.25 under light), marker Commercial 5.93 (5.36), marker Personal 6.19 (5.57), name 16.64 (14.41), meta 6.86 (6.25), summary 6.86 (6.25), tag 15.03 (12.84), `+N` 6.86 (6.25), "View project" 6.71 (6.20). Lowest is 5.36, against AA 4.5 for normal text, so every pair passes. The hover border and glow are outside the text and do not change any pair.
- CLS and images (local dev server, 375 mobile emulation at density 2, scrolled to the end and back): layout-shift entries 0, CLS 0. Covers served at 750px wide, 30 KB (DominoCRM), 29 KB (Book Tracker) and 11 KB (folio), for a rendered width of 327 css px. This is not Lighthouse and not the preview deployment.
- Not done, needs the developer: Lighthouse mobile on the preview deployment (Performance, LCP, CLS against the real build) and, with it, the spec's "Performance at least 90"; if it is lower because of the Hero shader rather than the cards, that is for spec 016. For that reason `Status: Done` is not set in `spec.md` and its box is not ticked.
- Docs: `CONTEXT.md` already listed the Sections correctly; one term settled during the work and is now defined, **Featured project** (the first Project by order, shown wider, chosen by position and never by name). The card affordance reads "View project", and "Case study" remains the term for the page itself.
