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
import { usePageData } from '@vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import authers from '../authers'

export default {
  components: {
    ParentLayout,
  },
  setup() {
    //     const pageData = usePageData()
    // const contributors = pageData.git.contributors.filter(contributor => authers.includes(contributor.name))
    // return {
    //   contributors,
    //   authers: JSON.parse(JSON.stringify(authers))
    // }

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
