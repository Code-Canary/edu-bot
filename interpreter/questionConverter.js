const MessageTemplates = require('./service/messageTemplates');

function convertToMessengerFormat(question) {
    let template = 'free_text';
    switch (question.type) {
        case 'multi_choice':
            template = 'list';
            break;
    }
    
    return MessageTemplates[template]({
        title: question.title,
        subtitle: '',
        buttons: '',
        image_url: '',
        url: '',
        media_type: '',
        attachment_id: '',
    })
}

function convertToQuickReplyFormat(question) {
    return messageTemplates.quickReply()
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