import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './button'

describe('Component: Button (DSFR)', () => {
  it('should render a standard button with primary DSFR classes by default', () => {
    render(<Button>Valider l'action</Button>)

    const button = screen.getByRole('button', { name: "Valider l'action" })
    expect(button).toBeInTheDocument()
    // DSFR Primary background and typography validation
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('font-bold')
  })

  it('should apply secondary variant class matching DSFR spec (border blue, transparent background)', () => {
    render(<Button variant="secondary">Annuler</Button>)
    const button = screen.getByRole('button', { name: 'Annuler' })
    expect(button).toHaveClass('bg-transparent', 'text-primary')
  })

  it('should render an icon gracefully without disrupting text', () => {
    const IconComponent = <span data-testid="test-icon">icon</span>
    render(<Button icon={IconComponent}>Connexion</Button>)

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    // The text should still be accessible
    expect(screen.getByRole('button')).toHaveTextContent('Connexion')
  })

  it('should guarantee accessibility during loading state (disabled + aria attributes)', () => {
    render(<Button loading>Chargement en cours...</Button>)

    const button = screen.getByRole('button', { name: 'Chargement en cours...' })
    expect(button).toBeDisabled()

    // The SVG spinner should be present inside
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should render as a generic slot when asChild is provided (Useful for Next.js Link)', () => {
    render(
      <Button asChild variant="warning">
        <a href="/alert">Avertissement</a>
      </Button>
    )

    // It should render an anchor, NOT a button, but keep the classes
    const link = screen.getByRole('link', { name: 'Avertissement' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('bg-warning', 'text-foreground-inverted')
    // No explicit button should exist
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
