---
title: 你要找的頁面還沒有出現
date: 2017-06-15 13:08:19
---

# 404!!!你要找的頁面還沒有出現

## 可能是網址改變了。

> 因為安裝 gitalk 它是留言系統
> 利用 github 的 issue tracker 功能，在同時會新增 label
> 因為 github 的 labels 長度不能超過 50 個字，所以有些文章的網址要改短

**單篇**

- [實戰 Webpack 的 file-loader 和 url-loader](https://dwatow.github.io/2018/12-29-webpack/action-url-loader-file-loader/)
- [讓 Code review 再也不會出現 Coding Style 的問題](https://dwatow.github.io/2018/09-20-code-review-no-coding-style-worning/)
- [在 Vue-cli 或 Webpack 想使用 Bootstrap](https://dwatow.github.io/2018/03-25-vuejs/vue-cli-webpack-bootstrap/)
- [給想學 JS 的前端「JS 生態系及週邊工具整理」導讀](https://dwatow.github.io/2018/02-17-iron-man-2018/summary-js-ecosystem/)
- [給前端的「來做個網路瀏覽器吧！」導讀](https://dwatow.github.io/2018/02-12-iron-man-2018/know-browser-for-f2e/)

**系列**

- [AngularJS 全系列](https://dwatow.github.io/tags/angularjs/)
  - [AngularJS 1.5+ Component lifecycle](/2019/01-02-angularjs/angularjs-lifecycle/)
  - [AngularJS 1.5+ Component style with es6-class](/2018/12-23-angularjs/angularjs-es6-class/)
  - [AngularJS + Gulp → Webpack](/2018/12-06-angularjs/angularjs-with-webpack/)
- [Facebook 全系列](https://dwatow.github.io/tags/facebook/)
  - [Facebook 網頁登入](/2018/02-09-facebook/fb-web-login/)
  - [給非工程人員的 Messager 引導手冊](/2018/01-27-for-designer/messenger-design-doc/)
  - [刪除 facebook developers 的 app](/2017/11-12-facebook/fb-develop-delete-app/)
  - [初探 Facebook Messager 聊天機器人](/2017/06-16-facebook/fb-messenger-chatbot-first/)
- [Hexo 全系列](https://dwatow.github.io/tags/hexo/)
  - [Hexo 備份 md 檔](https://dwatow.github.io/2019/01-03-hexo/hexo-backup-to-branch/)
  - [hexo 加上 Open Graph](https://dwatow.github.io/2018/02-07-hexo/hexo-open-graph/)
  - [hexo 加上 安全網 (文章推薦)](https://dwatow.github.io/2018/01-28-hexo/list-related-posts/)
  - [markdown-it 如何順利使用 toc 在 hexo](https://dwatow.github.io/2018/01-28-hexo/how-to-hexo-markdown-it-toc/)
  - [hexo 加上數學式 MathJax](https://dwatow.github.io/2018/01-28-hexo/katex/)
  - [Hexo 研究筆記 1](https://dwatow.github.io/2017/06-18-hexo/re-equip-hexo1/)
  - [hexo 加上 github 表情符號](https://dwatow.github.io/2017/06-18-hexo/github-emojis/)
  - [hexo 加上 UML 循序圖](https://dwatow.github.io/2017/06-18-hexo/uml-sequence/)
  - [hexo 加上流程圖](https://dwatow.github.io/2017/06-18-hexo/flow-chart/)
  - [測試 hackmd 支援的 markdown 寫法](https://dwatow.github.io/2017/06-18-hexo/test-hackmd/)
- [給平面設計師的 系列](https://dwatow.github.io/categories/給平面設計師的/)
  - [給非工程人員的 Messager 引導手冊](https://dwatow.github.io/2018/01-27-for-designer/messenger-design-doc/)
  - [出尺寸稿？怎麼出？](https://dwatow.github.io/2017/06-29-for-designer/output-specifications/)
  - [出圖？怎麼出？](https://dwatow.github.io/2017/06-29-for-designer/about-web-image/)
  - [如何取得手機版面的設計解析度](https://dwatow.github.io/2017/06-29-for-designer/about-mobile-resolution/)
  - [網頁前端規格建議](https://dwatow.github.io/2017/06-23-for-designer/talk_with_web_front_end/)

除此之外....
那就看我幾行 code 吧!!

## 一開始，學了 C++。

```c++
#include <iostream>

using namespace std;

int main() {
  cout << "404!!你要找的頁面還沒有出現!!" << endl;
}
```

## 學了物件導向....

```c++
#include <iostream>
#include <string>

using namespace std;

class page {
  string m_Message;
public:
  page(const string& content):m_Message(content) {
  }

  string Content() const {
    return m_Message;
  }
};

int main() {
  page p404("404!!你要找的頁面還沒有出現!!");
  cout << p404.Content() << endl;
}
```

## 學了 Design Pattern...

```c++
#include <iostream>
#include <map>
#include <string>

using namespace std;

class Page;
class Page404;

template<typename T> Page* PageConstructorPtr(const string& m_StatusCode)
{ return new T(m_StatusCode); }

//Factory
class Factory {
  typedef Page*(*PageConstructor)(const string&);
  map<string, PageConstructor> m_PagesMap;
public:
  Factory() {
    m_PagesMap["page404"] = &PageConstructorPtr<Page404>;
  }

  Page* CreatePage(const string& StatusCode, const string& Message) {
    PageConstructor pc = m_PagesMap[StatusCode];
    Page* object = pc(Message);
    return object;
  }
};

//objects
class Page {
public:
  virtual string Content() const = 0;
};

class Page404 : public Page {
  const string m_Str;
  string m_Message;
public:
  Page404(const string& Content):m_Str("404!!"), m_Message(Content){}
  string Content() const {
    return m_Str + m_Message;
  }
};

//main program
int main() {
  Factory factory;
  Page * p404 = factory.CreatePage("page404", "你要找的頁面還沒有出現!!");
  cout << p404->Content() << endl;
}
```

## 學前端

學 Javascript

```js
console.log("404!!你要找的頁面還沒有出現!!");
```