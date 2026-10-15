# 09: Hero LCP: render the h1 without waiting for hydration

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

The Hero `h1` is the Largest Contentful Paint element, and it starts at `opacity: 0` (inline style from Motion's `initial="hidden"`) until the page hydrates and the stagger reaches it. On mobile Lighthouse this is almost all of the LCP: 2.5 s of render delay before spec 009, 3.0 s after it (ticket 08 has the numbers). The target from the spec is LCP at most 2.5 s on the 4G profile and the baseline was already above it.

It also breaks the shared rule of specs 009 to 015: text must be in the DOM and readable from the first render, never created or hidden by an animation.

- The `h1` is visible in the server-rendered HTML and paints on first render. Its copy, size and place stay as they are.
- The entrance animation of the rest of the Hero (status pill, label, paragraph, buttons) keeps working; whether the `h1` still gets a visual entrance that does not hide it (for example a transform-only or CSS-only effect that starts visible) is up to the implementation.
- With reduced motion on, behaviour is as before (nothing moves, nothing is hidden).
- No change to the Hero layout, the Ember tokens or the other Sections.

Spec 010 rebuilds the Hero (shader and kinetic type). If it is started first, this ticket is folded into it and its criteria become 010's; otherwise 010 starts from the result of this one.

## Acceptance criteria

- [ ] `curl` of the production HTML shows the `h1` without `opacity:0` in its inline style
- [ ] Lighthouse mobile on a production build: LCP at most 2.5 s, Performance at least 90, CLS 0 (3 runs recorded, with the pre-spec baseline 2.9 s and ticket 08 numbers for comparison)
- [ ] Hero looks the same at 1440px and 375px; the entrance of the other elements is unchanged
- [ ] With reduced motion on, nothing moves and nothing is hidden
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
