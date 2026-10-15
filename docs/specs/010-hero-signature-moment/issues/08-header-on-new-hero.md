# 08: Header on the new Hero

**Spec:** [010-hero-signature-moment](../spec.md)

**Blocked by:** 04

**Status:** ready-for-human

## What to build

Spec 009 made the Header a floating pill that appears once the Hero has scrolled off. The new Hero is a full-screen image with giant type, and the pill may look better visible from the first paint, or it may fight the headline. The spec leaves the choice to be made by looking at it.

- Render both options at 1440px and 375px over the running shader: the pill appearing only after the Hero (as now), and the pill visible from the first paint. Wait for the developer to choose; record the choice and why under Comments.
- If the pill is visible from the first paint: it sits above the canvas and the Grain (z-order checked), its text stays within AA over the brightest part of the aurora, the nav links and the logo keep their focus rings, and `useHeroPassed` and its use in `header.tsx` are adjusted. The Hero offset used for anchor scrolling (`HEADER_OFFSET`) does not change.
- If it stays as it is: nothing in the code changes, and the ticket records that the choice was made by looking.
- The mobile menu button and the Nav overlay keep working either way.

## Acceptance criteria

- [x] Both options were shown at 1440px and 375px and the developer chose one; the decision is under Comments
- [x] With the chosen option the pill's text is within AA over the brightest part of the aurora (ratios recorded) or the pill is unchanged
- [x] Anchors still land below the pill; the active-link logic still works
- [x] The Nav overlay opens and closes at 375px and returns focus to the menu button
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments

### Decision

Both options were rendered over the running shader and the developer chose **A: the Header stays as it is**, appearing only after the Hero has scrolled off. No Header code changes in the end; the temporary `?header=always` switch used for the comparison was removed.

Why (from the comparison): with the pill visible from the first paint, the logo text "Alexei Krivchikov" sits right under or over the giant headline with the same name, and on a phone the pill is a few pixels above the status pill. The Hero already carries the name and the calls to action; the navigation matters once the visitor scrolls.

### Option B, for the record (not shipped)

If it is ever wanted: show the pill with `heroPassed || always`, which is a one-line change in `header.tsx`. Checked and found fine on the facts that matter:

- Layers: the Header is `z-50`, the Grain `z-40`, the shader host `-z-10`, so the pill is above both.
- Contrast of the pill text (`bg-background/70` over the blurred aurora at its worst point, computed over the pill's rectangle with the aurora at its cap):

| Text | 1440x900 | 375x812 |
|---|---|---|
| Logo (foreground) | 14.14:1 | 14.58:1 |
| Links (muted) | 5.83:1 | 6.01:1 |
| Active link (accent) | 5.70:1 | 5.88:1 |

### Verification

- Unchanged Header (option A): hidden and `inert` while the Hero is on screen, appears after it; anchors land at 88px, below the pill; the active-link logic and the Nav overlay are untouched since spec 009, where they were checked (overlay open and close at 375px, focus returned to the menu button).
- `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass.
