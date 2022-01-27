<p align='center'>
  <img src='https://raw.githubusercontent.com/G100my/goodideas-studio-blog/main/docs/.vuepress/public/good-ideas.png' width='400'>
</p>

<br>

<h1 align='center'>好想工作室 - 共同技術筆記</h1>

<br>

# 一起來寫文章吧！

say something...

## 註冊你的作者簽名檔

在 `/docs/.vuepress/authers` 底下建立一個檔名和自己 git.username 一樣的 `.vue`，內容請自訂。

## Post Article

---

## Folder Structure

---

## Dependency Document Links

- [Vuepress@next](https://v2.vuepress.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue 3](https://v3.vuejs.org/api/)
- [Vue Router](https://next.router.vuejs.org/api/)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) On-demand components auto importing for Vue.
- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) File system based route generator for Vite

註：Vuepress 的 dependencies 已經包含 Vue, Vue router，為了讓 Vscode Intellisense 能偵測到，因此額外讓他出現在 package.json

## Frequently Used

---

## Npm Script:

```
npm run doc     // vuepress dev docs （寫文章用的 local server）
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

## Others

- Markdown Parse Engine: `markdown-it`
