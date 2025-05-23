import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['swiper-container', 'swiper-slide'].includes(tag)
        }
      }
    })),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.m4v'],
  server: {
    allowedHosts: true, // <-- allow all hosts (use with caution in production)
    host: true,          // <-- important to allow external IPs like ngrok
    port: 5173           // or whatever port your frontend is on
  }
})
