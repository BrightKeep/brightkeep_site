# EP0005: Quality, SEO & Compliance

> **Status:** Done
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10
> **Target Release:** v1.0

## Summary

Deliver the cross-cutting quality requirements: comprehensive accessibility audit and fixes, SEO optimisation (meta tags, structured data, sitemap), responsive design hardening across all breakpoints, and the privacy policy page. This epic is the final polish pass that makes the site launch-ready.

## Inherited Constraints

> See PRD and TRD for full constraint details. Key constraints for this epic:

| Source | Type | Constraint | Impact |
|--------|------|------------|--------|
| PRD | Accessibility | WCAG 2.1 AA minimum | Full audit of all components and colour combinations |
| PRD | SEO | Schema.org Organization + LocalBusiness | Structured data in JSON-LD format |
| PRD | Legal | Australian Privacy Act compliance | Privacy policy must cover form data and analytics |
| PRD | Legal | ABN displayed in footer | Already in EP0002, verify present |
| PRD | Performance | Lighthouse > 90 all categories | Final performance audit and optimisation |

---

## Business Context

### Problem Statement
A site that isn't accessible excludes potential clients. A site that isn't SEO-optimised won't be found. A site without a privacy policy doesn't meet Australian legal requirements. These quality gates must be passed before launch.

**PRD Reference:** [F007-F009, F013](../prd.md#3-feature-inventory)

### Value Proposition
SEO ensures BrightKeep is discoverable when business owners search for digital consultancies in Melbourne. Accessibility ensures no potential client is excluded. The privacy policy meets legal obligations and builds trust (especially for Enterprise Erin's procurement process). The responsive design audit ensures the 60%+ mobile visitors have a flawless experience.

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Lighthouse Accessibility | N/A | > 90 | Lighthouse audit |
| Lighthouse SEO | N/A | > 90 | Lighthouse audit |
| Lighthouse Performance | N/A | > 90 | Lighthouse audit |
| Lighthouse Best Practices | N/A | > 90 | Lighthouse audit |
| WCAG 2.1 AA violations | N/A | 0 | axe-core or WAVE audit |

---

## Scope

### In Scope
- F007: Responsive design audit and fixes across all 4 breakpoints
- F008: Accessibility audit and remediation (WCAG 2.1 AA)
- F008: Skip-to-content link, focus indicators, keyboard navigation
- F008: Colour contrast validation for all palette combinations
- F009: Meta title, description, Open Graph, Twitter Card tags
- F009: Schema.org structured data (Organization, LocalBusiness)
- F009: Astro sitemap integration (`@astrojs/sitemap`)
- F009: robots.txt configuration
- F009: Canonical URL configuration
- F013: Privacy policy page (/privacy) using compliant template
- Final Lighthouse audit and performance optimisation

### Out of Scope
- Content changes (EP0002)
- Animation performance tuning (EP0003 - handled in that epic)
- Form accessibility (EP0004 - handled in that epic, verified here)

### Affected Personas
- **Startup Sam:** Finds BrightKeep via Google search thanks to SEO; mobile experience is flawless
- **Leader Lee:** Can share the site URL and it previews well on LinkedIn/Slack (Open Graph tags)
- **Enterprise Erin:** Privacy policy meets procurement requirements; ABN verifiable; structured data signals legitimacy

---

## Acceptance Criteria (Epic Level)

- [ ] Lighthouse score > 90 across all 4 categories (Performance, Accessibility, Best Practices, SEO)
- [ ] Zero WCAG 2.1 AA violations (axe-core audit)
- [ ] Skip-to-content link is first focusable element
- [ ] All interactive elements keyboard-navigable with visible focus indicators
- [ ] All colour combinations meet WCAG AA contrast ratios
- [ ] Meta title and description set and optimised
- [ ] Open Graph tags render correct preview on social platforms
- [ ] Twitter Card tags configured
- [ ] Schema.org JSON-LD for Organization and LocalBusiness present
- [ ] sitemap.xml generated and accessible
- [ ] robots.txt configured and accessible
- [ ] Canonical URL set on all pages
- [ ] Privacy policy page accessible at /privacy
- [ ] Privacy policy covers: data collected, usage, third parties, cookies, contact for data requests
- [ ] Site renders correctly at 375px, 768px, 1024px, 1440px (visual audit)
- [ ] No horizontal scrolling at any breakpoint

---

## Dependencies

### Blocked By

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| EP0001: Project Setup | Epic | Draft | Developer |
| EP0002: Site Content Sections | Epic | Draft | Developer |
| EP0003: Navigation & Animations | Epic | Draft | Developer |
| EP0004: Contact & Lead Generation | Epic | Draft | Developer |

### Blocking

| Item | Type | Impact |
|------|------|--------|
| Site Launch | Milestone | Cannot launch without quality gates passed |

---

## Risks & Assumptions

### Assumptions
- A privacy policy template compliant with Australian Privacy Act is available
- Colour palette as specified in the PRD passes WCAG AA contrast checks (Coral Pink `#FF6B6B` on white and navy backgrounds)
- Astro's built-in sitemap integration is sufficient

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Coral Pink fails contrast on certain backgrounds | Medium | Medium | Verify early in EP0002; adjust shade if needed while maintaining brand feel |
| Privacy policy template doesn't cover all Australian requirements | Low | Medium | Use established template (e.g., Termly, iubenda) and flag for legal review pre-launch |
| Lighthouse performance drops below 90 with GSAP loaded | Low | Medium | GSAP loaded async; test early in EP0003; optimise if needed |

---

## Technical Considerations

### Architecture Impact
Minimal new architecture. SEO meta tags go in the Astro base layout `<head>`. Structured data is a JSON-LD `<script>` in the layout. Privacy policy is a new Astro page. Accessibility fixes are modifications to existing components.

### Integration Points
- `@astrojs/sitemap` integration for sitemap generation
- Schema.org structured data (JSON-LD embedded in HTML)
- Social platform link preview rendering (Open Graph, Twitter Cards)

---

## Sizing

**Story Points:** 8
**Estimated Story Count:** 3-4

**Complexity Factors:**
- Accessibility audit and remediation (moderate - depends on number of issues found)
- SEO meta tags and structured data (low - template-driven)
- Privacy policy page creation (low - template-based content)
- Responsive design audit (low-moderate - testing across breakpoints)

---

## Story Breakdown

| ID | Title | Points | Status |
|----|-------|--------|--------|
| [US0014](../stories/US0014-seo-structured-data.md) | Implement SEO Meta Tags and Structured Data | 2 | Draft |
| [US0015](../stories/US0015-accessibility-audit.md) | Conduct Accessibility Audit and Remediation | 3 | Draft |
| [US0016](../stories/US0016-privacy-policy.md) | Create Privacy Policy Page | 2 | Draft |
| [US0017](../stories/US0017-responsive-audit.md) | Responsive Design Audit and Final Polish | 3 | Draft |

**Total:** 10 points (4 stories)

---

## Test Plan

**Test Spec:** To be generated via `/sdlc-studio test-spec --epic EP0005`.

---

## Open Questions

- [ ] Should the privacy policy be reviewed by a lawyer before launch? - Owner: Stakeholder
- [ ] Is the custom domain ready for canonical URL and sitemap configuration? - Owner: Developer

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial epic created from PRD v1.1.0 |
