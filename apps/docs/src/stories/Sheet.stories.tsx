import {
  Box,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: `Tiroir latéral (offcanvas) s'ouvrant souvent depuis le bord droit ou gauche de l'écran.

**Quand l'utiliser ?** Principalement pour la navigation sur mobile (menu burger) ou pour afficher des filtres complexes, des paniers d'achat, et des formulaires très longs.

**Alternative :** Pour un simple message de confirmation ou un formulaire court nécessitant de la concentration, utilisez plutôt \`Modal\`.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
      description: 'Ouverture libre par défaut',
    },
    open: {
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
      description: 'État contrôlé de la sheet',
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Ouvrir le panneau (Droite)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Édition du profil</SheetTitle>
          <SheetDescription>
            Apportez des modifications à votre profil ici. Cliquez sur enregistrer lorsque vous avez
            terminé.
          </SheetDescription>
        </SheetHeader>
        <Box className="pt-4">
          <Input id="name" label="Nom" defaultValue="Jean Dupont" />
        </Box>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Ouvrir le panneau (Gauche)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu de navigation</SheetTitle>
          <SheetDescription>
            Un exemple de panneau latéral gauche, typique pour une navigation sur mobile.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
