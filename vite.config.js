import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Important: make assets relative so Electron can load them
  build: {
    outDir: 'dist',
  },
  server: {
    host: 'localhost', // Restricts access to your local machine
    port: 5000,
  }
})
