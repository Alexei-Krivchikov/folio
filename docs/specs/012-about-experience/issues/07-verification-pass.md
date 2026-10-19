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

- [ ] Navigation pass done; no link or code path references `#stack`
- [ ] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [ ] Reduced-motion pass done
- [ ] Screen-reader (or accessibility tree) pass done and recorded
- [ ] Keyboard pass done
- [ ] Contrast table written under Comments; every pair is AA
- [ ] Low-end marquee decision recorded
- [ ] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [ ] `CONTEXT.md` is up to date
- [ ] Spec 012 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
