# 01: Tracer bullet — content layer + folio Project end to end

**Spec:** [005-projects](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** Done

## What to build

The thinnest complete path from an MDX file to what a recruiter sees. After this ticket, the home page has a Projects Section with one simple card for folio, and clicking it opens a working folio Case study.

- The web app has content-collections set up (core, MDX, and the Next plugin), with a single `projects` collection and the zod frontmatter schema from the spec: `slug`, `order`, `name`, `type` (`commercial | personal`), `year`, `summary`, `stack`, optional `employer`, optional `links` (`github` list, `website`), `cover`, `gallery`. Commercial-only rules are left to ticket 03.
- A small server-side projects query module over the generated collection exposes: all Projects sorted by `order`, and one Project by slug (or nothing). The next-project lookup comes in ticket 02.
- One MDX file for folio (Personal project, `2026`, no GitHub link yet, website left out until spec 007). Its body is drafted from `architecture.md`, the ADRs, and specs 001–005, with H2 sections in this order: About → Tech stack → Key features → My role and technical highlights.
- A Projects Section with `id="projects"`, placed after Experience and before Contact. It uses the existing eyebrow + H2 heading pattern. The folio card is a single link showing `_03.`, name, type label ("Personal"), year, and summary. No image, tags, or motion yet (ticket 04).
- A statically generated Case study route `/projects/[slug]`: `generateStaticParams` comes from the collection, dynamic params are off, and `params` is awaited. The layout is a Back link to `/#projects`, the title, the type label and year, then the compiled MDX body.

## Acceptance criteria

- [x] `pnpm dev` → `/` shows the Projects Section between Experience and Contact, with a folio card
- [x] Clicking the card opens `/projects/folio` with Back link, title, type, year, and the four MDX sections in order
- [x] The Back link returns to the home page Projects Section
- [x] `/projects/unknown` returns 404
- [x] Temporarily setting `type: client` in folio's frontmatter makes the build fail with a readable schema error; reverting it makes the build pass
- [x] Section and page copy use the `CONTEXT.md` terms (Project, Personal project, Case study)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
