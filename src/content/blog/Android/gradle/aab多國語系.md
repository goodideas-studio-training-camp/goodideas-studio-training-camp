# 打包成aab時若有app內切換語系功能


### 參考資料
[aab格式](https://technews.tw/2021/07/12/android-apk-aab/)


- Android App Bundle (aab) 是2018年Google 開發者大會公布的
- aab有以下優勢: 
1. *體積輕盈* ->  `就以多國語系來說`，假設我的app支援十種語系，在過往會把這十種語系都下載到使用者手機；而aab則是在使用者下載apk時，根據使用者的系統語系下載對應的語系，進而達到減少apk安裝在使用者手機的容量
2. *應用模組化* ->  這邊我目前還沒有實際應用場景，根據網路上的例子是相機，可以參考上述連結
3. *免下載體驗* 

### 問題點
- *app內切換語系* ：當你使用aab打包到商店之後，「只下載user系統語系的檔案」，所以切換語系，實際上會找不到其他語系，導致功能失效

### 解法
- *修改gradle* 
- 在`build.gradle(Module)`新增下列程式碼，這樣上傳的aab語系就不會被拆開，使用者下載到的就是app內包含的所有語系
```kotlin
Android{
..
..
    bundle{
    //這邊是取消將語系分開打包
        language { enableSplit = false }
    }
}
```

#bundle #multiLanguage 
