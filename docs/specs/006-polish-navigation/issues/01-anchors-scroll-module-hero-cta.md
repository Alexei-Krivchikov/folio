# 01: Section anchors, scroll module, Hero calls to action

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** Done

## What to build

The thinnest complete path for anchor navigation: a visitor clicks a button in Hero and glides to a Section. Everything the Header will need later — ids, a reachable Lenis instance, an offset, hash-on-arrival — is built here, without any Header yet.

- Every Section gets an `id`: `hero`, `about`, `stack`, `experience`, `projects` (already present), `contact`.
- `LenisProvider` exposes its instance through a React context, with a `useLenis()` hook that returns the instance or `null`.
- A `useAnchorScroll()` hook, mounted on the home page, delegates clicks on `a[href^="#"]`: it prevents the native jump and calls `lenis.scrollTo(target, { offset: -HEADER_OFFSET })`. With no Lenis instance it falls back to native scrolling.
- `HEADER_OFFSET` is one exported constant, declared as the Header's height. The offset is applied in the Lenis call — not as CSS `scroll-mt-*` on Sections — so the height is written in one place.
- On mount the same hook reads `location.hash`; if it names a Section, it calls `lenis.scrollTo(hash, { immediate: true })`. This is what makes a Case study's `/#projects` Back link land on the Projects Section instead of at the top.
- Hero's two buttons become `next/link` elements styled with `buttonVariants` from `@folio/ui`: "Let's Talk" → `#contact`, "View Projects" → `#projects`. The `Button` component itself is not modified.

## Acceptance criteria

- [x] Clicking "View Projects" in Hero scrolls smoothly to the Projects Section; "Let's Talk" scrolls to Contact
- [x] The scroll ends with the target heading clear of `HEADER_OFFSET` pixels from the top
- [x] Opening `/#contact` directly in a fresh tab lands on the Contact Section
- [x] Clicking "← Back" on `/projects/dominocrm` returns to the home page with the Projects Section in view
- [x] Both Hero buttons are real anchors: middle-click and "open in new tab" work, and they are reachable by Tab with a visible focus ring
- [x] Every Section has its `id` and none of them carry `scroll-mt-*`
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

Three things the browser pass turned up, all fixed in the implementation:

- The click handler has to run in the **capture** phase. `next/link` prevents the default itself and lets the router scroll to the hash, so a bubble-phase listener was too late and the Header offset was lost.
- The scroll target is computed from the document (`rect.top + scrollY - HEADER_OFFSET`) and handed to Lenis as a number, not as an element. Lenis derives an element's position from its own `animatedScroll`, which the router has usually just moved behind its back.
- Arriving from a Case study, Lenis still holds the *Case study's* dimensions and clamps the scroll to that shorter document (`#projects` landed 600px low). The mount-time scroll calls `lenis.resize()` first.

`buttonVariants` in `@folio/ui` was rendering its focus ring black-on-black (`ring-2` with no colour, default currentColor) — invisible on this site, which the "visible focus ring" criterion needs. Fixed by adding `focus-visible:ring-white focus-visible:ring-offset-background` to the base variant. The `Button` component's API is untouched; no `asChild`, no Slot.

"Let's Talk" reaches Contact but stops at the page's scroll limit rather than putting Contact's heading at `HEADER_OFFSET`: Contact plus Footer are shorter than one viewport, so there is nothing left to scroll. Contact is fully in view.

Reported after the first pass: clicking a Project card opened the Case study part-way down the page. Lenis carries an in-flight smooth scroll across a navigation, so a click taken while the wheel momentum was still easing applied the remaining inertia to the next page. `LenisProvider` now passes `stopInertiaOnNavigate: true`, which resets the animation on a click to a different pathname. Pre-existing since the provider was added, not introduced here.
