# Spec 005 — Projects and Case studies

Status: Done

## Problem Statement

The home page says who the developer is, which technologies they use, and where they work, but it never shows what they have built. A recruiter can't see any real Project, can't tell Commercial work from Personal work, and can't open code or a live demo. Without a Projects Section and a Case study per Project, the site can't back up the claims made in Hero, About, Stack, and Experience, and the MVP isn't complete.

## Solution

Between Experience and Contact, a "Projects" Section shows three cards in a fixed order: `_01.` DominoCRM (Commercial project, Employer: Anthill), `_02.` Book Tracker (Personal project), and `_03.` folio (Personal project). Each card shows the number, name, type, year, a one-line description, stack tags, and a preview screenshot. The whole card is one link. Cards cascade in on scroll, and on hover a card lifts and its preview zooms in slightly.

Clicking a card opens that Project's Case study at `/projects/<slug>`. The page is laid out top to bottom: a Back link and the title; type, year, and GitHub/Website links where they exist; About; Tech stack; Key features; My role and technical highlights; a screenshot gallery; and a link to the next Project. Case study content is written in MDX files and validated against a typed frontmatter schema, so a broken or incomplete Project fails the build and never reaches the site.

The DominoCRM Case study follows the Commercial project rules. It describes the product, the public landing page link, the developer's role, the stack, the features, and the technical highlights in prose only. It has no source code, no repository link, no internal details, and only screenshots of publicly shown UI.

## User Stories

1. As a recruiter, I want a Projects Section on the home page, so that I can see what the developer has actually built.
2. As a recruiter, I want the Projects Section to come after Experience and before Contact, so that I read the work before I'm asked to get in touch.
3. As a recruiter, I want Projects shown in a fixed, numbered order (`_01.`, `_02.`, `_03.`), so that the strongest work comes first and the list reads as deliberate.
4. As a recruiter, I want each card to say whether it is Commercial or Personal, so that I can tell production work at an Employer from self-driven work.
5. As a recruiter, I want each card to show the year, so that I can judge how recent the work is.
6. As a recruiter, I want a one-line description on each card, so that I know what a Project is without opening it.
7. As a recruiter, I want stack tags on each card, so that I can match Projects against the technologies in a job description.
8. As a recruiter, I want a preview screenshot on each card, so that I get a visual sense of the product at a glance.
9. As a visitor, I want the whole card to be clickable, so that I don't have to aim for a small button.
10. As a visitor, I want no buttons or nested links inside a card, so that a click always does the same thing: open the Case study.
11. As a visitor, I want cards to cascade in when the Section scrolls into view, so that the motion matches Stack and Experience.
12. As a visitor, I want the cascade to play only once, so that it doesn't repeat every time I scroll past.
13. As a visitor, I want a card to lift and its preview to zoom in slightly on hover, so that it's clear the card is interactive.
14. As a keyboard user, I want to tab to each card and open it with Enter, with a visible focus state, so that the Section works without a mouse.
15. As a recruiter, I want a dedicated Case study page per Project, so that I can go deeper into the Projects that interest me.
16. As a visitor, I want each Case study to have a readable, stable URL (`/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio`), so that I can share or bookmark a specific Project.
17. As a visitor, I want a Back link at the top of a Case study, so that I can return to the home page Projects Section.
18. As a recruiter, I want the title, type, and year at the top of a Case study, so that the context is set before I read.
19. As a recruiter, I want GitHub and Website links near the top when they exist, so that I can jump straight to the code or the live product.
20. As a recruiter, I want missing links to be left out entirely, so that I don't see empty or disabled placeholders.
21. As a recruiter, I want an About part that explains what the product is and who it's for, so that I understand the problem it solves.
22. As a recruiter, I want a Tech stack part, so that I can see the full set of technologies, not just the card tags.
23. As a recruiter, I want a Key features part, so that I can see what the product does from a user's point of view.
24. As a recruiter, I want a "My role and technical highlights" part, so that I can see what the developer personally owned and which engineering problems they solved.
25. As a recruiter, I want a screenshot gallery, so that I can see the product's UI in more detail than the card preview shows.
26. As a visitor, I want a link to the next Project at the bottom of a Case study, so that I can move through all Projects without going back to the home page.
27. As a visitor on the last Project, I want the next-project link to wrap around to the first, so that the chain never dead-ends.
28. As a visitor who opens an unknown `/projects/<slug>`, I want the standard 404 page, so that broken links fail clearly.
29. As a recruiter, I want the DominoCRM Case study to describe a multichannel chatbot builder and CRM (Telegram, Web, VK) with a link to its public landing page, so that I understand the product without needing access to it.
30. As a recruiter, I want DominoCRM to show the Employer (Anthill), so that it matches the Experience Section.
31. As the Employer, I want the DominoCRM Case study to contain no source code, no repository link, no internal architecture, and no non-public screenshots, so that nothing under NDA leaks.
32. As a recruiter, I want DominoCRM's technical highlights described in words (for example the visual flow builder, real-time conversations, group chats, broadcasts, AI assistants, Telegram Mini App, localisation into four languages), so that I can judge the complexity of the work without seeing internals.
33. As a recruiter, I want Book Tracker presented as one Project covering both its frontend and its API, so that I see a full-stack Project rather than two half-projects.
34. As a recruiter, I want Book Tracker to link to both repositories (UI and API) and to its live demo, so that I can inspect the code on both sides and try the product.
35. As a recruiter, I want Book Tracker's stack to cover both sides (Next.js 16, TanStack Query, NextAuth, shadcn/ui, Feature-Sliced Design; NestJS, Prisma, PostgreSQL, JWT), so that the full-stack claim is concrete.
36. As a recruiter, I want folio itself listed as a Project with its repository and live URL, so that I can see how the site I'm looking at was built.
37. As the developer, I want the folio GitHub link to be optional until the repository is public, so that the Case study doesn't point to a private repo before deploy.
38. As the developer, I want each Project's content in its own MDX file, so that editing a Case study is a single-file change with no component edits.
39. As the developer, I want frontmatter validated by a schema at build time, so that a missing field, a wrong type value, or a duplicate order number fails the build instead of rendering a broken card.
40. As the developer, I want the card and the Case study header to read from the same frontmatter, so that name, type, year, and stack never disagree between the two.
41. As the developer, I want screenshots stored per Project in a predictable place, so that I can drop in real images later without touching code.
42. As the developer, I want the site to build and render with placeholder screenshots until I provide real ones, so that implementation isn't blocked on assets.
43. As the developer, I want the agent to draft all three Case study texts, so that I only have to edit rather than write from scratch.
44. As a search engine or link preview, I want each Case study to have its own page title and description, so that shared links are descriptive.
45. As a visitor on a slow connection, I want preview and gallery images to be optimised and lazy-loaded below the fold, so that pages stay fast.
46. As a visitor on a phone, I want the cards to stack into a single column and the Case study to stay readable, so that the Section works on mobile (full 375px polish is covered by spec 006).

## Implementation Decisions

- **Content layer: content-collections.** Add `@content-collections/core`, `@content-collections/mdx` and `@content-collections/next` (which supports Next 16) to the web app. A single `projects` collection reads MDX files from the web app's content directory. The Next config is wrapped with the content-collections plugin, and the generated collection is imported through its path alias. This fits ADR 0003 (static, no DB, no API) and the content plan in `architecture.md`.
- **Project frontmatter schema (zod), the single source of truth for cards and Case study headers:**
  - `slug`: kebab-case string, unique; used in the URL
  - `order`: positive integer, unique; drives the `_01.` number and sort order
  - `name`: string
  - `type`: `"commercial" | "personal"`, the discriminant for Commercial project vs Personal project
  - `year`: string, a single year or a range (`2026`; DominoCRM uses `2023 — Present` to match Experience)
  - `summary`: one line, used on the card and as the meta description
  - `stack`: non-empty string array; the card shows a limited number of tags, the Case study shows all of them
  - `employer`: string, required when `type` is `commercial` and absent otherwise
  - `links`: optional `github` (one or more labelled repository URLs, for Book Tracker's UI + API) and optional `website` URL. A `commercial` Project must not have `github`.
  - `cover`: image path for the card preview
  - `gallery`: array of `{ src, alt }`, may be empty
  - The collection transform compiles the MDX body. After loading, uniqueness of `slug` and `order` is enforced and the build throws on a violation.
- **MDX body sections, as fixed H2 headings in this order:** About → Tech stack → Key features → My role and technical highlights. Header, links, gallery, and next-project link are rendered by the page from frontmatter, not written in MDX, so every Case study has the same layout.
- **Projects query module.** One small server-side module over the generated collection exposes: all Projects sorted by `order`; one Project by slug (or nothing); and the next Project for a slug, wrapping around. Pages and the Section only talk to this module. This is where content rules live, so the layout components never have to handle bad data.
- **Projects Section.** A new home-page Section, placed after Experience and before Contact. A server wrapper fetches the sorted Projects and passes plain props to a client card grid (motion needs the client). Each card is a single Next `Link` wrapping the whole card: number formatted as `_0N.`, name, type label, year, summary, stack tags, and a `next/image` cover. There are no buttons or inner links. The heading follows the existing eyebrow + H2 pattern.
- **Motion.** The Section reuses the shared `fadeUp` variant with `whileInView` once and `staggerChildren` across cards, matching Stack. Hover uses `whileHover` for the lift, and the preview scales slightly inside an `overflow-hidden` frame. Cards get a visible `focus-visible` ring. There are no page transitions.
- **Case study route `/projects/[slug]`.** A statically generated App Router page: `generateStaticParams` comes from the collection, `dynamicParams` is off so unknown slugs 404, `params` is awaited (Next 16), and `generateMetadata` uses name + summary. Layout, top to bottom: Back link to `/#projects`; title; type label (with Employer for Commercial projects); year; link row that shows only the links that exist; compiled MDX body; screenshot gallery via `next/image`; next-project link.
- **Section anchor.** The Projects Section gets `id="projects"` so the Back link (and later the header and Hero CTA in spec 006) can target it.
- **Assets.** Screenshots live under the web app's public folder, one subfolder per slug. Until the developer provides real images, one neutral placeholder is referenced so builds pass. For DominoCRM, only publicly shown UI is allowed (landing page, public YouTube material).
- **Content drafts (agent-written, developer-edited):**
  - DominoCRM: Commercial project, Employer Anthill, website `https://domino-crm.com`, no GitHub. It is a no-code chatbot builder and multichannel CRM for Telegram, Web and VK. The stack is described at the level of React, TypeScript, Redux Toolkit + Redux Saga, Chakra UI, SignalR, i18next, and Telegram Mini Apps. Role and highlights are described in prose only (for example the visual flow builder, real-time chats and group chats with topics, broadcasts and auto-broadcasts, AI assistants, contact management with complex filters, and loading/skeleton consistency). Nothing is internal.
  - Book Tracker: Personal project, 2026, GitHub links `book-tracker-ui` and `book-tracker-api`, website `https://book-tracker-ui.vercel.app`. Features come from both READMEs: auth with access + refresh tokens, book search, a personal library with statuses and ratings, and cached requests.
  - folio: Personal project, 2026, website = its Vercel URL (filled in by spec 007), GitHub left out until the repo is public. Content comes from `architecture.md`, ADRs and specs 001–005.
- **Glossary.** The Section and the pages use the `CONTEXT.md` terms (Project, Commercial project, Personal project, Employer, Case study). UI labels read "Commercial" and "Personal".

## Testing Decisions

- A good check proves external behaviour: what a recruiter sees and what the build accepts. It does not check component internals. The repo has no test runner, and this spec doesn't add one.
- **Single seam: the content schema plus a static build.** The zod frontmatter schema and the post-load uniqueness checks run inside `next build`. Invalid content (missing field, unknown `type`, `employer` missing on a Commercial project, `github` on a Commercial project, duplicate `slug` or `order`) must fail the build with a readable error. `generateStaticParams` with `dynamicParams` off proves every Project gets a page and unknown slugs don't.
- Prior art: specs 001–004 check with Biome, `tsc`, a Turbo build of the web app, and a manual browser pass. This spec keeps that approach and adds the schema to the build.
- Acceptance:
  - `pnpm dev` → `/` shows the Projects Section between Experience and Contact, with three cards in order `_01.` DominoCRM, `_02.` Book Tracker, `_03.` folio; the cards cascade in once on scroll
  - Each card shows number, name, type, year, summary, stack tags, and preview; hovering lifts the card and zooms the preview; the whole card is one link; Tab + Enter works with a visible focus ring
  - `/projects/dominocrm`, `/projects/book-tracker`, `/projects/folio` render the header, links (only those that exist), About, Tech stack, Key features, My role and technical highlights, gallery, and next-project link; folio's next link goes to DominoCRM
  - `/projects/unknown` returns 404
  - The DominoCRM page has no repository link, no code, and no internal details
  - Temporarily breaking a frontmatter field (for example `type: client`) makes the build fail; reverting it makes the build pass
  - At a narrow viewport the cards are a single column
  - `biome check`, `tsc`, and `turbo build --filter=@folio/web` pass
- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Sticky header, Hero CTA wiring, Lenis scroll to `#projects`, stack logos, the full 375px mobile pass, favicon, and per-Case-study OG images (spec 006).
- Deploy, the Vercel URL for folio, and making the folio repository public (spec 007).
- Page transitions between home and Case studies.
- Filtering, tags pages, search, or more than three Projects.
- Lightbox or carousel behaviour for the gallery beyond a simple image grid.
- Real screenshots. The developer provides them; this spec ships with placeholders.
- Hero stats, a GitHub contributions graph, a Resume button, a custom domain, and the Lab.

## Further Notes

- References: sayedanowar.netlify.app for the card style, tajmirul.site for the Case study layout.
- Decisions come from the grilling session recorded in the 005 handoff. Test seam agreed with the developer: schema + build.
- DominoCRM context comes from the domino-ui repository (the developer is among its top contributors; most of their work is in the flow builder, group chats, automation, conversations, and broadcasts) and from the public landing page. Only publicly describable facts go into the Case study.
- Year for DominoCRM: `2023 — Present`, matching Experience (confirmed by the developer; commits under their current git identity only start in 2025).
- Book Tracker repositories were created in May 2026. The content-collections Next 16 compatibility was stated in the handoff; confirm the plugin version at install time.
