# Spec 008 — Real Project screenshots

Status: Done

## Problem Statement

Every Project card and every Case study gallery shows the same `placeholder.png`. A recruiter opening the live site sees three identical grey covers and a gallery of the same image, which says "unfinished" more loudly than any missing feature. The Project descriptions are good, but nothing shows what the work looks like. The Projects Section is the part of the site that is supposed to back up every claim made above it, and right now it can't.

## Solution

Each of the three Projects gets its own real screenshots: one cover for its card and Open Graph context, and the gallery images for its Case study. The screenshots are supplied by the developer, because one of the three Projects is commercial and what to show or hide is the developer's call. The site is then checked once more at phone and desktop width to confirm that covers and galleries still fit their frames, and `placeholder.png` is removed.

This spec starts only after spec 007 is done, so the screenshots land on the live site and are checked at the real address. The link is not to be sent to recruiters until this spec is done.

## User Stories

1. As a recruiter, I want each Project card to show a recognisable picture of that Project, so that I can tell the three apart at a glance.
2. As a recruiter reading a Case study, I want a gallery of real screens, so that I can judge the quality of the work and not only read about it.
3. As the developer, I want to choose and crop the screenshots myself, so that nothing confidential from the commercial Project is exposed.
4. As a visitor on a phone, I want covers and galleries to fit without cropping what matters, so that a screenshot is still legible at 375px.
5. As the developer, I want `placeholder.png` gone from the repository, so that no card can silently fall back to it.

## Implementation Decisions

- The developer supplies the images. The agent does not generate, mock up or capture them.
- Image files live in `apps/web/public/projects/`, which is where `placeholder.png` lives today and is the one place ADR 0004 allows binary assets. The frontmatter `cover` and `gallery[].src` fields in each Project's MDX point at them.
- Format, dimensions and file naming are decided when the ticket is written up, after the developer has seen the real card and gallery frames on the live site, so that the images are cut to what the frames actually are.
- Open Graph images stay generated from code (spec 006, ADR 0004); real screenshots do not go into them.

## Testing Decisions

- Browser pass at 1440px and 375px on the live site: every Project card and every Case study gallery shows its own image, nothing is cut off, no layout shifts.
- No frontmatter `src` or `cover` points at `placeholder.png`, and the file is deleted.
- `biome check`, `tsc` and a Turbo build of the web app pass.

## Out of Scope

- Generating or mocking screenshots with an agent.
- A lightbox or zoom for gallery images, video, or animated captures.
- Changing the number of Projects or their text.

## Further Notes

- Spec 006 listed real screenshots as out of scope and handed them to the developer; this spec is that hand-off, given its own number so it does not stay a forgotten line in an Out of Scope list.
- DominoCRM is a commercial Project (Employer: Anthill): decide what may be shown before choosing its screenshots.
