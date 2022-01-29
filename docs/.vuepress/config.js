const { path } = require('@vuepress/utils')
const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')
const defineUserConfig = require('vuepress').defineUserConfig

module.exports = defineUserConfig({
  base: '/Goodideas-studio-blog/',
  title: '好想工作室共同技術筆記',
  description: '好想工作室共同技術筆記',
  plugins: [['@vuepress/plugin-search', {}]],
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#navbar
    navbar: [
      { text: 'Home', link: '/' },
      ...makeNavRoute('one'),
      ...makeNavRoute('two'),
      ...makeNavRoute('demo'),
    ],
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
    sidebar: {
      ...makeSidebarRoute('one'),
      ...makeSidebarRoute('two'),
      ...makeSidebarRoute('demo'),
    },
  },
  bundlerConfig: {
    viteOptions: {
      resolve: {
        alias: [
          {
            find: '@components',
            replacement: process.cwd() + '/src/components',
          },
          { find: '@docs', replacement: process.cwd() + '/docs' },
        ],
      },
    },
  },
})
