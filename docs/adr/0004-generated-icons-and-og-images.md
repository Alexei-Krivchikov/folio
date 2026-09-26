# ADR 0004 — Icons and preview images generated from code

Date: 2026-09-26
Status: Accepted

## Context

The site needs a favicon, an Apple touch icon, and (in a follow-up ticket) Open Graph preview images. These could be designed once as static binaries and committed to `public/`, or generated at build/request time from code via `next/og`.

## Decision

- All icons (`app/icon.tsx`, `app/apple-icon.tsx`) and OG images are generated through `next/og`'s `ImageResponse`, not stored as binary assets.
- `public/` holds nothing but Project case-study screenshots — no `.ico`, no PNG icons, no OG image files.

## Alternatives

- Design and commit static icon/OG PNGs — one-time design effort, but any copy or theme colour change means re-exporting and re-committing binaries.

## Consequences

+ Icons and OG images stay in sync with the site's colours/typography automatically
+ No binary assets to regenerate by hand when branding changes
- Slightly more render cost per request for OG images (cached by Next.js/Vercel)
