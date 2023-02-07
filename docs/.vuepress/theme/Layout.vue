<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="authers-container">
        <component
          v-for="contributor in pageData.git.contributors"
          :key="contributor.name"
          :is="authers[contributor.name]"
        />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import { usePageFrontmatter, usePageData } from '@vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import authers from '../authers'

export default {
  components: {
    ParentLayout,
  },
  setup() {
    const pageData = usePageData()

    return {
      authers,
      pageData,
    }
  },
}
</script>
<style lang="scss" scoped>
.authers-container {
  max-width: var(--content-width);
  padding: 0 2rem;
  margin: 0 auto;
}
</style>
