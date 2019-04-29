const stringUtils = require('./string-utils');

const PLACEHOLDER_DELIMITER = '$';
const DEFAULT_PLACEHOLDER_VALUE = '';

exports.getRawContents = function() {
  return `
    <html>
    div
    </html>
    `;
};

exports.dummy_questions = [
  {
    placeholder: 'div',
    answer: '<div></div>',
  },
];

/**
 * Returns HTML with all specified placeholders replaced with their values and
 * any missing placeholders is removed.
 */
exports.getFormattedContent = function(content, placeholders) {
  let tempContent = content;

  placeholders.map(placeholder => {
    tempContent = stringUtils.replaceAll(tempContent, placeholder.placeholder, placeholder.answer);
    console.log(tempContent)
  })

  console.log('content', tempContent);

  return tempContent;
};