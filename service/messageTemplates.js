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
            'buttons': [
              {
                'type': 'postback',
                'title': 'Yes!',
                'payload': 'yes',
              },
              {
                'type': 'postback',
                'title': 'No!',
                'payload': 'no',
              },
            ],
          }],
      },
    },
  };
};

const quickReply = function({ title, text, postback }) {
  return {
    'text': text,
    'quick_replies':[
      {
        'content_type': 'text',
        'title': title,
        'payload': '<POSTBACK_PAYLOAD>',
      },
    ],
  };
};

const button = function({ title, buttons }) {
  return {
    'payload': {
      'template_type': 'button',
      'text': title,
      'buttons': [
        buttons,
      ],
    },
  };
};

const list = function ({ title, subtitle, buttons, image_url, url }) {
  return {
    'payload': {
      'template_type': 'list',
      'top_element_style': '<LARGE | COMPACT>',
      'elements': [
        {
          'title': title,
          'subtitle': subtitle,
          'image_url': image_url,
          'buttons': [buttons],
          'default_action': {
            'type': 'web_url',
            'url': url,
            'messenger_extensions': 'TRUE',
            'webview_height_ratio': 'COMPACT',
          },
        },
      ],
      'buttons': [],
    },
  };
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
          "buttons": [buttons]
        }
      ]
    }
  }
}

module.exports = {
  generic,
  quickReply,
  button,
  list,
  media,
  generic_web
};