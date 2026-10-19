# 02: WordReveal

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

A generic `WordReveal` in `packages/ui` that shows a paragraph word by word as it scrolls into view. Nothing uses it yet; ticket 05 puts it on the About introduction.

- **API.** Takes the text as a string `children` (not nodes: splitting on whitespace has to be reliable), a `className` for the wrapper, and an optional `as` (default `p`). `packages/ui` already depends on `motion` (ticket 02 of spec 011).
- **Behaviour.** Each word is a `motion.span` (`inline-block` so it can translate) that fades and rises a few pixels, with a short stagger between words (`staggerChildren` around 0.02 to 0.04 s, chosen by looking; a 60-word paragraph must finish in about two seconds, not five). It plays once when the block enters the viewport, with the same rule as `viewportOnce` in `apps/web/components/motion/variants.ts` (`once: true`, `margin: "-80px"`). `packages/ui` must not import from `apps/web`, so the rule is repeated locally, not imported.
- **Accessibility.** The words are `aria-hidden`. The full unsplit text is also in the DOM as visually hidden text (`sr-only`) so a screen reader reads one normal sentence instead of word fragments. Do not put `aria-label` on the `p`: it is not reliably announced on a paragraph.
- **Spacing.** Words are separated by real spaces, not margins, so selecting and copying the text gives back the sentence, and wrapping behaves like ordinary text.
- **Reduced motion.** Every word is fully visible from the first paint: no opacity 0 state, no transform, no stagger. The source of the preference is the package's own (`useReducedMotion` from `motion/react`, or a small hook beside `usePointerMotion`); it must not make the server render and the first client render differ in a way that flashes hidden words for a user who has reduced motion on. If it does, prefer `motion-reduce:` CSS for the hidden state.
- **No layout shift.** The transform is on the words only; the block's height is the height of the final text from the first paint.
- Export `WordReveal` and its props type from `packages/ui/src/index.ts`.

## Acceptance criteria

- [ ] `WordReveal` is exported from `@folio/ui`
- [ ] A test paragraph reveals word by word once on entering the viewport and does not replay on scrolling back
- [ ] The DOM has the full text once as `sr-only` and the split words as `aria-hidden`; a screen reader (or the accessibility tree in devtools) reads the sentence once, intact
- [ ] Selecting and copying the paragraph gives the original sentence with normal spaces
- [ ] With reduced motion on, all words are visible immediately and no word has an inline `opacity` or `transform` of a hidden state
- [ ] The block's height is the same before, during and after the reveal (CLS 0)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
