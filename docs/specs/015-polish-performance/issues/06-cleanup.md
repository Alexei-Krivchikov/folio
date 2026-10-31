# 06: Remove leftovers and compare bundle sizes

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 02, 03, 04

**Status:** ready-for-agent

## What to build

After specs 009 to 014 the codebase should hold nothing of the old look and no dead code. Find it, remove it, and check what the redesign cost in bytes.

- **Old styles.** Search `apps` and `packages` for `zinc-*`, the old `#0a0a0a` and `#fafafa` literals, unused CSS custom properties and unused keyframes in `globals.css`. A scan at the time this ticket was written found no `zinc-*` in source; confirm and move on.
- **Dead code.** Unused exports and files in `apps/web/lib`, `apps/web/components` and `packages/ui` (for example helpers left behind by the removed cursor spotlight and lens distortion), and imports Biome does not flag. Use a tool for the scan (`knip` or `ts-prune`, run once and not added to the repo) and confirm each hit by hand.
- **Dependencies.** Any package in a `package.json` that no source file imports is removed and the lockfile updated.
- **Bundle sizes.** First Load JS of `/` and of one Case study from the `next build` output, compared with the numbers recorded before spec 009. If no number was recorded, build the commit before spec 009 in a throwaway worktree and take it from there. Write both sets under Comments with the difference. A large rise is not fixed here: it is handed to spec 016.

## Acceptance criteria

- [ ] No `zinc-*`, no old neutral palette literals and no unused tokens or keyframes remain
- [ ] Every unused file, export and dependency found is removed, and the list is under Comments
- [ ] Before and after First Load JS for `/` and a Case study are under Comments
- [ ] Nothing visible changed: the four pages look the same before and after in the browser pane
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
