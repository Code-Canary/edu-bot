const generic = function({ title, subtitle, buttons }) {
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

const button = function({ title, subtitle, buttons }) {
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

const list = function({ title, subtitle, buttons, image_url, url }) {
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
            'url': '<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>',
            'messenger_extensions': '<TRUE | FALSE>',
            'webview_height_ratio': '<COMPACT | TALL | FULL>',
          },
        },
      ],
      'buttons': [],
    },
  };
};

const media = function({ media_type, attachment_id }) {
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

module.exports = {
  generic,
  button,
  list,
  media,
};