<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="authers-container">
        <component
          v-for="(contributor) in contributors"
          :key="contributor"
          :is="authers[contributor]"
        />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import { usePageData } from '@vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import authers from '../authers'

export default {
  components: {
    ParentLayout,
  },
  setup() {
    const pageData = usePageData();

    
    const matter_constributors = []
    if ('contributors' in pageData.value.frontmatter) {
      matter_constributors.concat(pageData.value.frontmatter.constributors)
    }

    
    return {
      authers,
      contributors: [...new Set([
      ...pageData.value.git.contributors.map(item => item.name),
      ...matter_constributors
    ])],
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
