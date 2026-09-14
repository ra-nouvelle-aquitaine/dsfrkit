import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ButtonGroup, ButtonGroupItem } from './button-group'
import { Checkbox } from './checkbox'
import { Logo } from './logo'
import { Progress } from './progress'
import { Range } from './range'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Tag } from './tag'
import { Toggle } from './toggle'

describe('DSFR audit regressions', () => {
  it('names a single-choice segmented control and synchronizes arrow focus with selection', async () => {
    const user = userEvent.setup()
    render(
      <ButtonGroup type="single" defaultValue="list" legend="Mode d'affichage">
        <ButtonGroupItem value="list">Liste</ButtonGroupItem>
        <ButtonGroupItem value="grid">Grille</ButtonGroupItem>
      </ButtonGroup>
    )

    expect(screen.getByRole('radiogroup', { name: "Mode d'affichage" })).toBeInTheDocument()
    const list = screen.getByRole('radio', { name: 'Liste' })
    const grid = screen.getByRole('radio', { name: 'Grille' })
    expect(list).toBeChecked()

    list.focus()
    await user.keyboard('{ArrowRight}')

    expect(grid).toHaveFocus()
    expect(grid).toBeChecked()
  })

  it('keeps hints and validation messages in the checkbox accessible description', () => {
    render(
      <Checkbox
        label="Conditions"
        hint="Lisez les conditions avant de continuer"
        error="Ce choix est obligatoire"
      />
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Conditions' })
    const descriptionIds = checkbox.getAttribute('aria-describedby')?.split(' ') ?? []

    expect(descriptionIds).toHaveLength(2)
    expect(screen.getByText('Lisez les conditions avant de continuer')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Ce choix est obligatoire')
  })

  it('exposes a pressable tag as a keyboard-operable toggle button', async () => {
    const user = userEvent.setup()
    const onSelectedChange = vi.fn()

    render(
      <Tag pressable onSelectedChange={onSelectedChange}>
        France
      </Tag>
    )

    const tag = screen.getByRole('button', { name: 'France' })
    expect(tag).toHaveAttribute('aria-pressed', 'false')

    tag.focus()
    await user.keyboard(' ')

    expect(tag).toHaveAttribute('aria-pressed', 'true')
    expect(onSelectedChange).toHaveBeenCalledWith(true)
  })

  it('clamps progress values and forwards the value to the progressbar semantics', () => {
    render(<Progress value={140} aria-label="Import" />)

    expect(screen.getByRole('progressbar', { name: 'Import' })).toHaveAttribute(
      'aria-valuenow',
      '100'
    )
  })

  it('associates range hints and errors with the slider while hiding visual value copies', () => {
    const { container } = render(
      <Range label="Volume" hint="Entre 0 et 100" error="Valeur indisponible" showValue />
    )

    const slider = screen.getByRole('slider', { name: 'Volume' })
    expect(slider.getAttribute('aria-describedby')?.split(' ')).toHaveLength(2)
    expect(slider).toHaveAttribute('aria-invalid', 'true')
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3)
  })

  it('puts the table accessible name on the table, not its scroll container', () => {
    const { container } = render(
      <Table aria-label="Utilisateurs">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByRole('table', { name: 'Utilisateurs' })).toBeInTheDocument()
    expect(container.firstElementChild).not.toHaveAttribute('aria-label')
  })

  it('generates collision-free SVG symbol identifiers for multiple state logos', () => {
    const { container } = render(
      <>
        <Logo />
        <Logo />
      </>
    )

    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps toggle hints available when validation feedback is present', () => {
    render(<Toggle label="Notifications" hint="Modifiable à tout moment" error="Indisponible" />)

    const toggle = screen.getByRole('switch', { name: 'Notifications' })
    expect(toggle.getAttribute('aria-describedby')?.split(' ')).toHaveLength(2)
    expect(toggle).toHaveAttribute('aria-invalid', 'true')
  })
})
