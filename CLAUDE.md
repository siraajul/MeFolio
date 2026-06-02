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
  - `layout.tsx` — fetches `siteSettings`, builds the **JSON-LD `@graph`** (WebSite + ProfilePage + Person, incl. `email`/`telephone`/`PostalAddress` for local SEO), wraps children in `ClientShell`. `revalidate = 60`.
  - `page.tsx` — single-page home. Staged data fetch: settings first (above-fold), then `Promise.all` for the rest. Below-fold sections are **statically imported** (NOT `dynamic()` — see Gotchas). Sections are anchored by `id` (`#about`, `#skills`, `#experience`, `#projects`, `#education`, `#certifications`, `#writing`, `#contact`).
  - `projects/[slug]/`, `blog/[slug]/`, `blog/`, `resume/` — content pages. `page.tsx` owns data fetch + `generateMetadata` (incl. per-page `alternates.canonical`) + JSON-LD; the `<article>` body lives in a co-located presentational component (`ProjectCaseStudy.tsx`, `BlogArticle.tsx`). Each post/project also emits `BlogPosting`/`CreativeWork` + `BreadcrumbList` JSON-LD via `lib/structured-data.ts`.
- `components/layout/ClientShell.tsx` — `"use client"` shell that wraps the whole site in `<MotionConfig reducedMotion="user">`, a skip-to-content link, and `SmoothScroll` (Lenis). **Must stay SSR-enabled** (see Gotchas).
- `app/studio/[[...tool]]/` — embedded **Sanity Studio** at `/studio` (catch-all, client component).
- `app/api/` — route handlers: `contact`, `send-otp`, `verify-otp`.
- SEO files: `app/robots.ts`, `app/sitemap.ts` (dynamic — pulls project & post slugs from Sanity), `opengraph-image.tsx`, `twitter-image.tsx`, `icon.svg`.

### Data layer (Sanity)
- `sanity/lib/client.ts` — the shared `client` (read, `useCdn: true`, stega enabled) and `urlFor()` image-URL helper (`auto('format')`, `quality(80)`). For **writes**, clone with `client.withConfig({ token: process.env.SANITY_API_TOKEN })`.
- `sanity/lib/queries.ts` — **all GROQ queries** live here (e.g. `siteSettingsQuery`, `experiencesQuery`, `postsQuery`, `resumeQuery`). Add new queries here, not inline in components.
- `sanity/schemaTypes/` — document schemas: `siteSettings`, `about`, `experience`, `skillCategory`, `projectCategory`, `education`, `certification`, `post`, `series`, `resume`, `recommendation`, `lead`, `contactRequest`. Register every new schema in `sanity/schemaTypes/index.ts`. Note: `post.summary` and `project.description` are **required** (they back the meta description); featured/gallery images have an `alt` field. There is **no** `ogImage` field — OG cards are generated, see `lib/og-image.tsx`.
- `sanity/schemaTypes/objects/` — reusable **portable-text content blocks**: `callout`, `youtubeEmbed`, `metricBlock`, `dividerBlock`, `ctaButton`, `fileDownload`, `tableBlock`. Each has a matching renderer in `components/shared/`. **All wired through `components/shared/portableTextComponents.tsx`** (`getPortableTextComponents({ imageClassName, imageFallbackAlt })`) — both blog & project pages use this; don't re-declare the renderer map inline.
- `types/sanity.ts` — TypeScript types for query results (`SiteSettings`, `About`, `Experience`, `Post`, etc.). Keep in sync when queries change.

### Components
Large components are split into folders of focused pieces — keep new files small and co-located:
- `components/layout/` — `Navbar`, `AnimeNavbar` (animated nav), `Footer`, `ClientShell`.
- `components/sections/` — page sections (`Hero`, `About`, `Skills`, `Experience`, `Blog`, `Contact`, `GithubActivity`). `Projects.tsx` is a thin orchestrator over `components/sections/projects/` (`ProjectCard`, `ImageLightbox`, `AnimatedFolder`, `types`). `sdet-demo/` holds the interactive QA showcase.
- `components/shared/` — reusable widgets, content-block renderers, and `portableTextComponents.tsx` / `JsonLd.tsx`. `ResumeTemplate.tsx` composes section components from `components/shared/resume/`; the CV-download dialog (`DownloadCVForm.tsx`) composes `components/shared/download-cv/` (`LeadFormStep`, `SuccessStep`).
- `components/ui/` — shadcn primitives + custom UI. The consultation form is a folder: `components/ui/multistep-form/` (`index.tsx` shell + `steps/*` + `types.ts`). Also `otp-verify`, `timeline`, `smooth-scroll`.
- `components/providers/SentryProvider.tsx`, `hooks/use-navigation.ts` (the `NAV_ITEMS` source of truth — tests read from it).

### Lib utilities (`lib/`)
- `utils.ts` — `cn()` (clsx + tailwind-merge).
- `rate-limit.ts` — in-memory `checkRateLimit()` with preset tiers (`strict`/`standard`/`relaxed`/`daily`). **Note:** single-instance only; production multi-instance needs Redis/Upstash (see TODO comments).
- `otp-store.ts` — in-memory OTP `Map` (survives hot reload via `globalThis`); 6-digit codes, 5-min expiry, 3-attempt limit.
- `disposable-domains.ts` — disposable-email blocklist used by send-otp.
- `posthog.ts` — server-side PostHog client factory.
- `og-image.tsx` — shared `renderOgImage({ badge?, useResumeTagline? })` satori builder; the three `opengraph-image.tsx` routes are thin wrappers over it.
- `structured-data.ts` — `blogPostingJsonLd` / `projectJsonLd` / `breadcrumbJsonLd` builders. `author`/`publisher` reference the layout's Person entity by `@id` (`/#person`).

### Lead-capture / CV-download flow
`send-otp` (Zod-validate email → reject disposable domains → verify MX records → rate-limit per IP **and** per email → email a 6-digit OTP via Resend) → `verify-otp` (check code, attempts, expiry → save a `lead` doc to Sanity) → unlock resume download. In dev without `RESEND_API_KEY`, OTP is logged to console (simulation mode).

### Security (`middleware.ts`)
Applies a strict **CSP** and security headers (HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy) to all non-asset routes, plus an extra in-memory rate limit on `/api/*` (3/min for `send-otp`, 10/min otherwise). When adding a new external script/connect/img/media origin, **update the CSP `connect-src`/`script-src`/`img-src` lists** or it will be blocked.

## Conventions

- **Server Components by default.** Mark `"use client"` only when interactivity/hooks are needed.
- **Data fetching stays in Server Components / route handlers** via the Sanity `client`; pass plain props down to client components.
- **GROQ in `sanity/lib/queries.ts`**, image URLs via `urlFor()`. Remote image hosts must be allow-listed in `next.config.ts` `images.remotePatterns` (currently Sanity CDN, Unsplash, postimg, aceternity, chanhdai).
- **Validate all API input with Zod**; rate-limit sensitive routes via `checkRateLimit`.
- **Static imports for page sections** (NOT `next/dynamic`) — see Gotchas.
- **Every content page sets its own `alternates.canonical`** in `generateMetadata`; otherwise it inherits the root layout's homepage canonical and Google de-indexes it as a duplicate.
- **Animations must respect reduced motion**: Framer Motion is globally gated by `<MotionConfig reducedMotion="user">`; Lenis is skipped under the preference; CSS handles the rest (`globals.css`). Don't add motion that ignores this.
- ISR: pages set `export const revalidate = 60`.
- Tests rely on stable hooks: `data-testid` (e.g. `hero-first-name`/`hero-last-name`) and `id` anchors (incl. `#main-content` for the skip link). Don't rename these without updating `tests/`.

## Gotchas (hard-won — read before touching the shell or page imports)

- **Never wrap page content in an `ssr: false` component.** `ClientShell` → `SmoothScroll` (Lenis) renders `{children}`. If `SmoothScroll` is loaded with `dynamic(..., { ssr: false })`, Next renders the *entire site* as `null` on the server → crawlers and non-JS AI bots get an empty page (zero headings/content). It nearly tanked SEO. Lenis only runs in a `useEffect`, so the wrapper is safe to SSR — keep it a **static/`ssr:true` import**.
- **Don't `next/dynamic` SSR'd components that use `useId`** (Radix Collapsible/Select/Dialog…). The lazy boundary exists only on the client, so React's `useId` counter drifts → hydration mismatch on every Radix id. The home sections are therefore **static imports**. (`ThemeToggleFab` stays `ssr:false` because it's browser-only *and* rendered after children, so it can't shift their ids.)
- **There are two motion libraries**: most code imports `framer-motion`; a few files import `motion/react` (`motion` pkg). `MotionConfig` from `framer-motion` only governs `framer-motion`.
- **Lint is clean (0 problems) and `tsc` passes** — keep it that way; `next build` does not fail on lint, so run `npx eslint .` + `npx tsc --noEmit` yourself.

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

## SEO / GEO / LLM

This is fundamentally a **personal-brand SEO/GEO project** — the whole point is that "Sirajul Islam" ranks on Google **and** gets surfaced by LLMs (ChatGPT/Claude/Gemini/Perplexity). Preserve all of this when touching layouts/pages.

### Technical foundation (built; don't regress)
- Server-rendered content (see Gotchas — the `ssr:false` trap nearly killed this), per-page self-referencing canonicals, one semantic `<h1>` per page, clean `<title>` templates, meta-description fallbacks.
- JSON-LD: global `@graph` (WebSite/ProfilePage/Person) in `(website)/layout.tsx`; per-page `BlogPosting`/`CreativeWork` + `BreadcrumbList` via `lib/structured-data.ts` (author/publisher reference the Person by `@id`).
- `app/robots.ts` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…). `public/llms.txt` is the LLM-facing summary. `app/sitemap.ts` is dynamic with real per-content `lastmod` (post `publishedAt` / category `_updatedAt`).
- New external script/img/connect/media origins must be added to the CSP in `middleware.ts` AND (for images) `next.config.ts` `images.remotePatterns`.

### Ranking targets & on-page strategy
Primary money queries are **location + role/tool in Bangladesh**: "SQA Engineer / Software Tester / SDET / automation engineer / Playwright expert / Appium expert **in Bangladesh** (Dhaka)".
- **Rule: target phrases must live in VISIBLE, indexable content** — `<meta keywords>` is ignored by Google. These phrases are wired into: the homepage `<h1>` (Hero), a natural About paragraph, the Person JSON-LD (`areaServed` Bangladesh/Dhaka/remote + `hasOccupation.occupationLocation` = Bangladesh + `knowsAbout`), and `llms.txt`'s "Location & Availability" section.
- **Never keyword-stuff** — Google penalizes it. Keep new copy natural.
- The Person entity is linked to LinkedIn + GitHub via `sameAs` (driven by the `linkedin`/`github` siteSettings fields) — this is the main entity-recognition signal for Google and LLMs.

### Off-page (NOT code — the larger half of actually ranking)
On-page is maxed; rankings/LLM-mentions are then earned over weeks–months via: backlinks & mentions (LinkedIn, GitHub, dev.to/Medium, BD tech directories), consistent NAP (same name/role/Dhaka, Bangladesh everywhere), and publishing + sharing content so the web associates "Sirajul Islam ↔ QA Bangladesh" (this is also how you enter LLM training data).

### Operational workflow
- **Deploy = `git push origin main`** → Vercel auto-deploys production. Nothing is live until pushed. Always `npx tsc --noEmit` + `npx eslint .` + `npm run build` before pushing.
- After deploy: **GSC** → submit `sitemap.xml` (once) and URL-Inspect → Request Indexing key pages. Validate structured data with Google's Rich Results Test.
- **Bing matters for GEO**: ChatGPT Search / Copilot read Bing's index. Verify in Bing Webmaster Tools (import from GSC). **IndexNow** (Bing/Yandex/Naver — NOT Google) is a TODO worth adding for instant Bing indexing → faster ChatGPT discovery; would be a `public/<key>.txt` + a Sanity-publish webhook → `api.indexnow.org`.

### Known content gaps (hurt SEO/GEO until filled — in Sanity Studio)
- 3 projects have **no description** (`Appium 101`, `testcart`, `Performance 101`); the `about` document is **empty**.
- `GOOGLE_SITE_VERIFICATION` env is unset (site is verified another way — DNS/GSC). The `tagline` field had stray double spaces (code normalizes whitespace defensively).

## Notes

- `.puku/` is a Puku embeddings DB (semantic-search tooling), not application code. `Icon\r` is macOS junk — gitignore it.
