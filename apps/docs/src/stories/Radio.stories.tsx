import { Box, Heading, RadioGroup, RadioGroupItem, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta: Meta = {
  title: 'Inputs/Radio',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: `Bouton radio de sélection unique. L'utilisateur doit choisir une et une seule option parmi plusieurs.

**Quand l'utiliser ?** Pour des choix mutuellement exclusifs ayant peu d'options (ex: "Oui / Non", "Particulier / Professionnel").

**Alternatives :** Pour de très nombreuses options exclusives, préférez une liste déroulante (\`Select\`). Pour permettre des choix multiples, utilisez \`Checkbox\`.
`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: "Désactive l'ensemble du groupe de boutons radio.",
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Option 1" />
      <RadioGroupItem value="option2" label="Option 2" />
      <RadioGroupItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithHints: Story = {
  render: () => (
    <RadioGroup defaultValue="email">
      <RadioGroupItem value="email" label="Par email" hint="Recevoir les notifications par email" />
      <RadioGroupItem value="sms" label="Par SMS" hint="Recevoir les notifications par SMS" />
      <RadioGroupItem
        value="none"
        label="Aucune notification"
        hint="Ne pas recevoir de notifications"
      />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="mme" className="flex flex-row gap-6">
      <RadioGroupItem value="mme" label="Madame" />
      <RadioGroupItem value="m" label="Monsieur" />
    </RadioGroup>
  ),
}

export const Small: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Petite option 1" size="sm" />
      <RadioGroupItem value="option2" label="Petite option 2" size="sm" />
    </RadioGroup>
  ),
}

export const Medium: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Option moyenne 1" size="md" />
      <RadioGroupItem value="option2" label="Option moyenne 2" size="md" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Option active" />
      <RadioGroupItem value="option2" label="Option désactivée" disabled />
      <RadioGroupItem value="option3" label="Autre option active" />
    </RadioGroup>
  ),
}

export const WithError: Story = {
  render: () => (
    <Box className="space-y-2">
      <Text as="label" size="2" weight="medium" className="block text-grey-850">
        Civilité{' '}
        <Text as="span" className="text-error-main">
          *
        </Text>
      </Text>
      <RadioGroup>
        <RadioGroupItem value="mme" label="Madame" variant="error" />
        <RadioGroupItem value="m" label="Monsieur" variant="error" />
      </RadioGroup>
      <Text as="p" size="2" weight="medium" className="text-error-main">
        Veuillez sélectionner une civilité
      </Text>
    </Box>
  ),
}

export const FormExample: Story = {
  render: function FormExampleRender() {
    const [deliveryMethod, setDeliveryMethod] = React.useState('')
    const [paymentMethod, setPaymentMethod] = React.useState('card')

    return (
      <Box className="max-w-md space-y-8">
        <Box className="space-y-3">
          <Text as="label" size="2" weight="medium" className="block text-grey-850">
            Mode de livraison
          </Text>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <RadioGroupItem
              value="standard"
              label="Livraison standard"
              hint="5-7 jours ouvrés - Gratuit"
            />
            <RadioGroupItem
              value="express"
              label="Livraison express"
              hint="2-3 jours ouvrés - 9,90€"
            />
            <RadioGroupItem value="relay" label="Point relais" hint="3-5 jours ouvrés - 4,90€" />
          </RadioGroup>
        </Box>

        <Box className="space-y-3">
          <Text as="label" size="2" weight="medium" className="block text-grey-850">
            Mode de paiement
          </Text>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <RadioGroupItem value="card" label="Carte bancaire" hint="Visa, Mastercard, CB" />
            <RadioGroupItem value="paypal" label="PayPal" hint="Paiement sécurisé" />
            <RadioGroupItem
              value="transfer"
              label="Virement bancaire"
              hint="Délai de traitement supplémentaire"
            />
          </RadioGroup>
        </Box>

        <Box className="text-sm text-grey-500">
          Sélection : Livraison = {deliveryMethod || 'non sélectionnée'}, Paiement = {paymentMethod}
        </Box>
      </Box>
    )
  },
}

export const SurveyExample: Story = {
  render: function SurveyExampleRender() {
    const [satisfaction, setSatisfaction] = React.useState('')

    const options = [
      { value: '5', label: 'Très satisfait', emoji: '😄' },
      { value: '4', label: 'Satisfait', emoji: '🙂' },
      { value: '3', label: 'Neutre', emoji: '😐' },
      { value: '2', label: 'Insatisfait', emoji: '😕' },
      { value: '1', label: 'Très insatisfait', emoji: '😞' },
    ]

    return (
      <Box className="max-w-md space-y-4">
        <Heading as="h3" size="4" weight="medium" className="text-grey-850">
          Comment évaluez-vous notre service ?
        </Heading>

        <RadioGroup value={satisfaction} onValueChange={setSatisfaction} className="space-y-2">
          {options.map((option) => (
            <RadioGroupItem
              key={option.value}
              value={option.value}
              label={`${option.emoji} ${option.label}`}
            />
          ))}
        </RadioGroup>

        {satisfaction && (
          <Text as="p" size="2" className="text-grey-500">
            Merci pour votre retour !
          </Text>
        )}
      </Box>
    )
  },
}

export const RichRadios: Story = {
  render: () => (
    <RadioGroup defaultValue="eco" className="flex flex-col sm:flex-row gap-4">
      {/* Option 1 */}
      <label className="relative flex cursor-pointer rounded-lg border border-border p-4 hover:bg-muted [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:ring-1 [&:has([data-state=checked])]:ring-primary transition-all w-full sm:w-64">
        <Box className="flex items-start gap-4">
          <RadioGroupItem value="eco" className="mt-1" />
          <Box className="flex flex-col gap-1">
            <Text as="span" weight="medium" className="text-foreground">
              Économique
            </Text>
            <Text as="span" size="2" className="text-muted-foreground">
              Dans 3 à 5 jours ouvrés
            </Text>
            <Text as="span" size="5" weight="bold" className="mt-2">
              Gratuit
            </Text>
          </Box>
        </Box>
      </label>

      {/* Option 2 */}
      <label className="relative flex cursor-pointer rounded-lg border border-border p-4 hover:bg-muted [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:ring-1 [&:has([data-state=checked])]:ring-primary transition-all w-full sm:w-64">
        <Box className="flex items-start gap-4">
          <RadioGroupItem value="express" className="mt-1" />
          <Box className="flex flex-col gap-1">
            <Text as="span" weight="medium" className="text-foreground">
              Express
            </Text>
            <Text as="span" size="2" className="text-muted-foreground">
              Demain avant 13h
            </Text>
            <Text as="span" size="5" weight="bold" className="mt-2">
              9,90 €
            </Text>
          </Box>
        </Box>
      </label>
    </RadioGroup>
  ),
}
