# Spec 020 — Copy and composition pass

Status: Done

## Problem Statement

The home page reads as templated. Right under the Hero sits a row of four big numbers with captions ("3 / Years in production", "7,000+", "3 channels", "UTC+3") that looks like every generated landing page: only one of the four is real proof, the time zone is not an achievement, and "3 channels" is captioned with "4 UI languages". The headings carry no pitch ("Predictable under real use.", "At home in teams of any size.", "Let's build something together"), stock phrases pile up ("open to the right opportunity", "Let's Talk", "All rights reserved"), and em dashes run through the prose. The most specific thing Alexei has to say (the visual flow editor and the real-time chats) is buried in the middle of About, so a recruiter who scans only headings sees a generic frontend developer, and a hiring engineer has to reach the third Section to find what sets him apart.

The composition has the same problem: the stack of tools is shown twice in About (a scrolling marquee and a grid by category), and Experience is a single line with a role and an employer and nothing about what was done.

## Solution

Every visible text on the home page is rewritten to the final copy below, which was agreed in conversation and must be used verbatim. Headings are written for a recruiter scanning the page; the text under them for an engineer reading it. The visual language stays (the Hero shader, the large type, the HUD Section indices); the composition changes in three places: the Hero ends at its calls to action, the stack appears once, and Experience gets real entries.

### Copy rules

- No em dashes in prose anywhere on the home page or in site metadata; use a full stop or a colon. Date ranges ("2023 — Present", "2022 — 2023") keep their dash.
- Every fact and number stays exactly as it was. The claim "7,000+ active users, per domino-crm.com" is quoted letter for letter.
- No stock phrases: no "let's build something together", "open to the right opportunity", "all rights reserved".

### Final copy

**Hero**

- Status pill, on every viewport: `Open to offers`. No employer name. The green dot is static, it does not pulse.
- Subtitle: `Frontend developer building a visual chatbot editor and a real-time CRM inbox.`
- Calls to action: primary `Write to me` (to Contact), secondary `See projects` (to Projects).

**Projects (card summaries, also shown on each Case study)**

- DominoCRM: `A no-code chatbot builder and multichannel CRM for Telegram, Web and VK. Teams build bot scenarios visually, then run sales and support conversations from one inbox. 7,000+ active users, per domino-crm.com.`
- Book Tracker: `A full-stack reading tracker: search books, build a personal library, set a reading status and a rating. Next.js frontend and NestJS API, both written from scratch.`
- folio: `This portfolio. Statically generated with Next.js 16, with Case studies in MDX and animations in Motion.`

**About**

Main paragraph:

> At Anthill I work on DominoCRM, a no-code chatbot builder with a shared inbox for messengers. I build the parts people spend their day in: the visual flow editor, where a graph of steps has to stay in sync while it's dragged, edited and validated, and live chats and group chats that update in real time. I'm a frontend developer and go fullstack when the product needs it.

Second paragraph:

> I started with Yandex Practicum and its community, and I've kept learning on my own since.

Practice cards:

- Title `Screens people keep open all day`, text `Deep forms and live data. I push for one shared set of loading, empty and error states, so no screen invents its own.`
- Title `Led a small team, shipped in larger ones`, text `I've shipped with a handful of developers and with many, inside a standard review and release flow. On the product's landing site I led a small team.`

**Experience**, newest first:

1. `2023 — Present` · `Frontend / FullStack Developer` · `Anthill` (current), with these points:
   - `Built the visual flow editor: a graph of steps and connections that stays in sync with the canvas while it's dragged, edited and validated.`
   - `Real-time chats and group chats over SignalR: messages, status changes and bot-to-operator hand-offs land in the right thread, in order, including after a reconnect.`
   - `Broadcasts, automation rules and contact filters: deep conditional forms kept predictable.`
   - `Interface in four languages with i18next: structured translation keys, no hard-coded copy.`
2. `2022 — 2023` · `Developer` · `Yandex Practicum · Workshop`, with no points.

**Contact**

- Heading: `Hiring a frontend or fullstack developer?`
- Line under it: `Telegram is the fastest way to reach me. Email works too.`

**Footer**

- Copyright line: `© <year> Alexei Krivchikov`, without "All rights reserved".
- The `Built with Next.js · Tailwind · Motion · OGL · Lenis` line stays as it is.

**Site metadata**

- The description used for search results and link previews (page, Open Graph and Twitter): `Frontend developer building a visual chatbot editor and a real-time CRM inbox.`

## User Stories

1. As a recruiter, I want the first screen to say what kind of frontend work Alexei does, so that I can tell in seconds whether he fits the role.
2. As a recruiter, I want the status pill to say plainly that he is open to offers, so that I know I can reach out.
3. As a recruiter, I want the status pill not to name his current employer, so that "open to offers" doesn't read awkwardly next to it.
4. As a recruiter, I want the primary call to action to name the next step, so that I know clicking it leads to a way to write to him.
5. As a recruiter, I want the Hero to end at its calls to action without a row of numbers, so that the first screen does one job.
6. As a hiring engineer, I want the only real usage figure shown next to the product it belongs to, so that I can judge it in context.
7. As a hiring engineer, I want the usage figure to keep its source, so that I know where the number comes from.
8. As a hiring engineer, I want project summaries written as plain sentences, so that they don't read as generated.
9. As a recruiter scanning headings, I want the About practice titles to state something concrete, so that headings alone tell me how he works.
10. As a hiring engineer, I want the practice texts to keep their specific claims (shared loading, empty and error states; leading a small team on the landing site), so that I can ask about them in an interview.
11. As a visitor, I want the stack shown once, grouped by category, so that I can scan what he works with without seeing the same logos twice.
12. As a hiring engineer, I want Experience to list what he built at Anthill, so that the role has evidence behind it.
13. As a recruiter, I want Experience to show the Yandex Practicum Workshop before Anthill, so that I see his full timeline.
14. As a visitor, I want the Contact heading to address me directly, so that I know the Section is for people hiring.
15. As a visitor, I want the Contact line to say which channel is fastest, so that I pick the right one.
16. As a visitor, I want the footer free of boilerplate, so that the page ends cleanly.
17. As someone who receives a link to the site, I want the link preview to describe the same work as the Hero, so that the preview and the page agree.
18. As a visitor on a phone, I want the same copy as on desktop, so that I don't get a shorter or different story.
19. As a visitor with reduced motion, I want the static status dot and every rewritten text to show exactly as for everyone else, so that nothing depends on animation to be read.
20. As a visitor opening a Case study, I want its summary to match the card I clicked, so that the two don't contradict each other.

## Implementation Decisions

- The Facts strip is removed from the home page entirely, together with the Hero's slot for it. The term is retired from `CONTEXT.md`. The Hero content stays vertically centred in the full-viewport Hero, with spacing rebalanced now that the calls to action are the last element.
- The status pill shows one text on every viewport instead of a short mobile and a long desktop variant. Its dot loses the pulse animation in every motion setting.
- Project summaries change in the project content front matter, so the Projects cards and the Case studies pick them up from one place. The Case study bodies are not edited.
- About drops the stack marquee and keeps the grid of tools by category. The Husky logo and its emoji stay. If the shared marquee component ends up unused, it stays in the UI package; removing it is not part of this spec.
- An Experience entry gains an optional list of points. The Anthill entry has four, the Yandex Practicum Workshop entry has none and renders as a bare entry exactly like Anthill does today. The timeline, the scroll-filled dots and the current-entry marker keep working with two entries.
- Site metadata uses the Hero subtitle as its description for the page, Open Graph and Twitter.
- The final copy above is the source of truth. The implementer does not rewrite, shorten or "improve" it; any change goes back to Alexei first.

## Testing Decisions

- No test framework is added (same as spec 019). Verification is a manual pass in the browser, on desktop and on a phone-width viewport, with screenshots, plus a clean `build` and `lint`.
- The verification pass checks external behaviour only:
  - every text on the home page matches the final copy above, word for word;
  - no em dash appears in prose on the home page or in the metadata description; date ranges still have theirs;
  - the Facts strip is gone and nothing else sits under the Hero calls to action;
  - "7,000+ active users, per domino-crm.com" appears in the DominoCRM card exactly once and nowhere else on the home page;
  - the stack appears once, as the grid;
  - Experience shows two entries in the right order, with the timeline dots filling on scroll;
  - the status dot does not pulse;
  - each Case study shows the new summary;
  - the link preview description (page metadata) is the new text.
- Prior art: the verification-pass tickets of specs 011, 012 and 013.

## Out of Scope

- Case study page bodies (a separate spec: their texts are longer and need their own pass).
- Changing the visual language: the Hero shader and Poster, typography, colours, HUD Section indices, the Header.
- Points for the Yandex Practicum Workshop entry.
- Translation; the site stays English only.
- Removing the marquee component from the UI package.
- Adding a test framework.

## Further Notes

- The copy was diagnosed and edited with the copywriting skills during the grilling; the main findings were that the strongest specifics were buried in About, that headings carried no pitch, and that stock phrases and em dashes made the page read as generated.
- "3 years in production" disappears as a number; the Experience date range carries it instead. The time zone stays in Contact's local-time line.
