<template>
  <Layout>
    <template #page-bottom>
      <div class="authers-container">
        <component
          v-for="contributor in pageData.git.contributors"
          :key="contributor.name"
          :is="authers[contributor.name]"
        />
      </div>
    </template>
  </Layout>
</template>

<script>
import { usePageFrontmatter } from '@vuepress/client'
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { usePageData } from '@vuepress/client'
import * as authers from '../../authers/index.js'

export default {
  components: {
    Layout,
  },
  setup() {
    const frontmatter = usePageFrontmatter()
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
