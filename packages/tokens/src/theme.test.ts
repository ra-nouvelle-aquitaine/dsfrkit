import { describe, expect, it } from 'vitest'
import { cssVariables } from './theme'

describe('DSFR Theme Generator', () => {
  it('should expose cssVariables map strictly formatted for Tailwind config', () => {
    expect(cssVariables.background.DEFAULT).toContain('var(--background-default-grey')
    expect(cssVariables.primary.DEFAULT).toContain('var(--background-action-high-blue-france')
    expect(cssVariables.border.DEFAULT).toContain('var(--border-default-grey')
  })
})
