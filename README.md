# Data Foundry Inc.

Repository for Data Foundry Inc. assets and projects.

## Contents

| Path | Description |
| --- | --- |
| [`website/`](website/) | Marketing site (plain HTML + CSS) |
| [`COMPANY.md`](COMPANY.md) | Company context for humans and AI agents |

## Website

Preview locally:

```bash
cd website && open index.html
```

## Publish on GitHub Pages

1. Push to **`main`** (the workflow deploys the `website/` folder automatically).
2. In the repo: **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
3. After the workflow runs, the site is live at:

   **https://trockin8r.github.io/Data_Foundry_Inc/**

Workflow file: [`.github/workflows/pages.yml`](.github/workflows/pages.yml)

## Company context

See [`COMPANY.md`](COMPANY.md) for brand voice, medallion architecture, and agent guidelines.
