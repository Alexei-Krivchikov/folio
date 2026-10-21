# 04: About copy

**Spec:** [012-about-experience](../spec.md)

**Blocked by:** none

**Status:** ready-for-human

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

- [x] The developer has answered the questions and corrected the draft
- [x] Final text for the introduction and one or two "how I work" cards is written under Comments, marked approved
- [x] No sentence repeats a number already shown in the Facts strip
- [x] Every factual claim in the approved text is one the developer has confirmed
- [x] Status is set to `ready-for-human` when the text is approved, which unblocks ticket 05

## Comments

### Approved text

Approved by the developer. Facts taken from the developer's answers and the DominoCRM Case study: the flow editor and the chats and group chats are his work; he works in teams of varying size with the usual review and release process; he led a small team on the landing site; he trained at Yandex Practicum, took part in its community activities and explored technologies on his own. "Three years" and the channel numbers are left out because the Facts strip already shows them.

Introduction:

> At Anthill I work on DominoCRM, a no-code chatbot builder with a shared inbox for messengers. I build the parts users spend their day in: the visual flow editor, where a graph of steps has to stay in sync while it is dragged, edited and validated, and live chats and group chats that update in real time. I'm a frontend developer and go fullstack when the product needs it.

Path line (one line under the introduction):

> Started with Yandex Practicum and its community, kept learning new technologies on my own, and have shipped in production ever since.

How I work, card 1:

> **Predictable under real use.** Deep forms, live data and screens people keep open all day. I push for one shared vocabulary for loading, empty and error states instead of each screen inventing its own.

How I work, card 2:

> **At home in teams of any size.** I've shipped with a handful of developers and with many, inside a standard review and release flow, and I led a small team on the product's landing site.

Confirmed by the developer: the landing site team was him and two other developers; the community mentioned is Yandex Practicum's workshop projects, deliberately left unspecific in the text; he moved from the course straight to Anthill.
