module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'one',
        items: [
          { text: 'one - 文章 1', link: '/one/fake1' },
          {
            text: 'one - 分類',
            items: [
              { text: 'one - 文章 2', link: '/one/fake2' },
              { text: 'one - 文章 3', link: '/one/fake3' },
            ],
          },
        ],
      },
      {
        text: 'two',
        items: [
          { text: 'two - 文章 1', link: '/one' },
          { text: 'two - 文章 2', link: '/two' },
        ],
      },
      {
        text: 'wrong path',
        link: '/wrongPath',
      },
      { text: 'G100 vuepress blog', link: 'https://g100my.github.io/G100-blog/' },
    ],
  },
}
