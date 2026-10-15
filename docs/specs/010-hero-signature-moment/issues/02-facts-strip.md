# 02: Facts strip

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

The row of four concrete facts directly under the calls to action, part of the Hero Section and a plain list in the DOM. File: `apps/web/components/hero/facts-strip.tsx`, rendered by `hero.tsx`. It has no animation of its own here; ticket 03 includes it in the intro.

The four items (a short value plus a label each):

1. **3** years in production (commercial experience since 2023). The value is computed from the start year, so it is right after each build.
2. **7,000+** active users on DominoCRM, with a small source note "per domino-crm.com".
3. **3 channels · 4 UI languages** (Telegram, Web, VK).
4. **UTC+3**.

Spoken languages and a city are not shown.

The 7,000+ figure is a company marketing claim and not a personal achievement. Before it is shipped: read the product's public landing page, write the figure and the date you read it under Comments, and show the developer both the claim and a qualitative fallback (the product's three channels). The developer decides whether the figure fits the agreement with the Employer; if not, the fallback replaces it with no change to the layout.

Visual treatment: the label is a `HudLabel`, the value uses the heading sans, a thin `border-border` line sits above the strip (fine linework, as in the references). Four columns from `md` up, two by two at 375px.

## Acceptance criteria

- [ ] The strip is a `ul` with four `li` items in the initial HTML, directly under the calls to action
- [ ] The 7,000+ figure was re-read on domino-crm.com, the date is under Comments, and the developer has chosen the figure or the fallback
- [ ] The value for the years is computed from 2023 and reads 3 in the current build
- [ ] At 1440px the items sit in one row; at 375px they wrap two by two with nothing cut off and no horizontal scroll
- [ ] Text over the poster is within AA (ratios recorded)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
