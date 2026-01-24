import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineWorkspace } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineWorkspace([
  'packages/cli',
  'packages/config',
  'packages/tokens',
  'packages/react',
  {
    extends: 'apps/docs/vitest.config.ts',
    test: {
      name: `storybook:${path.join(dirname, 'apps/docs', '.storybook')}`,
      // Define workspace name explicitly so Storybook UI addon finds it
    },
  },
])
