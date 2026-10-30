# 08: Verification pass for Case study redesign and transitions

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** claimed

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished work, with findings fixed or written down. Steps that need Safari, Firefox, a real device or the preview deployment are the developer's; list them under Comments if the agent cannot run them.

- **Browser pass at 1440px and 375px** for all three Case studies: header, body, gallery, links, Next project block; no horizontal scroll; no cropped screenshots.
- **Transition pass in Chrome:** card to Case study, Case study to home, and Case study to next Project each morph the cover with no flash and no layout jump; interrupting by clicking again is safe.
- **Fallback pass:** Safari, Firefox and reduced-motion emulation navigate instantly and correctly, console clean. Reduced motion cannot be emulated in the pane, so emulate before load or force `matchMedia` and remount, as in spec 013 ticket 07, and check the built CSS rule separately.
- **Production build:** exercised on the preview deployment, not only `next dev`, because the feature is canary.
- **Keyboard pass:** Tab order through header, links, body, gallery and the Next block; visible focus rings; transitions do not steal or lose focus.
- **Contrast:** header, meta row, body text, links and the Next block are AA; ratios noted.
- **Lighthouse mobile on a Case study URL:** Performance at least 90, CLS 0. If Performance misses because of work outside this spec, record that and tell the developer; reaching the numbers site-wide is spec 016.
- **Docs:** ADR 0006 still accurate; add a `CONTEXT.md` term only if one settled and is worth a name.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [x] Browser pass done at 1440px and 375px for all three Case studies
- [x] Transition pass done in Chrome for all three navigations
- [ ] Fallback pass done (Safari and Firefox by the developer if not available to the agent), console clean
- [ ] Production build checked
- [x] Keyboard pass done
- [x] Contrast table written under Comments; every pair is AA
- [x] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [x] ADR 0006 and `CONTEXT.md` are up to date
- [ ] Spec 014 is marked Done
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Run on a local production build (`next build` + `next start`, port 3006), Browser pane plus headless Lighthouse.

- **Browser pass, 1440px and 375px, DominoCRM / Book Tracker / Folio.** No horizontal scroll (`scrollWidth == clientWidth` on all six). Every image decodes; each gallery image renders at its natural aspect ratio (1.78 natural, 1.78 to 1.79 rendered), no cropping. Header buttons are 40px tall at 1440 and 44px at 375. Links open the expected hrefs.
- **Transition pass.** Done in ticket 07 on the same build: card to Case study, Back link, Next project for all three including the wrap, and browser Back (plain swap, no errors).
- **Keyboard pass.** Tab order is Back, header links, Next project block, then wraps; the body and gallery hold no focusable elements. Rings seen with real Tab presses: Website button 4px Ember box-shadow, Next block 2px Ember outline. **Finding, fixed:** the Back link showed only the browser default ring; it now has the same Ember outline as other links. Navigation by keyboard is a normal Next link click, focus handling is the framework's.
- **Contrast** (against background `#0b0908`):

  | Pair | Colour | Ratio |
  |---|---|---|
  | Meta row, Back link, Next label and number, body text (`--muted`) | `#a39a91` | 7.18 |
  | Body strong, Next project name (`--foreground`) | `#f5efe9` | 17.42 |
  | Ember arrow and accent links | `#ff6b3d` | 7.02 |
  | Button text `#0b0908` on gradient `#ffb347` to `#ff3d2e` (worst end) | | 5.6 |

  All AA. Script scan of every text element found nothing below 4.5.
- **Lighthouse mobile (headless Chrome, local build).** Performance 100, Accessibility 100, CLS 0, LCP 0.8 s on all three Case studies; TBT 20 ms on DominoCRM.
- **Docs.** ADR 0006 gets a line about the three cover wrappers and the card entrance change. `CONTEXT.md` needs no new term.
- `biome`, `tsc` and `turbo build` pass.

**Left for the developer, so Status stays open and spec 014 is not marked Done:**
- [ ] Safari and Firefox: navigations are instant and correct, console clean.
- [ ] Reduced motion: not emulable in the pane. The CSS rule in `globals.css` is in place; confirm with real OS reduced-motion, or force `matchMedia` and remount.
- [ ] The same checks on the Vercel preview deployment (canary feature).
