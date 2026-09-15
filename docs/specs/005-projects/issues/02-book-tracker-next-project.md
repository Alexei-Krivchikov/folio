# 02: Book Tracker Project + next-project link

**Spec:** [005-projects](../spec.md)

**Blocked by:** 01

**Status:** ready-for-agent

## What to build

A second Personal project and navigation between Case studies. With more than one Project, the order and uniqueness rules start to matter, and a visitor can go from one Case study to the next without returning home.

- One MDX file for Book Tracker as a single Personal project covering both the frontend and the API: `order: 2`, `2026`, GitHub links to `book-tracker-ui` and `book-tracker-api` (labelled UI and API), website `https://book-tracker-ui.vercel.app`. Stack covers both sides: Next.js 16, React 19, TanStack Query, NextAuth, Tailwind, shadcn/ui, Feature-Sliced Design; NestJS, Prisma, PostgreSQL, JWT (access + refresh tokens), Passport. The body is drafted from both public READMEs (auth, book search, personal library with statuses and ratings, cached requests), using the same four H2 sections.
- After the collection loads, `slug` and `order` must each be unique, or the build fails with a message naming the duplicate.
- The projects query module gets a next-project lookup by slug that wraps from the last Project to the first.
- The Case study shows a next-project link at the bottom (name + link).

## Acceptance criteria

- [ ] `/` shows cards in `order` order: Book Tracker (`_02.`) before folio (`_03.`)
- [ ] `/projects/book-tracker` renders with the four MDX sections
- [ ] The next-project link on Book Tracker goes to folio; folio's link wraps to the first Project by `order`
- [ ] Temporarily giving two Projects the same `order` (or `slug`) fails the build with a readable error; reverting it makes the build pass
- [ ] The Book Tracker text has no claims that aren't backed by its READMEs or code
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
