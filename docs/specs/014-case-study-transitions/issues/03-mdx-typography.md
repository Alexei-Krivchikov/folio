# 03: MDX typography in Ember tokens

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** done

## What to build

Replace the `mdxComponents` map in `apps/web/app/projects/[slug]/page.tsx` so the Case study body reads like the rest of the site: Ember tokens and fonts, comfortable line length, a clear heading rhythm. The MDX files in `apps/web/content/projects/` are not edited.

- **Elements.** Cover every element the three existing MDX files actually use (read them first: `h2`, `p`, `ul`, `ol`, `strong`, `a`, `code`, `pre`, `blockquote`, `hr`, `img`), not only the five in the current map. Anything the content does not use is left out.
- **Rhythm.** Headings in the display font with a larger gap above than below; body text at a readable size with `leading-relaxed`; list markers in the accent colour. The reading column stays `max-w-3xl`.
- **Emphasis.** `AccentText` from `@folio/ui` is added to the map as a component so an author can accent a phrase without HTML. Do not edit MDX to use it (content is out of scope).
- **Links.** Underline offset and hover colour consistent with other inline links on the site, a visible focus ring, contrast AA on the dark background.
- **Inline code** (if used) in Geist Mono on the subtle `bg-foreground/5` chip used for tags.

## Acceptance criteria

- [x] Every element used in the three MDX files has an Ember-styled mapping
- [x] Body text and links are AA contrast on the background; ratios noted under Comments
- [x] Line length stays within roughly 65 to 80 characters at 1440px
- [x] `AccentText` is available in the MDX components map
- [x] No horizontal scroll at 375px from long words, code or links
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

**Done (2026-10-26).**

- **Elements.** The three MDX files use only `h2`, `p`, `ul`/`li`, `strong` and inline `code`; no `ol`, `pre`, `blockquote`, `hr`, `img`, so those are left out. `a` stays in the map (it was already there and the ticket specifies link styling), plus `li` for the marker padding and `AccentText`.
- **Rhythm.** `h2`: `text-2xl md:text-3xl`, semibold, tight tracking, `mt-14` above (first one `mt-10` under the cover) against `mt-4` below. `p` and `ul`: `text-base md:text-lg leading-relaxed text-muted`, list markers `marker:text-accent`, items `space-y-3`.
- **Line length.** `p` and `ul` get `max-w-[68ch]` inside the `max-w-3xl` column. Without it the first line held about 81 characters at 18px; measured at 1440px now: 77.
- **Contrast** on `#0b0908`: body text (`muted`) 7.18:1, links and markers (`accent`) 7.02:1, headings and inline code (`foreground`) 17.42:1. All AAA for text.
- **Links.** Accent colour with a 40% underline, `underline-offset-4`, hover switches to `accent-from`, focus ring is the same 2px accent outline as the Next project link. No MDX file contains a link yet, so this is checked by contrast only.
- **Inline code.** Geist Mono, `0.85em`, `border-border bg-foreground/5` chip as on the tags, `break-words`.
- **AccentText.** In the map as `<AccentText>` with `text-accent`; MDX is not edited.
- **Checked** in the browser: no horizontal scroll at 375px (Book Tracker, DominoCRM) or 1440px; the widest inline code ends at 296px of 375.
