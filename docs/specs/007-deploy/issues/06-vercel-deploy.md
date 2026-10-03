# 06: Deploy to Vercel

**Spec:** [007-deploy](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05

**Status:** Done

## What to build

Put the site on the internet. This is the developer's work in the Vercel dashboard, not code: it needs the developer's Vercel account. It is blocked by the code tickets so that the first public build already has the right Telegram link, `robots.txt`, sitemap, analytics, CI and README.

1. Import `Alexei-Krivchikov/folio` into Vercel and name the project `alexei-krivchikov`. If that name is taken, pick the closest free one, record it in the comments below, and use it everywhere this spec says `alexei-krivchikov.vercel.app` (the variable below, ticket 05's README link, ticket 07's checks and the folio Case study links).
2. Framework preset Next.js, Root Directory `apps/web`, "Include source files outside of the Root Directory in the Build Step" on (`packages/ui` is built from outside it). Leave the build and install commands on their defaults; pnpm and Node come from `package.json`. Do not add a `vercel.json` unless the build fails without one.
3. Production Branch `main`. Pull requests and other branches get preview deployments (the default).
4. Environment variable `NEXT_PUBLIC_SITE_URL` = `https://alexei-krivchikov.vercel.app`, no trailing slash, enabled for Production, Preview and Development.
5. Enable Web Analytics for the project in the dashboard.
6. Trigger a deploy of `main` and wait for it to finish.
7. Open a throwaway pull request to confirm it produces a preview deployment, then close it.

## Acceptance criteria

- [x] `https://alexei-krivchikov.vercel.app` (or the recorded fallback name) serves the home page over HTTPS
- [x] The Vercel project's Root Directory is `apps/web`, Production Branch is `main`, and no `vercel.json` was added unless a failing build required it
- [x] `NEXT_PUBLIC_SITE_URL` is set for Production, Preview and Development to the production origin
- [x] Web Analytics is enabled, and a visit to the live site shows up in the dashboard
- [x] A pull request produces a preview deployment
- [x] A push to `main` produces a production deployment with no manual step

## Comments

- The name `alexei-krivchikov` was free, so the address is `https://alexei-krivchikov.vercel.app` and nothing else in the spec changes.
- `NEXT_PUBLIC_SITE_URL` was first saved as type Secret, which hides the value and offers no Development environment. Recreated as type Config for Production, Preview and Development. A `NEXT_PUBLIC_` value ships to the browser anyway, so Secret was the wrong type.
- Web Analytics returned 404 on `/_vercel/insights/script.js` until it was enabled in the dashboard and the project redeployed; after that the dashboard counted a visit.
- A pull request with an empty commit showed "Skipped" on the Vercel bot comment: with a monorepo Root Directory Vercel skips deployments that change nothing under `apps/web`. A pull request that touched `apps/web` produced a Ready preview, and was closed unmerged with its branch deleted.
- While verifying, the site looked unreachable (`ERR_CONNECTION_RESET`, TCP timeouts) because of a VPN, not the deployment. Without the VPN `/`, `/robots.txt` and `/sitemap.xml` return 200.
- A push to `main` (commit `c82409a`, inside `apps/web`) produced a Production deployment on its own. Commits that touch only `docs/` are skipped by Vercel, so `839c4b8` did not.
