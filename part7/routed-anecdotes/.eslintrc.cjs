module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Disable unused vars rule
    'no-unused-vars': 'off',
    // Disable prop-types rule
    'react/prop-types': 'off',
    // Disable the rule for unescaped entities in JSX
    'react/no-unescaped-entities': 'off',
    // Add any other rules you want to configure or disable
  },
}
