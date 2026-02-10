# US0013: Set Up Analytics Integration Point

> **Status:** Done
> **Epic:** [EP0004: Contact & Lead Generation](../epics/EP0004-contact-and-lead-generation.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** Leader Lee (CTO who needs to justify engagements with data)
**I want** a configurable analytics integration point that tracks key events
**So that** I can measure site effectiveness and make data-informed decisions about the company's digital presence

## Context

### Persona Reference
**Leader Lee** - CTO / Head of Product / Engineering Manager, Expert technical proficiency. Needs to justify the engagement to CFO/CEO and requires credible data on site performance and visitor engagement. Evaluates tools and approaches critically.
[Full persona details](../personas.md#leader-lee)

### Background
The analytics provider for BrightKeep has not been finalised (candidates: Plausible, Fathom, Umami -- all cookieless, privacy-respecting). Rather than commit to a specific provider now, this story creates a single, well-defined integration point in the base layout that can be configured via the `PUBLIC_ANALYTICS_ID` environment variable. When the env var is set, the analytics script loads asynchronously. When it is not set, no analytics script is injected at all. Additionally, a form submission event tracking hook is prepared so that when analytics is configured, form submissions are recorded as conversion events. This architecture allows the analytics provider to be swapped with a single configuration change.

---

## Acceptance Criteria

### AC1: Configurable Analytics Script in Base Layout
**Given** the Astro base layout renders the `<head>` section
**When** the `PUBLIC_ANALYTICS_ID` environment variable is set to a non-empty value
**Then** an analytics script tag is included in the `<head>`, configured with the provided ID, using the appropriate provider's embed code pattern

### AC2: No Script When Env Var Is Unset
**Given** the Astro base layout renders the `<head>` section
**When** the `PUBLIC_ANALYTICS_ID` environment variable is not set or is empty
**Then** no analytics script tag is included in the rendered HTML; the page loads with zero analytics overhead

### AC3: Async Loading (No Render Blocking)
**Given** the analytics script is included in the `<head>`
**When** the page loads
**Then** the analytics script uses `async` or `defer` attributes so it does not block the initial page render, and Lighthouse reports no render-blocking script from the analytics integration

### AC4: Form Submission Event Tracking Hook
**Given** analytics is configured (env var is set) and a visitor submits the contact form successfully
**When** the form submission success callback fires
**Then** a custom event (e.g., "form_submission" or equivalent) is dispatched to the analytics provider, recording the conversion

### AC5: Single Integration Point for Easy Provider Swap
**Given** a developer needs to change the analytics provider
**When** they review the codebase
**Then** the analytics integration is contained in a single file or component (e.g., `Analytics.astro` or a head fragment) with clear comments indicating where to update the provider script template, requiring no changes to other files

---

## Scope

### In Scope
- Analytics script injection in the base Astro layout `<head>`
- Conditional rendering gated by `PUBLIC_ANALYTICS_ID` env var
- `async` or `defer` attribute on the analytics script tag
- Form submission event tracking function (callable from US0012's success handler)
- Single-file analytics integration component with clear documentation comments
- Support for provider-agnostic event tracking via a thin abstraction (e.g., a `trackEvent()` function)

### Out of Scope
- Selecting and configuring a specific analytics provider (deferred decision)
- Scroll depth tracking (deferred to analytics provider configuration)
- Page view tracking configuration (handled by the provider script itself)
- Cookie consent banner (all candidate providers are cookieless)
- A/B testing or experiment tracking
- Server-side analytics or log analysis

---

## Technical Notes

- Create an `Analytics.astro` component (or equivalent) that is included in the base layout's `<head>`. Use Astro's `import.meta.env.PUBLIC_ANALYTICS_ID` to access the environment variable at build time.
- The component should conditionally render the script tag only when the env var is truthy. Example pattern:
  ```astro
  ---
  const analyticsId = import.meta.env.PUBLIC_ANALYTICS_ID;
  ---
  {analyticsId && (
    <script async defer data-site-id={analyticsId} src="https://provider.example/script.js"></script>
  )}
  ```
- For the event tracking hook, export or define a global `trackEvent(eventName, properties)` function that checks if the analytics provider's global object exists before calling it. This function should be a no-op if analytics is not loaded.
- The form submission tracking is triggered from US0012's success handler. US0012 should call `trackEvent('form_submission')` after a successful Formspree response.
- Since the provider is TBD, use a placeholder script URL with a clear `TODO` comment. The event tracking function should use a provider-agnostic pattern (e.g., checking for `window.plausible`, `window.fathom`, or `window.umami` and calling the appropriate method).
- Ensure the analytics script does not appear in the built HTML when `PUBLIC_ANALYTICS_ID` is not set. Verify by building with and without the env var and inspecting the output.
- The `async` attribute is preferred over `defer` for analytics scripts since they don't need to wait for DOM parsing and should fire ASAP without blocking render.

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| `PUBLIC_ANALYTICS_ID` is set to an empty string | Treated as unset; no analytics script is rendered |
| `PUBLIC_ANALYTICS_ID` contains an invalid ID | Script loads but analytics provider rejects the ID; no impact on site functionality |
| Analytics provider CDN is down | Script fails to load silently; site functions normally; `trackEvent()` is a no-op |
| `trackEvent()` called before analytics script loads | Function checks for provider global object; if not present, does nothing (no error thrown) |
| `trackEvent()` called when analytics is not configured | Function is a no-op; no JavaScript errors |
| Ad blocker blocks the analytics script | Script is blocked; site functions normally; `trackEvent()` is a no-op |
| Multiple form submissions tracked in quick succession | Each submission fires a separate event; no deduplication needed (Formspree handles actual submission dedup) |

---

## Test Scenarios

- [ ] With `PUBLIC_ANALYTICS_ID` set, analytics script tag appears in the rendered HTML `<head>`
- [ ] With `PUBLIC_ANALYTICS_ID` not set, no analytics script tag appears in the rendered HTML
- [ ] With `PUBLIC_ANALYTICS_ID` set to empty string, no analytics script tag appears
- [ ] Analytics script tag includes `async` or `defer` attribute
- [ ] Lighthouse reports no render-blocking scripts from the analytics integration
- [ ] `trackEvent('form_submission')` does not throw an error when analytics is configured
- [ ] `trackEvent('form_submission')` does not throw an error when analytics is NOT configured
- [ ] Analytics integration is contained in a single file with clear comments
- [ ] Changing the provider script URL requires editing only the analytics component
- [ ] Site loads and functions correctly when an ad blocker blocks the analytics script

---

## Dependencies

### Story Dependencies

| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks US0013 | Astro project with base layout and environment variable support (`PUBLIC_ANALYTICS_ID` in env config) | Draft |

### External Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Analytics provider decision (Plausible, Fathom, or Umami) | Decision | Deferred |
| Analytics provider account and site ID | Service | Pending provider selection |

---

## Estimation

**Story Points:** 2
**Complexity:** Low

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
