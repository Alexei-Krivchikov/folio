# 07: Degradation paths

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 06

**Status:** ready-for-agent

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

- [ ] With reduced motion on, the Hero shows the static poster and the shader never starts; toggling the OS setting live switches it
- [ ] With WebGL disabled in the browser, the Hero shows the poster with the full composition and no console errors
- [ ] With the shader chunk blocked in the network panel, the Hero shows the poster and the page is otherwise complete, with no uncaught errors
- [ ] A shader compile error (forced temporarily to test) falls back to the poster
- [ ] A lost context (forced with `WEBGL_lose_context`) returns the poster
- [ ] The weak-device threshold is recorded with the test that picked it
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
