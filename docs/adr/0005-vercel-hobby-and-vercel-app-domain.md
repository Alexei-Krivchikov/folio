# ADR 0005 — Vercel Hobby on a `vercel.app` address

Date: 2026-10-03
Status: Accepted

## Context

The site is feature-complete but only runs locally. It needs a public address, a deploy path and visit counting. The budget is zero, there is no custom domain yet, and the repository is public.

## Decision

- **Hosting:** Vercel Hobby, project `alexei-krivchikov`, address `alexei-krivchikov.vercel.app`, until a custom domain is bought. Moving to a domain later means changing `NEXT_PUBLIC_SITE_URL` and the domain setting in Vercel; no code edit.
- **Deploy path:** Vercel Git integration with Root Directory `apps/web`, deploying `main` to production and every pull request to a preview. Not the Vercel CLI.
- **Analytics:** Vercel Web Analytics (`@vercel/analytics`), which is cookieless, so there is no consent banner. Not a cookie-based tool.
- **Plan restriction:** the Hobby plan is for non-commercial use only. A personal portfolio satisfies this; the constraint must be revisited if the site ever carries commercial work.

## Alternatives

- Deploy with the Vercel CLI from CI — needs a token stored as a secret and gives up automatic preview deployments per pull request.
- Cookie-based analytics (Google Analytics and similar) — richer data, but requires a consent banner and adds third-party cookies to a portfolio meant to look clean.
- Buy a custom domain now — cost and setup for no gain before the site is shown to anyone.
- Vercel Pro — removes the non-commercial restriction, but costs money the site does not need.

## Consequences

+ Zero cost, zero infrastructure to maintain
+ Every pull request gets a preview URL without extra setup
+ No cookies, no consent banner
+ Switching to a custom domain is a configuration change
- The `vercel.app` address looks less professional than a custom domain
- Hobby plan limits and its non-commercial clause apply
- Deploys are tied to Vercel's Git integration, with no deploy step in the repository to review
