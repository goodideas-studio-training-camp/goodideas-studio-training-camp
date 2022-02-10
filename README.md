<p align='center'>
  <img src='https://raw.githubusercontent.com/G100my/Goodideas-studio-blog/main/docs/.vuepress/public/good-ideas.png' width='400'>
</p>

<br>

<h1 align='center'>好想工作室 - 共同技術筆記</h1>

<br>

# 一起來寫文章吧！

- 目前沒有任何制式的規範、規則，只要不要弄出奇怪事情，**可以任意修改/新增此部落格的任何樣式、功能**。
- 也因為目前沒有任何制式的規範，所以請讓天馬行空的想像最大化，想做什麼實驗、練習就做吧。
- 如果擔心弄壞整個網站可以以**發 [PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)** 的方式並且 asign 其他人來幫你 code review。
- 有任何 想要新增的功能/發現的 bug，請發 Issue 並且**善用 Label 分類**，善用 github 原本就有的工具來加速事情的實現。且未來可能會用 `Issue` 來串接留言板的功能，所以請先善用分類避免真正的 Issue 和留言混在一起。

---

## Registion

### 先註冊你的作者簽名檔!!

在 `/docs/.vuepress/authers` 底下建立一個檔名和自己 git.username 一樣的 `.vue`，內容請自訂。

下面這行可以在 terminal 印出自己的 username:

```
git config --get user.name
```

---

## Article

### 寫文章

1. 直接 clone
2. 在 `docs` 目錄底下對應主題的資料夾內新增 `.md`，可以複製一份 `template.md` 到目標分類目錄底下

```
cp template.md docs/<path>
```

3. 寫文章
4. push, Done!

### 增加新的文章分類

1. 在 `docs` 底下新增資料夾、新增文章(`.md`)
2. 在 `docs/.vuepress/config.js` 裡面的 folderNameMap 新增 key-value(資料夾名稱-要在 navbar/sidebar 顯示的 title)，不需要巢狀。

```javascript
// docs/.vuepress/config.js
const folderNameMap = {
  one: '第一個分類',
  'demo-sub': 'demo 子目錄',
}
```

如果沒有 text 會以 folderName 為顯示的 title 名稱

### 例外的資料夾、檔案

```javascript
// default: 'index.md', '.vuepress'
const exceptions = ['foo']
```

### 文章中引用 component

**Vuepress 會把 `.md` 轉換成 SFC，所以遇到 `<>`，他會把內容轉換為 SFC 的 `<template>`/`<script>/<style>`。**

所以在 `.md` 裡面直接寫 HTML 也是可以的。

1. 在 `src/components` 底下新增你的 custom component
2. 在 `.md` 裡面引用，並直接使用

```
<script setup>
// 可以使用設定好的 alias: @components
import CustomComponent from '@components/CustomComponent.vue'
</script>

<CustomComponent />
```

其他參考：https://g100my.github.io/vuepress/03-vueComponent.html

---

## Folder Structure

```
----
  |- docs
    |- .vuepress
      |- config.js ( vuepress config )
      |- theme ( 樣式相關 components / 繼承 Default theme 的 components )
      |- style
      |- public
      |- authers ( 文章作者/貢獻者簽名檔)
    |- ...( 文章分類目錄1 )
    |- ...( 文章分類目錄2 )
    |- ...( 文章分類目錄3 )
    |- ...
    |- ...
    |- index.md ( 首頁 )
  |- src (一般 SPA 開發環境)
    |- components ( 底下的檔案目錄結構會被自動轉換為 routes，方便開發 demo )
    |- router
    |- App.vue
    |- main.js
```

---

## Dependency Document Links

- [Vuepress@next](https://v2.vuepress.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue 3](https://v3.vuejs.org/api/)
- [Vue Router](https://next.router.vuejs.org/api/)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) On-demand components auto importing for Vue.
- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) File system based route generator for Vite

註：Vuepress 的 dependencies 已經包含 Vue, Vue router，為了讓 Vscode Intellisense 能偵測到，因此額外讓他出現在 package.json

<!-- ## Frequently Used Links -->

---

## Npm Script:

```
npm run docs     // vuepress dev docs （寫文章用的 local server）
npm run build   // vuepress build docs
npm run dev     // vite （一般開發用的 local server）
```

開發環境有

- 用 vuepress 起的 local server，會以 Blog 呈現
- 用 vite 起的 local server，以 SPA 呈現，方便開發 demo/blog component 的環境
  - `vite-plugin-pages`: 自動從 'src/components' 載入 components 作為 route，
  - `unplugin-vue-components`: 自動 import 所需要的 component

**Beware: 如果改動到 config，請重啟 server。**

---

## Path Alias

```javascript
{ find: '@components', replacement: process.cwd() + '/src/components', },
{ find: '@docs', replacement: process.cwd() + '/docs' },

// @component -> /src/components
// @docs -> /docs
```

---

## Others

- Markdown Parse Engine: `markdown-it`
- [繼承、修改 Default theme](https://v2.vuepress.vuejs.org/reference/default-theme/extending.html#extending)
- [G100 - 把 Default theme 做點修改](https://g100my.github.io/vuepress/04-extendDefaultTheme.html)
- [global component](https://v2.vuepress.vuejs.org/advanced/cookbook/usage-of-client-app-enhance.html#usage-of-client-app-enhance)
