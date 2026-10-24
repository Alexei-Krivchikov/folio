# ADR 0006 — Accept React View Transitions for Case study navigation

Date: 2026-10-10
Status: Accepted

## Context

The visual upgrade (specs 009 to 015) wants the cover of a Project card to morph into the cover of its Case study when the visitor opens it. Next.js 16 supports this through React's `ViewTransition` component, which the App Router runs on the bundled React canary. Next 16.3.8 has no `experimental.viewTransition` config option (checked in ticket 01 of spec 014); its view transitions guide says the feature works in the App Router with no configuration. React's `ViewTransition` is a canary feature, so its API can still change. The site is a personal portfolio on Vercel Hobby with no users to protect from a regression beyond the developer's own reputation.

## Decision

- Use React's `ViewTransition` for the card-to-Case-study navigation, in spec 014. No `next.config.ts` change is needed.
- Keep the change isolated: the wrappers around the two covers, a few lines of global CSS, and nothing else. Without the feature or without browser support the navigation is a normal instant one and the site stays correct.
- Schedule it as the last visual step before polish, so a break in the experimental API cannot block the rest of the redesign.
- Disable the transition under `prefers-reduced-motion`.

## Alternatives

- Wait until the feature is stable — safest, but the portfolio loses a visible, modern detail for an unknown time.
- Shared-element animation with Motion `layoutId` — works inside one page but does not carry across App Router route changes without a persistent layout wrapper, which adds more complexity than the effect is worth.
- No transition between pages — simplest, and what the site has today.

## Consequences

+ A visible, current technique that a tech lead reading the repository will recognise
+ Zero cost to browsers without support
+ Rollback is removing a few wrappers and the global CSS rules
- A canary API can change or break on a Next upgrade, so Next upgrades need a manual check of Case study navigation
- Safari behaviour can differ and has to be tested explicitly
