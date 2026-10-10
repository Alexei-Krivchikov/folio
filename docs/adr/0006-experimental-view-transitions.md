# ADR 0006 — Accept experimental View Transitions for Case study navigation

Date: 2026-10-10
Status: Accepted

## Context

The visual upgrade (specs 009 to 015) wants the cover of a Project card to morph into the cover of its Case study when the visitor opens it. Next.js 16 supports this through the `experimental.viewTransition` flag and React's `ViewTransition` component. The Next documentation labels the feature experimental and not recommended for production. The site is a personal portfolio on Vercel Hobby with no users to protect from a regression beyond the developer's own reputation.

## Decision

- Enable `experimental.viewTransition` in `apps/web/next.config.ts` and use React's `ViewTransition` for the card-to-Case-study navigation, in spec 014.
- Keep the change isolated: the flag, the wrappers around the two covers, and nothing else. Without the feature or without browser support the navigation is a normal instant one and the site stays correct.
- Schedule it as the last visual step before polish, so a break in the experimental API cannot block the rest of the redesign.
- Disable the transition under `prefers-reduced-motion`.

## Alternatives

- Wait until the feature is stable — safest, but the portfolio loses a visible, modern detail for an unknown time.
- Shared-element animation with Motion `layoutId` — works inside one page but does not carry across App Router route changes without a persistent layout wrapper, which adds more complexity than the effect is worth.
- No transition between pages — simplest, and what the site has today.

## Consequences

+ A visible, current technique that a tech lead reading the repository will recognise
+ Zero cost to browsers without support
+ Rollback is removing one flag and a few wrappers
- An experimental API can change or break on a Next upgrade, so Next upgrades need a manual check of Case study navigation
- Safari behaviour can differ and has to be tested explicitly
