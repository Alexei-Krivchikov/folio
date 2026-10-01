# 02: Fix the Telegram link in Contact

**Spec:** [007-deploy](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

The Contact Section links `https://t.me/AlexeiKrivchikov`, which is not the developer's account. The valid handle is `A1exe1ch`.

- In `apps/web/components/contact/contact.tsx`, change the Telegram link to `https://t.me/A1exe1ch`.
- Search the web app source, `docs/` and `README.md` for the literal string `AlexeiKrivchikov` and fix any other link to the old handle. At the time of writing `contact.tsx` is the only place that links to Telegram.
- The Email link `krivchikov.alexei@gmail.com` was confirmed correct and stays as it is.
- No LinkedIn pill: there is no profile yet, and the Contact Section keeps its three links.

## Acceptance criteria

- [ ] The Telegram pill opens `https://t.me/A1exe1ch` in a new tab
- [ ] `grep -r "AlexeiKrivchikov" apps docs README.md` (excluding `node_modules`, `.next`, `.content-collections`) returns no link to `t.me`
- [ ] The Email link and the GitHub link are unchanged, and Contact still has exactly three links
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
