import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import type { InlineConfig } from 'vitest'
import type { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom'
  }
} as UserConfig & {
  test: InlineConfig
})
