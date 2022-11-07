<template>
  <address class="chang">
    <section class="chang_avatar">
      <img src="./chang.jpg" alt="chang avatar">
    </section>
    <section class="chang_info">
      <h2 class="chang_name">Kenny</h2>
      <section class="chang_description">
        <p>Android/ Backend developer</p>
      </section>
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

.chang {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(233, 245, 255, 0.822);
  border-radius: $radius;
  padding: 12px;
  color: #3aa675;
  font-style: normal;
  text-transform: capitalize;
  @include media_query() {
      flex-direction: row;
    }

  &_avatar {
    img {
      width: 100%;
      border-radius: $radius;
      box-shadow: 2px 2px 6px 2px gray;
    }
    @include media_query() {
      img {
        max-width: 160px;
      }
    }
  }

  &_info {
    width: 100%;
  }

  &_name {
    margin: 0;
    align-self: flex-end;
    border-color: #3aa675;

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
