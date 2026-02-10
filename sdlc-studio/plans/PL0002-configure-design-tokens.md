# PL0002: Configure BrightKeep Design Tokens - Implementation Plan

> **Status:** Complete
> **Story:** [US0002: Configure BrightKeep Design Tokens](../stories/US0002-configure-design-tokens.md)
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Created:** 2026-02-10
> **Language:** TypeScript / Tailwind CSS

## Overview

Extend the Tailwind CSS configuration with BrightKeep's complete design token system: colour palette (7 brand colours), typography (Inter + JetBrains Mono with responsive heading scale), responsive breakpoints (375/768/1024/1440px replacing defaults), and spacing utilities. Also create a global CSS layer setting base font and colour defaults.

## Acceptance Criteria Summary

| AC | Name | Description |
|----|------|-------------|
| AC1 | Colour Palette | 7 brand colours as Tailwind utilities (`bg-brand-primary`, etc.) |
| AC2 | Typography Scale | `font-sans` → Inter, `font-mono` → JetBrains Mono, heading sizes h1-h4 |
| AC3 | Responsive Breakpoints | Replace defaults: sm:375, md:768, lg:1024, xl:1440 |
| AC4 | Spacing & Utilities | Section padding, container max-widths, `max-w-content` |
| AC5 | Visual Output | Brand classes produce correct visual output matching hex codes |

---

## Technical Context

### Language & Framework
- **Primary Language:** TypeScript
- **Framework:** Astro 5.x with Tailwind CSS 3.4.x
- **Existing Config:** `tailwind.config.mjs` created in US0001 (minimal starter)

### Existing Patterns
- Tailwind config uses ESM (`export default`)
- Content paths already configured for `.astro` files
- `@astrojs/tailwind` integration handles PostCSS setup

---

## Recommended Approach

**Strategy:** Test-After
**Rationale:** Design token configuration is purely declarative. Testing involves applying classes and verifying visual output via build. No business logic to TDD against.

---

## Implementation Phases

### Phase 1: Tailwind Configuration
**Goal:** Configure all design tokens in `tailwind.config.mjs`

- [ ] Replace `screens` with BrightKeep breakpoints (sm:375, md:768, lg:1024, xl:1440)
- [ ] Add `brand` colour palette under `extend.colors`
- [ ] Configure `fontFamily` with Inter and JetBrains Mono
- [ ] Add custom `fontSize` entries for heading scale (h1-h4, body, small, code)
- [ ] Add spacing utilities (`py-section`, `max-w-content`)
- [ ] Add inline documentation comments

### Phase 2: Global Styles
**Goal:** Set base font and colour defaults

- [ ] Create global CSS file or add base layer styles via Tailwind `@layer base`
- [ ] Set default font-family on `html`/`body` to Inter
- [ ] Set default text colour to Charcoal

### Phase 3: Verification
**Goal:** Verify tokens produce correct visual output

- [ ] Update `index.astro` with a design token test page showing all brand colours, fonts, and breakpoints
- [ ] Run `npm run build` to verify no errors
- [ ] Verify built CSS contains only used classes

---

## Edge Case Handling

| # | Edge Case (from Story) | Handling Strategy | Phase |
|---|------------------------|-------------------|-------|
| 1 | Default Tailwind colour used (e.g. `bg-blue-500`) | Still works (colours are extended, not replaced); code review flags non-brand colours | Phase 1 |
| 2 | Coral Pink on Navy small text | Contrast ~4.2:1 fails AA for normal text; document warning in config comments | Phase 1 |
| 3 | Developer uses `2xl:` prefix | Prefix doesn't exist (screens replaced); developer uses `xl:` instead | Phase 1 |
| 4 | Custom font fails to load | `font-sans` falls back to sans-serif; `font-mono` falls back to monospace | Phase 2 |
| 5 | Tailwind config syntax error | `npm run dev` fails with clear error | Phase 1 |
| 6 | New developer unaware of brand system | Comments in config document each colour's name, hex, and usage | Phase 1 |
| 7 | Excessive unused CSS in build | Tailwind JIT purges unused; verify CSS < 20KB for minimal page | Phase 3 |

**Coverage:** 7/7 edge cases handled

---

## Definition of Done

- [ ] All 7 brand colours available as Tailwind utilities
- [ ] Typography scale configured with responsive sizing
- [ ] Breakpoints replace defaults at 375/768/1024/1440
- [ ] Spacing and container utilities defined
- [ ] Build passes without errors
- [ ] Config documented with inline comments
