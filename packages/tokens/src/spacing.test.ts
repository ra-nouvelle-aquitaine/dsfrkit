import { describe, expect, it } from 'vitest'
import { borderRadius, boxShadow, screens, spacing } from './spacing'

describe('DSFR Dimension & Layout Tokens', () => {
  it('should strictly map DSFR base layout units ("v" and "w")', () => {
    expect(spacing['1v']).toBe('0.25rem') // 4px
    expect(spacing['1w']).toBe('0.5rem') // 8px (alias)
    expect(spacing['3v']).toBe('0.75rem') // 12px
    expect(spacing['3w']).toBe('1rem') // 16px (alias)
    expect(spacing['5w']).toBe('1.5rem') // 24px (alias)
    expect(spacing['8v']).toBe('2rem') // 32px
  })

  it('should validate official DSFR corner radius values', () => {
    expect(borderRadius.DEFAULT).toBe('0.25rem')
    expect(borderRadius.full).toBe('9999px')
  })

  it('should map semantic DSFR elevation shadow layers', () => {
    // Must respect exact overlap specifications
    expect(boxShadow.raised).toBeDefined()
    expect(boxShadow.overlap).toBe('0 6px 18px 0 rgba(0, 0, 18, 0.16)')
    expect(boxShadow.sticky).toBeDefined()
    expect(boxShadow.lifted).toContain('rgba(0, 0, 18, 0.16)')
    // Outline focus dsfr
    expect(boxShadow.focus).toContain('var(--dsfr-focus')
  })

  it('should export standard DSFR responsive breakpoints explicitly in EM', () => {
    expect(screens.sm).toBe('36em') // 576px
    expect(screens.md).toBe('48em') // 768px
    expect(screens.lg).toBe('62em') // 992px
    expect(screens.xl).toBe('78em') // 1248px
  })
})
