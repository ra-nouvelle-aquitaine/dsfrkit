import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { Modal, ModalContent, ModalTitle } from './modal'
import { Table, TableBody, TableCell, TableRow } from './table'

describe('Table : captionHidden', () => {
  it('masque la légende à l’écran sans la retirer du nom du tableau', () => {
    render(
      <Table caption="Services du cluster" captionHidden>
        <TableBody>
          <TableRow>
            <TableCell>web</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByRole('table', { name: 'Services du cluster' })).toBeInTheDocument()
    expect(screen.getByText('Services du cluster')).toHaveClass('sr-only')
  })

  it('garde la légende visible par défaut', () => {
    render(<Table caption="Utilisateurs" />)
    expect(screen.getByText('Utilisateurs')).not.toHaveClass('sr-only')
  })
})

/** Modale montée seulement quand elle est ouverte, comme `{open && <Modal open>}`. */
function ConditionalModal() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Nouveau produit
      </button>
      {open && (
        <Modal open onOpenChange={(next) => !next && setOpen(false)}>
          <ModalContent>
            <ModalTitle>Nouveau produit</ModalTitle>
            <input aria-label="Nom" />
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

describe('ModalContent : restitution du focus', () => {
  it('rend le focus au déclencheur quand une modale montée à la demande se ferme', async () => {
    const user = userEvent.setup()
    render(<ConditionalModal />)

    const trigger = screen.getByRole('button', { name: 'Nouveau produit' })
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })
})
