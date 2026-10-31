# 05: Lighthouse CI job that reports and does not block

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

Every pull request reports Lighthouse scores. The job reports only: a hard gate would flake on shared runners and is deferred until the scores are known to be stable (spec 016 tracks the numbers from here on).

- **Workflow.** A new `lighthouse` job in `.github/workflows/ci.yml` or a separate `lighthouse.yml` (choose one and say why under Comments). The existing `check` job is not changed.
- **Target.** A local production build served on the runner (`pnpm build`, then `next start`), so the job needs no Vercel Protection Bypass secret. The spec also allows the Vercel preview, but the preview sits behind deployment protection and the secret must never enter the repository.
- **Pages and settings.** `/` and one Case study URL, mobile preset, simulated slow 4G, three runs each, median reported. Use Lighthouse CI (`@lhci/cli`) with a committed `lighthouserc.json` and no assertions that fail the job (`assert` absent, or every level `warn`).
- **Report.** Scores for Performance, Accessibility, Best Practices and SEO, plus LCP, CLS and TBT, appear in the job summary (`$GITHUB_STEP_SUMMARY`), and the full report is uploaded as an artifact. A PR comment is optional.
- **Never red because of scores.** The job may fail only if the build or the runner itself breaks; a low score is a warning in the summary.
- **Runner note.** Scores on `ubuntu-latest` differ from a developer machine; write the first numbers under Comments as the CI baseline.

## Acceptance criteria

- [ ] The job runs on a pull request and on `push` to `main`, and shows the scores for `/` and a Case study in its summary
- [ ] A score below 90 does not fail the job or the PR; the `check` job is unchanged
- [ ] `lighthouserc.json` is committed; no token or bypass secret is in the repository
- [ ] The first CI numbers are recorded under Comments as the baseline
- [ ] `npx biome check .` passes

## Comments

Verified by opening a pull request. If the agent cannot push, that step is the developer's; list it here.
