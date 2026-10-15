# 04: Aurora shader (ogl)

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

The first real-time version of the Signature moment: a full-viewport fragment shader that renders a slowly moving Ember aurora, drawn through `ogl`, behind the Hero content. Pointer and touch input are ticket 05; lazy loading and the lifecycle rules are ticket 06; degradation is ticket 07. Here the scene just has to run and look right.

- Add the dependency: `pnpm --filter @folio/web add ogl`. ADR 0002 stands unchanged (GSAP and R3F stay reserved for the Lab).
- New component `apps/web/components/hero/hero-shader.tsx` (client) and the GLSL strings in a separate module next to it. The component renders one `canvas` over the poster, `aria-hidden`, not focusable, `pointer-events: none`, filling the Hero.
- The scene is one full-screen triangle through `ogl`: `Renderer`, `Triangle`, `Program`, `Mesh`. The creative work is the GLSL: layered noise (a few octaves of fractal noise, warped by itself) mixed into the Ember palette. The colours come from the tokens (`--background`, `--accent-from`, `--accent-to`) read once at mount and passed as uniforms; do not hard-code a second palette.
- Uniforms for now: `uTime` and `uResolution`. The motion is slow and calm: no flicker, nothing that distracts from the headline.
- Device pixel ratio is capped at 1.5. The canvas size follows the Hero (no debounce yet, ticket 06 adds it).
- For now the component is mounted directly in the Hero; it covers the poster once it renders.
- The brightness of the aurora is capped so that the headline, subtitle, pill, buttons and Facts strip keep AA contrast over the brightest area.

**The developer is new to shaders and wants to read and change this code.** The repository keeps production code free of comments, so the explanation lives under Comments in this ticket, written as a walkthrough: what a fragment shader is and what runs per pixel, what each uniform is, how the noise and the warping build the aurora, how the colour mix works, how the render loop and `ogl`'s objects map to WebGL concepts, and a short "how to change" list (colours, speed, scale, intensity).

The look is subjective, so the agent first renders two or three variants (for example more or fewer blobs, faster or slower, brighter or calmer) in the browser, and waits for the developer to pick one before finishing.

## Acceptance criteria

- [ ] A canvas with the aurora runs behind the Hero content at 1440px and 375px at a smooth frame rate on the developer's machine
- [ ] The colours come from the Ember tokens, not from a second hard-coded palette
- [ ] The developer has seen the variants and chosen one; the choice and the final parameters are under Comments
- [ ] Every text/background pair over the brightest part of the aurora is within AA (ratios recorded)
- [ ] The walkthrough of the shader is written under Comments and covers uniforms, noise, colour mix, the loop and how to change them
- [ ] The canvas is not focusable, not announced by a screen reader and never blocks a click on the buttons
- [ ] `ogl` is the only new dependency
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
