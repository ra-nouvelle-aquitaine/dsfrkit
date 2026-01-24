import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { RadioGroup, RadioGroupItem } from './radio'

describe('Component: Radio (DSFR/Radix)', () => {
  it('should properly link group items and permit keyboard/mouse selections', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="choice2" aria-label="Choices">
        <RadioGroupItem value="choice1" label="Prélèvement" id="r1" />
        <RadioGroupItem value="choice2" label="Chèque" id="r2" />
      </RadioGroup>
    )

    const radio1 = screen.getByRole('radio', { name: 'Prélèvement' })
    const radio2 = screen.getByRole('radio', { name: 'Chèque' })

    // By default choice 2 is selected
    expect(radio2).toBeChecked()
    expect(radio1).not.toBeChecked()

    // The user decides to use choice 1
    await user.click(radio1)

    // The react state propagates the toggle across the radix context
    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()
  })

  it('should connect ARIA definitions for hints and descriptions', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Titre" hint="Sous-titre informatif" />
      </RadioGroup>
    )

    // Radix radio groups bind the item correctly
    const radio = screen.getByRole('radio', { name: 'Titre' })
    const ariaDescribedBy = radio.getAttribute('aria-describedby')

    expect(ariaDescribedBy).toBeDefined()
    // Finding the physical description block
    const matchingHint = screen.getByText('Sous-titre informatif')
    expect(matchingHint.getAttribute('id')).toBe(ariaDescribedBy)
  })
})
