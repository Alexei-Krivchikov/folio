# folio

Creative portfolio — `Alexei Krivchikov`.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-13-0055FF?logo=framer&logoColor=white)

Goal: show recruiters real work, not just claims, in a few minutes: `Hero + About + Stack + Experience + Projects (3 case studies) + Contact`. Deployed on Vercel: [alexei-krivchikov.vercel.app](https://alexei-krivchikov.vercel.app). EN first, RU later.

## Stack (MVP, 2026)

- **Monorepo:** pnpm 11 + Turborepo 2
- **Web:** Next.js 16 (App Router) + React 19 + TypeScript 5 strict
- **Styling:** Tailwind CSS 4 + shadcn-style primitives (cva + tailwind-merge)
- **Animation:** Motion 13 + Lenis (GSAP in Lab phase 2)
- **Content:** MDX via content-collections (static, no DB for MVP)
- **Tooling:** Biome 2

Full decisions: `docs/adr/`

## Structure

```
folio/
  apps/web              # Next.js portfolio
  packages/ui           # shadcn design system
  packages/shared       # zod schemas, types
  packages/config       # biome, tsconfig, tailwind presets
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

- **MVP (20h, 30d x 0.5-1h):** skeleton → ui-kit → hero/about → stack/experience → projects MDX → contact + deploy
- **Phase 2:** Lab (GSAP/R3F), Blog, Guestbook (PG+Drizzle), RU

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Turbo dev (all apps) |
| `pnpm build` | Turbo build |
| `pnpm lint` | Biome check |
| `pnpm lint:fix` | Biome autofix |
| `pnpm typecheck` | Turbo typecheck |
