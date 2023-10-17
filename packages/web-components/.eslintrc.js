// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  extends: ['plugin:@stencil-community/recommended', 'prettier', '@smartive/eslint-config'],
  rules: {
    '@stencil-community/decorators-style': [
      2,
      {
        prop: 'multiline',
        state: 'multiline',
        element: 'multiline',
        event: 'multiline',
        method: 'multiline',
        watch: 'multiline',
        listen: 'multiline',
      },
    ],
    '@stencil-community/required-jsdoc': 0,
    'react/jsx-no-bind': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        varsIgnorePattern: '^h$',
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
  parserOptions: {
    project: ['./packages/web-components/tsconfig.json'],
    tsconfigRootDir: path.resolve(__dirname, '../../'),
  },
};
