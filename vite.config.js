import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
// Ensure compliance with licenses for all dependencies used in this project.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      
      server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: true
      },

    },
  },
});
