import { MailIcon, SearchIcon, SettingsIcon, UserIcon } from '@dsfrkit/icons'
import {
  Box,
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

const meta = {
  title: 'Utils/Command',
  component: Command,
  parameters: {
    docs: {
      description: {
        component: `Boîte de recherche avancée filtrable (type Palette de commandes / Spotlight), navigable intégralement au clavier.

**Quand l'utiliser ?** Pour rechercher très rapidement dans de grandes listes d'éléments (ex: une très longue liste de pays, un référentiel métier complet), ou pour offrir une arborescence de navigation rapide au clavier entre toutes les pages de l'application.

**Alternative :** Pour une simple liste de quelques dizaines d'options maximum au sein d'un formulaire strict, privilégiez le \`Select\`.`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shouldFilter: {
      control: 'boolean',
      description: 'Filtre automatiquement les CommandItem selon la saisie (true par défaut)',
      table: { type: { summary: 'boolean' } },
    },
    label: {
      control: 'text',
      description: 'Attribut aria-label global',
      table: { type: { summary: 'string' } },
    },
    loop: {
      control: 'boolean',
      description: 'Boucle la navigation au clavier (haut/bas)',
      table: { type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    return (
      <Box className="w-full max-w-[400px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-background-elevated border border-border text-foreground font-normal hover:bg-background-contrast"
            >
              {value || 'Rechercher une action ou un paramètre...'}
              <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0 shadow-xl" align="start">
            <Command>
              <CommandInput placeholder="Lancer la recherche..." />
              <CommandList>
                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <SearchIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Calendrier</Text>
                  </CommandItem>
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Recherche d'utilisateurs</Text>
                  </CommandItem>
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Boîte de réception</Text>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Paramètres">
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Profil personnel</Text>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Paramètres du compte</Text>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Box>
    )
  },
}

export const DialogExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }

      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
    }, [])

    return (
      <Box className="w-full min-w-[300px] max-w-[400px]">
        <Button
          variant="secondary"
          className="relative w-full justify-start text-sm text-foreground-muted bg-background-elevated border border-border pr-12 h-10 px-4 py-2 hover:bg-background-contrast font-normal"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
          <Text as="span">Rechercher...</Text>
          <Box className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 sm:flex">
            <Kbd>⌘K</Kbd>
          </Box>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Tapez une commande ou effectuez une recherche..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Actions Rapides">
              <CommandItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <Text as="span">Nouveau compte</Text>
              </CommandItem>
              <CommandItem>
                <MailIcon className="mr-2 h-4 w-4" />
                <Text as="span">Envoyer un message</Text>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Box>
    )
  },
}
