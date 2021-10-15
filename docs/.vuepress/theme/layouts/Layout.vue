<template>
  <Layout>
    <template #page-bottom>
      <component v-for="contributor in contributors" :key="contributor.name" :is="authers[contributor.name]" />
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
    console.log('frontmatter.value: ', frontmatter.value)
    const pageData = usePageData()
    console.log('pageData.value: ', pageData.value)
    console.log('pageData.value.git: ', pageData.value.git)

    const contributors = pageData.value.git.contributors

    return {
      contributors,
      authers,
    }
  },
}
</script>
