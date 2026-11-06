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

- [ ] README description, badges, structure and roadmap match the repository
- [ ] `docs/architecture.md` has no "planned" section for things that exist and covers the items above
- [ ] `CONTEXT.md` reviewed; any term added is used in the code or specs
- [ ] ADR 0004 reviewed and still accurate
- [ ] `npx biome check .` passes

## Comments

### Результаты

- `README.md`: добавлены бейджи OGL 1 и Lenis 1 (версии сверены с `apps/web/node_modules`), описание и Stack обновлены (шейдер, ViewTransition, CI), дерево структуры сверено с папками (`scripts/`, `lighthouserc.json`, `.github/workflows/`, `shared` и `config` помечены как заглушки), роадмап отражает закрытые спеки.
- `docs/architecture.md`: раздел «apps/web (planned)» заменён на фактическое дерево; добавлен раздел `packages/ui`; Styling & Animation описывает токены Ember, три шрифта, шейдер и его ленивый чанк, view transitions, шрифт для OG в репозитории и почему `public/` только для скриншотов, Lighthouse CI.
- `CONTEXT.md` просмотрен, не менялся: новых устоявшихся терминов нет (Poster, Signature moment, Case study уже описаны).
- ADR 0004 просмотрен: остаётся верным, добавлена строка про шрифт в `apps/web/assets/fonts`. Новых ADR нет.
- Спека 011 в файле всё ещё `Draft`, все её тикеты `ready-for-human`; в README это отражено как «ждёт верификации», статус самой спеки не менял.
