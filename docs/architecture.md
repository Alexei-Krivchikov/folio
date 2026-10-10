# Architecture — folio

> Live doc. Update on every structural change. Inspired by `habits-tracker/ARCHITECTURE.md`.

## Goal

Creative portfolio/lab to impress recruiter. MVP = static Next.js, no DB/API, EN, free hosting. Show 3 projects (1-2 commercial as "Commercial — Role/Stack/Impact" + 1-2 personal like habits-tracker).

Refs: tajmirul.site, vikasdev-in.vercel.app — dark premium, Tailwind, Motion.

## Monorepo

- **Manager:** pnpm 11 workspaces (`pnpm-workspace.yaml`)
- **Orchestrator:** Turborepo 2 (`turbo.json` — tasks: build/dev/lint/typecheck)
- **Tooling:** Biome 2 (lint/format, `biome.json` at root), TypeScript 5 strict (`tsconfig.base.json`)
- **Deploys:** Vercel Hobby, Git integration with Root Directory `apps/web`, at `alexei-krivchikov.vercel.app` (ADR 0005)

```
folio/
  apps/web           # Next.js 16 App Router
  packages/ui        # shadcn primitives (Button, Card, Badge)
  packages/shared    # zod schemas, types (future: drizzle schema)
  packages/config    # @folio/biome-config, @folio/tsconfig, tailwind preset
  docs/              # specs, adr, this file
```

## apps/web (planned)

```
app/
  layout.tsx         # Lenis provider + font + metadata
  page.tsx           # Hero + About + Stack + Experience + Projects + Contact
  projects/[slug]/page.tsx  # MDX case study
  globals.css        # Tailwind 4
  content-collections.ts  # projects collection + zod frontmatter schema
  components/
  hero/ about/ stack/ experience/ projects/ contact/ ui/
  content/
  projects/*.mdx     # 3 case studies (static)
  lib/
  projects.ts        # Projects query module over content-collections
```

Data flow MVP: **Static** — MDX files → Server Components. No DB. Contact via `mailto:` + external links.

Phase 2: add PG + Drizzle + Route Handlers for guestbook/views (opt-in).

## Styling & Animation

- Tailwind 4 + shadcn-style primitives (cva + tailwind-merge) + CSS variables (dark default)
- Motion 13 for hero/cards (`initial/animate`, `stagger`, `whileHover`, `useInView`)
- Lenis for smooth scroll
- Visual upgrade (specs 009–015): Ember palette as tokens in `packages/ui`, `ogl` fragment shader for the Hero Signature moment, React `ViewTransition` for Case study navigation (ADR 0006). Motion stays the only animation engine; GSAP is still reserved for the Lab
- GSAP/R3F reserved for `app/lab` (phase 2)

## Conventions

- Imports via `@/*` (web) and `@folio/*` (packages)
- Commits: conventional (`feat:`, `fix:`, `docs:`)
- Specs: `docs/specs/00X-<slug>/spec.md` per feature (tickets in `issues/`), ADR for stack decisions

## Verification

```bash
pnpm install
pnpm lint            # biome check .
pnpm typecheck       # turbo typecheck
pnpm build           # turbo build (after web exists)
pnpm dev             # http://localhost:3000
```
