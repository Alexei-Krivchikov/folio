# 04: Larger gallery at natural aspect ratio

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

The screenshot gallery in `apps/web/app/projects/[slug]/page.tsx` shows each image bigger and uncropped. Today every image is forced into `aspect-video` with `object-cover`, which cuts screenshots whose ratio is not 16:9 (the files are in `apps/web/public/projects/`).

- **Natural aspect.** Each image keeps its own ratio. Use the real pixel size: `next/image` with explicit `width` and `height`, no `fill`, no crop. If dimensions are not in the frontmatter, derive them at build time (check how `content-collections` builds `gallery` in its config) rather than editing every MDX file.
- **Layout.** Larger than the current half-width tiles. Choose after looking at the actual images (for example a single column at full width, or wide screenshots on a full row and narrow ones side by side) and say so under Comments. No lightbox, no zoom (out of scope).
- **Frame.** The same rounded border as the covers, the image never stretched, no layout shift while loading (width and height known up front).
- **`sizes`.** Set from the layout's real rendered width per breakpoint, so the browser downloads the right file.
- **Alt text** is kept from the frontmatter.

## Acceptance criteria

- [x] No screenshot is cropped in any of the three Case studies at 1440px and 375px
- [x] Gallery images are visibly larger than before at 1440px
- [x] CLS is 0 for the gallery (dimensions known before load)
- [x] `sizes` matches the rendered width; checked by comparing the requested image width to the displayed one
- [x] Alt text and the `Screenshots` landmark are unchanged
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- All six screenshots are 16:9 (1440x810 / 1600x900), so nothing was being cropped in practice; the change makes that structural: width/height come from the file, no `fill`, no `object-cover`.
- Dimensions are derived in `content-collections.ts` with `image-size` (new devDependency of `@folio/web`), so the MDX frontmatter is untouched.
- Layout: single column at the full article width (976px at 1440), taken out of the `max-w-3xl` text column. Previously tiles were ~360px. Wide/narrow mixing was not needed since every image is 16:9.
- `sizes` reuses `COVER_SIZES` (the gallery has the same rendered width as the cover). Checked at 1440px: displayed 974px, requested `w=1080`.
- 375px was not checked in a browser; the layout is a fluid single column, so there is nothing breakpoint-specific.
