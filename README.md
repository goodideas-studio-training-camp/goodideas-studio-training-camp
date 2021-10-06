# good-idea-blog

just test for now.

## Survay target:

  1. - [ ] 能夠讓發文者的相關資訊(git account, personal blog)顯示在文章底下。
  1. - [ ] 能快速設定 html head meta、或其他屬於文章範圍內的 meta (title, create date, tag, categories)。
  1. - [ ] 文章分類 nav / sidebar。
  1. - [ ] 高自由度版面配置。

## tags

- v1: 最基本，未改樣式，未安裝plugin，有 navbar, sidebar, search。
- v2: install [`vuepress-plugin-git-log`](https://github.com/vuepress/vuepress-plugin-git-log)，讀取 git commit。vuepress 的 v2 版本是直接 build-in。

## Getting started

#### use:

- [vuepress **v1**](https://v1.vuepress.vuejs.org/)
- [vuepress github](https://github.com/vuepress)

#### npm script:

```test
npm run dev     // vuepress dev docs
npm run build:  // vuepress build docs
```

:::warning Beward!
如果更改 config.js，需要重啟 dev server
:::

### Directory Structure

See [document](https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)

## Others

[Awesome vue](https://github.com/vuepress/awesome-vuepress)
