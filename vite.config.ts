import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/admin': {
        target: 'https://civchange-be-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://civchange-be-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://civchange-be-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    }
  },
});
