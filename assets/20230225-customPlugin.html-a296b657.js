import{_ as n,p as s,q as a,a1 as t}from"./framework-2d24001b.js";const p={},o=t(`<h1 id="vue-custom-plugin-範例" tabindex="-1"><a class="header-anchor" href="#vue-custom-plugin-範例" aria-hidden="true">#</a> Vue Custom Plugin 範例</h1><p>前端開發過程多多少少都會碰到要自己包裝 library 作為 plugin， 這裡直接用既有的 code 來說明感覺比較快。 包裝的東西是 google 登入按鈕。</p><p>如果覺得有更好的做法歡迎直接發 PR 修改這邊文章。</p><p>上原始的 code，註明我覺得不妥。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// GoogleLoginPlugin.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useAccountStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/stores&#39;</span>

<span class="token keyword">const</span> isLoaded <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token comment">// 這裡的 enum，可以不必要，而且使用範圍都只在這份檔案裡，不必是 string enum。</span>
<span class="token keyword">enum</span> GoogleSigninStatus <span class="token punctuation">{</span>
  init <span class="token operator">=</span> <span class="token string">&#39;init&#39;</span><span class="token punctuation">,</span>
  success <span class="token operator">=</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">,</span>
  failed <span class="token operator">=</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> googleSigninResult <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token keyword">typeof</span> GoogleSigninStatus<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;init&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> head <span class="token operator">=</span> document<span class="token punctuation">.</span>head
  <span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// 習慣上會把 script.src 放到最後，在這裡應該是沒有關係，因為 &lt;script&gt; 被 append 到 head 是放在最後，理論上 &lt;script&gt; 被 append 到 dom 上時才會開始執行，但萬一是 script.src 被宣告後立即執行，那 async/defer 屬性可能就會吃不到？</span>
  script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;https://accounts.google.com/gsi/client&#39;</span>
  script<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span>
  script<span class="token punctuation">.</span>defer <span class="token operator">=</span> <span class="token boolean">true</span>

  script<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    isLoaded<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 混雜了 pinia，應該藉由 argument 傳進來</span>
    <span class="token keyword">const</span> accountStore <span class="token operator">=</span> <span class="token function">useAccountStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    google<span class="token punctuation">.</span>accounts<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 理想的話 client_id, callback 都應該由外部傳進來</span>
      client_id<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_GOOGLE_CLIENT_ID</span><span class="token punctuation">,</span>
      <span class="token function-variable function">callback</span><span class="token operator">:</span> res <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        googleSigninResult<span class="token punctuation">.</span>value <span class="token operator">=</span> GoogleSigninStatus<span class="token punctuation">[</span><span class="token string">&#39;init&#39;</span><span class="token punctuation">]</span>
        accountStore
          <span class="token punctuation">.</span><span class="token function">handleGoogleCredentialResponse</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>googleSigninResult<span class="token punctuation">.</span>value <span class="token operator">=</span> GoogleSigninStatus<span class="token punctuation">[</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>googleSigninResult<span class="token punctuation">.</span>value <span class="token operator">=</span> GoogleSigninStatus<span class="token punctuation">[</span><span class="token string">&#39;failed&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  script<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;google library error&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 感覺 watch 應該拿出來包裝 renderGoogleButton，而不是包裝在 renderGoogleButton 裏面</span>
<span class="token keyword">function</span> <span class="token function">renderGoogleButton</span><span class="token punctuation">(</span>buttonDiv<span class="token operator">:</span> HTMLElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果要做的事情僅是 render，那完成後應該要 unwatch，這個 plugin 是在 login 頁面使用比較沒關係，因為一旦登入後頁面進行跳轉，這裡的 watch 會被自動抹消，但如果ＵＩ設計上是 button 會一直存在，就會有一個無用的 watch 一直長存。</span>
  <span class="token function">watch</span><span class="token punctuation">(</span>
    isLoaded<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isLoaded<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>google<span class="token punctuation">.</span>accounts<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">renderButton</span><span class="token punctuation">(</span>buttonDiv<span class="token punctuation">,</span> <span class="token punctuation">{</span>
          type<span class="token operator">:</span> <span class="token string">&#39;standard&#39;</span><span class="token punctuation">,</span>
          theme<span class="token operator">:</span> <span class="token string">&#39;outline&#39;</span><span class="token punctuation">,</span>
          size<span class="token operator">:</span> <span class="token string">&#39;large&#39;</span><span class="token punctuation">,</span>
          width<span class="token operator">:</span> <span class="token string">&#39;264&#39;</span><span class="token punctuation">,</span>
          text<span class="token operator">:</span> <span class="token string">&#39;signin_with&#39;</span><span class="token punctuation">,</span>
          locale<span class="token operator">:</span> <span class="token string">&#39;en-US&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> immediate<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token punctuation">(</span>buttonDiv<span class="token operator">:</span> HTMLElement<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">renderGoogleButton</span><span class="token punctuation">(</span>buttonDiv<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 用 promist 包裝 watch，很酷，沒想過可以這樣操作</span>
    <span class="token comment">// 感覺這裡的 watch 不必要，而且做的事情是接續 callback，被拆成兩個部分，應該整個從外部傳進來就好</span>
    <span class="token function">watch</span><span class="token punctuation">(</span>googleSigninResult<span class="token punctuation">,</span> result <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> googleSigninResult<span class="token punctuation">.</span>value <span class="token operator">===</span> GoogleSigninStatus<span class="token punctuation">[</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">]</span>
        <span class="token operator">?</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;login success&#39;</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;login failed&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  create<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用這個 plugin 的邏輯必須散落在兩個地方</span>
<span class="token comment">// 使用1：必須先在 main.ts 安裝</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> googlePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./plugin&#39;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>googlePlugin<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 使用2: 之後才在 component 引用</span>
<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">&quot;ts&quot;</span> setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> google <span class="token keyword">from</span> <span class="token string">&#39;@/plugin/google&#39;</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> googleBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;buttonDiv&#39;</span><span class="token punctuation">)</span>
  google
    <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>googleBtn <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token generic-function"><span class="token function">defineEmits</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token punctuation">{</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;buttonDiv&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改成</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">let</span> isLoaded <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token comment">// 定義一個專屬的 script.id</span>
<span class="token keyword">const</span> googleSDKid <span class="token operator">=</span> <span class="token string">&#39;google-account-script&#39;</span>
<span class="token comment">// params 型別可以去從 @types/google.accounts 找出來用</span>
<span class="token keyword">function</span> <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token function-variable function">SigninCallback</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token operator">:</span> google<span class="token punctuation">.</span>accounts<span class="token punctuation">.</span>id<span class="token punctuation">.</span>CredentialResponse<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> head <span class="token operator">=</span> document<span class="token punctuation">.</span>head
  <span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span>
  script<span class="token punctuation">.</span>id <span class="token operator">=</span> googleSDKid
  script<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span>
  script<span class="token punctuation">.</span>defer <span class="token operator">=</span> <span class="token boolean">true</span>
  script<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    isLoaded<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
    google<span class="token punctuation">.</span>accounts<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      client_id<span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_GOOGLE_CLIENT_ID</span><span class="token punctuation">,</span>
      <span class="token function-variable function">callback</span><span class="token operator">:</span> res <span class="token operator">=&gt;</span> <span class="token function">SigninCallback</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  script<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;google library error&#39;</span><span class="token punctuation">)</span>
  script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;https://accounts.google.com/gsi/client&#39;</span>


  head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 去除掉 watch</span>
<span class="token keyword">function</span> <span class="token function">renderGoogleButton</span><span class="token punctuation">(</span>buttonDiv<span class="token operator">:</span> HTMLElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span>google<span class="token punctuation">.</span>accounts<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">renderButton</span><span class="token punctuation">(</span>buttonDiv<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&#39;standard&#39;</span><span class="token punctuation">,</span>
    theme<span class="token operator">:</span> <span class="token string">&#39;outline&#39;</span><span class="token punctuation">,</span>
    size<span class="token operator">:</span> <span class="token string">&#39;large&#39;</span><span class="token punctuation">,</span>
    width<span class="token operator">:</span> <span class="token string">&#39;264&#39;</span><span class="token punctuation">,</span>
    text<span class="token operator">:</span> <span class="token string">&#39;signin_with&#39;</span><span class="token punctuation">,</span>
    locale<span class="token operator">:</span> <span class="token string">&#39;en-US&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 從 loadScript 拿型別出來用</span>
<span class="token comment">// 還是保留可以在 main.ts 先安裝 plugin 的作法，但加入錯誤訊息提醒使用這個 plugin 的人類</span>
<span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span>buttonDiv<span class="token operator">:</span> HTMLElement<span class="token punctuation">,</span> SigninCallback<span class="token operator">?</span><span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> loadScript<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>googleSDKid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>SigninCallback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;If didn&#39;t install this plugin in entry point, please approve &#39;callbackAfterInit&#39;.&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token function">loadScript</span><span class="token punctuation">(</span>SigninCallback<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 如果 script 已經載入了就直接 render button，如果沒有才用 watch，並且避免時間差所以用 immediate 屬性</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLoaded<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> unwatch <span class="token operator">=</span> <span class="token function">watch</span><span class="token punctuation">(</span>
      isLoaded<span class="token punctuation">,</span>
      v <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>v<span class="token punctuation">)</span> <span class="token keyword">return</span>
        <span class="token function">renderGoogleButton</span><span class="token punctuation">(</span>buttonDiv<span class="token punctuation">)</span>
        <span class="token function">unwatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> immediate<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token function">renderGoogleButton</span><span class="token punctuation">(</span>buttonDiv<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> GoogleLoginPlugin <span class="token operator">=</span> <span class="token punctuation">{</span>
  create<span class="token punctuation">,</span>
  <span class="token function-variable function">install</span><span class="token operator">:</span> <span class="token punctuation">(</span>_app<span class="token operator">:</span> App<span class="token punctuation">,</span> callback<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> loadScript<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">loadScript</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用上就不必在 main.ts 先安裝一次，相關的程式碼會比較集中</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">&quot;ts&quot;</span> setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> GoogleLoginPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@lubn/shared/plugin&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useAccountStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/stores&#39;</span>

<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token generic-function"><span class="token function">defineEmits</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token punctuation">{</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> accountStore <span class="token operator">=</span> <span class="token function">useAccountStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// onMounted 雖然也可以包裝進去 plugin.ts 裏面，但他屬用 component life cycle hook，</span>
<span class="token comment">// 不像 watch，在上面的使用上只關注在資料狀態，所以在 component 內使用會比較恰當</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> googleBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;buttonDiv&#39;</span><span class="token punctuation">)</span>
  GoogleLoginPlugin<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>googleBtn <span class="token keyword">as</span> HTMLElement<span class="token punctuation">,</span> res <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// callback 的邏輯在這裡傳進去給 plugin</span>
    accountStore
      <span class="token punctuation">.</span><span class="token function">handleGoogleCredentialResponse</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;buttonDiv&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),e=[o];function c(i,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","20230225-customPlugin.html.vue"]]);export{r as default};
