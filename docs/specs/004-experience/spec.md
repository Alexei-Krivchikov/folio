# Spec 004 — Experience timeline (Commercial)

Status: Done

## Problem Statement

The portfolio doesn't show where the developer has worked. Following the tajmirul.site reference, an experience section is needed. The work is Commercial (under NDA), so it must not expose links or project details.

## Solution

Below Stack, a "My Experience" section shows a vertical timeline (a left border with dots). Each entry shows only the period, the role, and the company name. There are no links and no contribution details. The section fades in once on scroll, using the same animation vocabulary as About and Stack.

## User Stories

1. As a recruiter, I want to see the developer's roles in a timeline, so that I understand their career at a glance.
2. As a recruiter, I want each entry to show the period, so that I can tell how long each role lasted.
3. As a recruiter, I want each entry to show the role title and company, so that I can place the experience in context.
4. As the developer, I want no links or project details in entries, so that nothing under NDA leaks.
5. As a visitor, I want the timeline to fade up once when I scroll to it, so that it feels consistent with About and Stack.
6. As the developer, I want the jobs data colocated with the component, so that adding a new role is a single-file change.

## Implementation Decisions

- New client component for the Experience section with a vertical timeline (left border + dots), with its `jobs` data (role, org, period) colocated.
- Entries show period, role, and company only. Contribution bullets were dropped (commit `3bf0b34`).
- Current entry: Anthill, with the real role and period, and no links.
- Animation: shared `fadeUp` variant with `whileInView` once, matching About and Stack.
- The home page adds `<Experience />` right after `<Stack />`.

## Testing Decisions

- No automated tests; behaviour is verified manually in the browser plus static checks.
- Acceptance:
  - `pnpm dev` → `/` shows My Experience, the timeline appears on scroll
  - Entries have no links and no NDA project details
  - `biome check`, `tsc`, and `turbo build --filter=@folio/web` pass
- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

## Out of Scope

- Contribution/impact bullets per role.
- Client names, project links, or case-study detail for Commercial work (that belongs to Projects, as "Commercial — Role/Stack/Impact").

## Further Notes

- Reference: tajmirul.site.
- The original acceptance still said "no company names" and "replace TODO contribution bullets". Both were superseded when the section moved to showing company + role only (commit `3bf0b34`). This spec reflects the current implementation.
- Rewritten from Russian into English and the current template.
