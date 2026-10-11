# 01: Ember tokens and fonts

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

The foundation every other ticket in this spec and in 010 to 015 reads from: one token file and three fonts. After this ticket the whole site already has the new background, the new body font and the colour utilities, even though no component uses them yet.

The palette values are the developer's call, so the work is split in two:

1. The agent proposes two or three Ember variants (near-black base close to `#0a0a0a`, a warm orange-to-red accent as a gradient and as a flat colour, primary and muted text), renders them in the browser against the current Hero and Header, and waits.
2. The developer picks one. Only then the agent writes it into the repository.

Once chosen:

- `packages/ui/src/tailwind.css` gets the CSS variables and an `@theme` block mapping them to semantic names: `background`, `foreground`, `muted`, `accent` (flat), the accent gradient endpoints, border colour, radii and the base spacing. App code will use `bg-background`, `text-muted`, `text-accent`, never raw `zinc-*`.
- `--background` and `--foreground` and the `@theme inline` mapping move out of `apps/web/app/globals.css` into the shared file; `globals.css` keeps only what is app-specific.
- Three families through `next/font` in `apps/web/app/layout.tsx`, latin subset, `display: swap`, no runtime requests to a font CDN: Bricolage Grotesque (headings and body), Geist Mono (labels), Instrument Serif (italic only). Their CSS variables are mapped to `--font-sans`, `--font-mono`, `--font-serif` in `@theme`. Variable axes are limited to what the design uses (for Bricolage, only the weight axis, and `opsz`/`wdth` only if the design needs them).
- `body` drops `system-ui` and uses the new sans family.
- Every text/background pair that will be used (primary on background, muted on background, accent on background, text on the accent gradient) is checked against WCAG AA and the ratios are written under Comments.

Existing `zinc-*` classes keep working through this ticket (they are Tailwind defaults), so nothing breaks while the re-skin tickets 05 to 07 are still open.

## Acceptance criteria

- [ ] The developer has seen the variants in the browser and chosen one; the choice and the final values are written under Comments
- [ ] `packages/ui/src/tailwind.css` defines the tokens; `apps/web/app/globals.css` no longer defines `--background` or `--foreground`
- [ ] `bg-background`, `text-foreground`, `text-muted`, `text-accent` and the gradient utility work in `apps/web`
- [ ] The three fonts are served from the app's own origin (no `fonts.googleapis.com` request in the network panel), latin subset only
- [ ] Body text renders in Bricolage Grotesque; nothing falls back to `system-ui` at 1440px or 375px
- [ ] Every text/background pair listed above passes WCAG AA, ratios recorded
- [ ] The font payload is noted under Comments (total KB), so the Lighthouse check in ticket 08 has a baseline
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
