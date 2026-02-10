# US0015: Conduct Accessibility Audit and Remediation

> **Status:** Done
> **Epic:** [EP0005: Quality, SEO & Compliance](../epics/EP0005-quality-seo-and-compliance.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As an** Enterprise Erin (Digital Transformation Lead evaluating vendors for procurement)
**I want** the BrightKeep website to meet WCAG 2.1 AA accessibility standards
**So that** the site passes our organisation's inclusive design requirements and I can confidently recommend the company as a partner that takes quality and inclusion seriously

## Context

### Persona Reference
**Enterprise Erin** - Digital Transformation Lead / Head of Technology / Procurement Manager, Advanced technical proficiency. Works at a large enterprise (500+ employees) where procurement requires vendors to demonstrate inclusive practices and meet accessibility standards. A credible, accessible web presence passes internal due diligence.
[Full persona details](../personas.md#enterprise-erin)

### Background
WCAG 2.1 AA compliance is both a legal best practice in Australia and a signal of engineering quality. BrightKeep positions itself as a credible digital consultancy -- its own website must demonstrate the standards it would advocate for its clients. This story covers a comprehensive accessibility audit across all implemented components (US0004-US0012), remediation of any issues found, and the addition of accessibility infrastructure such as a skip-to-content link, visible focus indicators, and ARIA attributes where semantic HTML alone is insufficient. The audit validates colour contrast across all brand palette combinations, correct form label associations (US0012), keyboard navigability of all interactive elements, and screen reader compatibility.

---

## Acceptance Criteria

### AC1: Skip-to-Content Link
**Given** a keyboard or screen reader user loads the page
**When** they press Tab for the first time
**Then** the first focusable element is a "Skip to content" link that, when activated, moves focus to the main content area, bypassing the navigation

### AC2: Keyboard Navigation for All Interactive Elements
**Given** a visitor navigates the site using only a keyboard
**When** they Tab through the page
**Then** all interactive elements (nav links, hamburger menu, accordion toggles, form fields, submit button, footer links) are reachable via Tab and operable via Enter or Space, in a logical reading order

### AC3: Visible Focus Indicators
**Given** a keyboard user navigates the site
**When** any interactive element receives focus
**Then** a clearly visible focus indicator is displayed (e.g., outline ring in Steel Blue `#3A6B9F` or Coral Pink `#FF6B6B` with sufficient contrast) that is distinct from the default browser outline

### AC4: Colour Contrast Validation
**Given** the BrightKeep colour palette is applied across the site
**When** all text/background colour combinations are tested
**Then** all combinations meet WCAG AA contrast ratios: 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold). Specific combinations to validate include: white text on Navy (`#1B2A4A`), Charcoal (`#2D2D2D`) text on Off-White (`#F8F9FA`), Coral Pink (`#FF6B6B`) text or buttons on white and navy backgrounds, Slate (`#6B7280`) text on white, and Teal (`#0D9488`) on white

### AC5: ARIA Attributes and Semantic HTML
**Given** the full site is audited with axe-core or equivalent tool
**When** the audit completes
**Then** zero WCAG 2.1 AA violations are reported. Where semantic HTML alone is insufficient (e.g., accordion expand/collapse states, mobile menu toggle), appropriate ARIA attributes are applied (`aria-expanded`, `aria-controls`, `aria-label`, `aria-describedby`)

---

## Scope

### In Scope
- Full WCAG 2.1 AA compliance audit using automated tools (axe-core, Lighthouse) and manual testing
- Skip-to-content link as first focusable element on every page
- Keyboard navigation audit and fixes for all interactive elements
- Custom visible focus indicators on all interactive elements (consistent design)
- Colour contrast validation for all palette combinations used on the site
- Verification that form labels are correctly associated (US0012)
- ARIA attributes added where semantic HTML is insufficient:
  - `aria-expanded` on accordion toggles and mobile menu button
  - `aria-controls` linking toggles to their controlled content
  - `aria-label` on icon-only buttons (hamburger menu)
  - `aria-describedby` on form inputs linked to error messages
  - `role` attributes where needed (though prefer semantic HTML)
- Screen reader testing (VoiceOver on macOS as minimum)
- Heading hierarchy validation (single `<h1>`, logical `<h2>`/`<h3>` structure)
- Image alt text validation (if any images are present)
- Link text is descriptive (no "click here" patterns)

### Out of Scope
- AAA compliance (AA is the target)
- Automated accessibility testing in CI pipeline (could be a follow-up)
- Third-party content accessibility (Formspree submission page, analytics provider)
- Comprehensive assistive technology testing beyond VoiceOver
- Content readability audit (reading level, plain language)

---

## Technical Notes

- Run axe-core (via browser extension or `@axe-core/cli`) against the built site to identify violations. Address all "critical", "serious", and "moderate" issues.
- Run Lighthouse accessibility audit; target score > 90.
- Skip-to-content link implementation: add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>` as the first child of `<body>`. The link should be visually hidden but appear on focus. The `<main>` element should have `id="main-content"` and `tabindex="-1"` (to receive focus programmatically).
- Focus indicator styling: use Tailwind's `focus-visible:` modifier for custom ring styles. Example: `focus-visible:ring-2 focus-visible:ring-steel-blue focus-visible:ring-offset-2`. Apply consistently via a Tailwind `@layer` base style or component classes.
- Colour contrast checks can be automated using tools like the WebAIM Contrast Checker or built into the axe-core audit. Key risk areas:
  - Coral Pink `#FF6B6B` on white `#FFFFFF`: ratio ~3.9:1 -- may fail for normal text. Use only for large text, buttons, or decorative elements, not body text.
  - Slate `#6B7280` on white `#FFFFFF`: ratio ~4.6:1 -- passes AA for normal text but verify.
  - Teal `#0D9488` on white `#FFFFFF`: ratio ~3.9:1 -- may fail for normal text; use for large text or icons only.
- For the accordion, ensure `aria-expanded="true|false"` toggles on the button, and the content panel has `id` matching `aria-controls` on the button.
- Test with VoiceOver (Cmd+F5 on macOS) to verify reading order, heading navigation, and form interaction.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Coral Pink `#FF6B6B` used as body text on white background | Fails contrast; remediation required -- use only for large text (>=18px), buttons, or decorative elements; use Charcoal for body text |
| Focus indicator not visible on dark backgrounds (navy sections) | Focus ring uses a light colour (white or Off-White) on dark backgrounds; ensure visibility across all section backgrounds |
| Accordion is opened via screen reader | Screen reader announces expanded state; content is read after the toggle button |
| Mobile menu opened via keyboard | Tab focus moves into the menu items; Escape key closes the menu and returns focus to the hamburger button |
| Visitor uses browser zoom at 200% | Layout remains usable; no content is clipped or overlapping; text reflows correctly |
| Skip-to-content link used on privacy page | Link works correctly, skipping navigation and focusing on the privacy policy content |
| Form validation error announced to screen reader | Error messages are associated via `aria-describedby`; screen reader announces the error when the field is focused |

---

## Test Scenarios

- [ ] axe-core reports zero WCAG 2.1 AA violations on the homepage
- [ ] axe-core reports zero WCAG 2.1 AA violations on the privacy page
- [ ] Lighthouse accessibility score is > 90
- [ ] "Skip to content" link is the first focusable element on Tab press
- [ ] "Skip to content" link moves focus to `<main>` when activated
- [ ] All navigation links are keyboard-reachable and operable
- [ ] Accordion toggles are keyboard-operable (Enter/Space to expand/collapse)
- [ ] Mobile menu hamburger button is keyboard-operable
- [ ] All form fields are keyboard-reachable in logical tab order
- [ ] Visible focus indicator appears on every interactive element when focused
- [ ] Focus indicator is visible on both light (Off-White) and dark (Navy) backgrounds
- [ ] White text on Navy (#1B2A4A) passes WCAG AA contrast ratio (4.5:1+)
- [ ] Charcoal (#2D2D2D) text on Off-White (#F8F9FA) passes WCAG AA contrast ratio
- [ ] Coral Pink (#FF6B6B) is not used for normal-sized body text on white
- [ ] Heading hierarchy is logical: single `<h1>`, structured `<h2>`/`<h3>` without skipping levels
- [ ] VoiceOver reads page content in logical order
- [ ] VoiceOver correctly announces form labels, required fields, and validation errors
- [ ] `aria-expanded` updates correctly on accordion and mobile menu toggles

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0004 | Blocks US0015 | Hero section implemented for audit | Draft |
| US0005 | Blocks US0015 | What We Do section implemented for audit | Draft |
| US0006 | Blocks US0015 | How We Work section implemented for audit | Draft |
| US0007 | Blocks US0015 | Services section with accordion implemented for audit | Draft |
| US0008 | Blocks US0015 | Contact section and Footer implemented for audit | Draft |
| US0009 | Blocks US0015 | Sticky navigation implemented for keyboard navigation audit | Draft |
| US0010 | Blocks US0015 | Scroll animations implemented for `prefers-reduced-motion` verification | Draft |
| US0011 | Blocks US0015 | Mobile navigation implemented for ARIA and keyboard audit | Draft |
| US0012 | Blocks US0015 | Contact form implemented for label association and keyboard audit | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| axe-core browser extension or CLI | Tool | Available |
| WebAIM Contrast Checker | Tool | Available |
| VoiceOver (macOS) | Tool | Available |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
