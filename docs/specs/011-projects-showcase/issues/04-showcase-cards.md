# 04: Showcase layout and card content

**Spec:** [011-projects-showcase](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

The static showcase: the featured card, the two smaller cards, and the new card content. No tilt and no magnetic pull yet (ticket 05); this ticket has to look finished on its own, because that is what touch devices and reduced-motion visitors will see. Files: `apps/web/components/projects/project-grid.tsx`, `projects.tsx`, `apps/web/lib/projects.ts`.

- **Layout.** The grid stays data-driven from `getProjects()`. The first Project by `order` is the featured card and spans the full row from `md` up; the rest sit in two columns below it. Nothing refers to a slug or a name. On mobile everything is one column in the same order. The featured card may be laid out wider than a normal one (cover and text side by side, or a taller cover); this is a proposal from the spec, so look at it at 1440, 1024 and 768px, compare it against an even three-column grid, and keep whichever looks better. Write the decision and the reason under Comments.
- **HUD index.** `[01]`, `[02]`, `[03]` from `order`. One format everywhere: `formatProjectNumber` in `lib/projects.ts` now returns `[01]` (it used to return `_01.`), and the card and the Case study Open Graph watermark both use it. No second formatter.
- **Commercial / Personal marker.** `ProjectCard` gets the `type` field and the card shows a clear marker from it, using the existing `projectTypeLabel`. Commercial gets the Ember accent treatment, Personal a neutral one; both text colours pass AA on the card surface.
- **Meta line.** `formatProjectMeta` starts with the type ("Commercial · Anthill · 2023 — Present"), so the marker and the meta would say "Commercial" twice. On the card, the meta line shows the remainder (Employer and year) and the marker carries the type. `formatProjectMeta` itself is left as it is for the Case study and the OG image.
- **Rest of the card.** Name, summary, up to four stack tags with the `+N` overflow as today, and an "Open Case study" affordance at the bottom of the card. The affordance is a non-interactive element inside the existing single `Link` (no nested link or button); ticket 05 wraps it in `MagneticButton`.
- **Cover.** The covers from spec 008 stay. The frame gets one consistent aspect ratio and crop for every card, and on hover and keyboard focus an Ember glow on the border (a border colour plus a soft box-shadow in the accent). `next/image` stays; `sizes` is set per card to the width it really renders at (the featured card is the full content column, the others half of it); only the first card has `priority`. The existing hover zoom on the image stays and is still off under reduced motion.
- **Entrance.** The stagger and `fadeUp` on each `li` stay as they are.
- **Heading.** The Section keeps `SectionHeading` with the label set in ticket 01.

## Acceptance criteria

- [ ] At 1440px the first Project spans the row and the other two share the row below; at 375px all three are one column in the same order
- [ ] The layout code contains no slug or name; adding a fourth Project would render without layout work
- [ ] Each card shows the HUD index, name, Commercial/Personal marker, employer-and-year line, summary, up to four tags with `+N`, the cover and the "Open Case study" affordance
- [ ] "Commercial" is not written twice on any card
- [ ] The card is still one link and one tab stop; no link or button is nested inside it
- [ ] Covers share one crop; the Ember border glow shows on hover and on keyboard focus; the focus ring is visible
- [ ] `priority` is set only on the first card, and `sizes` matches the rendered widths (checked in the network panel: the served image width is not far above the rendered width)
- [ ] No horizontal scroll at 320 and 375px and no layout shift when images load
- [ ] The Case study Open Graph watermark shows `[01]` in the same format as the card; the Case study page is otherwise unchanged
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
