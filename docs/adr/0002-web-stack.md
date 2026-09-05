# ADR 0002 — Web stack: Next.js 16 + Tailwind 4 + shadcn + Motion

Date: 2026-09-05
Status: Accepted

## Context

Creative portfolio to impress recruiter. Refs: tajmirul.site, vikasdev-in.vercel.app — Next + Tailwind + Motion. Budget 20h, EN, free hosting, need to learn modern animation.

## Decision

- **Next.js 16 App Router + React 19 + React Compiler** (as in habits-tracker)
- **Tailwind CSS 4 + shadcn/ui (Radix)** for custom dark premium design
- **Framer Motion 11 + Lenis** for MVP animation (GSAP/R3F in phase 2 Lab)
- **TypeScript 5 strict + Biome 2**

## Alternatives

- Mantine 9 — faster but corporate look, less creative freedom
- Astro — better for pure content but weaker for interactive lab
- UnoCSS/Panda — smaller ecosystem
- ESLint+Prettier — slower than Biome

## Consequences

+ Aligns with refs and job market (Next/Tailwind)
+ Copy-paste shadcn = fast custom UI
+ Motion+Lenis covers 90% of ref animations, GSAP deferred
