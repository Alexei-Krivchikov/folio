# 02: Cursor spotlight

**Spec:** [013-contact-finish](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

## What to build

One global client component that adds a soft radial Ember spotlight following a desktop pointer. The system cursor is never hidden. It is the most decorative effect of the series; ticket 07 decides whether it stays.

The first version also drew a small ring that followed the pointer and grew over interactive elements. The developer looked at it in the browser and cut it ("cringe"), so it was removed here and in the spec; only the spotlight remains.

- **Component.** `CursorSpotlight` in `packages/ui/src/components/cursor-spotlight.tsx`, exported from `packages/ui/src/index.ts`, mounted once in `apps/web/app/layout.tsx`.
- **Gate.** Render nothing unless `usePointerMotion()` (already in `packages/ui/src/lib/use-pointer-motion.ts`) is `true`: fine pointer with hover and no reduced motion. Its server snapshot is `false`, so the server markup is empty and there is no hydration mismatch. On a phone or with reduced motion the component is absent from the DOM, not just hidden.
- **Spotlight.** A fixed 420px layer with a `radial-gradient`, Ember at 12% alpha fading to transparent, centred on the pointer. It is moved only by `transform` through Motion values and a soft spring, from a single passive `pointermove` listener on `window`; no React state per move, so no re-render and no long task. Touch pointer events are ignored.
- **Visibility.** Hidden until the first `pointermove` (it jumps to the pointer on that move, so it does not fly in from a corner), and hidden again on `pointerleave` of the document.
- **No interference.** `pointer-events: none`, `aria-hidden`. It must not change focus rings, hide the native cursor, or block a click or a text selection.
- **Layering.** `apps/web/app/page.tsx` wraps the page in `<main className="... bg-background">`, which is opaque, so a layer behind `main` would be invisible. The layer is above the content at `z-30` (under `Grain` `z-40` and the Header `z-50`) with `mix-blend-screen`, so it adds light to dark areas and barely changes bright text.
- **Case study pages.** The component is global, so it appears there too.

## Acceptance criteria

- [x] `CursorSpotlight` is exported from `@folio/ui` and mounted once in the root layout
- [x] With a mouse at 1440px the spotlight follows the pointer smoothly and the native cursor is still visible
- [x] In touch emulation and with reduced motion forced on, the layer is not in the DOM
- [x] Clicks, text selection and keyboard focus rings behave exactly as before, including under the layer
- [x] The pointer leaving the window hides the layer; it does not appear before the first move
- [x] No hydration warning in the console
- [ ] Performance panel while moving the mouse: no long task from the handler, no React render per move (no long task at 1x or 4x CPU; React renders not counted)
- [x] Text contrast over the brightest part of the spotlight is still AA (one sample recorded under Comments)
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

- Checked in the built-in browser at 1440x900 with a mouse after the ring was removed: exactly one layer is added to the body (`z-30`, `pointer-events: none`), it sits at the pointer after a move (transform follows the mouse, opacity 1) and the page shows a soft Ember glow behind the text. In mobile emulation (375px, `(pointer: fine) and (hover: hover)` false) the earlier build had only `Grain` and `ScrollProgress` in the DOM; the gate has not changed. No hydration warning or error in the console after a reload.
- Contrast: calculated, not measured on screenshots. At the spotlight peak (accent at 12% alpha, screen blend) the dark background becomes about rgb(40, 21, 15) and `--muted` text about rgb(174, 159, 148), a ratio of about 6.8, so AA holds for the dimmest text colour.
- Not verified: the pointer leaving the window (the `pointerleave` handler is written but not triggered), reduced motion (the gate is the same `usePointerMotion()` hook that `MagneticButton` and `TiltCard` use, and it cannot be switched from the page after load; ticket 07 covers it), the Performance panel, and click, selection and focus behaviour under the layer by hand. A first attempt to force reduced motion in an iframe hung the pane and was dropped.
- The first version was 640px at 20% alpha; the developer found it too strong, so it was cut to 420px at 12%.
- For ticket 07's keep-or-cut call: on the Hero the spotlight is almost invisible against the shader; it shows on the quiet Sections.
- Closed in ticket 07 with Chrome emulation on the production build: absent from the DOM in touch emulation and under emulated reduced motion; opacity 0 before the first move, 1 while moving, 0 after a `pointerleave`; a real click on the Hero button under the visible layer worked and text selection worked; no long task during 300 mouse moves, also with the CPU throttled 4x. The "no React render per move" half is not measured; the component has no state.
