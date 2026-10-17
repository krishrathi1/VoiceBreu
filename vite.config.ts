import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { databasePlugin } from './src/server/dbPlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/data/**', '**/data/db.json', '**/.git/**'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    databasePlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
