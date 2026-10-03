# Spec 007 — Deploy and launch

Status: Done

## Problem Statement

The site is feature-complete and polished, but it only exists on the developer's machine. A recruiter can't open it, a shared link has nowhere to point, and the Open Graph images resolve against `http://localhost:3000`. The Contact Section links the wrong Telegram handle. There is no `robots.txt` or sitemap, so search engines have nothing to index, no analytics to show whether anyone visited, and no CI to stop a broken commit from reaching the live site. Until the site is deployed and verified at its real address, it can't be shown to anyone.

## Solution

The site goes live on Vercel at `alexei-krivchikov.vercel.app`, deployed from `main` through the Git integration, with every pull request getting its own preview deployment. A GitHub Actions workflow runs the same `pnpm check` that runs locally on every push and pull request, so Biome, `tsc` and the build are enforced in the public repository. The site gains `robots.txt` and `sitemap.xml` generated from code, Vercel Web Analytics for visit counts, and a corrected Telegram link. The README stops describing the stack as it was planned and starts describing it as it is, with a link to the live site, and a new ADR records the hosting decision.

Once the site is up, it is verified at its production address against a fixed checklist: Lighthouse on mobile, an absolute `og:image` URL, the three machine-readable URLs answering, and a real link preview in a chat client. Only then does the folio Case study get its website and GitHub links, because they point at things that now exist.

Project screenshots are not part of this spec. The cards and galleries ship with placeholders and are replaced in spec 008; the site is indexable from the start, but the link should not be sent to recruiters until 008 is done.

## User Stories

1. As a recruiter, I want to open the site at a stable public address, so that I can see the work without being sent a zip or a repo.
2. As a recruiter, I want the address to be short and recognisable as the developer's name, so that I can paste it into notes and trust it.
3. As a recruiter sharing the link, I want the preview card to show the right title, description and image, so that the link looks like a real site.
4. As a visitor, I want the Telegram link in Contact to open the developer's real account, so that the fastest contact option actually works.
5. As a visitor, I want the Email link to open a message to the developer's real address, so that I can write without copying anything.
6. As a developer reviewing a change, I want every pull request to get its own preview URL, so that I can see it running before it reaches `main`.
7. As a developer, I want a push to `main` to deploy automatically, so that the live site is never behind the repository.
8. As a developer, I want Biome, `tsc` and the build to run on every push and pull request, so that a broken change is flagged before and after it merges, not discovered on the live site.
9. As a visitor of the public repository, I want a green check on the latest commit, so that I can see the project is maintained properly.
10. As a search engine, I want a `robots.txt` that points to a sitemap, so that I can find every page.
11. As a search engine, I want a sitemap listing the home page and every Case study with absolute URLs, so that the Case studies are indexed.
12. As the developer, I want to see how many people visit and where from, so that I know the site is being seen.
13. As a visitor, I want analytics that set no cookies, so that I'm not shown a consent banner.
14. As the developer, I want the production URL to come from an environment variable set in Vercel, so that moving to a custom domain later changes a setting and not the code.
15. As a visitor of the folio Case study, I want a link to the live site and to the source, so that I can open the thing the Case study describes.
16. As a reader of the README, I want the stack and deployment described as they are today, so that I'm not misled by notes from the planning phase.
17. As the developer, I want the hosting decision recorded in an ADR, so that the reason for `*.vercel.app` and the Hobby plan survives until I buy a domain.
18. As the developer, I want the production site checked against a written list, so that "deployed" means verified rather than "the build went green".
19. As a visitor on a phone, I want the deployed site to load fast, so that the animations and OG work don't cost me a slow first screen.
20. As the developer, I want the project screenshots tracked as their own piece of work, so that placeholders on a public site are a known gap and not a forgotten one.

## Implementation Decisions

- **Hosting.** Vercel Hobby, project name `alexei-krivchikov`, address `alexei-krivchikov.vercel.app`. No custom domain in this spec; moving to one later means changing `NEXT_PUBLIC_SITE_URL` and the domain setting in Vercel, with no code edit.
- **Git integration, not the CLI.** Production Branch is `main`; pull requests and other branches get preview deployments. Root Directory is `apps/web` with "Include source files outside of the Root Directory" on, so `packages/ui` builds; pnpm and Node are read from `package.json` (`packageManager`, `engines`). There is no `vercel.json` unless the build proves it necessary. The Vercel steps are the developer's, so the ticket is a checklist, not code.
- **One environment variable.** `NEXT_PUBLIC_SITE_URL=https://alexei-krivchikov.vercel.app`, set for Production, Preview and Development in Vercel. Preview deployments therefore point their OG images at the production address, which is harmless. `apps/web/.env.example` already documents the variable and is not touched.
- **A single source for the site URL.** The `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")` expression in `app/layout.tsx` is the only place the origin is read today. `robots.ts` and `sitemap.ts` need the same value, so it moves into one shared constant that all three import, rather than three copies of the fallback.
- **Machine-readable URLs as code.** `app/robots.ts` allows all crawlers and names the sitemap; `app/sitemap.ts` lists `/` and one `/projects/<slug>` per Project from the existing `getProjects()`. Consistent with ADR 0004, neither is a static file in `public/`. The site is indexable from day one.
- **Analytics.** `@vercel/analytics` with `<Analytics />` mounted once in the root layout. It is cookieless, so no consent banner is added. Speed Insights is not added; Lighthouse covers performance.
- **CI.** One `.github/workflows/ci.yml`, triggered on `push` to `main` and on `pull_request`, installing with `pnpm install --frozen-lockfile` on Node 22 and running `pnpm check`. `pnpm/action-setup` reads the pnpm version from `packageManager`, so the version is not duplicated. Vercel builds independently of this workflow and does not wait for it.
- **Contact fixes.** Telegram becomes `https://t.me/A1exe1ch`. The email `krivchikov.alexei@gmail.com` was confirmed correct and stays. No LinkedIn: there is no profile yet.
- **folio Case study.** `folio.mdx` gains `website: https://alexei-krivchikov.vercel.app` and a `github` entry for `https://github.com/Alexei-Krivchikov/folio`, labelled `folio`. This is done only after the site is verified live, so the Case study never links to something that doesn't exist. The repository is already public.
- **README.** The stack badge says "Framer Motion 11" while the app depends on `motion` 13, and "Deployed on Vercel (free)" is a plan, not a link. Both are brought in line, and the README gets the live URL. Other sections are left alone.
- **ADR 0005.** Records Vercel Hobby with `*.vercel.app` until a custom domain is bought, why Git integration was chosen over the CLI, and that Vercel Web Analytics was chosen over cookie-based alternatives. Numbered after the highest existing ADR (0004).
- **Verification is part of the spec.** The last ticket checks the live site and is the only one that can close the spec.

## Testing Decisions

- As in earlier specs: Biome, `tsc`, a Turbo build of the web app, and a browser pass. The repo has no test runner and this spec does not add one.
- Most of this spec can only be checked against the live site, so acceptance is production verification:
  - Lighthouse in mobile mode on `https://alexei-krivchikov.vercel.app`: Performance, Accessibility, Best Practices and SEO each at 90 or above. A Performance miss caused by Lenis or animation work becomes its own ticket and does not block the spec.
  - The rendered HTML of `/` and of a Case study contains an absolute `og:image` on `alexei-krivchikov.vercel.app`, never `localhost`.
  - `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` return 200, the sitemap lists `/` and all three Case studies, and `robots.txt` names the sitemap.
  - Pasting the link into a real chat client (Telegram) shows a card with title, description and image.
  - The Contact Telegram link opens `t.me/A1exe1ch`.
  - The latest `main` commit carries a green CI check.
  - A pull request produces a preview deployment.
- Verification before commit, for the code tickets:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Real Project screenshots (spec 008).
- A custom domain and moving off `*.vercel.app`.
- Vercel Speed Insights, error tracking and any cookie-based analytics.
- A LinkedIn link, which waits for the profile to exist.
- A Resume or CV button, Hero stats, a GitHub contributions graph and the Lab.
- A light/dark theme toggle and a Russian translation.
- Making Vercel wait for CI before deploying (deployment protection rules).
- Changing the email address, which was confirmed correct.

## Further Notes

- Decisions come from the grilling session for 007.
- The site is deliberately indexable before screenshots exist. The cost is a short window in which a search result may show placeholder covers; the benefit is that indexing starts early. The link is not to be sent to recruiters until spec 008 is done.
- `alexei-krivchikov` may be taken on Vercel. If so, the fallback is chosen at deploy time in ticket 06 and `NEXT_PUBLIC_SITE_URL` and the folio Case study links follow it.
- The Vercel Hobby plan is restricted to non-commercial use, which a personal portfolio is. ADR 0005 records this so the constraint isn't forgotten if the site ever starts to carry commercial work.
