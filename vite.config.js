import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // https://github.com/antfu/unplugin-vue-components
  plugins: [vue(), Components(), Pages({ dirs: 'src/components' })],
})
