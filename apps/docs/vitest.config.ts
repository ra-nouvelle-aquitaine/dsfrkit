import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const __dirname__ = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [storybookTest({ configDir: join(__dirname__, '.storybook') })],
  test: {
    name: `storybook:${join(__dirname__, '.storybook')}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
