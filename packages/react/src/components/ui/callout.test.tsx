import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Callout } from './callout'

describe('Component: Callout (DSFR)', () => {
  it('should render a callout with a properly structured h3 title by default', () => {
    render(<Callout title="A noter">Les inscriptions se terminent ce soir.</Callout>)

    const titleObj = screen.getByRole('heading', { level: 3, name: 'A noter' })
    expect(titleObj).toBeInTheDocument()
    expect(screen.getByText('Les inscriptions se terminent ce soir.')).toBeInTheDocument()
  })

  it('should respect semantic DOM modifications through titleMarkup', () => {
    render(
      <Callout title="Attention" titleMarkup="h2">
        Alerte enlèvement
      </Callout>
    )

    // Check if the title is actually rendered as an H2
    const h2Title = screen.getByRole('heading', { level: 2, name: 'Attention' })
    expect(h2Title).toBeInTheDocument()
  })

  it('should inject actionable content at the bottom', () => {
    render(<Callout action={<button type="button">S'inscrire</button>}>Rejoignez-nous!</Callout>)
    expect(screen.getByRole('button', { name: "S'inscrire" })).toBeInTheDocument()
  })

  it('should map the specific DSFR styling for info variant', () => {
    const { container } = render(<Callout accent="info">Information</Callout>)
    // Inspect the outer div
    expect(container.firstChild).toHaveClass('border-l-info', 'bg-info-background')
  })
})
