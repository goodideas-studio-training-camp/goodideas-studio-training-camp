import{_ as c,M as t,p as l,q as i,Q as s,t as n,N as e,a1 as a}from"./framework-2d24001b.js";const r={},u=a(`<h1 id="vue-的-is-搭配-render-function-處理一些特殊情況" tabindex="-1"><a class="header-anchor" href="#vue-的-is-搭配-render-function-處理一些特殊情況" aria-hidden="true">#</a> vue 的 :is 搭配 Render function 處理一些特殊情況</h1><p>一般在 SFC 裡大概長這樣：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token operator">&lt;</span>templete<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;flex gap-2&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;tab in [&#39;componentA&#39;, &#39;componentB&#39;]&quot;</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;tab&quot;</span> <span class="token decorator"><span class="token at operator">@</span><span class="token function">click</span></span><span class="token operator">=</span><span class="token string">&quot;() =&gt; handleClick(tab)&quot;</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span> tab <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>component <span class="token operator">:</span><span class="token keyword">is</span><span class="token operator">=</span><span class="token string">&quot;current&quot;</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;tab&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>templete<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> componentA <span class="token keyword">from</span> <span class="token string">&#39;./componentA.vue&#39;</span>
<span class="token keyword">import</span> componentB <span class="token keyword">from</span> <span class="token string">&#39;./componentB.vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      current<span class="token operator">:</span> <span class="token string">&#39;componentA&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    componentA<span class="token punctuation">,</span>
    componentB<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span>componentName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> componentName
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>current 在 vue 2 是放 component key name， 到 vue 3 <code>&lt;script setup /&gt;</code> 裡可以直接放 <code>component</code> (請見官網)</p><h3 id="想解決的狀況" tabindex="-1"><a class="header-anchor" href="#想解決的狀況" aria-hidden="true">#</a> 想解決的狀況</h3><ul><li>想直接組裝出一個新的小元件，又不想額外多切一個 SFC 出來</li><li><code>&lt;component&gt;</code> 放的 component 有各自不同的 slot， 全都寫在 templete 進行判斷會錯綜複雜?</li><li>dynamic component 是放在其他 component 的 slot 裡，但必須依照不同 component 放置在不同 namedSlot 裡? (是想多複雜?)</li></ul><p>該怎麼做? 目前看起來 SFC 裡面要使用 dynamic component 就得把 component 都切好、額外放成 SFC， 即使他的變動很小也一樣，因為 <code>:is</code> 要的是 component key name?</p><hr><p>仔細看 api documents</p><p><code>is</code> 除了 String 另外還可以接受 <strong>Object (component’s options object)</strong> 當作參數 但這個 Object 長什麼樣子卻好像沒怎麼說明? 其實就是 SFC export 出去的那個 Object.... 就是 vuejs 最原本的那種寫法，只是好像大家太常處在 vue cli + SFC 的世界裡， 真的會不太清楚到底怎麼寫...?</p><h3 id="用-render-function" tabindex="-1"><a class="header-anchor" href="#用-render-function" aria-hidden="true">#</a> 用 render function</h3>`,11),k=s("code",null,"this",-1),d=s("code",null,"render",-1),v=s("code",null,"模板字串",-1),m=s("code",null,"virtual node",-1),b=s("code",null,"VNode",-1),g={href:"https://vuejs.org/v2/guide/render-function.html#The-Virtual-DOM",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>所以 vue 2 裡面可以這樣寫</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button
        v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;tab in [&#39;componentA&#39;, &#39;componentB&#39;, &#39;newComponent&#39;]&quot;</span>
        <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;tab&quot;</span>
        <span class="token decorator"><span class="token at operator">@</span><span class="token function">click</span></span><span class="token operator">=</span><span class="token string">&quot;() =&gt; handleClick(tab)&quot;</span>
      <span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span> tab <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>component <span class="token operator">:</span><span class="token keyword">is</span><span class="token operator">=</span><span class="token string">&quot;current&quot;</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;tab&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> componentA <span class="token keyword">from</span> <span class="token string">&#39;./componentA.vue&#39;</span>
<span class="token keyword">import</span> componentB <span class="token keyword">from</span> <span class="token string">&#39;./componentB.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    componentA<span class="token punctuation">,</span>
    componentB<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>createElement<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token function">createElement</span><span class="token punctuation">(</span>
          componentA<span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            attrs<span class="token operator">:</span> <span class="token punctuation">{</span>
              id<span class="token operator">:</span> <span class="token string">&#39;componentC&#39;</span><span class="token punctuation">,</span>
              <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">&#39;component_C_class&#39;</span><span class="token punctuation">,</span>
              style<span class="token operator">:</span> <span class="token string">&#39;background-color: lightblue&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            on<span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token function-variable function">click</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;componentC clicked!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            scopedSlots<span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>componentB<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>
            <span class="token string">&#39;This is text node inside the ComponetC&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// 也可以直接用 this 底下的 $createElement，都是一樣的東西</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;This is child &lt;p&gt; tag&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      props<span class="token operator">:</span> <span class="token punctuation">{</span>
        test<span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;created&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      current<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      newComponent<span class="token operator">:</span> newComponent<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span>componentName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>componentName <span class="token operator">===</span> <span class="token string">&#39;newComponent&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>componentName<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newComponent
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> componentName
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue 3 一樣。 只是</p><ul><li>原本 render function 收到的參數 - <code>createElement</code>，在文件裡的名稱從 <code>createElement</code> 變成 <code>h</code></li><li>並且 <code>h</code> 被拉升到 global，需要另外 Import 近來使用，不會在 render function 裡收到了。</li><li>VNode props 的書寫格式平版化，像是 <code>id</code>, <code>style</code>, <code>class</code>, 不必再包在 <code>attrs</code> 裡，click 拉升變成 onClick。</li></ul><p>最後附上用 vue 3 <code>&lt;script setup&gt;</code> 寫的 demo</p>`,5),y=a(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;w-96 h-40 border-2&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;flex gap-2&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button
        v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;tab in [&#39;componentA&#39;, &#39;componentB&#39;, &#39;componentC&#39;]&quot;</span>
        <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;tab&quot;</span>
        <span class="token decorator"><span class="token at operator">@</span><span class="token function">click</span></span><span class="token operator">=</span><span class="token string">&quot;() =&gt; handleClick(tab)&quot;</span>
        <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;border border-black bg-gray-200 p-2&quot;</span>
      <span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span> tab <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>component <span class="token operator">:</span><span class="token keyword">is</span><span class="token operator">=</span><span class="token string">&quot;current&quot;</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;m-2&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> componentA <span class="token keyword">from</span> <span class="token string">&#39;./A.vue&#39;</span>
<span class="token keyword">import</span> componentB <span class="token keyword">from</span> <span class="token string">&#39;./B.vue&#39;</span>

<span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>componentA<span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> tab <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>tab<span class="token punctuation">)</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>tab<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;componentA&#39;</span><span class="token operator">:</span>
      current<span class="token punctuation">.</span>value <span class="token operator">=</span> componentA
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;componentB&#39;</span><span class="token operator">:</span>
      current<span class="token punctuation">.</span>value <span class="token operator">=</span> componentB
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;componentC&#39;</span><span class="token operator">:</span>
      current<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          <span class="token function">h</span><span class="token punctuation">(</span>
            componentA<span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              id<span class="token operator">:</span> <span class="token string">&#39;componentC&#39;</span><span class="token punctuation">,</span>
              <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">&#39;p-2&#39;</span><span class="token punctuation">,</span>
              style<span class="token operator">:</span> <span class="token string">&#39;background-color: lightblue&#39;</span><span class="token punctuation">,</span>
              <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;clicked!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token function-variable function">default</span><span class="token operator">:</span> props <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;This is &lt;p&gt;, placed at default slot&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        props<span class="token operator">:</span> <span class="token punctuation">{</span>
          test<span class="token operator">:</span> String<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;created&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function h(w,q){const p=t("ExternalLinkIcon"),o=t("vue-DynamicComponentDemo");return l(),i("div",null,[u,s("p",null,[n("在 "),k,n("(vm) 裡面有一個 $createElement， 他通常只出現在 "),d,n(" 接收到的參數， 文件說是 "),v,n(" 的替代方法。 它 return 的東西是 virtual DOM 的 node(節點)， 文件稱它 "),m,n("，簡稱 "),b,n("， 有沒有覺得 VNode 很常出現在 vue api 文件裡，但好像沒什麼地方有說明它到底是什麼? 他被說明在"),s("a",g,[n("這裡"),e(p)]),n(" 請順便往下看 createElement 的用法。")]),f,e(o),y])}const C=c(r,[["render",h],["__file","20210112-renderFunction.html.vue"]]);export{C as default};
