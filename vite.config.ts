import { defineConfig } from 'vite';

/** {@link https://vitejs.dev/config/} */
export default defineConfig({
  base: './',
  envDir: './env',
  plugins: [],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  server: {
    port: 8080,
    watch: {
      usePolling: true
    }
  },
  publicDir: 'static',
  build: {}
});
