# 05: README refresh and hosting ADR

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

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

- [ ] The README's badge and any stack line it contains match the versions and packages in `apps/web/package.json`
- [ ] The README intro links to `https://alexei-krivchikov.vercel.app`
- [ ] `docs/adr/0005-…md` exists, is numbered after ADR 0004, follows its structure, and covers the four points above
- [ ] `docs/architecture.md` agrees with the ADR on hosting
- [ ] `npx biome check .` passes

## Comments
