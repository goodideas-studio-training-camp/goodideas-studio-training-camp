<template>
  <address class="g100">
    <section class="g100_avatar">
      <img src="./G100.jpg" alt="g100 自畫像" />
    </section>
    <h2 class="g100_name">G100 (Lo)</h2>
    <section class="g100_description">
      <p>
        <span>blog: </span>
        <a href="https://g100my.github.io/">https://g100my.github.io/</a>
      </p>
      <p>front-end developer</p>
    </section>
  </address>
</template>
<style lang="scss" scoped>
@use 'sass:math';
$radius: 8px;
$breakpoint: 520px;
@mixin media_query() {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.g100 {
  background-color: rgba(233, 245, 255, 0.822);
  border-radius: $radius;
  padding: 12px;
  color: darkblue;
  font-style: normal;
  text-transform: capitalize;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: 12px;

  &_avatar {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 80px;
      width: 100%;
      border-radius: $radius;
      box-shadow: 2px 2px 6px 2px gray;
    }
    @include media_query() {
      grid-area: avatar;
      img {
        max-width: 160px;
      }
    }
  }

  &_name {
    padding-left: (math.div(16, 320) * 100%);
    margin: 0;
    align-self: flex-end;

    @include media_query() {
      padding-left: 0;
      grid-area: name;
    }
  }

  &_description {
    grid-column: 1 / 3;
    a {
      text-transform: normal;
    }
    @include media_query() {
      grid-area: description;
    }
  }

  @include media_query() {
    grid-template:
      'avatar name'
      'avatar description';
  }
}
</style>
