<template>
  <div class="w-96 h-40 border-2 text-sm">
    <div class="flex gap-2">
      <button
        v-for="tab in ['ComponentA', 'ComponentB', 'ComponentC']"
        :key="tab"
        class="border border-black bg-gray-200 p-2"
        @click="() => handleClick(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="current" class="m-2" />
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const current = ref(ComponentA)
const handleClick = tab => {
  console.log(tab)
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
              class: 'p-2',
              style: 'background-color: lightblue',
              onClick: () => alert('clicked!'),
            },
            {
              default: props =>
                h(
                  'p',
                  { class: 'text-sm' },
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
