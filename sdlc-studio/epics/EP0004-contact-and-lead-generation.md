# EP0004: Contact & Lead Generation

> **Status:** Done
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10
> **Target Release:** v1.0

## Summary

Implement the contact form with Formspree integration and prepare the analytics integration point. This epic delivers the primary conversion mechanism: turning visitor interest into business enquiries. The contact form is the most business-critical interactive element on the site.

## Inherited Constraints

> See PRD and TRD for full constraint details. Key constraints for this epic:

| Source | Type | Constraint | Impact |
|--------|------|------------|--------|
| PRD | Form | Formspree free tier (50 submissions/month) | No server-side logic; Formspree handles spam/rate-limiting |
| PRD | Accessibility | Form labels, keyboard navigation | All inputs labelled, tab order correct |
| PRD | UX | Low friction contact | Minimal required fields (Name, Email only) |
| PRD | Analytics | Provider TBD | Build single integration point, swap provider later |

---

## Business Context

### Problem Statement
Visitors who are interested in BrightKeep's services have no way to start a conversation. Without a contact form, the site generates awareness but not leads. Without analytics, there's no way to measure effectiveness.

**PRD Reference:** [F005: Contact CTA](../prd.md#3-feature-inventory), [F010: Analytics Integration](../prd.md#3-feature-inventory)

### Value Proposition
The contact form is the site's primary conversion mechanism. Every other section exists to build enough trust and interest that a visitor reaches this form and submits an enquiry. Analytics provides the measurement layer to optimise this funnel over time.

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Form submissions | 0 | > 0 within first month | Formspree dashboard |
| Form completion rate | N/A | > 60% of visitors who start | Analytics (when configured) |
| Form error rate | N/A | < 5% | Client-side validation |

---

## Scope

### In Scope
- F005: "Let's Talk" contact section with navy background
- F005: Contact form with 4 fields (Name, Email, Company, Message)
- F005: Client-side form validation (required fields, email format)
- F005: Formspree AJAX submission (no page redirect)
- F005: Success and error state UI
- F010: Analytics integration point (configurable, provider TBD)
- F010: Form submission event tracking (when analytics configured)
- F010: Async script loading pattern for analytics

### Out of Scope
- Analytics provider selection and configuration (deferred decision)
- "Book a Call" CTA (deferred to post-launch)
- Scroll depth tracking (deferred to analytics setup)
- Formspree account setup (operational task, not code)

### Affected Personas
- **Startup Sam:** Submits a short message quickly; values low-friction form with few required fields
- **Leader Lee:** Writes a detailed message describing their situation; needs the textarea
- **Enterprise Erin:** Includes company name; may submit as part of a formal vendor evaluation process

---

## Acceptance Criteria (Epic Level)

- [ ] "Let's Talk" section renders with navy background and centred content
- [ ] Contact form displays: Name (required), Email (required), Company (optional), Message (optional)
- [ ] Client-side validation prevents submission of empty Name or invalid Email
- [ ] Form submits to Formspree via AJAX (no page redirect)
- [ ] Success confirmation displayed after successful submission
- [ ] Error message displayed if submission fails
- [ ] Formspree handles spam filtering and rate limiting
- [ ] Analytics integration point exists (single config location for provider script)
- [ ] Form submission fires analytics event when provider is configured
- [ ] Analytics script loads asynchronously (no render blocking)
- [ ] Form is fully keyboard-navigable
- [ ] Form labels correctly associated with inputs

---

## Dependencies

### Blocked By

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| EP0001: Project Setup | Epic | Done | Developer |
| EP0002: Site Content Sections | Epic | Done | Developer |

### Blocking

| Item | Type | Impact |
|------|------|--------|
| None | - | This epic has no downstream blockers |

---

## Risks & Assumptions

### Assumptions
- Formspree free tier (50 submissions/month) is sufficient for launch
- AJAX submission is supported by Formspree without CORS issues from GitHub Pages domain
- Analytics provider will be cookieless (no consent banner needed)

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Formspree CORS issues with GitHub Pages | Low | High | Test during EP0001; Formspree documents GitHub Pages support |
| Spam submissions exceed free tier | Low | Medium | Formspree includes built-in spam filtering; upgrade tier if needed |
| Analytics provider delayed indefinitely | Medium | Low | Site functions fully without analytics; integration point ready when decision made |

---

## Technical Considerations

### Architecture Impact
Contact form is a client-side Astro component with a small `<script>` for AJAX submission and validation. Analytics is a configurable script tag in the base layout, gated by environment variable.

### Integration Points
- Formspree API (form submissions)
- Analytics provider script (TBD, loaded via `PUBLIC_ANALYTICS_ID` env var)
- GSAP fade-in animation for contact section (EP0003)

---

## Sizing

**Story Points:** 5
**Estimated Story Count:** 2-3

**Complexity Factors:**
- Formspree AJAX integration (low - well-documented API)
- Client-side form validation (low)
- Analytics integration point (low - placeholder pattern)
- Success/error state UI (low)

---

## Story Breakdown

| ID | Title | Points | Status |
|----|-------|--------|--------|
| [US0012](../stories/US0012-contact-form.md) | Build Contact Form with Formspree | 3 | Done |
| [US0013](../stories/US0013-analytics-integration.md) | Implement Analytics Integration Point | 2 | Done |

**Total:** 5 points (2 stories)

---

## Test Plan

**Test Spec:** To be generated via `/sdlc-studio test-spec --epic EP0004`.

---

## Open Questions

- [ ] Has a Formspree account been created? Need the form endpoint ID. - Owner: Developer

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial epic created from PRD v1.1.0 |
