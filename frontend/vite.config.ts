import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_err, _req, res) => {
            // Silently handle proxy error when local backend server is not running
            // This prevents ECONNREFUSED terminal errors while enabling frontend mock fallbacks
            try {
              if (res && 'writeHead' in res && !res.headersSent) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Backend unavailable, using frontend mock data' }));
              }
            } catch {
              // Ignore socket closed
            }
          });
        },
      },
    },
  },
});
