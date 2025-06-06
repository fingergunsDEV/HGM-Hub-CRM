// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/', // Default for root deployment
  }

  // For GitHub Pages, set the base to your repository name
  // Change '/holistic-content-hub-crm/' to your actual repository name
  if (command === 'build' && process.env.GITHUB_PAGES) {
    config.base = '/HGM-Hub-CRM/'
  }

  return config
})
