# 01: Reach the Lighthouse targets on the finished site

**Spec:** [016-lighthouse-lcp](../spec.md)

**Blocked by:** specs 010 to 015 closed

**Status:** ready-for-agent

## What to build

Measure the finished site against the Lighthouse targets and fix what misses them. Nothing is changed before specs 010 to 015 are done, because the Hero, the Sections and the payload all change in them (spec 010 rebuilds the Hero and adds the shader chunk, spec 012 adds the marquee, spec 013 the cursor).

What is known from spec 009 (details under Comments):

- The Hero `h1` used to start at `opacity: 0` until hydration. Making it a plain element moved the observed LCP from 1117 ms to 155 ms, but the simulated Lighthouse LCP stayed at about 3.3 s, because Lighthouse counts every request started before the observed LCP as its dependency, which is the whole first load (fonts, about 210 KB of JavaScript, the first cover).
- The target was already missed before spec 009 (2.9 s simulated). The Hero looked flat without its entrance, so that change was reverted.
- A CSS-only entrance (a keyframe that starts on the first frame, with no wait for hydration) was the next idea and was not measured.

The work: run Lighthouse mobile three times on the preview, find what the simulated LCP waits on, and choose between cutting the initial JavaScript (Lenis after first paint, a CSS entrance for the first screen, lighter chunks) and agreeing a target on the observed LCP. The developer decides which target counts.

## Acceptance criteria

- [ ] The headline text is painted on the first frame, not after hydration (observed LCP equals FCP)
- [ ] Lighthouse mobile on a production build: LCP at most 2.5 s, Performance at least 90, CLS 0 (3 runs recorded, with the pre-spec baseline 2.9 s and ticket 08 numbers for comparison)
- [ ] The Hero looks and animates as designed at 1440px and 375px
- [ ] With reduced motion on, nothing moves and nothing is hidden
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Moved here from spec 009

Ticket 09 of spec 009 was deferred and then moved into its own spec at the developer's request: close spec 009, and look at Lighthouse and LCP after specs 010 to 015. Preview numbers recorded in ticket 08 of spec 009: Performance 87 to 89, LCP 3.3 to 3.5 s, CLS 0 (branch `dev` at `647f43a`, mobile, simulated slow 4G, 3 runs). Local baseline before spec 009: 95 and 2.9 s.
