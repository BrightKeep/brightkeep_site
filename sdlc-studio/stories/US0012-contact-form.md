# US0012: Build Contact Form with Formspree Integration

> **Status:** Done
> **Epic:** [EP0004: Contact & Lead Generation](../epics/EP0004-contact-and-lead-generation.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Startup Sam (founder who wants to start a conversation quickly)
**I want** a simple, low-friction contact form that submits without leaving the page
**So that** I can reach out to BrightKeep in under 30 seconds without filling in unnecessary fields or waiting for a page reload

## Context

### Persona Reference
**Startup Sam** - Founder / Business Owner, Intermediate technical proficiency. Has been burned by agencies that over-promised. Doesn't want to fill in a 15-field form just to have a chat. Values speed and simplicity.
[Full persona details](../personas.md#startup-sam)

### Background
The "Let's Talk" contact section is the site's primary conversion mechanism. Every preceding section (Hero, What We Do, How We Work, Services) exists to build trust and interest so that visitors reach this form and submit an enquiry. The form must be low-friction: only Name and Email are required; Company and Message are optional. Submissions go to Formspree via AJAX (no page redirect) to maintain the single-page experience. Clear success and error feedback ensures visitors know their message was received. The section uses a navy (`#1B2A4A`) background with centred content to visually distinguish it as a call-to-action area.

---

## Acceptance Criteria

### AC1: Contact Section Layout
**Given** a visitor scrolls to the "Let's Talk" section
**When** the section is visible
**Then** it displays with a navy (`#1B2A4A`) background, centred content, a "Let's Talk" heading, body copy ("No pitch decks, no jargon. Just a practical conversation."), and the contact form below

### AC2: Form Fields Present and Correctly Configured
**Given** the contact form is rendered
**When** a visitor views the form
**Then** it contains four fields: Name (text input, required), Email (email input, required), Company (text input, optional), and Message (textarea, optional), each with a visible label associated via `for`/`id` attributes, plus a submit button styled in Coral Pink (`#FF6B6B`)

### AC3: Client-Side Validation
**Given** a visitor attempts to submit the form
**When** the Name field is empty or the Email field is empty or contains an invalid email format
**Then** the form does not submit, and clear inline error messages are displayed next to the invalid fields indicating what needs to be corrected

### AC4: AJAX Submission to Formspree
**Given** the form passes client-side validation
**When** the visitor clicks the submit button
**Then** the form data is submitted to the Formspree endpoint via an AJAX/fetch request (no full page redirect), and a loading state is shown on the submit button during the request

### AC5: Success Confirmation UI
**Given** the Formspree submission succeeds (HTTP 200 response)
**When** the response is received
**Then** the form is replaced with (or accompanied by) a success confirmation message thanking the visitor and confirming their enquiry was received, and the form fields are cleared

### AC6: Error Message UI on Failure
**Given** the Formspree submission fails (network error, HTTP 4xx/5xx)
**When** the error response or timeout is detected
**Then** an error message is displayed informing the visitor that the submission failed and suggesting they try again or email contact@brightkeep.com.au directly

### AC7: Form Keyboard Navigation
**Given** a visitor is navigating the form using a keyboard
**When** they press Tab to move between form elements
**Then** focus moves through fields in logical order (Name, Email, Company, Message, Submit) with visible focus indicators on each element

---

## Scope

### In Scope
- "Let's Talk" section with navy background, centred layout
- Heading, body copy, and contact form
- Four form fields: Name (required), Email (required), Company (optional), Message textarea (optional)
- HTML5 `required` attribute and `type="email"` for native validation
- Custom client-side JavaScript validation with inline error messages
- AJAX/fetch submission to Formspree endpoint (configured via `PUBLIC_FORMSPREE_ID` env var)
- Submit button loading state during request
- Success confirmation UI (message replaces or overlays form)
- Error message UI with fallback email address
- Form labels associated with inputs (`for`/`id`)
- Coral Pink (`#FF6B6B`) submit button with hover state
- Keyboard navigation and visible focus indicators
- Responsive layout (stacked fields on mobile, wider on desktop)

### Out of Scope
- Server-side form handling (Formspree handles this)
- Formspree account setup and endpoint configuration (operational task)
- Spam filtering (Formspree built-in)
- "Book a Call" calendar integration (deferred post-launch)
- File upload field
- CAPTCHA (Formspree includes spam protection)
- Analytics event tracking for form submission (US0013)
- Scroll animation for the contact section (US0010)

---

## Technical Notes

- The form should be an Astro component (e.g., `ContactForm.astro`) included in the Contact section.
- Use the `PUBLIC_FORMSPREE_ID` environment variable to construct the Formspree endpoint URL: `https://formspree.io/f/{PUBLIC_FORMSPREE_ID}`.
- Submit via `fetch()` with `method: 'POST'`, `headers: { 'Accept': 'application/json' }`, and `body: new FormData(form)`.
- Client-side validation should run on `submit` event. Check `name.value.trim()` is not empty and `email.value` matches a basic email regex pattern. Display error messages in `<span>` elements adjacent to each input.
- For the loading state, disable the submit button and show a spinner or "Sending..." text. Re-enable on response.
- Success state: hide the form and show a confirmation message. Consider using `gsap.to()` for a smooth fade transition if GSAP is available, otherwise use CSS transitions.
- Error state: show the error message below the form without hiding the form, so the visitor can retry.
- The form must work without JavaScript as a fallback: set the `action` attribute to the Formspree URL and `method="POST"` so that native form submission works (with a redirect). The AJAX handler should `preventDefault()` when JS is available.
- Use `aria-describedby` on inputs to associate error messages for screen readers.
- Ensure the navy background with white text and form elements meets WCAG AA contrast ratios. Form input fields should have a visible border or distinct background.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Visitor submits form with only required fields (Name, Email) | Form submits successfully; Company and Message sent as empty/null |
| Visitor enters email without @ symbol | Client-side validation catches it; inline error shown; form does not submit |
| Network is offline when form is submitted | Fetch fails; error message displayed with fallback email address |
| Formspree returns 429 (rate limited) | Error message displayed; visitor advised to try again later or email directly |
| Formspree endpoint ID is not configured (env var missing) | Form action falls back to a sensible default or shows a helpful error; form should not break silently |
| Visitor double-clicks submit button | Button is disabled after first click; prevents duplicate submissions |
| Visitor pastes an extremely long message (>10,000 chars) | Form still submits; Formspree handles any length limits on their end |
| Visitor uses autofill to populate fields | Autofilled values are accepted and validated correctly |
| JavaScript is disabled | Form submits via native HTML form submission to Formspree (with page redirect) |

---

## Test Scenarios

- [ ] "Let's Talk" section renders with navy background and centred content
- [ ] All four fields (Name, Email, Company, Message) are visible with correct labels
- [ ] Name and Email fields are marked as required; Company and Message are optional
- [ ] Submitting with empty Name field shows inline validation error
- [ ] Submitting with invalid email format shows inline validation error
- [ ] Submitting with only Name and Email filled succeeds
- [ ] Form submission sends data to Formspree via AJAX (no page redirect)
- [ ] Submit button shows loading state during submission
- [ ] Success confirmation message appears after successful submission
- [ ] Error message appears when submission fails (test with network offline or invalid endpoint)
- [ ] Error message includes fallback email (contact@brightkeep.com.au)
- [ ] Form is fully keyboard-navigable with Tab key in correct order
- [ ] All form inputs have visible focus indicators
- [ ] Labels are correctly associated with inputs (click label focuses input)
- [ ] Form works via native submission when JavaScript is disabled
- [ ] Submit button cannot be clicked twice during submission (disabled after first click)

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks US0012 | Astro project setup with Tailwind CSS and environment variable support | Draft |
| US0002 | Blocks US0012 | Base layout with section structure and Tailwind configuration | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Formspree account and form endpoint ID | Service | Pending setup |
| `PUBLIC_FORMSPREE_ID` environment variable | Configuration | Pending |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
