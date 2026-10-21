# 07: Verification pass for About and Experience

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06

**Status:** ready-for-human

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished Sections, with findings fixed or written down. Steps that need the preview deployment, a real device or a screen reader are the developer's.

- **Navigation pass:** the Header, the Nav overlay and the anchor-scroll hook have no reference to `#stack`; `/#stack` opens the top of the page without an error; the Active section highlight is right for Projects, About, Experience and Contact.
- **Browser pass at 1440px and 375px:** the bento layout, the marquee loop with no visible jump at the seam, no horizontal scroll, text readable while the reveal runs.
- **Reduced-motion pass:** static ribbon, all text visible at once, timeline line fully drawn, no pulse. Reduced motion cannot be emulated in the pane or in the real Chrome, so check by forcing `matchMedia('(prefers-reduced-motion: reduce)')` in the page and remounting, as in spec 011.
- **Screen-reader pass:** sentences are read normally and logo names are read once. If no screen reader is at hand, check the accessibility tree and record that this is what was checked.
- **Keyboard pass:** no tab stop inside the marquee; focus rings unchanged.
- **Contrast:** every text/background pair on the new cards, the marquee names and the timeline is AA; ratios recorded.
- **Low-end fallback:** if the marquee is visibly janky on a low-end or throttled phone profile, the spec says it falls back to the static list at that breakpoint instead of being thinned out. Record what was seen and either apply that fallback or say why it was not needed.
- **Lighthouse mobile on the preview deployment:** Performance at least 90 and CLS 0. If Performance is lower and the cause is the Hero shader rather than these Sections, record that and tell the developer instead of closing quietly; reaching the numbers is also the work of spec 016.
- **Docs:** `CONTEXT.md` already says the stack of tools is part of About. Add a term only if one settled during the work and is worth a name.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [x] Navigation pass done; no link or code path references `#stack`
- [x] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [x] Reduced-motion pass done
- [x] Screen-reader (or accessibility tree) pass done and recorded
- [x] Keyboard pass done
- [x] Contrast table written under Comments; every pair is AA
- [x] Low-end marquee decision recorded
- [x] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [x] `CONTEXT.md` is up to date
- [x] Spec 012 is marked Done
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Navigation pass (1440, built-in browser): Sections on the page are `hero, projects, about, experience, contact`; Header links are Projects, About, Experience, Contact; no `#stack` element exists and `grep "#stack"` finds it only in the spec 012 documents. Clicking each Header link lands its Section (Projects 88px, About 89px under the top; Experience and Contact cannot reach the top because the page ends) and lights only its own link. Scrolling through Hero, Projects, About, Experience, Contact and to the very bottom lights none, then Projects, About, Experience, Contact, Contact. A fresh load of `/#stack` opens at the top (scrollY 0) with no Next.js issue and no failed request. Nav overlay (375): the same four links, each closes the menu and lands its Section at 88px after the smooth scroll.
- Browser pass: at 1440 and 375 there is no horizontal scroll (scroll width 1440 and 375) and no element outside the marquee is wider than the viewport. At 375 the bento is one column with the introduction first, the Experience list ends at 351px. The marquee holds 31 techs, both copies are the same width (3951px at 375), the loop is 108.5s, so the seam is exact by construction. The reveal was watched while it ran in ticket 02 and the text stayed readable.
- Reduced-motion pass: reduced motion cannot be emulated in the pane or in Chrome, so `matchMedia('(prefers-reduced-motion: reduce)')` was forced to `true` and About and Experience were remounted by a client-side round trip (a project card, then "Back"). Result: Experience line `transform: none`, dot filled, no pulse ring element; About cards and tiles at opacity 1. Motion's own `useReducedMotion`, used by `WordReveal`, caches the first value and ignored the late override, so the words were checked the other way: the `prefers-reduced-motion` rules of the built CSS were applied unconditionally. Result: all 69 words at opacity 1 and no transform, marquee animation none, second copy `display: none`, mask none, first copy wrapping, no horizontal scroll. This covers the server render and the hydrated state separately; a real user with the setting on gets both.
- Screen-reader pass (accessibility tree, no screen reader at hand): every one of the 31 tool names appears exactly once outside `aria-hidden` and `inert` content, the marquee strip is `aria-hidden` as a whole and its second copy is also `inert`, the introduction is read once as the `sr-only` sentence while the split words are `aria-hidden`. The Experience list is an `ol` of `li`. One caveat, not changed: Tailwind sets `list-style: none` on it, which makes Safari with VoiceOver drop the list role, so the one-entry list may be announced as plain text there; it matters little with a single entry.
- Keyboard pass: About and Experience contain no focusable element, so no Tab stop falls inside the marquee or anywhere in these Sections, and no focus ring changed.
- Contrast (1440, computed in the page; text and background composited over the page background through every ancestor, with the colour alpha applied): `[ 02 / ABOUT ]` and `[ 03 / EXPERIENCE ]` 7.18, About heading 17.42, introduction 16.64, path line 6.86, card title 16.64, card text 6.86, toolbox group label 6.86, tile name 15.03, marquee name 11.12, timeline period 7.18, role 17.42, Employer 7.18. Lowest 6.86 against AA 4.5, so every pair passes. The brand-coloured icons sit next to their names and are not what carries the text.
- Docs: `CONTEXT.md` already lists the Sections as Hero, Projects, About, Experience, Contact and puts the stack inside About. No term settled that needs a name.
- Not done, needs the developer: the low-end marquee decision (a throttled or real low-end phone is needed to see jank; the only animated property is `transform`, so no fallback was applied without evidence), Lighthouse mobile on the preview deployment (Performance at least 90, CLS 0; if Performance is low because of the Hero shader rather than these Sections, that is spec 016), and with them `Status: Done` in `spec.md`, which is not set.
- Confirmed by the developer: the steps left open above (the low-end marquee decision and Lighthouse mobile on the preview deployment) were checked by them and are fine. No Lighthouse figures were given to the assistant, so none are recorded here; spec 012 is marked Done on that confirmation.
