# 04: About copy

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** none

**Status:** needs-info

## What to build

The words for the About Section, agreed with the developer before they are put on the page. This ticket produces text, not code; ticket 05 puts the approved text into the layout. The spec is explicit that no claim is published that the developer has not confirmed.

What the copy has to cover, and what the page already says elsewhere (so it is not repeated):

- **Already on the page.** The Facts strip under the Hero shows years in production, 7,000+ active users on DominoCRM, three channels and four UI languages, and UTC+3. The Hero says "Building at Anthill · open to the right opportunity". The introduction should not restate those numbers; it should say what they do not.
- **Introduction card.** Two to four sentences, concrete, first person. Facts the spec lists as confirmed: three years in production at Anthill; work on a CRM and a chatbot builder used across Telegram, Web and VK; the stack he actually uses. Drop the generic claims in the current text ("dedicated to turning ideas into creative solutions", "drive tangible results").
- **"How I work" cards.** One or two small cards, a headline and one sentence each. The current draft ideas below are taken from what the repository itself shows (strict TypeScript, Biome, a Turborepo monorepo, Lighthouse and accessibility passes in the specs, the DominoCRM write-up on state, real-time and consistent loading states). They are suggestions to be accepted, replaced or cut.
- **Optional line.** A year of self-study before the first job, as one line, only if he wants it.

### Draft for the developer to correct

Introduction:

> I'm a frontend developer who ships fullstack when the product needs it. For three years at Anthill I've worked on DominoCRM, a no-code chatbot builder and a shared inbox for Telegram, Web and VK, from the visual flow editor to live conversations. I like interfaces that stay predictable under real use: deep forms, live data, long sessions.

How I work, card 1:

> **Boring where it counts.** Strict TypeScript, one lint and format tool, a monorepo with a single check command. A change is not done until the build is.

How I work, card 2:

> **Fast and usable by default.** Performance budgets and keyboard and screen-reader passes are part of finishing a feature, not a polish step at the end.

### Questions for the developer

- Is the introduction accurate? In particular "ships fullstack when the product needs it" and "from the visual flow editor to live conversations" (the role description in the DominoCRM Case study says this, but it is the developer's call).
- Are the two "how I work" cards things you would defend in an interview, or should they say something else?
- Include the self-study year? If yes, what one line, and does it belong in About or in Experience (spec 012 Out of Scope excludes a new Experience entry)?
- Anything to say about collaboration (team size, code review, working with designers or backend) that is true and worth one sentence?

## Acceptance criteria

- [ ] The developer has answered the questions and corrected the draft
- [ ] Final text for the introduction and one or two "how I work" cards is written under Comments, marked approved
- [ ] No sentence repeats a number already shown in the Facts strip
- [ ] Every factual claim in the approved text is one the developer has confirmed
- [ ] Status is set to `ready-for-human` when the text is approved, which unblocks ticket 05

## Comments
