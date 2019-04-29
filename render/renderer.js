/**
 * Renders the homepage HTML based on all the answers the user has
 * given so far
 */
exports.render = function(userAnswers) {
    const flattenedAnswers = flattenAnswers(userAnswers);
    return htmlFormatter.getFormattedContent(
        htmlFormatter.getRawContents(),
        flattenAnswers
    );
}

function flattenAnswers(answers) {
    return answers.map(function (answer) {
        const placeholder = answer.placeholder;
        const value = answer.value;
        return { placeholder : value }
    });
}