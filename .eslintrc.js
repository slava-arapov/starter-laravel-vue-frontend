module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    // "quotes": [`error`, `backtick`],
    semi: ['error', 'always'],
    camelcase: ['error', { allow: ['email_verified_at', 'current_password', 'password_confirmation', 'current_page', 'last_page', 'per_page'] }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ]
};
