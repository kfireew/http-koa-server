module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
    env: { node: true, es6: true },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'  // runs Prettier as an ESLint rule
    ],
    rules: {
      // your custom overrides, e.g.:
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error', { singleQuote: true, semi: true }]
    }
  };
  