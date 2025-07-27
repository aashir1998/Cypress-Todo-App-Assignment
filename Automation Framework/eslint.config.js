import globals from '../node_modules/globals/index.js';
import pluginJs from '../node_modules/@eslint/js/dist/index.js';
import pluginCypress from '../node_modules/eslint-plugin-cypress/flat.js';
import eslintConfigPrettier from '../node_modules/eslint-config-prettier/index.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.cypress
      }
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      strict: ['error', 'never'],
      'no-console': 'warn',
      eqeqeq: ['error', 'always']
    }
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier
];
