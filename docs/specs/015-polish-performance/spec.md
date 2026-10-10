# Spec 015 — Polish and performance

Status: Draft

## Problem Statement

After specs 009 to 014 every visible part of the site has been redesigned, but the pieces that surround the page still wear the old look: the Open Graph images, the favicon and Apple icon, the web manifest colours and the 404 page. The Lighthouse targets are a promise made in every spec and nothing checks them across releases. The finished site has also never been walked through end to end on a real phone, in Safari and in Firefox as one product.

## Solution

A closing pass. The generated Open Graph images, icons, manifest colours and not-found page are restyled in Ember. A Lighthouse CI job is added to GitHub Actions as a report that does not block merges. The whole site gets a final cross-device, cross-browser and accessibility pass at the real address, and the project documentation (README, architecture, the CONTEXT glossary if needed) is brought up to date with what was built.

## User Stories

1. As a recruiter pasting the link into a chat, I want the preview card to look as good as the site, so that the link itself makes a first impression.
2. As a visitor, I want the browser tab icon and the home-screen icon to match the site, so that it looks consistent from the first pixel.
3. As a visitor who lands on a missing page, I want a 404 that feels like the same site, so that a typo does not look like a broken one.
4. As the developer, I want every pull request to report Lighthouse scores, so that I notice a regression when it is introduced and not after a recruiter does.
5. As a visitor on a phone, I want the final site to be fast and smooth, so that the promise of the earlier specs holds as a whole.
6. As a visitor in Safari or Firefox, I want the site to look and work correctly, so that the browser I use does not matter.
7. As a visitor using the keyboard or a screen reader, I want the whole site to pass an accessibility check, so that the redesign is open to everyone.
8. As a reader of the repository, I want the README and architecture document to describe the site as it is, so that nothing in them is stale.

## Implementation Decisions

- **Open Graph and icons.** The generated images (`opengraph-image.tsx` for the site and for Case studies, `og-template.tsx`) and the icons (`icon.tsx`, `apple-icon.tsx`) are restyled with the Ember palette and the display font, still produced from code through `next/og` as ADR 0004 requires. The font file used by the OG renderer is loaded from the repository and not fetched at runtime.
- **Manifest and theme.** `manifest.ts` colours and the document `theme-color` follow the Ember background.
- **Not-found page.** Restyled with the tokens, fonts and a short HUD-style message, keeping its link home.
- **Lighthouse CI.** A new job in `.github/workflows/` runs Lighthouse against the Vercel preview or a local production build and posts the scores as a report. It does not fail the pull request: a hard gate would flake on shared runners and is deferred until the scores are known to be stable. The existing `check` job is unchanged.
- **Cleanup.** Unused old styles, `zinc-*` leftovers, dead helpers and any unused dependency are removed. Bundle sizes of the home page and a Case study are compared with the numbers recorded before spec 009.
- **Final passes.** One written checklist, run at the production address: 1440px and 375px; a mid-range Android phone; Safari (macOS or iOS), Firefox and Chrome; keyboard-only; a screen reader; reduced-motion; slow 4G throttling. Findings that are small are fixed here; anything bigger becomes its own ticket.
- **Documentation.** `README.md` (stack badges and description, the roadmap line), `docs/architecture.md` (styling and animation section, the shader, the new primitives in `packages/ui`) and `CONTEXT.md` (any term that settled during the build) are updated. The status of specs 009 to 015 is set to Done as each closes.

## Testing Decisions

- Verification before commit: `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web`.
- Production acceptance at `https://alexei-krivchikov.vercel.app`:
  - Lighthouse mobile: Performance, Accessibility, Best Practices and SEO each at 90 or above on `/` and on a Case study; LCP at most 2.5 s; CLS 0.
  - The rendered HTML of `/` and of a Case study contains an absolute `og:image`, and the image renders in the new style.
  - Pasting the link into Telegram shows the new preview card.
  - `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` still answer 200.
  - The Lighthouse CI job appears on a pull request and reports without failing it.
- The cross-device checklist above is completed and its results are written under the closing ticket's `## Comments`.

## Out of Scope

- A hard Lighthouse gate in CI.
- A custom domain, a Russian translation, a light theme.
- Blog, Guestbook, the Lab, and the 3D object for the Hero (all candidates for later specs).
- New features of any kind; this spec only finishes what 009 to 014 started.

## Further Notes

- After this spec the link is ready to send to recruiters. Until then it is shared only for review.
- The next candidates after 015, none decided: a 3D object as a second iteration of the Hero's Signature moment, and the Lab described in `CONTEXT.md`.
