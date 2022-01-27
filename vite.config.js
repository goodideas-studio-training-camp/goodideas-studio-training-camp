import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  // https://github.com/antfu/unplugin-vue-components
  plugins: [Components(), Pages({ dirs: 'src/views' })],
})
