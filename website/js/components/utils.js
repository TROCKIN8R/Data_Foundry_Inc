function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function indentBlock(html, spaces) {
  var pad = ' '.repeat(spaces);
  return html
    .split('\n')
    .map(function (line) {
      return line ? pad + line : line;
    })
    .join('\n');
}

module.exports = { escapeHtml, indentBlock };
