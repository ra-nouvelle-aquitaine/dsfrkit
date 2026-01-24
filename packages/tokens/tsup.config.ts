import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/colors.ts', 'src/typography.ts', 'src/spacing.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
  treeshake: true,
})
