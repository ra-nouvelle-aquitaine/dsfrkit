import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  // If we're building for GitHub Pages, VITE_BASE_URL will be set
  const baseUrl = process.env.VITE_BASE_URL || '/'

  return {
    base: baseUrl,
    define: {
      __APP_BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
