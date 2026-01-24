import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  const baseUrl = process.env.VITE_BASE_URL || '/'

  return {
    base: baseUrl,
    plugins: [react()],
  }
})
