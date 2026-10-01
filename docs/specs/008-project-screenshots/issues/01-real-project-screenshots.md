# 01: Replace placeholder images with real Project screenshots

**Spec:** [008-project-screenshots](../spec.md)

**Blocked by:** 007 (spec Done: `docs/specs/007-deploy/`, so the images can be checked on the live site)

**Status:** needs-info

## What to build

Replace `apps/web/public/projects/placeholder.png`, which every Project currently uses for its cover and every gallery slot, with real screenshots.

The developer first needs to supply or decide:

- the screenshots for DominoCRM (what may be shown, given it is a commercial Project), Book Tracker and folio;
- how many gallery images each Project gets (the MDX files currently have three slots each).

Once the images exist, look at the real card frame and the gallery frame on the live site, fix the dimensions and aspect ratio, and write the final naming and sizing into the comments below before cutting the images. Then:

- add the files to `apps/web/public/projects/`;
- point `cover` and every `gallery[].src` in `dominocrm.mdx`, `book-tracker.mdx` and `folio.mdx` at them, with `alt` text that describes what is on screen, not "screenshot";
- delete `placeholder.png`.

## Acceptance criteria

- [ ] Each of the three Project cards shows its own cover
- [ ] Each Case study gallery shows that Project's own images, with meaningful `alt` text
- [ ] No frontmatter field refers to `placeholder.png`, and the file is removed from `apps/web/public/projects/`
- [ ] At 1440px and 375px nothing in a cover or gallery is cut off and there is no layout shift
- [ ] Nothing confidential from the commercial Project is visible in any image
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
