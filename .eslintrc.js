module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_MODE === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_MODE === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
  },
}
