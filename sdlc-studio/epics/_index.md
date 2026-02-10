# Epic Registry

**Last Updated:** 2026-02-10
**PRD Reference:** [Product Requirements Document](../prd.md)

## Summary

| Status | Count |
|--------|-------|
| Draft | 0 |
| Ready | 0 |
| Approved | 0 |
| In Progress | 0 |
| Done | 5 |
| **Total** | **5** |

## Epics

| ID | Title | Status | Owner | Stories | Target |
|----|-------|--------|-------|---------|--------|
| [EP0001](EP0001-project-setup-and-deployment.md) | Project Setup & Deployment Pipeline | Done | TBD | 3 (8 pts) | v1.0 |
| [EP0002](EP0002-site-content-sections.md) | Site Content Sections | Done | TBD | 5 (13 pts) | v1.0 |
| [EP0003](EP0003-navigation-and-animations.md) | Navigation & Scroll Animations | Done | TBD | 3 (10 pts) | v1.0 |
| [EP0004](EP0004-contact-and-lead-generation.md) | Contact & Lead Generation | Done | TBD | 2 (5 pts) | v1.0 |
| [EP0005](EP0005-quality-seo-and-compliance.md) | Quality, SEO & Compliance | Done | TBD | 4 (10 pts) | v1.0 |

## Dependency Graph

```
EP0001 (Project Setup)
  ├── EP0002 (Site Content)
  │     ├── EP0003 (Navigation & Animations)
  │     ├── EP0004 (Contact & Lead Gen)
  │     └── EP0005 (Quality & Compliance) ←── also depends on EP0003, EP0004
  └── EP0003 (Navigation & Animations)
        └── EP0005 (Quality & Compliance)
```

## Feature-to-Epic Mapping

| Feature | Epic |
|---------|------|
| F001: Hero Section | EP0002 |
| F002: Services Overview | EP0002 |
| F003: Methodology Grid | EP0002 |
| F004: Services Detail | EP0002 |
| F005: Contact CTA | EP0004 |
| F006: Footer | EP0002 |
| F007: Responsive Design | EP0005 |
| F008: Accessibility | EP0005 |
| F009: SEO Optimisation | EP0005 |
| F010: Analytics Integration | EP0004 |
| F011: Navigation | EP0003 |
| F012: Scroll Animations | EP0003 |
| F013: Privacy Policy | EP0005 |
| F014: GitHub Pages Deployment | EP0001 |

## Notes

- Epics are numbered globally (EP0001, EP0002, etc.)
- Stories are tracked in [Story Registry](../stories/_index.md)
- All epics target v1.0 launch
- EP0001 is the critical path - blocks all other work
- EP0005 is the final gate before launch
