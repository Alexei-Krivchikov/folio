# 06: Remove leftovers and compare bundle sizes

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 02, 03, 04

**Status:** done

## What to build

After specs 009 to 014 the codebase should hold nothing of the old look and no dead code. Find it, remove it, and check what the redesign cost in bytes.

- **Old styles.** Search `apps` and `packages` for `zinc-*`, the old `#0a0a0a` and `#fafafa` literals, unused CSS custom properties and unused keyframes in `globals.css`. A scan at the time this ticket was written found no `zinc-*` in source; confirm and move on.
- **Dead code.** Unused exports and files in `apps/web/lib`, `apps/web/components` and `packages/ui` (for example helpers left behind by the removed cursor spotlight and lens distortion), and imports Biome does not flag. Use a tool for the scan (`knip` or `ts-prune`, run once and not added to the repo) and confirm each hit by hand.
- **Dependencies.** Any package in a `package.json` that no source file imports is removed and the lockfile updated.
- **Bundle sizes.** First Load JS of `/` and of one Case study from the `next build` output, compared with the numbers recorded before spec 009. If no number was recorded, build the commit before spec 009 in a throwaway worktree and take it from there. Write both sets under Comments with the difference. A large rise is not fixed here: it is handed to spec 016.

## Acceptance criteria

- [x] No `zinc-*`, no old neutral palette literals and no unused tokens or keyframes remain
- [x] Every unused file, export and dependency found is removed, and the list is under Comments
- [x] Before and after First Load JS for `/` and a Case study are under Comments
- [x] Nothing visible changed: the four pages look the same before and after in the browser pane
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Results

**Old styles.** No `zinc-*`, `#0a0a0a` or `#fafafa` in `apps` or `packages`. Every token in `packages/ui/src/tailwind.css` and the `marquee` keyframe are in use.

**Dead code** (knip, one run, not added to the repository; every hit checked by hand):
- removed `export` from `SECTION_IDS` (`apps/web/lib/navigation.ts`): used only inside its file;
- removed `export` from `ButtonProps` (`packages/ui/src/components/button.tsx`): not imported anywhere;
- left alone, false positives: `apps/web/content-collections.ts` (read by `@content-collections/next`), `zod` and `image-size` (both imported in that config);
- left alone, out of scope: `packages/shared` (`placeholderSchema`) and `zod` in its `package.json`: an empty placeholder package from the monorepo skeleton (spec 001), not a leftover of the redesign.

**Dependencies.** No unused package in any `package.json`; the lockfile is unchanged.

**First-load JS** (Turbopack does not print First Load JS, so it is computed from the `<script>` chunks in the built HTML; baseline is `aeda944`, the last commit before spec 009):

| Page | Before (raw / gzip) | After (raw / gzip) | Difference |
|---|---|---|---|
| `/` | 794.3 / 250.6 kB | 844.2 / 268.6 kB | +49.9 / +18.0 kB (+7%) |
| `/projects/folio` | 599.9 / 185.3 kB | 760.9 / 237.8 kB | +161.0 / +52.5 kB (+28%) |

The Case study growth is noticeable (probably `motion`, `ogl`, ViewTransition). Not fixed here; handed to spec 016.
