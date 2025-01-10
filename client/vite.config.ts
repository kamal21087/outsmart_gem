import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Client-side development server port
    open: true, // Automatically open the browser on server start
    proxy: {
      // Proxy API requests to the server-side Node server at port 4000
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
