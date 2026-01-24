import { describe, expect, it } from 'vitest'
import { typography } from './typography'

describe('DSFR Typography Tokens', () => {
  it('should define official Marianne and Spectral font families', () => {
    expect(typography.fontFamily.marianne).toContain('Marianne')
    expect(typography.fontFamily.spectral).toContain('Spectral')
    expect(typography.fontFamily.marianne).toContain('sans-serif')
  })

  it('should strictly follow the DSFR responsive font-size scale', () => {
    // Base 16px is exact 1rem
    expect(typography.fontSize.base[0]).toBe('1rem')
    expect(typography.fontSize.base[1].lineHeight).toBe('1.5rem')
    // 20px is 1.25rem
    expect(typography.fontSize.xl[0]).toBe('1.25rem')
    expect(typography.fontSize.xl[1].lineHeight).toBe('1.75rem')
  })

  it('should define absolute DSFR font weights (400, 500, 700)', () => {
    expect(typography.fontWeight.regular).toBe('400')
    expect(typography.fontWeight.medium).toBe('500')
    expect(typography.fontWeight.bold).toBe('700')
  })
})
