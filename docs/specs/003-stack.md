# Spec 003 — Stack grid

Status: In Review (Phase 3a)

## Problem

После About страница обрывается. По рефу tajmirul нужна секция `My Stack`: группы технологий гридом.

## Solution

- `apps/web/components/stack/stack.tsx` — `"use client"`, данные `groups` (Frontend/Backend/Database/Tools) рядом с компонентом
- Анимация: секция `whileInView once` + `staggerChildren` групп, плитки `scale 0.92→1` + `whileHover y -4`
- `apps/web/app/page.tsx` — добавлен `<Stack />` после `<About />`
- Без иконок-логотипов на MVP (текстовые плитки), логотипы — полировка фазы 5

## Acceptance

- [ ] `pnpm dev` → `/` показывает My Stack, группы появляются каскадом при скролле
- [ ] Hover на плитке — подъём на 4px + светлая рамка
- [ ] `biome check` + `tsc` + `turbo build --filter=@folio/web` зелёные

## Verification (before commit)

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```
