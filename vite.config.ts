import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/members': {
        target: 'https://port-0-ai-talk-backend-m95cwvb00db2ddb5.sel4.cloudtype.app/',
        changeOrigin: true,
        secure: false,
      },
      '/community': {
        target: 'https://port-0-ai-talk-backend-m95cwvb00db2ddb5.sel4.cloudtype.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
