/* Dev helper — run with: node website/js/build-services.js */
const fs = require('fs');
const path = require('path');

const services = require('../data/services');
const { patchIndex } = require('./components/index-patch');
const { renderPage } = require('./components/service-page');

const websiteDir = path.join(__dirname, '..');
const outDir = path.join(websiteDir, 'services');
const indexPath = path.join(websiteDir, 'index.html');

fs.mkdirSync(outDir, { recursive: true });

services.forEach(function (service) {
  fs.writeFileSync(path.join(outDir, service.slug + '.html'), renderPage(service));
});

const indexHtml = fs.readFileSync(indexPath, 'utf8');
fs.writeFileSync(indexPath, patchIndex(indexHtml));

console.log(
  'Wrote ' + services.length + ' service pages and patched index.html.'
);
