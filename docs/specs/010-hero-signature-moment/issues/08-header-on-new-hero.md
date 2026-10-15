# 08: Header on the new Hero

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04

**Status:** ready-for-agent

## What to build

Spec 009 made the Header a floating pill that appears once the Hero has scrolled off. The new Hero is a full-screen image with giant type, and the pill may look better visible from the first paint, or it may fight the headline. The spec leaves the choice to be made by looking at it.

- Render both options at 1440px and 375px over the running shader: the pill appearing only after the Hero (as now), and the pill visible from the first paint. Wait for the developer to choose; record the choice and why under Comments.
- If the pill is visible from the first paint: it sits above the canvas and the Grain (z-order checked), its text stays within AA over the brightest part of the aurora, the nav links and the logo keep their focus rings, and `useHeroPassed` and its use in `header.tsx` are adjusted. The Hero offset used for anchor scrolling (`HEADER_OFFSET`) does not change.
- If it stays as it is: nothing in the code changes, and the ticket records that the choice was made by looking.
- The mobile menu button and the Nav overlay keep working either way.

## Acceptance criteria

- [ ] Both options were shown at 1440px and 375px and the developer chose one; the decision is under Comments
- [ ] With the chosen option the pill's text is within AA over the brightest part of the aurora (ratios recorded) or the pill is unchanged
- [ ] Anchors still land below the pill; the active-link logic still works
- [ ] The Nav overlay opens and closes at 375px and returns focus to the menu button
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
