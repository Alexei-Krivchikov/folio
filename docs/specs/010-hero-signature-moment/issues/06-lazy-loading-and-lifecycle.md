# 06: Lazy loading and lifecycle

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04, 05

**Status:** ready-for-agent

## What to build

The shader must never get in the way of the first paint and must cost nothing when it is not visible. The Hero is a server-rendered shell: headline, subtitle, pill, buttons and Facts strip are in the initial HTML over the static poster (ticket 01). The canvas component comes later.

- **Loading.** The canvas component is loaded with a dynamic import after hydration and after the first paint (for example `requestIdleCallback`, with a timeout fallback, or two animation frames), never in the initial bundle. When it is ready it fades in. Ticket 04 already did the fade (1.6 s after the first frame) and made the poster hidden by default and shown only when the shader is unavailable, so nothing flashes at load; keep that behaviour when the canvas moves to a lazy chunk, and make sure that while the chunk is still loading the poster stays hidden (a plain dark first paint) and appears only if the import fails.
- **Size.** The shader chunk adds no more than about 35 KB gzip to the page and loads after the first paint. The number is measured from the production build and recorded.
- **Pause when not visible.** The render loop stops when the Hero is out of the viewport (`IntersectionObserver`) and when the tab is hidden (`visibilitychange`), and resumes on return. If the "is this element in view" logic is generic, it goes into a hook in `apps/web/components/motion/` and is not written inside the Hero.
- **Resize.** Resize is debounced.
- **Cleanup.** On unmount the loop is cancelled, listeners and observers are removed, the WebGL context is released (`WEBGL_lose_context`) and the canvas is removed. Navigating to a Case study and back leaves exactly one canvas and no leaked context.
- A small dev-only frame counter or the performance panel is used to prove the loop really stops; do not leave debugging code in the repository.

## Acceptance criteria

- [ ] The shader code is absent from the initial JavaScript of the home page and is requested after the first paint (network panel)
- [ ] The canvas fades in after its first frame; no poster gradient is visible at load unless the shader is unavailable
- [ ] The chunk's gzip size is measured from the production build and recorded (about 35 KB or less)
- [ ] Scrolling the Hero out of view stops the render loop and scrolling back resumes it (proved with a frame counter or the performance panel)
- [ ] Switching tabs pauses the loop and returning resumes it
- [ ] Navigating to a Case study and back leaves one canvas and no leaked WebGL context
- [ ] Resizing the window does not rebuild the renderer on every event
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
