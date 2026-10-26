import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { DatePicker } from './date-picker'

const sameDay = (date: Date | undefined, year: number, month: number, day: number) =>
  date?.getFullYear() === year && date.getMonth() === month && date.getDate() === day

describe('Component: DatePicker (DSFR)', () => {
  it('should render the label, the format hint and the calendar button', () => {
    render(<DatePicker label="Date de naissance" />)

    expect(screen.getByLabelText('Date de naissance')).toBeInTheDocument()
    // Espace insécable avant les deux-points (Testing Library normalise les espaces)
    expect(screen.getByText('Format attendu : JJ/MM/AAAA').textContent).toBe(
      'Format attendu\u00a0: JJ/MM/AAAA'
    )
    expect(
      screen.getByRole('button', { name: 'Choisir une date dans le calendrier' })
    ).toBeInTheDocument()
  })

  it('should insert the slashes while typing digits only', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DatePicker label="Date" onValueChange={onValueChange} />)

    await user.type(screen.getByLabelText('Date'), '14071990')

    expect(screen.getByLabelText('Date')).toHaveValue('14/07/1990')
    const [date, details] = onValueChange.mock.lastCall ?? []
    expect(sameDay(date, 1990, 6, 14)).toBe(true)
    expect(details).toEqual({ inputValue: '14/07/1990', error: undefined })
  })

  it('should not double the slashes typed by the user', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Date" />)

    await user.type(screen.getByLabelText('Date'), '14/07/1990')

    expect(screen.getByLabelText('Date')).toHaveValue('14/07/1990')
  })

  it('should accept single-digit day and month', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DatePicker label="Date" onValueChange={onValueChange} />)

    await user.type(screen.getByLabelText('Date'), '1/7/1990')

    expect(sameDay(onValueChange.mock.lastCall?.[0], 1990, 6, 1)).toBe(true)
  })

  it('should reject a date that does not exist and show the error after blur only', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DatePicker label="Date" onValueChange={onValueChange} />)

    const input = screen.getByLabelText('Date')
    await user.type(input, '31022024')

    expect(onValueChange).toHaveBeenLastCalledWith(undefined, {
      inputValue: '31/02/2024',
      error: 'invalid',
    })
    expect(input).toHaveAttribute('aria-invalid', 'false')

    await user.tab()

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert').textContent).toBe(
      'La date doit respecter le format JJ/MM/AAAA. Exemple\u00a0: 14/07/1990'
    )
  })

  it('should validate the bounds with a message that gives the limit', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Date" minDate={new Date(2026, 0, 1)} />)

    await user.type(screen.getByLabelText('Date'), '31122025')
    await user.tab()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'La date doit être postérieure ou égale au 01/01/2026.'
    )
  })

  it('should use custom error messages', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        label="Date"
        maxDate={new Date(2026, 0, 1)}
        errorMessages={{ afterMax: 'La date de naissance ne peut pas être dans le futur.' }}
      />
    )

    await user.type(screen.getByLabelText('Date'), '02012026')
    await user.tab()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'La date de naissance ne peut pas être dans le futur.'
    )
  })

  it('should give priority to the error prop', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Date" error="Renseignez la date." />)

    await user.type(screen.getByLabelText('Date'), '99')
    await user.tab()

    expect(screen.getByRole('alert')).toHaveTextContent('Renseignez la date.')
  })

  it('should select a date in the calendar, fill the field and close the calendar', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker label="Date" defaultValue={new Date(1990, 6, 14)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole('button', { name: 'Choisir une date dans le calendrier' }))
    const dialog = await screen.findByRole('dialog', {
      name: 'Choisir une date dans le calendrier',
    })
    const day = within(dialog).getByText('20').closest('button')
    await user.click(day as HTMLButtonElement)

    expect(screen.getByLabelText('Date')).toHaveValue('20/07/1990')
    expect(sameDay(onValueChange.mock.lastCall?.[0], 1990, 6, 20)).toBe(true)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('should label the calendar days in French for assistive technologies', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Date" />)

    await user.click(screen.getByRole('button', { name: 'Choisir une date dans le calendrier' }))
    const dialog = await screen.findByRole('dialog')

    expect(within(dialog).getByRole('button', { name: /^Aujourd'hui, / })).toBeInTheDocument()
  })

  it('should disable the days outside the bounds in the calendar', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        label="Date"
        defaultValue={new Date(2026, 8, 15)}
        minDate={new Date(2026, 8, 10)}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Choisir une date dans le calendrier' }))
    const dialog = await screen.findByRole('dialog')

    expect(within(dialog).getByText('9').closest('button')).toBeDisabled()
    expect(within(dialog).getByText('10').closest('button')).not.toBeDisabled()
  })

  it('should follow the value in controlled mode, including an emptied value', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 1))
      return (
        <>
          <DatePicker label="Date" value={date} onValueChange={setDate} />
          <button type="button" onClick={() => setDate(new Date(2026, 11, 25))}>
            Noël
          </button>
          <button type="button" onClick={() => setDate(undefined)}>
            Vider
          </button>
        </>
      )
    }
    render(<Controlled />)

    const input = screen.getByLabelText('Date')
    expect(input).toHaveValue('01/09/2026')

    await user.click(screen.getByRole('button', { name: 'Noël' }))
    expect(input).toHaveValue('25/12/2026')

    await user.click(screen.getByRole('button', { name: 'Vider' }))
    expect(input).toHaveValue('')
  })

  it('should keep an invalid text typed in controlled mode', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [date, setDate] = useState<Date | undefined>()
      return <DatePicker label="Date" value={date} onValueChange={setDate} />
    }
    render(<Controlled />)

    await user.type(screen.getByLabelText('Date'), '3102')

    expect(screen.getByLabelText('Date')).toHaveValue('31/02/')
  })

  it('should close the calendar when the selected day is clicked again', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker label="Date" defaultValue={new Date(2026, 6, 14)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole('button', { name: 'Choisir une date dans le calendrier' }))
    const dialog = await screen.findByRole('dialog')
    await user.click(within(dialog).getByText('14').closest('button') as HTMLButtonElement)

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByLabelText('Date')).toHaveValue('14/07/2026')
    expect(onValueChange).not.toHaveBeenCalledWith(undefined, expect.anything())
  })

  it('should hide the error while the user types again, until the next blur', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Date" />)

    const input = screen.getByLabelText('Date')
    await user.type(input, '99')
    await user.tab()
    expect(input).toHaveAttribute('aria-invalid', 'true')

    await user.click(input)
    await user.type(input, '{Backspace}')
    expect(input).toHaveAttribute('aria-invalid', 'false')

    await user.tab()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should disable the calendar button when the field is disabled', () => {
    render(<DatePicker label="Date" disabled />)

    expect(screen.getByLabelText('Date')).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Choisir une date dans le calendrier' })
    ).toBeDisabled()
  })

  describe('range mode', () => {
    it('should insert the separator after the first date', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<DatePicker mode="range" label="Période" onValueChange={onValueChange} />)

      await user.type(screen.getByLabelText('Période'), '0109202615092026')

      expect(screen.getByLabelText('Période')).toHaveValue('01/09/2026 – 15/09/2026')
      const [range] = onValueChange.mock.lastCall ?? []
      expect(sameDay(range?.from, 2026, 8, 1)).toBe(true)
      expect(sameDay(range?.to, 2026, 8, 15)).toBe(true)
    })

    it('should accept « au » as a separator', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<DatePicker mode="range" label="Période" onValueChange={onValueChange} />)

      const input = screen.getByLabelText('Période')
      await user.click(input)
      await user.paste('01/09/2026 au 15/09/2026')

      expect(sameDay(onValueChange.mock.lastCall?.[0]?.to, 2026, 8, 15)).toBe(true)
    })

    it('should reject an end date before the start date', async () => {
      const user = userEvent.setup()
      render(<DatePicker mode="range" label="Période" />)

      await user.type(screen.getByLabelText('Période'), '1509202601092026')
      await user.tab()

      expect(screen.getByRole('alert')).toHaveTextContent(
        'La date de fin doit être postérieure à la date de début.'
      )
    })

    it('should select a range in two clicks and then close the calendar', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <DatePicker
          mode="range"
          label="Période"
          defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 3) }}
          onValueChange={onValueChange}
        />
      )

      await user.click(
        screen.getByRole('button', { name: 'Choisir une période dans le calendrier' })
      )
      const dialog = await screen.findByRole('dialog')

      // Le premier clic commence une nouvelle plage, même si une plage existait
      await user.click(within(dialog).getByText('10').closest('button') as HTMLButtonElement)
      // Plage commencée : le séparateur annonce la date de fin, la valeur reste vide
      expect(screen.getByLabelText('Période')).toHaveValue('10/09/2026 – ')
      expect(onValueChange).toHaveBeenLastCalledWith(undefined, {
        inputValue: '10/09/2026 – ',
        error: 'incomplete',
      })
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.click(within(dialog).getByText('20').closest('button') as HTMLButtonElement)
      expect(screen.getByLabelText('Période')).toHaveValue('10/09/2026 – 20/09/2026')
      const [range] = onValueChange.mock.lastCall ?? []
      expect(sameDay(range?.from, 2026, 8, 10)).toBe(true)
      expect(sameDay(range?.to, 2026, 8, 20)).toBe(true)
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('should report a range without end date as incomplete', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<DatePicker mode="range" label="Période" onValueChange={onValueChange} />)

      const input = screen.getByLabelText('Période')
      await user.click(input)
      await user.paste('01/09/2026')
      await user.tab()

      expect(onValueChange).toHaveBeenLastCalledWith(undefined, {
        inputValue: '01/09/2026',
        error: 'incomplete',
      })
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Renseignez la date de fin de la période.'
      )
    })

    it('should insert the separator when typing after a complete start date', async () => {
      const user = userEvent.setup()
      render(<DatePicker mode="range" label="Période" />)

      const input = screen.getByLabelText('Période')
      await user.click(input)
      await user.paste('10/09/2026')
      await user.type(input, '20092026')

      expect(input).toHaveValue('10/09/2026 – 20/09/2026')
    })

    it('should insert the slashes of the end date after « au »', async () => {
      const user = userEvent.setup()
      render(<DatePicker mode="range" label="Période" />)

      const input = screen.getByLabelText('Période')
      await user.click(input)
      await user.paste('10/09/2026 au ')
      await user.type(input, '20092026')

      expect(input).toHaveValue('10/09/2026 au 20/09/2026')
    })
  })
})
