import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 3555,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api/v1/ws/*': {
        target: 'ws://localhost:8080',
        changeOrigin: true,
        ws: true,
      },
      '/api/v1/*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    cors: false,
  },
});
