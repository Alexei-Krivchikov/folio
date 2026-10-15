# 05: Pointer and touch behaviour

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04

**Status:** ready-for-agent

## What to build

Make the shader react. On a desktop the pointer bends the aurora; on a touch device there is no pointer input and the field drifts on its own.

- New uniform `uPointer` (the pointer position inside the Hero, normalised). The value fed to the shader is smoothed in JavaScript each frame (a lerp toward the target), so the field follows the pointer fluidly and never jumps. When the pointer leaves the Hero the value eases back to a neutral position.
- The pointer path runs only for a fine pointer (`(pointer: fine)` and `(hover: hover)`), as the shared rules of specs 009 to 015 require. On coarse pointers no pointer listeners are attached; instead `uPointer` follows a slow wandering path computed from time, so the picture is alive without a finger.
- The listeners live on the Hero Section, are passive, and are removed when the component unmounts.
- The pointer must not cause layout work or React state updates per move: the target lives in a ref and is read by the render loop.
- The strength of the bend is chosen by looking: visible and rewarding, never violent.

## Acceptance criteria

- [ ] Moving the mouse over the Hero bends the field smoothly at 1440px; leaving the Hero eases it back
- [ ] With a coarse pointer (emulated touch) no pointer listeners are attached and the field drifts on its own
- [ ] There is no React state update and no layout read on pointer move (checked in the performance panel or by reading the code path)
- [ ] The listeners are removed on unmount (navigate away and back, no duplicates)
- [ ] A written note under Comments says what `uPointer` does in the GLSL and how to change the strength
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
