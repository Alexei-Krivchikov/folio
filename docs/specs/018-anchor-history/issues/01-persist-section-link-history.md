# 01: Persist Section link history

**Spec:** [018-anchor-history](../spec.md)

**Status:** resolved

## What changed

Section link clicks now add their hash to browser history. `popstate` resolves the hash through the existing scroll seam, and initial hash handling shares the same hash-to-Section resolver.

## Verification

- [x] Header and Hero Section links write a history entry in the browser.
- [x] Back returns to the prior position and Forward returns to the Section in the browser.
- [x] Direct `/#projects` navigation lands below the Header, and the Nav overlay writes its link hash in the browser.
- [x] Reduced-motion behaviour is unchanged: the new history seam delegates to the existing Lenis-or-native-scroll branch.
- [x] Biome, TypeScript, and production build pass before commit.
