import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  Follow,
  FollowNewsletter,
  FollowNewsletterForm,
  FollowSocial,
  FollowSocialLink,
} from './follow'

describe('Component: Follow (fr-follow)', () => {
  it('should submit the typed email address', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <Follow>
        <FollowNewsletter title="Abonnez-vous à notre lettre d’information">
          <FollowNewsletterForm onSubmit={onSubmit} />
        </FollowNewsletter>
      </Follow>
    )

    await user.type(
      screen.getByLabelText('Votre adresse électronique (ex. : nom@example.com)'),
      'nom@domaine.fr'
    )
    await user.click(screen.getByRole('button', { name: "S'abonner" }))

    expect(onSubmit).toHaveBeenCalledWith('nom@domaine.fr', expect.anything())
  })

  it('should describe the field with the legal hint and the error message', () => {
    render(<FollowNewsletterForm error="Adresse invalide" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription(
      /En renseignant votre adresse électronique.*Adresse invalide/
    )
  })

  it('should list social links opened in a new window', () => {
    render(
      <Follow>
        <FollowSocial>
          <FollowSocialLink network="linkedin" href="https://www.linkedin.com" />
          <FollowSocialLink network="youtube" href="https://www.youtube.com" />
        </FollowSocial>
      </Follow>
    )

    expect(
      screen.getByRole('heading', { name: /Suivez-nous\s*sur les réseaux sociaux/ })
    ).toBeVisible()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    const link = screen.getByRole('link', { name: 'LinkedIn' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('title', 'LinkedIn - nouvelle fenêtre')
  })
})
