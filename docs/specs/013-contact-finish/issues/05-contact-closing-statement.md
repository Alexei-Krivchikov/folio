# 05: Contact as a closing statement

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** 03

**Status:** ready-for-agent

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

- [ ] The Section shows the index label, the giant line with one italic word, the supporting sentence and three large buttons
- [ ] The three links open the correct targets: Telegram and GitHub in a new tab, Email as `mailto:`
- [ ] At 375px the buttons are at least 44px tall, wrap cleanly and there is no horizontal scroll; the giant line does not overflow
- [ ] At 1440px the buttons pull toward the pointer (magnetic) and do not on touch emulation or with reduced motion forced on
- [ ] Keyboard: Tab reaches the three links in order, focus rings are visible and unchanged
- [ ] Text/background contrast of every text on the Section is AA (ratios recorded under Comments)
- [ ] The developer has approved the giant line's wording (recorded under Comments)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
