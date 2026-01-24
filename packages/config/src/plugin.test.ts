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
