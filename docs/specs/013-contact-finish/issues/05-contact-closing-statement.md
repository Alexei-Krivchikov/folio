# 05: Contact as a closing statement

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 03

**Status:** ready-for-human

## What to build

Rebuild `apps/web/components/contact/contact.tsx` so the last Section is a statement, not a heading with three pills: a giant call to action in the Hero's type scale, with Telegram, Email and GitHub as large magnetic buttons.

- **Links stay exactly as they are.** `https://github.com/Alexei-Krivchikov` (external), `https://t.me/A1exe1ch` (external), `mailto:krivchikov.alexei@gmail.com`. The external ones keep `target="_blank"` and `rel="noreferrer"`. Order of importance changes: Telegram and Email are the fast channels the supporting sentence names, so they come first and read as primary; GitHub follows as secondary.
- **Giant line.** The index label from ticket 03 above, then a large closing line in the Hero's style: extrabold, uppercase, tight leading and tracking, `text-foreground`, with one word set in `AccentText` (Instrument Serif italic) as the Hero does with "developer". Reuse the Hero's look, not its exact `clamp()`: that one is tuned so "Krivchikov" fits on one line, while this line is longer and is allowed to wrap onto two or three lines. Pick a size that fills the width at 1440px and does not overflow or break a word at 375px. If the same `clamp()` ends up in two places, give it one name.
- **Proposed text (the developer approves it in review).** *Let's build something* `together` *.* The italic word may change; it must stay one word and stay honest, with no claim about the developer that is not already on the page. This is a text decision, not a facts decision, so no separate copy ticket.
- **Supporting sentence.** Unchanged in meaning: "Open for frontend / fullstack opportunities. Fastest way: Telegram or Email." (The current source uses an em dash after "way"; follow the spec's colon.)
- **Buttons.** Each link inside `MagneticButton` from `@folio/ui` (`packages/ui/src/components/magnetic-button.tsx`, already used in the Project cards), styled as large pills: at least 44px tall at every width (the spec's check is at 375px), generous horizontal padding, a clear visible label. Visible focus ring unchanged (`focus-visible:outline-2 ... outline-accent`). They wrap onto a second row at 375px without horizontal scroll. The primary buttons can use the Ember gradient (`bg-accent-gradient`) and the secondary one the outlined style the pills have now; keep contrast AA on both.
- **Motion.** Keep the existing entrance (fade-up and stagger through `fadeUpVariants` / `staggerVariants`, `viewportOnce`). `MagneticButton` already does nothing on touch and under reduced motion.
- **No form, no CV, no calendar, no LinkedIn** (Out of Scope in the spec).

## Acceptance criteria

- [x] The Section shows the index label, the giant line with one italic word, the supporting sentence and three large buttons
- [x] The three links open the correct targets: Telegram and GitHub in a new tab, Email as `mailto:`
- [x] At 375px the buttons are at least 44px tall, wrap cleanly and there is no horizontal scroll; the giant line does not overflow
- [ ] At 1440px the buttons pull toward the pointer (magnetic) and do not on touch emulation or with reduced motion forced on (pull and touch checked; reduced motion is left for ticket 07)
- [x] Keyboard: Tab reaches the three links in order, focus rings are visible (the ring is now the shared `buttonVariants` `ring-2` Ember ring, the same as the Hero buttons, not the old `outline`)
- [x] Text/background contrast of every text on the Section is AA (ratios recorded under Comments)
- [ ] The developer has approved the giant line's wording (recorded under Comments)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Rebuilt `apps/web/components/contact/contact.tsx`. Heading through `SectionHeading` with `[ 04 / 04 ]` from `sectionIndex("contact")` and the proposed line "Let's build something *together*", the italic word in `AccentText` and `text-accent`. Style follows the Hero (extrabold, uppercase, `leading-[0.92]`, tight tracking), but the size is its own `clamp(2.25rem, calc((100vw - 3rem) / 7), 6rem)` passed through `style`, because the Hero's clamp is tuned to fit "Krivchikov" on one line and `SectionHeading`'s own `md:text-5xl` would win over a plain size class. It reaches 96px at 1440px and 46.7px at 375px. Section padding is now `py-24 md:py-32`.
- Supporting sentence: "Open for frontend / fullstack opportunities. Fastest way: Telegram or Email." (colon, as in the spec), `text-base md:text-lg text-muted`.
- Buttons: Telegram and Email are the primary gradient `buttonVariants()`, GitHub is the outline variant, in that order; each `<a>` sits inside `MagneticButton` inside a `motion.div` that keeps the fade-up and stagger. Height `h-14` (`h-16` from `md`), `px-8` (`px-10`), `text-base`. Targets unchanged: `https://t.me/A1exe1ch` and `https://github.com/Alexei-Krivchikov` with `target="_blank"` and `rel="noreferrer"`, `mailto:krivchikov.alexei@gmail.com`.
- Checked in the built-in browser. 1440px: heading on two lines plus the italic word, buttons 64px tall, links and attributes as above; the magnetic pull moved Telegram by about (7.5, -2.8)px and Email by about (-7.9, -1.5)px with the pointer between them, GitHub outside the radius stayed put. 375px: heading 46.7px and fits its box (`scrollWidth` equals `clientWidth`), buttons 56px tall, Telegram and Email on one row and GitHub wrapped to the next, `scrollWidth` 375 (no horizontal scroll), no magnetic transform in touch emulation. Keyboard: Tab goes Telegram, Email, GitHub, and the focused link shows the `ring-2` Ember ring with the background-coloured offset (`:focus-visible` true).
- Contrast (computed from the token colours on `#0b0908`): italic accent word 7.02, heading 17.42, supporting sentence (`--muted`) 7.18, GitHub label 17.42, button label `#0b0908` on the gradient 11.16 at the amber end and 5.64 at the red end, index label 7.18 as in spec 012 ticket 07. All are AA.
- One thing seen and not a bug in this change: loading `/#contact`, then scrolling, left the three buttons at opacity 0 once, right after hot reload; a fresh load of `/#contact` and of `/` both showed them. It looked like stale hot-reload state and did not reproduce.
- Still open: the developer's approval of the wording, and the Hero-vs-Contact reading of "the Hero's type scale". The line, the italic word and the size are easy to change in this one file.
