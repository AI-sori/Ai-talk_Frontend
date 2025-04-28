import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/members': {
        target: 'https://port-0-ai-talk-backend-m95cvwb00db2ddb5.sel4.cloudtype.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
