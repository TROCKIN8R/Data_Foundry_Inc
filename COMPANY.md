# Data Foundry Inc. — Company context

Concise reference for humans and AI agents working on this repository.

## Identity

| Field | Value |
| --- | --- |
| **Legal / brand name** | Data Foundry Inc. |
| **Tagline** | Turning raw data into gold. |
| **Headline** | Refining your data into decisions |
| **Positioning** | Solo BI and data architecture consultancy |
| **Contact** | adrienyvin@datafoundry.inc |
| **Founder** | Adrien Yvin |

## What we do

End-to-end data work for clients who need one specialist from ingestion through trusted outputs:

- **BI** — reporting, analytics, dashboards
- **Architecture** — medallion-style layered data platforms
- **Governance** — catalog, quality, lineage, access, compliance
- **Automation** — pipelines and agent-ready data products

Tone on the site: **personal, professional, slightly playful** — foundry / metallurgy metaphors are intentional, not generic corporate speak.

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
**Stack:** Plain HTML + CSS only — no build step, no JS framework.

## Repository structure

```
README.md           Repo overview (root)
COMPANY.md          This file
website/
  index.html        Landing page
  css/styles.css    All styles, animations, responsive schema
  README.md         Website preview instructions
```

**Page sections:**

1. **Hero** (`#about`) — headline, tagline, services, CTAs, foundry visual
2. **Vision** (`#schema`) — medallion diagram (horizontal on ≥768px, compact vertical on mobile)
3. **What we do** (`#how-we-work`) — short placeholder copy
4. **Footer** (`#contact`) — copyright + email

**Nav:** Vision · About · Contact · Let's talk (mailto)

## Responsive schema behavior

- **≥768px:** Full horizontal medallion in `.schema-fit` (fluid width; tablet may scroll)
- **≤767px:** Simplified `.schema-compact` vertical list with layer meta, governance, and platinum output chips
- Bronze compact marker uses a real `ore` chunk (no box), aligned like other layer icons

## Placeholders & open items

- "What we do" is a single paragraph — room to expand
- Root repo can hold additional projects beside `website/`

## Guidance for future agents

1. **Preserve the metaphor** — bronze/silver/gold/platinum and foundry language are brand assets; don't flatten to generic "data pipeline" copy unless asked.
2. **Keep silver gray and platinum blue** — they must stay visually distinct.
3. **Minimize scope** — HTML/CSS only unless the user requests a build toolchain.
4. **Match existing patterns** — reuse stage/governance pill styles, medal colors, and Fraunces + DM Sans before introducing new fonts or frameworks.
5. **Accessibility** — maintain semantic headings, `aria-labelledby`, skip link, and focus states when editing markup or CSS.
6. **Commits** — only commit when the user explicitly asks; do not push unless requested.

## Quick start

```bash
cd website && open index.html
```

**Live site:** https://trockin8r.github.io/Data_Foundry_Inc/ (GitHub Pages, deploys from `website/` on push to `main`)

No install or compile step required.
