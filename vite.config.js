import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { assetsInlineLimit: 200000 }, // embed the small profile photo so single-file builds include it
})
