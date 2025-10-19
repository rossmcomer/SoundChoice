import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

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
    host: true,          
    port: 5173,           
    // https: 
    // {
    //   key: fs.readFileSync('./certs/localhost-key.pem'),
    //   cert: fs.readFileSync('./certs/localhost.pem'),
    // },
  }
})
