# Spec 013 — Contact, Footer and finishing touches

Status: Draft

## Problem Statement

The last Section is where a convinced recruiter acts, and today it is a heading, one sentence and three small pill links, followed by a one-line footer. It is the least memorable part of a page that has just become memorable. The page also has no sense of place or progress: nothing tells the visitor how far down they are, and nothing on a desktop reacts to the pointer outside of a few cards.

## Solution

Contact becomes a closing statement: a giant call to action in the Hero's type scale, with magnetic Telegram, Email and GitHub buttons. The Footer is restyled to match and shows the developer's local time at UTC+3. Across the whole page a few small global details tie the work together on desktop: a soft Ember spotlight and a ring that follow the pointer, HUD section indices, and a thin scroll-progress line. Together they give the page a finished, instrument-panel feel without changing what is on it.

## User Stories

1. As a recruiter who has decided to write, I want an unmistakable, easy call to action at the end of the page, so that contacting the developer takes one click.
2. As a visitor, I want Telegram, Email and GitHub as large buttons with clear labels, so that I can pick my channel.
3. As a visitor, I want to see the developer's local time, so that I know when he is likely to answer.
4. As a visitor on a desktop, I want the page to respond softly to my pointer, so that the whole site feels designed and not only its Hero.
5. As a visitor, I want to see where I am on the page, so that a long scroll is not disorienting.
6. As a visitor on a phone, I want none of the pointer effects, so that the page is light and nothing tracks a finger.
7. As a visitor with reduced-motion on, I want no pointer-following, magnetic pull or moving progress animation, so that nothing moves unless I scroll.
8. As a visitor using the keyboard, I want normal focus rings and the native cursor unchanged, so that accessibility is not traded for style.

## Implementation Decisions

- **Contact.** The existing three links and their targets are unchanged (`https://github.com/Alexei-Krivchikov`, `https://t.me/A1exe1ch`, `mailto:krivchikov.alexei@gmail.com`). The Section gets a giant closing line in the Hero's type scale with one Instrument Serif italic word, the Ember accent, and the `MagneticButton` from spec 011 for the three links. The supporting sentence stays honest and plain ("Open for frontend / fullstack opportunities. Fastest way: Telegram or Email.").
- **Footer.** Restyled with the tokens and `HudLabel`. A live local-time readout for UTC+3 is added, computed on the client after hydration with a stable server-rendered fallback so there is no hydration mismatch and no layout shift. The existing copyright line and the "Built with" line stay and are updated to include the new tools.
- **Cursor effects.** One global client component mounted in the root layout for a fine pointer with hover only. It renders a soft radial Ember spotlight that follows the pointer behind the content and a small ring that grows over interactive elements. The native system cursor is not hidden. The component is absent on touch, absent under reduced-motion, and does not capture pointer events.
- **HUD indices.** Each Section's heading carries an index of the form `[ 02 / 04 ]` in Geist Mono, generated from the actual Section order so it stays right if Sections change, through the `SectionHeading` primitive from spec 009.
- **Scroll progress.** A thin Ember line fixed at the top edge scales with page scroll progress, driven by Motion's `useScroll`. Under reduced-motion it still reflects position because that is not decorative motion, and changes without easing.
- **Where it lives.** The cursor component, the progress line and the clock are generic and live in `packages/ui`; the Contact Section and the Footer composition live in `apps/web`.

## Testing Decisions

- Verification before commit: `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web`.
- Browser pass at 1440px and 375px: Contact buttons wrap and stay at least 44px tall at 375px; the three links open the correct targets; no horizontal scroll.
- Pointer pass: spotlight and ring work with a mouse and are completely absent in touch emulation and with reduced-motion; the native cursor is still visible; clicks are never blocked by the overlay.
- Clock pass: no hydration warning in the console, no layout shift, correct UTC+3 time.
- Progress pass: the line reaches the right end exactly at the bottom of the page, including on the Case study page if it is mounted globally.
- Lighthouse mobile on the preview deployment: Performance at least 90, CLS 0, and no long task from the pointer handlers.

## Out of Scope

- A contact form, a calendar link, a downloadable CV, a LinkedIn link.
- Hiding the system cursor.
- Sound and haptics.
- The Case study redesign (spec 014) and OG, icon and Lighthouse CI work (spec 015).

## Further Notes

- The spotlight and the ring are the most "decorative" effects in the series. If they distract in the browser pass they are cut here and not tuned later; the page is meant to be finished, not busy.
