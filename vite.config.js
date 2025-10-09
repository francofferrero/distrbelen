import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '')
  const ENV = env.VITE_ENV
  const PORT = env.VITE_APP_PORT || 3000
  const API_URL = env.VITE_API_URL || 'https://api.tiendanube.com/v1/6727377'

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@shared': fileURLToPath(new URL('../../shared', import.meta.url)),
      },
    },
    server: {
      port: Number(PORT),
      proxy: ENV === 'development' ? 
          {
            '/api': {
              target: API_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : undefined
    },
    define: {
      __APP_ENV__: JSON.stringify(mode)
    }
  }
})
