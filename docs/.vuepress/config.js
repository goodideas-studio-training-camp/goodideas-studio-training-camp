const { path } = require('@vuepress/utils')
const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')

module.exports = {
  base: '/goodideas-studio-blog/',
  title: 'Hello VuePress',
  description: 'Just playing around',
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    navbar: [
      { text: 'Home', link: '/' },
      //   {
      //     text: 'one',
      //     children: [
      //       { text: 'one - 文章 1', link: '/one/01-fake1' },
      //       {
      //         text: 'one - 分類',
      //         children: [
      //           { text: 'one - 文章 2', link: '/one/02-fake2' },
      //           { text: 'one - 文章 3', link: '/one/03-fake3' },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     text: 'two',
      //     children: [
      //       { text: 'two - 文章 1', link: '/two/01-one' },
      //       { text: 'two - 文章 2', link: '/two/02-two' },
      //     ],
      //   },
      ...makeNavRoute('one'),
      ...makeNavRoute('two'),
      {
        text: 'wrong path',
        link: '/wrongPath',
      },
      { text: 'G100 vuepress blog', link: 'https://g100my.github.io/G100-blog/' },
    ],
    sidebar: { ...makeSidebarRoute('one') },

    // default 'true', no need to set up
    // https://v2.vuepress.vuejs.org/reference/plugin/git.html#install
    // createdTime: true,
    // updatedTime: true,
    // contributors: true,
  },

  plugins: [['@vuepress/plugin-search', {}]],
}
