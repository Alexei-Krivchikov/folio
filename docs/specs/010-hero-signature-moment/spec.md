# Spec 010 — Hero Signature moment

Status: Draft

## Problem Statement

The Hero is the only part of the site every visitor is guaranteed to see, and today it is two lines of text, a pulsing green dot and two buttons on a plain background. It says "frontend developer" the way a thousand other portfolios do. It names no product, gives no number, and leaves no image in the memory. A recruiter who gives the page thirty seconds gets nothing to remember and nothing that proves the developer's taste.

## Solution

The Hero gets a **Signature moment**: a full-screen, real-time shader background in the Ember palette that reacts to the pointer, with the developer's name set in giant type over it and revealed by a short intro choreography. Under the headline sit the existing calls to action, and below the fold of the first screen a **Facts strip** gives four concrete facts at a glance. The first screen therefore carries the identity (name), the proof (facts) and the impression (the shader) without a word of paragraph text.

The shader is written with the small `ogl` library, loaded after the first paint, so the headline text is the LCP element and never waits for WebGL. Where WebGL is unavailable, the device is weak, or the visitor prefers reduced motion, a static Ember gradient with the same composition takes its place and the page loses nothing but the motion.

## User Stories

1. As a recruiter, I want the first screen to look unlike a template within a second, so that I stay longer than thirty seconds.
2. As a recruiter, I want to read the name and role immediately, so that I know whose site this is without scrolling.
3. As a recruiter, I want a few hard facts under the headline (years in production, a real product with real users, channels and languages, time zone), so that I can judge the profile without reading paragraphs.
4. As a recruiter, I want a status that tells me the developer is working but open to a good offer, so that I know I can write.
5. As a visitor on a laptop, I want the background to respond to my pointer, so that the page feels alive and the first interaction is rewarding.
6. As a visitor on a phone, I want the same composition, running smoothly, so that a link opened from a chat looks as good as on a desktop.
7. As a visitor with reduced-motion on, on a weak device, or without WebGL, I want a static version of the same picture, so that the page is complete and fast for me too.
8. As a visitor on a slow connection, I want the headline to appear before any shader code has loaded, so that the page is never blank.
9. As the developer, I want the shader code to be readable and explained in the ticket, so that I can change it and talk about it.

## Implementation Decisions

- **Headline.** The giant text is the name, `ALEXEI KRIVCHIKOV`, on two lines at the Hero scale. The size is fluid and fits 375px without overflow or a horizontal scrollbar. The role moves to a one-line subtitle under it with one emphasised word in Instrument Serif italic: "Frontend *developer* shipping CRM & chatbot UIs". The Hero keeps `id="hero"` and the two calls to action (Let's Talk, View Projects).
- **Status pill.** Replaces "Available for full-time opportunities" with: "Building at Anthill · open to the right opportunity". It must stay on one line at 375px; the green dot stays and its pulse stops under reduced-motion, as today.
- **Facts strip.** Four items, each a short value plus a label:
  1. 3 years in production (commercial experience since 2023).
  2. 7,000+ active users on DominoCRM, with a small source note ("per domino-crm.com"). The number comes from the product's public landing page, which is a company claim and not a personal achievement; the note keeps it honest and inside the NDA boundary. The value is re-checked against the landing page when the ticket is implemented.
  3. 3 channels · 4 UI languages (Telegram, Web, VK).
  4. UTC+3.
  Spoken languages and a city are not shown. The strip is part of the Hero Section, sits directly under the calls to action, and is a plain list in the DOM.
- **Shader (the Signature moment).** One full-viewport fragment shader that renders a slowly moving Ember aurora from layered noise. The pointer position is a uniform that bends the field on desktop; on touch the field drifts on its own with no pointer input. The scene is a single full-screen triangle drawn through `ogl` (`Renderer`, `Program`, `Mesh`), so the creative work is the GLSL, not the setup.
- **Why `ogl`.** The developer is new to shaders. The fundamentals worth learning are fragment shaders, uniforms and a render loop, and `ogl` is a thin layer over WebGL (its main objects map one to one to WebGL concepts), so none of the fundamentals are hidden behind an abstraction the way a framework hides the language under it. It is about 20 KB, and it can later draw a 3D object without a change of library. Raw WebGL2 would add around a hundred lines of setup for no learning value; `three`/R3F would be heavy for one quad.
- **Loading.** The Hero is a server-rendered shell: the headline, subtitle, pill, buttons and Facts strip are in the initial HTML over a static CSS gradient poster that already matches the shader's colours. The canvas component is loaded with a dynamic import after hydration (and after the first paint), then fades in over the poster. The headline, not the canvas, is the LCP element.
- **Degradation.** The shader does not start, and the static poster stays, when any of these holds: reduced-motion is on, WebGL2 is not available, context creation fails, or the device is weak (a low `hardwareConcurrency` is the first signal; the ticket picks the threshold by testing). If a context is lost at runtime the poster returns.
- **Resource rules.** Device pixel ratio is capped at 1.5. The render loop pauses when the Hero is out of the viewport (`IntersectionObserver`) and when the tab is hidden, and resumes on return. Resize is debounced. The loop and the WebGL context are fully released on unmount.
- **Intro choreography.** A short, non-blocking sequence: the headline lines rise and fade in, the pill, subtitle, buttons and Facts strip follow in a stagger. Content is visible and clickable from the first frame of the sequence; nothing waits for a preloader. Reduced-motion shows the final state immediately, using the existing variants helpers.
- **Header.** The Header pill introduced in spec 009 still appears only after the Hero has scrolled off. Whether it should appear from the first paint on the new Hero is decided in the ticket by looking at it.
- **Placement of code.** The shader component, the Facts strip and the Hero composition live in `apps/web/components/hero/`. Anything generic that comes out of the work (for example a hook that tells whether an element is in view) goes to `apps/web/components/motion/` and is not duplicated.
- **New dependency.** `ogl`. ADR 0002 stands unchanged: GSAP and R3F remain reserved for the Lab.

## Testing Decisions

- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

- Browser pass at 1440px and 375px: the name fits, no horizontal scroll, the status pill stays on one line, the Facts strip wraps sensibly, the calls to action reach their anchors.
- Degradation pass: with `prefers-reduced-motion` on, with WebGL disabled in the browser, and with the shader chunk blocked in the network panel, the Hero shows the static poster with the full composition and no console errors.
- Lifecycle pass: scrolling the Hero out of view stops the render loop (checked in the performance panel or with a frame counter), switching tabs pauses it, and navigating to a Case study and back leaves no leaked canvas or context.
- Performance on the preview deployment, mobile profile: Lighthouse Performance at least 90, LCP at most 2.5 s with the headline as the LCP element, CLS 0, and the shader chunk adding no more than about 35 KB gzip to the page, loaded after first paint.
- A real mid-range Android phone is opened at least once; a stutter there is a bug in this spec.

## Out of Scope

- A 3D object, a glossy model, or any three.js/R3F scene. It is a candidate follow-up after spec 015 and the Lab.
- A custom cursor and pointer spotlight (spec 013).
- Redesign of the Sections below the Hero.
- A preloader or any loading screen.
- Sound.
- Showing spoken languages or a city.

## Further Notes

- The shader code is not documented with comments (the repository keeps production code comment-free); the explanation of how it works, what each uniform does and how to change the colours lives in the ticket's `## Comments` section.
- The 7,000+ figure is a marketing claim on domino-crm.com with no date. If the developer is unsure it fits the agreement with the Employer, the fact is replaced by a qualitative one (for example the product's three channels) without changing the layout.
- Related decisions: Ember palette and fonts in spec 009; View Transitions are not used here.
