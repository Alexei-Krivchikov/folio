# 02: Case study title block with cover and HUD meta row

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

The top of `apps/web/app/projects/[slug]/page.tsx` in the Ember language: back link, title, cover, meta row and the Case study links as buttons. Frontmatter schema and MDX content are not touched.

- **Title block.** The Back link keeps its 44px tap target on mobile and still points to `/#projects`. The `h1` uses the display styling already used for Section headings and the Hero (check `SectionHeading` and the Hero for the type scale and font, do not invent a new one).
- **Meta row.** A `HudLabel`-style Geist Mono row built from `project.type`, `project.employer` (or "personal" when absent) and `project.year`, in the bracket style used elsewhere (for example `[ Commercial · Employer · 2024 ]`). Reuse or extend `formatProjectMeta` in `apps/web/lib/projects.ts`; if the HUD format needs a separate function, add it there.
- **Cover.** `project.cover` shown at the top of the article at `aspect-video`, rounded, with the same border as the home card cover and the same `object-cover object-top-left` crop, so ticket 06 can morph it into the card cover without a visible jump of framing. Use `next/image` with `priority`, `quality={90}` and `sizes` that match the real layout width at each breakpoint.
- **Links.** Website and GitHub links become Ember buttons through the existing `buttonVariants` (primary one `default`, the rest `outline`), so there is one source of button styling. They stay `<a>` with `target="_blank"` and `rel="noopener noreferrer"`, at least 44px tall on mobile.
- **Width.** The title block and cover may go wider than the reading measure; the MDX body keeps `max-w-3xl`. Decide the container so the cover is not tiny at 1440px and state it under Comments.

## Acceptance criteria

- [x] Title, cover, HUD meta row and link buttons render for all three Case studies, with the cover in the server HTML
- [x] A Project without an Employer shows "personal" (or the agreed wording) and a Project without links shows no empty link list
- [x] No horizontal scroll at 375px or 1440px; link buttons are at least 44px tall at 375px
- [x] Cover aspect ratio and crop match the home card cover
- [x] The cover has correct `sizes` and does not request a larger image than it shows
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

**Done (2026-10-25).**

- **Width.** The article container is `max-w-5xl` (the width of Hero and Contact), so the cover is 976px at 1440px. The MDX body, gallery and next-project block sit in an inner `max-w-3xl`, so their layout is unchanged until tickets 03 to 05. Cover `sizes` is `(min-width: 1072px) 976px, calc(100vw - 48px)`: 976px is the container's content width, 1072px is where it stops growing.
- **Title and meta.** `SectionHeading as="h1"` with the label `[ ${formatProjectMeta(project)} ]`: the same HUD label above a display heading as in the home Sections, with no new type scale. `formatProjectMeta` is unchanged because the Open Graph image also uses it.
- **"personal" wording.** The type label already says "Personal", so a Project without an Employer shows `[ Personal · 2026 ]`, not "Personal · personal · 2026". With an Employer: `[ Commercial · Anthill · 2023 — Present ]`.
- **Links.** `buttonVariants` plus `max-md:h-11` (same pattern as the Hero). The primary (`default`) button is the first link, so `getProjectLinks` now returns Website first, then the GitHub repos; before, Website was last. Only this page uses it.
- **Cover.** `aspect-video`, `rounded-xl border border-border`, `object-cover object-top-left`, `priority`, `quality={90}`, same as the home card cover.
- **Checked** in the browser at 1024px and 375px (no horizontal scroll, link buttons 44px tall at 375px, no console errors); the server HTML of all three pages has the cover `<img>` and the meta row. 1440px not checked directly: the container stops growing at 1072px, so it is the same layout as 1024px with wider margins.
