import postcss from 'postcss'
import type { Config } from 'tailwindcss'
import tailwindcss from 'tailwindcss'
import { describe, expect, it } from 'vitest'
import dsfrPreset, { colors, spacing, typography } from './index'

describe('DSFR Tailwind Preset', () => {
  it('should export preset configuration object', () => {
    expect(dsfrPreset).toBeDefined()
    expect(dsfrPreset.theme).toBeDefined()
    expect(dsfrPreset.plugins).toBeDefined()
  })

  it('should map core DSFR colors to the Tailwind extend theme', () => {
    const extendColors = dsfrPreset.theme?.extend?.colors as any
    expect(extendColors).toBeDefined()

    // Check direct static assignments
    expect(extendColors['blue-france']).toEqual(colors['blue-france'])
    expect(extendColors['red-marianne']).toEqual(colors['red-marianne'])

    // Check semantic variables assignments
    expect(extendColors.primary).toBeDefined()
    expect(extendColors.background).toBeDefined()
    expect(extendColors.foreground).toBeDefined()
    expect(extendColors.foreground.mention).toBeDefined()
    expect(extendColors.destructive.foreground).toBeDefined()
    expect(extendColors.destructive.hover).toBeDefined()
    expect(extendColors.destructive.active).toBeDefined()
    expect(extendColors.destructive['background-hover']).toBeDefined()
  })

  it('should support Tailwind alpha modifiers on semantic colors', async () => {
    const config: Config = {
      presets: [dsfrPreset as Config],
      content: [
        {
          raw: [
            'focus:bg-destructive/12',
            'focus:bg-destructive/[12%]',
            'hover:bg-destructive/[12%]',
            'shadow-[inset_0_-2px_0_0_theme(colors.destructive.DEFAULT)]',
            'fr-link',
            'focus-dsfr',
          ].join(' '),
        },
      ],
      corePlugins: {
        preflight: false,
      },
    }

    const result = await postcss([tailwindcss(config)]).process(
      '@tailwind base; @tailwind components; @tailwind utilities;',
      { from: undefined }
    )

    expect(result.css).toContain('rgb(from var(--error-425-625) r g b / 0.12)')
    expect(result.css).toContain('rgb(from var(--error-425-625) r g b / 12%)')
    expect(result.css).toContain('rgb(from var(--error-425-625) r g b / 1)')
    expect(result.css).not.toContain('<alpha-value>')
  })

  it('should map typography and spacing', () => {
    const extendTheme = dsfrPreset.theme?.extend as any
    expect(extendTheme.fontFamily.marianne).toBeDefined()
    expect(extendTheme.spacing).toEqual(spacing)
    expect(extendTheme.fontWeight).toEqual(typography.fontWeight)
  })

  it('should contain the DSFR container configuration', () => {
    const container = dsfrPreset.theme?.extend?.container as any
    expect(container).toBeDefined()
    expect(container.center).toBe(true)
    expect(container.padding).toBeDefined()
  })

  it('should inject plugins', () => {
    expect(Array.isArray(dsfrPreset.plugins)).toBe(true)
    expect(dsfrPreset.plugins?.length).toBeGreaterThan(0)
  })
})
