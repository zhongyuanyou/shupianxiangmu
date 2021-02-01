module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    dggSensors: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 'off',
    'unicorn/prefer-includes': 'off',
    'no-unused-vars': 0,
    'vue/comment-directive': 'off'
  },
}
