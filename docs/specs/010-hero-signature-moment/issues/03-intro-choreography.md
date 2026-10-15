# 03: Intro choreography

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01, 02

**Status:** ready-for-human

## What to build

A short, non-blocking entrance for the new Hero, built on Motion and the existing helpers in `apps/web/components/motion/variants.ts`. Nothing waits for a preloader or for the shader chunk.

- The two headline lines rise and fade in, one after the other (each line is its own element inside the `h1`; the `h1` stays one heading with its text intact for assistive technology).
- The status pill, the subtitle, the calls to action and the Facts strip follow in a stagger.
- Content is visible and clickable from the first frame of the sequence: no `pointer-events: none` during the animation and no element is created by it.
- With reduced motion on, the final state shows immediately, through the existing helpers (the static variants).
- Total length of the sequence is chosen by looking and written under Comments (the target is about one second; it must not feel like waiting).
- If the sequence needs a new variant (for example a line reveal), it is added to `components/motion/variants.ts`, not written inside `hero.tsx`.

How the entrance affects the Lighthouse LCP is measured in spec 016 and is not tuned here, but the headline must stay in the initial HTML (ticket 01).

## Acceptance criteria

- [x] The headline lines, pill, subtitle, buttons and Facts strip enter in the described order at 1440px and 375px
- [x] The buttons can be clicked and focused while the sequence is still playing
- [x] The headline is read as one heading (`h1` text unchanged in the accessibility tree)
- [x] With reduced motion on, the final state is there at once and nothing moves
- [x] The sequence length is recorded and the developer is happy with how it feels
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `variants.ts`: `fadeUpVariants` takes an optional `delay` (default 0, put into the `show` transition). The reduced-motion branch still returns the static variants, so the delay is ignored there. No other variant was needed.
- `hero.tsx`: the Hero container is a plain `staggerVariants` (no stagger of its own) that only passes `hidden`/`show` down. Every part has its own variant and delay, so the order does not depend on DOM order (the pill sits above the headline but enters after it). After the first review ("looks fine but uneven") all parts were given the same rise, the same duration and an equal step, and a softer curve; the constants are `STEP`, `RISE`, `DURATION` and `EASE` at the top of `hero.tsx`:

| Part | Delay (step x index) |
|---|---|
| Headline line 1 (`ALEXEI`) | 0 |
| Headline line 2 (`KRIVCHIKOV`) | 0.1 s (the `h1` staggers its lines by `STEP`) |
| Status pill | 0.2 s |
| Subtitle | 0.3 s |
| Calls to action | 0.4 s |
| Facts strip | 0.5 s |

  Every part rises 28px over 0.7 s with the curve `cubic-bezier(0.22, 1, 0.36, 1)` (a long, soft landing instead of Motion's `easeOut`). The first thing starts at 0, the last settles at 1.2 s. Before the change the name rose 48px over 0.8 s and the rest 20px over 0.6 s with irregular delays (0, 0.1, 0.35, 0.45, 0.55, 0.65), which read as uneven.
- `variants.ts`: `fadeUpVariants` takes optional `delay` and `ease` (defaults 0 and `easeOut`, so every other Section is unchanged). The reduced-motion branch still returns the static variants and ignores both.
- The `h1` is a `motion.h1` whose two lines are `motion.span` blocks. Its text content is "Alexei Krivchikov" (the first span ends with a space), the element is still one `h1`, and the caps are CSS.
- Only opacity and `transform` are animated. Nothing gets `pointer-events: none`, and no element is created by the animation: all of it is in the initial HTML.

### Verification

- At the start of the sequence (all four headline and pill elements still at opacity 0) the "Let's Talk" button is already the element under its own centre point, so it is clickable and focusable while the sequence plays. After the sequence all 16 Hero elements are fully visible and the page has no horizontal scroll.
- Reduced motion: `usePrefersReducedMotion` makes every Hero variant the static one (`opacity: 1`, no offset, zero duration), the pulse stops. This was checked by reading the code path and by headless Chrome with `--force-prefers-reduced-motion` (the pulse class is gone); headless virtual time does not run Motion's frames, so the final state under that flag was not observed on screen.
- Not measured: a frame-by-frame timeline. The browser pane does not start my sampling script before the page's animation begins, and the animation has already finished when it runs. The delays above are the configured values.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.

### For the developer

The developer looked at it after the smoothing pass and said it is better now ("сейчас как будто получше"). Original request:
Reload the page and look at it: the order is the two name lines rising one after another, then the pill, the subtitle, the buttons and the facts strip. Tell me if the pace feels too slow or too fast (`STEP`), the rise too big or too small (`RISE`), or the landing too soft (`EASE`). The Lighthouse effect of this entrance is for spec 016.
