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
          { text: 'two - 文章 1', link: '/two/one' },
          { text: 'two - 文章 2', link: '/two/two' },
        ],
      },
      {
        text: 'wrong path',
        link: '/wrongPath',
      },
      { text: 'G100 vuepress blog', link: 'https://g100my.github.io/G100-blog/' },
    ],
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'one', // 必要的
        path: '/one/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ['/one/fake2', '/one/fake1'],
      },
      {
        title: 'two',
        children: ['/two/one', '/two/two'],
        initialOpenGroupIndex: -1, // 可选的, 默认值是 0
      },
      { title: 'G100 vuepress blog', path: 'https://g100my.github.io/G100-blog/' },
    ],
    plugins: [
      [
        '@vuepress/search',
        {
          searchMaxSuggestions: 10,
        },
      ],
    ],
  },
}
