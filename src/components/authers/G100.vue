<script setup lang="ts">
import avatar from "./G100.jpg";
</script>
<template>
  <address class="g100">
    <section class="g100_avatar">
      <img :src="avatar.src" alt="g100 自畫像" />
    </section>
    <h2 class="g100_name">Lo <span class="g100_nickname">G100</span></h2>
    <section class="g100_description">
      <p>
        <span>blog: </span>
        <a href="https://g100my.github.io/">g100my.github.io</a>
      </p>
      <p>front-end developer</p>
    </section>
  </address>
</template>
<style lang="scss" scoped>
$radius: 6px;
$breakpoint: 425px;
@mixin media_query() {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.g100 {
  background-color: rgba(0, 10, 19, 0.5);
  border-radius: $radius;
  color: rgb(228, 248, 253);
  font-style: normal;
  text-transform: capitalize;
  display: grid;
  grid-column-gap: 12px;
  grid-template:
    "avatar name"
    "description description"
    / 120px 1fr;
  p {
    margin: 0;
  }
  @include media_query() {
    grid-template:
      "avatar name" 60px
      "avatar description" 1fr
      / 120px 1fr;
  }

  &_avatar {
    height: 100%;
    grid-area: avatar;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-top-left-radius: $radius;
      max-width: 160px;
      @include media_query() {
        border-bottom-left-radius: $radius;
      }
    }
  }

  &_name {
    margin: 0;
    align-self: flex-end;
    grid-area: name;
  }
  &_nickname {
    font-size: 12px;
  }

  &_description {
    grid-area: description;
    padding: 0 8px;
    a {
      text-transform: normal;
    }
  }
}
</style>
