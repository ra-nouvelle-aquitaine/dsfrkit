import { describe, expect, it } from 'vitest'
import { cssVariables } from './theme'

describe('DSFR Theme Generator', () => {
  it('should expose cssVariables map strictly formatted for Tailwind config', () => {
    expect(cssVariables.background.DEFAULT).toContain('var(--background-default-grey')
    expect(cssVariables.primary.DEFAULT).toContain('var(--background-action-high-blue-france')
    expect(cssVariables.border.DEFAULT).toContain('var(--border-default-grey')
    expect(cssVariables.foreground.mention).toContain('var(--text-mention-grey')
    expect(cssVariables.destructive.foreground).toContain('var(--text-inverted-error')
    expect(cssVariables.destructive.hover).toContain('var(--error-425-625-hover')
    expect(cssVariables.destructive['background-hover']).toContain('var(--error-950-100-hover')
  })
})
