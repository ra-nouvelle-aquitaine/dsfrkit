'use client'

import { CheckIcon, ChevronDownIcon, CloseIcon } from '@dsfrkit/icons'
import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { Command, CommandGroup, CommandItem, CommandList } from './command'
import { Input, type InputProps } from './input'
import { Popover, PopoverAnchor, PopoverContent } from './popover'
import { Tag } from './tag'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
  /** Identifiant du groupe d'options auquel rattacher cette suggestion. */
  group?: string
  /** Termes additionnels pris en compte par le filtrage par défaut. */
  keywords?: string[]
  /**
   * Données libres attachées à l'option (ex: `avatarUrl`, `icon`, `email`...).
   * Exploitables dans `renderOption` pour personnaliser l'affichage d'une ligne.
   */
  [key: string]: unknown
}

/** Groupe d'options affiché dans la liste de suggestions. */
export interface AutocompleteOptionGroup {
  /** Identifiant référencé par `AutocompleteOption.group`. */
  value: string
  /** Libellé affiché en en-tête de groupe. */
  label: React.ReactNode
}

/** État transmis à `renderOption` pour personnaliser l'affichage d'une suggestion. */
export interface AutocompleteOptionRenderState {
  /** L'option est-elle sélectionnée ? */
  selected: boolean
  /** Texte de recherche courant */
  query: string
  /** Libellé prêt à l'emploi, avec la portion recherchée surlignée (selon `highlightMatches`) */
  highlightedLabel: React.ReactNode
}

/** État transmis à `filterOption` pour personnaliser le filtrage des suggestions. */
export interface AutocompleteOptionFilterState {
  /** Texte saisi par l'utilisateur, sans transformation. */
  query: string
  /** Texte de recherche normalisé (minuscules, sans accents, espaces compactés). */
  normalizedQuery: string
}

interface AutocompleteBaseProps extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue'> {
  /** Liste des options suggérées */
  options: AutocompleteOption[]
  /**
   * Déclaration optionnelle des groupes (ordre et libellé).
   * Les options s'y rattachent via `option.group`.
   */
  groups?: AutocompleteOptionGroup[]
  /** Callback déclenché à la modification du texte de recherche (utile pour les API asynchrones) */
  onSearchChange?: (search: string) => void
  /** Message affiché lorsque aucun résultat ne correspond */
  emptyMessage?: string
  /** Indique si les suggestions sont en cours de chargement */
  loading?: boolean
  /** Message affiché pendant le chargement des suggestions */
  loadingMessage?: string
  /** Nombre minimal de caractères requis avant d'afficher les suggestions */
  minSearchLength?: number
  /** Message affiché tant que `minSearchLength` n'est pas atteint */
  minSearchMessage?: string
  /** Affiche un bouton « Effacer » lorsqu'une valeur est saisie (activé par défaut). */
  clearable?: boolean
  /** Callback déclenché lorsque l'utilisateur efface la valeur via le bouton dédié */
  onClear?: () => void
  /** Libellé accessible du bouton « Effacer » */
  clearLabel?: string
  /** Nom du champ pour la soumission de formulaire (transporte la `value` des options, pas leur label) */
  name?: string
  /**
   * Surligne dans les suggestions la portion de texte correspondant à la recherche.
   * Activé par défaut ; insensible aux accents et à la casse.
   */
  highlightMatches?: boolean
  /**
   * Personnalise le rendu d'une ligne de suggestion (image, avatar, case à cocher...).
   * Remplace entièrement le contenu par défaut de la ligne ; le second argument fournit
   * l'état utile (`selected`, `query`, `highlightedLabel`).
   */
  renderOption?: (
    option: AutocompleteOption,
    state: AutocompleteOptionRenderState
  ) => React.ReactNode
  /**
   * Personnalise le filtrage local des suggestions.
   * Non appelé quand la recherche est vide ou que `minSearchLength` n'est pas atteint.
   */
  filterOption?: (option: AutocompleteOption, state: AutocompleteOptionFilterState) => boolean
}

export interface AutocompleteSingleProps extends AutocompleteBaseProps {
  /** Mode sélection simple (par défaut). */
  multiple?: false
  /** Valeur sélectionnée (mode contrôlé) */
  value?: string
  /** Valeur initiale par défaut (mode non contrôlé) */
  defaultValue?: string
  /** Callback déclenché à la sélection ou modification de la valeur */
  onValueChange?: (value: string) => void
  /**
   * Si vrai, autorise la saisie de valeurs personnalisées non présentes dans les options.
   * Si faux (par défaut), force la sélection d'une option de la liste.
   * Non disponible en mode `multiple`.
   */
  allowCustomValue?: boolean
}

export interface AutocompleteMultipleProps extends AutocompleteBaseProps {
  /** Mode sélection multiple : la valeur devient un tableau et les choix s'affichent en tags supprimables. */
  multiple: true
  /** Valeurs sélectionnées (mode contrôlé) */
  value?: string[]
  /** Valeurs initiales par défaut (mode non contrôlé) */
  defaultValue?: string[]
  /** Callback déclenché à chaque modification de la sélection */
  onValueChange?: (value: string[]) => void
}

export type AutocompleteProps = AutocompleteSingleProps | AutocompleteMultipleProps

/**
 * Classes Tailwind pour forcer l'affichage permanent de la barre de défilement native.
 * Le DSFR masque les scrollbars par défaut (--scrollbar-width: 0), on les rétablit ici
 * avec un style discret (thin) compatible Firefox et un style WebKit personnalisé.
 */
const nativeScrollbarClasses =
  '[scrollbar-width:thin] [scrollbar-color:theme(colors.border)_transparent] [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full'

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

/** Retire les diacritiques d'un fragment et le passe en minuscules (sans collapse d'espaces). */
const stripDiacritics = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

/** Convertit une valeur (string | string[] | undefined) en tableau de valeurs. */
const toValueArray = (input: string | string[] | undefined): string[] => {
  if (input == null) return []
  if (Array.isArray(input)) return input
  return input === '' ? [] : [input]
}

const getSafeMinSearchLength = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0

const getMinSearchMessage = (minSearchLength: number) =>
  `Saisissez au moins ${minSearchLength} caractère${minSearchLength > 1 ? 's' : ''}.`

interface AutocompleteRenderedGroup {
  key: string
  heading?: React.ReactNode
  options: AutocompleteOption[]
}

const getGroupMapKey = (group: string) => `group:${group}`
const ungroupedMapKey = 'ungrouped'
const defaultGroups: AutocompleteOptionGroup[] = []

const getReactNodeText = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getReactNodeText).join(' ')
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getReactNodeText(node.props.children)
  }

  return ''
}

/**
 * Surligne dans un libellé la portion correspondant à la recherche.
 * La correspondance est insensible aux accents et à la casse, tout en préservant
 * le texte d'origine (les accents restent affichés).
 */
function renderHighlightedLabel(label: string, query: string, enabled: boolean): React.ReactNode {
  if (!enabled) return label

  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return label

  // Construction de la version normalisée caractère par caractère pour pouvoir
  // remonter aux index d'origine (un caractère accentué reste un caractère).
  let normalized = ''
  const indexMap: number[] = []
  for (let i = 0; i < label.length; i++) {
    const chunk = stripDiacritics(label[i])
    for (const char of chunk) {
      normalized += char
      indexMap.push(i)
    }
  }

  const matchIndex = normalized.indexOf(normalizedQuery)
  if (matchIndex === -1) return label

  const start = indexMap[matchIndex]
  const end = indexMap[matchIndex + normalizedQuery.length - 1] + 1

  return (
    <>
      {label.slice(0, start)}
      <mark className="bg-transparent font-bold text-primary">{label.slice(start, end)}</mark>
      {label.slice(end)}
    </>
  )
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>((rawProps, ref) => {
  const {
    options,
    groups = defaultGroups,
    multiple = false,
    value: valueProp,
    defaultValue,
    onValueChange,
    onSearchChange,
    emptyMessage = 'Aucun résultat trouvé.',
    loading = false,
    loadingMessage = 'Chargement...',
    minSearchLength = 0,
    minSearchMessage,
    allowCustomValue = false,
    clearable = true,
    onClear,
    clearLabel = 'Effacer la sélection',
    name,
    highlightMatches = true,
    renderOption,
    filterOption,
    label,
    hint,
    error,
    success,
    info,
    warning,
    required,
    disabled,
    placeholder,
    className,
    icon,
    ...inputProps
  } = rawProps as AutocompleteBaseProps & {
    multiple?: boolean
    value?: string | string[]
    defaultValue?: string | string[]
    onValueChange?: (value: string | string[]) => void
    allowCustomValue?: boolean
  }

  const isMultiple = multiple === true
  const isControlled = valueProp !== undefined

  const [open, setOpen] = React.useState(false)
  const [localSelection, setLocalSelection] = React.useState<string[]>(() =>
    toValueArray(isControlled ? valueProp : defaultValue)
  )
  const [query, setQuery] = React.useState('')
  const rootRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const innerInputRef = React.useRef<HTMLInputElement | null>(null)

  const activeSelection = isControlled ? toValueArray(valueProp) : localSelection
  const activeValue = activeSelection[0] ?? ''
  const safeMinSearchLength = getSafeMinSearchLength(minSearchLength)
  const normalizedQuery = React.useMemo(() => normalizeSearchText(query), [query])
  const hasEnoughSearchLength = normalizedQuery.length >= safeMinSearchLength
  const resolvedMinSearchMessage = minSearchMessage ?? getMinSearchMessage(safeMinSearchLength)
  const groupSearchLabelsByValue = React.useMemo(() => {
    const labels = new Map<string, string>()

    for (const group of groups) {
      labels.set(group.value, getReactNodeText(group.label))
    }

    return labels
  }, [groups])

  // Option sélectionnée correspondant à la valeur active (mode simple)
  const selectedOption = React.useMemo(
    () => options.find((opt) => opt.value === activeValue),
    [options, activeValue]
  )

  // Texte affiché dans l'input. En mode multiple, l'input ne sert qu'à la recherche.
  const [search, setSearch] = React.useState(() => {
    if (isMultiple) return ''
    if (selectedOption) return selectedOption.label
    if (allowCustomValue) return activeValue
    return ''
  })

  // Synchronisation du texte affiché quand la valeur change de l'extérieur (menu fermé)
  React.useEffect(() => {
    if (open) return

    if (isMultiple) {
      setSearch('')
    } else if (selectedOption) {
      setSearch(selectedOption.label)
    } else if (allowCustomValue) {
      setSearch(activeValue)
    } else {
      setSearch('')
    }

    setQuery('')
  }, [open, isMultiple, selectedOption, allowCustomValue, activeValue])

  const filteredOptions = React.useMemo(() => {
    if (!hasEnoughSearchLength) {
      return []
    }

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) => {
      if (filterOption) {
        return filterOption(option, { query, normalizedQuery })
      }

      const groupSearchLabel = option.group ? groupSearchLabelsByValue.get(option.group) : ''
      const haystack = normalizeSearchText(
        `${option.label} ${option.description || ''} ${option.value} ${option.group || ''} ${groupSearchLabel || ''} ${
          option.keywords?.join(' ') || ''
        }`
      )

      return haystack.includes(normalizedQuery)
    })
  }, [
    options,
    query,
    normalizedQuery,
    hasEnoughSearchLength,
    filterOption,
    groupSearchLabelsByValue,
  ])

  const filteredOptionGroups = React.useMemo<AutocompleteRenderedGroup[]>(() => {
    if (filteredOptions.length === 0) return []

    const hasGroups = groups.length > 0 || filteredOptions.some((option) => option.group)
    if (!hasGroups) {
      return [{ key: 'all', options: filteredOptions }]
    }

    const renderedGroups: AutocompleteRenderedGroup[] = []
    const groupsByKey = new Map<string, AutocompleteRenderedGroup>()

    const getRenderedGroup = (key: string, heading?: React.ReactNode) => {
      const existing = groupsByKey.get(key)
      if (existing) return existing

      const group: AutocompleteRenderedGroup = { key, heading, options: [] }
      renderedGroups.push(group)
      groupsByKey.set(key, group)
      return group
    }

    for (const group of groups) {
      getRenderedGroup(getGroupMapKey(group.value), group.label)
    }

    for (const option of filteredOptions) {
      if (option.group) {
        getRenderedGroup(getGroupMapKey(option.group), option.group).options.push(option)
      } else {
        getRenderedGroup(ungroupedMapKey).options.push(option)
      }
    }

    return renderedGroups.filter((group) => group.options.length > 0)
  }, [filteredOptions, groups])

  const hasExactOptionMatch = React.useMemo(() => {
    const normalizedSearch = normalizeSearchText(search)

    if (!normalizedSearch) {
      return false
    }

    return options.some((option) => normalizeSearchText(option.label) === normalizedSearch)
  }, [options, search])

  const commitSelection = (next: string[]) => {
    if (!isControlled) {
      setLocalSelection(next)
    }
    if (isMultiple) {
      onValueChange?.(next)
    } else {
      onValueChange?.(next[0] ?? '')
    }
  }

  const assignInputRef = (node: HTMLInputElement | null) => {
    innerInputRef.current = node

    if (typeof ref === 'function') {
      ref(node)
      return
    }

    if (ref) {
      ref.current = node
    }
  }

  // Effacement de toute la sélection via le bouton dédié
  const handleClear = () => {
    commitSelection([])
    setSearch('')
    setQuery('')
    onSearchChange?.('')
    onClear?.()
    // On conserve le focus dans le champ et on réaffiche la liste complète
    innerInputRef.current?.focus()
    setOpen(true)
  }

  // Suppression d'une valeur (tag) en mode multiple.
  // On ne redonne PAS le focus à l'input : cela déclencherait son onFocus et
  // rouvrirait la liste déroulante, ce qui n'est pas attendu en supprimant un tag.
  const removeValue = (value: string) => {
    commitSelection(activeSelection.filter((v) => v !== value))
  }

  const resetSearchToCommittedValue = () => {
    if (isMultiple) {
      setSearch('')
      setQuery('')
      return
    }

    if (allowCustomValue) {
      commitSelection(search ? [search] : [])
      setQuery('')
      return
    }

    if (selectedOption) {
      setSearch(selectedOption.label)
      setQuery('')
      return
    }

    setSearch('')
    setQuery('')
  }

  // Sélection (ou bascule en mode multiple) d'une option dans la liste
  const handleSelect = (option: AutocompleteOption) => {
    if (isMultiple) {
      const exists = activeSelection.includes(option.value)
      const next = exists
        ? activeSelection.filter((v) => v !== option.value)
        : [...activeSelection, option.value]
      commitSelection(next)
      // On vide la recherche pour repartir d'une liste complète, sans fermer le menu
      setSearch('')
      setQuery('')
      innerInputRef.current?.focus()
      return
    }

    commitSelection([option.value])
    setSearch(option.label)
    setQuery('')
    setOpen(false)
  }

  // Gestion de la perte de focus (blur)
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null

    if (
      nextFocusedElement &&
      (rootRef.current?.contains(nextFocusedElement) ||
        contentRef.current?.contains(nextFocusedElement))
    ) {
      return
    }

    resetSearchToCommittedValue()
    setOpen(false)
  }

  // Gestion des touches spécifiques (Escape, Backspace, Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      if (isMultiple) {
        setSearch('')
      } else if (selectedOption) {
        setSearch(selectedOption.label)
      } else if (allowCustomValue) {
        setSearch(activeValue)
      } else {
        setSearch('')
      }
      return
    }

    // En mode multiple, Retour arrière sur un champ vide supprime le dernier tag
    if (e.key === 'Backspace' && isMultiple && search === '' && activeSelection.length > 0) {
      removeValue(activeSelection[activeSelection.length - 1])
      return
    }

    if (e.key === 'Enter' && !isMultiple && allowCustomValue && !hasExactOptionMatch) {
      // On ne valide la saisie libre que si cmdk n'a pas d'option surlignée à sélectionner,
      // afin de ne pas écraser une sélection effectuée au clavier (flèches + Entrée).
      const hasHighlightedOption = !!contentRef.current?.querySelector(
        '[cmdk-item][aria-selected="true"]:not([data-disabled="true"])'
      )

      if (!hasHighlightedOption) {
        commitSelection(search ? [search] : [])
        setQuery('')
        setOpen(false)
      }
    }
  }

  const showClearButton =
    clearable && !disabled && !loading && (activeSelection.length > 0 || search.length > 0)

  // Tags affichés en mode multiple (libellé résolu depuis les options)
  const selectedTags = isMultiple
    ? activeSelection.map((value) => ({
        value,
        label: options.find((opt) => opt.value === value)?.label ?? value,
      }))
    : []

  return (
    <Command
      label={label}
      className="overflow-visible bg-transparent border-0"
      shouldFilter={false}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <div ref={rootRef} className="relative w-full">
          {name ? (
            isMultiple ? (
              activeSelection.map((v) => (
                <input key={v} type="hidden" name={name} value={v} disabled={disabled} readOnly />
              ))
            ) : (
              <input type="hidden" name={name} value={activeValue} disabled={disabled} readOnly />
            )
          ) : null}
          <CommandPrimitive.Input
            asChild
            value={search}
            onValueChange={(val) => {
              setSearch(val)
              setQuery(val)
              onSearchChange?.(val)
              if (!open) setOpen(true)
            }}
            onMouseDown={() => {
              setQuery('')
              setOpen(true)
            }}
            onFocus={() => {
              setQuery('')
              setOpen(true)
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            <Input
              ref={assignInputRef}
              label={label}
              hint={hint}
              error={error}
              success={success}
              info={info}
              warning={warning}
              required={required}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(showClearButton ? 'pr-16' : 'pr-10', className)}
              inputOverlay={
                <PopoverAnchor asChild>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0" />
                </PopoverAnchor>
              }
              icon={
                <div className="flex items-center gap-1">
                  {showClearButton && (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={clearLabel}
                      title={clearLabel}
                      className="pointer-events-auto flex items-center justify-center rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={handleClear}
                    >
                      <CloseIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                  {icon || (
                    <ChevronDownIcon
                      className={cn(
                        'w-4 h-4 transition-transform duration-200 opacity-60',
                        open && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
              }
              position="end"
              {...inputProps}
            />
          </CommandPrimitive.Input>

          {isMultiple && selectedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Tag
                  key={tag.value}
                  size="sm"
                  variant="blue-france"
                  dismissible
                  onDismiss={() => removeValue(tag.value)}
                >
                  {tag.label}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <PopoverContent
          ref={contentRef}
          className="w-[var(--radix-popover-trigger-width)] p-0 border border-border bg-background-elevated elevation-overlap shadow-md overflow-hidden"
          align="start"
          sideOffset={0}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(event) => {
            const target = event.target as Node | null

            if (target && rootRef.current?.contains(target)) {
              event.preventDefault()
              return
            }

            resetSearchToCommittedValue()
          }}
          onMouseDown={(event) => {
            const target = event.target as HTMLElement | null

            if (target?.closest('[cmdk-item]')) {
              event.preventDefault()
            }
          }}
        >
          <CommandList className={cn('max-h-[300px] overflow-y-auto', nativeScrollbarClasses)}>
            {loading ? (
              <div className="p-4 text-center text-sm text-foreground-muted flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{loadingMessage}</span>
              </div>
            ) : !hasEnoughSearchLength ? (
              <div className="p-4 text-center text-sm text-foreground-muted">
                {resolvedMinSearchMessage}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-foreground-muted">{emptyMessage}</div>
            ) : (
              filteredOptionGroups.map((optionGroup, groupIndex) => (
                <CommandGroup
                  key={optionGroup.key}
                  heading={optionGroup.heading}
                  className={cn(
                    'overflow-visible [&_[cmdk-group-heading]]:sticky [&_[cmdk-group-heading]]:top-0 [&_[cmdk-group-heading]]:z-10 [&_[cmdk-group-heading]]:-mx-1 [&_[cmdk-group-heading]]:bg-background-alt [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-foreground-muted',
                    groupIndex > 0 && 'mt-1 pt-1'
                  )}
                >
                  {optionGroup.options.map((option) => {
                    const isSelected = isMultiple
                      ? activeSelection.includes(option.value)
                      : activeValue === option.value
                    // Clé composite pour l'identité cmdk (libellé + description + valeur)
                    const groupSearchLabel = option.group
                      ? groupSearchLabelsByValue.get(option.group)
                      : ''
                    const searchKey = normalizeSearchText(
                      `${option.label} ${option.description || ''} ${option.value} ${
                        option.group || ''
                      } ${groupSearchLabel || ''} ${option.keywords?.join(' ') || ''}`
                    )
                    const highlightedLabel = renderHighlightedLabel(
                      option.label,
                      query,
                      highlightMatches
                    )

                    return (
                      <CommandItem
                        key={option.value}
                        value={searchKey}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option)}
                        className={cn(
                          'group flex cursor-pointer items-center justify-between px-4 py-2.5 text-base outline-none transition-colors hover:bg-background-contrast focus:bg-background-contrast focus:text-primary aria-selected:bg-background-contrast aria-selected:text-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50'
                        )}
                      >
                        {renderOption ? (
                          renderOption(option, {
                            selected: isSelected,
                            query,
                            highlightedLabel,
                          })
                        ) : (
                          <>
                            <div className="flex flex-col">
                              <span className="font-normal text-foreground-title">
                                {highlightedLabel}
                              </span>
                              {option.description && (
                                <span className="text-xs text-foreground-muted mt-0.5">
                                  {option.description}
                                </span>
                              )}
                            </div>
                            {isSelected && (
                              <CheckIcon
                                className="h-4 w-4 text-primary ml-2 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  )
})

Autocomplete.displayName = 'Autocomplete'

export { Autocomplete }
