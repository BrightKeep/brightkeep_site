# US0008: Build Footer

> **Status:** Done
> **Epic:** [EP0002: Site Content Sections](../epics/EP0002-site-content-sections.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As an** Enterprise Erin (Digital Transformation Lead)
**I want** to see verifiable company details including ABN, location, contact email, and legal links in the site footer
**So that** I can verify BrightKeep's legitimacy as part of my organisation's due diligence process before recommending them as a potential partner

## Context

### Persona Reference
**Enterprise Erin** - Digital Transformation Lead / Head of Technology / Procurement Manager, Advanced technical proficiency. Verifies company details in footer (ABN, location, email). Risk-averse organisation requires external partners to look established and credible. Procurement requires verifiable business details.
[Full persona details](../personas.md#enterprise-erin)

### Background
The footer is a critical trust signal for Enterprise Erin's procurement-oriented evaluation process. In enterprise vendor assessment, verifiable company details (ABN, registered location, contact information) are table stakes -- their absence would disqualify BrightKeep from consideration. The footer also provides legal compliance through Privacy Policy and Terms of Service links, which are requirements for enterprise procurement due diligence. For Startup Sam, the footer provides a secondary confirmation of legitimacy. For Leader Lee, the LinkedIn link offers a way to research the company further. The navy background ties the footer to the hero section visually, creating a bookend effect. The footer is not a marketing section -- it is a utility section focused on trust, compliance, and findability.

---

## Acceptance Criteria

### AC1: Footer displays with correct background and layout

**Given** a visitor scrolls to the bottom of the page
**When** the footer enters the viewport
**Then** a `<footer>` element is displayed with a navy (`#1B2A4A`) background and light text (white or off-white), providing a clear visual boundary from the content sections above

### AC2: Company identity and details are displayed correctly

**Given** a visitor views the footer content
**When** they read the company information
**Then** the following details are displayed:
- Company name and tagline: "BrightKeep - Digital Business & Product Development"
- ABN: "70 667 383 477" (clearly labelled as "ABN")
- Location: "Melbourne, VIC, Australia"
- Contact email: "contact@brightkeep.com.au" as a clickable `mailto:` link

### AC3: LinkedIn icon/link is present

**Given** a visitor views the footer
**When** they look for social media links
**Then** a LinkedIn icon is displayed as a link. The link may be a placeholder URL (e.g., `https://linkedin.com/company/brightkeep`) until the company page is created. The link opens in a new tab with `rel="noopener noreferrer"`.

### AC4: Copyright and legal links are displayed

**Given** a visitor views the footer
**When** they look for legal information
**Then** the following are displayed:
- Copyright notice: "(c) 2026 BrightKeep. All rights reserved." (or the copyright symbol)
- A "Privacy Policy" link pointing to `/privacy`
- A "Terms of Service" link (placeholder URL or anchor until content is created)

### AC5: Footer is responsive and accessible

**Given** a visitor views the footer on any device
**When** the viewport width is 375px, 768px, 1024px, or 1440px
**Then** the footer layout adjusts appropriately (e.g., multi-column on desktop, stacked on mobile), all text remains readable, all links and touch targets meet the 44x44px minimum on mobile, and the footer uses semantic `<footer>` HTML

---

## Scope

### In Scope
- Footer Astro component (`Footer.astro`)
- Company name and tagline: "BrightKeep - Digital Business & Product Development"
- ABN: 70 667 383 477 (labelled)
- Location: Melbourne, VIC, Australia
- Contact email: contact@brightkeep.com.au (as `mailto:` link)
- LinkedIn icon/link (placeholder URL until company page is created)
- Copyright: "(c) 2026 BrightKeep. All rights reserved." (using the copyright symbol)
- Privacy Policy link to `/privacy`
- Terms of Service link (placeholder)
- Navy (`#1B2A4A`) background with white/light text
- Responsive layout across 375px, 768px, 1024px, 1440px breakpoints
- Semantic `<footer>` HTML element
- All external links with `target="_blank" rel="noopener noreferrer"`
- LinkedIn icon as inline SVG

### Out of Scope
- Privacy Policy page content (EP0005)
- Terms of Service page content (not in v1 scope, link is placeholder)
- Actual LinkedIn company page (placeholder link)
- Newsletter signup or additional footer widgets
- Back-to-top button (could be added in EP0003)
- Sitemap link
- Cookie consent or preference centre

---

## Technical Notes

### Astro Component
Create `src/components/Footer.astro`. Structure:

```astro
<footer class="bg-navy text-white py-12 md:py-16" role="contentinfo">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Column 1: Company identity -->
      <div>
        <p class="font-semibold text-lg">BrightKeep</p>
        <p class="text-sm text-white/70">Digital Business & Product Development</p>
      </div>
      <!-- Column 2: Contact details -->
      <div>
        <p>ABN: 70 667 383 477</p>
        <p>Melbourne, VIC, Australia</p>
        <a href="mailto:contact@brightkeep.com.au">contact@brightkeep.com.au</a>
      </div>
      <!-- Column 3: Social + Legal -->
      <div>
        <a href="https://linkedin.com/company/brightkeep" target="_blank" rel="noopener noreferrer" aria-label="BrightKeep on LinkedIn">
          <!-- LinkedIn SVG icon -->
        </a>
      </div>
    </div>
    <hr class="border-white/20 my-8" />
    <div class="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
      <p>&copy; 2026 BrightKeep. All rights reserved.</p>
      <div class="flex gap-4 mt-4 md:mt-0">
        <a href="/privacy" class="hover:text-white">Privacy Policy</a>
        <a href="/terms" class="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

### Tailwind Approach
- Footer background: `bg-[#1B2A4A]` or custom `bg-navy` design token
- Primary text: `text-white`
- Secondary/muted text: `text-white/70` or `text-white/60`
- Grid layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Links: `text-white/70 hover:text-white transition-colors` or `hover:text-[#FF6B6B]` for accent hover
- Divider: `<hr class="border-white/20 my-8" />`
- Copyright bar: `flex flex-col md:flex-row justify-between items-center text-sm`
- LinkedIn icon: `w-6 h-6 text-white hover:text-[#FF6B6B]` or brand LinkedIn blue on hover

### Semantic HTML
- `<footer role="contentinfo">` -- semantic footer element with explicit role for older assistive tech
- `<a href="mailto:...">` for email link
- `<a href="..." target="_blank" rel="noopener noreferrer">` for external LinkedIn link
- `aria-label="BrightKeep on LinkedIn"` on the LinkedIn icon link (icon-only link needs accessible name)
- Text elements as `<p>` tags
- Divider as `<hr>` (thematic break between content and legal)

### LinkedIn SVG Icon
Use the standard LinkedIn logo as a simple inline SVG path. Keep it compact (single `<path>` element) and style with Tailwind classes:
```html
<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
```

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| LinkedIn company page does not exist yet | Placeholder URL (`https://linkedin.com/company/brightkeep`) is used; link opens LinkedIn (may show "page not found" on LinkedIn's side); this is acceptable for v1 launch |
| Privacy Policy page (`/privacy`) does not exist yet | Link is present and points to `/privacy`; if the page is not yet built (EP0005), clicking will result in a 404; the link is structurally correct and ready for the page |
| Visitor clicks `mailto:` link on a device without a configured email client | Browser handles the `mailto:` protocol natively; may show a system dialog or do nothing depending on OS/browser; the email address is also visible as plain text for copy-paste |
| Very narrow mobile viewport (320px) | Footer content stacks in a single column; all text wraps within viewport bounds; no horizontal scrolling |
| User zooms to 200% on desktop | Footer layout reflows to stacked columns; all content remains readable and links are clickable |
| Screen reader navigates to the footer | `<footer>` landmark is announced; all links have accessible text (icon-only LinkedIn link has `aria-label`); email link is announced as a `mailto:` link |
| Colour-blind user reads the footer | All information is conveyed through text, not colour alone; link hover states have underline or other non-colour indicator |
| Copyright year becomes outdated (2027+) | Year is hardcoded as "2026"; a future story or maintenance task should make this dynamic or update it annually |
| User right-clicks to copy email address | Email address text is selectable and copyable; `mailto:` link does not prevent standard browser copy behaviour |

---

## Test Scenarios

- [ ] **TS1:** Footer renders with navy (`#1B2A4A`) background and light/white text
- [ ] **TS2:** Footer uses a semantic `<footer>` HTML element
- [ ] **TS3:** Company name "BrightKeep" and tagline "Digital Business & Product Development" are displayed
- [ ] **TS4:** ABN "70 667 383 477" is displayed and clearly labelled as "ABN"
- [ ] **TS5:** Location "Melbourne, VIC, Australia" is displayed
- [ ] **TS6:** Contact email "contact@brightkeep.com.au" is displayed as a clickable `mailto:` link
- [ ] **TS7:** LinkedIn icon is present and rendered as a link with `target="_blank"` and `rel="noopener noreferrer"` attributes
- [ ] **TS8:** LinkedIn icon link has an accessible name (via `aria-label` or equivalent)
- [ ] **TS9:** Copyright notice displays "(c) 2026 BrightKeep. All rights reserved." (with copyright symbol)
- [ ] **TS10:** "Privacy Policy" link is present and points to `/privacy`
- [ ] **TS11:** "Terms of Service" link is present (with placeholder URL)
- [ ] **TS12:** Footer layout displays in multi-column format at 1024px desktop viewport
- [ ] **TS13:** Footer layout stacks to single column at 375px mobile viewport
- [ ] **TS14:** All footer links and interactive elements meet the 44x44px minimum touch target on mobile
- [ ] **TS15:** Colour contrast between footer text and navy background meets WCAG AA ratio
- [ ] **TS16:** Footer renders correctly at all four breakpoints (375px, 768px, 1024px, 1440px) with no horizontal scrolling
- [ ] **TS17:** All external links (LinkedIn) open in a new tab and include `rel="noopener noreferrer"`
- [ ] **TS18:** Footer content is readable and all links functional with JavaScript disabled

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project initialised with base layout and page structure | Draft |
| US0002 | Blocks | Tailwind CSS configured with BrightKeep design tokens (colours, fonts, spacing) | Draft |
| US0007 | Sequence | Services Detail section sits above the footer in page order; not a hard blocker | Draft |

### External Dependencies

| Dependency | Type | What's Needed | Status |
|------------|------|---------------|--------|
| Google Fonts | Runtime | Inter font family loaded for body text | Not Started |
| LinkedIn company page | External | Company page created on LinkedIn; placeholder URL used until ready | Not Started |
| Privacy Policy page | Internal (EP0005) | `/privacy` page built and deployed; link is present regardless | Not Started |
| Terms of Service page | Internal | `/terms` page or content created; placeholder link used until ready | Not Started |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

**Rationale:** Static content section with no interactivity beyond standard links. Responsive multi-column to single-column layout is straightforward with Tailwind. LinkedIn SVG icon is a known pattern. No expand/collapse, no animations, no form elements. The main effort is ensuring all content is correct and the layout is clean across breakpoints.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
