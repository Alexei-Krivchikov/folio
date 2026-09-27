# 07: Open Graph images

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** 06

**Status:** Done

## What to build

A shared 1200×630 preview image, generated as code, for the home page and for every Case study.

- One template module used by both routes: dark background matching the site, the name, and a foreground block whose content is passed in.
- `app/opengraph-image.tsx` — home page: "Alexei Krivchikov", the "Frontend Developer" line, and the summary.
- `app/projects/[slug]/opengraph-image.tsx` — per Case study: Project name, type label (with Employer for a Commercial project), year and stack, read from the same projects query module the page uses, so the image can never disagree with the page. It uses `generateStaticParams` so every Project's image is generated at build time.
- Both export `size` (1200×630), `contentType` and `alt`.
- Fonts: use whatever `next/og` renders reliably in the build. If a custom font is needed it must be loaded in a way that works in the Vercel build, not just locally.
- No binary source images. The template draws with text and colour only.

## Acceptance criteria

- [x] `curl -I http://localhost:3000/opengraph-image` returns `content-type: image/png`
- [x] `curl -I http://localhost:3000/projects/dominocrm/opengraph-image` returns `content-type: image/png`
- [x] Both images are 1200×630 and legible when opened in a browser
- [x] The rendered HTML of `/` and of `/projects/dominocrm` each contain an absolute `og:image` URL built from `metadataBase`
- [x] The DominoCRM image shows its Employer and no repository link, consistent with the Case study's NDA rules
- [x] The three Case study images differ from each other and from the home page image
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
