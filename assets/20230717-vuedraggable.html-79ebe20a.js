import{_ as a,M as s,p as t,q as r,Q as e,t as i,N as l,a1 as d}from"./framework-2d24001b.js";const o={},u=d(`<h1 id="使用-vuedraggable-做看板元件" tabindex="-1"><a class="header-anchor" href="#使用-vuedraggable-做看板元件" aria-hidden="true">#</a> 使用 vuedraggable 做看板元件</h1><p>先前參與的專案中實作了一個類似 Trello 的看板元件，此文章主要會分享查找文件以及實作的過程。 完整程式碼可參考: https://github.com/Chiahsuan-TW/plating-project-trial</p><h2 id="需求細節" tabindex="-1"><a class="header-anchor" href="#需求細節" aria-hidden="true">#</a> 需求細節</h2><ul><li>拖拉卡片可以改地點</li><li>整欄也可以拖拉來調換左右的排序</li><li>卡片拖拉不可改變上下的排序，上下排序要依時間</li><li>不管是單張卡片還是整欄，拖拉到畫面邊界時，水平軸需要可以自動滾動</li><li>更改位置發完 request、畫面重渲染後要滾動到原先的位置</li></ul><h2 id="實作紀錄" tabindex="-1"><a class="header-anchor" href="#實作紀錄" aria-hidden="true">#</a> 實作紀錄</h2><p>veudraggable 的文件中有提到，Sortable.js 有提供的功能，vuedraggable 完全可支援，例如我們需要實做的自動滾軸功能。詳細設定方式可以點連結到 Sortable.js 的文件查看，資訊會比 vuedraggable 的文件詳細。</p><p>以下我將實做的內容大致拆分成三個，分別是產生可以符合需求的看板，如何產生自動滾軸，以及重新渲染後要如何計算距離，讓滾軸自動回到先前使用者滾動到的位置</p><p><img src="https://hackmd.io/_uploads/Hygs0xOKh.png" alt=""></p><h3 id="_1-先產生看板" tabindex="-1"><a class="header-anchor" href="#_1-先產生看板" aria-hidden="true">#</a> 1. 先產生看板</h3><p><img src="https://hackmd.io/_uploads/r1VUBEWch.png" alt=""></p><p>html 結構請見下方程式碼，結構上會需要兩層的 Draggable，外層的 Draggable 元件會產生如上圖 A ~ D 的 columns，這些 columns 可以拖拉改變位置，內層的 Draggable 則會產生 columns 內的卡片（上圖黃色、紫色的部分）</p><div class="language-javascript= line-numbers-mode" data-ext="javascript="><pre class="language-javascript="><code>&lt;template&gt;
  &lt;div&gt;
    &lt;Draggable
      class=&quot;flex flex-row&quot;
      ghostClass=&quot;ghost-column&quot;
      v-model=&quot;worksheetList&quot;
      itemKey=&quot;area&quot;
      @end=&quot;memorizeLocationOrder(worksheetList)&quot;
      :scrollSensitivity=&quot;80&quot;
      :forceFallback=&quot;true&quot;
    &gt;
      &lt;template #item=&quot;{ element }&quot;&gt;
        &lt;div class=&quot;column h-fit&quot;&gt;
          &lt;div class=&quot;py-2 px-4 w-60 cursor-grab bg-cyan-500&quot;&gt;
            &lt;span&gt;{{ element.area }}&lt;/span&gt;
          &lt;/div&gt;
          &lt;Draggable
            :data-location=&quot;element.area&quot;
            v-model=&quot;element.worksheetList&quot;
            itemKey=&quot;id&quot;
            :clone=&quot;clone&quot;
            :group=&quot;{
              name: &#39;id&#39;,
              pull: pullFunction
            }&quot;
            @start=&quot;start&quot;
            @end=&quot;updateWorksheetLocation&quot;
            @move=&quot;onMove&quot;
            :scrollSensitivity=&quot;80&quot;
            :forceFallback=&quot;true&quot;
            :sort=&quot;false&quot;
            :swapThreshold=&quot;1&quot;
            ghostClass=&quot;ghost&quot;
          &gt;
            &lt;template #item=&quot;{ element: data }&quot;&gt;
              &lt;Card :data=&quot;data&quot; :data-id=&quot;data.id&quot; /&gt;
            &lt;/template&gt;
          &lt;/Draggable&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/Draggable&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下來就是最重要的資料部分了，資料結構如下：</p><p>item 這個 slot 可以拿到陣列中每個物件 element，接著會再將 element 中的 worksheetList 用 v-model 資料綁定給內層的 Draggable 元件使用，產生出卡片</p><div class="language-javascript= line-numbers-mode" data-ext="javascript="><pre class="language-javascript="><code>worksheetList = [
    {area: &quot;岩手縣&quot;, order: 0, worksheetList: [{...}, {...}]},
    {area: &quot;XX&quot;, order: 1, worksheetList: [{...}]}
]

內層的 worksheetList 內物件資料:
{
    area: &quot;北海道&quot;
    deliveryDate: &quot;2023-06-01&quot;
    id: 2
    model: &quot;ARAYA-X3&quot;
    orderNumber: &quot;ARA003&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>內層的 Draggable 設定<code>:sort=&quot;false&quot;</code> 是為了避免卡片被更改上下排序，如果你的實作需求是使用者可以自行更改排序，則這個設定就要改為 <code>:sort=&quot;true&quot;</code></p><h3 id="_2-自動滾動" tabindex="-1"><a class="header-anchor" href="#_2-自動滾動" aria-hidden="true">#</a> 2. 自動滾動</h3><p>要實現這個功能需要設定兩個必要的 props：</p><ul><li><code>:forceFallback=&quot;true&quot;</code></li><li><code>:scrollSensitivity=&quot;10&quot;</code></li></ul><p>scrollSensitivity 的數值代表的是距離邊界多遠時會開始自動滾動水平軸，另外要注意的是，scrollSensitivity 這個屬性只在 forceFallback 設為 true 時才起作用，所以兩個要一起設定才行。</p><h3 id="_3-重新渲染後回到原先位置" tabindex="-1"><a class="header-anchor" href="#_3-重新渲染後回到原先位置" aria-hidden="true">#</a> 3. 重新渲染後回到原先位置</h3><p>因為拖拉的關係，一開始會把焦點放在滑鼠的位置上，但因為加上滾動的變因，如果依照滑鼠的位置來決定重新渲染後水平滾軸要回到的位置會太複雜，重新想想後，發現把關注的重點擺在滾軸會比較好做。</p><p>東找西找後發現了 DOM 元素有一個 scrollLeft 的屬性，它是一個可以 get/set 的值，如果元素可被滾動，就會記錄元素距離自己最左側的位置滾動的距離</p><blockquote><p>The Element.scrollLeft property gets or sets the number of pixels that an element&#39;s content is scrolled from its left edge.</p></blockquote><p>相關的程式碼如下，主要的概念就是紀錄 kanbanContainer 滾動的距離，在使用者停止拖拉行為時，將紀錄滾動距離的 scrollTo 向外傳遞，父層在重新獲取訂單資料後，透過 scrollTo 方法把值 set 回去，元素就會自動滾動到原先的位置。</p><div class="language-javascript= line-numbers-mode" data-ext="javascript="><pre class="language-javascript="><code>// src/components/worksheet/Kanban.vue

const scrollTo = ref(0)

function start({ originalEvent }) {
  // ... 省略
  const kanbanContainer = document.querySelector(&#39;.kanban-container&#39;);
  scrollTo.value = kanbanContainer.scrollLeft;
}

function onMove() {
  const kanbanContainer = document.querySelector(&#39;.kanban-container&#39;);
  scrollTo.value = kanbanContainer.scrollLeft;
}


async function updateWorksheetLocation(evt) {
  // ... 省略
  try {
    await API.PUT(\`/orders/\${draggedItemId}\`, updatedOrder);

    emit(&#39;changeExecuteLocation&#39;, {
      key: new Date().valueOf(),
      scrollTo: scrollTo.value
    });
    message.success(&#39;成功變更生產據點&#39;);
  } catch (error) {
    // ... 省略
    emit(&#39;changeExecuteLocationFailed&#39;, new Date().valueOf());
  }
}

// /src/views/TrelloView.vue
function autoScroll(scrollTo) {
  const kanbanContainer = document.querySelector(&#39;.kanban-container&#39;);
  setTimeout(() =&gt; {
    kanbanContainer.scrollTo({ left: scrollTo, behavior: &#39;smooth&#39; });
  }, 600);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>以上是這次實作中個人認為比較有挑戰的地方，如果針對其他部分有疑問的也歡迎留言討論喔：）</p><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2>`,29),c={href:"https://github.com/SortableJS/Sortable",target:"_blank",rel:"noopener noreferrer"},v={href:"https://sortablejs.github.io/Sortable/#sorting-disabled",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll",target:"_blank",rel:"noopener noreferrer"},b={href:"https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft",target:"_blank",rel:"noopener noreferrer"};function h(g,p){const n=s("ExternalLinkIcon");return t(),r("div",null,[u,e("ul",null,[e("li",null,[e("a",c,[i("Sortable 文件"),l(n)])]),e("li",null,[e("a",v,[i("Disabling Sorting"),l(n)])]),e("li",null,[e("a",m,[i("AutoScroll"),l(n)])]),e("li",null,[e("a",b,[i("MDN - scrollLeft"),l(n)])])])])}const f=a(o,[["render",h],["__file","20230717-vuedraggable.html.vue"]]);export{f as default};
