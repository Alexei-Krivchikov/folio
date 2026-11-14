# 01: Show the Header when landing on Projects

**Spec:** [019-header-at-projects](../spec.md)

**Status:** resolved

## Repro

Open `/#projects` (or click "View Projects", or the Case study "← Back"). After the scroll settles:

```js
document.querySelector("header").inert // true: the Header is hidden
document.getElementById("hero").getBoundingClientRect().bottom // 88, the Header line
```

Scrolling further flips `inert` only once the Hero's bottom passes about -88px, which shows the observer's top margin is pushed outward instead of inward.

## Fix

`useHeroPassed` observes the Hero with a top `rootMargin` of `-(HEADER_OFFSET + 2)px`. The Hero counts as passed as soon as its bottom is at or above the Header line, with a 2px allowance for sub-pixel layout, because an edge that only touches the shrunken root still counts as intersecting.

Trade-off: the old positive margin started the fade-out a Header height before the Hero came back into view. The Header now fades out as the Hero reappears below it, which is what lets a Section landing at the line keep the Header.

## Regression check

The repo has no test framework (out of scope here, as in spec 018), so there is no seam for an automated test. The check is the browser script above, which must read `inert === false` at Projects and `inert === true` at `scrollY = 0`.

## Verification

- [x] `/#projects`, "View Projects", the Header Projects link and the Case study Back link land with the Header visible and Projects active.
- [x] At the top of the page the Header is hidden; scrolling back into the Hero hides it again.
- [x] `/projects/dominocrm` still renders no Header.
- [x] Biome and TypeScript pass.
