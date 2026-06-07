/* Service page infographics — generated from shared infographic component */
const { renderInfographic } = require('./components/infographic');

const slugs = [
  'ingestion',
  'modeling',
  'reporting',
  'governance',
  'automations',
  'ai-agents',
];

module.exports = Object.fromEntries(
  slugs.map(function (slug) {
    return [slug, renderInfographic(slug, 'page')];
  })
);
