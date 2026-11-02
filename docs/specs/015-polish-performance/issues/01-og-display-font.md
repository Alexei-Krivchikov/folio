# 01: Load the display font for next/og from the repository

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

The foundation for the OG and icon tickets. The generated images currently render in `system-ui`, which the `next/og` renderer does not ship, so the site's display font never reaches a preview card or an icon. Add the display font as a file in the repository and one helper that returns it in the shape `ImageResponse` expects. No visible change yet.

- **Font file.** Bricolage Grotesque as a `.ttf` (the `next/og` renderer reads ttf, otf and woff, not woff2), the weights the images use (700 and 800). Commit it under `apps/web/assets/fonts/`, not under `public/`, because ADR 0004 keeps `public/` for Project screenshots only. Record the licence (OFL) next to it.
- **Helper.** `apps/web/lib/og-fonts.ts` exports a function that reads the file from disk once (module-level cache) and returns the `fonts` array for `ImageResponse`. No `fetch`, no Google Fonts request at runtime or at build.
- **Works on Vercel.** The file must be traced into the serverless output; confirm it is readable in a production build, not only in `next dev` (for example through `outputFileTracingIncludes` if the build does not trace it by itself).

## Acceptance criteria

- [x] Font files and licence are committed under `apps/web/assets/fonts/`; `public/` is unchanged
- [x] `lib/og-fonts.ts` returns the `ImageResponse` `fonts` array from the local file, with a module-level cache
- [x] No network request for a font happens while rendering an image
- [x] A production build (`next build` + `next start`) renders `/opengraph-image` with the helper wired in, HTTP 200
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Font files are `.woff` (latin subset, 700 and 800, from `@fontsource/bricolage-grotesque` 5.3.0, taken via `npm pack`, not added as a dependency) instead of `.ttf`: the Google Fonts source only ships variable ttf, which satori does not handle, and woff is on the supported list. The latin subset is enough because the OG text is English.
- The helper caches the promise in a module-level variable; fonts are read with `fs.readFile` from `process.cwd()/assets/fonts`.
- `outputFileTracingIncludes` for `/**` is set in `next.config.ts` so the files reach the serverless output.
- `og-template.tsx` now uses `fontFamily: "Bricolage Grotesque"` and both OG routes pass `fonts`; this is the minimum wiring needed for the acceptance check. The Ember restyle itself is ticket 02.
- Checked: `next build` + `next start`, `/opengraph-image` and `/projects/folio/opengraph-image` answer 200 and the render shows Bricolage; biome, tsc and turbo build pass.
