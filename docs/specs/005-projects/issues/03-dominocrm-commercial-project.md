# 03: DominoCRM Commercial project

**Spec:** [005-projects](../spec.md)

**Blocked by:** 01

**Status:** Done

## What to build

The first Project, shown under the Commercial project rules. The content schema must make it impossible to publish a Commercial project with a repository link or without its Employer.

- Schema rules for `type: commercial`: `employer` is required, and `links.github` is not allowed. For `type: personal`, `employer` must be absent. Violations fail the build with a readable error.
- One MDX file for DominoCRM: `order: 1`, `type: commercial`, `employer: Anthill`, `year: 2023 — Present`, website `https://domino-crm.com`, no GitHub link. The summary describes it as a no-code chatbot builder and multichannel CRM for Telegram, Web and VK.
- The body uses the same four H2 sections and is prose only, from public facts:
  - About: the product and who it's for, as on the public landing page.
  - Tech stack: React, TypeScript, Redux Toolkit + Redux Saga, Chakra UI, SignalR (real-time), i18next (four languages), Telegram Mini Apps.
  - Key features: visual flow builder for bots, real-time chats and group chats with topics, broadcasts and auto-broadcasts, AI assistants, contacts with complex filters.
  - My role and technical highlights: Frontend / FullStack Developer at Anthill; ownership areas and engineering problems described in words (for example the flow builder, real-time group chats, consistent loading and skeleton states).
- No source code, no internal architecture or service names, no ticket numbers, no non-public screenshots.
- On the card and in the Case study header, the type label reads "Commercial" and shows the Employer (Anthill).

## Acceptance criteria

- [x] `/` shows DominoCRM as `_01.`, the first card, labelled Commercial
- [x] `/projects/dominocrm` shows the type with Employer Anthill, year `2023 — Present`, the landing page link, and no repository link
- [x] Temporarily adding a `github` link to DominoCRM, or removing `employer`, fails the build; adding `employer` to a Personal project also fails; reverting makes the build pass
- [x] The page has no code, internal details, or non-public images
- [x] The developer has read the text for NDA compliance and accuracy of their role
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
