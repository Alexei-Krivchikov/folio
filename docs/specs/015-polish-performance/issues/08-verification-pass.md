# 08: Verification pass and final cross-device checklist

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** ready-for-human

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished site at the production address `https://alexei-krivchikov.vercel.app` after the work is merged and deployed. Steps that need a real phone, Safari, Firefox or Telegram are the developer's; the agent runs what it can in the browser pane and on a local production build, and lists the rest under Comments.

- **Written checklist, one run each:** 1440px and 375px; a mid-range Android phone; Safari (macOS or iOS), Firefox and Chrome; keyboard only; a screen reader; reduced motion; slow 4G throttling. For each: pass, or the finding and whether it was fixed here or became its own ticket.
- **Findings.** Small ones are fixed in this ticket; anything bigger is written as a new ticket in this spec or in spec 016, not done here.
- **Preview cards.** The rendered HTML of `/` and of a Case study has an absolute `og:image` showing the new style; pasting the link into Telegram shows the new card.
- **Static endpoints.** `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` answer 200.
- **Lighthouse.** Mobile on `/` and on a Case study: Performance, Accessibility, Best Practices and SEO at 90 or above, LCP at most 2.5 s, CLS 0. Performance and LCP are known to miss on the preview (spec 009 measured 87 to 89 and 3.3 to 3.5 s); record the numbers and leave the fix to spec 016. The Lighthouse CI job from ticket 05 is seen reporting on a pull request without failing it.
- **Status of the specs.** Set `Status: Done` in `spec.md` for spec 015 and check that specs 009 to 014 are Done. Spec 011 is still Draft because its own verification waits on the developer's Lighthouse run; either close it here or leave it and say so.

## Acceptance criteria

- [ ] The full checklist is written under Comments with a result for every device, browser and mode
- [ ] The new Open Graph card is confirmed in the HTML and in Telegram
- [ ] `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` answer 200 at the production address
- [ ] Lighthouse mobile numbers for `/` and a Case study are under Comments; Accessibility, Best Practices and SEO at 90 or above, CLS 0; any miss of Performance or LCP is handed to spec 016
- [ ] The Lighthouse CI job is seen on a pull request and does not block it
- [ ] Every finding is fixed or has its own ticket
- [ ] Spec 015 is marked Done; the state of spec 011 is stated
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
