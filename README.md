# folio

Creative portfolio - `Alexei Krivchikov`.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-13-0055FF?logo=framer&logoColor=white)
![OGL](https://img.shields.io/badge/OGL-1-black)
![Lenis](https://img.shields.io/badge/Lenis-1-black)

Goal: show recruiters real work, not just claims, in a few minutes: a dark Ember-themed site with a WebGL shader Hero, Projects (3 case studies), About (with the Stack), Experience and Contact. Deployed on Vercel: [alexei-krivchikov.vercel.app](https://alexei-krivchikov.vercel.app). EN first, RU later.

## Stack (MVP, 2026)

- **Monorepo:** pnpm 11 + Turborepo 2
- **Web:** Next.js 16 (App Router) + React 19 + TypeScript 5 strict
- **Styling:** Tailwind CSS 4 + shadcn-style primitives (cva + tailwind-merge), Ember tokens in `packages/ui`
- **Animation:** Motion 13 + Lenis, an `ogl` fragment shader in the Hero, React `ViewTransition` for Case study navigation (GSAP in Lab phase 2)
- **Content:** MDX via content-collections (static, no DB for MVP)
- **Tooling:** Biome 2
- **CI:** GitHub Actions: `ci.yml` (lint, typecheck, build) and `lighthouse.yml` (Lighthouse report on every PR, never blocks)

Full decisions: `docs/adr/`

## Structure

```
folio/
  apps/web              # Next.js portfolio
  packages/ui           # design system: Ember tokens, shadcn-style and motion primitives
  packages/shared       # placeholder, no schemas yet
  packages/config       # placeholder
  scripts/              # lighthouse-summary.mjs (CI job summary)
  lighthouserc.json     # Lighthouse CI settings
  .github/workflows/    # ci.yml, lighthouse.yml
  docs/
    architecture.md
    adr/
    specs/
  turbo.json
  pnpm-workspace.yaml
```

## Quick Start

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # turbo build
pnpm lint       # biome check
pnpm typecheck  # turbo typecheck
```

## Docs

- `docs/architecture.md` — live architecture
- `docs/adr/` — decisions
- `docs/specs/` — feature specs

## Roadmap

- **MVP:** done, specs 001-008 (skeleton, hero/about, stack, experience, projects MDX, polish/navigation, deploy, screenshots)
- **Visual upgrade (Ember):** specs 009 to 015 done; 016 (Lighthouse LCP) closed without changes, the live site stays at about 89
- **Phase 2:** Lab (GSAP/R3F), Blog, Guestbook (PG+Drizzle), RU

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Turbo dev (all apps) |
| `pnpm build` | Turbo build |
| `pnpm lint` | Biome check |
| `pnpm lint:fix` | Biome autofix |
| `pnpm typecheck` | Turbo typecheck |
