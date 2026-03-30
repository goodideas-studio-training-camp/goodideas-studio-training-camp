import{_ as t,M as p,p as c,q as o,Q as s,t as n,N as i,a1 as a}from"./framework-2d24001b.js";const l="/assets/20230215-github_action-01-967b9f4d.png",u={},d=a(`<p>在 monorepo project 裡面遇到需要覆用在 github action 中下載安裝好的 dependencies 來部署不同 subproject，而且希望能依照改動的檔案做出對應的部署。 例如只改了第三個 subproject，就只部署第三個。</p><p>monorepo 結構</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>────────── root
  ├─ project
  |   ├─ main-app
  |   ├─ second-app
  |   ├─ third-app
  |   └─ shared
  |
  └─ node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這些子專案共用同一個 <code>node_modules</code></p><p>目前最簡單的標配 flow 通常會是：</p><ol><li><code>actions/checkout</code></li><li><code>actions/setup-node</code></li><li><code>actions/cache</code></li><li>Install dependencies &amp; config</li><li>Run build &amp; deploy</li><li>if <code>branch</code> === <code>production</code>，build &amp; deploy to <code>production</code>.</li><li>if <code>branch</code> === <code>staging</code>，build &amp; deploy to <code>staging</code>.</li></ol><p>而我的情境是： 三個 app project 各有 <code>production</code> 跟 <code>staging</code> 的部屬， shared 自己有 storybook 的部屬， 總計七個部署全都共用同一個 <code>node_modules</code>。</p><p>雖然單一個 <code>job</code> 就能解決</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build_and_deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npx lerna bootstrap

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying main<span class="token punctuation">-</span>app to production
        <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/main&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying main<span class="token punctuation">-</span>app to staging
        <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/staging&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying second<span class="token punctuation">-</span>app to production
        <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/main&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying second<span class="token punctuation">-</span>app to staging
        <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/staging&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying storybook
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>簡單暴力，但是因為唯一的判斷只有<em>判斷是 <code>main branch</code> 還是 <code>staging branch</code></em> 只是稍稍改動，幾乎全部都要執行一次，很浪費時間額度，而且每次部署 step 會排隊，時間也被拖得很長。</p><p>希望可以改成這樣：</p><ol><li>檢查 package-lock 有沒有變動 <ol><li>有，重新下載安裝 node_modules，並且 cache</li><li>沒有，直接拿出 cache</li></ol></li><li><strong>檢查檔案變動路徑</strong>是否包含以下。 有的話，檢查 branch 是 <code>main</code> or <code>staging</code>，再 build &amp; deploy 到相對應位置 <ol><li><code>apps/main-app</code></li><li><code>apps/second-app</code></li><li><code>apps/shared</code></li></ol></li></ol><p>其實邏輯只多了一個<strong>檢查檔案變動路徑</strong>， 但是</p><ol><li>似乎不能直接在 <code>step</code> 裡做到這樣的判斷，</li><li>檔案變動路徑似乎只能從整個 <code>workflow</code> 的 <code>on</code> 去做設定</li></ol><p>所以想要精緻的控制，可能要拆成多個 <code>job</code>，由一個 <code>workflow</code> 來統整。</p><p>先上做好的樣子 <img src="`+l+'"></p><p>main.yml 裡面包涵了 5 個 job，其中 3 個會是並行的，這樣如果各個專案都要重新 build，就不會排隊，減少整體的部屬速度。</p>',17),k=s("code",null,"job",-1),r={href:"https://github.com/dorny/paths-filter",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># main.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> CI/CD
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 設定要觸發這個 workflow 的 event</span>
  <span class="token comment"># https://docs.github.com/en/actions/using-workflows/triggering-a-workflow</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
      <span class="token punctuation">-</span> staging
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;apps/**&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;apps/shared/**&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;libs/api/**&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;**/package.json&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;**/package-lock.json&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;.env*&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;!**/README.md&#39;</span>
  <span class="token comment"># 可以手動觸發 workflow 的設定</span>
  <span class="token comment"># https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 第一個 job</span>
<span class="token key atrule">base</span><span class="token punctuation">:</span>
  <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
  <span class="token key atrule">outputs</span><span class="token punctuation">:</span>
    <span class="token comment"># 找 steps 底下 id 為 path-condition 的 outputs</span>
    <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.path<span class="token punctuation">-</span>condition.outputs.dashboard <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">homes</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.path<span class="token punctuation">-</span>condition.outputs.homes <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">storybook</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.path<span class="token punctuation">-</span>condition.outputs.storybook <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">RESTORE_KEYS</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.create_key.outputs.key <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3

    <span class="token comment"># 不是必要，但我想要把重複使用的值抽出來</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create RESTORE_KEYS
      <span class="token key atrule">id</span><span class="token punctuation">:</span> create_key
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token comment"># hashFiles 是 github action 提供的 build-in function，可以拿到這個版本的檔案獨一無二的 hash</span>
        <span class="token key atrule">RESTORE_KEYS</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/package-lock.json&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token comment"># define output 給 job 的方法</span>
      <span class="token comment"># https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> echo &quot;key=$RESTORE_KEYS&quot; <span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span> &quot;$GITHUB_OUTPUT&quot;

    <span class="token comment"># cache node_modules</span>
    <span class="token comment"># https://github.com/actions/cache</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
      <span class="token key atrule">id</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>dependencies
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&#39;**/node_modules&#39;</span>
        <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.create_key.outputs.key <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.create_key.outputs.key <span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># install dependencies if the cache did not hit</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
      <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.cache<span class="token punctuation">-</span>dependencies.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> npx lerna bootstrap

    <span class="token comment"># https://github.com/dorny/paths-filter</span>
    <span class="token comment"># 設定 filter，output 會回傳 boolean</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Path condition
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> dorny/paths<span class="token punctuation">-</span>filter@v2.11.1
      <span class="token key atrule">id</span><span class="token punctuation">:</span> path<span class="token punctuation">-</span>condition
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">filters</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          dashboard:
            - apps/main-app/**
            - &#39;apps/shared/{asset,composable,config,plugin,util}/**&#39;
            - &#39;.env.*&#39;
          homes:
            - &#39;apps/homes/**&#39;
            - &#39;apps/shared/{asset,composable,config,plugin,util}/**&#39;
            - &#39;.env.*&#39;
          storybook:
            - &#39;apps/shared/**&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 第二,三,四...個 job</span>
<span class="token key atrule">homes</span><span class="token punctuation">:</span>
  <span class="token comment"># 設定 needs，接受 string | string[]</span>
  <span class="token comment"># 這代表需要等待 id 為 base 的 job 執行完畢後再執行</span>
  <span class="token comment"># 多個 job 同時存在一個 workflow 預設會是並行的</span>
  <span class="token key atrule">needs</span><span class="token punctuation">:</span> base
  <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
  <span class="token comment"># 用剛剛 base 的 output 來判斷要不要執行 homes job</span>
  <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> needs.base.outputs.homes == &#39;true&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
    <span class="token comment"># 和一般使用 acion/cache 不太一樣，這裡指定使用 actions/cache/restore</span>
    <span class="token comment"># 差異在於 不會執行 post 階段的事情，單純取出 cache</span>
    <span class="token comment"># 在 base job 已經確定 node_modules 的 cache 一定會存在</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache/restore@v3
      <span class="token key atrule">id</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>dependencies
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&#39;**/node_modules&#39;</span>
        <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> needs.base.outputs.RESTORE_KEYS <span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># deploy to where 步驟其實重複，可以再包裝一層，但考量可能會有修許變動就沒有做這件事情了。</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying to production
      <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/main&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploying to staging
      <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == &#39;refs/heads/staging&#39; <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">slack_notification</span><span class="token punctuation">:</span>
  <span class="token comment"># 必須等待 base, dashboard, homes, storybook 都執行完了再執行</span>
  <span class="token key atrule">needs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>base<span class="token punctuation">,</span> dashboard<span class="token punctuation">,</span> homes<span class="token punctuation">,</span> storybook<span class="token punctuation">]</span>
  <span class="token comment"># 但是 dashboard, homes, storybook 可能會有被 skip 的情況</span>
  <span class="token comment"># 設定 always() 可以保證一定會執行</span>
  <span class="token comment"># 在 if 裡面可以不必再用 \${{ }} 來呈現表達式</span>
  <span class="token key atrule">if</span><span class="token punctuation">:</span> always()
  <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
  <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token comment"># 發通知，可以去看更更更之前的文章</span>
    <span class="token comment"># Github Action 加入 Slack 通知 - Lo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 整個組裝起來大概會是這樣</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> CI/CD
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">base</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">homes</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">something</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">slack_notification</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function m(b,y){const e=p("ExternalLinkIcon");return c(),o("div",null,[d,s("p",null,[n("Github action 原本的設定環境是沒有辦法做到在 "),k,n(" level 檢查變動的檔案路徑，必須依靠 "),s("a",r,[n("dorny/paths-filter"),i(e)]),n("，可以在 github action - market place 找到它。")]),v])}const g=t(u,[["render",m],["__file","20230215-github_action.html.vue"]]);export{g as default};
