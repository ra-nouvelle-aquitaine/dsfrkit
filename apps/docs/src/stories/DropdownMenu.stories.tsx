import { MailIcon, SettingsIcon, UserIcon } from '@dsfrkit/icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Flex,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Utils/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Menu contextuel listant des commandes ou des actions, déclenché par un clic court sur un bouton déclencheur.

**Quand l'utiliser ?** Idéalement pour regrouper ou masquer des actions secondaires sur une entité métier typique et libérer de la place dans l'interface (ex: icône "..." affichant \`Modifier\`, \`Dupliquer\`, \`Supprimer\`).

**Alternative :** Ce composant *déclenche* des actions. Il ne sert en aucun cas à remplir un champ de formulaire textuel ou sélection multiple (qui sont les rôles exclusifs du \`Select\` ou du \`Command\`).
`,
      },
    },
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <Flex justify="center" className="p-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Mon Compte</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <Text as="span">Profil</Text>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <Text as="span">Facturation</Text>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <Text as="span">Paramètres</Text>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive-background focus:text-destructive-foreground">
            Se déconnecter
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  ),
}

export const Checkboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <Flex justify="center" className="p-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Affichage (Checkboxes)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panneaux visibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Barre d'état
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Barre d'activité
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panneau latéral
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
    )
  },
}

export const RadioGroup: Story = {
  render: () => {
    const [position, setPosition] = useState('bottom')

    return (
      <Flex justify="center" className="p-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Position (Radios)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Position du panneau</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Haut</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bas</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Droite</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
    )
  },
}

export const WithSubMenu: Story = {
  render: () => (
    <Flex justify="center" className="p-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Inviter (Sous-menu)</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserIcon className="mr-2 h-4 w-4" />
                <Text as="span">Inviter des membres</Text>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <MailIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Email</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MailIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Message</Text>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <Text as="span">Nouveau...</Text>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <Text as="span">Paramètres avancés</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  ),
}
