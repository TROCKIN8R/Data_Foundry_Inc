const { meta, bodies } = require('./infographic-content');
const { indentBlock } = require('./utils');

function renderBadge(theme, badgeKind) {
  var inner = '';
  if (badgeKind === 'ore') {
    inner = '<span class="ore ore--2 schema-compact__ore"></span>';
  } else if (badgeKind === 'governance') {
    inner = '<span class="stage__governance-icon" aria-hidden="true"></span>';
  }

  return (
    '<span class="svc-vis__badge svc-vis__badge--' +
    theme +
    '">' +
    inner +
    '</span>'
  );
}

function renderInfographic(slug, variant) {
  var config = meta[slug];
  var body = bodies[slug];
  if (!config || !body) {
    return '';
  }

  var theme = config.theme;
  var visClass = 'svc-vis svc-vis--' + theme;
  if (variant === 'page') {
    visClass += ' svc-vis--page';
  }

  var composeClass = 'svc-vis__compose';
  if (variant === 'page') {
    composeClass += ' svc-vis__compose--page';
  }
  if (config.solo) {
    composeClass += ' svc-vis__compose--solo';
  }

  var badge =
    variant === 'card' ? renderBadge(theme, config.badge) + '\n  ' : '';

  return (
    '<div class="' +
    visClass +
    '">\n  ' +
    badge +
    '<div class="' +
    composeClass +
    '">\n' +
    indentBlock(body, 4) +
    '\n  </div>\n</div>'
  );
}

module.exports = { renderInfographic };
