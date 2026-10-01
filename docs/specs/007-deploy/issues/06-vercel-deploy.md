# 06: Deploy to Vercel

**Spec:** [007-deploy](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05

**Status:** ready-for-human

## What to build

Put the site on the internet. This is the developer's work in the Vercel dashboard, not code: it needs the developer's Vercel account. It is blocked by the code tickets so that the first public build already has the right Telegram link, `robots.txt`, sitemap, analytics, CI and README.

1. Import `Alexey-Krivcikov/folio` into Vercel and name the project `alexei-krivchikov`. If that name is taken, pick the closest free one, record it in the comments below, and use it everywhere this spec says `alexei-krivchikov.vercel.app` (the variable below, ticket 05's README link, ticket 07's checks and the folio Case study links).
2. Framework preset Next.js, Root Directory `apps/web`, "Include source files outside of the Root Directory in the Build Step" on (`packages/ui` is built from outside it). Leave the build and install commands on their defaults; pnpm and Node come from `package.json`. Do not add a `vercel.json` unless the build fails without one.
3. Production Branch `main`. Pull requests and other branches get preview deployments (the default).
4. Environment variable `NEXT_PUBLIC_SITE_URL` = `https://alexei-krivchikov.vercel.app`, no trailing slash, enabled for Production, Preview and Development.
5. Enable Web Analytics for the project in the dashboard.
6. Trigger a deploy of `main` and wait for it to finish.
7. Open a throwaway pull request to confirm it produces a preview deployment, then close it.

## Acceptance criteria

- [ ] `https://alexei-krivchikov.vercel.app` (or the recorded fallback name) serves the home page over HTTPS
- [ ] The Vercel project's Root Directory is `apps/web`, Production Branch is `main`, and no `vercel.json` was added unless a failing build required it
- [ ] `NEXT_PUBLIC_SITE_URL` is set for Production, Preview and Development to the production origin
- [ ] Web Analytics is enabled, and a visit to the live site shows up in the dashboard
- [ ] A pull request produces a preview deployment
- [ ] A push to `main` produces a production deployment with no manual step

## Comments
