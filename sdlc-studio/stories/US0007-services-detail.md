# US0007: Build Services Detail Section

> **Status:** Done
> **Epic:** [EP0002: Site Content Sections](../epics/EP0002-site-content-sections.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Leader Lee (CTO/Engineering Manager)
**I want** to see a detailed, categorised breakdown of all specific service offerings in an expandable format
**So that** I can quickly verify whether BrightKeep offers the specific consulting capabilities I need (such as DORA metrics, DevOps, or EngOps) before deciding to make contact

## Context

### Persona Reference
**Leader Lee** - CTO / Head of Product / Engineering Manager, Expert technical proficiency. Checks "Services" detail list for specific consulting capabilities. Wants to assess quickly whether consulting covers specific needs (EngOps, DORA, DevOps). Needs to justify the engagement to CFO/CEO.
[Full persona details](../personas.md#leader-lee)

### Background
The "Services" section provides a detailed, itemised breakdown of all eleven specific service offerings across two categories: Development Services (5 items) and Consulting Services (6 items). While the "What We Do" section (US0005) gives a high-level overview, this section lets Lee drill into specifics. Lee typically navigates directly here after confirming the general consulting offering exists. The accordion or grid layout allows the content to remain compact by default while offering detail on demand. The expand/collapse pattern is implemented using native HTML `<details>`/`<summary>` elements or minimal JavaScript for accessibility and zero-dependency operation. A white background with subtle borders keeps the section clean and professional. This section is particularly important for Leader Lee and Enterprise Erin, who need to verify specific capabilities before making contact.

---

## Acceptance Criteria

### AC1: Section displays with correct heading and background

**Given** a visitor scrolls past the "How We Work" section
**When** the "Services" section enters the viewport
**Then** the section is displayed with a white (`#FFFFFF`) background, a section heading "Services" rendered as an `<h2>` element, and the section has `id="services"` for navigation anchoring

### AC2: Development Services category displays all five items

**Given** a visitor views the "Services" section
**When** they look at the Development Services category
**Then** a "Development Services" subheading (`<h3>`) is visible, and five service items are listed: "Custom Software", "AI/ML Integration", "Product Discovery", "Legacy Modernisation", and "Cloud Architecture"

### AC3: Consulting Services category displays all six items

**Given** a visitor views the "Services" section
**When** they look at the Consulting Services category
**Then** a "Consulting Services" subheading (`<h3>`) is visible, and six service items are listed: "Agile Coaching", "DORA Metrics", "DevOps/CI-CD", "EngOps/DX", "Team Structure", and "Technical Due Diligence"

### AC4: Service items expand and collapse to reveal details

**Given** a visitor views a service item in its collapsed state
**When** they click or tap on the service item title
**Then** the item expands to reveal a description paragraph, and clicking or tapping again collapses it back to its title-only state
**And** only one item per category may be expanded at a time (optional progressive enhancement), or multiple items may be open simultaneously

### AC5: Accordion is keyboard-accessible and works without JavaScript

**Given** a visitor navigates the services section using a keyboard
**When** they tab to a service item and press Enter or Space
**Then** the item expands/collapses identically to mouse interaction
**And given** the visitor has JavaScript disabled
**Then** the `<details>`/`<summary>` elements still function natively in the browser, allowing expand/collapse without JavaScript dependency

---

## Scope

### In Scope
- Services detail Astro component (`ServicesDetail.astro`)
- Section heading: "Services" as `<h2>`
- Two service categories with subheadings (`<h3>`)
- Development Services (5 items): Custom Software, AI/ML Integration, Product Discovery, Legacy Modernisation, Cloud Architecture
- Consulting Services (6 items): Agile Coaching, DORA Metrics, DevOps/CI-CD, EngOps/DX, Team Structure, Technical Due Diligence
- Accordion expand/collapse using `<details>`/`<summary>` elements (CSS-only baseline)
- White (`#FFFFFF`) background with subtle borders between items
- Responsive layout across 375px, 768px, 1024px, 1440px breakpoints
- Semantic HTML (`<section>`, `<h2>`, `<h3>`, `<details>`, `<summary>`)
- Section `id="services"` for navigation anchoring
- Animation-ready `data-*` attributes for future GSAP smooth accordion transitions (EP0003)
- Subtle open/close indicator (chevron or plus/minus icon) on each accordion item

### Out of Scope
- GSAP-powered smooth accordion animation (EP0003 -- this story uses CSS transitions only)
- Dedicated service detail pages
- Pricing information per service
- Service comparison features
- Filtering or searching within services
- Icons per service item (icons are used in US0005 and US0006; this section is text-focused)

---

## Technical Notes

### Astro Component
Create `src/components/ServicesDetail.astro`. Use a data-driven approach with `<details>`/`<summary>` elements:

```astro
---
const developmentServices = [
  { title: 'Custom Software', description: '...' },
  { title: 'AI/ML Integration', description: '...' },
  { title: 'Product Discovery', description: '...' },
  { title: 'Legacy Modernisation', description: '...' },
  { title: 'Cloud Architecture', description: '...' },
];
const consultingServices = [
  { title: 'Agile Coaching', description: '...' },
  { title: 'DORA Metrics', description: '...' },
  { title: 'DevOps/CI-CD', description: '...' },
  { title: 'EngOps/DX', description: '...' },
  { title: 'Team Structure', description: '...' },
  { title: 'Technical Due Diligence', description: '...' },
];
---
<section id="services" class="bg-white py-16 md:py-20 lg:py-24" aria-labelledby="services-heading" data-animate="services-detail">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 id="services-heading" class="...">Services</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
      <div>
        <h3 class="...">Development Services</h3>
        {developmentServices.map((s) => (
          <details class="border-b ...">
            <summary class="...">{s.title}</summary>
            <p class="...">{s.description}</p>
          </details>
        ))}
      </div>
      <div>
        <h3 class="...">Consulting Services</h3>
        {consultingServices.map((s) => (
          <details class="border-b ...">
            <summary class="...">{s.title}</summary>
            <p class="...">{s.description}</p>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>
```

### Tailwind Approach
- Section background: `bg-white`
- Section heading: `text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B2A4A]`
- Category subheading: `text-xl md:text-2xl font-semibold text-[#1B2A4A] mb-4`
- Accordion item: `border-b border-[#E5E7EB]` (subtle grey border)
- Summary: `py-4 cursor-pointer font-medium text-[#2D2D2D] hover:text-[#FF6B6B]` with transition
- Description: `pb-4 text-[#6B7280]` (Slate body text)
- Chevron indicator: CSS `::marker` styling or custom `::after` pseudo-element with rotation on `[open]`
- Two-column layout on desktop: `grid grid-cols-1 lg:grid-cols-2 gap-12`
- Touch target: summary element `min-h-[44px]` for mobile accessibility

### Semantic HTML
- `<section id="services" aria-labelledby="services-heading">`
- `<h2 id="services-heading">Services</h2>`
- `<h3>` for each category subheading
- `<details>` / `<summary>` for native expand/collapse (no JS required)
- `<p>` for service descriptions inside `<details>`

### CSS-Only Accordion Styling
Style the native `<details>` element marker and open/close transition:
```css
details summary {
  list-style: none; /* remove default marker */
}
details summary::after {
  content: '+';
  transition: transform 0.2s ease;
}
details[open] summary::after {
  content: '-';
  /* or rotate a chevron: transform: rotate(180deg); */
}
```
This approach works without JavaScript and degrades gracefully in all browsers.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| JavaScript is disabled | `<details>`/`<summary>` elements function natively in all modern browsers; expand/collapse works without JS; only GSAP animations (EP0003) are affected |
| All accordion items are opened simultaneously | Layout accommodates all expanded content without overflow; page scrolls naturally; no visual breaking |
| Service description is very long (future copy change) | Description text wraps within the accordion panel; no horizontal overflow; container expands vertically to fit |
| User rapidly clicks multiple accordion items | Native `<details>` elements handle rapid toggling without race conditions or visual glitches |
| Screen reader encounters accordion items | `<summary>` elements are natively accessible; screen reader announces expanded/collapsed state; content within `<details>` is read when expanded |
| Visitor on mobile taps a narrow accordion summary | Touch target is minimum 44px tall; summary is full-width and easy to tap |
| Browser does not support `<details>`/`<summary>` (very old browser) | Content is displayed in its expanded state by default (progressive enhancement); all information is accessible |
| Keyboard user navigates through all 11 service items | Tab order follows DOM order (Development Services first, then Consulting Services); Enter/Space toggles each item; focus remains on the toggled summary |

---

## Test Scenarios

- [ ] **TS1:** Section renders with white (`#FFFFFF`) background colour
- [ ] **TS2:** Section heading reads "Services" and is rendered as an `<h2>` element
- [ ] **TS3:** Section has `id="services"` attribute for anchor navigation
- [ ] **TS4:** "Development Services" subheading is present as an `<h3>` element
- [ ] **TS5:** Five development service items are listed: Custom Software, AI/ML Integration, Product Discovery, Legacy Modernisation, Cloud Architecture
- [ ] **TS6:** "Consulting Services" subheading is present as an `<h3>` element
- [ ] **TS7:** Six consulting service items are listed: Agile Coaching, DORA Metrics, DevOps/CI-CD, EngOps/DX, Team Structure, Technical Due Diligence
- [ ] **TS8:** Clicking a collapsed service item expands it to show the description text
- [ ] **TS9:** Clicking an expanded service item collapses it back to title-only
- [ ] **TS10:** Accordion expand/collapse works using keyboard (Enter/Space on focused summary)
- [ ] **TS11:** Accordion items function correctly with JavaScript disabled (native `<details>`/`<summary>` behaviour)
- [ ] **TS12:** At 1024px viewport, service categories display in a two-column layout (Development left, Consulting right)
- [ ] **TS13:** At 375px viewport, service categories stack vertically (Development above Consulting)
- [ ] **TS14:** Accordion summary elements have a minimum touch target height of 44px
- [ ] **TS15:** Subtle borders separate each accordion item visually
- [ ] **TS16:** Open/close indicator (chevron, plus/minus, or similar) is visible on each accordion summary
- [ ] **TS17:** Section uses semantic HTML: `<section>`, `<h2>`, `<h3>`, `<details>`, `<summary>`, `<p>`
- [ ] **TS18:** Section includes `data-animate` attributes for future GSAP animation integration

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project initialised with base layout and page structure | Draft |
| US0002 | Blocks | Tailwind CSS configured with BrightKeep design tokens (colours, fonts, spacing) | Draft |
| US0005 | Relates | Services Overview provides the high-level context; this section provides detail for the same service pillars | Draft |
| US0006 | Sequence | How We Work section sits above this section in page order; not a hard blocker | Draft |

### External Dependencies

| Dependency | Type | What's Needed | Status |
|------------|------|---------------|--------|
| Google Fonts | Runtime | Inter font family loaded for headings and body text | Not Started |
| Approved copy | Content | Description text for each of the eleven service items confirmed | Confirmed |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

**Rationale:** Eleven accordion items across two categories with expand/collapse behaviour adds moderate complexity. Using native `<details>`/`<summary>` simplifies the implementation significantly (no JS), but custom styling of these elements and the open/close indicator requires careful CSS work. Two-column responsive layout and accessibility testing add incremental effort.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
