const { DATA_SLUGS, AUTO_SLUGS, renderNavDropdown } = require('./nav-dropdown');
const { renderServiceStack } = require('./service-card');

function patchMarker(html, marker, content) {
  var start = '<!-- @build:' + marker + '-start -->';
  var end = '<!-- @build:' + marker + '-end -->';
  var pattern = new RegExp(
    start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
      '[\\s\\S]*?' +
      end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  if (!pattern.test(html)) {
    throw new Error('Missing build marker: ' + marker);
  }

  return html.replace(pattern, start + '\n' + content + '\n' + end);
}

function patchIndex(html) {
  html = patchMarker(html, 'nav-dropdown', renderNavDropdown('services/'));
  html = patchMarker(
    html,
    'data-service-cards',
    renderServiceStack(DATA_SLUGS, { hrefPrefix: 'services/' })
  );
  html = patchMarker(
    html,
    'auto-service-cards',
    renderServiceStack(AUTO_SLUGS, { hrefPrefix: 'services/' })
  );
  return html;
}

module.exports = { patchIndex, patchMarker };
