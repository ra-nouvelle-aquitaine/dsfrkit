import { describe, expect, it } from 'vitest'
import * as Tokens from './index'

describe('DSFR Tokens Architecture', () => {
  it('should proxy and export all fundamental design subsystems', () => {
    expect(Tokens.colors).toBeDefined()
    expect(Tokens.typography).toBeDefined()
    expect(Tokens.spacing).toBeDefined()
    expect(Tokens.borderRadius).toBeDefined()
    expect(Tokens.boxShadow).toBeDefined()
    expect(Tokens.screens).toBeDefined()
  })

  it('should proxy theme generator engines', () => {
    expect(Tokens.cssVariables).toBeDefined()
  })
})
