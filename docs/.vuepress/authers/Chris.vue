<template>
  <div class="container">
    <div class="avatar">
      <img src="./Chris.jpg" alt="" />
      <div><b>Chris</b></div>
      <div><a href="https://dwatow.github.io/" target="_blank">github Blog</a></div>
    </div>
    <ol>
      鐵人文章
      <li><a href="https://ithelp.ithome.com.tw/users/20107637/ironman/1457">前端新手村</a></li>
      <li><a href="https://ithelp.ithome.com.tw/users/20107637/ironman/1927">可不可以不要寫糙 code</a></li>
      <li><a href="https://ithelp.ithome.com.tw/users/20107637/ironman/3641">完美 Camp 進化論</a></li>
      <li><a href="https://ithelp.ithome.com.tw/users/20107637/ironman/4510">Vue.js 進階心法</a></li>
    </ol>
  </div>
</template>


<style lang="scss" scoped>
.container {
  .avatar {
    img {
      width: 120px;
      display: block;
    }
    float: left;
    margin-right: 20px;
  }
  // column-count: 2;
  ol {
    margin-left: 140px;
  }
}
</style>
