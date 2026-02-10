# US0009: Implement Sticky Navigation with Smooth Scrolling

> **Status:** Done
> **Epic:** [EP0003: Navigation & Scroll Animations](../epics/EP0003-navigation-and-animations.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (time-poor founder browsing between meetings)
**I want** a sticky navigation bar with smooth scrolling anchor links
**So that** I can quickly jump to any section of the site without losing my place or wasting time scrolling manually

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Makes buying decisions quickly when trust is established. Often browsing on phone between meetings and will bounce if the site doesn't load fast or look credible.
[Full persona details](../personas.md#startup-sam)

### Background
The BrightKeep site is a single-page marketing website with five distinct content sections (Hero, What We Do, How We Work, Services, Contact) plus a footer. Visitors need a persistent way to orient themselves and jump between sections. The navigation must remain visible while scrolling on desktop, use GSAP-powered smooth scrolling for a polished feel, and highlight the currently active section using ScrollTrigger. This is the desktop navigation implementation; mobile navigation is handled separately in US0011.

---

## Acceptance Criteria

### AC1: Sticky Navigation on Desktop
**Given** a visitor is viewing the site on a desktop viewport (>=768px)
**When** they scroll down the page past the initial viewport
**Then** the navigation bar remains fixed at the top of the viewport, visible at all times, without obscuring underlying content (content has appropriate top padding/margin to account for nav height)

### AC2: Navigation Links Present
**Given** the navigation bar is rendered
**When** a visitor views the navigation
**Then** they see links for "What We Do", "How We Work", "Services", and "Contact", plus the BrightKeep logo/name linking to the top of the page

### AC3: GSAP-Powered Smooth Scrolling
**Given** a visitor clicks a navigation anchor link (e.g., "Services")
**When** the click event fires
**Then** the page scrolls smoothly to the target section using GSAP's scrollTo with appropriate easing (not native CSS smooth scroll), and the scroll position accounts for the sticky nav height offset

### AC4: Active Section Highlighting via ScrollTrigger
**Given** a visitor is scrolling through the page
**When** a content section enters the dominant viewport area
**Then** the corresponding navigation link is visually highlighted (e.g., colour change to Coral Pink `#FF6B6B` or underline indicator) and the previously active link returns to its default state

### AC5: Navigation Does Not Obscure Content
**Given** the sticky navigation is fixed at the top of the viewport
**When** a visitor scrolls to any section or clicks a nav link to jump to a section
**Then** no content is hidden behind the navigation bar; all section headings and content are fully visible below the nav

---

## Scope

### In Scope
- Sticky (fixed-position) navigation bar component for desktop viewports
- BrightKeep logo/wordmark in the nav linking to page top
- Four anchor links: What We Do, How We Work, Services, Contact
- GSAP `scrollTo` plugin for smooth scroll on nav link clicks
- GSAP ScrollTrigger for active section detection and nav highlight
- Appropriate z-index to layer nav above content
- Content offset (padding/margin) to prevent content hiding behind nav
- Navy (`#1B2A4A`) background with white text for the nav bar
- Coral Pink (`#FF6B6B`) or visible indicator for active state
- Tailwind CSS for nav styling

### Out of Scope
- Mobile navigation / hamburger menu (US0011)
- Scroll animations on content sections (US0010)
- Navigation content or copy changes
- Footer navigation links
- "Talk to Us" CTA button in the nav (not specified in requirements)

---

## Technical Notes

- The navigation should be an Astro component (e.g., `Nav.astro`) placed in the base layout above the `<main>` content.
- Use semantic `<nav>` element with `<ul>/<li>/<a>` for the link list.
- GSAP `scrollTo` plugin must be registered alongside ScrollTrigger. Import only what is needed to keep the bundle under the 50KB gzipped limit.
- ScrollTrigger instances should be created for each content section to detect when it enters the viewport center. Use `onToggle` or `onEnter/onLeave` callbacks to update the active nav state.
- Use `will-change: transform` sparingly; the nav is fixed-position so it doesn't need GPU compositing hints.
- The nav height should be defined as a CSS custom property or Tailwind config value so that section scroll offsets and content padding can reference it consistently.
- Section IDs must match the anchor hrefs (e.g., `#what-we-do`, `#how-we-work`, `#services`, `#contact`). These IDs are established in EP0002 content section stories (US0004-US0008).
- `prefers-reduced-motion` should disable GSAP smooth scroll (use instant jump instead) but the nav itself remains sticky. Full motion-reduction logic is in US0010.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Visitor resizes browser from desktop to mobile width | Navigation should hide or adapt gracefully; mobile nav (US0011) takes over below 768px |
| Section ID is missing or mismatched | Nav link click should not cause a JavaScript error; fail silently or scroll to top |
| Visitor uses keyboard Tab to navigate links | All nav links are focusable and operable via Enter key; visible focus indicator present |
| Visitor clicks active nav link (already at that section) | No jarring scroll; either no-op or smooth micro-scroll to exact position |
| Page loads with a hash in the URL (e.g., `#services`) | Page scrolls to the correct section on load with nav offset accounted for, and that nav link is highlighted |
| Very fast scrolling (flick/momentum) | Active section highlight updates correctly without flicker or rapid toggling |
| Browser back/forward after nav click | Browser history is not polluted with hash changes on every click, or if hashes are used, back button behaviour is sensible |

---

## Test Scenarios

- [ ] Navigation bar is visible and fixed at top when scrolling on desktop (>=768px viewport)
- [ ] All four section links (What We Do, How We Work, Services, Contact) are present and visible
- [ ] Clicking "What We Do" smoothly scrolls to the What We Do section with GSAP easing
- [ ] Clicking "Services" smoothly scrolls to the Services section, with content visible below nav (not hidden)
- [ ] Scrolling manually through each section updates the active nav highlight to the correct link
- [ ] Active nav highlight uses the correct visual indicator (Coral Pink or underline)
- [ ] Only one nav link is highlighted as active at any time
- [ ] Logo/wordmark click scrolls back to the top of the page
- [ ] Page loaded with `#contact` hash scrolls to contact section and highlights Contact nav link
- [ ] Navigation does not obscure any section heading when scrolled to via nav click
- [ ] All nav links are keyboard-focusable with visible focus indicators
- [ ] `prefers-reduced-motion: reduce` disables smooth scroll animation (instant jump)

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0004 | Blocks US0009 | Hero section with `id` attribute for scroll target | Draft |
| US0005 | Blocks US0009 | What We Do section with `id="what-we-do"` | Draft |
| US0006 | Blocks US0009 | How We Work section with `id="how-we-work"` | Draft |
| US0007 | Blocks US0009 | Services section with `id="services"` | Draft |
| US0008 | Blocks US0009 | Contact section with `id="contact"` and Footer | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| GSAP + ScrollTrigger + scrollTo plugin (npm) | Library | Available (installed in US0001) |
| Tailwind CSS | Library | Available (installed in US0001) |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
