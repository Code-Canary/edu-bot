const stringUtils = require('./string-utils')

const PLACEHOLDER_DELIMITER = '$'
const DEFAULT_PLACEHOLDER_VALUE = '';

exports.getRawContents = function() {
    return `
    <html>
    Coming soon!!!
    </html>
    `;
}

/**
 * Returns HTML with all specified placeholders replaced with their values and
 * any missing placeholders is removed.
 */
exports.getFormattedContent = function(content, placeholders) {
    let tempContent = content;
    while (tempContent.includes(PLACEHOLDER_DELIMITER)) {
        const placeholderStart = tempContent.indexOf(PLACEHOLDER_DELIMITER);
        const placeholderEnd = tempContent.indexOf(PLACEHOLDER_DELIMITER, placeholderStart + 1);

        if(placeholderEnd == -1) {
            throw "A placeholder has no end delimiter";
        }

        const placeholder = tempContent.substring(placeholderStart, placeholderEnd + 1);
        const placeholderName = stringUtils.replaceAll(placeholder, PLACEHOLDER_DELIMITER, '');

        let placeholderValue = placeholders[placeholderName];
        if(placeholderValue == undefined) {
            placeholderValue = DEFAULT_PLACEHOLDER_VALUE;
        }

        tempContent = stringUtils.replaceAll(tempContent, placeholder, placeholderValue);
    }

    return tempContent;
}