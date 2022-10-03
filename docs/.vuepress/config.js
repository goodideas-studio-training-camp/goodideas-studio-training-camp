const { path } = require('@vuepress/utils')
const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')
const defineUserConfig = require('vuepress').defineUserConfig

const folderNameMap = {
  one: '第一個分類',
  'demo-sub': 'demo 子目錄',
}
const exceptions = []

const navs = makeNavRoute(
  folderNameMap,
  exceptions.concat(['index.md', '.vuepress'])
)

module.exports = defineUserConfig({
  base: '/Goodideas-studio-blog/',
  title: '好想工作室共同技術筆記',
  description: '好想工作室共同技術筆記',
  plugins: [['@vuepress/plugin-search', {}]],
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#navbar
    navbar: [{ text: 'Home', link: '/' }, ...navs],
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
    sidebar: [...navs],
  },
  bundlerConfig: {
    viteOptions: {
      resolve: {
        alias: [
          { find: '@docs', replacement: path.dirname(__dirname) + '/docs' },
        ],
      },
    },
  },
})
