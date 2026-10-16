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

- [ ] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [ ] Navigation pass done; every link and CTA lands on the right Section
- [ ] Pointer pass done; effects are absent in the DOM under touch emulation and reduced motion
- [ ] Keyboard pass done; one tab stop per card, visible focus ring
- [ ] Contrast table written under Comments; every pair is AA
- [ ] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [ ] `CONTEXT.md` is up to date
- [ ] Spec 011 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
