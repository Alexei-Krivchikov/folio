# 04: Restyle the not-found page

**Spec:** [015-polish-performance](../spec.md)

**Blocked by:** none

**Status:** ready-for-agent

## What to build

`app/not-found.tsx` already uses the tokens, `HudLabel` and the shared button, so it is close; it still reads as a generic page and not as part of the redesigned site. Give it the site's character with a short HUD-style message and keep the link home.

- **Message.** A `[ 404 ]` HUD label, a headline in the display font, one short line, and the "Back to home" button. Copy stays in English and in the site's tone.
- **Atmosphere.** Reuse what exists in `packages/ui` (the Ember glow or grid from the Sections) instead of adding a new primitive; nothing heavy, no shader, no Motion import beyond what the page already pays for.
- **Behaviour.** Works at 375px and 1440px; the button has the Ember focus ring and a 44px target on mobile; under reduced motion nothing animates.
- **Real 404.** `/does-not-exist` and an unknown `/projects/<slug>` both render it with HTTP 404.

## Acceptance criteria

- [ ] `/does-not-exist` and `/projects/nope` render the page with status 404
- [ ] Looks right at 375px and 1440px; no horizontal scroll
- [ ] Keyboard: the button is focusable with a visible ring; contrast of every text pair is AA
- [ ] Reduced motion leaves the page static
- [ ] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass

## Comments
