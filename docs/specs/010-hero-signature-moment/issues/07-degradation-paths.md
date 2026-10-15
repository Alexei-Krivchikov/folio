# 07: Degradation paths

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 06

**Status:** ready-for-human

## What to build

When the shader cannot or should not run, the Hero keeps the static poster with the full composition, and the page loses nothing but the motion.

The shader does not start (and the poster stays) when any of these holds:

- Reduced motion is on. Toggling the setting while the page is open also stops or starts the shader (use `usePrefersReducedMotion`).
- WebGL2 is not available.
- Creating the context or the renderer throws, or the shader fails to compile or link.
- The device is weak. The first signal is a low `navigator.hardwareConcurrency`; the threshold is chosen by testing and recorded under Comments with what it was tested on.
- The dynamic import of the shader chunk fails (blocked or offline).

If the context is lost at runtime (`webglcontextlost`), the canvas fades out and the poster is what the visitor sees again.

Mechanism already in place from ticket 04: `HeroShader` reports `unavailable` through its `onStatus` callback (today for a missing WebGL2 or a renderer that cannot be created) and the Hero then shows the poster, fading it in; the poster is hidden by default and a `noscript` rule shows it without JavaScript. This ticket extends the list of reasons that report `unavailable` and adds the runtime cases.

No failure may show as an uncaught error in the console or leave a half-drawn canvas over the poster.

## Acceptance criteria

- [x] With reduced motion on, the Hero shows the static poster and the shader never starts; toggling the OS setting live switches it
- [x] With WebGL disabled in the browser, the Hero shows the poster with the full composition and no console errors
- [x] With the shader chunk blocked in the network panel, the Hero shows the poster and the page is otherwise complete, with no uncaught errors
- [x] A shader compile error (forced temporarily to test) falls back to the poster
- [x] A lost context (forced with `WEBGL_lose_context`) returns the poster
- [x] The weak-device threshold is recorded with the test that picked it
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

One rule for everything: the shader component reports `unavailable` through `onStatus`; the Hero then stops rendering it (React runs its cleanup: loop cancelled, observer and listeners removed, context released, canvas removed) and shows the poster.

- **Reduced motion** (`hero.tsx`): the poster is visible when `reduced || shader === "unavailable"`, the shader component is not rendered while `reduced`, and the chunk is not even requested while `reduced` (the load effect returns early). It follows `usePrefersReducedMotion`, so toggling the OS setting while the page is open mounts or unmounts the shader. The poster has `motion-reduce:transition-none`, so under reduced motion it appears without a fade.
- **No WebGL2 / renderer cannot be created** (`hero-shader.tsx`): `supportsWebGL2()` probes with a throwaway canvas (and releases that context) before `ogl` is touched, because `ogl` itself prints a `console.error` when it cannot get a context. A thrown error from `new Renderer` and a context that is not WebGL2 are also caught.
- **Shader compile or link failure**: `ogl` only warns on a bad shader, so the code checks `LINK_STATUS` of the program right after creating it and reports `unavailable` if it failed.
- **Weak device**: two signals.
  1. `navigator.hardwareConcurrency < 4` (`MIN_CORES`) means the shader does not start at all.
  2. A watchdog in the render loop: after 30 warm-up frames it times the next 60 frames and, if the average is below 20 frames per second (`MIN_FPS`), reports `unavailable`. This is the real safety net, because the core count is a poor proxy (many cheap phones report 8 cores).
- **Lost context at runtime**: `webglcontextlost` is handled (`preventDefault`, then `unavailable`); the listener is removed in cleanup before the context is released on purpose, so the deliberate release is not mistaken for a loss.
- **Chunk import fails**: already handled in ticket 06 (the `catch` on the dynamic import reports `unavailable`).

### Weak-device threshold: how it was chosen and what it was tested on

- Real low-end hardware was not available, so the thresholds are chosen from the browser's own behaviour and tested by forcing the signals, and must be confirmed on the real Android phone in ticket 09.
- This machine reports 6 cores in headless Chrome. `MIN_CORES = 4`: forcing 2 and 3 cores gives the poster and no canvas, forcing 4 keeps the shader. The value 4 is a conservative floor (it only excludes dual-core and tri-core devices); slow hardware with more cores is handled by the frame watchdog.
- `MIN_FPS = 20` with the animation frame callback forced to about 10, 30 and 60 frames per second: 10 fps falls back to the poster (after the 30 warm-up and 60 sample frames, so about 9 s at that rate and about 3 s at 30 fps), 30 and 60 fps keep the shader.
- Warm-up exists because the first frames include shader compilation and hydration work and are always slower.
- CPU throttling in the browser (4x, 8x, 16x) did not change the frame rate because the software renderer runs outside the throttled thread, so it was not used as evidence.

### Verification (production build, headless Chrome with software WebGL)

| Scenario | Poster opacity | Canvases | Console and uncaught errors |
|---|---|---|---|
| Normal | 0 | 1 | none |
| Reduced motion on from the start | 1 | 0 (shader chunk not requested) | none |
| Reduced motion switched off while open | 0 | 1 | |
| Reduced motion switched on again | 1 | 0 | |
| WebGL blocked (`getContext` returns null) | 1 | 0 | none |
| Shader compile forced to fail | 1 | 0 | none |
| Context lost on purpose (`loseContext`) | 1 | 0 | none |
| Shader chunk request aborted | 1 | 0 | none |
| 2 and 3 cores | 1 | 0 | none |
| 4 cores | 0 | 1 | none |
| About 10 fps animation frames | 1 | 0 | none |
| About 30 and 60 fps | 0 | 1 | none |

- A real hidden-GPU or real-phone run is left to ticket 09.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
