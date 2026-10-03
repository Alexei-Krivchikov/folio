# 07: Production verification and folio Case study links

**Spec:** [007-deploy](../spec.md)

**Blocked by:** 06

**Status:** Done

## What to build

Prove the deployed site works at its real address, then link it from the folio Case study. This is the only ticket that can close the spec. It is `ready-for-human` because of the Lighthouse run and the chat preview, but an agent can do the `curl` checks and the `folio.mdx` edit.

Check, on `https://alexei-krivchikov.vercel.app` (or the fallback name recorded in ticket 06):

1. Lighthouse, mobile mode: Performance, Accessibility, Best Practices and SEO each at 90 or above. Record the four scores in the comments. A Performance score below 90 caused by Lenis or animation work is not a failure of this ticket: open a new ticket for it and note it here.
2. The rendered HTML of `/` and of `/projects/dominocrm` contains an `og:image` that is an absolute URL on the production origin, never `localhost`.
3. `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` return 200; the sitemap lists `/` and the three Case studies; `robots.txt` names the sitemap; `/opengraph-image` and `/projects/dominocrm/opengraph-image` return `image/png`.
4. Paste the home page link and a Case study link into Telegram (to Saved Messages): the preview shows the title, description and image.
5. The Contact Telegram pill opens `t.me/A1exe1ch`.
6. The latest `main` commit has a green CI check on GitHub.

Then edit `apps/web/content/projects/folio.mdx`: add `website: https://alexei-krivchikov.vercel.app` and a `github` entry for `https://github.com/Alexei-Krivchikov/folio` labelled `folio`, in the same shape the other Projects use. These links are added only now so the Case study never points at something that did not exist.

## Acceptance criteria

- [x] Lighthouse mobile scores are recorded in the comments, each at 90 or above, or the shortfall has its own ticket
- [x] `og:image` on `/` and on a Case study is absolute and on the production origin
- [x] `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` return 200 with the content described above, and both OG image routes return `image/png`
- [x] A real Telegram preview shows title, description and image for the home page and for a Case study
- [x] The Contact Telegram link opens `t.me/A1exe1ch`
- [x] The latest `main` commit has a green CI check
- [x] `folio.mdx` carries the website and GitHub links, the folio Case study shows both in its link row, and both open the right pages
- [x] After the new links are pushed, the production deployment shows them
- [x] `npx biome check .`, `npx tsc --noEmit --project apps/web/tsconfig.json`, `npx turbo run build --filter=@folio/web` pass
- [x] Spec 007's status is set to Done

## Comments

- Lighthouse, mobile (Chrome DevTools, `https://alexei-krivchikov.vercel.app/`): Performance 91, Accessibility 96, Best Practices 100, SEO 100.
- `og:image` on `/` and `/projects/dominocrm` is absolute on `https://alexei-krivchikov.vercel.app`. `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` return 200; the sitemap lists `/` and the three Case studies; `robots.txt` names the sitemap; both OG image routes return `image/png`.
- Telegram previews for the home page and a Case study show title, description and image. The Contact Telegram pill opens `t.me/A1exe1ch`.
- `folio.mdx` links added in `c82409a`. The production deployment shows both on `/projects/folio`. CI is green on that commit; `biome`, `tsc` and `turbo build` pass.
