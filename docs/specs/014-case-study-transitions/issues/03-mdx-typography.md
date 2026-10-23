# 03: MDX typography in Ember tokens

**Spec:** [014-case-study-transitions](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

Replace the `mdxComponents` map in `apps/web/app/projects/[slug]/page.tsx` so the Case study body reads like the rest of the site: Ember tokens and fonts, comfortable line length, a clear heading rhythm. The MDX files in `apps/web/content/projects/` are not edited.

- **Elements.** Cover every element the three existing MDX files actually use (read them first: `h2`, `p`, `ul`, `ol`, `strong`, `a`, `code`, `pre`, `blockquote`, `hr`, `img`), not only the five in the current map. Anything the content does not use is left out.
- **Rhythm.** Headings in the display font with a larger gap above than below; body text at a readable size with `leading-relaxed`; list markers in the accent colour. The reading column stays `max-w-3xl`.
- **Emphasis.** `AccentText` from `@folio/ui` is added to the map as a component so an author can accent a phrase without HTML. Do not edit MDX to use it (content is out of scope).
- **Links.** Underline offset and hover colour consistent with other inline links on the site, a visible focus ring, contrast AA on the dark background.
- **Inline code** (if used) in Geist Mono on the subtle `bg-foreground/5` chip used for tags.

## Acceptance criteria

- [ ] Every element used in the three MDX files has an Ember-styled mapping
- [ ] Body text and links are AA contrast on the background; ratios noted under Comments
- [ ] Line length stays within roughly 65 to 80 characters at 1440px
- [ ] `AccentText` is available in the MDX components map
- [ ] No horizontal scroll at 375px from long words, code or links
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
