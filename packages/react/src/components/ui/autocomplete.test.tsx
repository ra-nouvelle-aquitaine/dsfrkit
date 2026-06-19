import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Autocomplete, type AutocompleteOption } from './autocomplete'

const defaultOptions: AutocompleteOption[] = [
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'be', label: 'Belgique', description: 'Europe' },
  { value: 'ca', label: 'Canada', description: 'Amérique du Nord' },
]

const accentedOptions: AutocompleteOption[] = [
  { value: 'es', label: 'Espagne', description: 'Europe' },
  { value: 'us', label: 'États-Unis', description: 'Amérique du Nord' },
  { value: 'ci', label: "Côte d'Ivoire", description: 'Afrique' },
]

const groupedOptions: AutocompleteOption[] = [
  { value: 'fr', label: 'France', group: 'europe' },
  { value: 'ca', label: 'Canada', group: 'north-america' },
  { value: 'jp', label: 'Japon', group: 'asia' },
  { value: 'be', label: 'Belgique', group: 'europe' },
]

describe('Component: Autocomplete (DSFR)', () => {
  it('should render the input with label and placeholder', () => {
    render(
      <Autocomplete
        label="Sélectionnez un pays"
        placeholder="Rechercher..."
        options={defaultOptions}
      />
    )

    expect(screen.getByLabelText('Sélectionnez un pays')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument()
  })

  it('should open the suggestions dropdown on focus', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} />)

    const input = screen.getByRole('combobox')

    // Dropdown initially closed
    expect(screen.queryByText('France')).not.toBeInTheDocument()

    // Focus opens dropdown
    await user.click(input)
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Belgique')).toBeInTheDocument()
    expect(screen.getByText('Canada')).toBeInTheDocument()
  })

  it('should keep the suggestions dropdown open after the initial click', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} />)

    const input = screen.getByRole('combobox')

    await user.click(input)

    await waitFor(
      () => {
        expect(screen.getByText('France')).toBeInTheDocument()
        expect(screen.getByText('Belgique')).toBeInTheDocument()
      },
      { timeout: 300 }
    )
  })

  it('should filter suggestions based on typing', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    // Type "Can" to filter
    await user.type(input, 'Can')

    // Only "Canada" should remain (the matched part is wrapped in <mark>, so the
    // accessible name is split — we assert on the rendered options' text content)
    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('Canada')
  })

  it('should filter suggestions without accents', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={accentedOptions} />)

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'etats')

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('États-Unis')
  })

  it('should include option keywords in the default filtering', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        label="Commune"
        options={[
          { value: 'paris', label: 'Paris', keywords: ['capitale'] },
          { value: 'bordeaux', label: 'Bordeaux' },
        ]}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'capitale')

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('Paris')
  })

  it('should allow custom filtering with the normalized query', async () => {
    const user = userEvent.setup()
    const filterOption = vi.fn(
      (option: AutocompleteOption, { normalizedQuery }: { normalizedQuery: string }) =>
        option.value === normalizedQuery
    )

    render(
      <Autocomplete
        label="Pays"
        options={[
          { value: 'be', label: 'Belgique' },
          { value: 'ca', label: 'Canada' },
        ]}
        filterOption={filterOption}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'bé')

    expect(filterOption).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'be' }),
      expect.objectContaining({ query: 'bé', normalizedQuery: 'be' })
    )
    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('Belgique')
  })

  it('should wait for the minimum search length before showing options', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} minSearchLength={2} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    expect(screen.getByText('Saisissez au moins 2 caractères.')).toBeInTheDocument()
    expect(screen.queryByRole('option')).not.toBeInTheDocument()

    await user.type(input, 'ca')

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('Canada')
  })

  it('should render option groups in the configured order', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        label="Pays"
        options={groupedOptions}
        groups={[
          { value: 'north-america', label: 'Amérique du Nord' },
          { value: 'europe', label: 'Europe' },
          { value: 'asia', label: 'Asie' },
        ]}
      />
    )

    await user.click(screen.getByRole('combobox'))

    expect(screen.getByText('Amérique du Nord')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Asie')).toBeInTheDocument()

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions.map((option) => option.textContent)).toEqual([
      'Canada',
      'France',
      'Belgique',
      'Japon',
    ])
  })

  it('should filter options by declared group labels', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        label="Département"
        options={[
          { value: '75', label: 'Paris', group: 'idf' },
          { value: '92', label: 'Hauts-de-Seine', group: 'idf' },
          { value: '13', label: 'Bouches-du-Rhône', group: 'paca' },
        ]}
        groups={[
          { value: 'idf', label: 'Île-de-France' },
          { value: 'paca', label: "Provence-Alpes-Côte d'Azur" },
        ]}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'ile')

    expect(screen.getByText('Île-de-France')).toBeInTheDocument()
    expect(screen.queryByText("Provence-Alpes-Côte d'Azur")).not.toBeInTheDocument()

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions.map((option) => option.textContent)).toEqual(['Paris', 'Hauts-de-Seine'])
  })

  it('should infer group labels from option.group when groups are not declared', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        label="Pays"
        options={[
          { value: 'fr', label: 'France', group: 'Europe' },
          { value: 'ci', label: "Côte d'Ivoire", group: 'Afrique' },
        ]}
      />
    )

    await user.click(screen.getByRole('combobox'))

    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Afrique')).toBeInTheDocument()
  })

  it('should select an option when clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Autocomplete label="Pays" options={defaultOptions} onValueChange={onValueChange} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    // Click on "Belgique"
    const option = screen.getByText('Belgique')
    await user.click(option)

    // Check value change and input text updates
    expect(onValueChange).toHaveBeenCalledWith('be')
    expect(input).toHaveValue('Belgique')

    // Dropdown should close
    await waitFor(() => {
      expect(screen.queryByText('France')).not.toBeInTheDocument()
    })
  })

  it('should reopen with the full list after a selection is committed', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} />)

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.click(screen.getByText('Belgique'))

    expect(input).toHaveValue('Belgique')

    await user.click(input)

    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Belgique')).toBeInTheDocument()
    expect(screen.getByText('Canada')).toBeInTheDocument()
  })

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Autocomplete label="Pays" options={defaultOptions} onValueChange={onValueChange} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    // Press ArrowDown to highlight "Belgique" (second item) and press Enter
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('be')
    expect(input).toHaveValue('Belgique')
  })

  it('should ignore disabled options when clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Autocomplete
        label="Pays"
        options={[
          { value: 'fr', label: 'France' },
          { value: 'be', label: 'Belgique', disabled: true },
        ]}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('Belgique'))

    expect(onValueChange).not.toHaveBeenCalledWith('be')
  })

  it('should reset search text to selected option on blur if allowCustomValue is false', async () => {
    const user = userEvent.setup()
    render(<Autocomplete label="Pays" options={defaultOptions} defaultValue="be" />)

    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('Belgique')

    await user.click(input)
    await user.type(input, 'xyz') // Type invalid text
    expect(input).toHaveValue('Belgiquexyz')

    // Click outside to trigger blur
    await user.click(document.body)

    // Wait for the timeout in handleBlur to resolve
    await waitFor(() => {
      expect(input).toHaveValue('Belgique')
    })
  })

  it('should commit typed value on blur if allowCustomValue is true', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Autocomplete
        label="Pays"
        options={defaultOptions}
        allowCustomValue
        onValueChange={onValueChange}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'Custom Country')

    // Click outside to trigger blur
    await user.click(document.body)

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('Custom Country')
      expect(input).toHaveValue('Custom Country')
    })
  })

  it('should not override a keyboard-highlighted option with the typed value on Enter (allowCustomValue)', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Autocomplete
        label="Pays"
        options={defaultOptions}
        allowCustomValue
        onValueChange={onValueChange}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    // "belg" filtre vers "Belgique" qui devient l'option surlignée
    await user.type(input, 'belg')
    await user.keyboard('{Enter}')

    // Seule l'option surlignée doit être validée : la chaîne libre "belg" ne
    // doit jamais être committée en parallèle (double-commit / écrasement).
    expect(onValueChange).not.toHaveBeenCalledWith('belg')
    expect(onValueChange).toHaveBeenLastCalledWith('be')
    expect(input).toHaveValue('Belgique')
  })

  it('should commit the typed value on Enter when no option matches (allowCustomValue)', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Autocomplete
        label="Pays"
        options={defaultOptions}
        allowCustomValue
        onValueChange={onValueChange}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'Atlantide')
    await user.keyboard('{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('Atlantide')
    expect(input).toHaveValue('Atlantide')
  })

  it('should display a clear button and reset the value when clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const onClear = vi.fn()
    render(
      <Autocomplete
        label="Pays"
        options={defaultOptions}
        defaultValue="be"
        onValueChange={onValueChange}
        onClear={onClear}
      />
    )

    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('Belgique')

    const clearButton = screen.getByRole('button', { name: 'Effacer la sélection' })
    await user.click(clearButton)

    expect(onValueChange).toHaveBeenCalledWith('')
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('')
  })

  it('should not render a clear button when there is no value', () => {
    render(<Autocomplete label="Pays" options={defaultOptions} />)

    expect(screen.queryByRole('button', { name: 'Effacer la sélection' })).not.toBeInTheDocument()
  })

  it('should not render a clear button when clearable is false', () => {
    render(
      <Autocomplete label="Pays" options={defaultOptions} defaultValue="be" clearable={false} />
    )

    expect(screen.queryByRole('button', { name: 'Effacer la sélection' })).not.toBeInTheDocument()
  })

  it('should expose the option value (not the label) through a hidden input for forms', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Autocomplete label="Pays" name="country" options={defaultOptions} />
    )

    const hiddenInput = container.querySelector<HTMLInputElement>('input[name="country"]')
    expect(hiddenInput).toBeInTheDocument()
    expect(hiddenInput).toHaveValue('')

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('Canada'))

    // Le champ caché transporte la valeur de l'option, pas son libellé
    expect(hiddenInput).toHaveValue('ca')
  })

  it('should render with validation states (error)', () => {
    render(<Autocomplete label="Pays" options={defaultOptions} error="Ce champ est requis" />)

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Ce champ est requis')).toBeInTheDocument()
  })

  describe('highlighting', () => {
    it('should wrap the matching part of a suggestion in a <mark> element', async () => {
      const user = userEvent.setup()
      // Les suggestions sont rendues dans un Popover porté hors du container : on
      // interroge donc le document entier.
      render(<Autocomplete label="Pays" options={defaultOptions} />)

      await user.click(screen.getByRole('combobox'))
      await user.type(screen.getByRole('combobox'), 'can')

      const mark = document.querySelector('mark')
      expect(mark).toBeInTheDocument()
      // Le surlignage respecte la casse d'origine du libellé ("Can", pas "can")
      expect(mark).toHaveTextContent('Can')
    })

    it('should highlight accent-insensitively while preserving the original accents', async () => {
      const user = userEvent.setup()
      render(<Autocomplete label="Pays" options={accentedOptions} />)

      await user.click(screen.getByRole('combobox'))
      await user.type(screen.getByRole('combobox'), 'etat')

      const mark = document.querySelector('mark')
      expect(mark).toHaveTextContent('État')
    })

    it('should not render any <mark> when highlightMatches is false', async () => {
      const user = userEvent.setup()
      render(<Autocomplete label="Pays" options={defaultOptions} highlightMatches={false} />)

      await user.click(screen.getByRole('combobox'))
      await user.type(screen.getByRole('combobox'), 'can')

      expect(document.querySelector('mark')).not.toBeInTheDocument()
      expect(screen.getByText('Canada')).toBeInTheDocument()
    })
  })

  describe('multiple selection', () => {
    it('should select several options and display them as tags', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Autocomplete
          multiple
          label="Pays"
          options={defaultOptions}
          onValueChange={onValueChange}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)
      await user.click(screen.getByRole('option', { name: /France/ }))
      await user.click(screen.getByRole('option', { name: /Canada/ }))

      // onValueChange reçoit un tableau qui s'agrandit
      expect(onValueChange).toHaveBeenLastCalledWith(['fr', 'ca'])

      // Le menu reste ouvert et les deux tags sont visibles
      await user.keyboard('{Escape}')
      const tagList = screen.getByText('France').closest('span')
      expect(tagList).toBeInTheDocument()
      expect(screen.getByText('Canada')).toBeInTheDocument()
    })

    it('should toggle off an already selected option', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Autocomplete
          multiple
          label="Pays"
          options={defaultOptions}
          defaultValue={['fr', 'be']}
          onValueChange={onValueChange}
        />
      )

      await user.click(screen.getByRole('combobox'))
      // France est déjà sélectionnée : un nouveau clic la retire
      await user.click(screen.getByRole('option', { name: /France/ }))

      expect(onValueChange).toHaveBeenLastCalledWith(['be'])
    })

    it('should remove a tag through its dismiss button', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Autocomplete
          multiple
          label="Pays"
          options={defaultOptions}
          defaultValue={['fr', 'be']}
          onValueChange={onValueChange}
        />
      )

      // Sans ouvrir le menu, les tags sont déjà rendus
      const franceTag = screen.getByText('France').closest('span') as HTMLElement
      const dismissButton = within(franceTag).getByRole('button', { name: 'Supprimer' })
      await user.click(dismissButton)

      expect(onValueChange).toHaveBeenLastCalledWith(['be'])

      // Supprimer un tag ne doit pas ouvrir la liste déroulante (aucune option rendue)
      expect(screen.queryByRole('option')).not.toBeInTheDocument()
    })

    it('should remove the last tag with Backspace when the search is empty', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(
        <Autocomplete
          multiple
          label="Pays"
          options={defaultOptions}
          defaultValue={['fr', 'be']}
          onValueChange={onValueChange}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)
      await user.keyboard('{Backspace}')

      expect(onValueChange).toHaveBeenLastCalledWith(['fr'])
    })

    it('should submit every selected value through repeated hidden inputs', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Autocomplete multiple label="Pays" name="countries" options={defaultOptions} />
      )

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByRole('option', { name: /France/ }))
      await user.click(screen.getByRole('option', { name: /Canada/ }))

      const hiddenInputs = container.querySelectorAll<HTMLInputElement>(
        'input[type="hidden"][name="countries"]'
      )
      expect(Array.from(hiddenInputs).map((node) => node.value)).toEqual(['fr', 'ca'])
    })
  })

  describe('custom option rendering', () => {
    const people: AutocompleteOption[] = [
      { value: 'ada', label: 'Ada Lovelace', email: 'ada@example.org' },
      { value: 'alan', label: 'Alan Turing', email: 'alan@example.org' },
    ]

    it('should render each option through renderOption, including arbitrary data fields', async () => {
      const user = userEvent.setup()
      render(
        <Autocomplete
          label="Personne"
          options={people}
          renderOption={(option, { selected }) => (
            <div data-testid={`opt-${option.value}`}>
              <span>{option.label}</span>
              <span>{String(option.email)}</span>
              {selected && <span>(sélectionné)</span>}
            </div>
          )}
        />
      )

      await user.click(screen.getByRole('combobox'))

      // Le contenu personnalisé est rendu, y compris le champ libre `email`
      expect(screen.getByTestId('opt-ada')).toHaveTextContent('Ada Lovelace')
      expect(screen.getByTestId('opt-ada')).toHaveTextContent('ada@example.org')
    })

    it('should pass the selected state to renderOption', async () => {
      const user = userEvent.setup()
      render(
        <Autocomplete
          label="Personne"
          options={people}
          defaultValue="ada"
          renderOption={(option, { selected }) => (
            <div data-testid={`opt-${option.value}`}>
              {option.label}
              {selected ? ' ✓' : ''}
            </div>
          )}
        />
      )

      await user.click(screen.getByRole('combobox'))

      expect(screen.getByTestId('opt-ada')).toHaveTextContent('Ada Lovelace ✓')
      expect(screen.getByTestId('opt-alan')).not.toHaveTextContent('✓')
    })
  })
})
