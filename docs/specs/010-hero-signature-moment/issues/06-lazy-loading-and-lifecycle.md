# 06: Lazy loading and lifecycle

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04, 05

**Status:** ready-for-human

## What to build

The shader must never get in the way of the first paint and must cost nothing when it is not visible. The Hero is a server-rendered shell: headline, subtitle, pill, buttons and Facts strip are in the initial HTML over the static poster (ticket 01). The canvas component comes later.

- **Loading.** The canvas component is loaded with a dynamic import after hydration and after the first paint (for example `requestIdleCallback`, with a timeout fallback, or two animation frames), never in the initial bundle. When it is ready it fades in. Ticket 04 already did the fade (1.6 s after the first frame) and made the poster hidden by default and shown only when the shader is unavailable, so nothing flashes at load; keep that behaviour when the canvas moves to a lazy chunk, and make sure that while the chunk is still loading the poster stays hidden (a plain dark first paint) and appears only if the import fails.
- **Size.** The shader chunk adds no more than about 35 KB gzip to the page and loads after the first paint. The number is measured from the production build and recorded.
- **Pause when not visible.** The render loop stops when the Hero is out of the viewport (`IntersectionObserver`) and when the tab is hidden (`visibilitychange`), and resumes on return. If the "is this element in view" logic is generic, it goes into a hook in `apps/web/components/motion/` and is not written inside the Hero.
- **Resize.** Resize is debounced.
- **Cleanup.** On unmount the loop is cancelled, listeners and observers are removed, the WebGL context is released (`WEBGL_lose_context`) and the canvas is removed. Navigating to a Case study and back leaves exactly one canvas and no leaked context.
- A small dev-only frame counter or the performance panel is used to prove the loop really stops; do not leave debugging code in the repository.

## Acceptance criteria

- [x] The shader code is absent from the initial JavaScript of the home page and is requested after the first paint (network panel)
- [x] The canvas fades in after its first frame; no poster gradient is visible at load unless the shader is unavailable
- [x] The chunk's gzip size is measured from the production build and recorded (about 35 KB or less)
- [x] Scrolling the Hero out of view stops the render loop and scrolling back resumes it (proved with a frame counter or the performance panel)
- [x] Switching tabs pauses the loop and returning resumes it
- [x] Navigating to a Case study and back leaves one canvas and no leaked WebGL context
- [x] Resizing the window does not rebuild the renderer on every event
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `lib/after-first-paint.ts` (new): `afterFirstPaint(callback)` waits for the browser's own `first-contentful-paint` entry (a `PerformanceObserver` on `paint` with `buffered`, or the entry if it already exists), then runs the callback in `requestIdleCallback` (timeout 1.5 s, with a 100 ms `setTimeout` where it does not exist). If the paint entry never comes it still fires after 3 s. It returns a cancel function. A first version waited for two animation frames and it ran before the paint was really done (the chunk was requested 146 ms before FCP in a production run), so it was replaced.
- `hero.tsx`: no static import of `hero-shader` any more (only a type import, erased at build). An effect calls `afterFirstPaint`, which runs `import("./hero-shader")`; on success the component is stored in state and rendered, on failure `shader` becomes `unavailable` so the poster appears. The poster stays hidden while the chunk is loading.
- `components/motion/use-in-view.ts` and `use-page-visible.ts` (new, generic hooks): `useInView(ref)` wraps an `IntersectionObserver`, `usePageVisible()` follows `visibilitychange` through `useSyncExternalStore`.
- `hero-shader.tsx`: the render loop is now started and stopped from outside through `setActive(run)`, driven by `inView && pageVisible`; it is not started by the setup effect itself. Stopping cancels the frame, and the shader time is accumulated frame by frame (`seconds += delta`), so after a pause the aurora continues where it was instead of jumping forward. `ResizeObserver` is debounced by 150 ms (`RESIZE_DEBOUNCE_MS`); the first size is applied at once. Cleanup clears the timer, the observer, the loop, the listeners, releases the context and removes the canvas, as before.

### Verification

Headless Chrome (software WebGL, so about 35 frames per second here, which is enough to count) against the production build and the dev server, with `drawArrays` counted in the page:

| Check | Result |
|---|---|
| Frames per second with the Hero in view | 35 to 37 |
| Hero scrolled out of view (page bottom) | 0 |
| Scrolled back to the top | 36 to 37 |
| Tab hidden (`document.hidden` forced true, `visibilitychange` fired) | 0 |
| Tab visible again | 35 to 38 |
| `gl.viewport` calls during 20 window resizes in 300 ms | 1 |
| Case study and back (production) | canvases 1, then 0, then 1; `WEBGL_lose_context` called once on leaving, no leaked context |
| Console and uncaught errors | none (only the local 404 of the Vercel analytics script, which exists without this ticket) |

- Chunk size and place: the chunk holding `ogl` and the shader is `3epasbegorudo.js`, 51.0 KB raw and **15.2 KB gzip** (the limit was about 35 KB). It is not among the 11 scripts in the home page HTML, which total 250.9 KB gzip. In three production runs it was requested 105, 52 and 48 ms after the first contentful paint.
- Poster: at load it is hidden (`opacity: 0`) in both the normal run and a run with the chunk request aborted; three seconds later it is still hidden when the shader runs, and fully visible (`opacity: 1`) with no canvas and no uncaught error when the chunk is blocked.
- In the in-app browser pane the page reported `document.hidden` as true for the whole session (the app window was not in front), which paused the loop exactly as designed, so the frame counts above come from headless Chrome and not from the pane.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
