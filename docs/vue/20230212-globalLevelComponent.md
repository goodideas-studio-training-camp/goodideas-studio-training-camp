---
title: Global Level Component 實作
lang: zh-TW
description: 額外建立一個 vm 來實作 Loading mask / Snackbar
date: 2023-02-12
---

因為工作專案使用 monorepo 的關係，對於 shared component 有一些想法/作法，自己覺得不錯的分享出來。

有些 component 例如 Dialog、Modal 通常都會讓他出現在 SPA 所掛載的 DOM element 之後。
這些各大 UI component library 通常都幫你做好好了，
使用方式基本都是擺進去 page component 中，定義當作**開關**的變數，`v-model` 搞定。
但有些像是

1. 在等待某件事情完成之前、強制使用者不能繼續操作的 `loading mask`
2. 使用者操作 feedback 的 Snackbar

這類元件可能是擺在 `App.vue` 等比較屬於上層的 component 裡，並把**開關**儲存在 `store` 裡，
利用 `store.action` 在程式碼任何角落使用。

但這類元件我希望他在專案間共用的時候不是太方便，因為得在 monorepo 底下各個 project 中都建立開關、都把元件擺進去。
我想讓這些東西使用上能更像一個 library、plugin。
最好使用的時候是可以簡單的 import、簡單的呼叫就好。

---

## 快速瀏覽作法：

對於 vue/vite 很熟的人可以快速瀏覽這裡：

1. 找個地方可以 import plugin
1. 載入 plugin 時額外建立一個順序在 `div#app` 之後的 DOM element
1. 建立一個包含上述兩種元件的 vm，掛載在剛剛建立的 DOM element
1. 寫一個能夠提供操作介面的 composable function
1. 使用時呼叫 composable function 取得可以操作開關的 method，操作。

---

## 建立額外的 vm 當作 Global Level Component

vue3 提供了可以安裝 plugin 的[接口](https://vuejs.org/api/application.html#app-use)
這裡很適合去建立額外的 DOM element。

plugin 有一定的[起手式](https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin)

```javascript
export default {
  install: (app, options) => {
    // Plugin code goes here
  },
}
```

先確定目標：

1. 可以在任何角落簡單呼叫 loading mask
1. 不要使用的時候得在各個專案建立特定的檔案

我的想法是額外建立一個 vm，把相關邏輯都包裝在這個 vm，不要四散

開始寫：

```javascript
// customPlugin.js
const rootElementID = 'globalComponentRoot'
let vm: any

export function createVM() {
  if (vm) return // 確保不會建立多個
  const rootElement = document.createElement('div')
  rootElement.id = rootElementID
  document.body.appendChild(rootElement)

  vm = createApp().mount(rootElement)
}

export default {
  install: (app, options) => {
    // Plugin code goes here
  },
}
```

這樣在 `main.js` 時就可以如此這般安裝

```
// main.js
import customPlugin from './customPlugin.js'
app.use(customPlugin)
```

---

## Loading mask / Snackbar component 實作

再來處理這個額外的 vm 裡面的邏輯

```javascript{5-8,10-23,31-67,78-91}
// customPlugin.js
const rootElementID = 'globalComponentRoot'
let vm

// loading mask 只需要一個簡單的開關
const showLoading = ref(false)
const on = () => showLoading.value = true
const off = () => showLoading.value = false

// snackbar 想要做成“出現後過幾秒自己消失”
const ms = 5000
const snackbarStack = reactive([])
function push(message: string) {
  const item = h(
    'div',
    // 在 vue build-in component - <TransitionGroup> 底下需要給 unique key 才可以正確地運作
    { key: Date.now(),  class: [...] },
    message
  )

  setTimeout(() => snackbarStack.shift(), ms)
  snackbarStack.push(item)
}

export function createVM() {
  if (vm) return // 確保不會建立多個
  const rootElement = document.createElement('div')
  rootElement.id = rootElementID
  document.body.appendChild(rootElement)

  const rootComponent = defineComponent({
    name: rootElementID,
    setup() {
      return { // 得 return render 出來的 Vnode 才可以拿到並使用
        showLoading,
        snackbarStack,
      }
    },
    // 因為不想另外再開 SFC 檔案，直接用 render function 寫
    render() {
      return [
        h(
          Transition,
          {
            enterActiveClass: '...',
            leaveActiveClass: '...',
            enterFromClass: '...',
            leaveToClass: '...',
          },
          () => (this.showLoading ? h(LoadingContent) : undefined)
        ),
        h(
          TransitionGroup,
          {
            tag: 'div', // TransitionGroup default 會被渲染為 template
            class: '...',
            moveClass: '...',
            enterActiveClass: '...',
            leaveActiveClass: '...',
            enterFromClass: '...',
            leaveToClass: '...',
          },
          () => snackbarStack
        ),
      ]
    },
  })

  vm = createApp().mount(rootElement)
}

export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}

// 提供介面的 composable function
export function useLoading() {
  return {
    on,
    off,
    isOn: () => showLoading.value,
  }
}

export function useSnackbar() {
  return {
    push,
  }
}
```

:::tip
L151, L164 是 function 還是已經建立好的 Vnode 其實不太要緊，這編的使用情境，元件是 Global 的，使用頻率會很高。

不是 function 的話會有這句警告

`Non-function value encountered for default slot. Prefer function slots for better performance.`

詳細請看 [Stackoverflow](https://stackoverflow.com/questions/69875273/non-function-value-encountered-for-default-slot-in-vue-3-composition-api-comp)
:::
