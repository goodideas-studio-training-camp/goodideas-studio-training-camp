<template>
  <nav>
    <div v-for="route in routes">
      <router-link :to="route">{{ route.name }}</router-link>
    </div>
  </nav>
  <router-view />
</template>
<script setup>
import routes from '~pages'
</script>
