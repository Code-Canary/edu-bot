const stringUtils = require('./string-utils');

const PLACEHOLDER_DELIMITER = '$';
const DEFAULT_PLACEHOLDER_VALUE = '';


/**
 * Fetch user answers from DB, fetch lesson from DB and
 * feed togetFormattedContent for placeholder replacement
 */
exports.getRawContents = function(user_id, lesson_id) {

};

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

  return tempContent;
};