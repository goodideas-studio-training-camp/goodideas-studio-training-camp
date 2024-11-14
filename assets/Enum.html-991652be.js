import{_ as s,M as a,p as d,q as r,Q as e,t as i,N as l,a1 as t}from"./framework-2d24001b.js";const c={},o=t(`<h1 id="enum" tabindex="-1"><a class="header-anchor" href="#enum" aria-hidden="true">#</a> Enum</h1><p>enum 在 Kotlin 裡面經常被用來封裝有限狀態，官網給的範例是</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>enum class Direction {
    NORTH, SOUTH, WEST, EAST
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在程式中我們會更常這樣使用</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>fun main() {
    val ii = CoffeeType.fromInt(0)
    when(ii){
        CoffeeType.ESPRESSO -&gt; {
            print(&quot;espresso&quot;)
        }
        CoffeeType.LATTE -&gt; {
            print(&quot;latte&quot;)
        }
        else -&gt; {
            print(&quot;else&quot;)
        }
    }
}
enum class CoffeeType(val value: Int) {
    ESPRESSO(0), LATTE(1) , CAPPUCCINO(2),AMERICANO(4),COLD_DRIP(5);
    companion object {
        fun fromInt(value: Int) = CoffeeType.values().firstOrNull  { it.value == value }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="延伸閱讀" tabindex="-1"><a class="header-anchor" href="#延伸閱讀" aria-hidden="true">#</a> 延伸閱讀</h2>`,6),u={href:"https://kt.academy/article/ek-enum",target:"_blank",rel:"noopener noreferrer"},v={href:"https://kotlinlang.org/docs/enum-classes.html",target:"_blank",rel:"noopener noreferrer"};function m(b,f){const n=a("ExternalLinkIcon");return d(),r("div",null,[o,e("ul",null,[e("li",null,[e("a",u,[i("effective kotlin"),l(n)])]),e("li",null,[e("a",v,[i("docs"),l(n)])])])])}const h=s(c,[["render",m],["__file","Enum.html.vue"]]);export{h as default};
