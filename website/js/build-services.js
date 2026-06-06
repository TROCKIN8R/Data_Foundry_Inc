/* Dev helper — run with: node website/js/build-services.js */
const fs = require('fs');
const path = require('path');

const services = [
  {
    slug: 'ingestion',
    group: 'data',
    theme: 'bronze',
    layer: 'Bronze',
    title: 'Data Ingestion & Pipelines',
    tagline: 'Reliable ingest — governed from the first load.',
    description:
      'Governed bronze-layer ingest with Microsoft Fabric pipelines, OneLake, and BigQuery — APIs, databases, SaaS, and files cataloged from day one.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    overview:
      'Every downstream dashboard depends on what lands first. We connect your operational systems to OneLake or BigQuery bronze with incremental loads, failure alerts, and catalog metadata — so silver and gold layers build on a complete, auditable record of what arrived and when.',
    layerContext:
      'Bronze is raw chunks: unstructured, unfiltered, but never undocumented. Every source lands with ingest policy and catalog entries before transformation begins.',
    governance: 'Catalog · Ingest policy',
    problems: [
      'Silent skips · duplicate rows',
      'No watermark · nightly full reloads',
      'On-prem invisible until close',
    ],
    tools: [
      'Microsoft Fabric Data Factory',
      'Fabric Data Pipelines',
      'OneLake & Lakehouse',
      'BigQuery Data Transfer Service',
      'Azure Data Factory (hybrid)',
      'Microsoft Purview catalog',
    ],
    useCases: [
      {
        title: 'Transactional ERP to OneLake',
        detail:
          'SQL Server and Oracle tables replicate incrementally into Fabric lakehouse bronze — watermark columns, schema-drift capture, Teams alert on failure.',
        tech: ['Fabric Pipelines', 'SQL Server', 'OneLake'],
      },
      {
        title: 'SaaS API landing zone',
        detail:
          'CRM, billing, and marketing APIs land as raw JSON with source-system tags and ingest timestamps — ready for silver conforming without re-pulling history.',
        tech: ['REST connectors', 'Lakehouse', 'Purview'],
      },
      {
        title: 'Hybrid Fabric ↔ BigQuery',
        detail:
          'Replicate bronze between Fabric and BigQuery without duplicating business logic — one ingest path, two compute tiers for migration or dual-estate teams.',
        tech: ['BigQuery DTS', 'ADF', 'Fabric'],
      },
      {
        title: 'Enrollment and operational files',
        detail:
          'Scheduled flat-file drops from legacy systems land in partitioned bronze tables with row counts logged — gaps surface before anyone builds a report on empty data.',
        tech: ['Fabric Pipelines', 'Parquet', 'Python'],
      },
    ],
    bullets: [
      'Incremental loads · watermarks',
      'Retry chains · failure alerts',
      'Schema drift capture',
      'Purview catalog metadata',
    ],
    compare: [
      { instead: 'CSV drops in shared drives', youGet: 'Scheduled pipelines · row counts · alerts' },
      { instead: 'Nightly full reloads', youGet: 'Watermark incremental loads' },
      { instead: 'Untraceable sources', youGet: 'Catalog lineage from day one' },
    ],
    proof: {
      client: 'Cascades',
      detail: 'Fabric · BigQuery · ML pricing pipelines',
    },
    mockups: [
      {
        caption: 'Multi-source pipeline — ERP and SaaS into OneLake bronze',
        kind: 'pipeline',
        labels: ['SQL Server', 'SaaS API', 'OneLake', 'Lakehouse'],
      },
      {
        caption: 'Bronze landing table — raw payload preserved with audit columns',
        kind: 'schema',
        table: 'bronze.sales_orders_raw',
        columns: [
          ['order_id', 'STRING', 'PK'],
          ['source_system', 'STRING', ''],
          ['payload_json', 'STRING', ''],
          ['_ingested_at', 'TIMESTAMP', 'audit'],
        ],
      },
      {
        caption: 'Incremental watermark — only new rows since last run',
        kind: 'schema',
        table: 'bronze._pipeline_watermarks',
        columns: [
          ['source_table', 'STRING', 'PK'],
          ['last_value', 'TIMESTAMP', ''],
          ['rows_loaded', 'INT64', ''],
          ['run_status', 'STRING', ''],
        ],
      },
      {
        caption: 'Hybrid replication — on-prem to Fabric and BigQuery',
        kind: 'pipeline',
        labels: ['On-prem DB', 'ADF', 'OneLake', 'BigQuery'],
      },
    ],
  },
  {
    slug: 'modeling',
    group: 'data',
    theme: 'silver',
    layer: 'Silver',
    title: 'Transformation & Modeling',
    tagline: 'One model, one version of the truth.',
    description:
      'Silver-layer modeling in Fabric Warehouse, dbt, and BigQuery — conformed dimensions and facts your whole org builds on.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></svg>',
    overview:
      'Conflicting KPIs usually trace back to conflicting joins. Silver is where raw bronze becomes conformed business entities — customers, products, dates — modeled once and reused everywhere. Transformations run in dbt, Spark notebooks, or SQL with tests that catch broken relationships before a dashboard ships.',
    layerContext:
      'Silver is organised spheres: modelled, standardised, and testable. Quality checks and lineage attach here — before metrics reach leadership.',
    governance: 'Quality · Lineage',
    problems: [
      'Three definitions of "customer"',
      'Logic buried in report SQL',
      'Post-merger duplicate keys',
    ],
    tools: [
      'Fabric Warehouse & Lakehouse SQL',
      'Fabric Notebooks (Spark)',
      'dbt (Fabric or BigQuery)',
      'BigQuery stored procedures',
      'Power BI semantic models',
      'SQL & Python',
    ],
    useCases: [
      {
        title: 'Conformed sales subject area',
        detail:
          'Star schema with shared dim_customer and dim_date — finance margin and sales pipeline reports pull from the same facts, not parallel spreadsheets.',
        tech: ['Fabric Warehouse', 'dbt', 'Kimball'],
      },
      {
        title: 'Brand and RGM forecasting inputs',
        detail:
          'Silver tables shaped for forecast models — conformed product hierarchies, promotional calendars, and channel mappings that Tableau and Python both consume.',
        tech: ['BigQuery', 'dbt', 'Tableau'],
      },
      {
        title: 'Post-merger entity resolution',
        detail:
          'Bridge tables and slowly changing dimensions reconcile two customer masters into one conformed dimension — historical records preserved, current state unambiguous.',
        tech: ['SCD Type 2', 'SQL', 'Spark'],
      },
      {
        title: 'Enrollment and cohort dimensions',
        detail:
          'Student and program dimensions built from messy operational sources — deduplicated keys, valid-from/to ranges, and freshness tests before SEO and enrollment reports go live.',
        tech: ['ETL', 'Python', 'SQL'],
      },
    ],
    bullets: [
      'Conformed dimensions · one customer_key',
      'dbt tests · uniqueness · freshness',
      'SCD2 · bridge tables · documented grain',
      'Version-controlled transforms',
    ],
    compare: [
      { instead: 'Report SQL redefines customer', youGet: 'Shared conformed dimensions' },
      { instead: 'Untested transforms', youGet: 'Automated key · null · freshness checks' },
      { instead: 'Undocumented grain', youGet: 'Column descriptions · lineage' },
    ],
    proof: {
      client: 'Keurig Dr Pepper Canada',
      detail: 'Brand hierarchies · Tableau RGM forecasting',
    },
    mockups: [
      {
        caption: 'Star schema — sales subject area',
        kind: 'star',
        fact: 'fact_sales',
        dims: ['dim_customer', 'dim_product', 'dim_date'],
      },
      {
        caption: 'Conformed customer dimension — SCD Type 2 columns',
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
      {
        caption: 'dbt test catalog — automated quality on silver tables',
        kind: 'schema',
        table: 'silver._dbt_tests',
        columns: [
          ['model', 'STRING', ''],
          ['test_type', 'STRING', ''],
          ['status', 'STRING', ''],
          ['last_run', 'TIMESTAMP', ''],
        ],
      },
      {
        caption: 'Bronze to silver transform chain',
        kind: 'lineage',
        chain: ['Bronze raw', 'Cleanse', 'Conform', 'Silver star'],
      },
    ],
  },
  {
    slug: 'reporting',
    group: 'data',
    theme: 'gold',
    layer: 'Gold',
    title: 'Reporting & Analytics',
    tagline: 'Dashboards and self-service on governed gold data.',
    description:
      'Executive Power BI and Tableau dashboards on certified gold datasets — one revenue number, one margin definition, everywhere.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-3"/></svg>',
    overview:
      'Gold is where data becomes decisions. Revenue, margin, and pipeline get defined once in DAX or governed views — then surfaced in dashboards leadership actually opens. The same certified models power self-service: business users explore without shadow copies, stale exports, or a second definition of "active customer."',
    layerContext:
      'Gold is golden ingots: decision-ready metrics with certified ownership. Every measure promoted here has a named owner and documented grain.',
    governance: 'Certification · Ownership',
    problems: [
      'Three teams · three revenue numbers',
      'Shadow datasets · no certification',
      'Forecasts on stale exports',
    ],
    tools: [
      'Power BI',
      'Fabric semantic models (Direct Lake)',
      'DAX & Power Query',
      'Tableau',
      'BigQuery authorized views',
      'Excel live connections',
      'Python (forecasting)',
    ],
    useCases: [
      {
        title: 'Executive KPI dashboard',
        detail:
          'Single-page Power BI on Direct Lake — revenue, margin, and volume with drill-through to plant and product. Certified dataset; row-level security by region.',
        tech: ['Power BI', 'Fabric', 'DAX'],
      },
      {
        title: 'Brand forecast cockpit',
        detail:
          'Tableau workbooks on governed gold tables — promotional lift, channel mix, and scenario sliders fed by the same ETL your finance team already trusts.',
        tech: ['Tableau', 'BigQuery', 'ETL'],
      },
      {
        title: 'Consumption forecasting',
        detail:
          'Power BI visuals backed by Python time-series models — provincial gas demand forecast refreshed on schedule with confidence bands leadership can interpret.',
        tech: ['Power BI', 'Python', 'scikit-learn'],
      },
      {
        title: 'Self-service regional explorer',
        detail:
          'Certified semantic model exposed for self-service — drag fields, filter by territory, export to Excel live. Build permissions locked; golden dataset is the only source.',
        tech: ['Power BI', 'RLS', 'Excel'],
      },
    ],
    bullets: [
      'Certified KPIs · one revenue number',
      'DAX measure library · documented',
      'Row-level security · Azure AD',
      'Self-service on golden datasets',
      'ML forecasts in Power BI',
    ],
    compare: [
      { instead: 'Competing revenue definitions', youGet: 'One certified measure everywhere' },
      { instead: 'Self-service on raw tables', youGet: 'Governed semantic models' },
      { instead: 'Board deck exports', youGet: 'Live dashboards · scheduled refresh' },
    ],
    proof: {
      client: 'Cascades',
      detail: 'Executive KPIs · ML pricing · Fabric gold',
    },
    mockups: [
      {
        caption: 'Executive KPI dashboard — Power BI on Fabric Direct Lake',
        kind: 'report',
        title: 'Revenue & margin overview',
      },
      {
        caption: 'Certified measure library — single definitions',
        kind: 'schema',
        table: 'gold.semantic_measures',
        columns: [
          ['measure_name', 'STRING', ''],
          ['dax_expression', 'STRING', ''],
          ['certified', 'BOOL', ''],
          ['owner', 'STRING', ''],
        ],
      },
      {
        caption: 'Forecast visual — Python model in Power BI',
        kind: 'report',
        title: 'Demand forecast with confidence band',
      },
      {
        caption: 'Semantic model — tables exposed to self-service',
        kind: 'semantic',
        tables: ['Sales', 'Customer', 'Date'],
      },
    ],
  },
  {
    slug: 'governance',
    group: 'data',
    theme: 'governance',
    layer: 'Every layer',
    title: 'Governance & Quality',
    tagline: 'Lineage, quality, and ownership built in.',
    description:
      'Microsoft Purview, Fabric catalog, and automated quality checks — lineage and ownership across bronze, silver, and gold.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    overview:
      'Governance is how your team trusts the data every morning — not a one-time audit deck. We wire catalog, lineage, quality rules, and access patterns across every medallion layer so when a metric breaks, you know which pipeline to fix and who owns the fix.',
    layerContext:
      'Governance runs at every layer — catalog and ingest policy in bronze, quality and lineage in silver, certification and ownership in gold, access and compliance at the point of consumption.',
    governance: 'Lineage · Quality · Access',
    problems: [
      'Revenue lineage unknown',
      'Quality found in meetings',
      'No table ownership',
    ],
    tools: [
      'Microsoft Purview',
      'Fabric unified catalog',
      'BigQuery policy tags & DLP',
      'dbt tests & Fabric Data Quality',
      'Azure AD / IAM',
      'Power BI endorsements',
    ],
    useCases: [
      {
        title: 'End-to-end lineage',
        detail:
          'Trace a Power BI visual back through the semantic model, gold table, silver transform, and bronze ingest — impact analysis before you rename a column.',
        tech: ['Purview', 'Fabric catalog', 'Power BI'],
      },
      {
        title: 'Automated quality gates',
        detail:
          'Freshness, null-rate, and referential checks on silver tables — Teams or email alert when thresholds breach, not when a dashboard looks wrong.',
        tech: ['dbt tests', 'Fabric DQ', 'Alerts'],
      },
      {
        title: 'Sensitivity and access',
        detail:
          'Policy tags on PII columns, row-level security patterns documented, and access reviews tied to Azure AD groups — auditors get answers, not archaeology.',
        tech: ['Purview', 'RLS', 'IAM'],
      },
      {
        title: 'Certified dataset promotion',
        detail:
          'Workflow for promoting semantic models to certified status — owner assigned, description complete, lineage verified before self-service opens.',
        tech: ['Power BI', 'Endorsements', 'Catalog'],
      },
    ],
    bullets: [
      'Report-to-source lineage',
      'Freshness · null · referential alerts',
      'Named ownership per asset',
      'Sensitivity labels · access docs',
      'Extensible quality rule catalog',
    ],
    compare: [
      { instead: 'Yearly audit governance', youGet: 'Quality rules on every refresh' },
      { instead: 'Tribal ownership knowledge', youGet: 'Purview metadata on every asset' },
      { instead: 'Slack lineage archaeology', youGet: 'Click-through impact analysis' },
    ],
    proof: {
      client: 'Cascades',
      detail: 'Purview lineage · Fabric · Power BI gold',
    },
    mockups: [
      {
        caption: 'Lineage chain — dashboard measure to bronze source',
        kind: 'lineage',
        chain: ['Power BI', 'Semantic model', 'Gold table', 'Silver transform', 'Bronze ingest'],
      },
      {
        caption: 'Quality rules — automated checks on silver',
        kind: 'schema',
        table: 'governance.quality_rules',
        columns: [
          ['rule_id', 'STRING', 'PK'],
          ['target_table', 'STRING', ''],
          ['check_type', 'STRING', ''],
          ['threshold', 'STRING', ''],
        ],
      },
      {
        caption: 'Catalog entry — owner, sensitivity, last refresh',
        kind: 'schema',
        table: 'purview.asset_registry',
        columns: [
          ['asset_name', 'STRING', ''],
          ['owner', 'STRING', ''],
          ['classification', 'STRING', ''],
          ['last_refresh', 'TIMESTAMP', ''],
        ],
      },
      {
        caption: 'Certification workflow — promote to governed gold',
        kind: 'pipeline',
        labels: ['Draft model', 'Review', 'Certified', 'Self-service'],
      },
    ],
  },
  {
    slug: 'automations',
    group: 'automations',
    theme: 'platinum',
    layer: 'Platinum',
    title: 'Automation Flows',
    tagline: 'Set-and-forget pipelines across your apps.',
    description:
      'Zapier, Power Automate, and webhook flows — event-driven pipelines that survive incomplete fields, duplicates, and schema drift.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M9 6h6"/><path d="M18 9v6"/><path d="M15 18H9"/><path d="M6 15V9"/></svg>',
    overview:
      'Manual handoffs leak at every system boundary. We replace them with event-driven pipelines — webhook in, validated, routed, delivered — built in Zapier, Power Automate, or custom endpoints. Every flow includes error branches, retry logic, and field mapping tested against the messy records production actually sends.',
    layerContext:
      'Platinum is operational output: humans and systems acting on trusted data. Automations sit here — triggering on events, not on someone remembering to copy a row.',
    governance: 'Access · Compliance',
    problems: [
      'Manual re-keying between apps',
      'Demo zaps · production failures',
      'Alert floods · silent script death',
    ],
    tools: [
      'Zapier',
      'Power Automate',
      'Azure Logic Apps',
      'Custom webhooks',
      'Microsoft 365',
      'Slack & Teams',
    ],
    useCases: [
      {
        title: 'Booking to signed contract',
        detail:
          'Calendly booking triggers personalized contract generation and e-sign delivery — no one copies attendee details into a template.',
        tech: ['Zapier', 'DocuSign', 'Calendly'],
      },
      {
        title: 'Threshold monitoring and alerts',
        detail:
          'Webhook-fired checks on operational metrics — Slack or SMS when inventory, pricing, or production crosses a limit, with dead-letter logging when the payload is malformed.',
        tech: ['Power Automate', 'Webhooks', 'Teams'],
      },
      {
        title: 'CRM to accounting sync',
        detail:
          'Closed-won deals create invoices automatically — field mapping handles currency, tax codes, and duplicate webhook deliveries without double-billing.',
        tech: ['Zapier', 'CRM', 'QuickBooks'],
      },
      {
        title: 'Legacy ERP to cloud warehouse bridge',
        detail:
          'Scheduled extraction from on-prem transactional systems into Fabric or BigQuery — replacing brittle scripts that break on schema changes.',
        tech: ['Power Automate', 'ADF', 'Fabric'],
      },
    ],
    bullets: [
      'Error branches · dead-letter queues',
      'Null-safe field mapping',
      'Slack · Teams · SMS alerts',
      'CRM · accounting · scheduling sync',
      'Runbooks · monitoring hooks',
    ],
    compare: [
      { instead: 'Zap with no error path', youGet: 'Branching · dead-letter · logged failures' },
      { instead: 'Hard-coded mappings', youGet: 'Null · duplicate · type-safe transforms' },
      { instead: 'Fire-and-forget deploy', youGet: 'Edge-case tested before handoff' },
    ],
    proof: {
      client: 'Cascades',
      detail: 'Power Automate · threshold alerts · pricing triggers',
    },
    mockups: [
      {
        caption: 'Event flow — webhook trigger to Teams alert',
        kind: 'automation',
        steps: ['Webhook', 'Validate', 'Branch', 'Teams alert'],
      },
      {
        caption: 'CRM-to-accounting sync with audit trail',
        kind: 'pipeline',
        labels: ['CRM event', 'Transform', 'Accounting', 'Audit log'],
      },
      {
        caption: 'Error branch — malformed payload to dead letter',
        kind: 'automation',
        steps: ['Trigger', 'Validate', 'Dead letter', 'Notify ops'],
      },
      {
        caption: 'Calendly to contract — booking to e-sign',
        kind: 'pipeline',
        labels: ['Calendly', 'Generate', 'E-sign', 'CRM update'],
      },
    ],
  },
  {
    slug: 'ai-agents',
    group: 'automations',
    theme: 'platinum',
    layer: 'Platinum',
    title: 'AI Agents',
    tagline: 'Grounded AI for documents and unstructured inputs.',
    description:
      'AI agents for invoice capture and internal Q&A — responses grounded in your approved sources, with citations and access controls.',
    icon:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>',
    overview:
      'Agents earn their place only where unstructured input or natural-language access saves real time — invoice photos to structured records, policy questions answered from internal docs. Retrieval stays scoped to approved sources. Every response cites its origin; access follows your existing permissions.',
    layerContext:
      'Platinum outputs include AI agents — consumers of governed gold data and approved document sets. No open-web guessing; answers trace back to sources your org already trusts.',
    governance: 'Access · Compliance',
    problems: [
      'Manual invoice entry',
      'SharePoint policy scavenger hunts',
      'Ungrounded chatbot hallucinations',
    ],
    tools: [
      'Copilot Studio',
      'Azure OpenAI',
      'Power Automate AI Builder',
      'SharePoint retrieval',
      'Fabric / gold datasets',
    ],
    useCases: [
      {
        title: 'Invoice capture to ERP',
        detail:
          'Photo or PDF upload extracts line items, validates totals against PO rules, and posts structured records — exceptions routed to a human queue, not silently dropped.',
        tech: ['AI Builder', 'Power Automate', 'ERP'],
      },
      {
        title: 'Internal policy assistant',
        detail:
          'Employees ask operational questions in natural language — responses cite the SharePoint page and section, scoped to documents they already have access to.',
        tech: ['Copilot Studio', 'SharePoint', 'Azure OpenAI'],
      },
      {
        title: 'Document-grounded reporting helper',
        detail:
          'Agent answers "what drove margin last quarter?" by combining certified gold metrics with approved commentary docs — numbers from the warehouse, context from governance-approved sources.',
        tech: ['Fabric', 'Power BI', 'RAG'],
      },
      {
        title: 'Exception triage on pipeline failures',
        detail:
          'When a bronze load fails, an agent summarizes the error log, suggests likely root cause from runbook docs, and opens a tracked ticket — reducing time-to-diagnosis.',
        tech: ['Webhooks', 'Copilot', 'Teams'],
      },
    ],
    bullets: [
      'Invoice OCR · validation · ERP post',
      'Cited Q&A · approved doc sets',
      'Gold-layer grounded retrieval',
      'Access controls · audit logging',
      'Human queue · low-confidence cases',
    ],
    compare: [
      { instead: 'Open-web chatbot', youGet: 'Approved docs · governed datasets only' },
      { instead: 'AI guesses when unsure', youGet: 'Cited answer · or explicit unknown' },
      { instead: 'Manual photo entry', youGet: 'Structured lines · validated post' },
    ],
    proof: {
      client: 'Cascades',
      detail: 'Copilot · governed Fabric · doc retrieval',
    },
    mockups: [
      {
        caption: 'Invoice capture — photo to validated ERP post',
        kind: 'pipeline',
        labels: ['Photo upload', 'OCR + extract', 'Validate', 'ERP post'],
      },
      {
        caption: 'Policy assistant — answer with source citation',
        kind: 'report',
        title: 'Policy & ops assistant',
      },
      {
        caption: 'Confidence routing — auto-post vs human review',
        kind: 'automation',
        steps: ['Document in', 'Extract', 'High conf.', 'Human queue'],
      },
      {
        caption: 'Grounded retrieval — scoped document index',
        kind: 'schema',
        table: 'agents.document_index',
        columns: [
          ['doc_id', 'STRING', 'PK'],
          ['source_path', 'STRING', ''],
          ['access_group', 'STRING', ''],
          ['last_indexed', 'TIMESTAMP', ''],
        ],
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
      '<figure class="service-mock service-mock--lite">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="work-ph__flow">' +
      nodes +
      '</div></div></figure>'
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
      '<figure class="service-mock service-mock--lite">' +
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
      '<figure class="service-mock service-mock--lite">' +
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
      '<figure class="service-mock service-mock--lite">' +
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
      '<figure class="service-mock service-mock--lite">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__semantic">' +
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
      '<figure class="service-mock service-mock--lite">' +
      '<figcaption class="service-mock__caption">' +
      caption +
      '</figcaption>' +
      '<div class="service-mock__frame"><div class="service-ph__automation">' +
      steps +
      '</div></div></figure>'
    );
  }

  return (
    '<figure class="service-mock service-mock--lite">' +
    '<figcaption class="service-mock__caption">' +
    caption +
    '</figcaption>' +
    '<div class="service-mock__frame"><div class="work-ph">' +
    '<p class="service-ph__report-title">' +
    escapeHtml(mockup.title) +
    '</p>' +
    '<div class="work-ph__metrics">' +
    '<span class="work-ph__metric"></span><span class="work-ph__metric"></span><span class="work-ph__metric"></span>' +
    '</div>' +
    '<div class="work-ph__chart">' +
    '<span class="work-ph__bar" style="height:35%"></span>' +
    '<span class="work-ph__bar"></span><span class="work-ph__bar"></span>' +
    '<span class="work-ph__bar"></span>' +
    '</div></div></div></figure>'
  );
}

function navDropdownEyebrow(label, modifier) {
  return (
    '            <p class="nav__dropdown-eyebrow nav__dropdown-eyebrow--' +
    modifier +
    '" role="presentation">' +
    label +
    '</p>\n'
  );
}

function navDropdownItem(prefix, service, activeSlug) {
  var active = service.slug === activeSlug ? ' nav__dropdown-item--active' : '';
  return (
    '            <a href="' +
    prefix +
    service.slug +
    '.html" class="nav__dropdown-item nav__dropdown-item--' +
    service.theme +
    ' nav__dropdown-item--' +
    service.slug +
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
}

function serviceBySlug(slug) {
  return services.find(function (service) {
    return service.slug === slug;
  });
}

function navDropdownItems(prefix, activeSlug) {
  var dataSlugs = ['ingestion', 'modeling', 'reporting', 'governance'];
  var autoSlugs = ['automations', 'ai-agents'];

  return (
    navDropdownEyebrow('Data', 'data') +
    dataSlugs
      .map(function (slug) {
        return navDropdownItem(prefix, serviceBySlug(slug), activeSlug);
      })
      .join('\n') +
    navDropdownEyebrow('Automation', 'auto') +
    autoSlugs
      .map(function (slug) {
        return navDropdownItem(prefix, serviceBySlug(slug), activeSlug);
      })
      .join('\n')
  );
}

function renderPage(service) {
  var bullets = service.bullets
    .map(function (item) {
      return '              <li>' + escapeHtml(item) + '</li>';
    })
    .join('\n');

  var tools = service.tools
    .map(function (tool) {
      return '              <li>' + escapeHtml(tool) + '</li>';
    })
    .join('\n');

  var problems = service.problems
    .map(function (item) {
      return '              <li>' + escapeHtml(item) + '</li>';
    })
    .join('\n');

  var useCases = service.useCases
    .slice(0, 3)
    .map(function (item) {
      var tech = item.tech
        .map(function (tag) {
          return '<span>' + escapeHtml(tag) + '</span>';
        })
        .join('');
      return (
        '            <li class="service-deploy">\n' +
        '              <span class="service-deploy__name">' +
        escapeHtml(item.title) +
        '</span>\n' +
        '              <div class="service-deploy__tech">' +
        tech +
        '</div>\n' +
        '            </li>'
      );
    })
    .join('\n');

  var compare = service.compare
    .map(function (row) {
      return (
        '            <li class="service-page__compare-row">\n' +
        '              <span class="service-page__compare-alt">' +
        escapeHtml(row.instead) +
        '</span>\n' +
        '              <span class="service-page__compare-edge">' +
        escapeHtml(row.youGet) +
        '</span>\n' +
        '            </li>'
      );
    })
    .join('\n');

  var proof = service.proof
    ? '          <p class="service-page__ref"><strong>' +
      escapeHtml(service.proof.client) +
      '</strong> — ' +
      escapeHtml(service.proof.detail) +
      '</p>\n'
    : '';

  var mockups = service.mockups.slice(0, 2).map(mockupHtml).join('\n\n');

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
            <div class="nav__dropdown nav__dropdown--matrix" role="menu" aria-label="Services menu">
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

        <div class="service-page__grid">
          <header class="service-page__header">
            <p class="service-page__layer">${escapeHtml(service.layer)}</p>
            <h1 class="service-page__title">${escapeHtml(service.title)}</h1>
            <p class="service-page__intro">${escapeHtml(service.tagline)}</p>
            <p class="service-page__overview">${escapeHtml(service.overview)}</p>
            <div class="service-page__meta">
              <span class="service-page__meta-gov">${escapeHtml(service.governance)}</span>
            </div>
${proof}          </header>

          <aside class="service-page__visuals" aria-labelledby="service-mockups-heading">
            <h2 id="service-mockups-heading" class="service-page__label service-page__label--vis">Outputs</h2>
            <div class="service-page__mockups-stack">
${mockups}
            </div>
          </aside>

          <div class="service-page__pair">
            <section class="service-page__section" aria-labelledby="service-problems-heading">
              <h2 id="service-problems-heading" class="service-page__label">Problems</h2>
              <ul class="service-kw-list">
${problems}
              </ul>
            </section>

            <section class="service-page__section" aria-labelledby="service-stack-heading">
              <h2 id="service-stack-heading" class="service-page__label">Technology</h2>
              <ul class="service-page__tools">
${tools}
              </ul>
            </section>
          </div>

          <section class="service-page__section service-page__section--deploy" aria-labelledby="service-cases-heading">
            <h2 id="service-cases-heading" class="service-page__label">Deployments</h2>
            <ul class="service-deploy-list">
${useCases}
            </ul>
          </section>

          <div class="service-page__duo">
            <section class="service-page__section" aria-labelledby="service-detail-heading">
              <h2 id="service-detail-heading" class="service-page__label">Deliverables</h2>
              <ul class="service-kw-list">
${bullets}
              </ul>
            </section>

            <section class="service-page__section" aria-labelledby="service-compare-heading">
              <h2 id="service-compare-heading" class="service-page__label">Standard</h2>
              <ul class="service-page__compare-list">
${compare}
              </ul>
            </section>
          </div>

          <div class="service-page__cta">
            <a class="btn btn--ghost" href="../index.html#services">All services</a>
            <a class="btn booking-link" href="https://calendly.com/adrienyvin/30min" target="_blank" rel="noopener noreferrer">Book a call</a>
          </div>
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
