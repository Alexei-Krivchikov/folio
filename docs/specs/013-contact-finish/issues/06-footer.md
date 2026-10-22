# 06: Footer with local time

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 04

**Status:** ready-for-human

## What to build

Restyle `apps/web/components/footer/footer.tsx` to match the closing Contact Section and add the developer's local time.

- **Style.** Use the design tokens and `HudLabel` from `@folio/ui` for the small mono captions, instead of the plain `text-xs text-muted` paragraphs it has today. Keep the container (`max-w-5xl`, `px-6`) and the top border so the Footer lines up with every other Section. It stays a Server Component; only `LocalTime` is client code.
- **Local time.** A caption like `LOCAL TIME` followed by `<LocalTime utcOffset={3} />` and `UTC+3`, in `HudLabel` style. Wording of the caption is free, but the offset must be stated next to the time so a visitor in another zone can read it correctly.
- **Copyright line.** Stays: "© {year} Alexei Krivchikov. All rights reserved."
- **"Built with" line.** Stays and is updated to include the tools the site actually uses now. Today it says "Next.js · Tailwind · Motion". Read `apps/web/package.json` and `packages/ui/package.json` to see what the Hero and the page really depend on (the shader library, Lenis, and so on) and list the notable ones, not every dependency; keep it to one short line that wraps cleanly at 375px.
- **Layout.** Stacks vertically and centred on narrow screens, one row with space between on desktop, as now. No horizontal scroll at 375px.

## Acceptance criteria

- [x] Footer uses `HudLabel` and tokens, and visually belongs to the Contact Section above it
- [x] The time is shown with its `UTC+3` label and matches UTC+3 now
- [x] No hydration warning and no layout shift when the time appears
- [x] The "Built with" line matches what the project really uses (checked against `package.json`)
- [x] At 375px and 1440px the Footer has no horizontal scroll and every caption is readable (AA contrast, ratios recorded under Comments)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Rewrote `apps/web/components/footer/footer.tsx` (still a Server Component; only `LocalTime` is client code). Captions use `HudLabel` with `tracking-[0.12em]`. Layout: a top border, then one row with `LOCAL TIME <time> UTC+3` on the left and `BUILT WITH ...` on the right, and the copyright line under them; on narrow screens everything stacks and is centred.
- A first version put the three captions in one row; at 1440px each wrapped onto two lines (the three needed about 1130px of a 976px box), so it was changed to two rows. Now every caption at 1440px is a single 16px line.
- Local time: `<LocalTime utcOffset={3} />`, the time itself in `text-foreground` so it stands out from the muted captions. The server HTML has `--:--`.
- "Built with" now reads `Next.js · Tailwind · Motion · OGL · Lenis`. Checked against `apps/web/package.json`: `next`, `tailwindcss`, `motion`, `ogl` (the Hero shader) and `lenis` (smooth scroll) are real dependencies. Left out on purpose: Biome, Turborepo, content-collections and Vercel, which are tooling and hosting rather than what the page is built with.
- Checked in the built-in browser. 1440px: captions single-line, footer 141px tall, no horizontal overflow. 800px (still the `md` layout): looks as described above. 375px: stacked and centred, "Built with" and the copyright wrap to two lines each, footer right edge 375, `scrollWidth` 375. No hydration warning in the console.
- Contrast: captions use `--muted` (`rgb(163, 154, 145)`, 7.18 on the page background), the time `rgb(245, 239, 233)` (17.42). Computed from the tokens, not sampled from pixels.
- The round "N" at the bottom left in dev is the Next.js dev indicator, not part of the page.
- Closed in ticket 07: no hydration warning in any run, and layout shift on the production build was 0 on desktop and mobile.
