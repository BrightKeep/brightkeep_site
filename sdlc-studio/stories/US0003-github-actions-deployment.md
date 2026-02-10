# US0003: Set Up GitHub Actions Deployment

> **Status:** Done
> **Epic:** [EP0001: Project Setup & Deployment Pipeline](../epics/EP0001-project-setup-and-deployment.md)
> **Owner:** TBD
> **Reviewer:** TBD
> **Created:** 2026-02-10

## User Story

**As a** CTO/Engineering Manager (Leader Lee)
**I want** a GitHub Actions workflow that automatically builds the Astro site and deploys it to GitHub Pages on every push to main, with environment variables for Formspree, site URL, and analytics configured securely
**So that** the deployment pipeline is automated, repeatable, and trustworthy -- eliminating manual deployment risk and enabling the team to ship with confidence from day one

## Context

### Persona Reference
**Leader Lee** - CTO / Head of Product / Engineering Manager. Expert-level technical proficiency. Values CI/CD pipelines that build internal capability rather than creating dependency. Expects professional build infrastructure that they would feel comfortable sharing with their leadership team as evidence of engineering rigour.
[Full persona details](../personas.md#leader-lee)

### Background
The PRD mandates GitHub Actions CI/CD deploying to GitHub Pages. The pipeline must build the Astro project (static output), deploy the `dist/` directory to GitHub Pages, and complete in under 2 minutes. Three environment variables are required: `PUBLIC_FORMSPREE_ID` (form endpoint), `PUBLIC_SITE_URL` (canonical URL for SEO), and `PUBLIC_ANALYTICS_ID` (optional, analytics provider). HTTPS is enforced automatically by GitHub Pages. The pipeline must fail visibly on build errors -- silent failures are unacceptable for an engineering-credible setup. This story depends on US0001 (project exists) and US0002 (design tokens configured) so that the first deployment produces a correctly styled page.

---

## Acceptance Criteria

### AC1: GitHub Actions workflow builds Astro on push to main
- **Given** a `.github/workflows/deploy.yml` file exists in the repository
- **When** a commit is pushed to the `main` branch
- **Then** the GitHub Actions workflow triggers automatically, runs `npm ci` to install dependencies, runs `npm run build` to produce the static output in `dist/`, and the build step completes successfully with a green check in the Actions tab

### AC2: Built output deployed to GitHub Pages
- **Given** the Astro build step has completed successfully
- **When** the deploy step executes
- **Then** the contents of the `dist/` directory are deployed to GitHub Pages using the official `actions/deploy-pages@v4` action, the site is accessible at the GitHub Pages URL (e.g. `https://<username>.github.io/<repo>/`), and the deployed `index.html` renders correctly in a browser

### AC3: Environment variables configured and accessible
- **Given** the GitHub repository has the following secrets/variables configured: `PUBLIC_FORMSPREE_ID`, `PUBLIC_SITE_URL`, and optionally `PUBLIC_ANALYTICS_ID`
- **When** the Astro build runs in the GitHub Actions workflow
- **Then** the environment variables are passed to the build process via the `env:` key in the workflow, Astro can access them via `import.meta.env.PUBLIC_FORMSPREE_ID` (and the others) at build time, and the variables are not exposed in workflow logs (secrets are masked)

### AC4: HTTPS enforced on the deployed site
- **Given** the site is deployed to GitHub Pages
- **When** a user navigates to the HTTP version of the GitHub Pages URL
- **Then** the request is automatically redirected to HTTPS (GitHub Pages enforces this by default), and the browser shows a valid TLS certificate

### AC5: Build failures are visible and block deployment
- **Given** a commit introduces a build error (e.g. TypeScript error, missing dependency)
- **When** the workflow runs
- **Then** the build step fails with a non-zero exit code, the deployment step is skipped (does not run), the GitHub Actions UI shows a red failure status with the error message visible in the logs, and the previously deployed site remains live and unaffected

---

## Scope

### In Scope
- `.github/workflows/deploy.yml` workflow file for build and deploy
- Workflow triggered on `push` to `main` branch only
- Node.js setup step with version pinning (Node 20 LTS)
- `npm ci` for deterministic dependency installation
- `npm run build` for Astro static build
- Deployment using `actions/upload-pages-artifact` and `actions/deploy-pages`
- Environment variables passed from GitHub repository settings to the build
- GitHub Pages configuration (source set to GitHub Actions)
- Concurrency control to prevent overlapping deployments
- Permissions configuration for `GITHUB_TOKEN` (pages write, id-token write)

### Out of Scope
- Custom domain configuration (pending domain registration, separate task)
- Preview deployments for pull requests (future enhancement)
- Automated testing in the pipeline (future story -- no tests exist yet)
- Branch protection rules (repository administration, not CI/CD)
- Monitoring or alerting on deployment failures (future enhancement)
- CDN or caching configuration beyond GitHub Pages defaults
- Formspree account creation or configuration (separate task; only the variable is wired here)

---

## Technical Notes

### Workflow Structure
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          PUBLIC_FORMSPREE_ID: ${{ vars.PUBLIC_FORMSPREE_ID }}
          PUBLIC_SITE_URL: ${{ vars.PUBLIC_SITE_URL }}
          PUBLIC_ANALYTICS_ID: ${{ vars.PUBLIC_ANALYTICS_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Environment Variable Strategy
- `PUBLIC_FORMSPREE_ID` and `PUBLIC_SITE_URL` are stored as **repository variables** (not secrets) because they are embedded in the built HTML and are publicly visible in the page source. Using `vars.*` context.
- `PUBLIC_ANALYTICS_ID` is stored as a **repository variable** (optional; analytics is not yet configured).
- All `PUBLIC_*` prefixed variables are accessible in Astro via `import.meta.env.PUBLIC_*` at build time.
- If sensitive values are needed in the future, they should use `secrets.*` context instead.

### GitHub Pages Configuration
- Repository Settings > Pages > Source must be set to "GitHub Actions" (not "Deploy from a branch")
- HTTPS is enforced automatically by GitHub Pages for `*.github.io` domains
- Custom domain can be added later without changing the workflow

### Concurrency Control
- `cancel-in-progress: false` ensures that if two pushes happen in quick succession, both deployments run sequentially rather than the first being cancelled. This prevents a scenario where a valid deployment is cancelled by a subsequent push.

### Node.js Version
- Pin to Node 20 LTS for stability and compatibility with Astro
- Use `cache: npm` in `actions/setup-node` to cache `node_modules` and speed up CI

---

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
|----------|-------------------|
| Push to a branch other than `main` (e.g. feature branch) | Workflow does not trigger; no build or deployment occurs; feature branches are not deployed |
| `npm ci` fails due to lockfile mismatch | Build step fails with a clear error indicating `package-lock.json` is out of sync with `package.json`; deployment is skipped; developer must run `npm install` locally and commit the updated lockfile |
| Astro build fails due to TypeScript error | Build step exits with non-zero code; error message with file and line number visible in Actions log; deployment is skipped; previously deployed version remains live |
| `PUBLIC_FORMSPREE_ID` variable is not set in repository settings | Build succeeds but the form endpoint is undefined; Formspree integration will not work at runtime; this is acceptable for initial deployment (form is built in EP0004) |
| `PUBLIC_ANALYTICS_ID` variable is not set | Build succeeds; analytics integration is disabled by design (feature flag pattern: analytics only enabled when the variable is set) |
| Two commits pushed to main within seconds of each other | Concurrency group `pages` ensures deployments run sequentially; the second deployment waits for the first to complete; both are deployed in order |
| GitHub Pages is experiencing an outage | Deploy step fails; GitHub Actions retries are not automatic; developer must re-run the workflow manually after the outage resolves; the previous deployment remains cached and served |
| Repository does not have GitHub Pages enabled | Deploy step fails with a permissions error; developer must enable Pages in repository settings with source set to "GitHub Actions" |
| GitHub Actions free tier minutes exhausted | Workflow queues but does not run until minutes reset (monthly); no silent failure -- the workflow shows as "queued" in the Actions tab |
| Build output (`dist/`) exceeds GitHub Pages size limit (1GB) | Deployment fails with a size error; this is highly unlikely for a static marketing site (expected < 5MB) |

---

## Test Scenarios

- [ ] Pushing a commit to `main` triggers the `Deploy to GitHub Pages` workflow in the GitHub Actions tab
- [ ] Pushing a commit to a branch named `feature/test` does NOT trigger the workflow
- [ ] The build job installs dependencies using `npm ci` (not `npm install`) -- verified in the Actions log
- [ ] The build job runs `npm run build` and produces output in `dist/` -- verified by the upload artifact step succeeding
- [ ] The deployed site is accessible at the GitHub Pages URL and renders the index page
- [ ] Navigating to the HTTP version of the GitHub Pages URL redirects to HTTPS
- [ ] The browser shows a valid TLS certificate (no security warnings) on the deployed site
- [ ] Introducing a deliberate TypeScript error and pushing to `main` causes the build step to fail with a red status
- [ ] When the build step fails, the deploy step is skipped (shown as "skipped" in the Actions UI)
- [ ] When the build step fails, the previously deployed version of the site remains accessible and unchanged
- [ ] The total pipeline duration (build + deploy) completes in under 2 minutes
- [ ] The `PUBLIC_SITE_URL` environment variable is accessible in the built output (e.g. verifiable in the page source or meta tags when they are added in EP0005)
- [ ] Setting `PUBLIC_FORMSPREE_ID` as a repository variable makes it available to the Astro build via `import.meta.env.PUBLIC_FORMSPREE_ID`
- [ ] The workflow file uses `actions/deploy-pages@v4` (or latest stable version) and `actions/upload-pages-artifact@v3` (or latest stable version)

---

## Dependencies

### Story Dependencies
| Story | Type | What's Needed | Status |
|-------|------|---------------|--------|
| US0001 | Blocks | Astro project with `npm run build` producing `dist/` output | Draft |
| US0002 | Soft dependency | Design tokens configured so first deployment is correctly styled | Draft |

### External Dependencies
| Dependency | Type | Status |
|------------|------|--------|
| GitHub repository | Repository must exist for Actions and Pages | Pending |
| GitHub Pages enabled | Repository settings: Pages source set to "GitHub Actions" | Pending |
| GitHub Actions | CI/CD runner availability | Available |
| npm registry | Package installation during `npm ci` | Available |

---

## Estimation

**Story Points:** 3
**Complexity:** Medium

**Rationale:** The workflow itself follows a well-documented Astro deployment template for GitHub Pages. However, the story is rated Medium rather than Low because it requires coordination across multiple systems (GitHub Actions, GitHub Pages, repository settings, environment variables), the first deployment involves troubleshooting permissions and configuration, and the testing requires pushing to a real repository and verifying the live deployment. The YAML authoring is straightforward; the integration verification is the bulk of the effort.

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-02-10 | Claude | Initial story created |
