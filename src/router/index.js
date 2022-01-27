import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

// vite-plugin-pages: https://github.com/hannoeru/vite-plugin-pages
const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
