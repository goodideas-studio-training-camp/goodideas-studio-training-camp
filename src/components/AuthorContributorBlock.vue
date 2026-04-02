<script setup lang="ts">
import authers from "./authers";
defineProps<{
  author_name: string;
  contributors?: string[];
}>();
</script>
<template>
  <div v-if="authers" class="authors-container">
    <component :is="authers[author_name as keyof typeof authers]" />
    <template v-if="contributors">
      <component
        v-for="contributor in contributors"
        :key="contributor"
        :is="authers[contributor as keyof typeof authers]"
      />
    </template>
  </div>
</template>
<style scoped>
.authors-container {
  max-width: var(--content-width);
  padding: 0 2rem;
  margin: 0 auto;
}
</style>
