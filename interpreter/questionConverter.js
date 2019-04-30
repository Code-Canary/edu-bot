const messageTemplates = require('./service/messageTemplates');

function convertToMessengerFormat(question) {
    if(question.type == 'quick_replies') {
        return convertToQuickReplyFormat(question);
    } else if(question.type == 'list') {
        return convertToQuickReplyFormat(question);
    } else if(question.type == 'list') {
        return convertToListFormat(question);
    } else {
        return convertToFreeTextFormat(question);
    }
}

function convertToQuickReplyFormat(question) {
    return 
}

function convertToQuickReplyFormat(question) {
    return 
}

function convertToListFormat(question) {
    return 
}

function convertToFreeTextFormat(question) {
    return 
}

module.exports = {
    convertToMessengerFormat
}