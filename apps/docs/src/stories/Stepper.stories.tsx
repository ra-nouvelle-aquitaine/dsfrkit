import { Button, Flex, Stepper } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: `Indicateur d'étapes indiquant la progression au travers d'un formulaire fractionné (wizard).
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: "L'orientation de la barre de progression",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'horizontal' } },
    },
    currentStep: {
      control: 'number',
      description: "Index de l'étape courante (commence à 1)",
      table: { type: { summary: 'number' } },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { title: 'Identité', description: 'Informations personnelles' },
  { title: 'Coordonnées', description: 'Adresse et contact' },
  { title: 'Documents', description: 'Pièces justificatives' },
  { title: 'Confirmation', description: 'Vérification et envoi' },
]

export const Default: Story = {
  args: { steps, currentStep: 2 },
}

export const Horizontal: Story = {
  args: { steps, currentStep: 2, orientation: 'horizontal' },
}

export const Vertical: Story = {
  args: { steps, currentStep: 3, orientation: 'vertical' },
}

export const WithStepVariants: Story = {
  args: {
    steps: [
      { title: 'Identité', description: 'Validé', variant: 'success' },
      { title: 'Coordonnées', description: 'Erreur détectée', variant: 'error' },
      { title: 'Documents', description: 'En cours de vérification' },
      { title: 'Confirmation', description: 'À venir' },
    ],
    currentStep: 3,
  },
}

export const AllSuccess: Story = {
  args: {
    steps: [
      { title: 'Identité', variant: 'success' },
      { title: 'Coordonnées', variant: 'success' },
      { title: 'Documents', variant: 'success' },
      { title: 'Confirmation' },
    ],
    currentStep: 4,
  },
}

export const MixedVariants: Story = {
  args: {
    steps: [
      { title: 'Identité', variant: 'success' },
      { title: 'Coordonnées', variant: 'warning' },
      { title: 'Documents', variant: 'info' },
      { title: 'Confirmation' },
    ],
    currentStep: 4,
  },
}

export const Dynamic: Story = {
  render: (args) => {
    const [step, setStep] = React.useState(1)
    return (
      <Flex direction="col" className="gap-6 max-w-md">
        <Stepper {...args} currentStep={step} />
        <Flex className="gap-4 mt-6">
          <Button
            variant="secondary"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Précédent
          </Button>
          <Button
            variant="primary"
            onClick={() => setStep((s) => Math.min(args.steps.length, s + 1))}
            disabled={step === args.steps.length}
          >
            Suivant
          </Button>
        </Flex>
      </Flex>
    )
  },
  args: {
    steps: [
      { title: 'Identité', variant: 'success' },
      { title: 'Coordonnées', variant: 'success' },
      { title: 'Documents' },
      { title: 'Confirmation' },
    ],
    currentStep: 1,
    orientation: 'horizontal',
  },
}
