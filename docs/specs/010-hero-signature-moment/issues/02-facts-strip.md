# 02: Facts strip

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 01

**Status:** ready-for-human

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

- [x] The strip is a `ul` with four `li` items in the initial HTML, directly under the calls to action
- [x] The 7,000+ figure was re-read on domino-crm.com, the date is under Comments, and the developer has chosen the figure or the fallback
- [x] The value for the years is computed from 2023 and reads 3 in the current build
- [x] At 1440px the items sit in one row; at 375px they wrap two by two with nothing cut off and no horizontal scroll
- [x] Text over the poster is within AA (ratios recorded)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### The 7,000+ figure

Read domino-crm.com on 2026-10-15 with a web fetch: the page shows "7 000+" under the label "Active users", in the block headed "Tested by thousands of users" (next to "5 000+" mailings sent and "23 000+" bots created). The page gives no date for the figures. The title of the page is "Chatbot Builder for Telegram, Web, VK", which backs the three channels; the site switcher offers four languages (English, Russian, Uzbek, Kazakh), and the DominoCRM case study on this site says the product is localised into four languages with i18next.

Decision: the developer decided the figure can be used because it is on the public site ("на сайте есть значит можно юзать"), so the figure is in with the small note "per domino-crm.com" and the qualitative fallback was not needed.

### Implementation

- `facts-strip.tsx` (new, server component): a `ul` with four `li`, one per fact. The value is `text-3xl md:text-4xl font-semibold`, the label is a `HudLabel as="p"` (Geist Mono, uppercase), the 7,000+ item has a muted note line under it. A `border-t border-border` line sits above the strip. Four columns from `md`, two by two below.
- Years: `new Date().getFullYear() - 2023`, evaluated on the server at build time, so it reads 3 now and updates on the first build of 2027. The strip is passed to `Hero` as a `facts` prop from `app/page.tsx` instead of being imported into the client component, so the current year is computed once on the server and cannot differ from a client render (no hydration mismatch at New Year).
- `hero.tsx` renders `{facts}` in a `motion.div` with the existing `item` variant right after the calls to action (`mt-14`, `md:mt-20`); no new animation.
- Item 3 reads "3 channels" with the label "4 UI languages · Telegram, Web, VK". Spoken languages and a city are not shown.

### Verification

- Server-rendered HTML contains the `ul` with four `li` after the "View Projects" link.
- 1440px: one row of four columns, 226px each, the strip's top at 640px, the Hero still exactly one viewport (900px) tall. 375px: two by two, 152px columns, nothing clipped (no label wider than its box), no horizontal scroll; the whole Hero including the strip fits in the 812px first screen.
- Contrast: the labels and the note are the muted colour, at least 4.91:1 over the brightest part of the poster (computed in ticket 01); the values are foreground, at least 11.92:1.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
