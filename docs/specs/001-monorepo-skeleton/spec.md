# Spec 001 — Monorepo skeleton

Status: Done

## Problem Statement

The repository is empty: there are no workspaces, no task orchestration, no project docs, and no way to verify that anything builds. Every later feature of folio needs a place to live and a repeatable way to check it.

## Solution

Set up the root monorepo skeleton described in the architecture doc: pnpm workspaces orchestrated by Turborepo, shared Biome and TypeScript configuration, the project docs (architecture, glossary, ADRs, specs), and placeholder packages for the web app and shared libraries. After this, install, lint, typecheck, and a dry-run build all work from the root.

## User Stories

1. As the developer, I want a single `pnpm install` at the root to set up every package, so that I don't manage dependencies per folder.
2. As the developer, I want pnpm workspaces covering `apps/*` and `packages/*`, so that the web app can depend on internal packages via `workspace:*`.
3. As the developer, I want Turborepo tasks for build, dev, lint, and typecheck, so that I can run any of them across the whole repo with one command.
4. As the developer, I want one Biome config at the root, so that lint and formatting rules are identical everywhere.
5. As the developer, I want a strict shared base TypeScript config, so that every package gets the same compiler guarantees.
6. As the developer, I want placeholder packages for `web`, `ui`, `shared`, and `config`, so that the planned structure exists before any feature work starts.
7. As the developer, I want an architecture doc, a glossary, and ADRs in the repo, so that decisions and vocabulary are written down next to the code.
8. As the developer, I want a `docs/specs/` home for feature specs, so that each feature has a written plan before implementation.
9. As an agent working in the repo, I want the structure and conventions documented, so that I can orient myself without asking.

## Implementation Decisions

- Package manager: pnpm workspaces; orchestrator: Turborepo; lint/format: Biome; TypeScript strict via a shared base config (see ADR 0001).
- Workspace layout: `apps/web` (Next.js app) and `packages/ui`, `packages/shared`, `packages/config`, created as package.json stubs only.
- Root files: package manifest, workspace file, Turborepo config, Biome config, base tsconfig, `.gitignore`, README.
- Docs created together with the skeleton: architecture, glossary, ADRs 0001–0003, and the specs folder.

## Testing Decisions

- There is no test suite at this stage; the skeleton is verified by the tooling succeeding end to end.
- Acceptance:
  - `pnpm install` succeeds
  - `pnpm lint` (Biome) passes
  - `pnpm typecheck` passes
  - `turbo build --dry-run` lists the tasks
  - `git status` shows the new files, ready to commit
- Verification before commit:

```bash
pnpm install
pnpm lint
pnpm typecheck
npx turbo build --dry-run
git status --short
```

## Out of Scope

- Any real Next.js app code, UI components, or styling setup.
- Deployment configuration.
- Database, API, or content pipeline (see ADR 0003).

## Further Notes

- Rewritten from the original pre-`to-spec` format into the current template without changing its decisions.
