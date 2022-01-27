<template>
  <div>
    <p>{{ counter }}</p>
    <button type="button" @click="counter += 1">click!</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const counter = ref(0)
</script>
