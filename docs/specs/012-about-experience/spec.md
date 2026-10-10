# Spec 012 — About and Experience

Status: Draft

## Problem Statement

Below the Projects, the site still reads as three plain text blocks: an About of two generic paragraphs ("a creative frontend developer dedicated to turning ideas into creative solutions"), a Stack that is a grid of icon tiles on its own full screen, and an Experience that is one line of timeline. The copy could belong to anyone, the Stack takes a full screen to say what a logo ribbon says in a line, and the page gets long and repetitive right where a recruiter who is still reading wants density.

## Solution

About and Stack merge into one **About** Section laid out as a bento grid of cards: a short, concrete introduction, the toolbox grouped by area, and a couple of facts about how the developer works. A slow marquee of the stack's logos runs across the top of the Section. Paragraph text reveals word by word as it scrolls into view. Experience gets a restyled timeline whose line draws itself on scroll. Stack stops being a Section of its own, so the menu shrinks to Projects, About, Experience and Contact.

## User Stories

1. As a recruiter, I want a short, concrete introduction instead of generic claims, so that I learn what the developer actually does.
2. As a recruiter, I want the tools grouped and recognisable at a glance, so that I can match them to a job description in seconds.
3. As a recruiter, I want a shorter page with fewer, denser blocks, so that I reach Experience and Contact without fatigue.
4. As a visitor, I want the stack logos shown as a moving ribbon, so that the Section feels alive without taking a screen of its own.
5. As a visitor, I want the text to appear as I reach it, so that reading has a rhythm.
6. As a visitor using the keyboard or a screen reader, I want the real text and the grouped tool names in the DOM from the start, so that nothing depends on an animation to be readable.
7. As a visitor with reduced-motion on, I want a static ribbon and fully visible text, so that nothing moves and nothing is hidden.
8. As the developer, I want the navigation to list only Sections that exist, so that no link points at a removed anchor.

## Implementation Decisions

- **One About Section, no Stack Section.** The Stack Section component is removed; its content becomes a bento card (or a group of cards) inside About. `#stack` disappears from `SECTION_IDS`, `NAV_SECTION_IDS` and `NAV_LINKS`, and from the Header's active-section logic and the Nav overlay. This matches the glossary in `CONTEXT.md`, where the Section list is Hero, Projects, About, Experience, Contact and the stack is part of About.
- **Bento content.** The grid holds: an introduction card, the toolbox card(s) with the existing four groups (Frontend, Backend, Database, Tools) and the existing brand-coloured icon hover, and one or two small cards on how the developer works. Cards use the Ember surfaces from spec 009 and the `HudLabel` primitive. The grid collapses to a single column on mobile.
- **Copy.** The introduction is rewritten around concrete facts the developer has confirmed: three years in production at Anthill, work on a CRM and chatbot builder used across Telegram, Web and VK, and the stack he actually uses. The developer approves the copy before it is merged; the ticket stays `needs-info` until he does. A year of self-study before the first job may appear as one line if he wants it.
- **Marquee.** A full-width strip of the stack's logos scrolling slowly and continuously across the top of About, pausing on hover and focus. Under reduced-motion it becomes a static, wrapped list. The logos reuse the existing icon set and brand-colour overrides; the duplicated track needed for a seamless loop is hidden from assistive technology so names are not read twice.
- **Text reveal.** Introductory text is split into words that fade up in a stagger when the block enters the viewport, built on Motion with the existing `viewportOnce` rule. The unsplit text stays in the DOM as the accessible name so a screen reader reads normal sentences. Reduced-motion shows everything immediately.
- **Experience.** The timeline keeps its content (role, Employer, period) and gains an Ember line that draws as the Section scrolls through, with a pulse on the current role. The structure supports more entries without redesign, because the self-study year or a future job should be one new item and no layout work.
- **Reusable pieces.** A word-reveal component and the marquee are generic and go in `packages/ui`; the bento composition and the Experience timeline stay in `apps/web`.

## Testing Decisions

- Verification before commit: `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web`.
- Navigation pass: the Header, the Nav overlay and the anchor-scroll hook no longer reference `#stack`; an old `/#stack` link degrades to the top of the page without an error.
- Browser pass at 1440px and 375px: bento grid layout, marquee loop without a visible jump, no horizontal scroll, text readable while the reveal runs.
- Reduced-motion pass: static ribbon, text fully visible, timeline line drawn.
- Screen-reader pass: sentences are read normally and logo names are read once.
- Lighthouse mobile on the preview deployment: Performance at least 90, CLS 0.

## Out of Scope

- A photo or avatar.
- Adding Experience entries other than Anthill, or a downloadable CV.
- Showing spoken languages or a city.
- Cursor-based effects (spec 013).
- Redesigning Hero, Projects, Contact or the Case study.

## Further Notes

- The About copy is the one place in this series where the words, and not only the visuals, change. They are a draft for the developer to correct, and no claim is published that he has not confirmed.
- If the marquee proves costly on a low-end phone it falls back to the static list at that breakpoint rather than being thinned out.
