# 08: Verification pass for Case study redesign and transitions

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** ready-for-agent

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished work, with findings fixed or written down. Steps that need Safari, Firefox, a real device or the preview deployment are the developer's; list them under Comments if the agent cannot run them.

- **Browser pass at 1440px and 375px** for all three Case studies: header, body, gallery, links, Next project block; no horizontal scroll; no cropped screenshots.
- **Transition pass in Chrome:** card to Case study, Case study to home, and Case study to next Project each morph the cover with no flash and no layout jump; interrupting by clicking again is safe.
- **Fallback pass:** Safari, Firefox and reduced-motion emulation navigate instantly and correctly, console clean. Reduced motion cannot be emulated in the pane, so emulate before load or force `matchMedia` and remount, as in spec 013 ticket 07, and check the built CSS rule separately.
- **Production build:** exercised on the preview deployment, not only `next dev`, because the feature is experimental.
- **Keyboard pass:** Tab order through header, links, body, gallery and the Next block; visible focus rings; transitions do not steal or lose focus.
- **Contrast:** header, meta row, body text, links and the Next block are AA; ratios noted.
- **Lighthouse mobile on a Case study URL:** Performance at least 90, CLS 0. If Performance misses because of work outside this spec, record that and tell the developer; reaching the numbers site-wide is spec 016.
- **Docs:** ADR 0006 still accurate; add a `CONTEXT.md` term only if one settled and is worth a name.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [ ] Browser pass done at 1440px and 375px for all three Case studies
- [ ] Transition pass done in Chrome for all three navigations
- [ ] Fallback pass done (Safari and Firefox by the developer if not available to the agent), console clean
- [ ] Production build checked
- [ ] Keyboard pass done
- [ ] Contrast table written under Comments; every pair is AA
- [ ] Lighthouse mobile numbers recorded under Comments; CLS is 0
- [ ] ADR 0006 and `CONTEXT.md` are up to date
- [ ] Spec 014 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
