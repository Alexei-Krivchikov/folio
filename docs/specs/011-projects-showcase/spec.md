# Spec 011 — Projects showcase

Status: Draft

## Problem Statement

After the Hero, a recruiter wants proof, and the proof is the Projects Section. Today it is the fifth block on the page, behind About, Stack and Experience, and its three identical cards say little about the difference between a commercial product and a pet project. The work is the strongest argument the developer has, and it is buried and visually flat.

## Solution

Projects moves up to directly follow the Hero. The cards are redesigned as a showcase: the first Project, the commercial DominoCRM, is featured at full width; the other two share the row below. On a desktop each card tilts toward the pointer with a soft light following it, covers get a refined treatment, and the card's CTA is magnetic. Every card carries a HUD-style index (`[01]`) and clearly says whether the Project is commercial or personal. On touch devices the cards stay calm and fast, with no tilt.

## User Stories

1. As a recruiter, I want the Projects right after the Hero, so that I see proof of work before any explanation.
2. As a recruiter, I want the commercial product to stand out from the personal projects, so that I understand which work was done for a real business.
3. As a recruiter, I want each card to show a real screenshot, a one-line description, the role and the top stack tags, so that I can judge a Project without opening it.
4. As a visitor on a desktop, I want cards to react to my pointer, so that browsing the work feels crafted.
5. As a visitor on a phone, I want cards that read well in a single column and respond instantly to taps, so that nothing lags.
6. As a visitor using the keyboard, I want each card to be one focusable link with a visible focus state, so that I can open any Case study without a mouse.
7. As a visitor with reduced-motion on, I want no tilt, no magnetic pull and no hover scaling, so that nothing moves.
8. As the developer, I want the tilt and magnetic behaviours to be generic components, so that they are reused in later specs and visible in `packages/ui`.

## Implementation Decisions

- **Section order.** The home page order becomes Hero, Projects, About, Stack, Experience, Contact. `SECTION_IDS`, `NAV_LINKS` and `NAV_SECTION_IDS` in `lib/navigation.ts`, the active-section logic in the Header and the Nav overlay all follow the new order. The Stack Section still exists in this spec; it disappears in spec 012.
- **Layout.** A featured card spans the full width on desktop (DominoCRM, which is first by `order`), and the remaining two sit side by side below it. On mobile everything is one column in the same order. The grid is data-driven from the existing `getProjects()` query; no Project is hard-coded in the layout.
- **Card content.** HUD index (`[01]`, `[02]`, `[03]`), name, a clear Commercial / Personal marker taken from the existing `type` field, the existing `meta` line, the `summary`, up to four stack tags with a `+N` overflow as today, and the cover. The "Open Case study" affordance is part of the card, which stays a single link as it is now.
- **Cover treatment.** The existing cover images stay (spec 008). The frame gets a consistent crop and a subtle Ember border glow on hover. Images keep `next/image` with correct `sizes`, and only the first (featured) card is `priority`.
- **Tilt.** A generic `TiltCard` in `packages/ui` rotates its child toward the pointer by a few degrees and moves a soft light with it. It is built with Motion's `useMotionValue`/`useSpring`, runs only for a fine pointer with hover, and renders its children untouched otherwise. It never changes the card's layout box, so there is no layout shift.
- **Magnetic.** A generic `MagneticButton` in `packages/ui` pulls the control slightly toward the pointer within a small radius, fine-pointer only, with the same reduced-motion rule. It is applied to the Projects CTA here and reused in specs 010 and 013 where those buttons exist.
- **Reduced motion and touch.** Both effects are absent under `prefers-reduced-motion` and on touch. The existing `liftOnHover` helper remains the fallback hover feedback for fine pointers when reduced-motion is off and the effect is not applicable.
- **Section chrome.** The Section uses `SectionHeading` from spec 009, with a HUD label such as `[ 01 / PROJECTS ]`.

## Testing Decisions

- Verification before commit: `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web`.
- Browser pass at 1440px and 375px: order is Hero, Projects, About, Stack, Experience, Contact; the featured card spans the row on desktop; nothing overflows at 375px.
- Navigation pass: header links, active-section highlight, the Nav overlay and the "View Projects" CTA all land on the right Sections after the reorder, and the Case study "Back" link returns to `/#projects` correctly.
- Pointer pass: tilt and magnetic work with a mouse and are completely absent when the device emulation is touch and when reduced-motion is on.
- Keyboard pass: each card has one tab stop, a visible focus ring, and activates with Enter.
- Lighthouse mobile on the preview deployment: Performance at least 90, CLS 0 (no card shifts when images load).

## Out of Scope

- Changing the number of Projects or their text.
- The Case study page itself and the transition into it (spec 014).
- Filtering, search or sorting of Projects.
- A lightbox or video previews.
- Any change to Stack, About or Experience.

## Further Notes

- The featured-card layout is a proposal made while writing this spec; it is checked in the browser during the ticket and may change if it looks worse than an even three-column grid. The reorder and the effects are decided; the exact grid is not.
- The Hero spec (010) is expected to ship first, so the Hero's own CTA already points at the Projects Section regardless of its new position.
