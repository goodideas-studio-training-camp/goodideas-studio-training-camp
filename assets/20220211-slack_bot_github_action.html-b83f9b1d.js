import{_ as i,M as l,p as o,q as c,Q as n,t as e,N as t,a1 as a}from"./framework-2d24001b.js";const u="/assets/2022-02-11-01-06-23-0d19b8f6.png",r="/assets/2022-02-11-01-07-37-d1b4797b.png",d="/assets/2022-02-11-01-09-00-44c2c0b4.png",p="/assets/2022-02-11-00-42-33-ca87211e.png",m={},v=n("h1",{id:"怎麼在-github-action-flow-運作時-發送訊息到-slack-channel",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#怎麼在-github-action-flow-運作時-發送訊息到-slack-channel","aria-hidden":"true"},"#"),e(" 怎麼在 Github action flow 運作時，發送訊息到 Slack Channel?")],-1),h=n("p",null,"工作中接到的任務：要在每次 push、deploy 的 github action 裡面加入 Slack bot 在指定 Slack Channel 出現通知。",-1),b={href:"https://github.com/rtCamp/action-slack-notify",target:"_blank",rel:"noopener noreferrer"},k={href:"https://lubn.slack.com/apps/A0F7XDUAZ-incoming-webhooks?tab=more_info",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,"而換我要來建置新專案的時候看到這段",-1),g=n("blockquote",null,[n("p",null,"Please note, this is a legacy custom integration - an outdated way for teams to integrate with Slack. These integrations lack newer features and they will be deprecated and possibly removed in the future. We do not recommend their use. Instead, we suggest that you check out their replacement: Slack apps.")],-1),q=n("p",null,"雖然沒有說什麼時候會真的被廢棄掉，但想到以後可能又要在設定一次就覺得麻煩， 乾脆一次就先弄好， 所以開始海量搜尋，這種小東西的資源真的都比較少。",-1),f={href:"https://github.com/slackapi/slack-github-action",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,"採用第二種方式 - Technique 2: Slack App",-1),S=n("p",null,"照著做一次就搞定， 整個設定大概 5 分鐘結束。",-1),x=n("p",null,"以下單純把文件超級簡單翻譯一下",-1),A=n("h2",{id:"technique-2-slack-app",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#technique-2-slack-app","aria-hidden":"true"},"#"),e(" Technique 2: Slack App")],-1),w={href:"https://api.slack.com/methods/chat.postMessage",target:"_blank",rel:"noopener noreferrer"},N=n("h3",{id:"setup",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#setup","aria-hidden":"true"},"#"),e(" Setup")],-1),T={href:"https://api.slack.com/apps",target:"_blank",rel:"noopener noreferrer"},C=n("img",{src:u,alt:""},null,-1),K=n("img",{src:r,alt:""},null,-1),B=n("code",null,"From scratch",-1),O={href:"https://api.slack.com/scopes/chat:write",target:"_blank",rel:"noopener noreferrer"},$=n("code",null,"chat.write",-1),L=n("strong",null,"OAuth & Permissions",-1),E=n("img",{src:d,alt:""},null,-1),G=n("li",null,"安裝到目標 Slack workspace（Install the app to your workspace.）",-1),I=n("strong",null,"OAuth & Permissions",-1),H=n("code",null,"Bot Token",-1),P={href:"https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository",target:"_blank",rel:"noopener noreferrer"},F=n("code",null,"SLACK_BOT_TOKEN",-1),j=n("s",null,[e("當然如果你的 repo 是 "),n("code",null,"private"),e(" 且保證不會有其他人看到，你也可以直接把 token 貼到 github action flow 的 "),n("code",null,".yaml"),e(" 裡面(?)")],-1),M=n("li",null,[e("把機器人加到你要發送訊息的 Channel 裡面 ("),n("code",null,"/invite @bot_user_name"),e(").")],-1),D=a(`<h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3><p>把這段 Action <a href="job-step">step</a> 加到你的 GitHub Action Workflow file</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Post to a Slack channel
  <span class="token key atrule">id</span><span class="token punctuation">:</span> slack
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> slackapi/slack<span class="token punctuation">-</span>github<span class="token punctuation">-</span>action@v1.18.0
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token comment"># Slack channel id, channel name, or user id to post message.</span>
    <span class="token comment"># See also: https://api.slack.com/methods/chat.postMessage#channels</span>
    <span class="token key atrule">channel-id</span><span class="token punctuation">:</span> <span class="token string">&#39;CHANNEL_ID&#39;</span>
    <span class="token comment"># For posting a simple plain text message</span>
    <span class="token key atrule">slack-message</span><span class="token punctuation">:</span> <span class="token string">&quot;GitHub build result: \${{ job.status }}\\n\${{ github.event.pull_request.html_url || github.event.head_commit.url }}&quot;</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token key atrule">SLACK_BOT_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SLACK_BOT_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以用 JSON 的格式可以去自訂訊息內容。 在 Slack 的世界裡面這個東西叫 <code>Block Kit</code>， 感覺可以做出很多元的東西！！但...如果要快捷一點可以用下面這個 Builder 迅速匯入模板來修改比較不會浪費生命</p>`,4),U={href:"https://app.slack.com/block-kit-builder/T92N97FNG",target:"_blank",rel:"noopener noreferrer"},R=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Post to a Slack channel
  <span class="token key atrule">id</span><span class="token punctuation">:</span> slack
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> slackapi/slack<span class="token punctuation">-</span>github<span class="token punctuation">-</span>action@v1.16.0
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token comment"># Slack channel id, channel name, or user id to post message.</span>
    <span class="token comment"># See also: https://api.slack.com/methods/chat.postMessage#channels</span>
    <span class="token key atrule">channel-id</span><span class="token punctuation">:</span> <span class="token string">&#39;CHANNEL_ID&#39;</span>
    <span class="token comment"># For posting a rich message using Block Kit</span>
    <span class="token key atrule">payload</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
      {
        &quot;text&quot;: &quot;GitHub Action build result: \${{ job.status }}\\n\${{ github.event.pull_request.html_url || github.event.head_commit.url }}&quot;,
        &quot;blocks&quot;: [
          {
            &quot;type&quot;: &quot;section&quot;,
            &quot;text&quot;: {
              &quot;type&quot;: &quot;mrkdwn&quot;,
              &quot;text&quot;: &quot;GitHub Action build result: \${{ job.status }}\\n\${{ github.event.pull_request.html_url || github.event.head_commit.url }}&quot;
            }
          }
        ]
      }</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token key atrule">SLACK_BOT_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SLACK_BOT_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+`" alt=""></p><h3 id="範例" tabindex="-1"><a class="header-anchor" href="#範例" aria-hidden="true">#</a> 範例</h3><div class="language-yaml= line-numbers-mode" data-ext="yaml="><pre class="language-yaml="><code>      - name: Post to a Slack channel
        id: slack
        uses: slackapi/slack-github-action@v1.18.0
        with:
          # Slack channel id, channel name, or user id to post message.
          # See also: https://api.slack.com/methods/chat.postMessage#channels
          channel-id: \${{secrets.SLACK_CHANNEL_ID}}

          # For posting a simple plain text message
          # slack-message: &#39;GitHub build result: \${{ job.status }}\\n\${{ github.event.pull_request.html_url || github.event.head_commit.url }}&#39;

          # For posting a rich message using Block Kit
          payload: |
            {
              &quot;blocks&quot;: [
                {
                  &quot;type&quot;: &quot;section&quot;,
                  &quot;text&quot;: {
                    &quot;type&quot;: &quot;mrkdwn&quot;,
                    &quot;text&quot;: &quot;＿＿＿＿＿ has a new update:\\n*&lt;\${{secrets.SLACK_URL_PRODUCTION}}|Production&gt;*\\t*&lt;\${{secrets.SLACK_URL_STAGING}}|Staging&gt;*&quot;
                  }
                },
                {
                  &quot;type&quot;: &quot;section&quot;,
                  &quot;fields&quot;: [
                    {
                      &quot;type&quot;: &quot;mrkdwn&quot;,
                      &quot;text&quot;: &quot;*Branch:* \${{github.ref_name}}&quot;
                    },
                    {
                      &quot;type&quot;: &quot;mrkdwn&quot;,
                      &quot;text&quot;: &quot;*Build result:* \${{ job.status }}&quot;
                    },
                    {
                      &quot;type&quot;: &quot;mrkdwn&quot;,
                      &quot;text&quot;: &quot;*Repo:* \${{github.repository}}&quot;
                    },
                    {
                      &quot;type&quot;: &quot;mrkdwn&quot;,
                      &quot;text&quot;: &quot;*Actor:* \${{github.actor}}&quot;
                    },
                    {
                      &quot;type&quot;: &quot;mrkdwn&quot;,
                      &quot;text&quot;: &quot;*Compare:* \${{github.event.compare}}&quot;
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_BOT_TOKEN: \${{ secrets.SLACK_BOT_TOKEN }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),V=n("code",null,"github action",-1),W=n("code",null,"context",-1),J={href:"https://docs.github.com/en/actions/learn-github-actions/contexts",target:"_blank",rel:"noopener noreferrer"};function Q(X,Z){const s=l("ExternalLinkIcon");return o(),c("div",null,[v,h,n("p",null,[e("Slack 官方其實已經做出很多 integration/api 可以使用， 之前公司的前輩是使用，"),n("a",b,[e("rtCamp 做的 Github action"),t(s)]),e(" 用的是 "),n("a",k,[e("Incoming WebHooks"),t(s)]),e(" 這個 Slack app。")]),_,g,q,n("p",null,[e("找到這個 "),n("a",f,[e("Slack api official repo"),t(s)])]),y,S,x,A,n("p",null,[e("首先要先建立或者使用既有的 Slack app， 用這個 app 來調用 "),n("a",w,[e("chat.postMessage"),t(s)]),e(" API method，")]),N,n("ul",null,[n("li",null,[n("a",T,[e("建立 Slack App"),t(s)]),C,K,e(" 先選擇 "),B,e(" 就可以了")]),n("li",null,[e("把 "),n("a",O,[$,t(s)]),e(" 這項 機器人權限範圍（bot scope）加到 "),L,e(" 底下 "),E]),G,n("li",null,[e("從 "),I,e(" 複製 "),H,e(" 然後 "),n("a",P,[e("加到 Github repo - secret"),t(s)]),e(" 命名為 "),F,e("。"),j]),M]),D,n("p",null,[n("a",U,[e("Slack Block Kit Builder"),t(s)])]),R,n("p",null,[e("裡面有附上一些 "),V,e(" 特有的 "),W,e(" 可以到 "),n("a",J,[e("github 官網看文件"),t(s)])])])}const Y=i(m,[["render",Q],["__file","20220211-slack_bot_github_action.html.vue"]]);export{Y as default};
