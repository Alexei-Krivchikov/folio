# 02: Restyle the Open Graph images in Ember

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 01

**Status:** done

## What to build

The site's preview card and the Case study preview cards look like the rest of the redesign. The shared template already uses the Ember background `#0b0908`, the ember accent and a faint grid; what is missing is the display font and a stronger resemblance to the Hero.

- **`components/og/og-template.tsx`.** Take the fonts from ticket 01, set `fontFamily` to Bricolage Grotesque, and tune the layout for it (name, accent glow, watermark) so nothing wraps or clips at 1200x630 with the real font metrics. Colours come from the Ember tokens in `globals.css`, not from new literals where a token value already exists.
- **`app/opengraph-image.tsx`** (site) and **`app/projects/[slug]/opengraph-image.tsx`** (Case study): pass the fonts to `ImageResponse`, keep `alt`, `size` and `contentType`, keep the per-Project accent.
- **Long names.** The longest Project name and the longest stack line must fit on the card; check all three Projects.
- **Absolute URL.** The rendered HTML of `/` and of a Case study carries an absolute `og:image` built from `metadataBase`; nothing about that changes, but it is checked here.

## Acceptance criteria

- [x] Site and all three Case study images render in Bricolage Grotesque, in the Ember style, 1200x630
- [x] No text is clipped or wrapped badly on any of the four images
- [x] The HTML of `/` and of a Case study contains an absolute `og:image` that answers 200 with `image/png`
- [x] Still generated through `next/og` from code, no binary image added (ADR 0004)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Telegram showing the new card is checked on the production address in ticket 08; Telegram caches previews, so test with a fresh URL (a query string) or the bot's refresh.

Done: `og-template.tsx` now exports `ogColors` (the Ember token values, one place for the OG renderer, which cannot read CSS variables); both `opengraph-image.tsx` files use it. The stack line on the Case study card has `maxWidth: 1040` so DominoCRM fits on one line and Book Tracker and folio wrap onto two without orphans. `og:image` is absolute (built from `metadataBase`) and answers 200 `image/png` in a production build.
