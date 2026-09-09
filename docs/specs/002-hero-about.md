# Spec 002 — Hero + About (Motion урок 1)

Status: In Review (Phase 2a)

## Problem

Сайт показывает заглушку `folio — scaffold OK`. Нужны первые 2 секции MVP по рефу tajmirul: Hero + About.

## Solution

- `apps/web/components/hero/hero.tsx` — `"use client"`, `motion` stagger-каскад (badge → greeting → H1 → description → CTA), `Button` из `@folio/ui`
- `apps/web/components/about/about.tsx` — `whileInView` анимация при скролле (`viewport once`)
- `apps/web/app/page.tsx` — композиция `<Hero />` + `<About />`
- Зависимости: `motion` + `@folio/ui@workspace:*` в `apps/web/package.json`

## Acceptance

- [ ] `pnpm dev` → `/` показывает FRONTEND DEVELOPER + каскад при загрузке
- [ ] Скролл → About плавно появляется один раз
- [ ] `biome check` + `tsc` + `turbo build --filter=@folio/web` зелёные

## Verification (before commit)

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```
