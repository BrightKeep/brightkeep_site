# EP0003: Navigation & Scroll Animations

> **Status:** Done
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10
> **Target Release:** v1.0

## Summary

Implement the sticky navigation with smooth scrolling and the GSAP ScrollTrigger-powered scroll animations that give the site its professional, polished feel. This epic transforms the static content sections (EP0002) into an engaging, interactive experience with entrance animations, staggered reveals, and smooth transitions.

## Inherited Constraints

> See PRD and TRD for full constraint details. Key constraints for this epic:

| Source | Type | Constraint | Impact |
|--------|------|------------|--------|
| PRD | Performance | GSAP bundle < 50KB gzipped | Tree-shake, import only ScrollTrigger |
| PRD | Performance | Lighthouse > 90, no render-blocking JS | Load GSAP async, init after DOM ready |
| PRD | Accessibility | Respect `prefers-reduced-motion` | Disable all animations when motion reduced |
| PRD | Performance | CLS = 0 from animations | Elements pre-sized, no layout shifts |

---

## Business Context

### Problem Statement
A static page with no animations or interactive navigation feels like a basic template, not a professional consultancy website. Visitors (especially Enterprise Erin evaluating vendors) will judge credibility by the polish and professionalism of the experience.

**PRD Reference:** [F011: Navigation](../prd.md#3-feature-inventory), [F012: Scroll Animations](../prd.md#3-feature-inventory)

### Value Proposition
Transforms BrightKeep from "a website" to "a professional digital presence." Scroll animations create engagement and guide the visitor's attention. Sticky navigation with active section highlighting helps visitors orient themselves and jump to relevant sections.

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Scroll depth | N/A | 70%+ average | Analytics (when configured) |
| Animation smoothness | N/A | 60fps consistently | Chrome DevTools performance audit |
| Navigation usability | N/A | All sections reachable in 1 click | Manual test |

---

## Scope

### In Scope
- F011: Sticky navigation bar with smooth scroll anchor links
- F011: Active section highlighting (ScrollTrigger-driven)
- F011: Mobile hamburger menu or collapsible navigation
- F012: Hero entrance animation (staggered fade-up on headline, subheadline, CTA)
- F012: Service cards staggered reveal on scroll
- F012: Methodology tiles sequential fade-in
- F012: Services accordion smooth open/close transitions
- F012: Contact section fade-in on scroll
- F012: `prefers-reduced-motion` support (disable all animations)
- F012: No cumulative layout shift from animations

### Out of Scope
- Content section HTML/CSS (EP0002 - already built)
- Contact form functionality (EP0004)
- SEO and accessibility audit (EP0005 - but a11y for nav is in scope)

### Affected Personas
- **Startup Sam:** Smooth animations create trust; quick navigation helps time-poor visitors find what they need
- **Leader Lee:** Professional polish signals engineering credibility; active nav helps during detailed reading
- **Enterprise Erin:** Polished experience passes the "would I share this with my CEO" test

---

## Acceptance Criteria (Epic Level)

- [ ] Sticky navigation visible on desktop while scrolling
- [ ] Navigation links smooth-scroll to correct sections with GSAP easing
- [ ] Active section highlighted in navigation as user scrolls
- [ ] Mobile navigation collapses into hamburger or similar pattern
- [ ] Hero elements animate in with staggered fade-up on page load
- [ ] Service cards reveal with staggered animation on scroll
- [ ] Methodology tiles animate in sequentially on scroll
- [ ] Services accordion transitions are smooth (GSAP-powered)
- [ ] Contact section fades in on scroll
- [ ] All animations disabled when `prefers-reduced-motion: reduce` is set
- [ ] No cumulative layout shift (CLS = 0) from any animation
- [ ] GSAP total bundle size < 50KB gzipped
- [ ] Animations run at 60fps on mid-range mobile devices
- [ ] Navigation does not obscure content on any breakpoint

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
| EP0005: Quality & Compliance | Epic | Accessibility audit includes navigation keyboard support |

---

## Risks & Assumptions

### Assumptions
- GSAP ScrollTrigger is performant enough for mid-range mobile devices
- Content section elements have predictable heights (no layout shift during animation)
- Astro's island architecture allows GSAP to run as a client-side script without hydration issues

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Animations cause jank on low-end devices | Medium | Medium | Test on throttled CPU; use `will-change` and `transform` only; provide `prefers-reduced-motion` fallback |
| GSAP ScrollTrigger conflicts with native smooth scroll | Low | Low | Use GSAP for all scroll behaviour; disable native `scroll-behavior: smooth` |
| Navigation z-index conflicts with content | Low | Low | Establish z-index scale in Tailwind config |

---

## Technical Considerations

### Architecture Impact
GSAP initialisation runs as a client-side `<script>` in Astro (no framework island needed). ScrollTrigger instances are created after DOM ready. Navigation component manages its own state for mobile toggle and active section tracking.

### Integration Points
- Section IDs from EP0002 content sections (scroll targets)
- GSAP + ScrollTrigger installed via EP0001
- Tailwind transition utilities for non-scroll animations (hover states)

---

## Sizing

**Story Points:** 8
**Estimated Story Count:** 3-4

**Complexity Factors:**
- GSAP ScrollTrigger setup and configuration (moderate)
- Multiple animation patterns across sections (moderate)
- Mobile navigation toggle logic (low)
- `prefers-reduced-motion` integration (low)
- Active section detection via ScrollTrigger (moderate)

---

## Story Breakdown

| ID | Title | Points | Status |
|----|-------|--------|--------|
| [US0009](../stories/US0009-sticky-navigation.md) | Implement Sticky Navigation | 3 | Done |
| [US0010](../stories/US0010-scroll-animations.md) | Implement Scroll Animations | 5 | Done |
| [US0011](../stories/US0011-mobile-navigation.md) | Implement Mobile Navigation | 2 | Done |

**Total:** 10 points (3 stories)

---

## Test Plan

**Test Spec:** To be generated via `/sdlc-studio test-spec --epic EP0003`.

---

## Open Questions

None - animation approach (GSAP ScrollTrigger) confirmed in PRD v1.1.0.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial epic created from PRD v1.1.0 |
