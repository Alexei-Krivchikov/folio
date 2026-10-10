# Spec 009 — Visual foundation

Status: Draft

## Problem Statement

The site works and is deployed, but it looks like a template: a grey `zinc` palette on near-black, `system-ui` for every piece of text, a thin bar for a Header, and no accent colour at all. A recruiter spends about thirty seconds on the page and decides whether the developer is worth a call, and nothing in the first impression says "this person cares about craft". Every later redesign step (Hero, Projects, About, Contact, Case study) would otherwise re-invent colours, fonts and small decorative pieces on its own and drift apart.

## Solution

One foundation step that every later spec builds on. The site gets a single visual language, called **Ember**: a near-black base, one warm orange-to-red accent, quiet technical micro-typography, and a fine film grain over everything. It is expressed once as design tokens and a few generic primitives in `packages/ui`, and the existing Sections are re-skinned to use them without changing their layout. The thin Header becomes a floating pill. After this spec the site already looks deliberate, even though no Section has been redesigned yet.

The look draws on two references the developer picked: alche.studio (dark, HUD-style micro-labels, fine linework) and wearestokt.com (floating pill navigation, bracketed mono labels, warm gradient). The base idea is a Linear/Vercel-style dark premium site, with those two as the source of character.

## User Stories

1. As a recruiter, I want the first screen to feel designed rather than default, so that I take the rest of the page seriously.
2. As a visitor, I want headings in a distinctive typeface and body text in a calm, readable one, so that the site has a voice but stays easy to read.
3. As a visitor, I want a single warm accent used consistently for emphasis, links and hover states, so that I can tell what is interactive.
4. As a visitor on a phone, I want the floating Header to stay out of the way and keep its menu, so that navigation still works at 375px.
5. As a visitor using the keyboard or a screen reader, I want the same focus order, focus rings and anchors as before, so that the redesign does not cost accessibility.
6. As a visitor with reduced-motion enabled, I want no new decorative animation, so that nothing moves that I asked not to move.
7. As the developer, I want colours, fonts and decorative pieces defined once in `packages/ui`, so that the following specs reuse them and the design system is visible to anyone reading the repository.
8. As the developer, I want every existing Section re-skinned to tokens in this step, so that the site never ships half old, half new between specs.

## Implementation Decisions

- **Palette (Ember).** Near-black background stays close to today's `#0a0a0a`. One accent family from warm orange to red, used as a gradient for emphasis and as a flat colour for links and focus rings. Neutral text keeps two steps (primary and muted). Exact values are chosen in the ticket after seeing them in the browser; the constraint is WCAG AA contrast for every text-on-background pair actually used.
- **Tokens.** Colours, font families, radii and the base spacing live as CSS variables mapped through `@theme` in `packages/ui/src/tailwind.css`. App code uses semantic names (`bg-background`, `text-muted`, `text-accent`) rather than raw `zinc-*` classes. The existing `--background` and `--foreground` variables in `apps/web/app/globals.css` move into the shared token file.
- **Typography.** Three free families loaded through `next/font`, subset to latin, `display: swap`, with no external requests at runtime:
  - Bricolage Grotesque for headings and body.
  - Geist Mono for small technical labels (the HUD style, e.g. `[ 01 / PROJECTS ]`).
  - Instrument Serif, italic only, for one or two emphasised words per page.
  The variable font axes in use are limited to what the design needs, to keep the font payload small.
- **Primitives in `packages/ui`.** Generic pieces that know nothing about the site's content: `Grain` (a fixed full-viewport film-grain overlay, non-interactive, cheap), `HudLabel` (small mono bracketed label), `AccentText` (inline emphasis in serif italic), `SectionHeading` (HudLabel plus heading), and the existing `Button` restyled for Ember. The rule from the grilling: a component that does not know about the site's content belongs in `packages/ui`; Section-specific pieces belong in `apps/web`.
- **Grain.** Rendered once in the root layout, behind interactive content, `pointer-events: none`. It is a static image or CSS noise, not an animated canvas; under reduced-motion it stays because it does not move.
- **Floating pill Header.** The fixed full-width bar is replaced by a rounded, blurred pill centred at the top, holding the name and the nav links. On mobile the pill keeps the menu button and opens the existing Nav overlay, which is re-skinned but not restructured. The existing hooks (`use-header-state`, `use-focus-trap`, `use-scroll-lock`, `use-escape-key`) are kept, as are the rule that the Header appears once the Hero has scrolled off and the Hero offset used for anchor scrolling.
- **Re-skin only.** Hero, About, Stack, Experience, Projects, Contact, Footer, the Case study page and the not-found page switch from `zinc-*` classes to the tokens and the new fonts. Their layouts, copy and animations are not changed in this spec; later specs redesign them one by one.
- **Section order and anchors are unchanged here.** The Section order change and the removal of the Stack Section happen in specs 011 and 012.

### Shared rules for specs 009 to 015

These apply to every following spec and are not repeated there.

- Motion is built on Motion 13 and Lenis. GSAP is not added; it stays reserved for the Lab as ADR 0002 says.
- Every decorative animation respects `prefers-reduced-motion` through the existing `usePrefersReducedMotion` hook and the variants helpers in `components/motion`.
- Content is readable with no JavaScript effects: text and links are in the DOM from the first render and are never created by an animation.
- Everything works at 375px and at 1440px. Effects that need a mouse (custom cursor, tilt, magnetic) run only for a fine pointer and are absent on touch.
- Performance targets on mobile for the production build: Lighthouse Performance at least 90, LCP at most 2.5 s on a 4G profile, CLS 0.
- Only free fonts and assets; hosting stays on Vercel Hobby (ADR 0005).
- Open Graph images stay generated from code (ADR 0004).

## Testing Decisions

- As in earlier specs there is no test runner. Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

- Browser pass at 1440px and 375px: every Section and the Case study page use the new fonts and palette, no `zinc-*` class remains in `apps/web`, the Header pill opens and closes the Nav overlay, anchors still land below the Header.
- Contrast: every text/background pair used is checked against WCAG AA.
- Keyboard pass: tab order is unchanged, focus rings are visible on the new colours.
- Reduced motion: with the OS setting on, the page behaves as before.
- Lighthouse mobile on the preview deployment: Performance 90 or above, so the font payload does not regress LCP.

## Out of Scope

- Any new layout or copy for Hero, About, Stack, Experience, Projects, Contact (specs 010 to 013).
- The Hero shader and kinetic type (010), tilt and magnetic effects (011), marquee and bento (012), custom cursor and scroll progress (013).
- The Case study redesign and View Transitions (014).
- OG image restyling, favicon colour and Lighthouse CI (015).
- A light theme and a theme toggle.

## Further Notes

- Decisions come from the grilling session for the visual upgrade (specs 009 to 015). Direction: Ember palette chosen over a cyber-blue (Alche-style) and a monochrome (Linear-style) alternative, because blue and violet are everywhere in portfolios and a warm gradient is remembered.
- The primary audience is a recruiter with thirty seconds; the secondary audience is a tech lead who reads the repository. The token file and the primitives in `packages/ui` are written for the second reader as much as for the first.
