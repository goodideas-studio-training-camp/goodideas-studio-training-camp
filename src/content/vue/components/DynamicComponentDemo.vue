<template>
  <div class="_container">
    <div class="_tab">
      <button
        v-for="tab in ['ComponentA', 'ComponentB', 'ComponentC']"
        :key="tab"
        class="_tab_button"
        @click="() => handleClick(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="current" class="_tab_panel" />
  </div>
</template>

<script setup>
import { shallowRef, h } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const current = shallowRef(ComponentA)
const handleClick = tab => {
  switch (tab) {
    case 'ComponentA':
      current.value = ComponentA
      break
    case 'ComponentB':
      current.value = ComponentB
      break
    case 'ComponentC':
      current.value = {
        render: () =>
          h(
            ComponentA,
            {
              id: 'ComponentC',
              onClick: () => alert('clicked!'),
            },
            {
              default: props =>
                h(
                  'p',
                  { style: { fontSize: 'small' } },
                  'This is p tag, placed at default slot'
                ),
            }
          ),
        props: {
          test: String,
        },
        created() {
          console.log('created')
        },
      }
      break
    default:
      return
  }
}
</script>
<style scoped>
._container {
  width: 350px;
  /* height: 320px; */
  border: 2px solid black;
  font-size: small;
}
._container :deep(h1) {
  font-size: small;
}
._tab {
  display: flex;
  gap: 8px;
}
._tab_button {
  /* border border-black bg-gray-200 p-2 */
  border: 2px border lightgray;
  padding: 8px;
}
._tab_panel {
  overflow: auto;
}
</style>
