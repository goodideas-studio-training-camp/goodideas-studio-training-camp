const { makeNavRoute, makeSidebarRoute } = require('../../utils/routeMaker')

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
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
  },

  plugins: [
    [ '@vuepress/plugin-search', {} ],
  ],
}
