const { path } = require('@vuepress/utils')
const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')
const defineUserConfig = require('vuepress').defineUserConfig

module.exports = defineUserConfig({
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
      ...makeNavRoute('demo'),
      {
        text: 'wrong path',
        link: '/wrongPath',
      },
    ],
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
    sidebar: { ...makeSidebarRoute('one') },
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
