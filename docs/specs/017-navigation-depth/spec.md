# Spec 017 — Deepen the navigation modules

Status: Ready

## Problem Statement

The Sections of the home page and the rules for moving between them are described in more places than they need to be, and the rules of the Active section are spread over three files.

- `lib/navigation.ts` mixes three unrelated things: the geometry of the Header (`HEADER_TOP_GAP`, `HEADER_PILL_HEIGHT`, `HEADER_OFFSET`), the list of Sections with their navigation links, and the HUD formatting of a Section index (`sectionIndex`). The private `SECTION_IDS` (with `hero`) and the public `NAV_SECTION_IDS` (without it) describe the same order twice.
- The Active section rule from `CONTEXT.md` (follows the scroll, except right after a link: then the linked Section holds until the visitor scrolls away) is implemented by `section-lock.ts` (a module-level singleton with four exports and its own `window` listeners), by `currentSection()` inside `use-header-state.ts`, and by `scrollToSection`, which has to know about the lock.
- The branch "Lenis or `window.scrollTo`" exists twice: in `scrollToSection` and in the logo click handler of `Header`. Only the second one knows about `prefers-reduced-motion`.

There are no tests in the repository, so these rules are checked only by looking at the page.

## Solution

Two small refactors with no change in behaviour, in this order:

1. One module for the Sections (`lib/sections.ts`): the order is written once, and everything derived from it (navigation links, ids, the HUD index) sits next to it. The Header geometry moves next to the Header.
2. One seam for moving around the page and for the Active section: callers ask the module to scroll to a Section or to the top, and to tell which Section is active; the lock and the measuring stay behind that interface.

## Implementation Decisions

- Behaviour, markup, class names and visuals stay exactly as they are. This is a restructuring only.
- No new dependency and no test framework in this spec. The checks are the commands under Testing Decisions plus a look at the page in the browser pane.
- Production code gets no comments; the reasoning lives in the tickets.
- Names follow `CONTEXT.md`: Section, Header, Active section, Nav overlay.

## Testing Decisions

- Verification before commit:

```bash
npx biome check .
npx tsc --noEmit --project apps/web/tsconfig.json
npx turbo run build --filter=@folio/web
```

- Checked by hand in the browser pane at 1440px and 375px: Header links, the Nav overlay, the logo, and following a link to the last Section on a page that cannot scroll far enough.

## Out of Scope

- Adding a unit-test setup. The modules this spec shapes are the natural first target for one, which is recorded as a note in ticket 02 and is not done here.
- Any change to how the Header looks or to the scroll feel.

## Further Notes

- The candidates were found with the `codebase-design` vocabulary: the deletion test on `section-lock.ts` shows it earns its keep (its complexity would reappear in two callers), but its interface is wider than its consumers need.
