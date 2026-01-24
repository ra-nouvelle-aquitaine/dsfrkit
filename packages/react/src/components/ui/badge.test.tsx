import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './badge'

describe('Component: Badge (DSFR)', () => {
  it('should render a default badge without any icon', () => {
    render(<Badge>Nouveau concept</Badge>)
    const badge = screen.getByText('Nouveau concept')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-background-contrast', 'text-foreground')
  })

  it('should inject corresponding DSFR icons for semantic states (e.g. success)', () => {
    const { container } = render(<Badge variant="success">Opération réussie</Badge>)
    expect(screen.getByText('Opération réussie')).toBeInTheDocument()
    // It should render an SVG inside the badge
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-success-background', 'text-success')
  })

  it('should gracefully override or hide icon when using custom icon or noIcon props', () => {
    // Hide icon
    const { container: containerNoIcon } = render(
      <Badge variant="error" noIcon>
        Erreur fatale
      </Badge>
    )
    expect(containerNoIcon.querySelector('svg')).not.toBeInTheDocument()

    // Custom icon
    const CustomIcon = <span data-testid="custom-icon">✨</span>
    render(
      <Badge variant="warning" icon={CustomIcon}>
        Attention
      </Badge>
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('should apply correct DSFR typography padding rules based on size', () => {
    render(<Badge size="sm">Petit Badge</Badge>)
    expect(screen.getByText('Petit Badge')).toHaveClass('text-xs', 'px-1.5')
  })
})
