import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ButtonGroup, ButtonGroupItem } from './button-group'

describe('Component: ButtonGroup (fr-segmented)', () => {
  it('should space segments apart only in multiple selection', () => {
    render(
      <>
        <ButtonGroup type="single" aria-label="Affichage">
          <ButtonGroupItem value="liste">Liste</ButtonGroupItem>
        </ButtonGroup>
        <ButtonGroup type="multiple" aria-label="Mise en forme" defaultValue={['gras', 'italique']}>
          <ButtonGroupItem value="gras">Gras</ButtonGroupItem>
          <ButtonGroupItem value="italique">Italique</ButtonGroupItem>
        </ButtonGroup>
      </>
    )

    expect(screen.getByRole('radiogroup', { name: 'Affichage' })).not.toHaveClass('gap-1')
    expect(screen.getByRole('group', { name: 'Mise en forme' })).toHaveClass('gap-1')
  })
})
