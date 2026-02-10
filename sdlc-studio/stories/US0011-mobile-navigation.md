# US0011: Implement Mobile Navigation

> **Status:** Done
> **Epic:** [EP0003: Navigation & Scroll Animations](../epics/EP0003-navigation-and-animations.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (founder browsing on my phone between meetings)
**I want** a mobile-friendly navigation menu that I can open and close easily
**So that** I can quickly navigate to any section of the site on my phone without frustration

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Often browsing on phone between meetings. Mobile traffic is expected to account for 60%+ of visits. Time-poor and will bounce quickly if the experience is poor.
[Full persona details](../personas.md#startup-sam)

### Background
The sticky desktop navigation (US0009) is not suitable for mobile viewports below 768px -- the full link list would consume too much screen space. A hamburger menu pattern provides a compact, familiar mobile navigation experience. The menu must be easy to open and close, have appropriately sized touch targets (>=44x44px per WCAG guidelines), and close automatically when a link is tapped or the user taps outside the menu. Smooth open/close animation adds polish consistent with the site's overall GSAP-animated feel.

---

## Acceptance Criteria

### AC1: Hamburger Menu Icon on Mobile
**Given** a visitor is viewing the site on a mobile viewport (<768px)
**When** the page loads
**Then** the navigation displays a hamburger menu icon (three horizontal lines) instead of the full link list, positioned in the top-right of the nav bar, with the BrightKeep logo/wordmark on the left

### AC2: Menu Expands on Tap
**Given** the hamburger icon is visible on mobile
**When** the visitor taps the hamburger icon
**Then** the navigation menu expands to reveal all section links (What We Do, How We Work, Services, Contact) with a smooth open animation, and the hamburger icon transitions to a close icon (X)

### AC3: Menu Collapses on Link Click
**Given** the mobile menu is open and expanded
**When** the visitor taps a section link (e.g., "Services")
**Then** the menu collapses with a smooth close animation and the page scrolls smoothly to the target section

### AC4: Menu Collapses on Outside Tap
**Given** the mobile menu is open and expanded
**When** the visitor taps anywhere outside the menu area
**Then** the menu collapses with a smooth close animation

### AC5: Touch Targets Meet Minimum Size
**Given** the mobile navigation menu is open
**When** the visitor views the menu links and the hamburger/close icon
**Then** all interactive elements (links and icon) have a minimum touch target size of 44x44 pixels

---

## Scope

### In Scope
- Hamburger menu icon replacing full nav links on viewports < 768px
- Hamburger-to-X icon transition on open/close
- Expandable/collapsible mobile nav menu overlay or dropdown
- Smooth open/close animation (CSS transitions or GSAP)
- Menu closes on: link tap, outside tap, close icon tap
- Touch targets >= 44x44px for all interactive elements
- Same nav links as desktop: What We Do, How We Work, Services, Contact
- BrightKeep logo/wordmark visible in mobile nav bar
- Appropriate z-index so menu appears above page content
- `prefers-reduced-motion` support (instant open/close without animation)

### Out of Scope
- Desktop navigation behaviour (US0009)
- Scroll animations (US0010)
- Navigation content changes or additional links
- Swipe gestures to open/close the menu
- Full-screen mobile menu (unless design dictates; a dropdown is sufficient)

---

## Technical Notes

- The mobile nav should be part of the same `Nav.astro` component as the desktop nav, using Tailwind responsive classes (`md:hidden`, `hidden md:flex`) to toggle between mobile hamburger and desktop link list.
- The hamburger icon can be built with three `<span>` elements styled as lines, or use an SVG icon. The open/close transition can rotate/morph the lines into an X shape.
- The menu overlay/dropdown can be a `<div>` that transitions from `max-height: 0` to `max-height: auto` (or a fixed height), or uses `transform: translateY()` for a slide-down effect.
- Use a client-side `<script>` for toggle logic. Add event listeners for: hamburger click (toggle), link clicks (close + scroll), and document click (close if outside).
- For the outside-tap close, use `document.addEventListener('click', ...)` and check if the click target is within the nav element. Add the listener when the menu opens and remove it when it closes.
- Ensure the menu toggle button has `aria-expanded="true|false"` and `aria-controls` pointing to the menu element ID. The menu should have `role="navigation"` (or be inside the existing `<nav>`).
- The mobile menu should not trap focus (it's not a modal dialog), but the close/open toggle should be keyboard-operable for accessibility.
- Touch target size: apply `min-h-[44px] min-w-[44px]` to all link items and the hamburger button. Use sufficient padding rather than just setting height/width, to maintain a natural layout.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Visitor rotates device from portrait to landscape (crossing 768px breakpoint) | Navigation switches between mobile hamburger and desktop layout correctly; if mobile menu was open, it closes |
| Visitor opens menu then resizes browser above 768px | Mobile menu closes; desktop nav links appear normally |
| Visitor taps hamburger icon very rapidly (double-tap) | Menu does not get stuck in an intermediate state; toggling is debounced or state-managed |
| Visitor uses keyboard to operate hamburger menu | Hamburger button is focusable; Enter/Space opens the menu; Escape closes it |
| Menu is open and visitor scrolls the page | Menu remains open (user can see content scrolling behind) or the menu closes on scroll -- either is acceptable as long as the experience is not jarring |
| JavaScript fails to load | Hamburger button does nothing; as a progressive enhancement, nav links could be shown in a simplified layout without JS, or the menu defaults to open |
| Visitor uses screen reader with mobile menu | `aria-expanded` attribute updates correctly; menu links are announced as navigation items |

---

## Test Scenarios

- [ ] Hamburger icon is visible and nav links are hidden on viewports < 768px
- [ ] Full nav links are visible and hamburger is hidden on viewports >= 768px
- [ ] Tapping hamburger icon opens the menu with smooth animation
- [ ] Hamburger icon transitions to X (close) icon when menu is open
- [ ] Tapping X icon closes the menu with smooth animation
- [ ] Tapping a nav link closes the menu and scrolls to the correct section
- [ ] Tapping outside the menu area closes the menu
- [ ] All touch targets (links and hamburger/close icon) are at least 44x44px
- [ ] Menu open/close animation is disabled when `prefers-reduced-motion: reduce` is set
- [ ] `aria-expanded` attribute toggles between "true" and "false" on the hamburger button
- [ ] Hamburger button is keyboard-focusable and operable via Enter and Space keys
- [ ] Rotating device from portrait to landscape transitions nav correctly

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0009 | Blocks US0011 | Desktop navigation component and nav link structure to extend for mobile | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Tailwind CSS responsive utilities | Library | Available (installed in US0001) |
| GSAP (optional, for animation) | Library | Available (installed in US0001) |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
