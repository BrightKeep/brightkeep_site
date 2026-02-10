# US0001: Initialise Astro Project with Tailwind and GSAP

> **Status:** Done
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** CTO/Engineering Manager (Leader Lee)
**I want** an Astro project initialised with TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Google Fonts, and a semantic base HTML layout
**So that** the engineering foundation is production-grade from day one, enabling confident and rapid development of all site content

## Context

### Persona Reference
**Leader Lee** - CTO / Head of Product / Engineering Manager. Expert-level technical proficiency. Evaluates technology choices critically and expects deep engineering credibility, not surface-level tooling decisions.
[Full persona details](../personas.md#leader-lee)

### Background
BrightKeep has no existing codebase. This story establishes the project skeleton that every subsequent story builds upon. The tech stack (Astro + Tailwind + GSAP) was chosen for its alignment with the project's performance targets: Lighthouse > 90, FCP < 1.5s, page weight < 500KB, and zero JS by default with GSAP loaded only via Astro's component island architecture. TypeScript is required for type safety across all components. Google Fonts (Inter for headings/body, JetBrains Mono for code/mono) must be integrated with `font-display: swap` to avoid render-blocking. The base layout must use semantic HTML (header, nav, main, section, footer) to support WCAG 2.1 AA accessibility from the outset.

---

## Acceptance Criteria

### AC1: Astro project initialised with TypeScript
- **Given** no existing project directory
- **When** the developer scaffolds the project using `npm create astro@latest` with TypeScript strict mode enabled
- **Then** the project contains a valid `astro.config.mjs`, `tsconfig.json` with `"strict": true`, `package.json` with Astro as a dependency, and `npm run dev` starts the development server without errors in under 3 seconds

### AC2: Tailwind CSS installed and functional
- **Given** the Astro project has been initialised
- **When** Tailwind CSS is installed via `@astrojs/tailwind` integration
- **Then** a `tailwind.config.mjs` file exists at the project root, Tailwind utility classes (e.g. `bg-blue-500`, `text-xl`, `flex`) render correctly in the browser when applied to elements, and the build output includes only used CSS classes (purge is active)

### AC3: GSAP and ScrollTrigger installed as npm dependencies
- **Given** the Astro project has been initialised
- **When** `gsap` is installed via npm
- **Then** `gsap` and `gsap/ScrollTrigger` are importable in `.astro` components within a `<script>` tag or client-side island, the GSAP version is pinned in `package.json`, and the total GSAP bundle contribution is < 50KB gzipped in the production build

### AC4: Google Fonts configured with optimal loading
- **Given** the base HTML layout exists
- **When** the page is loaded in a browser
- **Then** Inter (weights 400, 500, 600, 700) and JetBrains Mono (weight 400) load from Google Fonts CDN, `font-display: swap` is applied to prevent invisible text during font loading, and the fonts are preconnected via `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

### AC5: Base HTML layout with semantic structure
- **Given** the project is initialised with all dependencies
- **When** the base layout component (`src/layouts/BaseLayout.astro`) is rendered
- **Then** the output HTML includes: a `<!DOCTYPE html>` declaration, `<html lang="en">`, a `<head>` with charset, viewport meta, and font links, a `<body>` containing semantic elements (`<header>`, `<main>`, `<footer>`), and a slot for page content; the page passes the W3C HTML validator with zero errors

---

## Scope

### In Scope
- Astro project scaffolding with TypeScript (strict mode)
- `@astrojs/tailwind` integration installation and configuration
- `gsap` npm package installation with version pinning
- Google Fonts `<link>` tags for Inter and JetBrains Mono with preconnect hints
- `src/layouts/BaseLayout.astro` with semantic HTML structure and content slot
- `src/pages/index.astro` using the base layout (placeholder content only)
- Astro configured for static output mode (`output: 'static'`)
- `.gitignore` configured for Node.js/Astro project
- `README.md` with basic project setup instructions

### Out of Scope
- BrightKeep design token configuration in Tailwind (US0002)
- GitHub Actions deployment workflow (US0003)
- Page content sections, navigation, or animations (EP0002, EP0003)
- ESLint, Prettier, or other linting configuration (separate story if needed)
- GSAP animation implementation (EP0003) -- only dependency installation here
- Analytics script integration (EP0005)
- SEO meta tags and structured data (EP0005)

---

## Technical Notes

### Project Structure
```
brightkeep/
  src/
    layouts/
      BaseLayout.astro       # Semantic HTML shell, head config, font loading
    pages/
      index.astro             # Landing page using BaseLayout (placeholder content)
  public/                     # Static assets (empty initially)
  astro.config.mjs            # Astro config with Tailwind integration, static output
  tailwind.config.mjs         # Tailwind config (extended in US0002)
  tsconfig.json               # TypeScript strict mode
  package.json                # Dependencies: astro, @astrojs/tailwind, gsap
```

### Astro Configuration
- `output: 'static'` -- GitHub Pages requires pre-rendered static files, no SSR
- `site` property should be left configurable (set via environment variable in US0003)
- Tailwind integration via `@astrojs/tailwind` is the officially supported approach

### Font Loading Strategy
- Use Google Fonts CSS API v2 for optimal loading
- Preconnect to both `fonts.googleapis.com` and `fonts.gstatic.com`
- Specify only the weights needed: Inter 400,500,600,700 and JetBrains Mono 400
- `font-display: swap` prevents FOIT (Flash of Invisible Text)

### GSAP Licensing
- GSAP's standard licence permits free use on websites that are not sold as tools/templates
- BrightKeep is a company marketing site, which is covered under the free "No Charge" licence
- ScrollTrigger is included in the free GSAP package

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Google Fonts CDN is unavailable | System fonts (sans-serif, monospace) display via `font-display: swap`; no blank text or layout breakage occurs |
| npm install fails due to network error | Developer receives clear error from npm; `package-lock.json` is not corrupted; retry resolves the issue |
| TypeScript compilation error in `.astro` file | Astro dev server displays the error in the terminal and browser overlay with file, line, and column information |
| Tailwind class not being purged correctly | Build output CSS is checked; unused classes are absent; all classes used in `.astro` files are retained |
| GSAP import used at top level (outside client script) | Astro build fails or warns because GSAP requires a browser environment; developer must use `<script>` tag or `client:load` directive |
| Outdated Node.js version (< 18) | Astro installation fails with a clear version requirement error; `engines` field in `package.json` specifies `>=18.14.1` |
| Browser with JavaScript disabled | Semantic HTML content remains readable; only GSAP animations are absent; layout and typography render correctly via CSS |

---

## Test Scenarios

- [ ] Running `npm run dev` starts the Astro dev server and serves the index page at `localhost:4321` without errors
- [ ] Running `npm run build` produces static output in the `dist/` directory with an `index.html` file
- [ ] The `dist/index.html` file contains `<!DOCTYPE html>`, `<html lang="en">`, `<head>`, `<body>`, `<header>`, `<main>`, and `<footer>` elements
- [ ] Tailwind CSS utility classes (e.g. `class="text-lg font-bold"`) applied to an element in `index.astro` produce the correct styles in the browser
- [ ] The built CSS file in `dist/` does not contain unused Tailwind utilities (file size < 20KB for a near-empty page)
- [ ] Importing `import { gsap } from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'` inside a `<script>` tag in an Astro component does not produce build errors
- [ ] The rendered page includes `<link rel="preconnect" href="https://fonts.googleapis.com">` in the `<head>`
- [ ] The rendered page includes a Google Fonts `<link>` tag loading Inter (400;500;600;700) and JetBrains Mono (400) with `display=swap`
- [ ] Inspecting computed styles in the browser confirms `font-family` resolves to "Inter" for body text and "JetBrains Mono" for elements styled with the mono font class
- [ ] The `tsconfig.json` has `"strict": true` and TypeScript errors are surfaced during `npm run build`
- [ ] The HTML output passes the W3C Markup Validation Service with zero errors
- [ ] The `astro.config.mjs` contains `output: 'static'`

---

## Dependencies

### Story Dependencies
| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| None | -- | This is the first story in EP0001 | -- |

### External Dependencies
| Dependency | Type | Status |
|------------|------|--------|
| npm registry | Package installation (astro, tailwind, gsap) | Available |
| Google Fonts CDN | Font loading at runtime | Available |
| Node.js >= 18.14.1 | Runtime for Astro dev/build | Required |
| GitHub repository | Code hosting (created before first push) | Pending |

---

## Estimation

**Story Points:** 3
**Complexity:** Low

**Rationale:** Well-documented stack with official Astro integrations for Tailwind. GSAP is a standard npm install. Google Fonts integration is a straightforward `<link>` tag addition. The primary work is scaffolding and configuration with no custom logic.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
