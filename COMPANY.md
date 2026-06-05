# Data Foundry Inc. — Company context

Concise reference for humans and AI agents working on this repository.

## Identity

| Field | Value |
| --- | --- |
| **Legal / brand name** | Data Foundry Inc. |
| **Tagline** | Turning raw data into gold. |
| **Site headline** | from Raw data / to Golden decisions. |
| **Positioning** | Solo BI and data architecture consultancy |
| **Contact** | adrienyvin@datafoundry.inc |
| **Email subject** | Our dashboards never match — can Data Foundry help? |
| **Booking** | https://calendly.com/adrienyvin/30min |
| **Founder** | Adrien Yvin |
| **Languages** | FR (native), EN (professional), ES (native) |

## What we do

End-to-end data work for clients who need **one senior specialist** from ingestion through trusted outputs:

- **BI** — reporting, analytics, dashboards, self-service
- **Architecture** — medallion-style layered data platforms
- **Governance** — catalog, quality, lineage, access, compliance
- **Automation** — pipelines, workflows, and agent-ready data products

**Primary platforms:** Microsoft Fabric, Power BI, Azure Data Factory, Microsoft Purview, and **Google BigQuery** (including hybrid Fabric ↔ BigQuery estates).

Tone on the site: **personal, professional, slightly playful** — foundry / metallurgy metaphors are intentional, not generic corporate speak.

## Services (six offerings)

Each service has a dedicated page under `website/services/` with tool references, deliverables, and illustrative mockups (schemas, pipelines, reports).

| Slug | Layer | Title |
| --- | --- | --- |
| `ingestion` | Bronze | Data Ingestion & Pipelines |
| `modeling` | Silver | Transformation & Modeling |
| `reporting` | Gold | Reporting & Analytics |
| `self-service-bi` | Gold | Self-service BI |
| `governance` | Every layer | Governance & Quality |
| `agents` | Platinum | Agents & Automations |

Home page cards link to these pages. Nav **Services** click → `#services`; desktop hover → 3×2 matrix with icons and short descriptions.

## Core narrative: Medallion Architecture

The site visualizes a **Bronze → Silver → Gold → Platinum** pipeline. Governance is applied at **every** layer (shield pills under each stage).

| Layer | Label | Meaning | Governance focus |
| --- | --- | --- | --- |
| **Bronze** | Raw chunks | Unstructured, unfiltered ingest | Catalog · Ingest policy |
| **Silver** | Organised spheres | Modelled, standardised data | Quality · Lineage |
| **Gold** | Golden ingots | Decisions, intelligence | Certification · Ownership |
| **Platinum** | Operational outputs | Humans and agents consuming data | Access · Compliance |

**Platinum outputs** fork into two paths:

1. **SSoT Modeling & Reporting** — single source of truth, classic BI
2. **AI agents** — automated consumers of governed gold-layer data

## Brand & design system

Dark foundry aesthetic; medallion metals drive the palette.

| Metal | Role | CSS tokens (approx.) |
| --- | --- | --- |
| Bronze | Raw ingest | `--color-bronze`, warm brown-orange |
| Silver | Modelled layer | Neutral **gray** (`--color-silver` #7a7e83) |
| Gold | Decision layer | `--color-gold`, `--color-gold-light` |
| Platinum | Consumer layer | Cool **blue** metal (`--color-platinum` #5f85a3) |

**Typography:** Fraunces (display/headlines), DM Sans (body/UI).  
**Favicon:** `website/assets/favicon.svg` — bronze-to-gold gradient mark on dark background.  
**OG image:** `website/assets/og-image.svg`

**Stack:** Plain HTML + CSS + minimal vanilla JS. No runtime build step for the live site.

## Repository structure

```
README.md              Repo overview (root)
COMPANY.md             This file
.github/workflows/     GitHub Pages deploy (path: website/)
website/
  index.html           Landing page
  css/styles.css       All styles, animations, responsive layout
  js/
    site.js            Shared nav, booking/email link injection
    build-services.js  Dev helper — regenerates service pages (Node)
  services/            Six service detail pages (*.html)
  assets/
    favicon.svg
    og-image.svg
    logos/             Customer logo placeholders (SVG)
  README.md            Website preview instructions
```

## Landing page sections (`index.html`)

| Section | Anchor | Summary |
| --- | --- | --- |
| Hero | `#about` | Rotating pain subhead, CTAs (Calendly, email, vision) |
| Vision | `#schema` | Medallion diagram — horizontal ≥768px, compact vertical on mobile |
| Services | `#services` | Six clickable cards → service pages |
| Who we work with | `#audience` | Three audience types + customer proof-of-work cards |
| Why Data Foundry | `#why-us` | Comparison panel (Instead of / You get) |
| About | `#founder` | Founder bio, timeline, stack, LinkedIn |
| FAQ | `#faq` | Stack, team, language, engagement (4 items) |
| Footer | `#contact` | Copyright, Book a call, email, LinkedIn |

**Nav (desktop):** Vision · Services (hover mega menu) · Who we work with · About Us · FAQ · Book a call  
**Nav (mobile):** Hamburger menu; service links listed under Services.

**Interactive JS on home page:** scroll-fade nav, mobile menu, customer work-sample modal (placeholder previews), booking URL + email subject from `<meta>` tags.

## Service page template

Each `services/*.html` page includes:

- Breadcrumb, layer badge, title, tagline, overview paragraph
- **Tools we work with** — pill list (Fabric, Power BI, BigQuery, etc.)
- **What we deliver** — bullet list
- **Example outputs** — CSS mockups (pipeline flows, schema tables, star schemas, Power BI dashboards, lineage chains)
- CTA: All services + Book a call

Regenerate all service pages after editing copy in `build-services.js`:

```bash
node website/js/build-services.js
```

## Responsive schema behavior

- **≥768px:** Full horizontal medallion in `.schema-fit` (fluid width; tablet may scroll)
- **≤767px:** Simplified `.schema-compact` vertical list with layer meta, governance, and platinum output chips
- Bronze compact marker uses a real `ore` chunk (no box), aligned like other layer icons

## SEO & social

- Canonical, Open Graph, and Twitter meta on home page
- Service pages have per-page `<title>`, description, and canonical URL
- Booking and email subject centralized via meta tags + `site.js`

## Open items

- Engagement process section (Discover → Design → Build → Hand off) — not yet on site
- Customer proof-of-work modals use placeholders — final redacted screenshots TBD

## Guidance for future agents

1. **Preserve the metaphor** — bronze/silver/gold/platinum and foundry language are brand assets; don't flatten to generic "data pipeline" copy unless asked.
2. **Keep silver gray and platinum blue** — they must stay visually distinct.
3. **Minimize scope** — HTML/CSS + small vanilla JS only unless the user requests a build toolchain.
4. **Service page copy** — edit `website/js/build-services.js`, then run the generator; keep home nav dropdown in sync (or extend the generator to emit nav snippets).
5. **Match existing patterns** — reuse stage/governance pill styles, medal colors, mockup frames (`service-mock`, `work-ph`), and Fraunces + DM Sans before introducing new fonts or frameworks.
6. **Accessibility** — maintain semantic headings, `aria-labelledby`, skip link, focus states, and keyboard-dismissible modals/menus.
7. **Commits** — only commit when the user explicitly asks; do not push unless requested.

## Quick start

```bash
cd website && open index.html
```

**Live site:** https://trockin8r.github.io/Data_Foundry_Inc/ (GitHub Pages — deploys `website/` on push to `main`)

No install or compile step required to preview. Node is only needed to regenerate service pages from `build-services.js`.
