# Spec 016 — Lighthouse and LCP

Status: Draft

## Problem Statement

Every spec from 009 to 015 promises Lighthouse mobile Performance of at least 90, LCP of at most 2.5 s and CLS 0. Spec 009 measured the first of them and missed two: the preview scored 87 to 89 with an LCP of 3.3 to 3.5 s, and the build before spec 009 already had an LCP of 2.9 s in the same simulation. Chasing the number while the Hero, the Sections and the payload were still being rebuilt would have meant tuning a moving target, so the work is parked here until the redesign is finished.

## Solution

After specs 010 to 015 are closed, the finished site is measured once on the Vercel preview and the misses are fixed in one place. The first step is to understand what the simulated LCP waits on, because spec 009 showed that the observed LCP can be 155 ms while the simulated one stays at 3.3 s: Lighthouse treats everything requested before the observed LCP as its dependency, so a heavy first load costs LCP even when the headline paints at once.

## Implementation Decisions

- This spec starts only after specs 010 to 015 are Done. The Lighthouse lines in specs 010 to 014 are recorded there as measurements and do not block closing those specs.
- Candidate levers, to be chosen with the numbers in hand: cut the initial JavaScript (Lenis loaded after the first paint, a CSS-only entrance on the first screen so Motion is not needed for it, smaller or deferred chunks), fewer or lighter font files on the first screen, no high-priority image below the fold, the shader chunk kept out of the first load as spec 010 already requires.
- The target that counts, simulated LCP or observed LCP, is the developer's decision, taken with the numbers from the finished site.
- Measuring uses the Vercel preview and the same recipe as spec 009: Lighthouse 12, mobile, simulated slow 4G, three runs, plus the observed and simulated LCP, the LCP element and its phases. The preview sits behind Vercel deployment protection; the measurement uses a Protection Bypass for Automation header, and the secret is never written into the repository.
- Lighthouse CI (spec 015) is the place where the numbers are tracked from then on.

## Testing Decisions

- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

- Lighthouse mobile on the preview, three runs, recorded in the ticket: Performance, simulated and observed LCP, CLS.
- The site is looked at with the browser pane afterwards, so that no performance change removed a designed effect.

## Out of Scope

- Any redesign of a Section; those are specs 010 to 015.
- A hard Lighthouse gate in CI (deferred in spec 015).

## Further Notes

- The history is in ticket 01 and in ticket 08 of spec 009: the preview numbers, the local baseline of 95 and 2.9 s, and the experiments that did not help (preload off for two fonts, no `priority` on the first cover, no Grain).
