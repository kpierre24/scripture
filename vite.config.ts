import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // Allow connections from all network interfaces
    proxy: {
      '/api': {
        target: 'https://api.scripture.api.bible',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
        headers: {
          'api-key': process.env.VITE_BIBLE_API_KEY || ''
        }
      }
    }
  }
})
