# 09: Verification pass for the Hero

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07, 08

**Status:** ready-for-human

## What to build

No new features. The cross-cutting checks from the spec, run once on the finished Hero, with findings fixed or written down. Steps that need a real device are the developer's.

- Browser pass at 1440px and 375px: the name fits, no horizontal scroll, the status pill stays on one line, the Facts strip wraps sensibly, the calls to action reach their anchors.
- Degradation pass: reduced motion on, WebGL disabled, shader chunk blocked; each shows the poster with the full composition and no console errors.
- Lifecycle pass: scrolling out of the Hero stops the loop, switching tabs pauses it, a round trip to a Case study leaves no leaked canvas or context.
- Keyboard pass: tab order in the Hero is the calls to action, then on to the next Section; the canvas is never a tab stop; focus rings are visible over the shader.
- Contrast: a table of every text/background pair over the poster and over the brightest part of the shader, each AA.
- A real mid-range Android phone is opened at least once. A stutter there is a bug in this spec: record the device, the frame rate it feels like, and what was changed (resolution cap, octaves) if anything.
- Lighthouse mobile on the preview deployment is run and its numbers (Performance, simulated and observed LCP, CLS, the shader chunk size) are recorded. They do not block closing this spec; reaching the targets is the work of spec 016.
- `CONTEXT.md`: add the term for the static gradient under the shader if it settled during the work (the spec calls it the poster). **Signature moment** and **Facts strip** are already defined there.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [ ] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [ ] Degradation pass done; no console errors in any of the three cases
- [ ] Lifecycle pass done; no leaked canvas or context
- [ ] Keyboard pass done; focus rings visible over the shader; the canvas is not a tab stop
- [ ] Contrast table written under Comments; every pair is AA
- [ ] A real Android phone was tried and the result recorded
- [ ] Lighthouse numbers recorded under Comments (not gating)
- [ ] `CONTEXT.md` is up to date
- [ ] Spec 010 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
