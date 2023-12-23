<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="authors-container">
        <!-- 讓每一頁 hackmd 檔頭標記 contributors 出現
        也讓 git 的 commitor 也出現
        但如果重複就要則一出現 -->
        <component
          v-for="author_name in [...new Set([...pageData.frontmatter?.contributors || [], ...pageData.git.contributors.map(authors => authors.name)])]"
          :key="author_name"
          :is="authors[author_name]"
        />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import { usePageFrontmatter, usePageData } from '@vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import authors from '../authors'

export default {
  components: {
    ParentLayout,
  },
  setup() {
    const pageData = usePageData()

    return {
      authors,
      pageData,
    }
  },
}
</script>
<style lang="scss" scoped>
.authors-container {
  max-width: var(--content-width);
  padding: 0 2rem;
  margin: 0 auto;
}
</style>
