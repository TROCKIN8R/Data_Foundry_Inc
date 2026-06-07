const services = require('../../data/services');
const { escapeHtml } = require('./utils');

const DATA_SLUGS = ['ingestion', 'modeling', 'reporting', 'governance'];
const AUTO_SLUGS = ['automations', 'ai-agents'];

function serviceBySlug(slug) {
  return services.find(function (service) {
    return service.slug === slug;
  });
}

function navDropdownEyebrow(label, modifier) {
  return (
    '              <p class="nav__dropdown-eyebrow nav__dropdown-eyebrow--' +
    modifier +
    '" role="presentation">' +
    escapeHtml(label) +
    '</p>'
  );
}

function navDropdownItem(prefix, service, activeSlug) {
  var active = service.slug === activeSlug ? ' nav__dropdown-item--active' : '';
  return (
    '              <a href="' +
    prefix +
    service.slug +
    '.html" class="nav__dropdown-item nav__dropdown-item--' +
    service.theme +
    ' nav__dropdown-item--' +
    service.slug +
    active +
    '" role="menuitem">\n' +
    '                <span class="nav__dropdown-icon" aria-hidden="true">' +
    service.icon +
    '</span>\n' +
    '                <span class="nav__dropdown-copy">\n' +
    '                  <span class="nav__dropdown-name">' +
    escapeHtml(service.title) +
    '</span>\n' +
    '                  <span class="nav__dropdown-desc">' +
    escapeHtml(service.tagline) +
    '</span>\n' +
    '                </span>\n' +
    '              </a>'
  );
}

function renderNavDropdown(prefix, activeSlug) {
  return (
    navDropdownEyebrow('Data', 'data') +
    '\n' +
    DATA_SLUGS.map(function (slug) {
      return navDropdownItem(prefix, serviceBySlug(slug), activeSlug);
    }).join('\n') +
    '\n' +
    navDropdownEyebrow('Automation', 'auto') +
    '\n' +
    AUTO_SLUGS.map(function (slug) {
      return navDropdownItem(prefix, serviceBySlug(slug), activeSlug);
    }).join('\n')
  );
}

module.exports = {
  DATA_SLUGS,
  AUTO_SLUGS,
  renderNavDropdown,
  navDropdownItem,
  navDropdownEyebrow,
  serviceBySlug,
};
