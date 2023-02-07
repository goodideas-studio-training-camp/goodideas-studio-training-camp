import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress'
import { makeNavRoute } from '../../utils/routeMaker'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { getDirname, path } from '@vuepress/utils'
import { gitPlugin } from '@vuepress/plugin-git'

const __dirname = getDirname(import.meta.url)

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
  base: '/',
  title: '好想寫技術筆記',
  description: '好想寫技術筆記',
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, '../'),
      componentsPatterns: ['**/*.vue'],
      getComponentName: filename => {
        const autoImportConponentName = path.trimExt(
          filename.replace(/\/|\\/g, '-').replace('-components-', '-')
        )
        console.log(`Auto import: ${autoImportConponentName}`)
        return autoImportConponentName
      },
    }),
    searchPlugin(),
    gitPlugin(),
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
