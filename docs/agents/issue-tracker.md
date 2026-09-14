# Issue tracker: Local Markdown (`docs/specs/`)

Specs and tickets for this repo live as markdown files in `docs/specs/`, committed alongside the code. GitHub Issues are not used.

## Conventions

- Features are numbered sequentially (`001-monorepo-skeleton/` … `004-experience/`). Next number = highest existing `NNN` + 1.
- One feature per directory: `docs/specs/<NNN>-<feature-slug>/`
- The spec is `docs/specs/<NNN>-<feature-slug>/spec.md`
- Implementation tickets are one file per ticket at `docs/specs/<NNN>-<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each ticket file (see `triage-labels.md` for the role strings)
- Blocking edges are a `Blocked by: NN, NN` line near the top of the ticket file
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `docs/specs/<NNN>-<feature-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the ticket number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `docs/specs/<NNN>-<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `docs/specs/<NNN>-<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `docs/specs/<NNN>-<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.
