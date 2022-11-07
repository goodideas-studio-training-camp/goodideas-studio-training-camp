# 初次見面 LIFF of LINE

這是什麼？

> LINE Front-end Framework (LIFF) is a platform for web apps provided by LINE. 
> The web apps running on this platform are called LIFF apps.

用 LINE 的 瀏覽器打開。可以在前端執行 LINE 的功能。

## 安裝

[參考 repo](https://github.com/line/line-liff-v2-starter/tree/master/src/vanilla)

**npm**

```shell
$ npm install @line/liff 
```

## 使用

> process.env.LIFF_ID 指的是自己申請好的 LIFF_ID 要設定在 .env 檔上面

```javascript
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
    })
    .catch((error) => {
        console.log(error)
    })
});
```

## 設定 LINE

LINE 的應用 (截圖以 MessageingAPI 為例) 上面出現一個 LIFF 的標籤

> ![](https://i.imgur.com/h1QYiAN.png)
> [color=#00b900]

要先設定 LINE Login 這個功能才會啟動。

在 LINE Login 裡會出現這個

> ![](https://i.imgur.com/Pgo0u5V.png)
> [color=#00b900]

按下「ADD」填一填資料，就可以取得 LINE_ID

> ![](https://i.imgur.com/suXi607.png)
> [color=#00b900]

## 開發

如果暫時還沒有佈署上去，可以暫時使用 ngrok 取得一個有 https 的網址當作開發用的臨時網址。

初始化成功，就可以來[遊樂場](https://liff-playground.netlify.app/)參考要使用的功能



```
liff.isInClient()
```

判斷是不是在 LINE 裡的 LIFF browser 開啟的。這個 browser 和一般的 web view 不一樣。



```
liff.getContext()
```

userId 就是用來發給 Messageing API 功能的主動通知，識別碼

```
{
    "type": "external",
    "userId": "Ude7ca124379d3f9cde8aee01d5fefdce",
    "liffId": "1656508316-k7jNojXm",
    ...
}
```


**使用 LINE 登入時，可以注意一個特性**

每個 LINE 帳號，在一個 `provider` 會有一個固定的 `userID`。
如果是不同的 `provider` 就會有不同的 `userID`。

而每個 provider 可以擁有不同的 Messageing API 服務，可以做成不同的聊天機器人，它們各自有不同的 `Channel ID`，透過不同的 `Channel ID` 就算使用者是相同的 `userID` 也可以在不同的服務發給指定的使用者。

文章同時發佈於 [《Chris 技術筆記》 - 初次見面 LIFF of LINE](https://dwatow.github.io/2022/11-07-first-liff/)