# 07: Verification pass for Contact and finishing touches

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06

**Status:** ready-for-agent

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished work, with findings fixed or written down. Steps that need the preview deployment, a real device or a screen reader are the developer's.

- **Browser pass at 1440px and 375px:** Contact buttons wrap and are at least 44px tall at 375px; the three links open the right targets; no horizontal scroll anywhere; the Footer reads well.
- **Pointer pass:** the spotlight and ring work with a mouse and are absent in touch emulation and under reduced motion; the native cursor is still visible; clicks, selection and focus rings are never blocked by the overlay.
- **Reduced-motion pass:** reduced motion cannot be emulated in the pane or in the real Chrome, so force `matchMedia('(prefers-reduced-motion: reduce)')` to `true` and remount, as in spec 011 and spec 012 ticket 07. Expect: no spotlight, no ring, no magnetic pull, the progress line still follows scroll but without easing. Check the built CSS rules separately where a hook caches its first value.
- **Clock pass:** no hydration warning in the console, no layout shift, correct UTC+3 time, rolls over on the minute.
- **Progress pass:** the line reaches the right end exactly at the bottom of the page, on the home page and on a Case study page.
- **HUD indices pass:** `[ 01 / 04 ]` to `[ 04 / 04 ]` in order; the Active section highlight and anchor scroll are unaffected.
- **Keyboard pass:** Tab order through Contact and Footer, visible focus rings, no focus trap from the global layers.
- **Contrast:** every text/background pair on Contact, Footer and the index labels is AA, including body text under the brightest part of the spotlight; ratios recorded.
- **Keep or cut the cursor effects.** The spec says the spotlight and ring are the most decorative effects of the series and that, if they distract in the browser pass, they are cut here and not tuned later. Look at the page with them on and record the verdict. This is the developer's call; if they decide to cut, remove the component, its export and its mount, and update the spec's wording.
- **Lighthouse mobile on the preview deployment:** Performance at least 90, CLS 0, and no long task from the pointer handlers. If Performance is lower and the cause is the Hero shader and not this work, record that and tell the developer instead of closing quietly; reaching the numbers is also the work of spec 016.
- **Docs:** add a `CONTEXT.md` term only if one settled during the work and is worth a name (for example the cursor effects or the HUD index).
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [ ] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [ ] Pointer pass done
- [ ] Reduced-motion pass done
- [ ] Clock pass done
- [ ] Progress pass done on the home page and a Case study page
- [ ] HUD indices pass done
- [ ] Keyboard pass done
- [ ] Contrast table written under Comments; every pair is AA
- [ ] Keep-or-cut decision on the cursor effects recorded under Comments
- [ ] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [ ] `CONTEXT.md` is up to date
- [ ] Spec 013 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
