const path = require('path');

module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-partial-import': {
      path: [path.resolve(__dirname, 'miniprogram')],
    },
    'postcss-font-base64': {}, // font to base64
    'postcss-advanced-variables': {},
    'postcss-nested': {},
    'postcss-custom-properties': {
      preserve: false,
    },
    'postcss-color-function': {},
    'postcss-extend-rule': {},
    'postcss-url': {
      url: 'inline', // inline image to base64
    },
  },
};
