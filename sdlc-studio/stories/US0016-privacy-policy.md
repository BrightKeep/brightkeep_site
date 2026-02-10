# US0016: Create Privacy Policy Page

> **Status:** Done
> **Epic:** [EP0005: Quality, SEO & Compliance](../epics/EP0005-quality-seo-and-compliance.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As an** Enterprise Erin (Digital Transformation Lead conducting procurement due diligence)
**I want** a privacy policy page that explains how BrightKeep handles my data
**So that** I can verify the company meets our organisation's data handling requirements and include them in our vendor evaluation shortlist

## Context

### Persona Reference
**Enterprise Erin** - Digital Transformation Lead / Head of Technology / Procurement Manager, Advanced technical proficiency. Procurement requires verifiable business details, legal compliance, and a privacy policy. A missing privacy policy is a disqualifying factor in enterprise vendor evaluation.
[Full persona details](../personas.md#enterprise-erin)

### Background
Australian Privacy Principles (APPs) under the Privacy Act 1988 require organisations to have a clearly expressed and up-to-date privacy policy. BrightKeep collects personal information through the contact form (Name, Email, Company, Message) submitted via Formspree, and may collect analytics data through a privacy-respecting analytics provider (TBD). The privacy policy must explain what data is collected, how it is used, what third parties receive the data, cookie usage, and how individuals can request access to or deletion of their data. The page must be accessible from the site footer, styled consistently with the rest of the site, and available at the `/privacy` URL.

---

## Acceptance Criteria

### AC1: Privacy Page Accessible at /privacy
**Given** a visitor or search engine requests the `/privacy` URL
**When** the page loads
**Then** a dedicated privacy policy page is rendered as a separate Astro page (not a section on the homepage), with the full privacy policy content

### AC2: Australian Privacy Act Compliant Content
**Given** the privacy policy page is rendered
**When** a visitor reads the content
**Then** the policy covers all required topics: what personal information is collected (form submissions: Name, Email, Company, Message), how the information is used (responding to enquiries), analytics data collection (provider TBD, cookieless), cookies, third-party services (Formspree, analytics provider), data retention, individual rights (access, correction, deletion requests), and contact details for privacy enquiries (contact@brightkeep.com.au)

### AC3: Linked from Footer
**Given** a visitor is on any page of the site (homepage or privacy page)
**When** they scroll to or view the footer
**Then** there is a visible "Privacy Policy" link in the footer that navigates to the `/privacy` page

### AC4: Consistent Styling with Main Site
**Given** the privacy policy page is rendered
**When** a visitor views the page
**Then** it uses the same base layout as the main site (including navigation bar and footer), the same typography (Inter), the same colour palette (Navy, Off-White, Charcoal), and has a clean, readable text layout appropriate for long-form content

### AC5: Privacy Contact Information
**Given** a visitor reads the privacy policy
**When** they reach the contact section of the policy
**Then** the policy states that privacy enquiries can be directed to contact@brightkeep.com.au and provides the company name (BrightKeep) and location (Melbourne, VIC, Australia)

---

## Scope

### In Scope
- New Astro page at `src/pages/privacy.astro` rendering at `/privacy`
- Privacy policy content based on an Australian Privacy Act compliant template
- Coverage of: data collected via contact form (Formspree), analytics (provider TBD), cookies, third-party services, data retention, individual rights, contact for privacy queries
- Privacy contact email: contact@brightkeep.com.au
- Consistent styling using the base layout (nav, footer, typography, colours)
- Clean long-form content layout (readable line length, appropriate spacing)
- "Privacy Policy" link added to the footer (if not already present from US0008)
- SEO meta tags for the privacy page (title: "Privacy Policy | BrightKeep", description)

### Out of Scope
- Legal review of the privacy policy (flagged as an open question for stakeholder)
- Cookie consent banner (all candidate analytics providers are cookieless)
- Terms of Service page (deferred)
- GDPR-specific compliance (Australian Privacy Act is the target)
- Dynamic content or user-specific data display
- Privacy policy for non-website services (only covers the website)

---

## Technical Notes

- Create `src/pages/privacy.astro` which imports and uses the same base layout component as `index.astro`. This ensures the nav, footer, fonts, and global styles are consistent.
- The privacy policy content can be written directly in the Astro template or as a Markdown file rendered via Astro's content collections (either approach works; direct template is simpler for a single page).
- Use Tailwind prose classes (`prose prose-lg`) for the long-form content to ensure readable typography with appropriate heading sizes, paragraph spacing, and list formatting.
- The page should have its own `<title>` and meta description. Update the SEO component (from US0014) to accept per-page props.
- The footer "Privacy Policy" link should use a standard `<a href="/privacy">` tag. If using Astro's routing, this will work as a static page link.
- Content sections to include in the privacy policy:
  1. Introduction (who we are, what this policy covers)
  2. Information we collect (form submissions: Name, Email, Company, Message)
  3. How we use your information (responding to enquiries)
  4. Third-party services (Formspree for form handling, analytics provider TBD)
  5. Cookies and tracking (minimal; analytics provider is cookieless)
  6. Data retention (how long form data is kept)
  7. Your rights (access, correction, deletion under Australian Privacy Principles)
  8. Changes to this policy
  9. Contact us (contact@brightkeep.com.au, BrightKeep, Melbourne VIC Australia)
- Last updated date should be displayed at the top of the policy.
- The navigation bar on the privacy page should link back to homepage sections. The logo click should navigate to `/` (homepage).

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Visitor navigates to `/privacy` directly (not from footer link) | Page loads correctly with full layout (nav, footer, content) |
| Search engine indexes the privacy page | Page has its own meta title, description, and canonical URL; appears correctly in search results |
| Visitor clicks browser back button from privacy page | Returns to the homepage at their previous scroll position |
| Visitor clicks a nav link (e.g., "Services") on the privacy page | Navigates to the homepage and scrolls to the Services section |
| Privacy page viewed on mobile | Content is readable; layout is responsive; nav shows hamburger menu |
| Footer link to privacy page works from both homepage and privacy page | Link correctly navigates to `/privacy` from any page |
| Analytics provider changes in the future | Privacy policy content references the analytics provider generically; easy to update the specific provider name |

---

## Test Scenarios

- [ ] `/privacy` URL returns the privacy policy page (HTTP 200)
- [ ] Privacy page uses the same base layout (nav and footer) as the homepage
- [ ] Privacy page has its own meta title: "Privacy Policy | BrightKeep"
- [ ] Privacy page has its own meta description relevant to the privacy policy
- [ ] Privacy policy covers data collected via contact form (Name, Email, Company, Message)
- [ ] Privacy policy mentions Formspree as a third-party form handler
- [ ] Privacy policy addresses analytics data collection (provider TBD, cookieless)
- [ ] Privacy policy covers cookies and tracking technologies
- [ ] Privacy policy explains individual rights (access, correction, deletion)
- [ ] Privacy policy includes contact email: contact@brightkeep.com.au
- [ ] Privacy policy includes company location: Melbourne, VIC, Australia
- [ ] Footer on the homepage contains a "Privacy Policy" link to `/privacy`
- [ ] Footer on the privacy page contains a "Privacy Policy" link (current page)
- [ ] Privacy page is responsive and readable on mobile (375px viewport)
- [ ] Navigation links on the privacy page correctly navigate to homepage sections
- [ ] BrightKeep logo on the privacy page links to the homepage (`/`)

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks US0016 | Astro project setup with page routing support | Draft |
| US0002 | Blocks US0016 | Base layout component with nav, footer, typography, and colour system | Draft |
| US0008 | Blocks US0016 | Footer component with "Privacy Policy" link placeholder | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Australian Privacy Act compliant template | Content | Available (public templates exist) |
| Legal review (recommended pre-launch) | Review | Pending stakeholder decision |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
