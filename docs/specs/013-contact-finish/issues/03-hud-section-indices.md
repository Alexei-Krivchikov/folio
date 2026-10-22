# 03: HUD section indices from the real Section order

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

Each Section heading carries an index of the form `[ 02 / 04 ]` in Geist Mono, and the numbers come from the actual Section order, not from strings typed into four files.

Today the labels are hard-coded and carry the Section name: `[ 01 / PROJECTS ]` in `apps/web/components/projects/project-grid.tsx`, `[ 02 / ABOUT ]` in `about/about.tsx`, `[ 03 / EXPERIENCE ]` in `experience/experience.tsx`, `[ 04 / CONTACT ]` in `contact/contact.tsx`. The heading directly under each label already names the Section, so the label becomes a pure index, as the spec says.

- **Source of truth.** `NAV_SECTION_IDS` in `apps/web/lib/navigation.ts` (`projects`, `about`, `experience`, `contact`; Hero is not numbered). Add a small helper next to it, for example `sectionIndex(id: NavSectionId): string`, that returns `[ 02 / 04 ]` from the id's position and the array length, zero-padded to two digits. Adding, removing or reordering a Section in that array must be enough to renumber every heading.
- **Callers.** The four Sections pass `label={sectionIndex("about")}` etc. to `SectionHeading`. `SectionHeading` and `HudLabel` in `packages/ui` stay generic and already render the label in Geist Mono (`font-mono`); change them only if the result does not look like the spec.
- **Contact.** Ticket 05 rewrites the Contact Section. Here only its label line changes, so 05 builds on the helper.
- **Nothing else changes.** Headings, copy, spacing and animation stay as they are.

## Acceptance criteria

- [x] The four headings read `[ 01 / 04 ]`, `[ 02 / 04 ]`, `[ 03 / 04 ]`, `[ 04 / 04 ]` in Geist Mono, in page order
- [x] No Section file contains a hard-coded `[ NN / ... ]` string
- [x] Temporarily reordering `NAV_SECTION_IDS` renumbers the labels (checked once, then reverted); nothing else needs editing
- [x] The index is still read sensibly by a screen reader (the label is plain text before the heading) and contrast is unchanged
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Added `sectionIndex(id: NavSectionId)` to `apps/web/lib/navigation.ts`: position in `NAV_SECTION_IDS` plus one, over its length, both zero-padded to two digits. The four Sections pass `label={sectionIndex("...")}` to `SectionHeading`; `SectionHeading` and `HudLabel` in `packages/ui` are unchanged. `grep` finds no `[ NN / ... ]` string in `apps/web`.
- Checked in the built-in browser: the Sections read `[ 01 / 04 ]` Projects, `[ 02 / 04 ]` About, `[ 03 / 04 ]` Experience, `[ 04 / 04 ]` Contact, in Geist Mono. With `NAV_SECTION_IDS` temporarily reordered to `projects, experience, about, contact`, About showed `[ 03 / 04 ]` and Experience `[ 02 / 04 ]` after hot reload; the array was then restored and the labels were back to the order above. The Header links are unchanged.
- Accessibility and contrast: the label is still a plain text `span` right before the `h2`, with the same colour as before (`rgb(163, 154, 145)`, `--muted`, 7.18 on the page background per spec 012 ticket 07). No screen reader was run; the check was of the markup.
- Decision: the label no longer carries the Section name (`[ 02 / ABOUT ]` became `[ 02 / 04 ]`), as the spec asks, since the heading under it already names the Section. If it reads too bare, the name can be put back after the index in `sectionIndex` alone.
