# EP0002: Site Content Sections

> **Status:** Done
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10
> **Target Release:** v1.0

## Summary

Build all content sections of the single-page website: Hero, What We Do, How We Work, Services Detail, and Footer. Each section is implemented as an Astro component with responsive layout (mobile-first via Tailwind) and semantic HTML. This epic delivers the core visual identity and content that visitors interact with.

## Inherited Constraints

> See PRD and TRD for full constraint details. Key constraints for this epic:

| Source | Type | Constraint | Impact |
|--------|------|------------|--------|
| PRD | Performance | Page weight < 500KB excl. fonts | No heavy images; use CSS for visual effects |
| PRD | Accessibility | WCAG 2.1 AA | Semantic HTML, colour contrast validated |
| PRD | Brand | Coral Pink `#FF6B6B` accent, Navy `#1B2A4A` primary | Tailwind design tokens |
| PRD | Content | Copy provided in requirements doc | Implement copy as specified |

---

## Business Context

### Problem Statement
The site has no content to communicate BrightKeep's identity, services, or working methodology. Visitors cannot learn about the company or assess credibility without these sections.

**PRD Reference:** [Feature Inventory](../prd.md#3-feature-inventory)

### Value Proposition
Delivers the core value proposition of the website: establishing credibility within 5 seconds (Hero), communicating services within 30 seconds (What We Do), and differentiating from competitors (How We Work). The Footer provides legal compliance and trust signals.

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Credibility established | N/A | < 5 seconds | User testing |
| Services understood | N/A | < 30 seconds scrolling | User testing |
| All content sections present | 0 | 5 sections | Visual audit |

---

## Scope

### In Scope
- F001: Hero section (navy background, headline, subheadline, CTA)
- F002: Services Overview - "What We Do" (two-column cards)
- F003: Methodology Grid - "How We Work" (six tiles, three-column)
- F004: Services Detail - "Services" (accordion or grid list)
- F006: Footer (company details, ABN, links)
- Responsive layout for all sections (375px, 768px, 1024px, 1440px)
- Semantic HTML structure for each section

### Out of Scope
- Scroll animations (EP0003 - sections built animation-ready with data attributes)
- Contact form (EP0004)
- SEO meta tags and structured data (EP0005)
- Privacy policy page (EP0005)

### Affected Personas
- **Startup Sam:** Scans Hero and "What We Do" quickly; needs instant clarity on product development services
- **Leader Lee:** Reads "How We Work" in detail; checks "Services" for specific consulting capabilities (DORA, DevOps, EngOps)
- **Enterprise Erin:** Reads all sections methodically; checks Footer for ABN and location to verify legitimacy

---

## Acceptance Criteria (Epic Level)

- [ ] Hero section displays headline, subheadline, and CTA button on all breakpoints
- [ ] "What We Do" shows two service cards side-by-side on desktop, stacked on mobile
- [ ] "How We Work" displays six tiles in 3-column grid on desktop, stacked on mobile
- [ ] "Services" section lists all 11 service offerings in accordion or grid format
- [ ] Footer displays BrightKeep name, ABN 70 667 383 477, Melbourne VIC Australia, contact email, LinkedIn placeholder
- [ ] All copy matches the approved requirements document
- [ ] All sections use BrightKeep colour palette (Navy, Coral Pink, Off-White, etc.)
- [ ] All sections render correctly at 375px, 768px, 1024px, 1440px breakpoints
- [ ] HTML is semantic (section, article, h2/h3 hierarchy)
- [ ] Touch targets >= 44x44px on mobile

---

## Dependencies

### Blocked By

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| EP0001: Project Setup | Epic | Draft | Developer |

### Blocking

| Item | Type | Impact |
|------|------|--------|
| EP0003: Navigation & Animations | Epic | Needs section IDs and structure to animate |
| EP0004: Contact & Lead Generation | Epic | Contact section sits between Services and Footer |
| EP0005: Quality & Compliance | Epic | SEO and a11y audit needs content to assess |

---

## Risks & Assumptions

### Assumptions
- All copy is approved as-is from the requirements document (placeholder company name "BrightKeep" confirmed)
- No images or illustrations are needed (typographic design with CSS effects)
- Accordion behaviour can be achieved with CSS-only or minimal JS (no framework needed)
- Design tokens from EP0001 are available and correct

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Copy changes during development | Medium | Low | Keep copy in data files or constants for easy updates |
| Accordion behaviour needs JS | Low | Low | HTML `<details>`/`<summary>` or GSAP-powered (EP0003) |
| Colour palette fails contrast checks | Low | Medium | Validate all colour combinations during development |

---

## Technical Considerations

### Architecture Impact
Establishes the Astro component pattern for all page sections. Each section is a self-contained `.astro` component composed into the main page layout.

### Integration Points
- Tailwind CSS design tokens (from EP0001)
- Section IDs used by navigation (EP0003) and scroll animations (EP0003)
- Footer links to Privacy Policy page (EP0005)

---

## Sizing

**Story Points:** 13
**Estimated Story Count:** 5-6

**Complexity Factors:**
- Five distinct sections with different layouts (moderate)
- Responsive design across 4 breakpoints (moderate)
- Accordion/expandable UI for Services Detail (low-moderate)
- Copy-heavy but no dynamic data (low)

---

## Story Breakdown

| ID | Title | Points | Status |
|----|-------|--------|--------|
| [US0004](../stories/US0004-hero-section.md) | Build Hero Section | 2 | Done |
| [US0005](../stories/US0005-services-overview.md) | Build Services Overview ("What We Do") | 3 | Done |
| [US0006](../stories/US0006-methodology-grid.md) | Build Methodology Grid ("How We Work") | 3 | Done |
| [US0007](../stories/US0007-services-detail.md) | Build Services Detail Section | 3 | Done |
| [US0008](../stories/US0008-footer.md) | Build Footer | 2 | Done |

**Total:** 13 points (5 stories)

---

## Test Plan

**Test Spec:** To be generated via `/sdlc-studio test-spec --epic EP0002`.

---

## Open Questions

None - all content and design decisions resolved in PRD v1.1.0.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial epic created from PRD v1.1.0 |
