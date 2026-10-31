# 01: Load the display font for next/og from the repository

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

The foundation for the OG and icon tickets. The generated images currently render in `system-ui`, which the `next/og` renderer does not ship, so the site's display font never reaches a preview card or an icon. Add the display font as a file in the repository and one helper that returns it in the shape `ImageResponse` expects. No visible change yet.

- **Font file.** Bricolage Grotesque as a `.ttf` (the `next/og` renderer reads ttf, otf and woff, not woff2), the weights the images use (700 and 800). Commit it under `apps/web/assets/fonts/`, not under `public/`, because ADR 0004 keeps `public/` for Project screenshots only. Record the licence (OFL) next to it.
- **Helper.** `apps/web/lib/og-fonts.ts` exports a function that reads the file from disk once (module-level cache) and returns the `fonts` array for `ImageResponse`. No `fetch`, no Google Fonts request at runtime or at build.
- **Works on Vercel.** The file must be traced into the serverless output; confirm it is readable in a production build, not only in `next dev` (for example through `outputFileTracingIncludes` if the build does not trace it by itself).

## Acceptance criteria

- [ ] Font files and licence are committed under `apps/web/assets/fonts/`; `public/` is unchanged
- [ ] `lib/og-fonts.ts` returns the `ImageResponse` `fonts` array from the local file, with a module-level cache
- [ ] No network request for a font happens while rendering an image
- [ ] A production build (`next build` + `next start`) renders `/opengraph-image` with the helper wired in, HTTP 200
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
