/* Service page infographics — aligned with home stack cards */
module.exports = {
  ingestion: `
<div class="svc-vis svc-vis--page svc-vis--bronze">
  <div class="svc-vis__compose svc-vis__compose--page svc-vis__compose--solo">
    <div class="svc-snippet svc-snippet--solo svc-snippet--ingest-lineage">
      <p class="svc-snippet__label">Ingestion lineage</p>
      <div class="svc-ingest-lineage">
        <div class="svc-ingest-lineage__sources">
          <div class="svc-ingest-lineage__source"><span class="svc-ingest-lineage__node"></span><span>REST API</span></div>
          <div class="svc-ingest-lineage__source"><span class="svc-ingest-lineage__node"></span><span>SQL Server</span></div>
          <div class="svc-ingest-lineage__source"><span class="svc-ingest-lineage__node"></span><span>SaaS export</span></div>
        </div>
        <div class="svc-ingest-lineage__rail" aria-hidden="true">
          <span class="svc-ingest-lineage__step">Extract</span>
          <span class="svc-ingest-lineage__tick"></span>
          <span class="svc-ingest-lineage__step">Validate</span>
          <span class="svc-ingest-lineage__tick"></span>
          <span class="svc-ingest-lineage__step">Catalog</span>
          <span class="svc-ingest-lineage__tick"></span>
          <span class="svc-ingest-lineage__step">Load</span>
        </div>
        <div class="svc-ingest-lineage__sink">
          <span class="svc-vis__marker svc-vis__marker--bronze"><span class="ore ore--2 schema-compact__ore"></span></span>
          <div class="svc-ingest-lineage__sink-copy">
            <strong>Data lake</strong>
            <span>OneLake · Bronze landing</span>
          </div>
        </div>
      </div>
    </div>
    <span class="svc-vis__float svc-vis__float--ore svc-vis__float--a" aria-hidden="true"><span class="ore ore--2 schema-compact__ore"></span></span>
    <span class="svc-vis__float svc-vis__float--ore svc-vis__float--b" aria-hidden="true"><span class="ore ore--3 schema-compact__ore"></span></span>
  </div>
</div>`,

  modeling: `
<div class="svc-vis svc-vis--page svc-vis--silver">
  <div class="svc-vis__compose svc-vis__compose--page svc-vis__compose--solo">
    <div class="svc-snippet svc-snippet--solo svc-snippet--consolidate">
      <p class="svc-snippet__label">Sales consolidation</p>
      <div class="svc-consolidate">
        <div class="svc-consolidate__systems">
          <div class="svc-consolidate__system"><span class="svc-consolidate__sphere"></span><span>Salesforce</span></div>
          <div class="svc-consolidate__system"><span class="svc-consolidate__sphere"></span><span>NetSuite</span></div>
          <div class="svc-consolidate__system"><span class="svc-consolidate__sphere"></span><span>Shopify</span></div>
        </div>
        <div class="svc-consolidate__merge" aria-hidden="true">
          <span class="svc-consolidate__line svc-consolidate__line--l"></span>
          <span class="svc-consolidate__line svc-consolidate__line--c"></span>
          <span class="svc-consolidate__line svc-consolidate__line--r"></span>
          <span class="svc-consolidate__hub">Merge &amp; conform</span>
        </div>
        <div class="svc-consolidate__output">
          <span class="svc-vis__marker svc-vis__marker--silver" aria-hidden="true"></span>
          <div class="svc-consolidate__output-copy">
            <strong>sales_unified</strong>
            <span>1 governed sales dataset</span>
          </div>
        </div>
      </div>
    </div>
    <span class="svc-vis__float svc-vis__float--sphere svc-vis__float--a" aria-hidden="true"></span>
    <span class="svc-vis__float svc-vis__float--sphere svc-vis__float--b" aria-hidden="true"></span>
  </div>
</div>`,

  reporting: `
<div class="svc-vis svc-vis--page svc-vis--gold">
  <div class="svc-vis__compose svc-vis__compose--page">
    <div class="svc-snippet svc-snippet--primary svc-snippet--dashboard">
      <p class="svc-snippet__label">Executive dashboard</p>
      <div class="svc-dash__kpis">
        <div class="svc-dash__kpi">
          <span class="svc-dash__kpi-val">$4.2M</span>
          <span class="svc-dash__kpi-lbl">Revenue</span>
        </div>
        <div class="svc-dash__kpi">
          <span class="svc-dash__kpi-val">+12%</span>
          <span class="svc-dash__kpi-lbl">YoY growth</span>
        </div>
      </div>
      <div class="svc-dash__trend" aria-hidden="true"><span class="svc-dash__trend-line"></span></div>
      <div class="svc-dash__bars" aria-hidden="true">
        <span style="--h: 42%"></span>
        <span style="--h: 68%"></span>
        <span style="--h: 55%"></span>
        <span style="--h: 82%"></span>
        <span style="--h: 61%"></span>
      </div>
    </div>
    <span class="svc-vis__float svc-vis__float--ingot svc-vis__float--a" aria-hidden="true"></span>
    <span class="svc-vis__float svc-vis__float--ingot svc-vis__float--b" aria-hidden="true"></span>
    <div class="svc-snippet svc-snippet--secondary svc-snippet--semantic">
      <p class="svc-snippet__label">Self-serve BI</p>
      <ul class="svc-semantic__list">
        <li><span class="svc-semantic__name">Sales Metrics</span><span class="svc-semantic__cert">Certified</span></li>
        <li><span class="svc-semantic__name">Finance Core</span><span class="svc-semantic__cert">Certified</span></li>
        <li><span class="svc-semantic__name">Ops KPIs</span><span class="svc-semantic__cert">Certified</span></li>
      </ul>
    </div>
  </div>
</div>`,

  governance: `
<div class="svc-vis svc-vis--page svc-vis--governance">
  <div class="svc-vis__compose svc-vis__compose--page">
    <div class="svc-snippet svc-snippet--primary svc-snippet--lineage">
      <p class="svc-snippet__label">End-to-end lineage</p>
      <div class="svc-lineage" aria-hidden="true">
        <span class="svc-vis__marker svc-vis__marker--bronze"><span class="ore ore--2 schema-compact__ore"></span></span>
        <span class="svc-lineage__line"></span>
        <span class="svc-vis__marker svc-vis__marker--silver"></span>
        <span class="svc-lineage__line"></span>
        <span class="svc-vis__marker svc-vis__marker--gold"></span>
      </div>
      <p class="svc-lineage__caption">Source → Model → Report</p>
    </div>
    <span class="svc-vis__float svc-vis__float--shield svc-vis__float--a" aria-hidden="true"><span class="stage__governance-icon"></span></span>
    <span class="svc-vis__float svc-vis__float--ingot svc-vis__float--c" aria-hidden="true"></span>
    <div class="svc-snippet svc-snippet--secondary svc-snippet--quality">
      <p class="svc-snippet__label">Quality gates</p>
      <ul class="svc-quality__list">
        <li>Data contracts</li>
        <li>Automated checks</li>
        <li>Named stewards</li>
      </ul>
    </div>
  </div>
</div>`,

  automations: `
<div class="svc-vis svc-vis--page svc-vis--platinum">
  <div class="svc-vis__compose svc-vis__compose--page svc-vis__compose--solo">
    <div class="svc-snippet svc-snippet--solo svc-snippet--workflow">
      <p class="svc-snippet__label">Automated workflow</p>
      <ol class="svc-workflow-steps">
        <li>
          <span class="svc-workflow-steps__num">1</span>
          <span class="svc-workflow-steps__copy">
            <strong>Form submitted</strong>
            <em>Webhook trigger</em>
          </span>
        </li>
        <li>
          <span class="svc-workflow-steps__num">2</span>
          <span class="svc-workflow-steps__copy">
            <strong>Validate fields</strong>
            <em>Branch on errors</em>
          </span>
        </li>
        <li>
          <span class="svc-workflow-steps__num">3</span>
          <span class="svc-workflow-steps__copy">
            <strong>Create CRM record</strong>
            <em>Map &amp; dedupe</em>
          </span>
        </li>
        <li>
          <span class="svc-workflow-steps__num">4</span>
          <span class="svc-workflow-steps__copy">
            <strong>Notify in Slack</strong>
            <em>Logged delivery</em>
          </span>
        </li>
      </ol>
    </div>
    <span class="svc-vis__float svc-vis__float--platinum svc-vis__float--a" aria-hidden="true"></span>
    <span class="svc-vis__float svc-vis__float--platinum svc-vis__float--b" aria-hidden="true"></span>
  </div>
</div>`,

  'ai-agents': `
<div class="svc-vis svc-vis--page svc-vis--platinum">
  <div class="svc-vis__compose svc-vis__compose--page svc-vis__compose--solo">
    <div class="svc-snippet svc-snippet--solo svc-snippet--agent-hub">
      <p class="svc-snippet__label">Grounded agent</p>
      <div class="svc-agent-hub">
        <div class="svc-agent-hub__feeds">
          <div class="svc-agent-hub__feed svc-agent-hub__feed--doc">
            <span class="svc-agent-hub__glyph svc-agent-hub__glyph--doc" aria-hidden="true"></span>
            <span>Contract PDF</span>
          </div>
          <div class="svc-agent-hub__feed svc-agent-hub__feed--data">
            <span class="svc-agent-hub__glyph svc-agent-hub__glyph--data" aria-hidden="true"></span>
            <span>CRM API</span>
          </div>
          <div class="svc-agent-hub__feed svc-agent-hub__feed--img">
            <span class="svc-agent-hub__glyph svc-agent-hub__glyph--img" aria-hidden="true"></span>
            <span>Site image</span>
          </div>
        </div>
        <div class="svc-agent-hub__converge" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="svc-agent-hub__core">
          <span class="consumer-card__icon consumer-card__icon--agents" aria-hidden="true"></span>
          <em>Agent</em>
        </div>
        <div class="svc-agent-hub__answer">
          <strong>1 answer</strong>
          <span>Approved · routed · delivered</span>
        </div>
      </div>
    </div>
    <span class="svc-vis__float svc-vis__float--platinum svc-vis__float--a" aria-hidden="true"></span>
    <span class="svc-vis__float svc-vis__float--platinum svc-vis__float--b" aria-hidden="true"></span>
  </div>
</div>`,
};
