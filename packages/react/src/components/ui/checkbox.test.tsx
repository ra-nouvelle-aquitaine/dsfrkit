import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './checkbox'

describe('Component: Checkbox (DSFR/Radix)', () => {
  it('should guarantee base accessibility (id, labels linking)', async () => {
    const user = userEvent.setup()

    render(
      <Checkbox label="Je déclare avoir lu les conditions" hint="Obligatoire pour poursuivre" />
    )

    // Radix Checkbox defines its role
    const checkbox = screen.getByRole('checkbox', { name: 'Je déclare avoir lu les conditions' })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()

    // Test clicking the label triggers the checkbox
    const label = screen.getByText('Je déclare avoir lu les conditions')
    await user.click(label)

    expect(checkbox).toBeChecked()

    // Test hint presence
    expect(screen.getByText('Obligatoire pour poursuivre')).toBeInTheDocument()
  })

  it('should strictly tie aria-invalid when an error is flagged', () => {
    render(<Checkbox label="Acceptation GCG" error="Vous devez accepter pour continuer" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')

    const errorMessage = screen.getByText('Vous devez accepter pour continuer')
    expect(errorMessage).toHaveClass('text-error')
  })
})
