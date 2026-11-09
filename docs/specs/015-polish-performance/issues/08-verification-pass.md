# 08: Verification pass and final cross-device checklist

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** done

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished site at the production address `https://alexei-krivchikov.vercel.app` after the work is merged and deployed. Steps that need a real phone, Safari, Firefox or Telegram are the developer's; the agent runs what it can in the browser pane and on a local production build, and lists the rest under Comments.

- **Written checklist, one run each:** 1440px and 375px; a mid-range Android phone; Safari (macOS or iOS), Firefox and Chrome; keyboard only; a screen reader; reduced motion; slow 4G throttling. For each: pass, or the finding and whether it was fixed here or became its own ticket.
- **Findings.** Small ones are fixed in this ticket; anything bigger is written as a new ticket in this spec or in spec 016, not done here.
- **Preview cards.** The rendered HTML of `/` and of a Case study has an absolute `og:image` showing the new style; pasting the link into Telegram shows the new card.
- **Static endpoints.** `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` answer 200.
- **Lighthouse.** Mobile on `/` and on a Case study: Performance, Accessibility, Best Practices and SEO at 90 or above, LCP at most 2.5 s, CLS 0. Performance and LCP are known to miss on the preview (spec 009 measured 87 to 89 and 3.3 to 3.5 s); record the numbers and leave the fix to spec 016. The Lighthouse CI job from ticket 05 is seen reporting on a pull request without failing it.
- **Status of the specs.** Set `Status: Done` in `spec.md` for spec 015 and check that specs 009 to 014 are Done. Spec 011 is still Draft because its own verification waits on the developer's Lighthouse run; either close it here or leave it and say so.

## Acceptance criteria

- [x] The full checklist is written under Comments with a result for every device, browser and mode
- [x] The new Open Graph card is confirmed in the HTML and in Telegram
- [x] `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` answer 200 at the production address
- [x] Lighthouse mobile numbers for `/` and a Case study are under Comments; Accessibility, Best Practices and SEO at 90 or above, CLS 0; any miss of Performance or LCP is handed to spec 016 (LCP 2.9 s, handed over)
- [x] The Lighthouse CI job is seen on a pull request and does not block it
- [x] Every finding is fixed or has its own ticket
- [x] Spec 015 is marked Done; the state of spec 011 is stated
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass (rerun on `dev` at `af8c241`: all three pass)

## Comments

### Results (2026-11-07, production `https://alexei-krivchikov.vercel.app`, PR #22 merged)

**Checked by the agent (browser pane, fetch from the production origin):**
- `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`: 200.
- `og:image` in the HTML of `/` and `/projects/folio`: absolute URLs (`https://alexei-krivchikov.vercel.app/opengraph-image?...` and `/projects/folio/opengraph-image?...`), 1200x630, `image/png`; the home image answers 200 `image/png`.
- `theme-color` in the HTML of both pages: `#0b0908`.

**Checked by the developer:**
- Telegram: the new preview card shows for the site and for a Case study: pass.
- Real devices and browsers (Android, Safari, Firefox, Chrome, keyboard only, screen reader, reduced motion, slow 4G): the developer went through all of them, no findings (1440px and 375px included). Anything they dislike will become separate specs.

**Production Lighthouse** (run by the developer, screenshots, mobile):
- `/`: Performance 94, Accessibility 100, Best Practices 100, SEO 100; FCP 1.1 s, **LCP 2.9 s** (above the 2.5 s limit, fix is in spec 016), TBT 40 ms, CLS 0, Speed Index 3.1 s.
- `/projects/dominocrm`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; the metrics are not visible in the screenshot.
- The CI value for `/` (Perf 51, TBT 31 s) does not reproduce in production: it is an artifact of the GPU-less runner, not a site problem.

**Lighthouse CI:**
- The job was seen green on PR #22 and did not block it (run 42178720232).

**Spec status:** 009, 010, 012, 013, 014 are Done. Spec 011 stays Draft: all its tickets wait for the developer's verification. Spec 015 is marked Done.
