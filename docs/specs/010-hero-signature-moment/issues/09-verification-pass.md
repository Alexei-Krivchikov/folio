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

- [x] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [x] Degradation pass done; no console errors in any of the three cases
- [x] Lifecycle pass done; no leaked canvas or context
- [x] Keyboard pass done; focus rings visible over the shader; the canvas is not a tab stop
- [x] Contrast table written under Comments; every pair is AA
- [ ] A real Android phone was tried and the result recorded (developer: see the instructions under Comments)
- [x] Lighthouse numbers recorded under Comments (not gating)
- [x] `CONTEXT.md` is up to date
- [ ] Spec 010 is marked Done
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Browser pass (production build, headless Chrome with real timing)

| Viewport | Name font size | Overflow / clipping | Status pill | Subtitle lines | Facts strip | Hero height |
|---|---|---|---|---|---|---|
| 320x640 | 44.6 px | none | one line | 2 | 2 x 2 | 840 (taller than the screen, scrolls) |
| 375x812 | 53.6 px | none | one line | 2 | 2 x 2 | 812 |
| 768x1024 | 118 px | none | one line | 1 | one row of 4 | 1024 |
| 1024x768 | 128 px | none | one line | 1 | one row of 4 | 823 |
| 1440x900 | 128 px | none | one line | 1 | one row of 4 | 900 |
| 1920x1080 | 128 px | none | one line | 1 | one row of 4 | 1080 |

- No horizontal scrollbar at any width, no clipped text, one canvas at every width, no console or page errors.
- "Let's Talk" and "View Projects" reach `#contact` and `#projects`; `#projects` lands at 88 px from the top at 375 and 1440 px, below where the Header pill would be (Contact is the last Section, so it lands where the page ends).
- Full-size screenshots at 1440x900 and 375x812 were looked at: the headline, the status pill, the facts strip and the buttons sit on the aurora and stay readable.

### Degradation pass

Run in ticket 07 on the production build with the final code of the shader; nothing in the Hero changed after it except the Header decision (no code change). All of these show the poster (or the page without the shader) with no console errors: reduced motion on (also live toggling), WebGL blocked, forced shader compile failure, lost context, blocked shader chunk, 2 and 3 CPU cores, about 10 fps animation frames. 4 cores and 30 or 60 fps keep the shader.

### Lifecycle pass (final production build, run again here)

| Check | Result |
|---|---|
| Frames per second with the Hero in view | 30 |
| Hero scrolled out of view | 0 |
| Scrolled back | 34 |
| Tab hidden / visible again | 0 / 33 |
| `gl.viewport` calls in 20 resizes | 1 |
| Case study and back | canvases 1, 0, 1 (context released each time) |
| Shader chunk request | 129 ms after the first contentful paint |
| Errors | none |

### Keyboard pass

- Tab order on the home page: "Let's Talk", "View Projects", then on to the first Project card, the second, the third, and the Contact links. The Header is `inert` while the Hero is on screen, so it is correctly skipped. The canvas was never focused in any run.
- Focus indicators over the shader: the two Hero buttons use the Button ring (accent ring with a background-coloured offset, as measured in spec 009), the Project cards use a solid 2 px `rgb(255, 107, 61)` outline.

### Contrast (worst case: the aurora at its cap, computed)

| Pair | Narrow screens (cap 0.50 / 0.38) | Wide screens (cap 0.30 / 0.22) |
|---|---|---|
| Foreground text (name, values, outline button, pill) on the aurora | 7.15:1 | 11.28:1 (9.86:1 near the bright top right corner) |
| Secondary text (`foreground` at 80%: subtitle, facts labels and note) on the aurora | 5.26:1 | 7.83:1 |
| Status pill text on its 5% surface over the aurora | 6.33:1 | 9.81:1 |
| Dark text on the default button's gradient | 11.16:1 at the amber end, 5.64:1 at the red end (spec 009) | |

Every pair is AA. The formulas and the extra checks over the real text rectangles are in tickets 01 and 04.

### Lighthouse (local production build, mobile, simulated slow 4G, 3 runs; not gating)

| Run | Performance | LCP (simulated) | LCP (observed) | CLS | TBT |
|---|---|---|---|---|---|
| 1 | 86 | 3.8 s | 174 ms | 0 | 200 ms |
| 2 | 88 | 3.5 s | 129 ms | 0 | 170 ms |
| 3 | 89 | 3.5 s | 164 ms | 0 | 150 ms |

- For comparison, spec 009 ended at 93 and 3.3 s (local), so the shader chunk and its start cost about 4 to 7 points and about 0.2 to 0.5 s of simulated LCP, and add the 150 to 200 ms of blocking time. The chunk is 15.2 KB gzip, loads after the first contentful paint, and the observed LCP is about 130 to 170 ms.
- The LCP element is a headline line. The simulated LCP and the Performance score are the work of spec 016, as decided; nothing here blocks closing this spec.
- This is a local run. The preview deployment would need the branch pushed (it is behind `origin/dev`) and the deployment protection bypass.

### Documentation

`CONTEXT.md` got one new term, **Poster** (the static gradient behind the Hero's shader, which shows only when the shader cannot run). **Signature moment** and **Facts strip** were already defined there.

### For the developer: the real Android phone

This is the one step left. Please open the site on a mid-range Android phone and look at the Hero:

1. Reachable without a push: run `pnpm --filter @folio/web dev` and open the "Network" address that Next prints (a `192.168...` or similar address) in Chrome on the phone, on the same Wi-Fi. Production-like numbers need the Vercel preview, so pushing `dev` and opening the preview URL (log in to Vercel on the phone) is better.
2. Check: the aurora moves smoothly (no stutter), the headline fits and the status pill stays on one line, the Facts strip wraps two by two, nothing is cut off, the buttons work, and it feels fine while scrolling away and back.
3. Tell me the phone model and what you saw. If it stutters, the first things to try are lowering `MAX_DPR` (1.5 now) or the number of noise octaves (4 in `fbm`), and this ticket records that. The shader already switches itself off below 20 frames per second, in which case you will see the static poster.
