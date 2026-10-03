# 05: README refresh and hosting ADR

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** Done

## What to build

The README still describes the stack as planned, and the hosting decision exists only in the spec. Bring the README in line with the code and record the decision.

- README stack badge: "Framer Motion 11" becomes Motion with the version the app actually depends on (`motion` in `apps/web/package.json`). Check the other badges and the Stack list against `package.json` and fix anything that no longer matches; leave the other sections alone.
- README intro line "Deployed on Vercel (free)" becomes a link to the live site, `https://alexei-krivchikov.vercel.app`. The URL is a fixed decision of the spec; the ticket does not wait for the deploy to write it, but it also must not be merged and announced before ticket 06 is done.
- Add `docs/adr/0005-vercel-hobby-and-vercel-app-domain.md` in the format of ADR 0004 (Context, Decision, Alternatives, Consequences), dated today, status Accepted. It records:
  - Vercel Hobby with the address `alexei-krivchikov.vercel.app` until a custom domain is bought, and that the change later is `NEXT_PUBLIC_SITE_URL` plus the domain setting in Vercel, with no code edit;
  - Git integration with Root Directory `apps/web` over deploying with the CLI;
  - Vercel Web Analytics (cookieless) over a cookie-based tool, so there is no consent banner;
  - the Hobby plan's non-commercial-use restriction, which a personal portfolio satisfies.
- Update the line in `docs/architecture.md` that says what deploys and where, if it no longer matches.

## Acceptance criteria

- [x] The README's badge and any stack line it contains match the versions and packages in `apps/web/package.json`
- [x] The README intro links to `https://alexei-krivchikov.vercel.app`
- [x] `docs/adr/0005-…md` exists, is numbered after ADR 0004, follows its structure, and covers the four points above
- [x] `docs/architecture.md` agrees with the ADR on hosting
- [x] `npx biome check .` passes

## Comments

Checked against `apps/web/package.json` and `next.config.ts`:

- Badge: Framer Motion 11 became Motion 13 (`motion@^13.2.0`).
- Stack list: dropped "React Compiler" (`reactCompiler: false` in `next.config.ts`) and "Husky + Commitlint" (not installed, no config in the repo). "shadcn/ui (Radix)" became "shadcn-style primitives (cva + tailwind-merge)": `packages/ui` has no Radix dependency, only `class-variance-authority`, `clsx`, `tailwind-merge`.
- `npx biome check .` was red locally on a clean `main` because `core.autocrlf=true` checked files out as CRLF and the repo had no `.gitattributes`. Added `.gitattributes` (`* text=auto eol=lf`); after normalising the working tree Biome passes.
- ADR 0002 and `docs/architecture.md` (Styling, Conventions) were updated at the developer's request to match the code: Motion 13, React Compiler off, no Radix, no Commitlint.
