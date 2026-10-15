# 01: Hero composition and static poster

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

The new Hero as a complete, working page with no WebGL yet: the giant name, the subtitle, the status pill, the two calls to action, over a static Ember gradient poster. This is also the permanent fallback that tickets 06 and 07 fall back to, so it has to look finished on its own. File: `apps/web/components/hero/hero.tsx`, plus a small poster piece next to it if it reads better as its own component.

- **Headline.** The `h1` is the name on two lines, `ALEXEI` and `KRIVCHIKOV`, at a giant fluid size. The size is a `clamp()` tuned so that the longest word fills the width of the content column without overflow; it is checked at 320, 375, 768 and 1440px. It stays a real `h1`, and its text is in the initial HTML.
- **Subtitle.** A one-line paragraph under it: "Frontend *developer* shipping CRM & chatbot UIs", with `developer` in `AccentText` (Instrument Serif italic). It must not be longer than two lines at 375px.
- **Status pill.** The copy becomes "Building at Anthill · open to the right opportunity". The green dot and its pulse stay, and the pulse still stops under reduced motion. The spec requires one line at 375px; if the full copy cannot fit one line at a legible size (not below 11px), a short form (for example "Open to opportunities") is shown below `md` and the full copy from `md` up. The developer approves the short form if it is needed.
- **The old line.** "Hi! I'm Alexei Krivchikov." is dropped, because the name is now the headline. Say so under Comments.
- **Calls to action.** "Let's Talk" and "View Projects" with the same anchors and `buttonVariants` as today.
- **Poster.** A full-bleed layer behind the content (absolute, behind, not interactive, `aria-hidden`) made of CSS gradients in the Ember tokens: the near-black background with a warm glow from the accent family. It is wider than the `max-w-5xl` content column, and the Hero keeps `id="hero"`. Tickets 04 and 06 put the canvas over it, and its colours are the reference for the shader's colours.
- **Height.** The Hero is at least one viewport tall (`svh`), so the poster and later the shader fill the first screen.
- The existing entrance (`staggerVariants`, `fadeUpVariants`) is kept as it is; ticket 03 reworks it.

The composition is judged by looking: render it at 1440 and 375px and write what was chosen (alignment, spacing, glow position) under Comments.

## Acceptance criteria

- [ ] The name fits at 320, 375, 768 and 1440px with no horizontal scrollbar and no clipped letters
- [ ] The `h1` text is in the server-rendered HTML (check the response of the production build)
- [ ] The status pill is on one line at 375px; if a short form is used, the developer has approved it
- [ ] The poster is visible with JavaScript disabled and keeps the headline, subtitle and pill readable (every text/background pair over the brightest part of the poster is within AA, ratios recorded)
- [ ] "Let's Talk" and "View Projects" reach `#contact` and `#projects` and land below the Header pill
- [ ] The Header still appears only after the Hero has scrolled off
- [ ] With reduced motion on, nothing moves except what already did not move before (the dot's pulse stops)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
