# 05: Lighthouse CI job that reports and does not block

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

Every pull request reports Lighthouse scores. The job reports only: a hard gate would flake on shared runners and is deferred until the scores are known to be stable (spec 016 tracks the numbers from here on).

- **Workflow.** A new `lighthouse` job in `.github/workflows/ci.yml` or a separate `lighthouse.yml` (choose one and say why under Comments). The existing `check` job is not changed.
- **Target.** A local production build served on the runner (`pnpm build`, then `next start`), so the job needs no Vercel Protection Bypass secret. The spec also allows the Vercel preview, but the preview sits behind deployment protection and the secret must never enter the repository.
- **Pages and settings.** `/` and one Case study URL, mobile preset, simulated slow 4G, three runs each, median reported. Use Lighthouse CI (`@lhci/cli`) with a committed `lighthouserc.json` and no assertions that fail the job (`assert` absent, or every level `warn`).
- **Report.** Scores for Performance, Accessibility, Best Practices and SEO, plus LCP, CLS and TBT, appear in the job summary (`$GITHUB_STEP_SUMMARY`), and the full report is uploaded as an artifact. A PR comment is optional.
- **Never red because of scores.** The job may fail only if the build or the runner itself breaks; a low score is a warning in the summary.
- **Runner note.** Scores on `ubuntu-latest` differ from a developer machine; write the first numbers under Comments as the CI baseline.

## Acceptance criteria

- [x] The job runs on a pull request and on `push` to `main`, and shows the scores for `/` and a Case study in its summary
- [x] A score below 90 does not fail the job or the PR; the `check` job is unchanged
- [x] `lighthouserc.json` is committed; no token or bypass secret is in the repository
- [x] The first CI numbers are recorded under Comments as the baseline
- [x] `npx biome check .` passes

## Comments

Verified by opening a pull request. If the agent cannot push, that step is the developer's; list it here.

### Implementation notes

- Separate `lighthouse.yml` rather than a second job in `ci.yml`: the `check` job and its file stay untouched, and the Lighthouse run (build, three runs per page, Chrome) is slow and has its own failure modes, so it gets its own workflow and its own status in the PR.
- Target is a local production build (`pnpm build`, then `next start` started by `lhci collect` through `startServerCommand`). No Vercel bypass secret is used or needed.
- `lighthouserc.json` has only `collect` and a filesystem `upload`; there is no `assert`, so scores cannot fail the job. Pages: `/` and `/projects/folio`, three runs each, mobile form factor, simulated throttling.
- `scripts/lighthouse-summary.mjs` takes the median of the three runs per page and writes a table to `$GITHUB_STEP_SUMMARY`; a Performance score below 90 gets a warning mark, not a failure. The raw reports are uploaded as the `lighthouse-report` artifact.
- Not verified locally: the job only runs on GitHub. The push and the first run are the developer's step.
- CI baseline (run 42178720232, `ubuntu-latest`, median of 3, mobile, simulated slow 4G):

  | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
  | --- | --- | --- | --- | --- | --- | --- | --- |
  | `/` | 51 | 100 | 96 | 100 | 4.23 s | 0.000 | 31038 ms |
  | `/projects/folio` | 94 | 100 | 96 | 100 | 3.06 s | 0.000 | 65 ms |

  The `/` TBT of about 31 s is far outside the norm and is an artifact of the CPU-only runner (production Lighthouse on `/` gave TBT 40 ms, see ticket 08). Handed to spec 016 together with the bundle growth from ticket 06.
- The job is green with a Performance score of 51, so non-blocking behaviour is confirmed in practice. Run annotations are only the Node 20 deprecation of `actions/upload-artifact@v5` and the ubuntu-latest migration notice.
