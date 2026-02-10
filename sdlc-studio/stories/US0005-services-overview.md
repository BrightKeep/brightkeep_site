# US0005: Build Services Overview Section (What We Do)

> **Status:** Done
> **Epic:** [EP0002: Site Content Sections](../epics/EP0002-site-content-sections.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (Founder/Business Owner)
**I want** to see a clear overview of BrightKeep's two service pillars -- product development and delivery consulting -- in a scannable card layout
**So that** I can identify within 30 seconds which offering is relevant to my needs and decide whether to continue engaging with the site

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Needs clear understanding of what services are on offer within seconds. Frustrated by websites full of jargon and no clear services list.
[Full persona details](../personas.md#startup-sam)

### Background
The "What We Do" section is the second major content block visitors encounter after the hero. It distils BrightKeep's offerings into two distinct service pillars: Digital Product Development (build) and Digital Delivery Consulting (improve). For Sam, this section must answer the question "Do they do what I need?" within 30 seconds of scrolling. The two-column card layout on desktop gives each pillar equal visual weight, preventing a hierarchy that might cause visitors to miss the consulting offering. On mobile, cards stack vertically. Each card includes an icon, heading, summary paragraph, and four bullet points for scannability. The off-white background provides visual separation from the navy hero section above.

---

## Acceptance Criteria

### AC1: Section displays with correct heading and background

**Given** a visitor scrolls past the hero section
**When** the "What We Do" section enters the viewport
**Then** the section is displayed with an off-white (`#F8F9FA`) background, a section heading "What We Do" rendered as an `<h2>` element, and the section has `id="what-we-do"` for navigation anchoring

### AC2: Two service cards display with correct content

**Given** a visitor views the "What We Do" section
**When** they read the card content
**Then** two cards are displayed: Card 1 titled "Digital Product Development" and Card 2 titled "Digital Delivery Consulting", each containing an icon, a heading (`<h3>`), a summary paragraph, and exactly four bullet points describing the service pillar

### AC3: Cards display side-by-side on desktop, stacked on mobile

**Given** a visitor views the "What We Do" section
**When** the viewport is 1024px or wider (desktop/wide)
**Then** the two cards are displayed side-by-side in a two-column layout with equal width and visual weight
**And when** the viewport is narrower than 1024px (mobile/tablet)
**Then** the cards stack vertically with the "Digital Product Development" card appearing first

### AC4: Cards have equal visual weight

**Given** a visitor views both service cards on desktop
**When** they compare the two cards visually
**Then** both cards have equal width, equal padding, matching typography hierarchy, and comparable content length, ensuring neither card dominates the visual layout

### AC5: Section is accessible and uses semantic HTML

**Given** a screen reader user navigates to the "What We Do" section
**When** the section content is announced
**Then** the section is identifiable via `aria-labelledby`, card headings are `<h3>` elements under the `<h2>` section heading, bullet lists use `<ul>` and `<li>` elements, and all content is readable in logical order

---

## Scope

### In Scope
- Services overview Astro component (`ServicesOverview.astro`)
- Section heading: "What We Do" as `<h2>`
- Two service cards with equal visual treatment
- Card 1: "Digital Product Development" -- icon, heading, summary, 4 bullets
- Card 2: "Digital Delivery Consulting" -- icon, heading, summary, 4 bullets
- Icons: CSS-only or inline SVG icons (no icon library dependency)
- Off-white (`#F8F9FA`) section background
- Two-column layout on desktop (>= 1024px), stacked on mobile/tablet
- Responsive layout across 375px, 768px, 1024px, 1440px breakpoints
- Semantic HTML (`<section>`, `<h2>`, `<h3>`, `<ul>`, `<li>`)
- Section `id="what-we-do"` for navigation anchoring
- Animation-ready `data-*` attributes for future GSAP staggered card reveal (EP0003)

### Out of Scope
- GSAP scroll animations for card reveal (EP0003)
- Detailed service descriptions (covered in US0007 Services Detail)
- Card click-through to dedicated service pages (not in v1)
- Card images or illustrations beyond simple icons
- Dynamic content loading or CMS integration

---

## Technical Notes

### Astro Component
Create `src/components/ServicesOverview.astro`. Structure:

```astro
<section id="what-we-do" class="bg-off-white py-16 md:py-20 lg:py-24" aria-labelledby="what-we-do-heading" data-animate="services-overview">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 id="what-we-do-heading" class="text-center ...">What We Do</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
      <!-- Card 1: Digital Product Development -->
      <article class="..." data-animate="card">
        <!-- icon, h3, p, ul -->
      </article>
      <!-- Card 2: Digital Delivery Consulting -->
      <article class="..." data-animate="card">
        <!-- icon, h3, p, ul -->
      </article>
    </div>
  </div>
</section>
```

### Tailwind Approach
- Section background: `bg-[#F8F9FA]` or custom `bg-off-white` design token
- Cards: `bg-white rounded-lg p-6 md:p-8 shadow-sm` or similar elevated treatment
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
- Card headings: `text-xl md:text-2xl font-semibold text-navy` or `text-[#1B2A4A]`
- Bullet list: `space-y-2 text-slate` or `text-[#6B7280]` with custom bullet styling
- Icons: `text-coral-pink` or `text-[#FF6B6B]` for accent colour on icons

### Semantic HTML
- `<section id="what-we-do" aria-labelledby="what-we-do-heading">`
- `<h2 id="what-we-do-heading">What We Do</h2>`
- Each card wrapped in `<article>` with `<h3>` heading
- Bullet points in `<ul>` with `<li>` items
- Icons as inline SVG with `aria-hidden="true"` (decorative)

### Icons
Use simple inline SVG icons (e.g., a code bracket icon for Development, a chart/people icon for Consulting). Keep icons small (24x24 or 32x32) and style with Coral Pink (`#FF6B6B`) or Steel Blue (`#3A6B9F`). Icons are decorative and should have `aria-hidden="true"`.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| One card has significantly more content than the other | Cards maintain equal height on desktop via CSS Grid or Flexbox stretch; no visual imbalance between cards |
| Viewport is exactly at the 1024px breakpoint boundary | Layout cleanly transitions between stacked and side-by-side; no partially overlapping or clipped cards |
| Very long bullet point text (future copy change) | Text wraps within the card boundary; no horizontal overflow or layout breaking |
| User zooms to 200% on desktop | Cards may stack vertically (responsive reflow); content remains fully readable and accessible |
| Screen reader encounters icon SVGs | Icons are marked `aria-hidden="true"` and are not announced; all meaning is conveyed through text |
| Browser does not support CSS Grid | Falls back gracefully; Flexbox fallback or natural block-level stacking applies; content remains accessible |
| Visitor on a very slow connection | Static HTML content renders immediately; no layout shift as no images or lazy-loaded content is present |

---

## Test Scenarios

- [ ] **TS1:** Section renders with off-white (`#F8F9FA`) background colour
- [ ] **TS2:** Section heading reads "What We Do" and is rendered as an `<h2>` element
- [ ] **TS3:** Section has `id="what-we-do"` attribute for anchor navigation
- [ ] **TS4:** Two cards are present: one titled "Digital Product Development" and one titled "Digital Delivery Consulting"
- [ ] **TS5:** Each card contains an icon, an `<h3>` heading, a summary paragraph, and a `<ul>` with exactly 4 `<li>` bullet points
- [ ] **TS6:** At 1024px viewport width, both cards display side-by-side in a two-column layout with equal width
- [ ] **TS7:** At 375px viewport width, cards stack vertically with "Digital Product Development" appearing first
- [ ] **TS8:** At 768px viewport width (tablet), cards stack vertically with correct spacing
- [ ] **TS9:** Both cards have matching visual treatment (equal padding, consistent typography, same border/shadow style)
- [ ] **TS10:** Card icons are rendered as inline SVG with `aria-hidden="true"` attribute
- [ ] **TS11:** Colour contrast between card text (`#2D2D2D` or `#6B7280`) and white card background meets WCAG AA ratio
- [ ] **TS12:** Section uses semantic HTML: `<section>` wrapper, `<article>` for each card, `<h2>` section heading, `<h3>` card headings, `<ul>`/`<li>` for bullets
- [ ] **TS13:** Section includes `aria-labelledby` attribute referencing the section heading `id`
- [ ] **TS14:** Section renders correctly with no horizontal scrolling at all four breakpoints (375px, 768px, 1024px, 1440px)
- [ ] **TS15:** Section includes `data-animate` attributes for future GSAP animation integration

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project initialised with base layout and page structure | Draft |
| US0002 | Blocks | Tailwind CSS configured with BrightKeep design tokens (colours, fonts, spacing) | Draft |
| US0004 | Sequence | Hero section provides visual context above this section; not a hard blocker but section ordering matters | Draft |

### External Dependencies

| Dependency | Type | What's Needed | Status |
|------------|------|---------------|--------|
| Google Fonts | Runtime | Inter font family loaded for headings and body text | Not Started |
| Approved copy | Content | Card summary text and bullet point copy confirmed | Confirmed |

---

## Estimation

**Story Points:** 3
**Complexity:** Low

**Rationale:** Two-card layout with responsive grid is straightforward with Tailwind. Static content, no interactivity. Minor complexity from ensuring equal card heights and creating inline SVG icons. Slightly more content than the hero section.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
