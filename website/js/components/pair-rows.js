const { escapeHtml } = require('./utils');

function renderPairRows(service) {
  var isFromTo = service.pairMode === 'from-to';
  var pairLeftLabel = isFromTo ? 'From' : 'Problem';
  var pairRightLabel = isFromTo ? 'To' : 'Solution';
  var pairLeftClass = isFromTo
    ? 'service-page__pair-cell--from'
    : 'service-page__pair-cell--problem';
  var pairRightClass = isFromTo
    ? 'service-page__pair-cell--to'
    : 'service-page__pair-cell--solution';

  return service.compare
    .map(function (row) {
      return (
        '            <li class="service-page__pair-row">\n' +
        '              <span class="service-page__pair-cell ' +
        pairLeftClass +
        '"><span class="service-page__pair-label">' +
        pairLeftLabel +
        '</span><span class="service-page__pair-text">' +
        escapeHtml(row.instead) +
        '</span></span>\n' +
        '              <span class="service-page__pair-arrow" aria-hidden="true">→</span>\n' +
        '              <span class="service-page__pair-cell ' +
        pairRightClass +
        '"><span class="service-page__pair-label">' +
        pairRightLabel +
        '</span><span class="service-page__pair-text">' +
        escapeHtml(row.youGet) +
        '</span></span>\n' +
        '            </li>'
      );
    })
    .join('\n');
}

module.exports = { renderPairRows };
