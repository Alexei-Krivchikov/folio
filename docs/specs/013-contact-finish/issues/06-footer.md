# 06: Footer with local time

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 04

**Status:** ready-for-agent

## What to build

Restyle `apps/web/components/footer/footer.tsx` to match the closing Contact Section and add the developer's local time.

- **Style.** Use the design tokens and `HudLabel` from `@folio/ui` for the small mono captions, instead of the plain `text-xs text-muted` paragraphs it has today. Keep the container (`max-w-5xl`, `px-6`) and the top border so the Footer lines up with every other Section. It stays a Server Component; only `LocalTime` is client code.
- **Local time.** A caption like `LOCAL TIME` followed by `<LocalTime utcOffset={3} />` and `UTC+3`, in `HudLabel` style. Wording of the caption is free, but the offset must be stated next to the time so a visitor in another zone can read it correctly.
- **Copyright line.** Stays: "© {year} Alexei Krivchikov. All rights reserved."
- **"Built with" line.** Stays and is updated to include the tools the site actually uses now. Today it says "Next.js · Tailwind · Motion". Read `apps/web/package.json` and `packages/ui/package.json` to see what the Hero and the page really depend on (the shader library, Lenis, and so on) and list the notable ones, not every dependency; keep it to one short line that wraps cleanly at 375px.
- **Layout.** Stacks vertically and centred on narrow screens, one row with space between on desktop, as now. No horizontal scroll at 375px.

## Acceptance criteria

- [ ] Footer uses `HudLabel` and tokens, and visually belongs to the Contact Section above it
- [ ] The time is shown with its `UTC+3` label and matches UTC+3 now
- [ ] No hydration warning and no layout shift when the time appears
- [ ] The "Built with" line matches what the project really uses (checked against `package.json`)
- [ ] At 375px and 1440px the Footer has no horizontal scroll and every caption is readable (AA contrast, ratios recorded under Comments)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
