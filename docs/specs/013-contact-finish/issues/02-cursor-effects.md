# 02: Cursor spotlight and ring

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

One global client component that adds two soft effects for a desktop pointer: a radial Ember spotlight that follows the pointer behind the content, and a small ring that follows it and grows over interactive elements. The system cursor is never hidden. These are the most decorative effects of the series; ticket 07 decides whether they stay.

- **Component.** `CursorEffects` (name is free) in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts`, mounted once in `apps/web/app/layout.tsx`.
- **Gate.** Render nothing unless `usePointerMotion()` (already in `packages/ui/src/lib/use-pointer-motion.ts`) is `true`: fine pointer with hover and no reduced motion. Its server snapshot is `false`, so the server markup is empty and there is no hydration mismatch. On a phone or with reduced motion the component is absent from the DOM, not just hidden.
- **Spotlight.** A fixed, full-viewport layer with a `radial-gradient` centred on the pointer, Ember at a low alpha fading to transparent, roughly 400 to 600px across. Drive the centre with motion values or CSS variables updated from a single `pointermove` listener on `window` (passive); no React state per move, so no re-render and no long task.
- **Ring.** A small bordered circle (about 28 to 32px) following the pointer with a short spring. It grows over interactive elements: decide "interactive" with `event.target.closest("a, button, [role='button'], summary, input, textarea, select, label")`, evaluated in the same `pointermove` handler, and toggle one boolean or a CSS custom property, not a React state change per event.
- **Visibility.** Both layers stay hidden until the first `pointermove`, and hide again on `pointerleave` of the document, so they never sit in a corner at 0,0.
- **No interference.** `pointer-events: none` on every layer. They must not change focus rings, must not hide the native cursor, and must never block a click or a text selection.
- **Layering.** Pitfall to check first: `apps/web/app/page.tsx` wraps the page in `<main className="... bg-background">`, which is opaque, so a fixed layer placed behind `main` is invisible. Either put the layers above the content with a low alpha and `pointer-events: none` (as `Grain` does), or drop the duplicate background from `main` (the `body` already sets `bg-background`) and keep the layers behind it. Whichever is chosen, the spotlight must read as light behind the text and not as a tint over it, and body text contrast must stay AA with the spotlight directly under it.
- **Case study pages.** The component is global, so it appears there too. Confirm it does not fight with the Case study layout.

## Acceptance criteria

- [ ] `CursorEffects` is exported from `@folio/ui` and mounted once in the root layout
- [ ] With a mouse at 1440px: the spotlight follows the pointer smoothly, the ring grows over links, buttons and cards, and the native cursor is still visible
- [ ] In touch emulation and with reduced motion forced on, neither layer is in the DOM
- [ ] Clicks, text selection and keyboard focus rings behave exactly as before, including over the layers
- [ ] The pointer leaving the window hides both layers; they do not appear before the first move
- [ ] No hydration warning in the console
- [ ] Performance panel while moving the mouse: no long task from the handlers, no React render per move
- [ ] Text contrast over the brightest part of the spotlight is still AA (one sample recorded under Comments)
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
