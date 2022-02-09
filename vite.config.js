import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    open: '/public/index.html'
  },
  build: {
    sourcemap: true,
    lib: {
      entry: './src/main.js',
      name: 'Annotorious',
      formats: [ 'umd' ]
    }
  }
})
