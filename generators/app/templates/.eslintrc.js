module.exports = {
  extends: 'eslint-config-imweb',
  rules: {
    'import/extensions': {
      svg: 'always',
      js: 'never',
      json: 'never',
    },
    'linebreak-style': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'space-before-function-paren': 0,
  },
  globals: {
    wx: false,
    App: false,
    Page: false,
    getApp: false,
    Component: false,
    requirePlugin: false,
    getCurrentPages: false,
    regeneratorRuntime: true,
  },
};
