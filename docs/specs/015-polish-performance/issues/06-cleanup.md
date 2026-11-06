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

- [ ] No `zinc-*`, no old neutral palette literals and no unused tokens or keyframes remain
- [ ] Every unused file, export and dependency found is removed, and the list is under Comments
- [ ] Before and after First Load JS for `/` and a Case study are under Comments
- [ ] Nothing visible changed: the four pages look the same before and after in the browser pane
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Результаты

**Старые стили.** `zinc-*`, `#0a0a0a`, `#fafafa` в `apps` и `packages` не найдены. Все токены в `packages/ui/src/tailwind.css` и keyframe `marquee` используются.

**Мёртвый код** (knip, один запуск, в репозиторий не добавлен; каждая находка проверена вручную):
- убран `export` у `SECTION_IDS` (`apps/web/lib/navigation.ts`): используется только внутри файла;
- убран `export` у `ButtonProps` (`packages/ui/src/components/button.tsx`): снаружи не импортируется;
- не тронуто, ложные срабатывания: `apps/web/content-collections.ts` (конфиг читает `@content-collections/next`), `zod` и `image-size` (оба импортируются в этом конфиге);
- не тронуто, вне объёма: `packages/shared` (`placeholderSchema`) и `zod` в его `package.json`: пустой пакет-заглушка из скелета monorepo (spec 001), не остаток редизайна.

**Зависимости.** Неиспользуемых в `package.json` нет, lockfile не менялся.

**Размер JS первой загрузки** (Turbopack не печатает First Load JS, поэтому посчитано по `<script>`-чанкам из собранного HTML; baseline `aeda944`, последний коммит до spec 009):

| Страница | До (raw / gzip) | После (raw / gzip) | Разница |
|---|---|---|---|
| `/` | 794.3 / 250.6 kB | 844.2 / 268.6 kB | +49.9 / +18.0 kB (+7%) |
| `/projects/folio` | 599.9 / 185.3 kB | 760.9 / 237.8 kB | +161.0 / +52.5 kB (+28%) |

Рост Case study заметный (вероятно `motion`, `ogl`, ViewTransition). Здесь не чинится, передано в spec 016.
