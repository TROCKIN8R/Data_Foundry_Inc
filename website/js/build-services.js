/* Dev helper — run with: node website/js/build-services.js */
const fs = require('fs');
const path = require('path');

const services = [
  {
    slug: 'ingestion',
    theme: 'bronze',
    layer: 'Bronze',
    title: 'Data Ingestion & Pipelines',
    tagline: 'Reliable ingest — governed from the first load.',
    description:
      'Governed data ingestion with Microsoft Fabric pipelines, OneLake landing zones, and BigQuery transfers — APIs, databases, SaaS, and files into a cataloged bronze layer.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    overview:
      'We design bronze-layer ingest that lands once and lands right — whether your platform is Microsoft Fabric, a hybrid Fabric + BigQuery estate, or migrating between the two. Sources connect through governed pipelines with failure alerting, incremental loads, and catalog metadata from day one.',
    tools: [
      'Microsoft Fabric Data Factory',
      'Fabric Data Pipelines',
      'OneLake & Lakehouse',
      'BigQuery Data Transfer Service',
      'Azure Data Factory (hybrid)',
    ],
    bullets: [
      'Incremental loads from SQL Server, Oracle, SaaS APIs, and flat files into OneLake or BigQuery bronze datasets',
      'Fabric pipeline orchestration with retry logic, dependency chains, and Teams or email alerting on failure',
      'Ingest policies, watermark columns, and schema-drift handling documented in Microsoft Purview or BigQuery catalog',
      'Hybrid patterns: replicate from on-prem or BigQuery into Fabric (or vice versa) without duplicate business logic',
    ],
    mockups: [
      {
        caption: 'Fabric pipeline — source systems to OneLake bronze',
        kind: 'pipeline',
        labels: ['SQL Server', 'SaaS API', 'OneLake', 'Lakehouse'],
      },
      {
        caption: 'Bronze lakehouse schema — raw landing tables',
        kind: 'schema',
        table: 'bronze.sales_orders_raw',
        columns: [
          ['order_id', 'STRING', 'PK'],
          ['source_system', 'STRING', ''],
          ['payload_json', 'STRING', ''],
          ['_ingested_at', 'TIMESTAMP', 'audit'],
        ],
      },
    ],
  },
  {
    slug: 'modeling',
    theme: 'silver',
    layer: 'Silver',
    title: 'Transformation & Modeling',
    tagline: 'One model, one version of the truth.',
    description:
      'Silver-layer modeling in Fabric Warehouse, Lakehouse SQL, dbt, and BigQuery — dimensional models and semantic layers your whole org builds on.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></svg>',
    overview:
      'Raw bronze becomes trusted silver: cleaned, conformed, and modeled for analytics. We build star schemas and semantic layers in Fabric Warehouse or BigQuery, with transformations in Spark notebooks, SQL, or dbt — every join and filter auditable and version-controlled.',
    tools: [
      'Fabric Warehouse & Lakehouse SQL',
      'Fabric Notebooks (Spark)',
      'dbt (Fabric or BigQuery)',
      'BigQuery stored procedures',
      'Power BI semantic models',
    ],
    bullets: [
      'Kimball-style dimensions and facts in Fabric Warehouse tables or BigQuery datasets — conformed across business units',
      'dbt or Fabric notebooks for reusable transformation logic with tests on uniqueness, referential integrity, and freshness',
      'Slowly changing dimensions, role-playing dates, and bridge tables documented for report authors',
      'Cross-platform modeling when Fabric is the serve layer and BigQuery remains the compute or archive tier',
    ],
    mockups: [
      {
        caption: 'Star schema — sales subject area (Fabric Warehouse / BigQuery)',
        kind: 'star',
        fact: 'fact_sales',
        dims: ['dim_customer', 'dim_product', 'dim_date'],
      },
      {
        caption: 'Silver layer — conformed dimension columns',
        kind: 'schema',
        table: 'silver.dim_customer',
        columns: [
          ['customer_key', 'INT64', 'PK'],
          ['customer_id', 'STRING', 'NK'],
          ['segment', 'STRING', ''],
          ['valid_from', 'DATE', 'SCD2'],
          ['_updated_at', 'TIMESTAMP', 'audit'],
        ],
      },
    ],
  },
  {
    slug: 'reporting',
    theme: 'gold',
    layer: 'Gold',
    title: 'Reporting & Analytics',
    tagline: 'Dashboards executives trust.',
    description:
      'Power BI dashboards on Fabric semantic models and BigQuery gold tables — board-ready KPIs on a certified single source of truth.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-3"/></svg>',
    overview:
      'Gold-layer reporting means one number everywhere — revenue, margin, and pipeline defined once in DAX or BigQuery views, then surfaced in Power BI dashboards your leadership team actually opens. We build on Direct Lake, DirectQuery, or import models depending on freshness and scale needs.',
    tools: [
      'Power BI',
      'Fabric semantic models',
      'DAX & Power Query',
      'BigQuery authorized views',
      'Paginated reports (optional)',
    ],
    bullets: [
      'Executive dashboards wired to certified Fabric semantic models or BigQuery gold datasets — no conflicting KPI definitions',
      'Reusable report templates, themes, and measure libraries so new pages stay on-brand and consistent',
      'Self-documenting DAX with descriptions, display folders, and dependency mapping for handoff',
      'Row-level security aligned to Azure AD groups or BigQuery authorized views for multi-tenant reporting',
    ],
    mockups: [
      {
        caption: 'Executive KPI dashboard — Power BI on Fabric Direct Lake',
        kind: 'report',
        title: 'Revenue & margin overview',
      },
      {
        caption: 'Gold semantic model — measure definitions',
        kind: 'schema',
        table: 'gold.semantic_measures',
        columns: [
          ['measure_name', 'STRING', ''],
          ['dax_expression', 'STRING', ''],
          ['certified', 'BOOL', ''],
          ['owner', 'STRING', ''],
        ],
      },
    ],
  },
  {
    slug: 'self-service-bi',
    theme: 'gold',
    layer: 'Gold',
    title: 'Self-service BI',
    tagline: 'Self-serve from governed data — no shadow copies.',
    description:
      'Governed self-service in Power BI and Excel connected to Fabric semantic models or BigQuery — no shadow copies or stale exports.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    overview:
      'Business users need answers today — not a ticket to IT. We expose governed gold data through Fabric semantic models (Excel and Power BI Analyze in Excel), BigQuery connected sheets, and curated dataset endorsements so self-serve stays inside guardrails.',
    tools: [
      'Power BI workspaces',
      'Fabric semantic models',
      'Excel Analyze in Excel',
      'BigQuery + Connected Sheets',
      'Microsoft Purview endorsements',
    ],
    bullets: [
      'Certified datasets with clear grain, filter context, and field descriptions — authors know what each column means',
      'Excel live connections to Fabric semantic models; BigQuery views for Google-native teams',
      'Workspace roles, build permissions, and golden dataset promotion workflows to prevent shadow IT',
      'Office hours and short enablement guides so adoption sticks after launch',
    ],
    mockups: [
      {
        caption: 'Certified semantic model — fields exposed to business users',
        kind: 'semantic',
        tables: ['Sales', 'Customer', 'Date'],
      },
      {
        caption: 'Self-service report — drag fields from governed model',
        kind: 'report',
        title: 'Regional sales explorer',
      },
    ],
  },
  {
    slug: 'governance',
    theme: 'governance',
    layer: 'Every layer',
    title: 'Governance & Quality',
    tagline: 'Lineage, quality, and ownership built in.',
    description:
      'Microsoft Purview, Fabric governance, and BigQuery data quality — lineage, catalog, and ownership across every medallion layer.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    overview:
      'Governance is not a one-time audit — it is how your team trusts the data every morning. We wire Microsoft Purview (or Fabric\'s built-in governance) and BigQuery policy tags together with automated quality checks, ownership metadata, and lineage views across bronze, silver, and gold.',
    tools: [
      'Microsoft Purview',
      'Fabric unified catalog',
      'BigQuery policy tags & DLP',
      'dbt tests & Fabric Data Quality',
      'Azure AD / IAM integration',
    ],
    bullets: [
      'End-to-end lineage from Power BI visuals back to Fabric pipelines or BigQuery jobs — impact analysis before you change a column',
      'Automated freshness, null-rate, and referential checks with alerts in Teams or email when thresholds breach',
      'Data owners, stewards, and sensitivity labels on tables, columns, and semantic model fields',
      'Access reviews and row-level security patterns documented for auditors and new hires',
    ],
    mockups: [
      {
        caption: 'Lineage view — dashboard measure to pipeline source',
        kind: 'lineage',
        chain: ['Power BI', 'Semantic model', 'Gold table', 'Silver transform', 'Bronze ingest'],
      },
      {
        caption: 'Quality rules — automated checks on silver tables',
        kind: 'schema',
        table: 'governance.quality_rules',
        columns: [
          ['rule_id', 'STRING', 'PK'],
          ['target_table', 'STRING', ''],
          ['check_type', 'STRING', ''],
          ['threshold', 'STRING', ''],
        ],
      },
    ],
  },
  {
    slug: 'agents',
    theme: 'platinum',
    layer: 'Platinum',
    title: 'Agents & Automations',
    tagline: 'Workflows and AI agents that keep running after handoff.',
    description:
      'Power Automate, Fabric Data Activator, and AI agents on governed gold-layer data in Fabric and BigQuery.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>',
    overview:
      'Platinum is where data leaves the warehouse and drives action — alerts, workflows, and AI agents grounded in your certified gold layer. We build on Fabric Data Activator, Power Automate, Azure Logic Apps, and BigQuery scheduled queries so automations stay maintainable long after handoff.',
    tools: [
      'Fabric Data Activator',
      'Power Automate',
      'Azure Logic Apps',
      'Copilot Studio (optional)',
      'BigQuery scheduled queries',
    ],
    bullets: [
      'Threshold and anomaly triggers on gold KPIs — notify Slack, Teams, or email when metrics move outside bounds',
      'Power Automate flows that create tickets, update CRM records, or kick off Fabric pipeline reruns',
      'AI agents with retrieval grounded in governed semantic models — no hallucinated metrics from stale exports',
      'Runbooks, monitoring, and ownership docs so your team operates automations without us on retainer',
    ],
    mockups: [
      {
        caption: 'Automation flow — KPI threshold to Teams alert',
        kind: 'automation',
        steps: ['Gold KPI', 'Data Activator', 'Power Automate', 'Teams'],
      },
      {
        caption: 'Agent context — certified measures available to Copilot',
        kind: 'report',
        title: 'Ops copilot — governed answers',
      },
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mockupHtml(mockup) {
  var caption = escapeHtml(mockup.caption);

  if (mockup.kind === 'pipeline') {
    var nodes = mockup.labels
      .map(function (label, index) {
        var metal = index === 0 ? 'bronze' : index === 1 ? 'silver' : index === 2 ? 'gold' : 'platinum';
        var arrow = index < mockup.labels.length - 1 ? '<span class="work-ph__arrow"></span>' : '';
        return (
          '<span class="work-ph__node work-ph__node--' +
          metal +
          '"><span class="service-ph__node-label">' +
          escapeHtml(label) +
          '</span></span>' +
          arrow
        );
      })
      .join('');
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="work-ph"><div class="work-ph__top">' +
      '<span class="work-ph__chip work-ph__chip--w2"></span>' +
      '<span class="service-ph__badge">Fabric Pipeline</span>' +
      '<span class="work-ph__redact">Mockup</span></div>' +
      '<div class="work-ph__flow">' +
      nodes +
      '</div></div></div></figure>'
    );
  }

  if (mockup.kind === 'schema') {
    var head =
      '<div class="service-ph__schema-head"><span>Column</span><span>Type</span><span>Role</span></div>';
    var rows = mockup.columns
      .map(function (col) {
        return (
          '<div class="service-ph__schema-row"><span>' +
          escapeHtml(col[0]) +
          '</span><span>' +
          escapeHtml(col[1]) +
          '</span><span>' +
          escapeHtml(col[2]) +
          '</span></div>'
        );
      })
      .join('');
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__schema-wrap">' +
      '<p class="service-ph__schema-table">' +
      escapeHtml(mockup.table) +
      '</p>' +
      '<div class="service-ph__schema">' +
      head +
      rows +
      '</div></div></div></figure>'
    );
  }

  if (mockup.kind === 'star') {
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__star">' +
      '<div class="service-ph__star-node">' +
      escapeHtml(mockup.dims[0]) +
      '</div>' +
      '<div class="service-ph__star-node">' +
      escapeHtml(mockup.dims[1]) +
      '</div>' +
      '<div class="service-ph__star-node">' +
      escapeHtml(mockup.dims[2]) +
      '</div>' +
      '<div class="service-ph__star-node service-ph__star-node--fact">' +
      escapeHtml(mockup.fact) +
      '</div>' +
      '</div></div></figure>'
    );
  }

  if (mockup.kind === 'lineage') {
    var chain = mockup.chain
      .map(function (step, index) {
        var arrow = index < mockup.chain.length - 1 ? '<span class="work-ph__arrow"></span>' : '';
        return (
          '<span class="service-ph__lineage-step">' + escapeHtml(step) + '</span>' + arrow
        );
      })
      .join('');
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__lineage">' +
      chain +
      '</div></div></figure>'
    );
  }

  if (mockup.kind === 'semantic') {
    var tables = mockup.tables
      .map(function (table) {
        return (
          '<div class="service-ph__semantic-table">' +
          '<span class="service-ph__semantic-name">' +
          escapeHtml(table) +
          '</span>' +
          '<span class="service-ph__semantic-fields">' +
          '<span></span><span></span><span></span>' +
          '</span></div>'
        );
      })
      .join('');
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__semantic">' +
      '<p class="service-ph__badge service-ph__badge--inline">Fabric semantic model</p>' +
      tables +
      '</div></div></figure>'
    );
  }

  if (mockup.kind === 'automation') {
    var steps = mockup.steps
      .map(function (step, index) {
        var arrow = index < mockup.steps.length - 1 ? '<span class="work-ph__arrow"></span>' : '';
        return (
          '<span class="service-ph__auto-step">' + escapeHtml(step) + '</span>' + arrow
        );
      })
      .join('');
    return (
      '<figure class="service-mock">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__automation">' +
      steps +
      '</div></div></figure>'
    );
  }

  return (
    '<figure class="service-mock">' +
    '<figcaption class="service-mock__caption">' +
    caption +
    '</figcaption>' +
    '<div class="service-mock__frame"><div class="work-ph">' +
    '<div class="work-ph__top">' +
    '<span class="work-ph__chip work-ph__chip--w2"></span>' +
    '<span class="service-ph__badge">Power BI</span>' +
    '<span class="work-ph__redact">Mockup</span></div>' +
    '<p class="service-ph__report-title">' +
    escapeHtml(mockup.title) +
    '</p>' +
    '<div class="work-ph__metrics">' +
    '<span class="work-ph__metric"></span><span class="work-ph__metric"></span><span class="work-ph__metric"></span>' +
    '</div>' +
    '<div class="work-ph__chart">' +
    '<span class="work-ph__bar" style="height:35%"></span>' +
    '<span class="work-ph__bar"></span><span class="work-ph__bar"></span>' +
    '<span class="work-ph__bar"></span><span class="work-ph__bar"></span><span class="work-ph__bar"></span>' +
    '</div></div></div></figure>'
  );
}

function navDropdownItems(prefix, activeSlug) {
  return services
    .map(function (service) {
      var active = service.slug === activeSlug ? ' nav__dropdown-item--active' : '';
      return (
        '            <a href="' +
        prefix +
        service.slug +
        '.html" class="nav__dropdown-item nav__dropdown-item--' +
        service.theme +
        active +
        '" role="menuitem">\n' +
        '              <span class="nav__dropdown-icon" aria-hidden="true">' +
        service.icon +
        '</span>\n' +
        '              <span class="nav__dropdown-copy">\n' +
        '                <span class="nav__dropdown-name">' +
        service.title +
        '</span>\n' +
        '                <span class="nav__dropdown-desc">' +
        service.tagline +
        '</span>\n' +
        '              </span>\n' +
        '            </a>'
      );
    })
    .join('\n');
}

function renderPage(service) {
  var bullets = service.bullets
    .map(function (item) {
      return '            <li>' + escapeHtml(item) + '</li>';
    })
    .join('\n');

  var tools = service.tools
    .map(function (tool) {
      return '            <li>' + escapeHtml(tool) + '</li>';
    })
    .join('\n');

  var mockups = service.mockups.map(mockupHtml).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../assets/favicon.svg" sizes="any" />
    <meta name="description" content="${escapeHtml(service.description)}" />
    <meta name="author" content="Adrien Yvin" />
    <meta name="theme-color" content="#0b0c08" />
    <meta name="booking-url" content="https://calendly.com/adrienyvin/30min" />
    <meta name="email-subject" content="Our dashboards never match — can Data Foundry help?" />
    <link rel="canonical" href="https://trockin8r.github.io/Data_Foundry_Inc/services/${service.slug}.html" />
    <title>${escapeHtml(service.title)} | Data Foundry Inc.</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../css/styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to main content</a>

    <header class="nav">
      <div class="nav__inner">
        <a class="nav__brand" href="../index.html" aria-label="Data Foundry Inc. home">
          <span class="nav__mark" aria-hidden="true"></span>
          <span class="nav__wordmark">
            <span class="nav__name">Data Foundry</span>
            <span class="nav__inc">Inc.</span>
          </span>
        </a>
        <nav class="nav__links" id="nav-menu" aria-label="Primary">
          <a href="../index.html#schema">Vision</a>
          <div class="nav__dropdown-wrap">
            <a href="../index.html#services" class="nav__link">Services</a>
            <div class="nav__dropdown" role="menu" aria-label="Services menu">
${navDropdownItems('', service.slug)}
            </div>
          </div>
          <a href="../index.html#audience">Who we work with</a>
          <a href="../index.html#founder">About Us</a>
          <a href="../index.html#faq">FAQ</a>
          <a class="btn btn--nav-mobile booking-link" href="https://calendly.com/adrienyvin/30min" target="_blank" rel="noopener noreferrer">Book a call</a>
        </nav>
        <a class="btn btn--nav booking-link" href="https://calendly.com/adrienyvin/30min" target="_blank" rel="noopener noreferrer">Book a call</a>
        <button
          class="nav__toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="nav-menu"
        >
          <span class="nav__toggle-bar" aria-hidden="true"></span>
          <span class="nav__toggle-bar" aria-hidden="true"></span>
          <span class="nav__toggle-bar" aria-hidden="true"></span>
        </button>
      </div>
    </header>

    <main id="main" class="service-page service-page--${service.theme}">
      <div class="service-page__inner">
        <nav class="service-page__crumb" aria-label="Breadcrumb">
          <a href="../index.html#services">Services</a>
          <span aria-hidden="true">/</span>
          <span>${escapeHtml(service.layer)}</span>
        </nav>

        <header class="service-page__header">
          <p class="service-page__layer">${escapeHtml(service.layer)}</p>
          <h1 class="service-page__title">${escapeHtml(service.title)}</h1>
          <p class="service-page__intro">${escapeHtml(service.tagline)}</p>
          <p class="service-page__overview">${escapeHtml(service.overview)}</p>
        </header>

        <section class="service-page__stack" aria-labelledby="service-stack-heading">
          <h2 id="service-stack-heading" class="service-page__label">Tools we work with</h2>
          <ul class="service-page__tools">
${tools}
          </ul>
        </section>

        <section class="service-page__body" aria-labelledby="service-detail-heading">
          <h2 id="service-detail-heading" class="service-page__label">What we deliver</h2>
          <ul class="service-page__list">
${bullets}
          </ul>
        </section>

        <section class="service-page__mockups" aria-labelledby="service-mockups-heading">
          <h2 id="service-mockups-heading" class="service-page__label">Example outputs</h2>
          <p class="service-page__mockups-note">Illustrative mockups — client deliverables are tailored to your Fabric, Power BI, and BigQuery estate.</p>
          <div class="service-page__mockups-grid">
${mockups}
          </div>
        </section>

        <div class="service-page__cta">
          <a class="btn btn--ghost" href="../index.html#services">All services</a>
          <a class="btn booking-link" href="https://calendly.com/adrienyvin/30min" target="_blank" rel="noopener noreferrer">Book a call</a>
        </div>
      </div>
    </main>

    <footer class="footer" id="contact">
      <p class="footer__copy">&copy; 2026 Data Foundry Inc.</p>
      <div class="footer__links">
        <a class="booking-link" href="https://calendly.com/adrienyvin/30min" target="_blank" rel="noopener noreferrer">Book a call</a>
        <a class="email-link" href="mailto:adrienyvin@datafoundry.inc">adrienyvin@datafoundry.inc</a>
        <a href="https://www.linkedin.com/in/adrienyvin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
    <script src="../js/site.js"></script>
  </body>
</html>
`;
}

const outDir = path.join(__dirname, '..', 'services');
fs.mkdirSync(outDir, { recursive: true });

services.forEach(function (service) {
  fs.writeFileSync(path.join(outDir, service.slug + '.html'), renderPage(service));
});

console.log('Wrote ' + services.length + ' service pages.');
