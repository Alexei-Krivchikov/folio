# 06: Verification pass for the copy and composition pass

**Spec:** [020-copy-and-composition](../spec.md)

**Blocked by:** 01, 02, 03, 04, 05

**Status:** ready-for-agent

## What to build

No new features. The checks from the spec's Testing Decisions, run once on the finished work at 1440px and 375px, with screenshots, and findings fixed or written down.

- [ ] Every text on the home page matches the spec's Final copy word for word.
- [ ] No em dash in prose on the home page or in the metadata description; date ranges keep theirs.
- [ ] Nothing sits under the Hero calls to action.
- [ ] `7,000+ active users, per domino-crm.com` appears once, in the DominoCRM card, and nowhere else on the home page.
- [ ] The stack appears once, as the grid.
- [ ] Experience shows two entries in order, with the dots filling on scroll.
- [ ] The status dot does not pulse, including with reduced motion forced as in spec 013 ticket 07.
- [ ] Each Case study shows its new summary.
- [ ] The page metadata description is the new text.
- [ ] No horizontal scroll at 375px.
- [ ] `build` and `lint` pass.
