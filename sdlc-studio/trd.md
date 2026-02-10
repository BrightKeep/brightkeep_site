# Technical Requirements Document

**Project:** BrightKeep - Digital Consultancy Website
**Version:** 1.0.0
**Status:** Draft
**Last Updated:** 2026-02-10
**PRD Reference:** [PRD](prd.md)

---

## 1. Executive Summary

### Purpose
Define the technical architecture and implementation strategy for the BrightKeep marketing website: a static single-page site built with Astro, styled with Tailwind CSS, animated with GSAP ScrollTrigger, and deployed to GitHub Pages via GitHub Actions.

### Scope
This TRD covers the v1 launch website. It documents the build pipeline, component architecture, integration patterns, and infrastructure decisions. It does not cover post-launch features (blog, case studies, client portal) or backend services.

### Key Decisions
- Static site generation with Astro (zero JS by default, component islands for interactivity)
- GitHub Pages for hosting with GitHub Actions CI/CD
- GSAP ScrollTrigger for professional scroll animations (not CSS animations or Framer Motion)
- Formspree for form handling (no server-side code required)
- Tailwind CSS for utility-first styling with BrightKeep design tokens

---

## 2. Project Classification

**Project Type:** Web Application (Static)

**Classification Rationale:** The project serves a web frontend (HTML/CSS/JS in the browser) but has no backend application server. It is a static site generated at build time and served as pre-rendered HTML files. All dynamic behaviour (form submission, analytics) is handled by third-party services.

**Architecture Implications:**
- **Default Pattern:** Monolith (per reference-architecture.md for Web Applications)
- **Pattern Used:** Static Single-Page Application
- **Deviation Rationale:** A monolith implies a runtime application server. This project has no server -- it generates static HTML at build time. The "Static SPA" pattern is the simplest possible web architecture: build-time rendering, CDN serving, and third-party integrations for any dynamic behaviour. This is simpler than the default and entirely appropriate for a marketing website with no user accounts, no database, and no server-side logic.

---

## 3. Architecture Overview

### System Context
BrightKeep is a static marketing website. Visitors load pre-rendered HTML, CSS, and JavaScript from GitHub Pages' CDN. The only runtime interactions are: (1) form submissions sent to Formspree via AJAX, (2) analytics events sent to the analytics provider, and (3) font loading from Google Fonts CDN.

### Architecture Pattern
Static Single-Page Application (build-time rendered)

**Rationale:** The site has no user accounts, no database, no server-side logic, and no dynamic content. Every page is identical for every visitor. Static generation eliminates server infrastructure, maximises performance (CDN-served), and provides near-perfect uptime via GitHub Pages' SLA. The only client-side JavaScript is GSAP for animations and a small form submission script.

### Component Overview

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| Build Pipeline | Compile Astro components to static HTML/CSS/JS | Astro + GitHub Actions |
| Page Layout | Base HTML structure, `<head>` meta, font loading | Astro BaseLayout component |
| Content Sections | Hero, What We Do, How We Work, Services, Contact, Footer | Astro `.astro` components |
| Navigation | Sticky nav, smooth scroll, active section tracking | GSAP ScrollTrigger + vanilla JS |
| Scroll Animations | Entrance animations, staggered reveals, fade-ins | GSAP + ScrollTrigger |
| Contact Form | Client-side validation and AJAX submission | Vanilla JS + Formspree API |
| Analytics | Event tracking, configurable provider | Async script tag, `trackEvent()` utility |
| Design System | Colours, typography, spacing, breakpoints | Tailwind CSS config (design tokens) |
| Privacy Page | Separate `/privacy` route | Astro page component |
| Deployment | Build and deploy on push to main | GitHub Actions → GitHub Pages |

### Architecture Diagram

```mermaid
graph TB
    subgraph visitors [Visitors]
        Sam((Startup Sam))
        Lee((Leader Lee))
        Erin((Enterprise Erin))
    end

    subgraph github [GitHub Infrastructure]
        Repo[GitHub Repository]
        Actions[GitHub Actions CI/CD]
        Pages[GitHub Pages CDN]
    end

    subgraph external [External Services]
        Formspree[Formspree API]
        GoogleFonts[Google Fonts CDN]
        Analytics[Analytics Provider TBD]
    end

    Sam --> Pages
    Lee --> Pages
    Erin --> Pages

    Pages -->|Font requests| GoogleFonts
    Pages -->|Form submissions| Formspree
    Pages -->|Page view events| Analytics

    Repo -->|Push to main| Actions
    Actions -->|Build & Deploy| Pages

    Formspree -->|Email delivery| Email[contact@brightkeep.com.au]
```

---

## 4. Technology Stack

### Core Technologies

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| Site Builder | Astro | 4.x (latest) | Zero JS by default; ships pure HTML/CSS unless client JS is explicitly opted in via component islands. Ideal for static marketing sites where performance is critical. Built-in support for Tailwind, sitemap generation, and static output. |
| Styling | Tailwind CSS | 3.x / 4.x | Utility-first approach enables rapid, consistent styling without custom CSS files. Design tokens (colours, fonts, breakpoints) configured once in `tailwind.config.mjs` and used everywhere. JIT mode ensures only used classes are in the build output. |
| Animations | GSAP + ScrollTrigger | 3.x | Industry-standard animation library with superior performance to CSS animations for complex scroll-driven sequences. ScrollTrigger provides precise viewport-based triggering. ~45KB gzipped total. Free "No Charge" licence covers commercial websites. |
| Language | TypeScript | 5.x | Type safety for Astro components and scripts. Catches errors at build time. Configured in strict mode. |
| Fonts | Inter + JetBrains Mono | Latest | Inter: clean, professional sans-serif for all text. JetBrains Mono: monospace for technical accents. Both loaded from Google Fonts CDN with `font-display: swap` and `<link rel="preconnect">`. |

### Build & Development

| Tool | Purpose |
|------|---------|
| npm | Package management and script execution |
| Astro CLI | Dev server (`npm run dev`), build (`npm run build`), preview |
| Node.js 20 LTS | Runtime for build tooling |
| GitHub Actions | CI/CD pipeline (build + deploy on push to main) |

### Infrastructure Services

| Service | Provider | Purpose |
|---------|----------|---------|
| Static hosting | GitHub Pages | Serves built HTML/CSS/JS via global CDN with automatic HTTPS |
| CI/CD | GitHub Actions | Automated build and deployment pipeline |
| Form handling | Formspree | AJAX form submission, spam filtering, email delivery |
| Font delivery | Google Fonts | CDN delivery of Inter and JetBrains Mono |
| Analytics | TBD (Plausible/Fathom/Umami) | Cookieless, privacy-respecting page view and event tracking |

---

## 5. API Contracts

### API Style
No custom API. The site consumes two external APIs:

### External API: Formspree

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `https://formspree.io/f/{FORM_ID}` | Submit contact form | None (public endpoint, spam protection built-in) |

**Request Format:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "company": "string (optional)",
  "message": "string (optional)"
}
```

**Response (Success):** HTTP 200 with JSON body `{ "ok": true }`
**Response (Error):** HTTP 4xx/5xx with JSON body `{ "error": "message" }`

**Client-Side Behaviour:**
- Submit via `fetch()` with `Content-Type: application/json`
- No page redirect (AJAX submission)
- Show success confirmation on 200
- Show error message on non-200

### External API: Analytics Provider

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| Varies | Provider-specific | Page view and event tracking | Site ID via script tag |

**Integration Pattern:** Async `<script>` tag in `<head>`, gated by `PUBLIC_ANALYTICS_ID` environment variable. When the variable is unset, no analytics script is loaded.

### Authentication
No authentication required. The site is fully public. Formspree uses its built-in spam filtering (reCAPTCHA, honeypot) rather than authentication.

---

## 6. Data Architecture

### Data Models

#### Contact Enquiry (Formspree-managed)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| name | string | required, min 1 char | Visitor's name |
| email | string | required, valid email format | Visitor's email address |
| company | string | optional | Visitor's company name |
| message | string | optional | Enquiry message |
| _submitted_at | timestamp | auto-generated by Formspree | Submission timestamp |

### Storage Strategy

| Data Type | Storage | Rationale |
|-----------|---------|-----------|
| Website content | Static HTML files on GitHub Pages CDN | Pre-rendered at build time; no runtime generation |
| Form submissions | Formspree (forwarded to email) | No server-side code; Formspree handles storage and delivery |
| Analytics data | Analytics provider dashboard | Privacy-respecting provider stores aggregated data |
| Source code | GitHub repository | Version-controlled, triggers CI/CD on push |
| Build artifacts | GitHub Pages | `dist/` directory deployed via GitHub Actions |

### Migrations
Not applicable. No database. Content changes are deployed by pushing to the `main` branch, which triggers a full site rebuild.

---

## 7. Integration Patterns

### External Services

| Service | Purpose | Protocol | Auth | Failure Mode |
|---------|---------|----------|------|-------------|
| Formspree | Form submission handling | HTTPS REST (POST) | Public form ID | Show error message to user; form data not lost (still in form fields) |
| Google Fonts | Font file delivery | HTTPS (preconnect + stylesheet) | None | Fallback to system sans-serif/monospace via `font-display: swap` |
| Analytics Provider | Page view + event tracking | HTTPS (async script) | Site ID in script URL | Silent failure; site fully functional without analytics |
| GitHub Pages | Static file serving | HTTPS | None | GitHub SLA (99.9%); no fallback needed |

### Integration Resilience

| Service | Impact of Outage | Mitigation |
|---------|-----------------|------------|
| Formspree | Form submissions fail | Error message shown; visitor can email directly (address in footer) |
| Google Fonts | Fonts don't load | `font-display: swap` shows fallback immediately; no invisible text |
| Analytics | No tracking data | Site functions identically; no user-facing impact |
| GitHub Pages | Site completely down | GitHub SLA; could migrate to Cloudflare Pages with minimal config change |

### Event Architecture
Not applicable. No server-side events, message queues, or pub/sub patterns. All interactions are client-initiated HTTP requests.

---

## 8. Infrastructure

### Deployment Topology
```
Developer → git push main → GitHub Actions → npm run build → dist/ → GitHub Pages CDN → Visitors
```

Single environment. No staging. The GitHub Pages URL serves as both staging (pre-custom-domain) and production (post-custom-domain).

### Environment Strategy

| Environment | Purpose | Characteristics |
|-------------|---------|-----------------|
| Local Development | `npm run dev` with hot reload | Astro dev server on localhost:4321; instant feedback |
| Production | GitHub Pages | Static files served via CDN; HTTPS enforced; custom domain (when ready) |

**Note:** No staging environment. For a static marketing site with no user data, the risk of deploying directly to production is minimal. Preview deployments via PR could be added later if needed.

### Environment Variables

| Variable | Environment | Purpose | Storage |
|----------|-------------|---------|---------|
| `PUBLIC_FORMSPREE_ID` | Production (build-time) | Formspree form endpoint | GitHub repository variable |
| `PUBLIC_SITE_URL` | Production (build-time) | Canonical URL for SEO, sitemap, OG tags | GitHub repository variable |
| `PUBLIC_ANALYTICS_ID` | Production (build-time) | Analytics provider site ID | GitHub repository variable |

All variables use the `PUBLIC_` prefix, making them available in Astro via `import.meta.env.PUBLIC_*` at build time. They are embedded in the built HTML and are publicly visible in page source (not secrets).

### Scaling Strategy
Not applicable. GitHub Pages serves static files via a global CDN with no concurrent user limits. No server-side scaling concerns.

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          PUBLIC_FORMSPREE_ID: ${{ vars.PUBLIC_FORMSPREE_ID }}
          PUBLIC_SITE_URL: ${{ vars.PUBLIC_SITE_URL }}
          PUBLIC_ANALYTICS_ID: ${{ vars.PUBLIC_ANALYTICS_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 9. Security Considerations

### Threat Model

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|------------|
| Form spam / abuse | Medium | Low | Formspree built-in spam filtering (reCAPTCHA, honeypot); free tier rate-limited to 50/month |
| XSS via form fields | Low | Low | Form data is never rendered on the site; sent directly to Formspree; no user-generated content displayed |
| Supply chain attack (npm) | Low | Medium | `npm ci` with lockfile ensures deterministic installs; GitHub Dependabot for vulnerability alerts |
| GitHub Pages compromise | Very Low | High | GitHub's infrastructure security; HTTPS enforced; no custom server code |
| Analytics script injection | Low | Medium | Load only from trusted CDN; `async` attribute; site functions without it |

### Security Controls

| Control | Implementation |
|---------|----------------|
| HTTPS | Enforced by GitHub Pages for all `*.github.io` domains and custom domains |
| External link safety | All external links use `target="_blank" rel="noopener noreferrer"` |
| Form CSRF protection | Formspree handles CSRF via its own mechanisms |
| Dependency security | GitHub Dependabot alerts; `npm audit` in development |
| Content Security | No user-generated content displayed; all content is static |
| Data minimisation | Contact form collects only: Name, Email, Company (optional), Message (optional) |

### Data Classification

| Data | Classification | Handling |
|------|---------------|----------|
| Website content | Public | Static HTML, fully public |
| Contact form submissions | Personal (Name, Email) | Processed by Formspree; forwarded to company email; subject to Privacy Policy |
| Analytics data | Aggregated, non-PII | Cookieless provider; no individual tracking |
| Source code | Internal (public repo) | GitHub repository |

---

## 10. Performance Requirements

### Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | Lighthouse audit (Chrome DevTools) |
| Lighthouse Accessibility | > 90 | Lighthouse audit |
| Lighthouse Best Practices | > 90 | Lighthouse audit |
| Lighthouse SEO | > 90 | Lighthouse audit |
| First Contentful Paint | < 1.5s | Lighthouse / WebPageTest |
| Cumulative Layout Shift | 0 | Lighthouse (no animation-caused shifts) |
| Total page weight (excl. fonts) | < 500KB | Build output analysis |
| GSAP bundle size | < 50KB gzipped | Bundle analysis |
| Animation frame rate | 60fps | Chrome DevTools Performance tab |
| Build time | < 30s | GitHub Actions log |
| Deploy pipeline (total) | < 2 min | GitHub Actions log |
| Dev server start | < 3s | Local measurement |

### Performance Strategy
- **Zero JS by default:** Astro ships no JavaScript unless explicitly opted in. Only GSAP and the form submission script are client-side JS.
- **Async script loading:** GSAP and analytics scripts load with `async`/`defer` -- no render-blocking JS.
- **Font optimisation:** Google Fonts with `<link rel="preconnect">` and `font-display: swap` -- no invisible text flash.
- **CSS optimisation:** Tailwind JIT mode purges unused classes; CSS is minimal.
- **No images (v1):** Typographic design with CSS effects; no image optimisation needed.
- **Pre-sized elements:** All animated elements have explicit dimensions to prevent CLS.

---

## 11. Architecture Decision Records

### ADR-001: Astro over Next.js and Gatsby

**Status:** Accepted

**Context:** Need a static site builder for a marketing website. The site has no user accounts, no API, and no dynamic server-side content. Three main options considered: Astro, Next.js, and Gatsby.

**Decision:** Use Astro as the site builder.

**Consequences:**
- Positive: Zero JavaScript shipped by default (critical for Lighthouse Performance > 90)
- Positive: Component islands architecture allows adding interactivity only where needed
- Positive: Built-in Tailwind and sitemap integrations
- Positive: Simple mental model -- `.astro` components compile to pure HTML
- Negative: Smaller community than Next.js (but sufficient for a static marketing site)
- Negative: No built-in image optimisation (not needed for v1, no images)

### ADR-002: GitHub Pages over Vercel and Netlify

**Status:** Accepted

**Context:** Need static site hosting with HTTPS and CI/CD. User requirement: must work on GitHub Pages.

**Decision:** Use GitHub Pages with GitHub Actions for CI/CD.

**Consequences:**
- Positive: Free hosting with global CDN and automatic HTTPS
- Positive: Integrated with GitHub repository (no external service account needed)
- Positive: GitHub Actions provides full CI/CD control
- Negative: No built-in form handling (solved by Formspree)
- Negative: No server-side functions (not needed for static site)
- Negative: No preview deployments for PRs (can be added later)

### ADR-003: GSAP ScrollTrigger over CSS Animations

**Status:** Accepted

**Context:** The site needs professional scroll-driven animations (fade-ins, staggered reveals, parallax effects) to differentiate from basic static sites. Options: CSS animations with Intersection Observer, Framer Motion, or GSAP ScrollTrigger.

**Decision:** Use GSAP with ScrollTrigger plugin.

**Consequences:**
- Positive: Industry-standard animation library with superior performance for complex sequences
- Positive: ScrollTrigger provides precise viewport-based triggering with scrub, pin, and snap
- Positive: ~45KB gzipped total -- within the 50KB budget
- Positive: Works without a framework (vanilla JS, no React dependency)
- Positive: "No Charge" licence covers commercial websites
- Negative: Third-party dependency added to the bundle
- Negative: Requires `prefers-reduced-motion` handling (built into story requirements)

### ADR-004: Formspree over Custom Form Backend

**Status:** Accepted

**Context:** GitHub Pages has no server-side processing. The contact form needs to submit data and deliver it as email. Options: Formspree, Getform, custom serverless function (AWS Lambda / Cloudflare Workers).

**Decision:** Use Formspree for form handling.

**Consequences:**
- Positive: No server-side code to maintain
- Positive: Built-in spam filtering, CSRF protection, and rate limiting
- Positive: Simple AJAX integration (POST to endpoint, receive JSON response)
- Positive: Free tier (50 submissions/month) sufficient for launch
- Negative: External dependency for a critical conversion path
- Negative: Free tier limited to 50 submissions/month (upgrade available)

### ADR-005: Tailwind CSS over Plain CSS / CSS Modules

**Status:** Accepted

**Context:** Need a styling approach that enables rapid development, enforces brand consistency via design tokens, and produces minimal CSS in production.

**Decision:** Use Tailwind CSS with custom design tokens in `tailwind.config.mjs`.

**Consequences:**
- Positive: Design tokens (colours, fonts, breakpoints) defined once, used everywhere
- Positive: JIT mode purges unused classes (tiny production CSS)
- Positive: Utility-first approach eliminates naming debates and CSS specificity issues
- Positive: Responsive design via prefix-based breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Negative: HTML can be verbose with many utility classes
- Negative: Custom components require `@apply` or component extraction patterns

---

## 12. Open Technical Questions

- [ ] **Q:** Which analytics provider (Plausible, Fathom, or Umami)?
  **Context:** All three are cookieless and privacy-respecting. Decision deferred. The analytics integration point is designed as a configurable slot gated by `PUBLIC_ANALYTICS_ID` so the provider can be swapped without code changes.

- [ ] **Q:** What is the custom domain for the site?
  **Context:** Required for canonical URLs, sitemap, Open Graph tags, and `PUBLIC_SITE_URL`. Currently pending domain registration. GitHub Pages supports custom domains with automatic HTTPS via Let's Encrypt.

- [ ] **Q:** Should the GitHub repository be public or private?
  **Context:** Public repos get unlimited GitHub Pages and Actions minutes. Private repos require a paid plan for GitHub Pages. The site content is public anyway, but source code visibility is a business decision.

---

## 13. Implementation Constraints

### Must Have
- Astro static output mode (`output: 'static'` in `astro.config.mjs`)
- Tailwind CSS design tokens matching PRD colour palette exactly
- GSAP loaded asynchronously (no render-blocking)
- `prefers-reduced-motion` support disabling all animations
- All Lighthouse scores > 90
- WCAG 2.1 AA compliance
- GitHub Actions deployment pipeline triggered on push to `main`
- HTTPS enforced on all pages
- Mobile-first responsive design (breakpoints: 375px, 768px, 1024px, 1440px)

### Won't Have (This Version)
- Server-side rendering (SSR) or API routes
- Database or persistent storage
- User authentication or accounts
- Image optimisation pipeline (no images in v1)
- Preview deployments for pull requests
- Staging environment
- Automated testing in CI pipeline (tests written in EP0005, CI integration deferred)
- Cookie consent banner (cookieless analytics)
- Content management system (CMS)

---

## 14. Project Structure

```
brightkeep/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD
├── public/
│   └── robots.txt                  # SEO: crawler directives
├── src/
│   ├── components/
│   │   ├── Hero.astro              # F001: Hero section
│   │   ├── ServicesOverview.astro   # F002: What We Do
│   │   ├── MethodologyGrid.astro   # F003: How We Work
│   │   ├── ServicesDetail.astro    # F004: Services accordion
│   │   ├── Contact.astro           # F005: Contact form + CTA
│   │   ├── Footer.astro            # F006: Footer
│   │   ├── Navigation.astro        # F011: Sticky nav
│   │   ├── SEO.astro               # F009: Meta tags, OG, JSON-LD
│   │   └── Analytics.astro         # F010: Analytics script tag
│   ├── layouts/
│   │   └── BaseLayout.astro        # Base HTML: head, meta, fonts, body
│   ├── pages/
│   │   ├── index.astro             # Main single-page layout
│   │   └── privacy.astro           # F013: Privacy policy page
│   └── scripts/
│       ├── animations.ts           # F012: GSAP ScrollTrigger setup
│       ├── navigation.ts           # F011: Active section tracking, mobile menu
│       └── contact-form.ts         # F005: Form validation + Formspree AJAX
├── astro.config.mjs                # Astro config: Tailwind, sitemap, site URL
├── tailwind.config.mjs             # Design tokens: colours, fonts, breakpoints
├── tsconfig.json                   # TypeScript strict mode config
├── package.json                    # Dependencies and scripts
└── package-lock.json               # Lockfile for deterministic builds
```

---

## 15. Design Token Reference

Sourced from PRD and configured in `tailwind.config.mjs`:

### Colour Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `brand-primary` | Navy | `#1B2A4A` | Hero background, footer background, headings |
| `brand-accent` | Coral Pink | `#FF6B6B` | CTA buttons, highlights, hover states |
| `brand-surface` | Off-White | `#F8F9FA` | Section backgrounds, content areas |
| `brand-secondary` | Steel Blue | `#3A6B9F` | Secondary text, links |
| `brand-highlight` | Teal | `#0D9488` | Accent highlights, icons |
| `brand-dark` | Charcoal | `#2D2D2D` | Body text |
| `brand-muted` | Slate | `#6B7280` | Muted text, captions |

### Typography

| Token | Font | Fallback | Usage |
|-------|------|----------|-------|
| `font-sans` | Inter | system sans-serif | All text |
| `font-mono` | JetBrains Mono | system monospace | Code accents |

### Responsive Breakpoints

| Token | Width | Target Device |
|-------|-------|---------------|
| `sm` | 375px | Standard mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1440px | Wide desktop |

### WCAG Contrast Notes

| Combination | Ratio | WCAG AA Status |
|-------------|-------|----------------|
| White on Navy (`#1B2A4A`) | ~12.6:1 | Pass (all text) |
| Charcoal (`#2D2D2D`) on Off-White (`#F8F9FA`) | ~12.0:1 | Pass (all text) |
| Coral Pink (`#FF6B6B`) on White | ~3.9:1 | Pass large text only (>=18px); fail normal text |
| Coral Pink (`#FF6B6B`) on Navy | ~4.2:1 | Pass large text only; use for buttons/headings, not body text |
| Slate (`#6B7280`) on White | ~4.6:1 | Pass (all text) |
| Teal (`#0D9488`) on White | ~3.9:1 | Pass large text only; use for icons/headings, not body text |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.0.0 | Initial TRD created from PRD v1.1.0 |
