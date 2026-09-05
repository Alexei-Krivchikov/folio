# Spec 001 — Monorepo skeleton

Status: In Progress (Phase 0)

## Problem

Empty repo — no workspaces, no turbo, no docs, no way to verify build.

## Solution

Create root monorepo skeleton as in `docs/architecture.md`:

- `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.json`, `tsconfig.base.json`, `.gitignore`, `README.md`
- `docs/architecture.md`, `docs/glossary.md`, `docs/adr/0001..0003`, `docs/specs/`
- `apps/web`, `packages/ui|shared|config` placeholders (package.json stubs)

## Acceptance

- [ ] `pnpm install` succeeds
- [ ] `pnpm lint` (biome) passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm turbo build --dry-run` shows tasks
- [ ] `git status` shows new files, ready for commit

## Verification (before commit)

```bash
pnpm install
pnpm lint
pnpm typecheck
npx turbo build --dry-run
git status --short
```
