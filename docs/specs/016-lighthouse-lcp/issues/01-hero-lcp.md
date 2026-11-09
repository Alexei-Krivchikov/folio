# 01: Reach the Lighthouse targets on the finished site

**Spec:** [016-lighthouse-lcp](../spec.md)

**Blocked by:** specs 010 to 015 closed

**Status:** wontfix

## What to build

Measure the finished site against the Lighthouse targets and fix what misses them. Nothing is changed before specs 010 to 015 are done, because the Hero, the Sections and the payload all change in them (spec 010 rebuilds the Hero and adds the shader chunk, spec 012 adds the marquee, spec 013 the cursor).

What is known from spec 009 (details under Comments):

- The Hero `h1` used to start at `opacity: 0` until hydration. Making it a plain element moved the observed LCP from 1117 ms to 155 ms, but the simulated Lighthouse LCP stayed at about 3.3 s, because Lighthouse counts every request started before the observed LCP as its dependency, which is the whole first load (fonts, about 210 KB of JavaScript, the first cover).
- The target was already missed before spec 009 (2.9 s simulated). The Hero looked flat without its entrance, so that change was reverted.
- A CSS-only entrance (a keyframe that starts on the first frame, with no wait for hydration) was the next idea and was not measured.

The work: run Lighthouse mobile three times on the preview, find what the simulated LCP waits on, and choose between cutting the initial JavaScript (Lenis after first paint, a CSS entrance for the first screen, lighter chunks) and agreeing a target on the observed LCP. The developer decides which target counts.

## Acceptance criteria

- [x] The headline text is painted on the first frame, not after hydration (observed LCP equals FCP). Not changed: the CSS entrance was tried and reverted, see Closed without code changes
- [x] Lighthouse mobile on a production build, 3 runs recorded with the baseline for comparison. The targets are not met (local 85 to 87 and 3.9 to 4.0 s, live site 89 and 3.4 s, CLS 0); closed by the developer's decision
- [x] The Hero looks and animates as designed at 1440px and 375px. No code change, the Hero is as it was
- [x] With reduced motion on, nothing moves and nothing is hidden. No code change, the behaviour is as it was
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass. No code change, `apps/web` is identical to `dev`

## Comments

### Moved here from spec 009

Ticket 09 of spec 009 was deferred and then moved into its own spec at the developer's request: close spec 009, and look at Lighthouse and LCP after specs 010 to 015. Preview numbers recorded in ticket 08 of spec 009: Performance 87 to 89, LCP 3.3 to 3.5 s, CLS 0 (branch `dev` at `647f43a`, mobile, simulated slow 4G, 3 runs). Local baseline before spec 009: 95 and 2.9 s.

### Closed without code changes

Decision by the developer: the remaining gap is not worth more work, and every change tried is reverted. The live site at `alexei-krivchikov.vercel.app` measured 89 on mobile (LCP 3.4 s, FCP 1.3 s, TBT 30 ms, CLS 0) in the developer's own run, so the target of 90 is missed by one point.

Local measurements on `dev` at `af8c241` (production build, `@lhci/cli` 0.15, mobile, simulated slow 4G, 3 runs; the local numbers run about 2 to 3 points below the live site, mostly in TBT):

| State | `/` Performance | `/` LCP | `/projects/folio` Performance | `/projects/folio` LCP |
|---|---|---|---|---|
| Baseline | 85, 86, 87 | 3.9 to 4.0 s | 93 | 3.24 s |
| Lenis loaded after first paint | 85, 88, 85 | 3.8 to 4.1 s | 93, 95, 95 | 3.0 to 3.2 s |
| Lenis plus Hero entrance in CSS (no Motion in Hero) | 88, 88, 88 | 3.6 to 3.8 s | 92 | 3.4 s |
| Lenis plus CSS Hero plus `LazyMotion` | 88, 88, 88 | 3.6 to 3.8 s | 92 | 3.4 s |

What was learned:

- On `/` the LCP element is the Hero headline span. Its observed LCP is tiny (render delay about 210 ms) while the simulated LCP is 3.9 s, 88% of it render delay: every request started before the LCP (about 440 KB: HTML, three fonts, CSS, ten script chunks, one cover) is counted as its dependency.
- The shader is already out of the first load (a 16 KB chunk requested after first paint). A `priority` image is only on the Case study page, not on `/`.
- Deferring Lenis changed nothing measurable on `/`.
- Replacing the Hero entrance with CSS keyframes gave about +2 to 3 points and about -0.3 s LCP. Motion stays in the first load because About, Experience, Contact, the project grid and `packages/ui` (`tilt-card`) use it, so first-load JS did not shrink (268 KB).
- `LazyMotion` gave nothing: `useScroll` and `useTransform` in Experience keep the main Motion chunk in the first load (about 0.95 s of script time). It also threw in `strict` mode because `packages/ui` renders `motion.div` directly.
- A CSS animation that starts from `opacity: 0` makes Chrome report no LCP at all (Lighthouse `NO_LCP`, Performance 0), because the compositor-driven fade never repaints the text as visible. Starting from `opacity: 0.01` registers the LCP. Worth knowing if a CSS entrance is tried again.

If this is picked up again, the only lever that changes the numbers is making Motion leave the first load for real (the Experience scroll-linked progress, the `tilt-card` in `packages/ui`, and the project grid would all need to stop importing it eagerly), which is a rewrite, not a tweak.
