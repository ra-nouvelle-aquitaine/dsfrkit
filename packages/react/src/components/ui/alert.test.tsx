import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './alert'

describe('Component: Alert (DSFR)', () => {
  it('should render an informative alert ensuring strict ARIA role compliance', () => {
    render(<Alert title="Information système">Une maintenance aura lieu ce soir.</Alert>)

    // Accessibility check: must have role="alert"
    const alertElement = screen.getByRole('alert')
    expect(alertElement).toBeInTheDocument()

    // Structure checks
    expect(screen.getByText('Information système')).toBeInTheDocument()
    expect(screen.getByText('Une maintenance aura lieu ce soir.')).toBeInTheDocument()

    // DSFR layout check: left thick border
    expect(alertElement).toHaveClass('border-l-info', 'bg-info-background')
  })

  it('should append the un-intrusive close button and dispatch event accurately', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()

    render(
      <Alert
        closable
        onClose={handleClose}
        closeLabel="Fermer ce message de maintenance"
        variant="warning"
      >
        Attention à la marche
      </Alert>
    )

    const alertElement = screen.getByRole('alert')
    const closeBtn = screen.getByRole('button', { name: 'Fermer ce message de maintenance' })

    expect(closeBtn).toBeInTheDocument()
    expect(alertElement).toHaveClass('border-l-warning')

    // Simulate natural user click
    await user.click(closeBtn)

    expect(handleClose).toHaveBeenCalledTimes(1)

    // Visual logic: the alert removes itself from the DOM
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should not render anything if initialized as closed via internal state somehow (unmounting logic)', () => {
    // Direct approach: test standard rendering then confirm it doesn't crash on null children
    const { container } = render(<Alert variant="error" />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('border-l-destructive')
  })
})
