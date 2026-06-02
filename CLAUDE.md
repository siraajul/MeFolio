# CLAUDE.md

Guidance for working in this repository.

## Project Overview

**MeFolio** (package name `portfolio`) is a high-performance personal portfolio for **Siraajul / Sirajul Islam — an SQA Automation Engineer & SDET**. It pairs a blazing-fast Next.js frontend with a **Sanity headless CMS** so all content (projects, experience, skills, blog, resume, certifications) is editable from a dashboard at `/studio` without code changes. Production domain: **siraajul.com**.

## Commands

```bash
npm run dev      # Start Next.js dev server (http://localhost:3000)
npm run build    # Production build (runs Sentry source-map upload)
npm run start    # Serve the production build
npm run lint     # ESLint (eslint-config-next, flat config)

npx playwright test                 # Run E2E tests (auto-starts dev server)
npx playwright test --project=chromium   # Single browser
npx playwright show-report          # View the HTML report
```

There is no test/typecheck npm script beyond the above; run `npx tsc --noEmit` for a manual type check.

## Tech Stack

- **Next.js 16** (App Router, React 19, Turbopack) — React Compiler is **disabled** (`reactCompiler: false` in `next.config.ts`).
- **TypeScript 5** — strict mode, path alias `@/*` → repo root.
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config`; theme lives in `app/(website)/globals.css` via CSS variables). Brand color exposed as the `text-brand`/`bg-brand` utility.
- **shadcn/ui** — "new-york" style, RSC, Lucide icons. Config in `components.json`. UI primitives in `components/ui/`.
- **Sanity v5** CMS (`next-sanity`, embedded Studio).
- **Framer Motion / motion** + **Lenis** (smooth scroll) for animation.
- **Resend** (transactional email), **Zod** (validation).
- **Observability**: Sentry, PostHog, Vercel Analytics, Google Analytics, Microsoft Clarity.

## Architecture

### Routing (App Router)
- `app/layout.tsx` — **root** layout: fonts (Geist, Geist Mono, Fira Code, Antic), global SEO metadata, analytics scripts (Clarity/GA), inline no-flash theme script, `SentryProvider`.
- `app/(website)/` — the **public site** route group.
  - `layout.tsx` — fetches `siteSettings`, builds the **JSON-LD `@graph`** (WebSite + ProfilePage + Person schemas for SEO), wraps children in `ClientShell` (Lenis smooth scroll + floating theme toggle). `revalidate = 60`.
  - `page.tsx` — single-page home. Staged data fetch: settings first (above-fold), then `Promise.all` for the rest. Below-fold sections are `dynamic()` imported. Sections are anchored by `id` (`#about`, `#skills`, `#experience`, `#projects`, `#education`, `#certifications`, `#writing`, `#contact`).
  - `projects/[slug]/`, `blog/[slug]/`, `blog/`, `resume/` — dynamic content pages, each with `opengraph-image.tsx` where present.
- `app/studio/[[...tool]]/` — embedded **Sanity Studio** at `/studio` (catch-all, client component).
- `app/api/` — route handlers: `contact`, `send-otp`, `verify-otp`.
- SEO files: `app/robots.ts`, `app/sitemap.ts` (dynamic — pulls project & post slugs from Sanity), `opengraph-image.tsx`, `twitter-image.tsx`, `icon.svg`.

### Data layer (Sanity)
- `sanity/lib/client.ts` — the shared `client` (read, `useCdn: true`, stega enabled) and `urlFor()` image-URL helper (`auto('format')`, `quality(80)`). For **writes**, clone with `client.withConfig({ token: process.env.SANITY_API_TOKEN })`.
- `sanity/lib/queries.ts` — **all GROQ queries** live here (e.g. `siteSettingsQuery`, `experiencesQuery`, `postsQuery`, `resumeQuery`). Add new queries here, not inline in components.
- `sanity/schemaTypes/` — document schemas: `siteSettings`, `about`, `experience`, `skillCategory`, `projectCategory`, `education`, `certification`, `post`, `series`, `resume`, `recommendation`, `lead`, `contactRequest`. Register every new schema in `sanity/schemaTypes/index.ts`.
- `sanity/schemaTypes/objects/` — reusable **portable-text content blocks**: `callout`, `youtubeEmbed`, `metricBlock`, `dividerBlock`, `ctaButton`, `fileDownload`, `tableBlock`. Each has a matching renderer in `components/shared/` (e.g. `Callout.tsx`, `MetricBlock.tsx`, `TableBlock.tsx`).
- `types/sanity.ts` — TypeScript types for query results (`SiteSettings`, `About`, `Experience`, `Post`, etc.). Keep in sync when queries change.

### Components
- `components/layout/` — `Navbar`, `AnimeNavbar` (animated nav), `Footer`, `ClientShell`.
- `components/sections/` — page sections (`Hero`, `About`, `Skills`, `Experience`, `Projects`, `Blog`, `Contact`, `GithubActivity`). `sdet-demo/` holds the interactive QA showcase (`ApiDemo`, `AuditScores`, `PipelineDiagram`, `TerminalTest`).
- `components/shared/` — reusable widgets and content-block renderers (resume template, OTP download form, code block, etc.).
- `components/ui/` — shadcn primitives + custom UI (`multistep-form`, `otp-verify`, `timeline`, `smooth-scroll`).
- `components/providers/SentryProvider.tsx`, `hooks/use-navigation.ts` (the `NAV_ITEMS` source of truth — tests read from it).

### Lib utilities (`lib/`)
- `utils.ts` — `cn()` (clsx + tailwind-merge).
- `rate-limit.ts` — in-memory `checkRateLimit()` with preset tiers (`strict`/`standard`/`relaxed`/`daily`). **Note:** single-instance only; production multi-instance needs Redis/Upstash (see TODO comments).
- `otp-store.ts` — in-memory OTP `Map` (survives hot reload via `globalThis`); 6-digit codes, 5-min expiry, 3-attempt limit.
- `disposable-domains.ts` — disposable-email blocklist used by send-otp.
- `posthog.ts` — server-side PostHog client factory.

### Lead-capture / CV-download flow
`send-otp` (Zod-validate email → reject disposable domains → verify MX records → rate-limit per IP **and** per email → email a 6-digit OTP via Resend) → `verify-otp` (check code, attempts, expiry → save a `lead` doc to Sanity) → unlock resume download. In dev without `RESEND_API_KEY`, OTP is logged to console (simulation mode).

### Security (`middleware.ts`)
Applies a strict **CSP** and security headers (HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy) to all non-asset routes, plus an extra in-memory rate limit on `/api/*` (3/min for `send-otp`, 10/min otherwise). When adding a new external script/connect/img/media origin, **update the CSP `connect-src`/`script-src`/`img-src` lists** or it will be blocked.

## Conventions

- **Server Components by default.** Mark `"use client"` only when interactivity/hooks are needed.
- **Data fetching stays in Server Components / route handlers** via the Sanity `client`; pass plain props down to client components.
- **GROQ in `sanity/lib/queries.ts`**, image URLs via `urlFor()`. Remote image hosts must be allow-listed in `next.config.ts` `images.remotePatterns` (currently Sanity CDN, Unsplash, postimg, aceternity, chanhdai).
- **Validate all API input with Zod**; rate-limit sensitive routes via `checkRateLimit`.
- **Below-fold sections are `dynamic()`-imported** in `page.tsx` for faster first paint — keep that pattern.
- ISR: pages set `export const revalidate = 60`.
- Tests rely on stable hooks: `data-testid` (e.g. `hero-first-name`/`hero-last-name`) and `id` anchors. Don't rename these without updating `tests/`.

## Testing

Playwright E2E in `tests/` (`home.spec.ts`, `navbar.spec.ts`), config in `playwright.config.ts` — runs across Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12). `webServer` auto-runs `npm run dev`. CI: `.github/workflows/playwright.yml` (Node 22, on push/PR to main/master, 2 retries). Tests reference `hooks/use-navigation.ts` for expected nav items and the brand title.

## Environment

Copy `.env.example` → `.env.local`. Key vars:
- **Sanity**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` (writes, secret).
- **Email**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
- **Site**: `NEXT_PUBLIC_BASE_URL` (defaults to `https://siraajul.com`).
- **Observability**: `NEXT_PUBLIC_SENTRY_DSN`/`SENTRY_DSN`/`SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_AUTH_TOKEN`, `NEXT_PUBLIC_POSTHOG_KEY`/`_HOST`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **SEO verification**: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.
- Optional: `UPSTASH_REDIS_*` (distributed rate limiting), `CHECKLY_*` (monitoring).

App degrades gracefully when optional keys are missing (analytics scripts skip; Sanity writes and OTP email fall back to simulation/no-op).

## Notes

- The site is **SEO-heavy by design** (personal-brand search for "Siraajul / Sirajul Islam"): metadata, JSON-LD graph, dynamic sitemap, robots rules. Preserve these when touching layouts.
- `.puku/` is a Puku embeddings DB (semantic-search tooling), not application code.
