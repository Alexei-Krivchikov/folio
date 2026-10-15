# 05: Pointer and touch behaviour

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04

**Status:** ready-for-human

## What to build

Make the shader react. On a desktop the pointer bends the aurora; on a touch device there is no pointer input and the field drifts on its own.

- New uniform `uPointer` (the pointer position inside the Hero, normalised). The value fed to the shader is smoothed in JavaScript each frame (a lerp toward the target), so the field follows the pointer fluidly and never jumps. When the pointer leaves the Hero the value eases back to a neutral position.
- The pointer path runs only for a fine pointer (`(pointer: fine)` and `(hover: hover)`), as the shared rules of specs 009 to 015 require. On coarse pointers no pointer listeners are attached; instead `uPointer` follows a slow wandering path computed from time, so the picture is alive without a finger.
- The listeners live on the Hero Section, are passive, and are removed when the component unmounts.
- The pointer must not cause layout work or React state updates per move: the target lives in a ref and is read by the render loop.
- The strength of the bend is chosen by looking: visible and rewarding, never violent.

## Acceptance criteria

- [x] Moving the mouse over the Hero bends the field smoothly at 1440px; leaving the Hero eases it back
- [x] With a coarse pointer (emulated touch) no pointer listeners are attached and the field drifts on its own
- [x] There is no React state update and no layout read on pointer move (checked in the performance panel or by reading the code path)
- [x] The listeners are removed on unmount (navigate away and back, no duplicates)
- [x] A written note under Comments says what `uPointer` does in the GLSL and how to change the strength
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Implementation

- `hero-shader.glsl.ts`: two new uniforms, `uPointer` (position in the same 0 to 1 space as `vUv`, y up) and `uPointerAmount` (0 to 1, how strongly the pointer acts). Right after the time is computed:

  - `toPointer` is the vector from the pointer to the pixel (with the aspect ratio applied so the area of influence is round, not oval).
  - `pull = exp(-dot(toPointer, toPointer) * 5.0) * uPointerAmount` is a soft round falloff: 1 under the pointer, near 0 beyond roughly a third of the screen.
  - The noise coordinates `p` are then shifted by `(rotated toPointer * 0.9 - toPointer * 0.5) * pull * POINTER_BEND`. The rotated part (`vec2(-y, x)`) makes the field swirl around the pointer, the minus part pulls it slightly towards it. Because the shift is added to `p` before the noise is sampled, the smoke itself bends; no extra brightness is added, so the contrast caps from ticket 04 still hold.
  - Strength knob: `POINTER_BEND` (0.4 now; it started at 1.4, which the developer found too strong, then 0.9, and the developer set 0.4 by hand) at the top of the fragment shader. Raise it for a stronger bend, lower it for a subtler one. The size of the affected area is the `5.0` in `pull` (smaller number, larger area).

- `hero-shader.tsx`:
  - `fine = matchMedia("(pointer: fine) and (hover: hover)")` is read once at mount. For a fine pointer, passive `pointermove` and `pointerleave` listeners go on the Hero Section (the host's parent). For a coarse pointer no listener is attached at all.
  - The move handler only stores `clientX`, `clientY` and sets `target.amount = 1`; everything else happens in the render loop. The loop turns the client position into the Hero's 0 to 1 space with a cached size and offset (updated by the existing `ResizeObserver`) plus `window.scrollY`, so there is no layout read and no React state update per move. Because the scroll position is read each frame, the bend stays under the pointer when the page scrolls without the mouse moving.
  - Smoothing: each frame `current` moves toward `target` by `1 - exp(-dt * 6)` (`POINTER_SMOOTHING`), which is frame-rate independent. The same easing drives `uPointerAmount`, so the effect fades in when the pointer enters and fades out (to 0, no leftover bend) when it leaves. When the pointer comes back after being away, the position snaps to it first so the field does not slide in from the old place.
  - Touch: the target follows a slow path computed from time (two sine waves per axis, periods of about 30 s and 12 s), and `uPointerAmount` is a constant 0.7 (`DRIFT_AMOUNT`). Nothing depends on a finger.
  - Cleanup removes both listeners together with the loop, the observer and the canvas.

### Verification

- Real mouse in the browser pane: moving it over the Hero bends the aurora in a swirl around the cursor (screenshot checked); the values fed to the shader follow it, for example the cursor at 1000,300 in a 1425x900 Hero gives `uPointer` 0.701, 0.667.
- Synthetic events: `uPointerAmount` eases 0.036, 0.071, 0.104 ... to 0.999 on entering and to 0.001 after `pointerleave` (about one second each way); after a pause the position snaps to the new pointer position.
- Emulated phone (375px, `pointer: coarse`): `fine` is false, `uPointer` moves by itself (0.710, 0.591 then 0.767, 0.476 a few seconds later), and a synthetic `pointermove` has no effect on it.
- Round trip to a Case study and back: 1 canvas, then 0 on the Case study, then 1 again; the pointer works after returning and the console has no errors.
- Reading the code path: the move handler touches no layout and no React state; the only per-frame reads are `performance.now()`, `window.scrollY` and the cached bounds.
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.

### For the developer

Move the mouse over the Hero and tell me if the bend is too weak or too strong (`POINTER_BEND`) and whether the area it affects feels right (the `5.0` in `pull`). The drift on a phone can be made slower or wider through the sine constants in the render loop.
