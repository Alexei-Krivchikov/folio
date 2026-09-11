# Spec 004 — Experience timeline (Commercial)

Status: In Review (Phase 3b)

## Problem

Нужна секция опыта по рефу tajmirul, но без палева NDA: названия и ссылки светить нельзя.

## Solution

- `apps/web/components/experience/experience.tsx` — `"use client"`, вертикальный таймлайн (граница + точки), данные `jobs` рядом с компонентом
- Commercial-режим: `org: "Commercial · NDA"`, роль/период реальные, пункты вклада — TODO на заполнение владельцем (не выдумываем)
- Анимация: `fadeUp` + `whileInView once`, единый словарь с About/Stack
- `apps/web/app/page.tsx` — `<Experience />` после `<Stack />`

## Acceptance

- [ ] `pnpm dev` → `/` показывает My Experience, таймлайн появляется при скролле
- [ ] Нет названий компаний и ссылок
- [ ] TODO-пункты заменены реальным вкладом (перед деплоем MVP)
- [ ] `biome check` + `tsc` + `turbo build --filter=@folio/web` зелёные

## Verification (before commit)

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```
