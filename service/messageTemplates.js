const renderMultipleElements = function (data, templateType) {
    return data.map(item => {
        if (templateType === 'quickReply') {
            return {
                'content_type': 'text',
                'title': item,
                'payload': '{}',
            }
        }

        if (templateType === 'button') {
            return {
                'type': 'postback',
                'title': item.answer,
                'payload': item.answer,
            }
        }

        return [];
    });
}

const generic = function ({ title, subtitle, buttons }) {
    return {
        'attachment': {
            'type': 'template',
            'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': title,
                        'subtitle': subtitle,
                        'buttons': renderMultipleElements(buttons, 'button')
                    }],
            },
        },
    };
};

const quickReply = function (title, branches) {
    let quickReplies = [];
    branches.forEach(branch => {
        quickReplies.push({
            "content_type": "text",
            "title": branch.answer,
            "image_url": "",
            "payload": "{}"
        });
    })
    return {
        'text': title || 'Select an option',
        'quick_replies': quickReplies
    };
};

//const freeText = function({ title})
const button = function ({ title, buttons }) {
    return {
        'payload': {
            'template_type': 'button',
            'text': title,
            'buttons': renderMultipleElements(buttons, 'button'),
        },
    };
};

const multi_choice = function ({ title, subtitle, buttons, image_url, url }) {
    return {
        "attachment": {
            "type": "template",
            'payload': {
                'template_type': 'list',
                'top_element_style': 'LARGE',
                'elements': [
                    {
                        'title': title,
                        'subtitle': subtitle,
                        'image_url': image_url,
                        'buttons': renderMultipleElements(buttons, 'button'),
                        'default_action': {
                            'type': 'web_url',
                            'url': url,
                            'messenger_extensions': 'TRUE',
                            'webview_height_ratio': 'COMPACT'
                        }
                    }
                ]
            }
        }
    }
};


const media = function ({ media_type, attachment_id }) {
    return {
        'attachment': {
            'type': 'template',
            'payload': {
                'template_type': 'media',
                'elements': [
                    {
                        'media_type': media_type,
                        'attachment_id': attachment_id,
                    },
                ],
            },
        },
    };
};

const generic_web = function ({ title, image_url, subtitle, url, buttons }) {
    return {
        "payload": {
            "template_type": "generic",
            "elements": [
                {
                    "title": title,
                    "image_url": image_url,
                    "subtitle": subtitle,
                    "default_action": {
                        "type": "web_url",
                        "url": url,
                        "webview_height_ratio": "tall",
                    },
                    "buttons": renderMultipleElements(buttons, 'button')
                }
            ]
        }
    }
}

module.exports = {
    generic,
    quickReply,
    button,
    multi_choice,
    media,
    generic_web
};
