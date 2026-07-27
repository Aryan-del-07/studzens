# Architectural Decision Records (ADRs)

This document tracks major architectural decisions made during the development of Studzens.

## ADR 1: Choosing Vite over Create React App (CRA) or Next.js
**Date:** Project Inception
- **Decision:** Use Vite with React instead of CRA or Next.js.
- **Reason:** CRA is deprecated and slow. While Next.js offers SSR and SEO benefits, Studzens is primarily a highly interactive dashboard behind a login wall (an SPA). Vite provides instantaneous Hot Module Replacement (HMR) and a highly optimized Rollup production build.
- **Pros:** Blazing fast development server, simple configuration.
- **Cons:** No built-in SSR/SSG. We must rely on Vercel Edge caching and client-side rendering.

## ADR 2: Choosing Tailwind CSS over Component Libraries (MUI/AntD)
**Date:** Project Inception
- **Decision:** Build UI components from scratch using Tailwind CSS.
- **Reason:** Standard component libraries often look generic and are difficult to deeply customize without fighting the framework. Studzens requires a highly polished, premium, custom UI.
- **Pros:** Complete design freedom, tiny CSS payload, consistent design tokens.
- **Cons:** Slower initial development time for basic components (buttons, modals).

## ADR 3: Choosing Prisma and Neon (PostgreSQL)
**Date:** Mid-Development
- **Decision:** Migrate from static frontend data to a Neon PostgreSQL database managed by Prisma.
- **Reason:** The dataset of colleges and exams is too large and dynamic to ship in the JavaScript bundle. Neon offers a serverless Postgres environment ideal for our deployment strategy. Prisma provides type safety from DB to Frontend.
- **Pros:** Auto-scaling DB, easy schema migrations, excellent TypeScript integration.
- **Cons:** Adds complexity to the deployment pipeline; requires an intermediate API layer.

## ADR 4: Client-Side Routing with Vercel Rewrites
**Date:** Late-Development
- **Decision:** Handle all routing via `react-router-dom` and configure `vercel.json` to rewrite all paths to `index.html`.
- **Reason:** Directly visiting paths like `/dashboard` threw 404s on Vercel because it expected physical files.
- **Pros:** Allows the SPA to handle deep linking and browser history natively without requiring a server to render specific HTML pages.
