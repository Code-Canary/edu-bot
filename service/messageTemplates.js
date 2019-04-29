const generic = {
  'attachment': {
    'type': 'template',
    'payload': {
      'template_type': 'generic',
      'elements': [
        {
          'title': 'Is this the right picture?',
          'subtitle': 'Tap a button to answer.',
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

const button = {
  'attachment': {
    'type': 'button',
    'payload': {
      'template_type': 'generic',
      'elements': [
        {
          'title': 'Is this the right picture?',
          'subtitle': 'Tap a button to answer.',
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

const list = {
  'payload': {
    'template_type': 'list',
    'top_element_style': '<LARGE | COMPACT>',
    'elements': [
      {
        'title': '<TITLE_TEXT>',
        'subtitle': '<SUBTITLE_TEXT>',
        'image_url': '<IMAGE_URL_FOR_THUMBNAIL>',
        'buttons': [],
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

module.exports = {
  generic,
  button,
  list,
};