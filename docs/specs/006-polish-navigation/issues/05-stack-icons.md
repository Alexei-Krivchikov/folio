# 05: Logos in the Stack Section

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

Every tile in the Stack Section carries its technology's logo. No exceptions — a tile without a logo must not be possible.

- Add `@icons-pack/react-simple-icons` to the web app. Only the used icons ship, so import them individually.
- The group data becomes a list of `{ name, Icon }` where `Icon` is a component and the field is **required**. Adding a technology without an icon must fail type-checking, not render a bald tile.
- Sixteen of the seventeen technologies have Simple Icons entries: `javascript`, `typescript`, `react`, `nextdotjs`, `tailwindcss`, `sass`, `nodedotjs`, `express`, `postgresql`, `drizzle`, `prisma`, `git`, `docker`, `vercel`, `biome`, `turborepo`.
- **Motion** has none — the package split from Framer and never got its own icon, and `framer` names a different product. Ship a hand-made `MotionIcon` as a local SVG component with the same props shape as the pack's icons, so it drops into the same slot.
- Icons render in `currentColor` at the tile's text colour. On hover the icon takes its brand colour, alongside the existing `y: -4` lift.
- Brand colours that are black or near-black are invisible on this background: Next.js, Vercel, Express and Biome map to white through a single overrides map, not through per-tile conditionals.
- Tiles keep their label; the icon sits before the text. Tiles must not overflow their group at narrow widths (the 375px pass is ticket 09, but do not knowingly break it here).

## Acceptance criteria

- [ ] All seventeen tiles show an icon, Motion included
- [ ] Icons are monochrome at rest and take the brand colour on hover
- [ ] Next.js, Vercel, Express and Biome are clearly visible on hover, not black on near-black
- [ ] Deleting the icon from one entry in the data fails `tsc`
- [ ] The tile lift on hover still works, and tiles still wrap without overflowing
- [ ] The production bundle does not include the whole icon pack
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
