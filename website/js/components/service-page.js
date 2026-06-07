const { renderInfographic } = require('./infographic');
const { renderNavDropdown } = require('./nav-dropdown');
const { renderPairRows } = require('./pair-rows');
const { escapeHtml, indentBlock } = require('./utils');

const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500&display=swap';

function renderPage(service) {
  var heroPoints = service.points
    .map(function (item) {
      return '                <li>' + escapeHtml(item) + '</li>';
    })
    .join('\n');

  var infographic = indentBlock(renderInfographic(service.slug, 'page'), 16);
  var pairs = renderPairRows(service);
  var isFromTo = service.pairMode === 'from-to';
  var heroTheme = service.stackTheme || service.theme;

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
    <link href="${FONT_STYLESHEET}" rel="stylesheet" />
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
${renderNavDropdown('', service.slug)}
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
          <section class="service-page__hero service-page__hero--${heroTheme}" aria-labelledby="service-title">
            <div class="service-page__hero-layout">
              <div class="service-page__hero-copy">
                <p class="service-page__layer service-page__layer--${service.theme}">${escapeHtml(service.layer)}</p>
                <h1 id="service-title" class="service-page__title">${escapeHtml(service.title)}</h1>
                <p class="service-page__intro">${escapeHtml(service.tagline)}</p>
                <p class="service-page__detail">${escapeHtml(service.detail)}</p>
                <ul class="service-page__points">
${heroPoints}
                </ul>
              </div>
              <figure class="service-page__infographic" aria-labelledby="service-vis-heading">
                <h2 id="service-vis-heading" class="visually-hidden">Service diagram</h2>
${infographic}
              </figure>
            </div>
          </section>

          <section class="service-page__pairs" aria-labelledby="service-pairs-heading">
            <h2 id="service-pairs-heading" class="visually-hidden">${isFromTo ? 'From and to' : 'Problems and solutions'}</h2>
            <ul class="service-page__pair-list">
${pairs}
            </ul>
          </section>

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

module.exports = { renderPage, FONT_STYLESHEET };
