# 07: Verification pass for Contact and finishing touches

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05, 06

**Status:** ready-for-agent

## What to build

No new features. The cross-cutting checks from the spec's Testing Decisions, run once on the finished work, with findings fixed or written down. Steps that need the preview deployment, a real device or a screen reader are the developer's.

- **Browser pass at 1440px and 375px:** Contact buttons wrap and are at least 44px tall at 375px; the three links open the right targets; no horizontal scroll anywhere; the Footer reads well.
- **Pointer pass:** the spotlight works with a mouse and is absent in touch emulation and under reduced motion; the native cursor is still visible; clicks, selection and focus rings are never blocked by the overlay.
- **Reduced-motion pass:** reduced motion cannot be emulated in the pane or in the real Chrome, so force `matchMedia('(prefers-reduced-motion: reduce)')` to `true` and remount, as in spec 011 and spec 012 ticket 07. Expect: no spotlight, no magnetic pull, the progress line still follows scroll but without easing. Check the built CSS rules separately where a hook caches its first value.
- **Clock pass:** no hydration warning in the console, no layout shift, correct UTC+3 time, rolls over on the minute.
- **Progress pass:** the line reaches the right end exactly at the bottom of the page, on the home page and on a Case study page.
- **HUD indices pass:** `[ 01 / 04 ]` to `[ 04 / 04 ]` in order; the Active section highlight and anchor scroll are unaffected.
- **Keyboard pass:** Tab order through Contact and Footer, visible focus rings, no focus trap from the global layers.
- **Contrast:** every text/background pair on Contact, Footer and the index labels is AA, including body text under the brightest part of the spotlight; ratios recorded.
- **Keep or cut the spotlight.** The spec says the spotlight is the most decorative effect of the series and that, if it distracts in the browser pass, it is cut here and not tuned later. (The ring that was built in ticket 02 was already cut by the developer after a first look.) Look at the page with the spotlight on and record the verdict. This is the developer's call; if they decide to cut, remove `CursorSpotlight`, its export and its mount, and update the spec's wording.
- **Lighthouse mobile on the preview deployment:** Performance at least 90, CLS 0, and no long task from the pointer handlers. If Performance is lower and the cause is the Hero shader and not this work, record that and tell the developer instead of closing quietly; reaching the numbers is also the work of spec 016.
- **Docs:** add a `CONTEXT.md` term only if one settled during the work and is worth a name (for example the spotlight or the HUD index).
- Set `Status: Done` in `spec.md` once everything below is ticked.

## Acceptance criteria

- [x] Browser pass done at 1440px and 375px with no horizontal scrollbar
- [x] Pointer pass done
- [x] Reduced-motion pass done
- [x] Clock pass done
- [x] Progress pass done on the home page and a Case study page
- [x] HUD indices pass done
- [x] Keyboard pass done
- [x] Contrast table written under Comments; every pair is AA
- [x] Keep-or-cut decision on the spotlight recorded under Comments
- [x] Lighthouse mobile numbers recorded under Comments; CLS is 0 (moved to spec 016 by the developer's decision; CLS 0 and no long tasks were measured locally, see Comments)
- [x] `CONTEXT.md` is up to date
- [x] Spec 013 is marked Done
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

How it was checked: a script in the session scratchpad drove a headless Chrome over the DevTools Protocol against the **production build** (`next build` then `next start`, port 3101), not the dev server. Chrome's emulation covers what the built-in pane and the extension cannot: `prefers-reduced-motion: reduce` set before the page loads, touch emulation with a coarse pointer, and 4x CPU throttling. This is not Lighthouse, and no screen reader was used. The production server and Chrome were stopped afterwards.

- **Browser pass.** 1440px: `scrollWidth` 1425 against a 1440 viewport (the difference is the scrollbar), nothing outside the viewport; the Contact links are Telegram `https://t.me/A1exe1ch` (`_blank`, `noreferrer`), Email `mailto:krivchikov.alexei@gmail.com`, GitHub `https://github.com/Alexei-Krivchikov` (`_blank`, `noreferrer`), each 64px tall. 375px (mobile and touch emulation): `scrollWidth` 375, nothing overflowing outside the marquee, Contact heading 46.7px and fits its box, buttons 56px tall with GitHub wrapped to a second row, Footer right edge at 375 with "Built with" and the copyright on two lines.
- **Pointer pass.** Desktop with a mouse: before any move the spotlight layer exists with opacity 0; after 300 mouse moves it is at opacity 1 and its centre tracks the pointer (893, 275); a synthetic `pointerleave` brings it back to opacity 0. The system cursor is untouched (`cursor: auto`). A real mouse press and release on the Hero "Let's Talk" button while the spotlight was fully visible landed on the button (`elementFromPoint` returned the link, the page scrolled to Contact), and selecting the Hero heading still returns its text, so the layer blocks neither clicks nor selection. In touch emulation (`(pointer: fine) and (hover: hover)` false) the DOM has only `Grain` and the progress line; the spotlight is not there.
- **Reduced-motion pass.** With `prefers-reduced-motion: reduce` emulated before load (`matchMedia` reports `true`): no spotlight layer even after mouse moves; the progress line at mid-scroll is exactly 0.5 two frames after the scroll and 0.5 again 1.5 s later, so there is no easing, 1 at the bottom and 0 at the top; the three Contact buttons are at opacity 1 at once; the magnetic wrappers have `transform: none` with the mouse next to the buttons. This closes the reduced-motion items left open in tickets 01, 02 and 05.
- **Clock pass.** Footer clock reads 13:11 when UTC+3 is 13:11 and has `dateTime="13:11"`; the minute rollover was seen in ticket 04. The console has no hydration warning in any run. The only console errors are a `404` and a MIME refusal for `/_vercel/insights/script.js`: that script is served by Vercel, not by `next start`, and the Analytics component was already in the layout before this spec, so it is expected locally and not part of this change.
- **CLS and long tasks (not Lighthouse).** Layout shift observed from load through a full scroll of the page: 0 on desktop; 0 on mobile after load and a jump to the bottom. Long tasks (observer on `longtask`): none during 300 mouse moves at normal speed, none with the CPU throttled 4x, and none on the throttled mobile load.
- **Progress pass.** Home page: 0 at the top, 0.5 at half (1750 of 3500) and 1 at the bottom; Case study `/projects/dominocrm`: 0 at the top and 1 at the bottom (1387 of 1387).
- **HUD indices pass.** `[ 01 / 04 ]` Projects, `[ 02 / 04 ]` About, `[ 03 / 04 ]` Experience, `[ 04 / 04 ]` Contact. Clicking each Header link lands its Section 88px under the top (Contact at 136px because the page cannot scroll further) and `aria-current` is set only on the clicked link. Anchor scroll is unaffected.
- **Keyboard pass.** Focusing the last control before Contact and pressing Tab goes Telegram, Email, GitHub (each `:focus-visible` with a ring), then focus leaves the page content and wraps to the Header; the Footer has no focusable element and nothing traps focus. The overlay layers are not focusable.
- **Contrast** (computed from the token colours; all AA):

  | Pair | Ratio |
  |---|---|
  | Contact heading `#f5efe9` on `#0b0908` | 17.42 |
  | Italic accent word `#ff6b3d` on `#0b0908` | 7.02 |
  | Supporting sentence, index labels, Footer captions (`--muted` `#a39a91`) | 7.18 |
  | Footer time `#f5efe9` | 17.42 |
  | Button label `#0b0908` on the gradient, amber end `#ffb347` | 11.16 |
  | Button label on the gradient, red end `#ff3d2e` | 5.64 |
  | `--muted` text under the spotlight peak (12% Ember, screen blend: text `#ae9f94` on `#28150f`) | 6.80 |

- **Keep or cut the spotlight.** Kept. The developer looked at it in the browser, said the spotlight is fine and the ring is not, asked for it to be weaker (the ring was removed and the spotlight went from 640px at 20% to 420px at 12%) and then confirmed: "оставляем".
- **Lighthouse mobile on the preview deployment: moved to spec 016.** The developer decided Lighthouse runs will be done separately, in [spec 016](../../016-lighthouse-lcp/spec.md), which exists for exactly this: measure the finished site once on the preview and fix the misses in one place. It was not run here. What was measured locally on the production build is above (CLS 0, no long tasks).
- **Docs.** `CONTEXT.md` needs no change: the Sections list is still Hero, Projects, About, Experience, Contact, and none of the new pieces (progress line, spotlight, clock, index) is a domain term worth a name.
- Spec 013 is marked Done: the spotlight and the Contact wording are confirmed by the developer, and the Lighthouse numbers are tracked in spec 016.
