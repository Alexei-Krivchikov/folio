# ADR 0001 — Monorepo tooling: pnpm + Turborepo

Date: 2026-09-05
Status: Accepted

## Context

Need monorepo for `web` + future `lab`/maybe `api`, with `docs/` at root. Team = 1, time = 0.5-1h/day, Node 22, pnpm 11 available.

## Decision

- **pnpm workspaces** (`pnpm-workspace.yaml: apps/*, packages/*`)
- **Turborepo 2** for task orchestration (`turbo.json`)
- Root `package.json` scripts delegate to `turbo run`

## Alternatives

- **Nx** — powerful but heavy for 1 app, extra config
- **Bun workspaces** — fast but Vercel Node-centric
- **npm/yarn workspaces** — slower, no isolated linking

## Consequences

+ Fast installs, strict deps, cache for build/lint/typecheck
+ Easy to add `apps/api` later
- Need `pnpm` (already used)
