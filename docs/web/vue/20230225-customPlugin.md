---
title: 包裝 Custom plugin 範例
lang: zh-TW
description: Vue Custom Plugin 範例
date: 2023-02-25
---

# Vue Custom Plugin 範例

前端開發過程多多少少都會碰到要自己包裝 library 作為 plugin，
這裡直接用既有的 code 來說明感覺比較快。
包裝的東西是 google 登入按鈕。

如果覺得有更好的做法歡迎直接發 PR 修改這邊文章。

上原始的 code，註明我覺得不妥。

```typescript
// GoogleLoginPlugin.ts
import { ref, watch } from 'vue'
import { useAccountStore } from '@/stores'

const isLoaded = ref(false)
// 這裡的 enum，可以不必要，而且使用範圍都只在這份檔案裡，不必是 string enum。
enum GoogleSigninStatus {
  init = 'init',
  success = 'success',
  failed = 'failed',
}

const googleSigninResult = ref<keyof typeof GoogleSigninStatus>('init')

function loadScript() {
  const head = document.head
  const script = document.createElement('script')
  // 習慣上會把 script.src 放到最後，在這裡應該是沒有關係，因為 <script> 被 append 到 head 是放在最後，理論上 <script> 被 append 到 dom 上時才會開始執行，但萬一是 script.src 被宣告後立即執行，那 async/defer 屬性可能就會吃不到？
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true

  script.onload = () => {
    isLoaded.value = true
    // 混雜了 pinia，應該藉由 argument 傳進來
    const accountStore = useAccountStore()
    google.accounts.id.initialize({
      // 理想的話 client_id, callback 都應該由外部傳進來
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: res => {
        googleSigninResult.value = GoogleSigninStatus['init']
        accountStore
          .handleGoogleCredentialResponse(res)
          .then(() => (googleSigninResult.value = GoogleSigninStatus['success']))
          .catch(() => (googleSigninResult.value = GoogleSigninStatus['failed']))
      },
    })
  }

  script.onerror = () => {
    alert('google library error')
  }

  head.appendChild(script)
}

// 感覺 watch 應該拿出來包裝 renderGoogleButton，而不是包裝在 renderGoogleButton 裏面
function renderGoogleButton(buttonDiv: HTMLElement) {
  // 如果要做的事情僅是 render，那完成後應該要 unwatch，這個 plugin 是在 login 頁面使用比較沒關係，因為一旦登入後頁面進行跳轉，這裡的 watch 會被自動抹消，但如果ＵＩ設計上是 button 會一直存在，就會有一個無用的 watch 一直長存。
  watch(
    isLoaded,
    () => {
      if (isLoaded.value) {
        window.google.accounts.id.renderButton(buttonDiv, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          width: '264',
          text: 'signin_with',
          locale: 'en-US',
        })
      }
    },
    { immediate: true }
  )
}

const create = (buttonDiv: HTMLElement) => {
  renderGoogleButton(buttonDiv)
  return new Promise((resolve, reject) => {
    // 用 promist 包裝 watch，很酷，沒想過可以這樣操作
    // 感覺這裡的 watch 不必要，而且做的事情是接續 callback，被拆成兩個部分，應該整個從外部傳進來就好
    watch(googleSigninResult, result => {
      return googleSigninResult.value === GoogleSigninStatus['success']
        ? resolve('login success')
        : reject('login failed')
    })
  })
}

export default {
  install() {
    loadScript()
  },
  create,
}

// 使用這個 plugin 的邏輯必須散落在兩個地方
// 使用1：必須先在 main.ts 安裝

import { googlePlugin } from './plugin'

createApp(App)
  .use(googlePlugin)
  .mount('#app')

// 使用2: 之後才在 component 引用
<script lang="ts" setup>
import { onMounted } from 'vue'
import google from '@/plugin/google'

onMounted(() => {
  const googleBtn = document.getElementById('buttonDiv')
  google
    .create(googleBtn as HTMLElement)
    .then(() => emit('success'))
    .catch(() => emit('failed'))
})

const emit = defineEmits<{ (e: 'success'): void; (e: 'failed'): void }>()
</script>

<template>
  <div id="buttonDiv"></div>
</template>


```

改成

```typescript
import { watch } from 'vue'

let isLoaded = ref(false)
// 定義一個專屬的 script.id
const googleSDKid = 'google-account-script'
// params 型別可以去從 @types/google.accounts 找出來用
function loadScript(SigninCallback: (res: google.accounts.id.CredentialResponse) => void) {
  const head = document.head
  const script = document.createElement('script')
  script.id = googleSDKid
  script.async = true
  script.defer = true
  script.onload = () => {
    isLoaded.value = true
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: res => SigninCallback(res),
    })
  }
  script.onerror = () => alert('google library error')
  script.src = 'https://accounts.google.com/gsi/client'


  head.appendChild(script)
}

// 去除掉 watch
function renderGoogleButton(buttonDiv: HTMLElement) {
  window.google.accounts.id.renderButton(buttonDiv, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    width: '264',
    text: 'signin_with',
    locale: 'en-US',
  })
}

// 從 loadScript 拿型別出來用
// 還是保留可以在 main.ts 先安裝 plugin 的作法，但加入錯誤訊息提醒使用這個 plugin 的人類
function create(buttonDiv: HTMLElement, SigninCallback?: Parameters<typeof loadScript>[0]) {
  if (!document.getElementById(googleSDKid)) {
    if (!SigninCallback) {
      throw new Error("If didn't install this plugin in entry point, please approve 'callbackAfterInit'.")
    } else loadScript(SigninCallback)
  }

  // 如果 script 已經載入了就直接 render button，如果沒有才用 watch，並且避免時間差所以用 immediate 屬性
  if (!isLoaded.value) {
    const unwatch = watch(
      isLoaded,
      v => {
        if (!v) return
        renderGoogleButton(buttonDiv)
        unwatch()
      },
      { immediate: true }
    )
  } else renderGoogleButton(buttonDiv)
}

export const GoogleLoginPlugin = {
  create,
  install: (_app: App, callback: Parameters<typeof loadScript>[0]) => loadScript(callback),
}

// 使用上就不必在 main.ts 先安裝一次，相關的程式碼會比較集中

<script lang="ts" setup>
import { GoogleLoginPlugin } from '@lubn/shared/plugin'
import { useAccountStore } from '@/stores'

const emit = defineEmits<{ (e: 'success'): void; (e: 'failed'): void }>()

const accountStore = useAccountStore()

// onMounted 雖然也可以包裝進去 plugin.ts 裏面，但他屬用 component life cycle hook，
// 不像 watch，在上面的使用上只關注在資料狀態，所以在 component 內使用會比較恰當
onMounted(() => {
  const googleBtn = document.getElementById('buttonDiv')
  GoogleLoginPlugin.create(googleBtn as HTMLElement, res => {
    // callback 的邏輯在這裡傳進去給 plugin
    accountStore
      .handleGoogleCredentialResponse(res)
      .then(() => emit('success'))
      .catch(() => emit('failed'))
  })
})
</script>

<template>
  <div id="buttonDiv"></div>
</template>

```
