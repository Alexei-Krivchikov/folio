# Spec 014 — Case study redesign and View Transitions

Status: Done

## Problem Statement

A recruiter who likes a card opens its Case study, and the experience drops: a plain text article in the old style with a small gallery, reached by a hard cut that has no relation to the card they clicked. The Case study is where the developer explains his work in depth, and it has none of the polish the home page now has. Moving from the card to the page should feel like opening the same object.

## Solution

The Case study page is redesigned in the Ember language: a title block with the Project's cover and a HUD meta row, comfortable reading typography for the MDX body, a larger gallery, and a big "next Project" link at the end. Moving from a Project card to its Case study, and back, plays a **view transition** in which the card's cover morphs into the Case study's cover. This uses React's `ViewTransition` component, a canary API that Next 16's App Router supports without configuration, accepted knowingly (see ADR 0006). Where the browser does not support it, or the visitor prefers reduced-motion, the navigation is a normal instant one and nothing is lost.

## User Stories

1. As a recruiter, I want the Case study to look like part of the same site, so that the quality I saw on the home page continues.
2. As a recruiter reading a Case study, I want the key facts (role, Employer or type, year, stack) in a scannable header, so that I can place the Project quickly.
3. As a recruiter, I want a larger, clearer gallery, so that I can judge the screens.
4. As a visitor, I want the card I clicked to grow into the Case study's cover, so that navigation feels continuous.
5. As a visitor, I want the same transition on the way back and to the next Project, so that browsing Projects feels like one flow.
6. As a visitor in a browser without view transition support, or with reduced-motion on, I want a normal, instant navigation, so that I lose nothing.
7. As a visitor, I want the cover, title, links and body to be in the page's HTML on arrival, so that sharing, indexing and slow connections are unaffected.
8. As the developer, I want the transition to be a few wrappers I can remove, so that a breaking change in React or Next does not break the site.

## Implementation Decisions

- **Page structure.** Back link, title block with cover and a Geist Mono meta row (type, Employer or "personal", year), the Case study links (website, GitHub) as Ember buttons, the MDX body in the readable measure already used (`max-w-3xl`), the gallery, and a prominent "Next project" block. The frontmatter schema and the MDX content are not changed.
- **MDX typography.** The `mdxComponents` map in the Case study route switches to Ember tokens and fonts, with comfortable line length and heading rhythm, and `AccentText` available for emphasis.
- **Gallery.** Larger images in a layout that keeps each screenshot at its natural aspect ratio instead of cropping every one to 16:9, with `sizes` set to what the layout really uses. No lightbox (still out of scope).
- **View transition.** No config flag is needed: Next 16.3.8 has no `experimental.viewTransition` option and enables `ViewTransition` in the App Router by default. A `ViewTransition` from React with a name derived from the Project's `slug` wraps the cover on the home card and the same cover on the Case study, so the browser morphs one into the other. Default cross-fade is used for the rest of the page. Transitions are disabled under `prefers-reduced-motion`.
- **Fallback.** No JavaScript branching decides support; where the browser lacks the View Transitions API the wrappers have no visible effect. The ticket confirms this in Firefox and in Safari, where behaviour can differ.
- **Decision record.** The canary status is recorded in ADR 0006, including how to roll back (remove the `ViewTransition` wrappers and the global CSS rules; the page stays correct).
- **Order.** This spec is deliberately late in the series so that a breaking change in the canary feature cannot block the earlier redesign steps.

## Testing Decisions

- Verification before commit: `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web`.
- Browser pass at 1440px and 375px for all three Case studies: header, body, gallery, links, next-project block; no horizontal scroll; no cropped screenshots.
- Transition pass in Chrome: card to Case study, Case study to home, and Case study to next Project each morph the cover with no flash and no layout jump; interrupting a transition by clicking again is safe.
- Fallback pass: Safari, Firefox and reduced-motion emulation navigate instantly and correctly, and the console is clean.
- A production build is exercised on the preview deployment, not only `next dev`, because the feature is canary.
- Lighthouse mobile on a Case study URL: Performance at least 90, CLS 0.

## Out of Scope

- A lightbox, zoom or video in the gallery.
- Changing Case study text or adding Projects.
- Transitions between Sections on the home page.
- Anything beyond navigation between the home page and Case study pages.
- Open Graph image changes (spec 015).

## Further Notes

- `ViewTransition` is a React canary feature; this spec accepts that on purpose. A portfolio showing the technique is an upside, and the cost of a break is limited to losing the animation.
- The first ticket re-checked the API against the Next docs: the `experimental.viewTransition` flag assumed earlier no longer exists in 16.3.8 and is not needed.
