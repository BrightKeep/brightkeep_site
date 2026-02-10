# US0010: Implement GSAP Scroll Animations

> **Status:** Done
> **Epic:** [EP0003: Navigation & Scroll Animations](../epics/EP0003-navigation-and-animations.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As an** Enterprise Erin (Digital Transformation Lead evaluating vendors)
**I want** polished, professional scroll-triggered animations across the site
**So that** the site feels credible and modern enough that I would confidently share the URL with my CEO and procurement team

## Context

### Persona Reference
**Enterprise Erin** - Digital Transformation Lead / Head of Technology / Procurement Manager, Advanced technical proficiency. Works at a large enterprise (500+ employees) and evaluates potential partners through a formal process. A polished web presence is a prerequisite for passing internal due diligence.
[Full persona details](../personas.md#enterprise-erin)

### Background
Static content without animation looks like a basic template. GSAP ScrollTrigger-powered animations transform the BrightKeep site into a professional digital presence that signals engineering credibility. Each content section has a specific animation pattern: the hero uses a staggered fade-up entrance, service cards reveal with a stagger on scroll, methodology tiles fade in sequentially, the services accordion has smooth expand/collapse transitions, and the contact section fades in as it enters the viewport. All animations must respect `prefers-reduced-motion`, cause zero cumulative layout shift (CLS), maintain 60fps on mid-range mobile devices, and keep the total GSAP bundle under 50KB gzipped.

---

## Acceptance Criteria

### AC1: Hero Entrance Animation
**Given** a visitor loads the page
**When** the hero section is rendered and visible
**Then** the headline, subheadline, and CTA button animate in with a staggered fade-up effect (elements appear sequentially with upward motion and opacity transition), completing within 1-1.5 seconds of page load

### AC2: Service Cards Staggered Reveal
**Given** a visitor scrolls down to the "What We Do" section
**When** the service cards enter the viewport
**Then** the two service cards animate in with a staggered reveal (fade-up or slide-in with a delay between cards), triggered by ScrollTrigger when the section crosses the viewport threshold

### AC3: Methodology Tiles Sequential Fade-In
**Given** a visitor scrolls to the "How We Work" section
**When** the six methodology tiles enter the viewport
**Then** the tiles animate in sequentially (one after another with a consistent stagger delay), creating a cascading reveal effect from first to last tile

### AC4: Services Accordion Smooth Transitions
**Given** a visitor interacts with the services accordion (expand/collapse)
**When** an accordion item is opened or closed
**Then** the content expands or collapses with a smooth GSAP-powered height transition (not a CSS-only transition), with no visible jump or layout shift

### AC5: Contact Section Fade-In
**Given** a visitor scrolls to the "Let's Talk" contact section
**When** the section enters the viewport
**Then** the contact section content (heading, body text, form) fades in with an upward motion animation triggered by ScrollTrigger

### AC6: Prefers-Reduced-Motion Respected
**Given** a visitor has `prefers-reduced-motion: reduce` set in their operating system or browser
**When** the page loads and they scroll through the site
**Then** all GSAP animations are completely disabled; elements appear in their final positions immediately with no motion or opacity transitions

### AC7: Zero Cumulative Layout Shift
**Given** any animation plays on scroll or page load
**When** elements animate into their positions
**Then** there is zero cumulative layout shift (CLS = 0); animated elements have their space reserved in the layout before animation begins (via pre-set dimensions or CSS containment)

---

## Scope

### In Scope
- Hero section staggered fade-up animation (headline, subheadline, CTA)
- Service cards (What We Do) staggered scroll reveal
- Methodology tiles (How We Work) sequential fade-in on scroll
- Services accordion smooth GSAP expand/collapse transitions
- Contact section fade-in on scroll
- ScrollTrigger configuration for all scroll-based animations
- `prefers-reduced-motion` media query detection and animation disable
- Pre-sizing of animated elements to prevent CLS
- Performance optimisation for 60fps on mid-range mobile

### Out of Scope
- Navigation smooth scroll (US0009)
- Mobile navigation animations (US0011)
- Content section HTML/CSS markup (EP0002)
- Footer animations (none specified)
- Parallax or background effects (not in PRD)
- Loading/skeleton screen animations

---

## Technical Notes

- All animations should be initialised in a single client-side `<script>` that runs after DOM ready. Astro does not require framework islands for this; a vanilla JS script is sufficient.
- Use GSAP `gsap.from()` or `gsap.fromTo()` with ScrollTrigger for scroll-based reveals. Use `gsap.timeline()` for the hero entrance sequence.
- ScrollTrigger `start` and `end` values should be tuned so animations trigger when content is naturally entering the viewport (e.g., `"top 80%"` for start).
- For `prefers-reduced-motion`, check `window.matchMedia('(prefers-reduced-motion: reduce)')` before initialising animations. If matched, skip all GSAP animation setup and ensure elements are in their final visible state (opacity: 1, transform: none).
- To prevent CLS, animated elements should NOT start with `opacity: 0` or `transform: translateY()` in CSS. Instead, set initial states via GSAP's `set()` method after confirming motion is allowed, so that if JS fails to load, content is still visible.
- For the accordion, use `gsap.to()` animating `height` from 0 to `auto` (via GSAP's `"auto"` height support) or measure the content height dynamically.
- GSAP tree-shaking: import only `gsap`, `ScrollTrigger`, and potentially `ScrollToPlugin` (shared with US0009). Do not import the full GSAP bundle. Verify total gzipped size < 50KB.
- Test performance using Chrome DevTools Performance panel with CPU throttling (4x slowdown) to simulate mid-range mobile devices. Animations should maintain 60fps under throttling.
- Use `will-change: transform, opacity` on animated elements sparingly; remove after animation completes to free GPU memory.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| GSAP fails to load (CDN error or JS blocked) | Content is fully visible in its final state; no content is hidden due to pre-animation opacity:0 |
| Visitor scrolls extremely fast past multiple sections | Animations complete instantly for passed sections; no queued animation backlog |
| Visitor scrolls back up after animations have played | Animations do not replay (trigger once); elements remain in their final animated state |
| Browser window is resized during animation | ScrollTrigger recalculates positions; no broken layouts or orphaned animations |
| Page loads with scroll position mid-page (e.g., back button) | Sections above the viewport are in their final state; sections below animate normally on scroll |
| Very slow network delays GSAP script loading | Content is visible without animations; GSAP enhances progressively when loaded |
| Accordion opened and closed rapidly in succession | Animations do not stack or conflict; current animation is killed before new one starts |

---

## Test Scenarios

- [ ] Hero headline, subheadline, and CTA animate in with staggered fade-up on page load
- [ ] Service cards animate in with staggered reveal when scrolling to "What We Do"
- [ ] All six methodology tiles animate sequentially when scrolling to "How We Work"
- [ ] Services accordion items expand with smooth GSAP height animation
- [ ] Services accordion items collapse with smooth GSAP height animation
- [ ] Contact section fades in when scrolling to "Let's Talk"
- [ ] With `prefers-reduced-motion: reduce` enabled, all elements appear immediately with no animation
- [ ] No cumulative layout shift measured (CLS = 0) during any animation sequence
- [ ] Animations run at 60fps on a mid-range mobile device (or CPU-throttled desktop)
- [ ] Total GSAP bundle size is under 50KB gzipped (verified via build output)
- [ ] If GSAP fails to load, all content remains visible and usable
- [ ] Scrolling back up does not replay completed scroll-triggered animations

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks US0010 | GSAP + ScrollTrigger installed and configured in Astro project | Draft |
| US0004 | Blocks US0010 | Hero section HTML/CSS with animatable elements (headline, subheadline, CTA) | Draft |
| US0005 | Blocks US0010 | What We Do section with service card elements | Draft |
| US0006 | Blocks US0010 | How We Work section with methodology tile elements | Draft |
| US0007 | Blocks US0010 | Services section with accordion elements | Draft |
| US0008 | Blocks US0010 | Contact section with form and content elements | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| GSAP + ScrollTrigger (npm) | Library | Available (installed in US0001) |
| Mid-range mobile device or CPU throttling for testing | Testing | Available |

---

## Estimation

**Story Points:** 5
**Complexity:** High

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
