# 04: Aurora shader (ogl)

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01

**Status:** ready-for-human

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

- [x] A canvas with the aurora runs behind the Hero content at 1440px and 375px at a smooth frame rate on the developer's machine
- [x] The colours come from the Ember tokens, not from a second hard-coded palette
- [x] The developer has seen the variants and chosen one; the choice and the final parameters are under Comments
- [x] Every text/background pair over the brightest part of the aurora is within AA (ratios recorded)
- [x] The walkthrough of the shader is written under Comments and covers uniforms, noise, colour mix, the loop and how to change them
- [x] The canvas is not focusable, not announced by a screen reader and never blocks a click on the buttons
- [x] `ogl` is the only new dependency
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Decision

Three variants were shown (`a` calm drift, `b` faster smoky filaments, `c` big contrasty pockets) and the developer chose **b**. The final parameters, fixed as the `aurora` constant in `hero-shader.tsx`: `scale 2.2`, `speed 0.09`, `warp 1.7`, `low 0.3`, `high 0.6`.

Two follow-up requests from the developer, both done in this ticket:

1. On a phone the aurora was hardly visible. Cause: the brightness cap that protects AA contrast under the text was tuned for the muted text colour, and on a narrow screen the text covers the whole picture. Fix: the Hero's secondary text (subtitle, Facts strip labels and note) is now `text-foreground/80` instead of `text-muted`, which leaves room to raise the caps on narrow screens from 0.30 / 0.22 to 0.50 / 0.38 (red / amber); the field also covers more area on narrow screens (`uLow` and `uHigh` lowered by 0.14 and 0.12) and the extra dimming around the text column is off there.
2. On load the static poster gradients showed first and were then swapped abruptly for the aurora. Fix: the poster is now hidden by default (`opacity: 0`, in the server HTML too) and only appears when the shader reports `unavailable` (no WebGL2 or the renderer could not be created); a `noscript` rule shows it when JavaScript is off. The canvas is created with `opacity: 0` and fades in over 1.6 s after its first rendered frame. So the first paint is the plain dark background and the aurora comes in smoothly, with no gradient to swap out.

### How the shader works (walkthrough)

**What a fragment shader is.** The GPU draws a rectangle that covers the whole canvas and runs the small program in `hero-shader.glsl.ts` (the `fragment` string, written in GLSL) once for every pixel, all pixels in parallel. The program gets that pixel's position (`vUv`, from 0,0 at the bottom left to 1,1 at the top right) and has to return one colour (`outColor`). It cannot remember anything between pixels or frames; everything it knows comes from its inputs, so a moving picture is just the same function evaluated with a different time.

**What `ogl` does (`hero-shader.tsx`).** It is a thin layer over WebGL, and its objects map one to one to WebGL concepts:

- `Renderer` creates the WebGL2 context on a canvas and sets its size and pixel ratio (`dpr`, capped at 1.5 so a 3x phone screen does not draw nine times the pixels it needs).
- `Triangle` is one oversized triangle that covers the screen (cheaper than two triangles for a quad). It supplies the `position` and `uv` attributes that the vertex shader forwards.
- `Program` compiles the vertex shader and the fragment shader and holds the **uniforms**, the values the CPU sends to the shader.
- `Mesh` ties the geometry to the program, and `renderer.render({ scene: mesh })` draws it.
- The render loop is a `requestAnimationFrame` callback: it writes the new time into `uTime`, draws, and schedules itself again. Cleanup cancels the loop, disconnects the `ResizeObserver`, calls `WEBGL_lose_context` and removes the canvas (the canvas is created in the effect and not in JSX because a canvas whose context was lost cannot be reused when React runs the effect twice in development).

**The uniforms (what each one is).**

- `uTime`: seconds since the loop started. Everything moves by adding a multiple of it to the noise coordinates.
- `uResolution`: canvas size in device pixels; only its ratio (`aspect`) is used, so the picture is not stretched.
- `uBackground`, `uFrom`, `uTo`: the three colours, read once from the CSS variables `--background`, `--accent-from` and `--accent-to` (so the palette lives only in the token file).
- `uScale`: how many noise "blobs" fit on the screen; bigger is finer. `uSpeed`: how fast time moves. `uWarp`: how strongly the noise is bent by itself (this makes the smoky filaments). `uLow` and `uHigh`: the two edges of the `smoothstep` that turns noise values into "how much aurora here" (a lower `uLow` fills more area, a smaller gap between them gives sharper edges).

**How the picture is built (`main`).**

1. `p` is the pixel position, centred, multiplied by the aspect ratio and `uScale`.
2. `noise` is value noise: a random number at every integer grid point (`hash`), smoothly interpolated in between. `fbm` adds four layers of it, each at twice the frequency (rotated by `mat2` so the grid does not show) and half the amplitude, which gives a natural cloudy texture.
3. Domain warping: `q` is `fbm` sampled at a point moved by time, `r` is `fbm` sampled at a point moved by `q`, and the final `f` is `fbm` sampled at a point moved by `r`. Feeding the noise into itself is what makes the shapes fold and flow like smoke instead of looking like plain clouds.
4. `field = smoothstep(low, high, f)` turns the noise value into a 0 to 1 amount of aurora. `hue` (from `r.x`) says where the colour leans towards the amber `uFrom` or the red `uTo`.
5. The brightness caps (`CAP_TO`, `CAP_FROM`, wide and narrow versions) limit how far the colour may move away from the background, `textZone` calms the area around the headline on wide screens, `bottomFade` fades the picture into the background at the bottom of the Hero, and `glow` brightens the free top right corner on wide screens only.
6. `amount` multiplies all of that, and the result is `mix(uBackground, tint, amount)`: the background colour pulled towards the tint by `amount`.

**How to change it.**

- Colours: change the tokens `--accent-from`, `--accent-to`, `--background` in `packages/ui/src/tailwind.css`; the shader follows.
- Speed: `speed` in the `aurora` constant (0.09 now; 0.05 is a calm drift).
- Detail: `scale` (2.2 now; larger gives smaller, busier shapes).
- Smokiness: `warp` (1.7 now; 1.0 gives soft blobs, 2.5 gives tight filaments).
- How much of the screen is lit: `low` and `high` (0.3 and 0.6 now; raise both to leave more darkness).
- How bright it may get: the four caps at the top of the shader. Keep them below the values in the contrast table, otherwise the Hero text loses AA.

### Contrast (worst case: the aurora at its cap under the text)

The Hero's secondary text is `foreground` at 80%, drawn over the local picture; the table is computed for the blended colour.

| Where | Cap (red / amber) | Secondary text | Foreground text |
|---|---|---|---|
| Narrow screens (phone, tablet) | 0.50 / 0.38 | at least 5.26:1 | 7.1 to 8.2:1 |
| Wide screens, under the text | 0.30 / 0.22 (extra dimming near the headline) | at least 7.83:1 | 9.0 to 12.1:1 |
| Wide screens, free top right corner (up to 2.2x the cap) | no text there | n/a | the headline's right end and the pill stay at least 9.86:1 (checked over their actual rectangles at 1440x900) |

### Verification

- With the final parameters: one canvas, WebGL2 context alive, no console errors or shader warnings, about 165 frames per second on the developer's machine (display refresh), the "Let's Talk" button is the element under its own centre (the canvas never intercepts clicks), the canvas host is `aria-hidden` and `pointer-events: none`, and the canvas is not a tab stop.
- Server HTML: no canvas, the poster `div` has `opacity: 0` inline, and the `noscript` override is present.
- At 375px the aurora is clearly visible (screenshot checked) and the text stays readable; at 1440px the red aurora with the brighter top right corner was reviewed and chosen by the developer.
- `ogl` is the only new dependency (`apps/web/package.json`).
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
- Not done here by design: pause when out of view and cleanup rules beyond the basics (ticket 06), reduced motion and the weak-device guard (ticket 07).
