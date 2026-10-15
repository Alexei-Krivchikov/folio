# 08: Verification pass for the visual foundation

**Spec:** [009-visual-foundation](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06, 07

**Status:** ready-for-human

## What to build

No new code. The cross-cutting checks from the spec, run once on the finished result, with findings fixed or written down.

- Browser pass at 1440px and 375px over every Section and the Case study page: fonts, palette, Grain, Header pill, overlay, anchors landing below the pill.
- Contrast: a table of every text/background pair actually used, with its ratio, in Comments.
- Keyboard pass: tab order unchanged from before the spec, focus rings visible on every interactive element in the new colours.
- Reduced motion with the OS setting on: no new decorative motion, Grain still present, the page behaves as before.
- Lighthouse mobile on the preview deployment: Performance 90 or above, LCP at most 2.5 s on the 4G profile, CLS 0. If the font payload from ticket 01 hurts LCP, trim the font axes or weights first.
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [x] Browser pass done at 1440px and 375px with no old-style leftovers and no horizontal scrollbar
- [x] Contrast table written under Comments; every pair is AA
- [x] Keyboard pass done; tab order identical to before
- [x] Reduced-motion pass done
- [x] Lighthouse mobile on the preview deployment run and recorded (87 to 89, LCP 3.3 to 3.5 s, CLS 0). The 90 and 2.5 s targets are not met and are handled in [spec 016](../../016-lighthouse-lcp/spec.md) after specs 010 to 015, by the developer's decision
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
- [x] Spec 009 is marked Done

## Comments

### Contrast (computed from the ticket 01 tokens)

| Pair | Where used | Ratio | Result |
|---|---|---|---|
| foreground on background | headings, body, nav, tags | 17.42:1 | AA |
| muted on background | secondary text, labels, footer | 7.18:1 | AA |
| accent on background | links, active nav, focus ring | 7.02:1 | AA |
| background on gradient start | default Button text | 11.16:1 | AA |
| background on gradient end | default Button text | 5.64:1 | AA |
| foreground on 5% surface | Stack tiles, tags, Hero pill, Contact links | 16.02:1 | AA |
| muted on 3% surface | Project cards | 6.86:1 | AA |
| muted on 5% surface | muted text on tiles | 6.60:1 | AA |
| accent on 5% surface | Contact link hover | 6.46:1 | AA |
| accent on 3% surface | Project card hover | 6.71:1 | AA |

The Footer's second line moved from `zinc-600` to muted in ticket 06 because the old colour was below AA. The 6% Grain overlay is not included; it shifts luminance by a negligible amount.

### Keyboard pass

- Diff of `apps/web` and `packages/ui` since `2e8d368` (before spec 009): no link, button or `tabIndex` was added, removed or reordered; the only new element is the non-focusable `aria-hidden` Grain `div`. Tab order is therefore the same as before.
- Walked with real Tab presses on the home page: Hero buttons, the three project cards, GitHub, Telegram, Email, then the Header logo and menu button (the Header sits after `main` in the DOM, as before). Settled outline colours: Header and Contact links and Project cards `rgb(255,107,61)` solid 2px, Hero buttons ring `rgb(255,107,61)` with a `rgb(11,9,8)` offset. Reading the outline at `focusin` returns the start of the colour transition, so values must be read after about 400 ms.
- Every interactive element carries an accent `focus-visible` class (Header, Nav overlay, Button, Project card, Contact links, Case study links).

### Reduced motion

- Headless Chrome with `--force-prefers-reduced-motion`: the Hero pulse dot loses `animate-pulse`. Grain is static (`animation: none`, `pointer-events: none`) and present regardless.
- No motion code was changed in spec 009; the only new wrapper (Stack heading) uses the reduced-aware `groupAnim` variant. Not checked: a full visual pass with the OS setting on.

### Browser pass and anchors

- 375px: all Sections, the three Case studies and the 404 page render in the new palette and fonts, no horizontal scroll, no Header on Case study pages (tickets 05 to 07). Header pill opens the overlay; the Hero "View Projects" link lands the Projects Section at 88px from the top, below the pill (pill bottom 72px). "Let's Talk" scrolls to the page end because Contact is the last Section.
- 1440px (emulated 1440x900 viewport in the browser pane, screenshots of the real render): Hero, About, Stack, Experience, Projects, Contact, Footer, the Header pill with its nav links and the active link in accent, the Case study page (`/projects/dominocrm`) and the 404 page all use the new palette and fonts, with the HUD labels in place and nothing cut off. `scrollWidth` 1425 equals `clientWidth` 1425, so no horizontal scrollbar. Project cards are 476px wide in two columns, Contact links sit in one row, the pill is 768x56 centred at the top.
- Pane quirks seen while checking, not app issues: after a programmatic scroll the pane sometimes returns a black or half-repainted frame until a second screenshot, and `IntersectionObserver` callbacks (so the Header fade-in) only fire once the pane paints. Headless Chrome screenshots were not usable because Motion does not finish its animations under virtual time.

### Lighthouse (local production build, mobile, simulated slow 4G, 3 runs each)

| Build | Performance | LCP | CLS | FCP |
|---|---|---|---|---|
| Before spec 009 (`2e8d368`) | 95 | 2.9 s | 0 | 0.9 s |
| After ticket 07 | 91 to 92 | 3.4 s | 0 | 0.9 to 1.4 s |

- Fonts: three self-hosted woff2 files (41 + 23 + 16 KB), 0 requests to Google font hosts.
- The LCP element is the Hero `h1`; almost all of it is render delay (2.5 s before, 3.0 s after), because the `h1` starts at `opacity: 0` until the page hydrates and the fade-in runs. The LCP was already above 2.5 s before this spec, so the target is not met either way, and the spec adds about 0.5 s.
- Tried and rejected: `preload: false` on Geist Mono and Instrument Serif (LCP 3.4 to 3.3 s, within noise) and removing Grain (3.3 s, no change). Both were reverted; nothing is left in the tree.
- This is a local run, not the preview deployment, so the criterion stays open. The numbers will differ on Vercel (CDN, no local throttling of TTFB). The branch is not pushed (`origin/dev` is at `73f2809`).

### Lighthouse on the preview deployment

Branch `dev` at `647f43a`, Vercel preview behind deployment protection (opened with a Protection Bypass for Automation header), mobile, simulated slow 4G, 3 runs:

| Run | Performance | LCP | CLS | FCP | TBT |
|---|---|---|---|---|---|
| 1 | 87 | 3.5 s | 0 | 1.7 s | 20 ms |
| 2 | 89 | 3.3 s | 0 | 1.5 s | 20 ms |
| 3 | 89 | 3.3 s | 0 | 1.5 s | 30 ms |

- CLS is 0 and the fonts are the same three self-hosted files (41 + 23 + 16 KB), with no request to Google font hosts. Performance (87 to 89) and LCP (3.3 to 3.5 s) miss the targets of at least 90 and at most 2.5 s.
- The LCP element is again the Hero `h1`: render delay 2.6 s of 3.5 s, TTFB 0.9 s. The production HTML still carries `style="opacity:0;transform:translateY(25px)"` on the `h1`, which is what the LCP ticket in spec 016 looks at.
- The pre-spec Vercel deployment (`2e8d368`) was no longer reachable, so there is no baseline on the preview; the local baseline (95, 2.9 s) from above is the only comparison. Preview numbers are about 0.2 s worse than the local production build, consistent with the longer TTFB.

### Closing

Decision by the developer: spec 009 is closed with the Lighthouse numbers recorded as they are. The shortfall (Performance 87 to 89 against 90, LCP 3.3 to 3.5 s against 2.5 s) moves to [spec 016](../../016-lighthouse-lcp/spec.md), to be taken after specs 010 to 015, when the Hero, the Sections and the payload have reached their final shape. The attempt made inside this spec (the Hero `h1` as a plain element) was reverted because the Hero looked flat without its entrance; it is described in the ticket moved to spec 016.
