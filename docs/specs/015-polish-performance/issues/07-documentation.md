# 07: Bring README, architecture and CONTEXT up to date

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 02, 03, 04, 05, 06

**Status:** done

## What to build

Nothing in the repository's documentation should describe the site as it was before spec 009.

- **`README.md`.** Description and stack badges match the real stack (Motion version, the shader library, Lenis), the structure tree matches the folders, the roadmap line reflects the closed specs, and the new Lighthouse CI job is mentioned.
- **`docs/architecture.md`.** The "apps/web (planned)" section describes what exists. The Styling & Animation section covers the Ember tokens, the three fonts, the Hero shader and its lazy chunk, view transitions, and the primitives added to `packages/ui` in specs 009 to 013. Mention the OG font in the repository and why `public/` stays screenshots-only.
- **`CONTEXT.md`.** Add or sharpen a term only if one settled during the build and is worth a name; otherwise leave it and say so under Comments.
- **ADRs.** Re-read 0004 (still accurate with a font file in `apps/web/assets`) and add a line if needed; no new ADR unless a decision here would surprise a reader.
- Facts only: every file name, count and version written is checked against the repository.

## Acceptance criteria

- [x] README description, badges, structure and roadmap match the repository
- [x] `docs/architecture.md` has no "planned" section for things that exist and covers the items above
- [x] `CONTEXT.md` reviewed; any term added is used in the code or specs
- [x] ADR 0004 reviewed and still accurate
- [x] `npx biome check .` passes

## Comments

### Results

- `README.md`: added OGL 1 and Lenis 1 badges (versions checked against `apps/web/node_modules`), updated the description and Stack (shader, ViewTransition, CI), checked the structure tree against the folders (`scripts/`, `lighthouserc.json`, `.github/workflows/`, `shared` and `config` marked as placeholders), roadmap reflects the closed specs.
- `docs/architecture.md`: replaced the "apps/web (planned)" section with the real tree; added a `packages/ui` section; Styling & Animation now covers the Ember tokens, the three fonts, the shader and its lazy chunk, view transitions, the OG font in the repository and why `public/` is screenshots-only, and Lighthouse CI.
- `CONTEXT.md` reviewed and unchanged: no new settled terms (Poster, Signature moment, Case study are already defined).
- ADR 0004 reviewed: still accurate; added one line about the font in `apps/web/assets/fonts`. No new ADR.
- Spec 011 is still `Draft` in its file and all its tickets are `ready-for-human`; the README says it awaits verification, and I did not change the spec status.
