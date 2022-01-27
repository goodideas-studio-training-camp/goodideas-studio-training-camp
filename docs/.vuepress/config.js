const { path } = require('@vuepress/utils')
const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')

module.exports = {
  base: '/Goodideas-studio-blog/',
  title: 'Hello VuePress',
  description: 'Just playing around',
  plugins: [['@vuepress/plugin-search', {}]],
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#navbar
    navbar: [
      { text: 'Home', link: '/' },
      ...makeNavRoute('one'),
      ...makeNavRoute('two'),
      {
        text: 'wrong path',
        link: '/wrongPath',
      },
    ],
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
    sidebar: { ...makeSidebarRoute('one') },
  },
}
