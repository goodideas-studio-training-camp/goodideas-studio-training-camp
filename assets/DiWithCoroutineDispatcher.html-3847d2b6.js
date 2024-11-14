import{_ as e,p as i,q as n,a1 as s}from"./framework-2d24001b.js";const a={},d=s(`<h1 id="di-with-coroutine-dispatcher" tabindex="-1"><a class="header-anchor" href="#di-with-coroutine-dispatcher" aria-hidden="true">#</a> Di with Coroutine Dispatcher</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>建議先了解 Coroutine, dependency inject, annotation 再看這篇</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="外部提供-dispatcher" tabindex="-1"><a class="header-anchor" href="#外部提供-dispatcher" aria-hidden="true">#</a> 外部提供 Dispatcher</h3><p>首先定義幾個annotation</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class IoDispatcher

@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class MainDispatcher


@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class ApplicationScope
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之後提供 Dispatcher</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>@InstallIn(SingletonComponent::class)
@Module
object CoroutinesDispatchersModule {

    @IoDispatcher
    @Provides
    fun providesIoDispatcher(): CoroutineDispatcher = Dispatchers.IO
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>開箱即用</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>class Test @Inject constructor(
    @IoDispatcher defaultDispatcher: CoroutineDispatcher
) {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="簡化程式碼" tabindex="-1"><a class="header-anchor" href="#簡化程式碼" aria-hidden="true">#</a> 簡化程式碼</h3><p>但每個 Dispatcher 都做 annotation 有點多餘對吧，只要在了解深一點，就可以簡化一些</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>@Qualifier
@Retention(RUNTIME)
annotation class Dispatcher(val dispatcher: AppDispatchers)

enum class AppDispatchers {
    IO
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之後再需要的模組提供</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>@Module
@InstallIn(SingletonComponent::class)
object DispatchersModule {
    @Provides
    @Dispatcher(IO)
    fun providesIODispatcher(): CoroutineDispatcher = Dispatchers.IO
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或是用在其他要注入的地方</p><div class="language-kotlin= line-numbers-mode" data-ext="kotlin="><pre class="language-kotlin="><code>@Module
@InstallIn(SingletonComponent::class)
object DataStoreModule {

    @Provides
    @Singleton
    fun providesUserPreferencesDataStore(
        @ApplicationContext context: Context,
        @Dispatcher(IO) ioDispatcher: CoroutineDispatcher,
        userPreferencesSerializer: UserPreferencesSerializer
    ): DataStore&lt;UserPreferences&gt; =
        DataStoreFactory.create(
            serializer = userPreferencesSerializer,
            scope = CoroutineScope(ioDispatcher + SupervisorJob()),
            migrations = listOf(
                IntToStringIdsMigration,
            )
        ) {
            context.dataStoreFile(&quot;user_preferences.pb&quot;)
        }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),l=[d];function r(t,c){return i(),n("div",null,l)}const v=e(a,[["render",r],["__file","DiWithCoroutineDispatcher.html.vue"]]);export{v as default};
