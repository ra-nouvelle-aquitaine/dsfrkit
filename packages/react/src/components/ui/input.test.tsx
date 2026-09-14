import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input, PasswordInput, Textarea } from './input'

describe('Component: Input (DSFR)', () => {
  it('keeps the expected format and the validation message in the accessible description', () => {
    render(
      <Input
        id="email"
        label="Adresse électronique"
        hint="Format attendu : nom@domaine.fr"
        error="Saisissez une adresse valide, par exemple nom@domaine.fr"
      />
    )

    const input = screen.getByRole('textbox', { name: 'Adresse électronique' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-hint email-error')
    expect(screen.getByText('Format attendu : nom@domaine.fr')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Saisissez une adresse valide')
  })

  it('applies the same accessible description contract to a textarea', () => {
    render(
      <Textarea
        id="message"
        label="Message"
        hint="500 caractères maximum"
        error="Le message est requis"
      />
    )

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute(
      'aria-describedby',
      'message-hint message-error'
    )
  })

  it('reveals a password with an explicitly labelled checkbox', async () => {
    const user = userEvent.setup()
    render(<PasswordInput id="password" label="Mot de passe" />)

    const password = screen.getByLabelText('Mot de passe')
    const toggle = screen.getByRole('checkbox', { name: 'Afficher le mot de passe' })
    expect(password).toHaveAttribute('type', 'password')

    await user.click(toggle)

    expect(password).toHaveAttribute('type', 'text')
    expect(toggle).toBeChecked()
  })
})
