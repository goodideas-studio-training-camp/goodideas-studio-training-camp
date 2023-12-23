---
# head:
title: 使用 vuedraggable 做看板元件
lang: zh-TW
date: 2023-07-17
contributors: 
- "Chiahsuan"
---

# 使用 vuedraggable 做看板元件

先前參與的專案中實作了一個類似 Trello 的看板元件，此文章主要會分享查找文件以及實作的過程。
完整程式碼可參考: https://github.com/Chiahsuan-TW/plating-project-trial

## 需求細節

- 拖拉卡片可以改地點
- 整欄也可以拖拉來調換左右的排序
- 卡片拖拉不可改變上下的排序，上下排序要依時間
- 不管是單張卡片還是整欄，拖拉到畫面邊界時，水平軸需要可以自動滾動
- 更改位置發完 request、畫面重渲染後要滾動到原先的位置


## 實作紀錄

veudraggable 的文件中有提到，Sortable.js 有提供的功能，vuedraggable 完全可支援，例如我們需要實做的自動滾軸功能。詳細設定方式可以點連結到 Sortable.js 的文件查看，資訊會比 vuedraggable 的文件詳細。

以下我將實做的內容大致拆分成三個，分別是產生可以符合需求的看板，如何產生自動滾軸，以及重新渲染後要如何計算距離，讓滾軸自動回到先前使用者滾動到的位置

![](https://hackmd.io/_uploads/Hygs0xOKh.png)



### 1. 先產生看板

![](https://hackmd.io/_uploads/r1VUBEWch.png)


html 結構請見下方程式碼，結構上會需要兩層的 Draggable，外層的 Draggable 元件會產生如上圖 A ~ D 的 columns，這些 columns 可以拖拉改變位置，內層的 Draggable 則會產生 columns 內的卡片（上圖黃色、紫色的部分）

```javascript=
<template>
  <div>
    <Draggable
      class="flex flex-row"
      ghostClass="ghost-column"
      v-model="worksheetList"
      itemKey="area"
      @end="memorizeLocationOrder(worksheetList)"
      :scrollSensitivity="80"
      :forceFallback="true"
    >
      <template #item="{ element }">
        <div class="column h-fit">
          <div class="py-2 px-4 w-60 cursor-grab bg-cyan-500">
            <span>{{ element.area }}</span>
          </div>
          <Draggable
            :data-location="element.area"
            v-model="element.worksheetList"
            itemKey="id"
            :clone="clone"
            :group="{
              name: 'id',
              pull: pullFunction
            }"
            @start="start"
            @end="updateWorksheetLocation"
            @move="onMove"
            :scrollSensitivity="80"
            :forceFallback="true"
            :sort="false"
            :swapThreshold="1"
            ghostClass="ghost"
          >
            <template #item="{ element: data }">
              <Card :data="data" :data-id="data.id" />
            </template>
          </Draggable>
        </div>
      </template>
    </Draggable>
  </div>
</template>
```

接下來就是最重要的資料部分了，資料結構如下：

item 這個 slot 可以拿到陣列中每個物件 element，接著會再將 element 中的 worksheetList 用 v-model 資料綁定給內層的 Draggable 元件使用，產生出卡片

```javascript=
worksheetList = [
    {area: "岩手縣", order: 0, worksheetList: [{...}, {...}]},
    {area: "XX", order: 1, worksheetList: [{...}]}
]

內層的 worksheetList 內物件資料:
{
    area: "北海道"
    deliveryDate: "2023-06-01"
    id: 2
    model: "ARAYA-X3"
    orderNumber: "ARA003"
}

```

內層的 Draggable 設定`:sort="false"` 是為了避免卡片被更改上下排序，如果你的實作需求是使用者可以自行更改排序，則這個設定就要改為 `:sort="true"`


### 2. 自動滾動

要實現這個功能需要設定兩個必要的 props：

* `:forceFallback="true"`
* `:scrollSensitivity="10"`

scrollSensitivity 的數值代表的是距離邊界多遠時會開始自動滾動水平軸，另外要注意的是，scrollSensitivity 這個屬性只在 forceFallback 設為 true 時才起作用，所以兩個要一起設定才行。


### 3. 重新渲染後回到原先位置

因為拖拉的關係，一開始會把焦點放在滑鼠的位置上，但因為加上滾動的變因，如果依照滑鼠的位置來決定重新渲染後水平滾軸要回到的位置會太複雜，重新想想後，發現把關注的重點擺在滾軸會比較好做。

東找西找後發現了 DOM 元素有一個 scrollLeft 的屬性，它是一個可以 get/set 的值，如果元素可被滾動，就會記錄元素距離自己最左側的位置滾動的距離

> The Element.scrollLeft property gets or sets the number of pixels that an element's content is scrolled from its left edge.

相關的程式碼如下，主要的概念就是紀錄 kanbanContainer 滾動的距離，在使用者停止拖拉行為時，將紀錄滾動距離的 scrollTo 向外傳遞，父層在重新獲取訂單資料後，透過 scrollTo 方法把值 set 回去，元素就會自動滾動到原先的位置。

```javascript=
// src/components/worksheet/Kanban.vue

const scrollTo = ref(0)

function start({ originalEvent }) {
  // ... 省略
  const kanbanContainer = document.querySelector('.kanban-container');
  scrollTo.value = kanbanContainer.scrollLeft;
}

function onMove() {
  const kanbanContainer = document.querySelector('.kanban-container');
  scrollTo.value = kanbanContainer.scrollLeft;
}


async function updateWorksheetLocation(evt) {
  // ... 省略
  try {
    await API.PUT(`/orders/${draggedItemId}`, updatedOrder);

    emit('changeExecuteLocation', {
      key: new Date().valueOf(),
      scrollTo: scrollTo.value
    });
    message.success('成功變更生產據點');
  } catch (error) {
    // ... 省略
    emit('changeExecuteLocationFailed', new Date().valueOf());
  }
}

// /src/views/TrelloView.vue
function autoScroll(scrollTo) {
  const kanbanContainer = document.querySelector('.kanban-container');
  setTimeout(() => {
    kanbanContainer.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, 600);
}

```

---

以上是這次實作中個人認為比較有挑戰的地方，如果針對其他部分有疑問的也歡迎留言討論喔：）


## References
- [Sortable 文件](https://github.com/SortableJS/Sortable)
- [Disabling Sorting](https://sortablejs.github.io/Sortable/#sorting-disabled)
- [AutoScroll](https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll)
- [MDN - scrollLeft](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft )