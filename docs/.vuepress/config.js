import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress'
import { makeNavRoute } from '../../utils/routeMaker'
import path from 'path'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'

const folderNameMap = {
  one: '第一個分類',
  'demo-sub': 'demo 子目錄',
}
// default 會把 '/docs' 底下所有路徑做成 route
const exceptions = ['components', 'images']

const navs = makeNavRoute(
  folderNameMap,
  exceptions.concat(['index.md', '.vuepress'])
)

export default defineUserConfig({
  base: '/Goodideas-studio-blog/',
  title: '好想寫技術筆記',
  description: '好想寫技術筆記',
  plugins: [
    registerComponentsPlugin({
      componentsPatterns: ['docs/**/components/**/*.vue'],
    }),
    searchPlugin(),
  ],
  theme: defaultTheme({
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#navbar
    navbar: [{ text: 'Home', link: '/' }, ...navs],
    // https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
    sidebar: [...navs],
  }),
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: [
          { find: '@docs', replacement: path.dirname(__dirname) + '/docs' },
        ],
      },
    },
  }),
})
