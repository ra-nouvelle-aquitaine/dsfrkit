import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { Notice } from './notice'

describe('Component: Notice (fr-notice)', () => {
  it('should render title, description and an external consultation link', () => {
    render(
      <Notice
        variant="weather-red"
        title="Vigilance rouge"
        link={{ label: 'Voir la carte', href: 'https://vigilance.meteofrance.fr', external: true }}
      >
        Orages violents.
      </Notice>
    )

    expect(screen.getByText('Vigilance rouge')).toHaveClass('font-bold')
    expect(screen.getByText('Orages violents.')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: 'Voir la carte' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener external')
    expect(link).toHaveAttribute('title', 'Voir la carte - nouvelle fenêtre')
  })

  it('should hide itself with the « Masquer le message » button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Notice title="Maintenance" closable onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Masquer le message' }))

    expect(onClose).toHaveBeenCalledOnce()
    expect(screen.queryByText('Maintenance')).not.toBeInTheDocument()
  })

  it('should keep the deprecated error variant as an alias of alert', () => {
    const { container: legacy } = render(<Notice variant="error" title="Erreur" />)
    const { container: alert } = render(<Notice variant="alert" title="Erreur" />)

    expect(legacy.firstElementChild?.className).toBe(alert.firstElementChild?.className)
  })

  it('should accept block content without invalid nesting that would break hydration', () => {
    const notice = (
      <Notice title="Maintenance">
        <p>Le service sera indisponible dimanche.</p>
        <p>Merci de votre compréhension.</p>
      </Notice>
    )
    const html = renderToString(notice)

    // Le parseur HTML ferme un <p> ouvert quand un autre <p> commence : il sort
    // les paragraphes du conteneur et laisse des <p> vides, le DOM ne correspond
    // plus au rendu serveur et l'hydratation échoue.
    const parsed = document.createElement('div')
    parsed.innerHTML = html
    const paragraphs = [...parsed.querySelectorAll('p')]
    expect(paragraphs.map((p) => p.textContent)).toEqual([
      'Le service sera indisponible dimanche.',
      'Merci de votre compréhension.',
    ])
    expect(
      paragraphs.every((p) => p.parentElement?.parentElement?.textContent?.includes('Maintenance'))
    ).toBe(true)

    render(notice)
    expect(screen.getByText('Merci de votre compréhension.')).toBeInTheDocument()
  })

  it('should render uppercase titles and a top bar for emergency alerts', () => {
    const { container } = render(<Notice variant="attack" title="Alerte attentat" />)

    expect(screen.getByText('Alerte attentat')).toHaveClass('uppercase')
    expect(container.firstElementChild).toHaveClass('pt-[1.375rem]')
  })
})
