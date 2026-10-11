# 08: Verification pass for the visual foundation

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** ready-for-agent

## What to build

No new code. The cross-cutting checks from the spec, run once on the finished result, with findings fixed or written down.

- Browser pass at 1440px and 375px over every Section and the Case study page: fonts, palette, Grain, Header pill, overlay, anchors landing below the pill.
- Contrast: a table of every text/background pair actually used, with its ratio, in Comments.
- Keyboard pass: tab order unchanged from before the spec, focus rings visible on every interactive element in the new colours.
- Reduced motion with the OS setting on: no new decorative motion, Grain still present, the page behaves as before.
- Lighthouse mobile on the preview deployment: Performance 90 or above, LCP at most 2.5 s on the 4G profile, CLS 0. If the font payload from ticket 01 hurts LCP, trim the font axes or weights first.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [ ] Browser pass done at 1440px and 375px with no old-style leftovers and no horizontal scrollbar
- [ ] Contrast table written under Comments; every pair is AA
- [ ] Keyboard pass done; tab order identical to before
- [ ] Reduced-motion pass done
- [ ] Lighthouse mobile Performance is at least 90, LCP at most 2.5 s, CLS 0 on the preview deployment (scores recorded)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
- [ ] Spec 009 is marked Done

## Comments
