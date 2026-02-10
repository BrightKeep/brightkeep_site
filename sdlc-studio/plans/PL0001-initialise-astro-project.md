# PL0001: Initialise Astro Project with Tailwind and GSAP - Implementation Plan

> **Status:** Complete
> **Story:** [US0001: Initialise Astro Project with Tailwind and GSAP](../stories/US0001-initialise-astro-project.md)
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Created:** 2026-02-10
> **Language:** TypeScript / Astro

## Overview

Scaffold a new Astro project in the `brightkeep/` root directory with TypeScript strict mode, install Tailwind CSS via the official `@astrojs/tailwind` integration, install GSAP + ScrollTrigger as npm dependencies, configure Google Fonts loading with `font-display: swap` and preconnect hints, and create a semantic `BaseLayout.astro` component with an `index.astro` page.

## Acceptance Criteria Summary

| AC | Name | Description |
|----|------|-------------|
| AC1 | Astro + TypeScript | Project scaffolded with `astro.config.mjs`, `tsconfig.json` (strict), `npm run dev` works |
| AC2 | Tailwind CSS | `@astrojs/tailwind` installed, `tailwind.config.mjs` exists, utility classes render |
| AC3 | GSAP + ScrollTrigger | `gsap` installed, importable in `.astro` scripts, version pinned, < 50KB gzipped |
| AC4 | Google Fonts | Inter + JetBrains Mono loaded with preconnect and `font-display: swap` |
| AC5 | Base Layout | `BaseLayout.astro` with semantic HTML (header, main, footer), content slot, valid HTML |

---

## Technical Context

### Language & Framework
- **Primary Language:** TypeScript (strict mode)
- **Framework:** Astro 4.x (static output mode)
- **Test Framework:** Vitest (for future stories; not set up in this story)

### Existing Patterns
Greenfield project. No existing code. All patterns are established by this story:
- Astro project structure: `src/layouts/`, `src/pages/`, `src/components/`
- Static output mode (`output: 'static'`)
- Tailwind CSS via official Astro integration
- Google Fonts via `<link>` tags in the base layout `<head>`

---

## Recommended Approach

**Strategy:** Test-After
**Rationale:** This is a project scaffolding story. The "code" is configuration files and templates, not business logic. Tests would verify build output (file existence, HTML structure) which is better validated by running `npm run build` and inspecting the output directly. No TDD benefit here.

### Test Priority
1. `npm run dev` starts without errors
2. `npm run build` produces valid static output in `dist/`
3. Built HTML contains semantic elements and font links

---

## Implementation Tasks

| # | Task | File | Depends On | Status |
|---|------|------|------------|--------|
| 1 | Scaffold Astro project with TypeScript | `package.json`, `astro.config.mjs`, `tsconfig.json` | None | [ ] |
| 2 | Install and configure Tailwind CSS | `tailwind.config.mjs`, `astro.config.mjs` | 1 | [ ] |
| 3 | Install GSAP with version pinning | `package.json` | 1 | [ ] |
| 4 | Create BaseLayout with semantic HTML and Google Fonts | `src/layouts/BaseLayout.astro` | 1, 2 | [ ] |
| 5 | Create index page using BaseLayout | `src/pages/index.astro` | 4 | [ ] |
| 6 | Configure .gitignore and README | `.gitignore`, `README.md` | 1 | [ ] |
| 7 | Verify build output | `dist/` | All | [ ] |

### Parallel Execution Groups

| Group | Tasks | Prerequisite |
|-------|-------|--------------|
| A | 1 (Scaffold Astro) | None |
| B | 2 (Tailwind), 3 (GSAP), 6 (.gitignore) | Group A |
| C | 4 (BaseLayout) | Group B |
| D | 5 (index page) | Group C |
| E | 7 (Verify) | Group D |

---

## Implementation Phases

### Phase 1: Project Scaffolding
**Goal:** Create a working Astro project with TypeScript

- [ ] Run `npm create astro@latest` or manually create the Astro project structure
- [ ] Configure `astro.config.mjs` with `output: 'static'`
- [ ] Configure `tsconfig.json` with `"strict": true`
- [ ] Add `engines` field to `package.json` specifying `>=18.14.1`
- [ ] Create `.gitignore` for Node.js/Astro project

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`

### Phase 2: Dependencies
**Goal:** Install Tailwind CSS and GSAP

- [ ] Install `@astrojs/tailwind` and `tailwindcss` via npm
- [ ] Add Tailwind integration to `astro.config.mjs`
- [ ] Create initial `tailwind.config.mjs` with content paths
- [ ] Install `gsap` via npm with exact version pinning

**Files:** `package.json`, `package-lock.json`, `astro.config.mjs`, `tailwind.config.mjs`

### Phase 3: Base Layout & Page
**Goal:** Create the semantic HTML shell with Google Fonts

- [ ] Create `src/layouts/BaseLayout.astro` with:
  - `<!DOCTYPE html>`, `<html lang="en">`
  - `<head>` with charset, viewport meta, title
  - Google Fonts preconnect links
  - Google Fonts `<link>` for Inter (400,500,600,700) and JetBrains Mono (400) with `display=swap`
  - `<body>` with `<header>`, `<main>` (slot), `<footer>`
- [ ] Create `src/pages/index.astro` using `BaseLayout` with placeholder content
- [ ] Apply basic Tailwind classes to verify functionality

**Files:** `src/layouts/BaseLayout.astro`, `src/pages/index.astro`

### Phase 4: Validation
**Goal:** Verify all acceptance criteria

| AC | Verification Method | File Evidence | Status |
|----|---------------------|---------------|--------|
| AC1 | `npm run dev` starts; `tsconfig.json` has strict | `tsconfig.json`, terminal output | Pending |
| AC2 | Tailwind class renders in browser; `tailwind.config.mjs` exists | `tailwind.config.mjs`, `dist/` CSS | Pending |
| AC3 | GSAP importable in script; version in `package.json` | `package.json` | Pending |
| AC4 | Preconnect and font links in built HTML | `dist/index.html` | Pending |
| AC5 | Semantic elements in built HTML | `dist/index.html` | Pending |

---

## Edge Case Handling

| # | Edge Case (from Story) | Handling Strategy | Phase |
|---|------------------------|-------------------|-------|
| 1 | Google Fonts CDN unavailable | `font-display: swap` ensures system fonts display; no blank text | Phase 3 |
| 2 | npm install fails due to network | Developer retries; lockfile integrity preserved by `npm ci` | Phase 1 |
| 3 | TypeScript compilation error | Astro dev server surfaces error in terminal and browser overlay | Phase 1 |
| 4 | Tailwind class not purged correctly | Tailwind JIT mode in content config; verify build CSS size | Phase 2 |
| 5 | GSAP import at top level (outside script) | Only import in `<script>` tags; Astro's static mode won't SSR GSAP | Phase 2 |
| 6 | Outdated Node.js (< 18) | `engines` field in `package.json` specifies `>=18.14.1` | Phase 1 |
| 7 | Browser with JS disabled | Semantic HTML readable; only GSAP absent; layout via CSS | Phase 3 |

**Coverage:** 7/7 edge cases handled

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Astro breaking changes in v5 | Build fails | Pin Astro to latest stable v4.x |
| Tailwind v4 API changes | Config structure differs | Use @astrojs/tailwind which manages compatibility |
| GSAP version incompatibility | ScrollTrigger import fails | Pin exact GSAP version |

---

## Definition of Done

- [ ] All acceptance criteria implemented
- [ ] `npm run dev` and `npm run build` both succeed
- [ ] Edge cases handled
- [ ] Code follows Astro and TypeScript conventions
- [ ] No build errors or warnings
- [ ] `.gitignore` configured

---

## Notes

- This is a greenfield project. All files are new.
- Design tokens (colours, typography, breakpoints) are deferred to US0002.
- The `tailwind.config.mjs` created here is a minimal starter that US0002 will extend.
- GSAP is only installed as a dependency; animation implementation is in EP0003.
- No ESLint/Prettier configuration in this story (out of scope per story definition).
