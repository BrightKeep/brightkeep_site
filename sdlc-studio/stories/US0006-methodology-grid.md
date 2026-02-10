# US0006: Build Methodology Grid (How We Work)

> **Status:** Done
> **Epic:** [EP0002: Site Content Sections](../epics/EP0002-site-content-sections.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Leader Lee (CTO/Engineering Manager)
**I want** to read a clear, structured overview of BrightKeep's working methodology and principles
**So that** I can assess whether their cultural and methodological approach aligns with my engineering organisation before deciding to make contact

## Context

### Persona Reference
**Leader Lee** - CTO / Head of Product / Engineering Manager, Expert technical proficiency. Reads "How We Work" in detail, looking for methodology alignment. Has worked with "agile coaches" who lacked real engineering experience. Needs evidence of deep technical credibility.
[Full persona details](../personas.md#leader-lee)

### Background
The "How We Work" section communicates BrightKeep's six working principles, which serve as a cultural and methodological differentiator. For Lee, this section is read in detail -- not just scanned. Lee is evaluating whether BrightKeep's approach aligns with their engineering organisation's values: evidence-driven, pragmatic, focused on building internal capability rather than creating consultancy dependency. The six tiles cover the full spectrum of BrightKeep's delivery philosophy. The navy background with white text and Coral Pink icon accents creates a visually distinct "dark" section that breaks up the page rhythm and signals a shift from "what we do" to "how we do it." The three-column grid on desktop provides a compact, professional layout; tiles stack on mobile for readability.

---

## Acceptance Criteria

### AC1: Section displays with correct heading, background, and colour scheme

**Given** a visitor scrolls past the "What We Do" section
**When** the "How We Work" section enters the viewport
**Then** the section is displayed with a navy (`#1B2A4A`) background, white (`#FFFFFF`) text, a section heading "How We Work" rendered as an `<h2>` element, and the section has `id="how-we-work"` for navigation anchoring

### AC2: Six methodology tiles display with correct content

**Given** a visitor views the "How We Work" section
**When** they read the tile content
**Then** exactly six tiles are displayed with the following titles: "Problem First", "Evidence Over Opinion", "Ship and Learn", "AI Where It Counts", "Sustainable Pace", and "Your Capability Not Ours", and each tile contains an icon, a title, and a description paragraph

### AC3: Tiles display in three-column grid on desktop, stacked on mobile

**Given** a visitor views the "How We Work" section
**When** the viewport is 1024px or wider (desktop/wide)
**Then** the six tiles are arranged in a three-column grid (two rows of three)
**And when** the viewport is narrower than 768px (mobile)
**Then** the tiles stack vertically in a single column
**And when** the viewport is between 768px and 1023px (tablet)
**Then** the tiles display in a two-column grid or other intermediate layout that avoids horizontal scrolling

### AC4: Icons use Coral Pink accent colour

**Given** a visitor views the methodology tiles
**When** they observe the icons on each tile
**Then** each tile icon is rendered in Coral Pink (`#FF6B6B`) or a complementary accent colour that stands out against the navy background, providing visual interest and drawing the eye to each principle

### AC5: All tiles are visible without horizontal scrolling at every breakpoint

**Given** a visitor views the "How We Work" section at any breakpoint (375px, 768px, 1024px, 1440px)
**When** they view the section content
**Then** all six tiles are fully visible within the viewport width without requiring horizontal scrolling, and the content reflows appropriately for the screen size

---

## Scope

### In Scope
- Methodology grid Astro component (`MethodologyGrid.astro`)
- Section heading: "How We Work" as `<h2>`
- Six methodology tiles with icon, title (`<h3>`), and description paragraph
- Tile 1: "Problem First"
- Tile 2: "Evidence Over Opinion"
- Tile 3: "Ship and Learn"
- Tile 4: "AI Where It Counts"
- Tile 5: "Sustainable Pace"
- Tile 6: "Your Capability Not Ours"
- Navy (`#1B2A4A`) section background with white text
- Coral Pink (`#FF6B6B`) icon highlights
- Three-column grid on desktop (>= 1024px), responsive intermediate at tablet, stacked on mobile
- Responsive layout across 375px, 768px, 1024px, 1440px breakpoints
- Semantic HTML (`<section>`, `<h2>`, `<h3>`, `<p>`)
- Section `id="how-we-work"` for navigation anchoring
- Animation-ready `data-*` attributes for future GSAP sequential fade-in (EP0003)
- Inline SVG icons or CSS-only icon treatments for each tile

### Out of Scope
- GSAP scroll animations for tile reveal (EP0003)
- Interactive or expandable tiles (static display only)
- Methodology detail pages or modals
- External icon library dependencies (Font Awesome, Heroicons, etc.)
- Tile reordering or filtering functionality

---

## Technical Notes

### Astro Component
Create `src/components/MethodologyGrid.astro`. Consider using a data-driven approach where tile content is defined in an array and iterated over:

```astro
---
const principles = [
  { icon: '...', title: 'Problem First', description: '...' },
  { icon: '...', title: 'Evidence Over Opinion', description: '...' },
  { icon: '...', title: 'Ship and Learn', description: '...' },
  { icon: '...', title: 'AI Where It Counts', description: '...' },
  { icon: '...', title: 'Sustainable Pace', description: '...' },
  { icon: '...', title: 'Your Capability Not Ours', description: '...' },
];
---
<section id="how-we-work" class="bg-navy py-16 md:py-20 lg:py-24 text-white" aria-labelledby="how-we-work-heading" data-animate="methodology">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 id="how-we-work-heading" class="text-center ...">How We Work</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {principles.map((p) => (
        <div class="..." data-animate="tile">
          <!-- icon, h3, p -->
        </div>
      ))}
    </div>
  </div>
</section>
```

### Tailwind Approach
- Section background: `bg-[#1B2A4A]` or custom `bg-navy` design token
- Text: `text-white`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10`
- Tile: optional subtle border or background differentiation, e.g. `border border-white/10 rounded-lg p-6` or transparent background with divider
- Tile heading: `text-lg md:text-xl font-semibold text-white`
- Tile description: `text-slate-300` or `text-white/80` for slightly muted body text
- Icon: `text-[#FF6B6B]` (Coral Pink) with `w-8 h-8` or `w-10 h-10` sizing
- Section heading: `text-2xl md:text-3xl lg:text-4xl font-bold text-white`

### Semantic HTML
- `<section id="how-we-work" aria-labelledby="how-we-work-heading">`
- `<h2 id="how-we-work-heading">How We Work</h2>`
- Each tile as a `<div>` or `<article>` containing `<h3>` and `<p>`
- Icons as inline SVG with `aria-hidden="true"` (decorative)

### Icon Approach
Create six simple inline SVG icons that represent each principle. Keep them abstract/geometric to maintain the professional aesthetic. Examples:
- Problem First: target/crosshair icon
- Evidence Over Opinion: chart/data icon
- Ship and Learn: rocket/ship icon
- AI Where It Counts: circuit/brain icon
- Sustainable Pace: clock/rhythm icon
- Your Capability Not Ours: people/handoff icon

All icons should share consistent line weight, dimensions, and Coral Pink colour.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Viewport width between 768px and 1023px (tablet) | Tiles display in a two-column grid (three rows of two) without horizontal overflow; all six tiles remain visible |
| One tile has a significantly longer description than others | Tiles maintain equal height within each grid row via CSS Grid `auto-rows` or Flexbox stretch; no tile overflows or clips content |
| Visitor uses high contrast mode or Windows High Contrast Mode | Text remains readable; icons may lose colour styling but tile titles and descriptions remain legible through semantic markup |
| Navy-on-navy: CSS background fails to load | Section falls back to navy background colour; text remains white and legible regardless of any decorative overlay |
| Screen reader navigates the grid | Tiles are read in logical DOM order (left-to-right, top-to-bottom); each tile heading is announced as `<h3>` under the `<h2>` section heading |
| User zooms to 200% on desktop | Grid reflows to fewer columns (responsive breakpoints accommodate zoom-triggered width reduction); all tiles remain visible and readable |
| Very small mobile viewport (320px) | Single-column layout; tiles fill available width with appropriate padding; no horizontal scrolling |
| Colour-blind user views the icons | Icons are decorative only (Coral Pink accent); all meaning is conveyed through tile titles and descriptions, not colour alone |

---

## Test Scenarios

- [ ] **TS1:** Section renders with navy (`#1B2A4A`) background and white text
- [ ] **TS2:** Section heading reads "How We Work" and is rendered as an `<h2>` element
- [ ] **TS3:** Section has `id="how-we-work"` attribute for anchor navigation
- [ ] **TS4:** Exactly six tiles are present with the correct titles: "Problem First", "Evidence Over Opinion", "Ship and Learn", "AI Where It Counts", "Sustainable Pace", "Your Capability Not Ours"
- [ ] **TS5:** Each tile contains an icon element, an `<h3>` title, and a `<p>` description
- [ ] **TS6:** At 1024px viewport width, tiles display in a three-column grid layout (2 rows x 3 columns)
- [ ] **TS7:** At 768px viewport width (tablet), tiles display in a two-column grid layout
- [ ] **TS8:** At 375px viewport width (mobile), tiles stack in a single column
- [ ] **TS9:** Tile icons are rendered in Coral Pink (`#FF6B6B`) colour
- [ ] **TS10:** All six tiles are visible without horizontal scrolling at each breakpoint (375px, 768px, 1024px, 1440px)
- [ ] **TS11:** Colour contrast between white text and navy background meets WCAG AA ratio (minimum 4.5:1)
- [ ] **TS12:** Tile icons have `aria-hidden="true"` attribute (decorative icons)
- [ ] **TS13:** Section uses semantic HTML: `<section>` wrapper with `aria-labelledby`, `<h2>` section heading, `<h3>` tile headings
- [ ] **TS14:** Tiles within the same grid row have equal height on desktop layout
- [ ] **TS15:** Section includes `data-animate` attributes on tiles for future GSAP animation integration
- [ ] **TS16:** At 1440px viewport width (wide), content is centred within `max-w` container and does not stretch to fill the full viewport

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project initialised with base layout and page structure | Draft |
| US0002 | Blocks | Tailwind CSS configured with BrightKeep design tokens (colours, fonts, spacing) | Draft |
| US0005 | Sequence | Services Overview section sits above this section in page order; not a hard blocker but section ordering matters | Draft |

### External Dependencies

| Dependency | Type | What's Needed | Status |
|------------|------|---------------|--------|
| Google Fonts | Runtime | Inter font family loaded for headings and body text | Not Started |
| Approved copy | Content | Description text for each of the six methodology tiles confirmed | Confirmed |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

**Rationale:** Six tiles with a three-column responsive grid adds moderate layout complexity. Creating six unique inline SVG icons requires design effort. Data-driven tile rendering in Astro is straightforward but adds a small implementation overhead compared to static HTML. The dark colour scheme on navy requires careful contrast validation.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
