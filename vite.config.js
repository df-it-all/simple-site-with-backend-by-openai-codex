import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.CONTEXT_PATH || env.VITE_CONTEXT_PATH || '/';

  return {
    base,
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true
        }
      }
    }
  };
});
