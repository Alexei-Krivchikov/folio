# 03: Intro choreography

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01, 02

**Status:** ready-for-agent

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

- [ ] The headline lines, pill, subtitle, buttons and Facts strip enter in the described order at 1440px and 375px
- [ ] The buttons can be clicked and focused while the sequence is still playing
- [ ] The headline is read as one heading (`h1` text unchanged in the accessibility tree)
- [ ] With reduced motion on, the final state is there at once and nothing moves
- [ ] The sequence length is recorded and the developer is happy with how it feels
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
