<template>
  <div class="w-96 h-40 border-2 text-sm">
    <div class="flex gap-2">
      <button
        v-for="tab in ['componentA', 'componentB', 'componentC']"
        :key="tab"
        @click="() => handleClick(tab)"
        class="border border-black bg-gray-200 p-2"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="current" class="m-2" />
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import componentA from './A.vue'
import componentB from './B.vue'

const current = ref(componentA)
const handleClick = tab => {
  console.log(tab)
  switch (tab) {
    case 'componentA':
      current.value = componentA
      break
    case 'componentB':
      current.value = componentB
      break
    case 'componentC':
      current.value = {
        render: () =>
          h(
            componentA,
            {
              id: 'componentC',
              class: 'p-2',
              style: 'background-color: lightblue',
              onClick: () => alert('clicked!'),
            },
            {
              default: props => h('p', { class: 'text-sm' }, 'This is <p>, placed at default slot'),
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
