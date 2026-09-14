# Spec 002 — Hero + About (Motion lesson 1)

Status: Done

## Problem Statement

The site only shows a `folio — scaffold OK` placeholder. A recruiter landing on it learns nothing about who the developer is. The first two MVP sections, Hero and About, are needed, following the tajmirul.site reference.

## Solution

The home page opens with an animated Hero: a badge, greeting, the "FRONTEND DEVELOPER" headline, a short description, and a call-to-action button, appearing as a staggered cascade on load. Below it, an About section fades in once as the visitor scrolls to it.

## User Stories

1. As a recruiter, I want to see the developer's role in a large headline as soon as the page loads, so that I know immediately who this portfolio belongs to.
2. As a recruiter, I want a short description under the headline, so that I understand the developer's focus in a few seconds.
3. As a recruiter, I want a clear call-to-action button in the Hero, so that I know where to go next.
4. As a visitor, I want the Hero elements to appear one after another (badge → greeting → headline → description → CTA), so that the page feels polished rather than static.
5. As a visitor, I want the About section to animate in when I scroll to it, so that scrolling feels alive.
6. As a visitor, I want the About animation to play only once, so that scrolling back up and down isn't distracting.
7. As the developer, I want the CTA to use the shared `Button` from `@folio/ui`, so that buttons look the same across the site.
8. As the developer, I want the home page to be a plain composition of section components, so that adding the next sections is a one-line change.

## Implementation Decisions

- Two new client components in the web app: a Hero section and an About section.
- Hero uses Motion with a parent container and staggered children, in the order badge → greeting → H1 → description → CTA.
- About uses Motion `whileInView` with a once-only viewport, so it animates a single time.
- The home page composes `<Hero />` followed by `<About />`.
- The web app gains dependencies on `motion` and `@folio/ui` (`workspace:*`).

## Testing Decisions

- No automated tests; behaviour is verified manually in the browser plus static checks.
- Acceptance:
  - `pnpm dev` → `/` shows FRONTEND DEVELOPER with the cascade on load
  - Scrolling reveals About smoothly, once
  - `biome check`, `tsc`, and `turbo build --filter=@folio/web` pass
- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Stack, Experience, Projects, and Contact sections (later specs).
- Final copy polish and imagery.

## Further Notes

- Reference: tajmirul.site.
- Also serves as the first hands-on Motion lesson (container/stagger and `whileInView`).
- Rewritten from Russian into English and the current template without changing its decisions.
