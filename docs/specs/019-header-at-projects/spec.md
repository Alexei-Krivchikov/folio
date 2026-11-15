# Spec 019 — Header at Projects

Status: Done

## Problem Statement

Projects sits directly under the Hero, so a visitor who lands on Projects through a Section link ("View Projects", the Header link, the Case study Back link, or a direct `/#projects`) stops with the Hero's bottom edge exactly on the Header line (88px). The Header stays transparent and `inert` there: the visitor is at a Section, the Active section is Projects, but there is no Header to show it, and on mobile no menu button. The Header appears only after another ~176px of scrolling.

The cause is the Hero observer in `useHeroPassed`: its `rootMargin` top is `+HEADER_OFFSET`, which grows the observed area 88px above the viewport. The Hero then counts as visible until its bottom is 88px above the viewport, instead of until it has left the space below the Header.

## Solution

The Header appears once the Hero no longer reaches below the Header line, the same line Sections land on. The observer's top margin becomes negative and sits just past `HEADER_OFFSET`, so a Section that lands exactly at the line has passed the Hero.

## Acceptance

- Landing on Projects through any Section link, the Case study Back link, or a direct `/#projects` shows the Header with Projects active.
- At the top of the home page the Header is still hidden, and scrolling back up into the Hero hides it again.
- Case study pages still have no Header.

## Out of Scope

- Changing Section order, `HEADER_OFFSET`, or the anchor scroll.
- Adding a test framework.
