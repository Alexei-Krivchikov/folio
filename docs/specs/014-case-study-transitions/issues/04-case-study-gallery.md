# 04: Larger gallery at natural aspect ratio

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

The screenshot gallery in `apps/web/app/projects/[slug]/page.tsx` shows each image bigger and uncropped. Today every image is forced into `aspect-video` with `object-cover`, which cuts screenshots whose ratio is not 16:9 (the files are in `apps/web/public/projects/`).

- **Natural aspect.** Each image keeps its own ratio. Use the real pixel size: `next/image` with explicit `width` and `height`, no `fill`, no crop. If dimensions are not in the frontmatter, derive them at build time (check how `content-collections` builds `gallery` in its config) rather than editing every MDX file.
- **Layout.** Larger than the current half-width tiles. Choose after looking at the actual images (for example a single column at full width, or wide screenshots on a full row and narrow ones side by side) and say so under Comments. No lightbox, no zoom (out of scope).
- **Frame.** The same rounded border as the covers, the image never stretched, no layout shift while loading (width and height known up front).
- **`sizes`.** Set from the layout's real rendered width per breakpoint, so the browser downloads the right file.
- **Alt text** is kept from the frontmatter.

## Acceptance criteria

- [ ] No screenshot is cropped in any of the three Case studies at 1440px and 375px
- [ ] Gallery images are visibly larger than before at 1440px
- [ ] CLS is 0 for the gallery (dimensions known before load)
- [ ] `sizes` matches the rendered width; checked by comparing the requested image width to the displayed one
- [ ] Alt text and the `Screenshots` landmark are unchanged
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
