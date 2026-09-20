# Spec 006 — Navigation and polish

Status: ready-for-agent

## Problem Statement

The home page now has every Section, but nothing ties them together. There is no Header, so a visitor who scrolls past Hero has no way back and no idea how long the page is. The two Hero buttons are dead — they look like calls to action and do nothing. The Stack Section is a wall of text tiles with no visual anchor. The site has no favicon, no OG image and no metadata beyond a title, so a shared link renders as a bare URL with a blank tab icon. An unknown `/projects/<slug>` drops the visitor onto Next's default 404, a white system page in the middle of a dark site. None of this has been checked at phone width. Until these are fixed, the site can be finished but not shown.

## Solution

A Header appears once Hero has scrolled off: the name on the left linking home, and five links — About, Stack, Experience, Projects, Contact — on the right, over a blurred background, with the current Section highlighted as the visitor scrolls. Below the desktop breakpoint the links collapse into a button that opens a full-screen Nav overlay. Both Hero buttons become real links: "Let's Talk" to `#contact`, "View Projects" to `#projects`. All anchor navigation runs through Lenis, so a click glides instead of jumping, lands clear of the Header, and works when the page is opened with a hash already in the URL — the case that matters when a Case study's Back link returns to `/#projects`. A visitor who asks the system for less motion gets no smooth scroll and no animation at all.

Every tile in the Stack Section gets its technology's logo, monochrome by default and in the brand's colour on hover. The site gets a favicon, an apple touch icon, a web manifest and Open Graph images, all generated as code rather than stored as image files, so the home page and each Case study share one template and no binary assets enter the repository. Unknown routes get a 404 page in the site's own style. Finally, the whole site is walked at 375px against a fixed checklist.

## User Stories

1. As a visitor, I want a Header with links to every Section, so that I can reach any part of the page without scrolling through all of it.
2. As a visitor, I want the Header to stay out of the way on the first screen and appear only after Hero, so that the opening view is uncluttered.
3. As a visitor, I want the Header to sit over the page with a blurred background, so that it stays readable over any Section.
4. As a visitor, I want the Header's name on the left to link to the top of the site, so that I always have a way home.
5. As a visitor, I want the link for the Section I'm currently in to be highlighted, so that I know where I am on a long page.
6. As a visitor, I want the address bar to stay clean while I scroll, so that my back button still does what I expect.
7. As a visitor on a phone, I want the Header links to collapse into a menu button, so that the Header fits the screen.
8. As a visitor on a phone, I want the menu to open full-screen with large targets, so that I can hit a link with my thumb.
9. As a visitor on a phone, I want the page behind the open menu to stay put, so that the background doesn't drift while I read the menu.
10. As a visitor on a phone, I want the menu to close when I pick a link, press Escape, or hit the close button, so that I'm never trapped in it.
11. As a keyboard user, I want to tab through the Header and the open menu with a visible focus state, so that navigation works without a mouse.
12. As a recruiter, I want the "View Projects" button in Hero to take me to the Projects Section, so that the first screen leads somewhere.
13. As a recruiter, I want the "Let's Talk" button in Hero to take me to the Contact Section, so that I can find the contact options without hunting.
14. As a visitor, I want anchor clicks to scroll smoothly rather than jump, so that the movement matches the rest of the site.
15. As a visitor, I want the target heading to land below the Header, so that the Header never covers the thing I clicked towards.
16. As a visitor returning from a Case study, I want to arrive at the Projects Section already in view, so that the Back link puts me where I left off.
17. As a visitor who has asked their system for reduced motion, I want no smooth scrolling and no entrance animation, so that the site doesn't make me ill.
18. As a recruiter, I want each technology in the Stack Section to carry its logo, so that I can scan the stack visually instead of reading every tile.
19. As a visitor, I want the logos to be monochrome until I hover one, so that the Section reads as one system rather than a sticker sheet.
20. As a visitor, I want a logo on every tile without exception, so that the row doesn't look half-finished.
21. As a visitor, I want the site to have a favicon, so that its tab is recognisable among my open tabs.
22. As a visitor who saves the site to a phone home screen, I want a proper icon and name, so that it doesn't appear as a blank square.
23. As a recruiter sharing a link in a chat or an applicant tracker, I want the home page to unfurl with a title, description and image, so that the link looks like a real site.
24. As a recruiter sharing a specific Case study, I want that Project's own image, so that the preview shows which Project I meant.
25. As the developer, I want every icon and preview image generated from code, so that no binary assets have to be produced, sized and kept in sync by hand.
26. As the developer, I want the production URL to come from an environment variable, so that deploying doesn't require a code change.
27. As a visitor who follows a dead link, I want a 404 page in the site's own style with a way back to the home page, so that a broken link doesn't look like a broken site.
28. As a visitor on a 375px phone, I want every Section readable with nothing cut off, nothing overlapping and no sideways scrolling, so that the site works where most people will open it.
29. As a visitor on a 320px phone, I want the page to at least not scroll sideways, so that the oldest small screens stay usable.

## Implementation Decisions

- **One Header component, home page only.** The Header mounts in the home page (not the root layout), so Case study pages keep their own "← Back" affordance and never show anchor links that point at a different page. It is fixed, hidden until Hero has left the viewport (an `IntersectionObserver` on Hero, or a scroll threshold tied to Hero's height), then fades in with a `backdrop-blur` background and a bottom border. Left: "Alexei Krivchikov" linking to `/`. Right: About, Stack, Experience, Projects, Contact.
- **Section anchors.** Every Section gets an `id` (`hero`, `about`, `stack`, `experience`, `projects`, `contact`); `projects` already exists. These ids are the only contract between the Header, the Hero buttons and the Case study Back link.
- **Scroll module.** The existing `LenisProvider` exposes its instance through a React context. One `useAnchorScroll` hook attached at the home page level handles all three cases: a delegated click handler on `a[href^="#"]` that prevents the native jump and calls `lenis.scrollTo(target, { offset })`; a single `HEADER_OFFSET` constant next to the Header's height (the offset lives in the Lenis call, not in CSS `scroll-mt-*`, so the height is written once); and a mount-time read of `location.hash` that calls `lenis.scrollTo(hash, { immediate: true })`, which is what makes `/#projects` land correctly when arriving from a Case study.
- **Active Section.** An `IntersectionObserver` over the Sections marks the current one and the Header highlights that link. The URL hash is never rewritten while scrolling — no `history.replaceState`, so the back button and the Case study round trip stay predictable.
- **Nav overlay.** Below `md` the links are replaced by a menu button that opens a full-screen overlay: the five links at large type, a close button, close on link click and on `Escape`, focus moved into the overlay and returned to the button on close, and `lenis.stop()` / `lenis.start()` around open and close so the page behind does not drift.
- **Hero buttons become links.** `@folio/ui` already exports `buttonVariants`, so Hero renders `next/link` elements with `className={buttonVariants({ variant })}`. The `Button` component is not changed and `@radix-ui/react-slot` is not added — `asChild` waits until a third case needs it.
- **Reduced motion.** One `usePrefersReducedMotion` hook. When set: `LenisProvider` does not instantiate Lenis (anchor clicks fall back to native scrolling without smooth behaviour), and the shared animation variants collapse to their final state with zero duration, so the `whileInView` cascades in Stack, Experience, Projects and Contact render statically.
- **Stack icons.** `@icons-pack/react-simple-icons` (tree-shaken, so only the used icons ship). Every tile carries an icon: sixteen of the seventeen technologies exist in Simple Icons; **Motion** does not (the package split from Framer and has no icon of its own), so one hand-made `motion.svg` ships as a local component. The tile data type therefore models the icon as a component, not a lookup by name, and the type makes the icon required — a new technology without an icon fails to compile rather than rendering a bald tile.
- **Icon colour.** Icons render in `currentColor` (zinc-300) and take their brand colour on hover, alongside the existing `y: -4` lift. Brands whose colour is black or near-black on a dark background (Next.js, Vercel, Express, Biome) map to white in a single overrides map.
- **Icons stay in the Stack Section.** Project card tags and the Case study Tech stack come from MDX frontmatter strings and keep no icons: making those strings keys into an icon registry would either drop icons silently on a typo or require validating frontmatter against the registry. That is a feature, not polish.
- **Metadata.** `metadataBase` reads `NEXT_PUBLIC_SITE_URL` with a `http://localhost:3000` fallback, so spec 007 sets an environment variable rather than editing code. The root metadata gains `openGraph` and `twitter` (`summary_large_image`); `generateMetadata` on the Case study route already supplies per-page title and description.
- **Icons and previews as code.** `app/icon.tsx`, `app/apple-icon.tsx` and `app/manifest.ts` generate an "AK" monogram through `next/og`; `app/opengraph-image.tsx` and `app/projects/[slug]/opengraph-image.tsx` share one 1200×630 template (name, type, year, stack for a Project; name and role for the home page). No `.ico` and no binary icon assets. An ADR records the "images are code" decision, because it explains why `public/` stays empty apart from Project screenshots.
- **404.** `app/not-found.tsx` in the site's own dark style, with a link back to the home page. It covers unknown `/projects/<slug>` (the route already sets `dynamicParams = false`) and every other unknown path.
- **Glossary.** `CONTEXT.md` gains **Header** (the fixed bar with links to the Sections, shown after Hero) and **Nav overlay** (the full-screen mobile menu).

## Testing Decisions

- As in specs 001–005: Biome, `tsc`, a Turbo build of the web app, and a manual browser pass. The repo has no test runner and this spec does not add one.
- Most of this spec is visual and behavioural, so acceptance is a browser pass with screenshots at 1440px and 375px. The exception is Open Graph, which is invisible in the browser and therefore gets two explicit checks: both image routes return a 1200×630 PNG, and the rendered HTML carries an absolute `og:image`.
- **Mobile checklist (375×812), per Section:** Hero (H1 size, both buttons wrapping cleanly, the "Available for…" badge), About, Stack (tiles with icons do not overflow), Experience, Project cards (single column, covers intact), Contact (three pills), Footer, Header and the open Nav overlay, the Case study page (title, link row, gallery in one column) and the 404 page. Criteria: no horizontal scrolling, touch targets at least 44px, nothing clipped or overlapping.
- **320px:** one criterion only — no horizontal scrolling.
- Acceptance:
  - Scrolling past Hero reveals the Header; clicking each link glides to its Section and lands clear of the Header; the current Section's link is highlighted; the URL hash does not change while scrolling
  - Below `md` the links become a menu button; the overlay opens full-screen, closes on link click, on `Escape` and on the close button, and the page behind does not move while it is open
  - Hero's "View Projects" reaches the Projects Section and "Let's Talk" reaches Contact
  - Opening `/#projects` directly, and arriving there via a Case study's Back link, both land on the Projects Section
  - With reduced motion enabled at the OS level, there is no smooth scrolling and no entrance animation anywhere
  - Every Stack tile shows a logo; logos are monochrome and take their brand colour on hover, with no invisible black logos
  - The tab shows a favicon; `/manifest.webmanifest` returns the site name and icons
  - `curl -I` on `/opengraph-image` and `/projects/dominocrm/opengraph-image` returns `image/png`, and the rendered HTML of `/` and of a Case study contains an absolute `og:image` URL
  - `/does-not-exist` and `/projects/unknown` render the site's own 404 with a working link home
  - The 375px checklist passes for every Section and page; at 320px there is no horizontal scrolling
  - `biome check`, `tsc` and `turbo build --filter=@folio/web` pass
- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Deploy, the production domain, setting `NEXT_PUBLIC_SITE_URL` in Vercel, and filling in folio's own website link (spec 007).
- Logos on Project card tags and on the Case study Tech stack.
- `asChild` support in `@folio/ui`'s `Button`.
- Page transitions between the home page and Case studies.
- A light/dark theme toggle; the site is dark only.
- Real Project screenshots, which the developer supplies.
- Hero stats, a GitHub contributions graph, a Resume button, a custom domain, and the Lab.

## Further Notes

- Decisions come from the grilling session for 006.
- Icon coverage was checked against the Simple Icons slug list: `javascript`, `typescript`, `react`, `nextdotjs`, `tailwindcss`, `sass`, `nodedotjs`, `express`, `postgresql`, `drizzle`, `prisma`, `git`, `docker`, `vercel`, `biome`, `turborepo` all exist. Only Motion is missing; `framer` exists but names a different product and is not used.
- The Header is deliberately absent from Case study pages. If a later spec adds it there, the anchor links have to become `/#id` links, and the mount-time hash handling in the scroll module is what will make them work.
