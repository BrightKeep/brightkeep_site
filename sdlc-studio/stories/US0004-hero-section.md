# US0004: Build Hero Section

> **Status:** Done
> **Epic:** [EP0002: Site Content Sections](../epics/EP0002-site-content-sections.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (Founder/Business Owner)
**I want** to see a confident, clear hero section that immediately communicates what BrightKeep does
**So that** I can establish within five seconds whether this company is credible and relevant to my needs before deciding to scroll further

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Finds BrightKeep through search, LinkedIn, or referral. Time-poor and will bounce quickly if the site doesn't load fast or look credible.
[Full persona details](../personas.md#startup-sam)

### Background
The hero section is the first content a visitor encounters. It must establish BrightKeep's identity and value proposition within five seconds -- the critical window before a time-poor founder like Sam decides to stay or bounce. The section uses a navy background with white text for high contrast and visual authority, a CSS-only geometric pattern or gradient to convey technical sophistication without adding page weight, and a prominent Coral Pink CTA to drive visitors toward the contact section. No images are used, keeping the hero lightweight and fast-loading. This is the primary entry point for all three personas but is designed specifically for Sam's "scan and decide" behaviour.

---

## Acceptance Criteria

### AC1: Hero section renders with correct brand colours and layout

**Given** a visitor loads the BrightKeep homepage
**When** the page finishes rendering
**Then** a full-width hero section is displayed with a navy (`#1B2A4A`) background and white (`#FFFFFF`) text, spanning the full viewport width with no horizontal gaps or margins

### AC2: Hero displays correct headline and subheadline copy

**Given** a visitor views the hero section
**When** they read the hero content
**Then** the headline reads "Digital Solutions. Decades of Delivery." as an `<h1>` element, and a subheadline paragraph communicates BrightKeep's positioning as a digital business and product development consultancy

### AC3: CTA button links to contact section

**Given** a visitor views the hero section
**When** they click the "Talk to Us" button
**Then** the page scrolls to the `#contact` section anchor, and the button is rendered in Coral Pink (`#FF6B6B`) with white text and meets the minimum 44x44px touch target on all breakpoints

### AC4: Hero background uses CSS-only visual treatment

**Given** the hero section renders on the page
**When** the visitor views the background
**Then** a subtle geometric pattern or gradient is visible behind the text content, achieved entirely with CSS (no image assets), and the visual treatment does not reduce text legibility or fail WCAG AA contrast requirements

### AC5: Hero section is responsive across all breakpoints

**Given** a visitor views the hero section on any device
**When** the viewport width is 375px, 768px, 1024px, or 1440px
**Then** the hero section renders correctly without horizontal scrolling, text remains readable with appropriate font sizes, the CTA button is fully visible and tappable, and the layout adjusts proportionally to the viewport width

---

## Scope

### In Scope
- Full-width hero section Astro component (`Hero.astro`)
- Navy (`#1B2A4A`) background with CSS-only geometric pattern or gradient
- Headline (`<h1>`): "Digital Solutions. Decades of Delivery."
- Subheadline paragraph communicating company positioning
- "Talk to Us" CTA button in Coral Pink (`#FF6B6B`) linking to `#contact`
- Responsive layout across 375px, 768px, 1024px, 1440px breakpoints
- Semantic HTML (`<section>`, `<h1>`, `<p>`, `<a>`)
- Section `id="hero"` for navigation anchoring
- Animation-ready `data-*` attributes for future GSAP integration (EP0003)
- Minimum 44x44px touch target for CTA on mobile

### Out of Scope
- GSAP scroll animations and entrance effects (EP0003)
- Smooth scroll behaviour on CTA click (EP0003 -- navigation handles this)
- Hero images or illustrations (not required per PRD)
- A/B testing of headline copy
- Analytics event tracking on CTA click (EP0005)

---

## Technical Notes

### Astro Component
Create `src/components/Hero.astro` as a self-contained section component. The component receives no props in v1 (all copy is static). Structure:

```astro
<section id="hero" class="..." data-animate="hero">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1>...</h1>
    <p>...</p>
    <a href="#contact" class="...">Talk to Us</a>
  </div>
</section>
```

### Tailwind Approach
- Background: `bg-navy` (custom design token from `tailwind.config.mjs`) or `bg-[#1B2A4A]`
- Text: `text-white`
- CTA: `bg-coral-pink` / `bg-[#FF6B6B]` with `text-white`, `hover:bg-[#FF5252]` or similar darker shade, `focus-visible:outline` for keyboard focus
- Responsive typography: `text-3xl md:text-4xl lg:text-5xl xl:text-6xl` for headline
- Vertical padding: `py-20 md:py-28 lg:py-32` (generous whitespace for authority)
- CSS geometric pattern: use `::before` or `::after` pseudo-element with Tailwind `@apply` or inline `background-image` using CSS gradients (`radial-gradient`, `linear-gradient`, or `repeating-linear-gradient`)

### Semantic HTML
- `<section id="hero" aria-labelledby="hero-heading">`
- `<h1 id="hero-heading">` -- the only `<h1>` on the page
- `<p>` for subheadline
- `<a href="#contact" role="link">` for CTA (anchor link, not button, since it navigates)

### CSS-Only Background Pattern
Use layered CSS gradients for the geometric effect. Example approach:
```css
background:
  radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.08) 0%, transparent 50%),
  radial-gradient(circle at 80% 20%, rgba(58, 107, 159, 0.1) 0%, transparent 50%),
  #1B2A4A;
```
This keeps the hero under the 500KB page weight budget and avoids additional HTTP requests.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Very narrow viewport (< 375px, e.g. 320px) | Hero content remains readable, no horizontal overflow; text wraps gracefully; CTA button stays within viewport bounds |
| Very wide viewport (> 1440px, e.g. 2560px ultrawide) | Content remains centred within `max-w-7xl` container; navy background extends full-width; no content stretching |
| User has JavaScript disabled | Hero renders identically (no JS dependency); CTA anchor link works natively; only future GSAP animations are absent |
| User enables `prefers-reduced-motion: reduce` | No impact on hero in this story (animations are EP0003); CSS transitions on CTA hover should respect this preference |
| Browser does not support CSS gradients (very old browser) | Falls back to solid navy (`#1B2A4A`) background; all text remains legible |
| User zooms to 200% or greater | Layout does not break; text reflows correctly; CTA remains accessible and tappable |
| Screen reader navigates to hero | `<h1>` is announced as the page heading; section is identifiable via `aria-labelledby`; CTA link text "Talk to Us" is descriptive |
| Long subheadline text (future copy change) | Subheadline wraps gracefully within the container without overlapping the CTA or breaking layout |
| Right-to-left (RTL) language override | Layout mirrors correctly if `dir="rtl"` is applied (future-proofing, not required for v1 but layout should not break) |

---

## Test Scenarios

- [ ] **TS1:** Hero section renders full-width with navy (`#1B2A4A`) background colour at desktop (1024px) viewport
- [ ] **TS2:** Headline text reads exactly "Digital Solutions. Decades of Delivery." and is rendered as an `<h1>` element
- [ ] **TS3:** Subheadline paragraph is present below the headline and communicates BrightKeep's positioning
- [ ] **TS4:** "Talk to Us" CTA button is displayed in Coral Pink (`#FF6B6B`) with white text and has an `href` attribute pointing to `#contact`
- [ ] **TS5:** CTA button meets minimum 44x44px touch target size at 375px mobile viewport
- [ ] **TS6:** Hero section displays correctly at 375px viewport width with no horizontal scrolling
- [ ] **TS7:** Hero section displays correctly at 768px viewport width with appropriate typography scaling
- [ ] **TS8:** Hero section displays correctly at 1440px viewport width with content centred and constrained
- [ ] **TS9:** CSS-only background pattern or gradient is visible and does not use any `<img>` tags or external image assets
- [ ] **TS10:** Colour contrast between white text and navy background meets WCAG AA ratio (minimum 4.5:1 for normal text, 3:1 for large text)
- [ ] **TS11:** Colour contrast between white text on Coral Pink CTA button meets WCAG AA ratio
- [ ] **TS12:** HTML structure uses semantic elements: `<section>` wrapper with `id="hero"`, `<h1>` for headline, `<p>` for subheadline, `<a>` for CTA
- [ ] **TS13:** Hero section renders correctly with JavaScript disabled (no dependencies on client-side JS)
- [ ] **TS14:** Hero is the only section on the page containing an `<h1>` element (single `<h1>` per page rule)
- [ ] **TS15:** Section includes `data-animate` attribute for future GSAP integration readiness

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project initialised with base layout and page structure | Draft |
| US0002 | Blocks | Tailwind CSS configured with BrightKeep design tokens (colours, fonts, spacing) | Draft |

### External Dependencies

| Dependency | Type | What's Needed | Status |
|------------|------|---------------|--------|
| Google Fonts | Runtime | Inter font family loaded for headline and body text | Not Started |
| Approved copy | Content | Final subheadline copy confirmed (headline is confirmed) | Confirmed |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

**Rationale:** Single static section with no interactivity, no data fetching, and no complex state. The CSS geometric pattern adds minor complexity but is well-understood. Responsive layout is straightforward with Tailwind utility classes.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
