# ADR 0003 — No DB / No separate API for MVP

Date: 2026-09-05
Status: Accepted

## Context

Initially considered `apps/api` (Hono). But MVP = static showcase (Hero, Projects, Experience), time = 15-20h, 0₽, no blog/guestbook yet. habits-tracker uses `use server` + PG, but folio MVP can be static.

## Decision

- **MVP without DB and without `apps/api`** — content as MDX files, contact via `mailto:` + external links
- Keep `packages/shared` ready for future zod/drizzle schemas
- Defer PG+Drizzle+Route Handlers to phase 2 (guestbook/views)

## Alternatives

- Add PG+Drizzle now — +4h setup, needs Docker/Neon, overkill for static MVP
- Keep Hono `apps/api` — +1 deploy, CORS, duplicates Next Route Handlers

## Consequences

+ Zero hosting cost, single Vercel deploy, faster MVP
+ Can add `apps/api` or DB later without re-architecting (add `apps/api` + `packages/db`)
- No dynamic features in MVP (acceptable)
