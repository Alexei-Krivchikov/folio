# 05: Logos in the Stack Section

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-human

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

- [x] All seventeen tiles show an icon, Motion included
- [x] Icons are monochrome at rest and take the brand colour on hover
- [x] Next.js, Vercel, Express and Biome are clearly visible on hover, not black on near-black
- [x] Deleting the icon from one entry in the data fails `tsc`
- [x] The tile lift on hover still works, and tiles still wrap without overflowing
- [x] The production bundle does not include the whole icon pack
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Implemented in `apps/web/components/stack/`: `icon.ts` (the `StackIcon` prop shape), `motion-icon.tsx` (hand-made mark + `motionHex`), `stack.tsx` (data + render). Icons come from `@icons-pack/react-simple-icons/icons/Si<Name>` subpath imports, each bringing its own `defaultColor`, so the brand hex is never retyped.
- Hover colour rides a `--brand` custom property set on the tile; the icon carries `group-hover/tile:text-(--brand)`. No per-tile conditionals.
- Deviation from the ticket's override list: Biome's Simple Icons colour is `#60A5FA` (a light blue), not black, so it is left alone and is clearly visible on the dark background. Prisma's `#2D3748` *is* near-black, so Prisma was added to the overrides instead. Next.js, Vercel and Express map to white as written.
- Motion has no Simple Icons entry, as expected. Its brand hex is a judgement call — `#FFF312`, the motion.dev accent yellow — kept in one place (`motionHex`) if it needs changing.
- Verified in the browser against the running dev server on :3001: all 17 tiles carry an icon, each tile's `--brand` matches the expected hex, and hovering React computes the icon colour to `rgb(97, 218, 251)`. At 375px no tile overflows its group and the document has no horizontal scroll. Screenshots could not be captured — the preview pane rendered black in this session — so the checks above were read from the DOM.
- Bundle check: the built client chunks contain the used icons only (no unrelated Simple Icons titles).
