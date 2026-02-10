# Product Requirements Document

**Project:** BrightKeep - Digital Consultancy Website
**Version:** 1.1.0
**Last Updated:** 2026-02-10
**Status:** Draft
**Source:** Based on `10-company-website-requirements.md` v1.0 by Lachlan Bartlett (Product)

---

## 1. Project Overview

### Product Name
BrightKeep Company Website

### Purpose
Single-page marketing website for a Digital Business & Product Development Company. The site serves as the primary digital presence, establishing credibility, communicating services, and generating inbound enquiries from business owners, engineering leaders, and enterprises seeking digital solutions or delivery consulting.

### Tech Stack
- **Framework:** Astro (static site builder, zero JS by default with component islands)
- **Styling:** Tailwind CSS for utility-first design system
- **Animations:** GSAP with ScrollTrigger for professional scroll animations and micro-interactions
- **Fonts:** Inter (Google Fonts) for headings and body; JetBrains Mono for code/mono elements
- **Hosting:** GitHub Pages with GitHub Actions CI/CD
- **Analytics:** Privacy-respecting provider (TBD - Plausible, Fathom, or Umami)
- **Form Handling:** Formspree (third-party, free tier 50 submissions/month)
- **CI/CD:** GitHub Actions deploying to GitHub Pages

### Architecture Pattern
Static single-page application built with Astro. Semantic HTML with Tailwind CSS for layout and styling. GSAP ScrollTrigger for scroll-driven animations (fade-ins, slide-ups, parallax effects) to achieve a polished, professional feel. No client-side framework required. External integrations limited to analytics, font loading, and Formspree for form submission handling. Deployed as static files to GitHub Pages via GitHub Actions.

---

## 2. Problem Statement

### Problem Being Solved
The company lacks a digital presence to establish credibility, communicate its service offerings, and convert interest into business enquiries. Without a professional website, potential clients cannot evaluate the company's expertise, services, or approach before making contact.

### Target Users
- **Primary:** Business owners and founders who need digital solutions built or improved
- **Secondary:** CTOs, Heads of Product, and Engineering Leaders seeking consulting on delivery practices
- **Tertiary:** Enterprises looking for an external partner to modernise their digital delivery capability

### Context
The company positions itself as consultative services and technology solutions founded on decades of industry experience delivering in the digital sector. The website must reflect this positioning: experienced but not stuffy, technical but accessible, confident without arrogance. Mobile traffic is expected to account for 60%+ of visits.

---

## 3. Feature Inventory

| Feature | Description | Status | Priority | Location |
|---------|-------------|--------|----------|----------|
| F001: Hero Section | Full-width hero establishing identity and value proposition | Not Started | Must-Have | Section 1 |
| F002: Services Overview | Two-column card layout for Development and Consulting pillars | Not Started | Must-Have | Section 2 |
| F003: Methodology Grid | Six-tile grid communicating working principles | Not Started | Must-Have | Section 3 |
| F004: Services Detail | Accordion or grid list of specific service offerings | Not Started | Should-Have | Section 4 |
| F005: Contact CTA | Contact form via Formspree for enquiries | Not Started | Must-Have | Section 5 |
| F006: Footer | Legal essentials, company info, and secondary navigation | Not Started | Must-Have | Section 6 |
| F007: Responsive Design | Mobile-first responsive layout across all breakpoints | Not Started | Must-Have | Cross-cutting |
| F008: Accessibility | WCAG 2.1 AA compliance throughout | Not Started | Must-Have | Cross-cutting |
| F009: SEO Optimisation | Meta tags, structured data, sitemap, robots.txt | Not Started | Must-Have | Cross-cutting |
| F010: Analytics Integration | Privacy-respecting analytics with form and scroll tracking | Not Started | Should-Have | Cross-cutting |
| F011: Navigation | Sticky/smooth-scroll navigation between sections | Not Started | Should-Have | Cross-cutting |
| F012: Scroll Animations | GSAP ScrollTrigger-powered professional scroll animations | Not Started | Must-Have | Cross-cutting |
| F013: Privacy Policy | Privacy policy page using compliant template | Not Started | Must-Have | Separate page |
| F014: GitHub Pages Deployment | GitHub Actions CI/CD pipeline deploying Astro to GitHub Pages | Not Started | Must-Have | Infrastructure |

### Feature Details

#### F001: Hero Section

**User Story:** As a visitor, I want to immediately understand what this company does so that I can decide whether to continue reading.

**Acceptance Criteria:**
- [ ] Full-width section with navy (`#1B2A4A`) background and white text
- [ ] Headline: "Digital Solutions. Decades of Delivery."
- [ ] Subheadline communicating company positioning (digital business and product development)
- [ ] Primary CTA button ("Talk to Us") in Coral Pink (`#FF6B6B`) linking to contact section
- [ ] Subtle geometric pattern or gradient background (no hero image required)
- [ ] Professional credibility established within 5 seconds of landing
- [ ] Renders correctly at all breakpoints (375px, 768px, 1024px, 1440px)

**Dependencies:** None (brand colours and company name confirmed)
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F002: Services Overview (What We Do)

**User Story:** As a visitor, I want to quickly understand the two service pillars so that I can identify which offering is relevant to my needs.

**Acceptance Criteria:**
- [ ] Section heading: "What We Do"
- [ ] Two-column card layout on desktop, stacked on mobile
- [ ] Card 1: "Digital Product Development" with description and 4 bullet points
- [ ] Card 2: "Digital Delivery Consulting" with description and 4 bullet points
- [ ] Each card has an icon, heading, summary paragraph, and bullet list
- [ ] Off-white (`#F8F9FA`) background
- [ ] Clear understanding of services achievable within 30 seconds of scrolling
- [ ] Cards have equal visual weight

**Dependencies:** F001 (Hero establishes context)
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F003: Methodology Grid (How We Work)

**User Story:** As a visitor, I want to understand the company's working principles so that I can assess cultural and methodological fit.

**Acceptance Criteria:**
- [ ] Section heading: "How We Work"
- [ ] Three-column icon grid on desktop, stacked on mobile
- [ ] Six tiles: Problem First, Evidence Over Opinion, Ship and Learn, AI Where It Counts, Sustainable Pace, Your Capability Not Ours
- [ ] Each tile has an icon, title, and description paragraph
- [ ] Navy section with white text and accent icon highlights
- [ ] All tiles visible without horizontal scrolling at every breakpoint

**Dependencies:** None
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F004: Services Detail

**User Story:** As a visitor, I want a detailed breakdown of specific service offerings so that I can identify exactly what I might engage for.

**Acceptance Criteria:**
- [ ] Section heading: "Services"
- [ ] Compact accordion or grid list layout
- [ ] Development Services: 5 items (Custom Software, AI/ML Integration, Product Discovery, Legacy Modernisation, Cloud Architecture)
- [ ] Consulting Services: 6 items (Agile Coaching, DORA Metrics, DevOps/CI-CD, EngOps/DX, Team Structure, Technical Due Diligence)
- [ ] White background with subtle borders
- [ ] Accordion items expand/collapse with smooth GSAP animation

**Dependencies:** None
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F005: Contact CTA (Let's Talk)

**User Story:** As a visitor, I want to easily get in touch so that I can start a conversation about my needs.

**Acceptance Criteria:**
- [ ] Section heading: "Let's Talk"
- [ ] Navy background, centred content, accent CTA
- [ ] Body copy setting expectation: "No pitch decks, no jargon. Just a practical conversation."
- [ ] Primary CTA button: "Get in Touch" in Coral Pink (`#FF6B6B`)
- [ ] Contact form with fields: Name (required), Email (required), Company (optional), "What can we help with?" textarea (optional)
- [ ] Form submits to Formspree endpoint
- [ ] Form validation with clear error messages (client-side)
- [ ] Formspree handles spam filtering and rate limiting
- [ ] Success confirmation displayed after submission
- [ ] Form submission triggers analytics event (when analytics configured)

**Dependencies:** Formspree account and endpoint configured
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F006: Footer

**User Story:** As a visitor, I want to find legal and contact information so that I can verify the company's legitimacy.

**Acceptance Criteria:**
- [ ] Navy background, light text, minimal layout
- [ ] Company name and tagline: "BrightKeep - Digital Business & Product Development"
- [ ] ABN displayed: 70 667 383 477
- [ ] Location: Melbourne, VIC, Australia
- [ ] Contact email: contact@brightkeep.com.au
- [ ] LinkedIn icon/link (placeholder until company page created)
- [ ] Copyright notice: "(c) 2026 BrightKeep. All rights reserved."
- [ ] Links to Privacy Policy and Terms of Service

**Dependencies:** LinkedIn company page (can launch with placeholder)
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F007: Responsive Design

**User Story:** As a mobile visitor, I want the site to be fully usable on my device so that I can learn about the company on any screen.

**Acceptance Criteria:**
- [ ] Mobile-first CSS approach
- [ ] Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
- [ ] Touch targets minimum 44x44px on mobile
- [ ] No horizontal scrolling at any breakpoint
- [ ] Typography scales appropriately across breakpoints
- [ ] Navigation is usable on mobile (hamburger menu or simplified nav)
- [ ] Cards stack vertically on mobile, display side-by-side on desktop

**Dependencies:** All section features (F001-F006)
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F008: Accessibility

**User Story:** As a user with accessibility needs, I want the site to be navigable and readable so that I can access all content.

**Acceptance Criteria:**
- [ ] WCAG 2.1 AA compliance minimum
- [ ] Semantic HTML throughout (header, nav, main, section, footer, article)
- [ ] All interactive elements keyboard-navigable
- [ ] Colour contrast ratios validated against palette (all combinations)
- [ ] Alt text on all images (if any used)
- [ ] Skip-to-content link as first focusable element
- [ ] Focus indicators visible on all interactive elements
- [ ] Form labels associated with inputs
- [ ] ARIA attributes where semantic HTML is insufficient

**Dependencies:** None
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F009: SEO Optimisation

**User Story:** As a search engine crawler, I want structured and optimised content so that the site ranks well for relevant queries.

**Acceptance Criteria:**
- [ ] Semantic heading hierarchy: single H1, structured H2/H3
- [ ] Meta title and description optimised for "BrightKeep digital consultancy Melbourne"
- [ ] Open Graph meta tags for social sharing
- [ ] Twitter Card meta tags
- [ ] Schema.org structured data: Organization and LocalBusiness (Melbourne, VIC, Australia)
- [ ] sitemap.xml generated by Astro sitemap integration
- [ ] robots.txt configured
- [ ] Canonical URL set
- [ ] All pages/sections use descriptive IDs for deep linking

**Dependencies:** Domain confirmed
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F010: Analytics Integration

**User Story:** As a business owner, I want to understand how visitors interact with the site so that I can measure effectiveness and improve.

**Acceptance Criteria:**
- [ ] Privacy-respecting analytics installed (provider TBD - Plausible, Fathom, or Umami)
- [ ] Page view tracking active
- [ ] Contact form submission tracked as conversion event
- [ ] Scroll depth tracking enabled (optional enhancement)
- [ ] No personal data collected without consent
- [ ] Analytics script loaded asynchronously (no render blocking)
- [ ] Site architected so analytics provider can be swapped easily (single integration point)

**Dependencies:** Analytics provider to be selected before launch
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F011: Navigation

**User Story:** As a visitor, I want to quickly jump to relevant sections so that I can find what I need without excessive scrolling.

**Acceptance Criteria:**
- [ ] Navigation links to all major sections (What We Do, How We Work, Services, Contact)
- [ ] Smooth scroll behaviour on anchor links (GSAP-powered)
- [ ] Sticky navigation on desktop (stays visible while scrolling)
- [ ] Mobile-friendly navigation (hamburger menu or collapsible)
- [ ] Active section highlighted in navigation (ScrollTrigger-driven)
- [ ] Navigation does not obscure content

**Dependencies:** All section IDs defined
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F012: Scroll Animations

**User Story:** As a visitor, I want the site to feel polished and professional with smooth animations as I scroll so that the company appears credible and modern.

**Acceptance Criteria:**
- [ ] GSAP with ScrollTrigger loaded and initialised
- [ ] Hero section: subtle entrance animation on headline and CTA (fade-up, staggered)
- [ ] Services cards: staggered reveal on scroll (fade-up or slide-in)
- [ ] Methodology tiles: sequential fade-in on scroll
- [ ] Services detail section: smooth accordion open/close transitions
- [ ] Contact form section: fade-in on scroll
- [ ] Navigation: smooth scroll with GSAP-controlled easing
- [ ] All animations respect `prefers-reduced-motion` media query (disable when set)
- [ ] Animations do not cause layout shifts (CLS = 0)
- [ ] GSAP loaded efficiently (tree-shaken, only ScrollTrigger plugin imported)
- [ ] Total GSAP bundle < 50KB gzipped

**Dependencies:** None
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F013: Privacy Policy

**User Story:** As a visitor, I want to read the privacy policy so that I understand how my data is handled.

**Acceptance Criteria:**
- [ ] Privacy policy accessible from footer link
- [ ] Displayed as a separate Astro page (/privacy)
- [ ] Generated from a compliant Australian privacy policy template
- [ ] Covers: data collected (form submissions, analytics), how it's used, third-party sharing (Formspree, analytics provider), cookies, contact for data requests
- [ ] Contact email for privacy enquiries: contact@brightkeep.com.au
- [ ] Meets Australian Privacy Act requirements

**Dependencies:** None (template-based approach, refine before launch)
**Status:** Not Started
**Confidence:** [HIGH]

---

#### F014: GitHub Pages Deployment

**User Story:** As a developer, I want automated deployment so that changes pushed to the main branch are automatically built and deployed.

**Acceptance Criteria:**
- [ ] GitHub Actions workflow builds Astro site on push to main
- [ ] Built output deployed to GitHub Pages
- [ ] HTTPS enforced via GitHub Pages settings
- [ ] Custom domain configured (when domain is ready)
- [ ] Build fails visibly on errors (no silent failures)
- [ ] Deployment completes in < 2 minutes

**Dependencies:** GitHub repository created
**Status:** Not Started
**Confidence:** [HIGH]

---

## 4. Functional Requirements

### Core Behaviours
- Page loads as a single continuous scroll with distinct visual sections
- GSAP ScrollTrigger animations fire as sections enter the viewport
- Navigation provides smooth scrolling to anchored sections (GSAP-powered)
- Contact form validates required fields (Name, Email) before submission
- Contact form submits to Formspree endpoint via AJAX (no page redirect)
- Success/error states displayed clearly after form submission
- Accordion/expandable elements toggle with smooth GSAP transitions
- All external links open in new tab with `rel="noopener noreferrer"`
- All animations disabled when `prefers-reduced-motion: reduce` is set

### Input/Output Specifications
- **Contact Form Input:** Name (text, required), Email (email, required, validated), Company (text, optional), Message (textarea, optional)
- **Contact Form Output:** Submission confirmation to user; enquiry delivered to company email
- **Analytics Input:** Page views, scroll events, form submissions
- **Analytics Output:** Dashboard via analytics provider

### Business Logic Rules
- Form email field must pass email format validation
- Formspree handles spam filtering, rate limiting, and delivery
- Analytics must not collect personally identifiable information without consent
- Animations must respect accessibility preferences (`prefers-reduced-motion`)

---

## 5. Non-Functional Requirements

### Performance
- Lighthouse score > 90 across all categories (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint < 1.5 seconds
- Total page weight < 500KB (excluding fonts)
- No render-blocking JavaScript
- Images optimised (WebP with fallbacks) if any are used
- Font loading optimised (font-display: swap)

### Security
- HTTPS enforced via GitHub Pages
- Form submissions handled by Formspree (CSRF protection built-in)
- No sensitive data stored client-side
- `rel="noopener noreferrer"` on all external links
- Formspree handles spam filtering and rate limiting

### Scalability
- Static site served via GitHub Pages CDN (unlimited concurrent users)
- No server-side scaling concerns (static hosting)
- Formspree free tier supports 50 submissions/month (upgrade available if needed)

### Availability
- 99.9% uptime via GitHub Pages SLA
- No database or server-side dependencies for page rendering
- Graceful degradation if analytics or Formspree is unavailable

---

## 6. AI/ML Specifications

> Not applicable for v1. No AI/ML components in the marketing website.

---

## 7. Data Architecture

### Data Models
- **Contact Enquiry:** Name (string), Email (string), Company (string, nullable), Message (string, nullable), Submitted At (timestamp)

### Relationships and Constraints
- No persistent data storage on the website itself
- Form submissions stored by form handling service or delivered directly via email

### Storage Mechanisms
- Website content: Static files served from GitHub Pages CDN
- Form data: Stored and forwarded by Formspree to contact@brightkeep.com.au
- Analytics data: Stored by analytics provider (TBD)

---

## 8. Integration Map

### External Services
| Service | Purpose | Required |
|---------|---------|----------|
| Google Fonts | Inter + JetBrains Mono font loading | Yes |
| Formspree | Contact form submission handling | Yes |
| GSAP | ScrollTrigger animation library (npm package) | Yes |
| Analytics Provider | TBD - Plausible, Fathom, or Umami | Yes (pre-launch) |
| GitHub Pages | Static site hosting | Yes |
| GitHub Actions | CI/CD build and deployment | Yes |

### Authentication Methods
- No user authentication required
- Formspree endpoint uses public form ID (spam protection via Formspree's built-in features)

### Third-Party Dependencies
- Google Fonts CDN (fonts)
- GSAP + ScrollTrigger (npm, bundled at build time)
- Tailwind CSS (npm, build-time only)
- Formspree (runtime, form submissions)
- Analytics provider script (async loaded, TBD)

---

## 9. Configuration Reference

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PUBLIC_FORMSPREE_ID` | Formspree form endpoint ID | Yes | - |
| `PUBLIC_SITE_URL` | Canonical site URL | Yes | - |
| `PUBLIC_ANALYTICS_ID` | Analytics provider site ID | No | - |

### Feature Flags
- Analytics integration: enabled when `PUBLIC_ANALYTICS_ID` is set
- Scroll depth tracking: enabled/disabled via analytics config

---

## 10. Quality Assessment

### Tested Functionality
- Not yet applicable (greenfield project)

### Untested Areas
- All features pending implementation

### Technical Debt
- None (greenfield)

---

## 11. Resolved Decisions

| # | Question | Decision | Date |
|---|----------|----------|------|
| 1 | Company name | **BrightKeep** | 2026-02-10 |
| 2 | Static site framework | **Astro** | 2026-02-10 |
| 3 | Hosting platform | **GitHub Pages** with GitHub Actions CI/CD | 2026-02-10 |
| 4 | Accent colour | **Coral Pink `#FF6B6B`** | 2026-02-10 |
| 5 | Animation approach | **GSAP ScrollTrigger** for professional scroll animations | 2026-02-10 |
| 6 | Form handling | **Formspree** (free tier, 50 submissions/month) | 2026-02-10 |
| 7 | "Book a Call" CTA | **Deferred to post-launch** | 2026-02-10 |
| 8 | Privacy Policy | **Compliant template**, refine before launch | 2026-02-10 |
| 9 | Experience Stats section | **Removed** from v1 | 2026-02-10 |
| 10 | ABN | **70 667 383 477** | 2026-02-10 |
| 11 | Physical location | **Melbourne, VIC, Australia** | 2026-02-10 |
| 12 | Contact email | **contact@brightkeep.com.au** | 2026-02-10 |
| 13 | LinkedIn URL | **Placeholder** - company page not yet created | 2026-02-10 |

## 12. Open Questions

- **Q:** Which analytics provider?
  **Context:** Plausible, Fathom, and Umami are all cookieless options. Decision deferred. Site architected with a single integration point so provider can be swapped easily.
  **Options:** Plausible, Fathom, Umami. Decide before launch.

- **Q:** What is the custom domain?
  **Context:** Required for GitHub Pages custom domain setup, canonical URL, and SEO.
  **Options:** Pending domain registration.

---

## Out of Scope (v1)

These items are explicitly deferred per the source requirements:

- Blog / content section (v2)
- Case studies with detail pages (v2)
- Team bios and headshots (v2)
- Client portal or login (v2)
- Pricing page (v2)
- Multi-language support
- "Book a Call" calendar integration (post-launch)
- Experience stats section (removed from v1)
- Cookie consent banner (likely unnecessary - all analytics candidates are cookieless)

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.1.0 | All open questions resolved. Updated: hosting (GitHub Pages), framework (Astro), accent colour (Coral Pink), animations (GSAP), form handling (Formspree), company details. Removed Experience Stats section. Added F012 Scroll Animations and F014 GitHub Pages Deployment features. |
| 2026-02-10 | 1.0.0 | Initial PRD created from company website requirements document |

---

> **Confidence Markers:** [HIGH] clear from requirements | [MEDIUM] inferred or partially specified | [LOW] speculative
>
> **Status Values:** Complete | Partial | Stubbed | Broken | Not Started
