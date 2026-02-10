# EP0001: Project Setup & Deployment Pipeline

> **Status:** Done
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10
> **Target Release:** v1.0

## Summary

Initialise the Astro project with Tailwind CSS and GSAP, configure the development environment, and establish the GitHub Actions CI/CD pipeline deploying to GitHub Pages. This epic is foundational - all other epics depend on the build and deployment infrastructure being in place.

## Inherited Constraints

> See PRD and TRD for full constraint details. Key constraints for this epic:

| Source | Type | Constraint | Impact |
|--------|------|------------|--------|
| PRD | Performance | Lighthouse > 90, FCP < 1.5s, page < 500KB | Astro config must optimise for zero JS by default |
| PRD | Performance | GSAP bundle < 50KB gzipped | Tree-shake GSAP, import only ScrollTrigger |
| PRD | Hosting | GitHub Pages static hosting | Astro static output mode, no SSR |
| PRD | CI/CD | GitHub Actions deployment | Automated build and deploy on push to main |

---

## Business Context

### Problem Statement
No project infrastructure exists. Cannot begin development of any site content without a working build pipeline, development environment, and deployment target.

**PRD Reference:** [Tech Stack](../prd.md#1-project-overview)

### Value Proposition
Establishes the foundation for all subsequent development. Enables rapid iteration with automated deployments and a consistent development experience.

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Build time | N/A | < 30s | GitHub Actions log |
| Deploy time | N/A | < 2 min (total pipeline) | GitHub Actions log |
| Dev server start | N/A | < 3s | Local measurement |

---

## Scope

### In Scope
- Astro project initialisation with TypeScript
- Tailwind CSS configuration with BrightKeep design tokens (colours, typography, spacing)
- GSAP + ScrollTrigger npm dependency setup
- Google Fonts (Inter, JetBrains Mono) integration
- GitHub Actions workflow for build and deploy to GitHub Pages
- Base HTML layout with semantic structure (head, meta, body)
- Environment variable configuration (Formspree ID, site URL, analytics ID)
- Development tooling (linting, formatting)

### Out of Scope
- Page content sections (EP0002)
- Navigation and animations (EP0003)
- Contact form integration (EP0004)
- SEO meta tags and structured data (EP0005)

### Affected Personas
- **Startup Sam:** Benefits indirectly - fast deployment means faster time-to-live site
- **Leader Lee:** Benefits indirectly - professional build pipeline signals engineering credibility
- **Enterprise Erin:** Benefits indirectly - HTTPS via GitHub Pages meets security expectations

---

## Acceptance Criteria (Epic Level)

- [ ] `npm run dev` starts Astro dev server successfully
- [ ] `npm run build` produces static output in `dist/`
- [ ] Tailwind CSS utility classes render correctly with BrightKeep colour palette
- [ ] GSAP and ScrollTrigger importable in Astro components
- [ ] Inter and JetBrains Mono fonts load from Google Fonts
- [ ] GitHub Actions workflow builds and deploys to GitHub Pages on push to main
- [ ] Deployed site accessible via GitHub Pages URL with HTTPS
- [ ] Environment variables configurable for Formspree, site URL, analytics
- [ ] Lighthouse performance score > 90 on empty base page

---

## Dependencies

### Blocked By

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| GitHub repository created | Infrastructure | Pending | Developer |

### Blocking

| Item | Type | Impact |
|------|------|--------|
| EP0002: Site Content | Epic | Cannot build content without project structure |
| EP0003: Navigation & Animations | Epic | Cannot implement without GSAP setup |
| EP0004: Contact & Lead Generation | Epic | Cannot integrate Formspree without build pipeline |
| EP0005: Quality & Compliance | Epic | Cannot add SEO/a11y without base layout |

---

## Risks & Assumptions

### Assumptions
- GitHub Pages is suitable for the expected traffic levels
- Astro's static output mode meets all requirements (no SSR needed)
- Free tier GitHub Actions minutes are sufficient for CI/CD
- GSAP's free licence covers this use case (business website, not a SaaS product)

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| GSAP licence restrictions | Low | High | Verify GSAP free licence covers commercial use; "No Charge" licence allows use on websites |
| GitHub Pages rate limits or downtime | Low | Medium | Static site can be migrated to Cloudflare Pages or Netlify with minimal config change |
| Tailwind purge misconfiguration | Medium | Low | Test build output size; verify all used classes are retained |

---

## Technical Considerations

### Architecture Impact
Establishes the entire project structure: directory layout, component patterns, build configuration, and deployment pipeline. All subsequent epics follow the patterns set here.

### Integration Points
- GitHub Actions → GitHub Pages (deployment)
- Google Fonts CDN (font loading)
- npm registry (build dependencies: Astro, Tailwind, GSAP)

---

## Sizing

**Story Points:** 8
**Estimated Story Count:** 3-4

**Complexity Factors:**
- Astro + Tailwind + GSAP integration (moderate - well-documented stack)
- GitHub Actions workflow authoring (low - standard Astro deployment template)
- Design token configuration (low - straightforward Tailwind config)

---

## Story Breakdown

| ID | Title | Points | Status |
|----|-------|--------|--------|
| [US0001](../stories/US0001-initialise-astro-project.md) | Initialise Astro Project with Tailwind and GSAP | 3 | Done |
| [US0002](../stories/US0002-configure-design-tokens.md) | Configure BrightKeep Design Tokens | 2 | Done |
| [US0003](../stories/US0003-github-actions-deployment.md) | Set Up GitHub Actions Deployment | 3 | Done |

**Total:** 8 points (3 stories)

---

## Test Plan

**Test Spec:** To be generated via `/sdlc-studio test-spec --epic EP0001`.

---

## Open Questions

- [ ] Is the GitHub repository already created, or does this epic include repo creation? - Owner: Developer

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial epic created from PRD v1.1.0 |
