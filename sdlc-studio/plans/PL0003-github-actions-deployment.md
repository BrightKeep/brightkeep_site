# PL0003: Set Up GitHub Actions Deployment - Implementation Plan

> **Status:** Complete
> **Story:** [US0003: Set Up GitHub Actions Deployment](../stories/US0003-github-actions-deployment.md)
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Created:** 2026-02-10
> **Language:** YAML / GitHub Actions

## Overview

Create the GitHub Actions CI/CD workflow that builds the Astro project and deploys the static output to GitHub Pages on every push to `main`. Configure environment variable passthrough for Formspree, site URL, and analytics. The workflow uses the official GitHub Pages deployment actions with concurrency control and proper permissions.

## Acceptance Criteria Summary

| AC | Name | Description |
|----|------|-------------|
| AC1 | Build on Push | Workflow triggers on push to main, runs npm ci + npm run build |
| AC2 | Deploy to Pages | `dist/` deployed to GitHub Pages via actions/deploy-pages@v4 |
| AC3 | Environment Variables | PUBLIC_FORMSPREE_ID, PUBLIC_SITE_URL, PUBLIC_ANALYTICS_ID passed to build |
| AC4 | HTTPS Enforced | GitHub Pages automatically redirects HTTP to HTTPS |
| AC5 | Build Failures Block Deploy | Failed build skips deploy; previously deployed site unaffected |

---

## Technical Context

### Existing Patterns
- Astro project with `npm run build` producing `dist/` (US0001)
- Design tokens configured (US0002)
- TRD specifies exact workflow YAML (Section 8)

---

## Recommended Approach

**Strategy:** Test-After
**Rationale:** The workflow is a YAML configuration file. It cannot be tested locally via unit tests. Verification requires pushing to a real GitHub repository. The TRD provides the exact workflow specification.

---

## Implementation Phases

### Phase 1: Create Workflow File
**Goal:** Write the GitHub Actions workflow YAML

- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure trigger on push to main
- [ ] Configure permissions (contents read, pages write, id-token write)
- [ ] Configure concurrency group
- [ ] Build job: checkout, setup-node (20 LTS, cache npm), npm ci, npm run build
- [ ] Pass environment variables from repository vars to build
- [ ] Upload pages artifact from `dist/`
- [ ] Deploy job: deploy-pages action

### Phase 2: Validation
**Goal:** Verify workflow file is syntactically valid

- [ ] Verify YAML syntax is valid
- [ ] Verify build still works locally with `npm run build`

---

## Edge Case Handling

| # | Edge Case (from Story) | Handling Strategy | Phase |
|---|------------------------|-------------------|-------|
| 1 | Push to non-main branch | Workflow only triggers on `branches: [main]` | Phase 1 |
| 2 | npm ci fails (lockfile mismatch) | Build step fails with clear error; deploy skipped | Phase 1 |
| 3 | Astro build fails (TS error) | Build exits non-zero; deploy skipped; prev site remains | Phase 1 |
| 4 | PUBLIC_FORMSPREE_ID not set | Build succeeds; form endpoint undefined (OK for initial deploy) | Phase 1 |
| 5 | PUBLIC_ANALYTICS_ID not set | Build succeeds; analytics disabled by design (feature flag) | Phase 1 |
| 6 | Two rapid pushes to main | Concurrency group `pages` with `cancel-in-progress: false` queues them | Phase 1 |
| 7 | GitHub Pages outage | Deploy fails; manual re-run needed; prev deployment cached | Phase 1 |
| 8 | GitHub Pages not enabled | Deploy fails with permissions error; must enable in repo settings | Phase 1 |
| 9 | Actions minutes exhausted | Workflow queues (shows "queued" in Actions tab) | Phase 1 |
| 10 | dist/ exceeds 1GB limit | Deploy fails; unlikely for static marketing site (< 5MB expected) | Phase 1 |

**Coverage:** 10/10 edge cases handled

---

## Definition of Done

- [ ] `.github/workflows/deploy.yml` exists with correct configuration
- [ ] YAML is syntactically valid
- [ ] Build still works locally
- [ ] Workflow matches TRD specification
