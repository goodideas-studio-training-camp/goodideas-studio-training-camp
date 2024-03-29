---
title: 資料 immutable 觀念
lang: zh-TW
description:
date: September 12, 2022
contributors: 
- "Cathy"
---
# 資料 immutable 觀念
## 前言

此篇文章主要是因為某天與同事 code review 時，被問到「若是這筆資料只侷限在這個 view 使用，那麼用 push 不是最簡單明瞭嗎？」
因此整理出關於在前端修改資料時，可能會遇到的 **immutable** 問題。當然以現代主流框架來說，會遇到如此複雜深層的資料改變導致畫面無發更新的問題少之又少，但還是拿出來討論一下～

若對於文章有任何疑問，歡迎提出討論～

## 糟糕的範例

*ScriptEditor 內的寫法(父層)*
```jsx
<template>
	<div v-for="item in *stepDatas*" :key="item.id">
		<component :is="item.component" *:propsData="item"*></component>
	</div>
</template>
<script>
export default {
  name: "*ScriptEditor*",
  data() {
    return {
			stepDatas: []
		};
  },
	methods:{
		addStepCard(val){
			switch(val.type) {
				case 'start':
				this.stepDatas.push({
					nid: this.stepDatas.lenght,
					component: 'scriptEditorStart',
					type: val.type,
					target_url: val.target_url
				})
				// array 的最後一筆資料 的 id + 1
        this.stepDatas.at(-1).nid += 1
			}
				case 'input':
				this.stepDatas.push({
					nid: this.stepDatas.lenght + 1,
					component: 'scriptEditorInput',
					type: val.type,
					target_url: val.target_url
				})
			}
		}
	}
};
```

*scriptEditorInput 內的寫法(子層)*
```jsx
<template>
	<div v-for="item in *stepDatas*" :key="item.id">
		<component :is="item.component" *:propsData="item"*></component>
	</div>
</template>
<script>
export default {
  name: "scriptEditorInput",
	props:['*propsData*']
  data() {
    return {
			formDate: JSON.prase(JSON.stringify(this.propData))
		};
  },
	watch: {
    // 不會被觸發
    formDate(newValue, oldValue) {
			console.log(newValue)
    }
  },
};
```

最一開始的寫法是在該 component 的 data 寫一個預設的 stepData = [] (總之初始化一個空陣列)。

接著在 addScriptItem 時將每一筆資料用 **push** 的方式直接修改 stepData 因此 vue 的 virtual DOM 沒有更新， watch 也沒辦法監察到資料變動。

**如果用 push 的話在記憶體裡，還是同一個位置，**用解構賦值才會是真的改寫記憶體位置。

而使用 JSON.stringify + JSON.parse 這個方法會是利用深拷貝特性，更新後的資料指向新的記憶體位置。缺點是非常佔記憶體空間。

## immutable

基礎型別，每宣告一次，就會建立一次新的記憶體，而陣列、物件等型別，則是修改該物件內的 property，該 property 會指向新的記憶體。

以下圖示：
![](https://i.imgur.com/y9t5t8X.png)

這邊我們將 `user.age` 的 value 改成 19，就是從原本的記憶體位置從 `0xFF0400` 指向 `0xFF0408`。

對於記憶體來說，`user` 並沒有被改變，當然 watch 也偵測不到資料的改變。

```jsx
let user = {
  name: 'Chris',
  age: 18,
};

user.age = 19
```
![](https://i.imgur.com/4nN9EAo.png)

```jsx
let user = {
  name: 'Chris',
  age: 18,
};

user = {
  name: 'Chris',
  age: 19,
}
```
![](https://i.imgur.com/QBThvJY.png)

如果將 `user` 整個重新賦值的方式，才會是直接修改該 Object 整個指向全新的記憶體。

---

以 vue 官方角度來說(vue1 轉 vue2 時，就有針對這個問題優化過了)，使用 push method 是可以的做到「資料變動以改變畫面」，但是為了後續維護以及 debug 方便，還是會以 immutable 的方式去做會比較安全。

## 資料來源

- [Vue.js 進階心法 - 用 watch 搭配服用 immutable](https://ithelp.ithome.com.tw/articles/10269649)