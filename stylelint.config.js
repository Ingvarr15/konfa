export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*(?:(?:__|--)[a-z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*)*$',
      {
        message:
          'Expected class selector to use camelCase, kebab-case or BEM notation',
      },
    ],
    'value-keyword-case': [
      'lower',
      { ignoreKeywords: ['optimizeLegibility'] },
    ],
    'color-hex-length': null,
    'scss/dollar-variable-empty-line-before': null,
  },
};
