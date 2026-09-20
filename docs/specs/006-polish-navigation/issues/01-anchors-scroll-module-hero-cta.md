# 01: Section anchors, scroll module, Hero calls to action

**Spec:** [006-polish-navigation](../spec.md)

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## What to build

The thinnest complete path for anchor navigation: a visitor clicks a button in Hero and glides to a Section. Everything the Header will need later — ids, a reachable Lenis instance, an offset, hash-on-arrival — is built here, without any Header yet.

- Every Section gets an `id`: `hero`, `about`, `stack`, `experience`, `projects` (already present), `contact`.
- `LenisProvider` exposes its instance through a React context, with a `useLenis()` hook that returns the instance or `null`.
- A `useAnchorScroll()` hook, mounted on the home page, delegates clicks on `a[href^="#"]`: it prevents the native jump and calls `lenis.scrollTo(target, { offset: -HEADER_OFFSET })`. With no Lenis instance it falls back to native scrolling.
- `HEADER_OFFSET` is one exported constant, declared as the Header's height. The offset is applied in the Lenis call — not as CSS `scroll-mt-*` on Sections — so the height is written in one place.
- On mount the same hook reads `location.hash`; if it names a Section, it calls `lenis.scrollTo(hash, { immediate: true })`. This is what makes a Case study's `/#projects` Back link land on the Projects Section instead of at the top.
- Hero's two buttons become `next/link` elements styled with `buttonVariants` from `@folio/ui`: "Let's Talk" → `#contact`, "View Projects" → `#projects`. The `Button` component itself is not modified.

## Acceptance criteria

- [ ] Clicking "View Projects" in Hero scrolls smoothly to the Projects Section; "Let's Talk" scrolls to Contact
- [ ] The scroll ends with the target heading clear of `HEADER_OFFSET` pixels from the top
- [ ] Opening `/#contact` directly in a fresh tab lands on the Contact Section
- [ ] Clicking "← Back" on `/projects/dominocrm` returns to the home page with the Projects Section in view
- [ ] Both Hero buttons are real anchors: middle-click and "open in new tab" work, and they are reachable by Tab with a visible focus ring
- [ ] Every Section has its `id` and none of them carry `scroll-mt-*`
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
