# 06: Verification pass for the copy and composition pass

**Spec:** [020-copy-and-composition](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05

**Status:** resolved

## What to build

No new features. The checks from the spec's Testing Decisions, run once on the finished work at 1440px and 375px, with screenshots, and findings fixed or written down.

- [x] Every text on the home page matches the spec's Final copy word for word.
- [x] No em dash in prose on the home page or in the metadata description; date ranges keep theirs.
- [x] Nothing sits under the Hero calls to action.
- [x] `7,000+ active users, per domino-crm.com` appears once, in the DominoCRM card, and nowhere else on the home page.
- [x] The stack appears once, as the grid.
- [x] Experience shows two entries in order, with the dots filling on scroll.
- [x] The status dot does not pulse, including with reduced motion forced as in spec 013 ticket 07.
- [x] Each Case study shows its new summary.
- [x] The page metadata description is the new text.
- [x] No horizontal scroll at 375px.
- [x] `build` and `lint` pass.

## Comments

- Opened the local production build in the Codex browser, then verified it in Chromium at 1440 × 900 and 375 × 812. Captured Hero and Experience screenshots at both sizes in the session artifacts. At 375px the document and viewport widths were both 375px.
- Compared the homepage copy with the spec, including the full DominoCRM claim, the four Anthill points and the two date ranges. About showed 31 distinct stack items across five groups. All three Case studies matched their card summaries. The page, Open Graph and Twitter descriptions matched the Hero subtitle.
- The Experience dots went from both empty to Anthill filled to both filled. The Workshop dot fills before the colored line reaches it, especially at 375px. [Spec 012's timeline ticket](../../012-about-experience/issues/06-experience-timeline.md) calls for the dot to fill when the line reaches it. The Hero status dot had no active animation in either motion setting. With reduced motion enabled before navigation, both Experience dots were filled immediately.
- `pnpm check` and a fresh `pnpm --filter @folio/web exec next build` passed. The local production server returned 404 for the Vercel Analytics script, as in the spec 013 verification pass. The browser reported no page exceptions.
