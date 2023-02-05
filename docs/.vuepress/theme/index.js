import path from 'path'

module.exports = {
  name: 'test-extend-theme',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
