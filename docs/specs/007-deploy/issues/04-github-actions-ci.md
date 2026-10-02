# 04: GitHub Actions CI

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

Biome, `tsc` and the build run only on the developer's machine today. Vercel will build every push, but it runs neither Biome nor the type check separately, and the repository is public, so a missing check shows. Add one workflow that runs the same command as local development.

- `.github/workflows/ci.yml`, triggered on `push` to `main` and on `pull_request`.
- One job: check out, set up pnpm with `pnpm/action-setup` (it reads the version from `packageManager` in `package.json`, so do not repeat the version in the workflow), set up Node 22 with the pnpm cache, `pnpm install --frozen-lockfile`, then `pnpm check`.
- `NEXT_PUBLIC_SITE_URL` is not set; the build runs against the `localhost` fallback, which is enough to prove it compiles.
- The workflow does not gate Vercel. Vercel deploys independently of it; making deploys wait for CI is out of scope for this spec.
- A workflow cannot be fully verified before it exists on GitHub, so this ticket is only complete once the first run has gone green on the remote.

## Acceptance criteria

- [x] `.github/workflows/ci.yml` exists and runs on `push` to `main` and on `pull_request`
- [x] The workflow's Node version satisfies `engines.node` in the root `package.json`, and the pnpm version is read from `packageManager`, not written in the workflow
- [x] The job runs `pnpm install --frozen-lockfile` followed by `pnpm check`
- [ ] A run of the workflow on GitHub finishes green for the commit that adds it
- [ ] A deliberately broken change (a Biome error on a throwaway branch) makes the workflow fail, then the branch is deleted
- [x] `npx biome check .` passes on the workflow file's repository state

## Comments

`packages/config` and `packages/shared` had no `tsconfig.json`, so `tsc --noEmit` there resolved the root one and failed on `apps/web` path aliases. Added both, mirroring `packages/ui`, so `pnpm check` passes on a clean checkout. The first green run on GitHub and the deliberate-failure check are still open.
