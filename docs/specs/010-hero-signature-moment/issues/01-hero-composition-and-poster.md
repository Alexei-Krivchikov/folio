# 01: Hero composition and static poster

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

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

- [x] The name fits at 320, 375, 768 and 1440px with no horizontal scrollbar and no clipped letters
- [x] The `h1` text is in the server-rendered HTML (check the response of the production build)
- [x] The status pill is on one line at 375px; if a short form is used, the developer has approved it (approved: "Open to opportunities" below `md`)
- [x] The poster is visible with JavaScript disabled and keeps the headline, subtitle and pill readable (every text/background pair over the brightest part of the poster is within AA, ratios recorded)
- [x] "Let's Talk" and "View Projects" reach `#contact` and `#projects` and land below the Header pill
- [x] The Header still appears only after the Hero has scrolled off
- [x] With reduced motion on, nothing moves except what already did not move before (the dot's pulse stops)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `hero.tsx`: the Section is now full-bleed (`relative isolate`, `min-h-svh`, `overflow-hidden`) with the poster behind and the old `max-w-5xl px-6` column moved to an inner `div` (`py-24`). `id="hero"`, the stagger entrance and the buttons are as they were. The Section no longer carries the width limit, so the poster reaches the viewport edges.
- `hero-poster.tsx` (new, server component): a `div` with `aria-hidden`, `pointer-events-none`, `absolute inset-0 -z-10`, whose `background` is built from the tokens only: a warm red glow (`--accent-to` at 30%) at 78% 18%, an amber glow (`--accent-from` at 20%) at 14% 88%, a fade to `--background` over the last 30% so the Hero blends into the next Section, and `--background` underneath. It is in the initial HTML, so it shows with JavaScript off.
- Headline: `h1` with `ALEXEI` / `KRIVCHIKOV` (a `br` between, uppercase by CSS), `font-extrabold leading-[0.92] tracking-tight`, size `clamp(2.25rem, calc((100vw - 3rem) / 6.1), 8rem)`. The divisor 6.1 came from measuring the word at 144px: `KRIVCHIKOV` is about 5.87em wide, so on narrow screens the size follows the content width and the longest word fills about 96% of it. The cap was first 10rem (160px); the developer found that too big on a desktop and it is now 8rem (128px).
- Subtitle: "Frontend `developer` shipping CRM & chatbot UIs", `developer` in `AccentText` coloured `text-foreground` so the italic serif stands out from the muted line; `text-lg` on mobile, `text-2xl` from `md`.
- Status pill: the dot keeps its pulse (stopped under reduced motion, as before). Below `md` it reads "Open to opportunities", from `md` up "Building at Anthill · open to the right opportunity". The full copy was measured at 375px and wraps to two lines (47px tall against 31px), so the short form is needed.
- Dropped: the "Hi! I'm Alexei Krivchikov." line, because the name is now the headline.

### Composition choices (judged by looking)

Left-aligned content, vertically centred in a viewport-tall Section; the warm glow sits top right, behind the end of the name, the amber glow bottom left, so the text column stays on the darkest part of the poster. Giant name at 1440px is 128px (the cap), at 375px 53.6px, at 320px 44.6px.

### Verification

- Name fit (real glyph widths measured against the column): 320px 262 of 272 px, 375px 315 of 327, 768px 693 of 705, 1440px 751 of 976 (cap 8rem; 939 of 976 with the first cap of 10rem). No horizontal scroll at any of them (`scrollWidth` equals `clientWidth`).
- Subtitle is two lines at 320 and 375px. Pill is one line (31px) at 320, 375 and 768px.
- Server-rendered HTML contains the `h1` text, the poster `div`, both pill texts and the subtitle, and no "Hi!" line.
- Contrast over the poster, computed over every point of the poster at 1440x900, 768x1024 and 375x812: muted text at least 4.91:1, foreground text at least 11.92:1 (both AA). Text on the Hero pill (foreground on 5% surface over the glow peak) 10.7:1. The default Button text is the dark background colour on its own gradient, 5.64 to 11.16:1 as in spec 009.
- "Let's Talk" and "View Projects" are `#contact` and `#projects`; View Projects lands the Projects Section at 88px from the top, below the Header pill. The Header is still hidden (opacity 0, inert) while the Hero is on screen; the Header code was not touched.
- Reduced motion: the pulse is still gated by `usePrefersReducedMotion`; the entrance still uses the static variants.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
- The browser pane renders the emulated 1440px viewport very small in its screenshots, so the desktop composition was judged on a downscaled view plus the measurements above; the 375px screenshot was checked at full size.

### For the developer

Short pill copy approved. The developer finds the composition fine and the 160px name too big on a desktop, so the cap was lowered to 128px. It is understood to be a prototype of the Hero: the shader (ticket 04) and the entrance (ticket 03) change how it looks, so sizes are expected to be revisited then.
