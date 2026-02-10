# US0017: Responsive Design Audit and Final Polish

> **Status:** Done
> **Epic:** [EP0005: Quality, SEO & Compliance](../epics/EP0005-quality-seo-and-compliance.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (founder who browses on my phone 60%+ of the time)
**I want** the BrightKeep site to look and work flawlessly on my phone, tablet, and desktop
**So that** I have a smooth experience regardless of which device I'm using and I don't bounce due to broken layouts or slow loading

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Often browsing on phone between meetings. Mobile traffic is expected to account for 60%+ of visits. Time-poor and will bounce quickly if the site doesn't load fast or look credible.
[Full persona details](../personas.md#startup-sam)

### Background
This story is the final responsive design and performance hardening pass before launch. While individual content stories (US0004-US0008) and navigation stories (US0009-US0011) include basic responsive considerations, this audit takes a holistic view across the entire site at all four target breakpoints (375px mobile, 768px tablet, 1024px desktop, 1440px wide). It verifies that no horizontal scrolling occurs, touch targets meet minimum sizes, typography scales appropriately, cards stack correctly, and the overall visual presentation is polished. Additionally, this story covers the final Lighthouse audit targeting >90 across all four categories (Performance, Accessibility, Best Practices, SEO) and performance optimisation tasks such as image format optimisation, font loading strategy, and script loading order.

---

## Acceptance Criteria

### AC1: Visual Audit Across All Breakpoints
**Given** the complete BrightKeep site is rendered
**When** viewed at each of the four target breakpoints (375px, 768px, 1024px, 1440px)
**Then** all sections (Hero, What We Do, How We Work, Services, Contact, Footer) display correctly with appropriate layout, spacing, and visual hierarchy at each breakpoint, with no overlapping elements or visual glitches

### AC2: No Horizontal Scrolling
**Given** the site is viewed at any viewport width from 320px to 1920px
**When** the visitor views any section
**Then** there is no horizontal scrollbar and no content extends beyond the viewport width, at any breakpoint

### AC3: Touch Targets on Mobile
**Given** the site is viewed on a mobile device or at a mobile viewport width (<768px)
**When** a visitor interacts with any tappable element (nav links, accordion toggles, form fields, submit button, footer links)
**Then** all touch targets have a minimum size of 44x44 pixels (per WCAG 2.5.5 and Apple HIG guidelines)

### AC4: Typography Scales Appropriately
**Given** the site is viewed at different breakpoints
**When** text content is displayed
**Then** headings (`<h1>` through `<h3>`), body text, and UI text scale appropriately for each breakpoint: text is legible on mobile without zooming, and headings do not dominate the viewport on small screens or appear undersized on large screens

### AC5: Cards Stack Correctly on Mobile
**Given** the site is viewed on a mobile viewport (<768px)
**When** the visitor scrolls to the "What We Do" service cards or "How We Work" methodology tiles
**Then** cards stack vertically in a single column with consistent spacing, maintaining readability and visual hierarchy

### AC6: Lighthouse Scores Above 90
**Given** the final site is deployed (or tested via local build)
**When** a Lighthouse audit is run in a clean environment (incognito, no extensions)
**Then** all four Lighthouse scores are above 90: Performance, Accessibility, Best Practices, and SEO

### AC7: Final Performance Optimisation
**Given** the site is built for production
**When** the build output is analysed
**Then** images use modern formats (WebP/AVIF with fallbacks) if any are present, fonts load with `font-display: swap` to prevent invisible text, all scripts are loaded async or deferred, and total page weight is under 500KB (excluding fonts)

---

## Scope

### In Scope
- Visual audit of all sections at 375px, 768px, 1024px, and 1440px breakpoints
- Verification of no horizontal scrolling at any width
- Touch target size validation (>=44x44px) for all interactive mobile elements
- Typography scale review and adjustment across breakpoints
- Card and grid layout stacking verification on mobile
- Lighthouse audit across all four categories (target >90 each)
- Performance optimisation:
  - Image format optimisation (WebP/AVIF if images are present)
  - Font loading strategy (`font-display: swap`, preload critical fonts)
  - Script loading order (async/defer on all non-critical scripts)
  - CSS optimisation (Tailwind purge verification)
- Total page weight validation (<500KB excluding fonts)
- Fix any responsive bugs found during audit

### Out of Scope
- Content changes (copy, headlines, descriptions)
- New feature implementation
- Accessibility audit (US0015 -- separate story)
- Animation performance tuning (covered in US0010)
- Cross-browser testing beyond Chrome/Safari (could be a follow-up)
- Real device testing lab (use Chrome DevTools device emulation)

---

## Technical Notes

- Use Chrome DevTools responsive mode to test at the four exact breakpoints: 375px (iPhone SE), 768px (iPad), 1024px (iPad landscape / small desktop), 1440px (standard desktop).
- Also spot-check at 320px (smallest supported) and 1920px (full HD) to ensure no edge cases.
- Horizontal scroll detection: use the browser's horizontal scrollbar visibility, or programmatically check `document.documentElement.scrollWidth > document.documentElement.clientWidth` at each breakpoint.
- Touch target audit: use Chrome DevTools to inspect element dimensions. Apply `min-h-[44px] min-w-[44px]` via Tailwind where needed. Pay special attention to: accordion toggle buttons, nav links in mobile menu, form inputs, footer links.
- Typography scaling: review the Tailwind config for responsive font sizes. Consider using Tailwind's `text-2xl md:text-4xl lg:text-5xl` pattern for headings. Body text should be 16px minimum on mobile.
- Lighthouse audit: run via Chrome DevTools > Lighthouse tab, or via `npx lighthouse <url>` CLI. Use incognito mode with no extensions for consistent results. Run multiple times and take the median score.
- Performance optimisation checklist:
  - Verify Tailwind CSS purge is working (check build CSS file size; should be small)
  - Check font loading: Google Fonts should use `<link rel="preconnect">` and `font-display: swap`
  - GSAP should be loaded with `<script defer>` or dynamically after DOM ready
  - Check for any unused JavaScript in the build output
  - If images are present, use `<picture>` with WebP source and fallback
- Use `npx astro build` and inspect the `dist/` output to verify file sizes and asset optimisation.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Viewport width between breakpoints (e.g., 500px) | Layout gracefully adapts; no sudden breaks between defined breakpoints |
| Very narrow viewport (320px, e.g., iPhone 5) | Content is still usable; text may wrap more but remains readable; no overflow |
| Very wide viewport (2560px, e.g., ultra-wide monitor) | Content is centred with a max-width container; no stretched layouts |
| Slow 3G network connection | Site is usable within 5 seconds; fonts swap to fallback immediately; GSAP loads asynchronously without blocking |
| Device pixel ratio of 2x or 3x (Retina) | Text renders sharply; if images are present, they use appropriate resolution |
| Landscape orientation on mobile | Layout adjusts; no horizontal scrolling; navigation remains usable |
| User zooms to 200% in browser | Content reflows correctly; no clipping or overlapping; WCAG 1.4.4 compliant |

---

## Test Scenarios

- [ ] Hero section renders correctly at 375px (text is legible, CTA is tappable)
- [ ] Hero section renders correctly at 768px (appropriate layout transition)
- [ ] Hero section renders correctly at 1024px and 1440px (full desktop layout)
- [ ] What We Do cards stack vertically at 375px and display side-by-side at 1024px+
- [ ] How We Work tiles stack on mobile and display as 3-column grid on desktop
- [ ] Services accordion is usable on mobile with adequate touch targets
- [ ] Contact form fields are full-width on mobile and appropriately sized on desktop
- [ ] Footer layout is readable and links are tappable on mobile
- [ ] No horizontal scrollbar appears at any of the four target breakpoints
- [ ] No horizontal scrollbar appears at 320px (smallest supported width)
- [ ] All touch targets on mobile are >= 44x44px (spot check nav, form, accordion, footer links)
- [ ] Heading text sizes scale down appropriately on mobile (no oversized headings)
- [ ] Body text is at least 16px on mobile devices
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90
- [ ] Total page weight < 500KB (excluding fonts), verified from build output
- [ ] Fonts load with `font-display: swap` (no invisible text flash)
- [ ] All scripts load with `async` or `defer` (no render-blocking JS)

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0004 | Blocks US0017 | Hero section fully implemented | Draft |
| US0005 | Blocks US0017 | What We Do section fully implemented | Draft |
| US0006 | Blocks US0017 | How We Work section fully implemented | Draft |
| US0007 | Blocks US0017 | Services section fully implemented | Draft |
| US0008 | Blocks US0017 | Contact section and Footer fully implemented | Draft |
| US0009 | Blocks US0017 | Sticky navigation implemented | Draft |
| US0010 | Blocks US0017 | Scroll animations implemented | Draft |
| US0011 | Blocks US0017 | Mobile navigation implemented | Draft |
| US0012 | Blocks US0017 | Contact form implemented | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Chrome DevTools (responsive mode, Lighthouse) | Tool | Available |
| WebPageTest or similar (optional, for real-world performance testing) | Tool | Available |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
