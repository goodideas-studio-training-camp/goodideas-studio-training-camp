---
author: chris
title: Github Page 設定自定義的網域
description: Github Page 設定自定義的網域
pubDatetime: 2023-02-06
tags:
  - web
---

# Github Page 設定自定義的網域

[原文說明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

目的: 將原本的網址 domain 改成自定義的

效果如下[1]

`anyname.github.io/anypath` -> `blog.goodideas-studio.com/anypath`

所以，如果要用根目錄的 repo，就要依照 github 的設定規則。

## 買一個新的 domain

接下來就買一個新的 domain 啦

好想工作室的官網 `www.goodideas-studio.com` ，這次要設定 subdomain 給 blog

命名成 `blog.goodideas-studio.com`

## Github Page

在 repo 的 Setup 頁面裡，找 github page 的設定細節，其中有一段是 Custom domain 自定義網域的段落，設定 `blog.goodideas-studio.com` 並且 Save

![](https://i.imgur.com/rK8rPwB.png)

## 設定 DNS

設定
CNAME `blog.goodideas-studio.com` 轉向原本的 `anyname.github.io`

## 最後

DNS 設定並不一會立即生效，要看伺服器更新週期，下一次什麼時候更新快取資料。

但可以先用無痕看看 https://blog.goodideas-studio.com

![](https://i.imgur.com/Sm2Wao6.png)

## 參考資料

[1]: [Can I use CNAME to send to a directory on another server, or only the root page?
](https://serverfault.com/questions/329976/can-i-use-cname-to-send-to-a-directory-on-another-server-or-only-the-root-page)
