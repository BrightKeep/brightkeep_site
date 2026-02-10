# US0002: Configure BrightKeep Design Tokens

> **Status:** Done
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Founder/Business Owner (Startup Sam)
**I want** the BrightKeep brand colours, typography, spacing, and responsive breakpoints configured as reusable design tokens in Tailwind CSS
**So that** the website consistently reflects the BrightKeep brand across every section, building the trust and credibility I look for when evaluating a potential partner

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner. Intermediate technical proficiency. Judges credibility within seconds based on visual consistency, professional presentation, and clear service communication. Will bounce quickly if the site looks inconsistent or amateurish.
[Full persona details](../personas.md#startup-sam)

### Background
BrightKeep's brand identity has been defined with a specific colour palette, typography pairing, and responsive strategy. These values must be codified as Tailwind CSS design tokens so that every developer and every component uses the same values. Inconsistent colours, font weights, or spacing undermine the professional credibility that personas like Startup Sam and Enterprise Erin use to evaluate potential partners. This story takes the Tailwind config created in US0001 and extends it with the full BrightKeep design system. The PRD specifies breakpoints at 375px, 768px, 1024px, and 1440px with a mobile-first approach where 60%+ of traffic is expected from mobile devices.

---

## Acceptance Criteria

### AC1: BrightKeep colour palette defined in Tailwind config
- **Given** the Tailwind configuration file exists from US0001
- **When** the developer extends the Tailwind theme with the BrightKeep palette
- **Then** the following colours are available as Tailwind utilities (e.g. `bg-brand-primary`, `text-brand-accent`): Coral Pink `#FF6B6B` (accent), Navy `#1B2A4A` (primary), Off-White `#F8F9FA` (background), Steel Blue `#3A6B9F` (secondary), Charcoal `#2D2D2D` (text-dark), Slate `#6B7280` (text-muted), Teal `#0D9488` (highlight); and each colour renders correctly when applied to background, text, and border utilities

### AC2: Typography scale configured with Inter and JetBrains Mono
- **Given** Google Fonts are loaded from US0001
- **When** the Tailwind config `fontFamily` is extended
- **Then** `font-sans` maps to `'Inter', sans-serif` and `font-mono` maps to `'JetBrains Mono', monospace`; heading sizes are defined in the typography scale (e.g. `text-h1` through `text-h4`) with responsive sizing; body text uses Inter at 400 weight, headings use Inter at 600-700 weight, and code/mono elements use JetBrains Mono at 400 weight

### AC3: Responsive breakpoints configured for mobile-first approach
- **Given** the Tailwind configuration file exists
- **When** the `screens` theme property is configured
- **Then** the following breakpoints are defined: `sm: '375px'` (mobile), `md: '768px'` (tablet), `lg: '1024px'` (desktop), `xl: '1440px'` (wide desktop); Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) apply styles at the correct viewport widths; and the default Tailwind breakpoints are replaced (not merged) to avoid confusion

### AC4: Spacing scale and component utilities defined
- **Given** the Tailwind configuration is being extended
- **When** the developer adds spacing and component utility extensions
- **Then** section padding utilities are defined for consistent vertical rhythm (e.g. `py-section` for section spacing), container max-widths align with the breakpoint scale, and a `max-w-content` utility is available for constraining content width (e.g. 1200px); the spacing scale is documented with comments in the config file

### AC5: Design tokens produce correct visual output
- **Given** all design tokens are configured in `tailwind.config.mjs`
- **When** a test page uses BrightKeep brand classes (`bg-brand-primary`, `text-brand-accent`, `font-sans`, `font-mono`, responsive breakpoints)
- **Then** the rendered page visually matches the brand specification: Navy backgrounds, Coral Pink accents, Inter body text, JetBrains Mono code text; and the colour values in browser DevTools match the exact hex codes defined above

---

## Scope

### In Scope
- Extending `tailwind.config.mjs` with BrightKeep colour palette under a `brand` namespace
- Configuring `fontFamily` with Inter (sans) and JetBrains Mono (mono)
- Defining a typography scale for headings (h1-h4) and body text with responsive sizing
- Replacing default Tailwind breakpoints with project-specific values (375, 768, 1024, 1440)
- Adding spacing utilities for section rhythm and content max-width
- Adding component-level utility classes (e.g. button focus ring colour, card border radius)
- Inline documentation/comments in the Tailwind config for developer reference
- A CSS layer or global styles file setting base font family and colour defaults on `html`/`body`

### Out of Scope
- Astro project initialisation (US0001)
- Actual page content or components using these tokens (EP0002)
- Dark mode / theme switching (not in PRD v1)
- Icon system or SVG sprite configuration
- Tailwind component classes for specific UI patterns (buttons, cards) -- those are built in EP0002 stories
- Animation tokens or GSAP configuration (EP0003)

---

## Technical Notes

### Tailwind Config Structure
```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#1B2A4A',    // Navy
          accent: '#FF6B6B',     // Coral Pink
          secondary: '#3A6B9F',  // Steel Blue
          highlight: '#0D9488',  // Teal
          surface: '#F8F9FA',    // Off-White
          dark: '#2D2D2D',       // Charcoal
          muted: '#6B7280',      // Slate
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // ... spacing, fontSize, etc.
    },
  },
}
```

### Colour Contrast Notes (WCAG 2.1 AA)
The following combinations must meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text):
- Navy `#1B2A4A` on Off-White `#F8F9FA`: ~14.6:1 (passes AA and AAA)
- White `#FFFFFF` on Navy `#1B2A4A`: ~14.0:1 (passes AA and AAA)
- Coral Pink `#FF6B6B` on Navy `#1B2A4A`: ~4.2:1 (passes AA for large text only; avoid for small body text)
- Charcoal `#2D2D2D` on Off-White `#F8F9FA`: ~13.2:1 (passes AA and AAA)
- Slate `#6B7280` on Off-White `#F8F9FA`: ~4.9:1 (passes AA for normal text)

Coral Pink on Navy is close to the 4.5:1 threshold. It should be used only for large text (18px+), buttons, or decorative elements -- never for small body text on a Navy background.

### Typography Scale Recommendation
| Token | Mobile | Desktop | Weight | Font |
|-------|--------|---------|--------|------|
| h1 | 2.25rem (36px) | 3.5rem (56px) | 700 | Inter |
| h2 | 1.875rem (30px) | 2.5rem (40px) | 600 | Inter |
| h3 | 1.5rem (24px) | 1.875rem (30px) | 600 | Inter |
| h4 | 1.25rem (20px) | 1.5rem (24px) | 600 | Inter |
| body | 1rem (16px) | 1.125rem (18px) | 400 | Inter |
| small | 0.875rem (14px) | 0.875rem (14px) | 400 | Inter |
| code | 0.875rem (14px) | 0.875rem (14px) | 400 | JetBrains Mono |

### Breakpoint Strategy
The PRD specifies mobile-first with 60%+ mobile traffic. By replacing default Tailwind breakpoints:
- Base styles (no prefix) target mobile (< 375px and up)
- `sm:` targets 375px+ (standard mobile)
- `md:` targets 768px+ (tablet)
- `lg:` targets 1024px+ (desktop)
- `xl:` targets 1440px+ (wide desktop)

Note: Replacing `screens` entirely means Tailwind's default `2xl` breakpoint is removed. This is intentional -- the PRD does not reference ultra-wide layouts.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Developer uses a default Tailwind colour class (e.g. `bg-blue-500`) that is not in the BrightKeep palette | The class still works (Tailwind defaults are extended, not replaced for colours), but a code review should flag non-brand colours for consistency |
| Coral Pink `#FF6B6B` used as small text on Navy background | Contrast ratio is ~4.2:1, which fails WCAG AA for normal text; an accessibility audit catches this; the design token documentation warns against this combination |
| Developer uses `2xl:` responsive prefix | The prefix does not exist because default breakpoints were replaced; Tailwind produces no output for that prefix; the developer must use `xl:` instead |
| Custom font fails to load (Inter or JetBrains Mono unavailable) | `font-sans` falls back to the browser's default `sans-serif`; `font-mono` falls back to `monospace`; layout does not break because no fixed-width assumptions depend on a specific font |
| Tailwind config syntax error | `npm run dev` fails to start with a clear configuration parsing error pointing to the line in `tailwind.config.mjs` |
| New developer joins and is unaware of the brand colour system | Comments in `tailwind.config.mjs` document each colour's name, hex code, and intended use; IntelliSense in VS Code auto-completes `brand-*` classes |
| Build includes excessive unused CSS from extended colour palette | Tailwind's JIT mode purges unused classes; the build output contains only classes referenced in source files; total CSS remains < 20KB for a minimal page |

---

## Test Scenarios

- [ ] Applying `bg-brand-primary` to a `<div>` renders a Navy (`#1B2A4A`) background in the browser
- [ ] Applying `text-brand-accent` to text renders Coral Pink (`#FF6B6B`) text in the browser
- [ ] Applying `bg-brand-surface` to a section renders Off-White (`#F8F9FA`) background
- [ ] Applying `text-brand-secondary` renders Steel Blue (`#3A6B9F`) text
- [ ] Applying `text-brand-highlight` renders Teal (`#0D9488`) text
- [ ] Applying `text-brand-dark` renders Charcoal (`#2D2D2D`) text
- [ ] Applying `text-brand-muted` renders Slate (`#6B7280`) text
- [ ] Applying `font-sans` to an element results in computed `font-family` starting with "Inter"
- [ ] Applying `font-mono` to an element results in computed `font-family` starting with "JetBrains Mono"
- [ ] Resizing the browser to 767px and applying `md:hidden` to an element confirms the element is visible (below breakpoint); resizing to 768px confirms it is hidden
- [ ] Resizing the browser to 1023px and applying `lg:text-xl` confirms text size does not change; resizing to 1024px confirms `text-xl` is applied
- [ ] The `sm:` breakpoint activates at 375px viewport width
- [ ] The `xl:` breakpoint activates at 1440px viewport width
- [ ] Navy text (`#1B2A4A`) on Off-White (`#F8F9FA`) background passes WCAG AA contrast check (ratio >= 4.5:1)
- [ ] White text on Navy background passes WCAG AA contrast check (ratio >= 4.5:1)
- [ ] Running `npm run build` with design tokens configured produces no errors
- [ ] The built CSS file includes only the brand colour classes that are actually used in source files (no full palette dump)

---

## Dependencies

### Story Dependencies
| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project with Tailwind installed and `tailwind.config.mjs` created | Draft |

### External Dependencies
| Dependency | Type | Status |
|------------|------|--------|
| Google Fonts CDN | Font availability for Inter and JetBrains Mono | Available |
| Tailwind CSS v3/v4 | Design token configuration API | Available (installed in US0001) |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

**Rationale:** Tailwind configuration is declarative and well-documented. The colour palette, fonts, and breakpoints are fully specified in the PRD. The main effort is translating the brand specification into Tailwind theme extensions and verifying the output. No custom logic, no integrations, no build tooling changes.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
