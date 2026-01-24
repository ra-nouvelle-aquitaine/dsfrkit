import { describe, expect, it } from 'vitest'
import { colors } from './colors'

describe('DSFR Colors', () => {
  it('should export fundamental state colors (blue-france, red-marianne)', () => {
    expect(colors['blue-france']).toBeDefined()
    expect(colors['red-marianne']).toBeDefined()
    expect(colors['blue-france'].sun).toBe('#000091')
    expect(colors['red-marianne'].main).toBe('#e1000f')
  })

  it('should have semantic colors defined', () => {
    expect(colors.info).toBeDefined()
    expect(colors.success).toBeDefined()
    expect(colors.warning).toBeDefined()
    expect(colors.error).toBeDefined()
  })

  it('should expose the decision color tree', () => {
    expect(colors.decision).toBeDefined()
    expect(colors.decision.background.default.grey).toBe('#ffffff')
  })
})
