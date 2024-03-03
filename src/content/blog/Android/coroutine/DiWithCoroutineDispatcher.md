---
title: Di with Coroutine Dispatcher
---
# Di with Coroutine Dispatcher

## 前言
建議先了解 Coroutine, dependency inject, annotation 再看這篇

## 正文

### 外部提供 Dispatcher

首先定義幾個annotation
```kotlin=
@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class IoDispatcher

@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class MainDispatcher


@Retention(AnnotationRetention.RUNTIME)
@Qualifier
annotation class ApplicationScope
```

之後提供 Dispatcher
```kotlin=
@InstallIn(SingletonComponent::class)
@Module
object CoroutinesDispatchersModule {

    @IoDispatcher
    @Provides
    fun providesIoDispatcher(): CoroutineDispatcher = Dispatchers.IO
}
```

開箱即用
```kotlin=
class Test @Inject constructor(
    @IoDispatcher defaultDispatcher: CoroutineDispatcher
) {

}
```

### 簡化程式碼
但每個 Dispatcher 都做 annotation 有點多餘對吧，只要在了解深一點，就可以簡化一些
```kotlin=
@Qualifier
@Retention(RUNTIME)
annotation class Dispatcher(val dispatcher: AppDispatchers)

enum class AppDispatchers {
    IO
}
```

之後再需要的模組提供
```kotlin=
@Module
@InstallIn(SingletonComponent::class)
object DispatchersModule {
    @Provides
    @Dispatcher(IO)
    fun providesIODispatcher(): CoroutineDispatcher = Dispatchers.IO
}
```

或是用在其他要注入的地方
```kotlin=
@Module
@InstallIn(SingletonComponent::class)
object DataStoreModule {

    @Provides
    @Singleton
    fun providesUserPreferencesDataStore(
        @ApplicationContext context: Context,
        @Dispatcher(IO) ioDispatcher: CoroutineDispatcher,
        userPreferencesSerializer: UserPreferencesSerializer
    ): DataStore<UserPreferences> =
        DataStoreFactory.create(
            serializer = userPreferencesSerializer,
            scope = CoroutineScope(ioDispatcher + SupervisorJob()),
            migrations = listOf(
                IntToStringIdsMigration,
            )
        ) {
            context.dataStoreFile("user_preferences.pb")
        }
}
```
