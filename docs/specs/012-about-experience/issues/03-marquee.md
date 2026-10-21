# 03: Marquee

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A generic `Marquee` in `packages/ui`: a full-width strip of items scrolling slowly and continuously. Nothing uses it yet; ticket 05 fills it with the stack's logos.

- **API.** `children` (the items), `className`, and a `speed` or `duration` prop (seconds for one full loop, default chosen by looking: slow enough to read a logo name, around 40 to 60 s for the stack). The component knows nothing about logos.
- **Seamless loop.** The track is rendered twice inside one flex container and the animation moves it by exactly the width of one copy (`translateX(0)` to `translateX(-50%)`). Spacing between items is padding inside each copy, not `gap` on the container, otherwise the join is a gap wide and the loop visibly jumps. Define the keyframes in `packages/ui/src/tailwind.css` (the package's own stylesheet), not in `apps/web`.
- **Edges.** The strip fades out at both ends with a CSS mask, so items do not pop in and out at the viewport edge.
- **Pause.** The animation pauses on hover and when anything inside has focus (`animation-play-state: paused` on `:hover` and `:focus-within`).
- **Assistive technology.** The second copy is `aria-hidden` and `inert`, so names are read once and its contents are not in the tab order. The first copy is a real list (`ul`/`li`) so the reading order is the toolbox order.
- **Reduced motion.** No animation, no second copy, no mask: the first copy wraps into a static list. Do this in CSS with `motion-reduce:` utilities, not with a JS hook, so there is no flash of moving content before hydration.
- **Cost.** Only `transform` is animated, with `will-change: transform` on the track. Wrapper `overflow: hidden`, so the strip never causes a horizontal scrollbar.
- Export `Marquee` and its props type from `packages/ui/src/index.ts`.

## Acceptance criteria

- [x] `Marquee` is exported from `@folio/ui`
- [x] A test strip loops with no visible jump at the seam, watched for at least two full loops
- [x] It pauses on hover and while an inner element has focus, and resumes after
- [x] The accessibility tree shows each item once; the duplicate copy is `aria-hidden` and `inert`
- [x] With reduced motion on, the strip is a static wrapped list with no animation and no duplicate copy in the layout
- [x] At 375px there is no horizontal scroll caused by the strip
- [x] Only `transform` is animated (Performance panel shows no layout work during the loop)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Reduced-motion and cost checks were run in Chrome with the `prefers-reduced-motion` rules from the built CSS applied unconditionally, since the media feature cannot be toggled from the automation: animation none, second copy `display: none`, mask none, first copy `flex-wrap: wrap`, no horizontal scroll. The running animation has one animated property (`transform`), CLS 0, and the loop advances. No Performance panel trace was taken.
