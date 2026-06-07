const services = require('../../data/services');
const { renderInfographic } = require('./infographic');
const { escapeHtml, indentBlock } = require('./utils');

function cardAriaLabel(service) {
  return service.title.replace(/&/g, 'and') + ' — view service page';
}

function stackThemeFor(service) {
  return service.stackTheme || service.theme;
}

function renderServiceCard(service, options) {
  var hrefPrefix = (options && options.hrefPrefix) || 'services/';
  var stackTheme = stackThemeFor(service);
  var infographic = indentBlock(renderInfographic(service.slug, 'card'), 16);
  var points = service.points
    .map(function (item) {
      return '                  <li>' + escapeHtml(item) + '</li>';
    })
    .join('\n');

  return (
    '          <a href="' +
    hrefPrefix +
    service.slug +
    '.html" class="service-card service-stack-card service-stack-card--' +
    stackTheme +
    ' service-card--' +
    service.theme +
    '" aria-label="' +
    escapeHtml(cardAriaLabel(service)) +
    '">\n' +
    '            <div class="service-card__layout">\n' +
    '              <figure class="service-card__infographic service-card__infographic--' +
    service.theme +
    '" aria-hidden="true">\n' +
    infographic +
    '\n' +
    '              </figure>\n' +
    '              <div class="service-card__content">\n' +
    '                <div class="service-card__head">\n' +
    '                  <span class="service-card__layer">' +
    escapeHtml(service.layer) +
    '</span>\n' +
    '                </div>\n' +
    '                <span class="service-card__name">' +
    escapeHtml(service.title) +
    '</span>\n' +
    '                <span class="service-card__tagline">' +
    escapeHtml(service.tagline) +
    '</span>\n' +
    '                <p class="service-card__detail">' +
    escapeHtml(service.detail) +
    '</p>\n' +
    '                <ul class="service-card__points">\n' +
    points +
    '\n' +
    '                </ul>\n' +
    '                <span class="service-card__footer">\n' +
    '                  <span class="service-card__cta">' +
    escapeHtml(service.ctaLabel) +
    '</span>\n' +
    '                  <span class="service-card__arrow" aria-hidden="true">→</span>\n' +
    '                </span>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>'
  );
}

function renderServiceStack(slugs, options) {
  return slugs
    .map(function (slug) {
      var service = services.find(function (s) {
        return s.slug === slug;
      });
      return renderServiceCard(service, options);
    })
    .join('\n\n');
}

module.exports = { renderServiceCard, renderServiceStack, cardAriaLabel, stackThemeFor };
