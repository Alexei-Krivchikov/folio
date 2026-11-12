# Spec 018 — Anchor history

Status: Done

## Problem Statement

Following a Section link scrolls to the right place, but the URL stays unchanged. A visitor cannot share the resulting Section URL, and browser Back and Forward do not represent that navigation.

## Solution

An explicit click on an in-page Section link creates a history entry with that link's hash. Back and Forward resolve a valid Section hash through the existing scroll seam. Ordinary scrolling never changes the address bar.

## Acceptance

- Clicking a Header or Hero Section link adds its hash to the URL and lands below the Header.
- Back from a Section hash returns to the preceding history entry; Forward returns to the Section.
- Direct `/#projects` navigation and the Case study Back link keep their current behaviour.
- Ordinary scrolling does not rewrite the hash.
- Reduced motion and the Nav overlay continue to navigate correctly.

## Out of Scope

- Changing the Header, Section order, or scroll animation.
- Adding a test framework.
