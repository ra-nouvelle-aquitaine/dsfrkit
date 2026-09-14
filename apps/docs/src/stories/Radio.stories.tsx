import { Artwork, Box, Heading, RadioGroup, RadioGroupItem, Text } from '@dsfrkit/react'
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

export const RichWithPictogram: Story = {
  name: 'Radio riche avec pictogramme',
  parameters: {
    docs: {
      description: {
        story:
          "Équivalent du `fr-radio-rich` DSFR : passez un `pictogram` (généralement un `Artwork`) pour afficher l'option sous forme de carte bordée. Toute la carte est cliquable, la bordure passe en bleu à la sélection et le pictogramme reste décoratif.",
      },
    },
  },
  render: function RichWithPictogramRender() {
    const [value, setValue] = React.useState('mairie')

    return (
      <fieldset className="m-0 w-full max-w-md border-0 p-0">
        <legend className="mb-4 text-base leading-6 text-foreground">
          Où souhaitez-vous récupérer votre titre d’identité ?
        </legend>
        <RadioGroup value={value} onValueChange={setValue} className="gap-4">
          <RadioGroupItem
            value="mairie"
            label="En mairie"
            hint="Sur rendez-vous, sous 3 semaines"
            pictogram={<Artwork name="buildings/city-hall" size={56} />}
          />
          <RadioGroupItem
            value="domicile"
            label="À domicile"
            hint="Envoi sécurisé en lettre recommandée"
            pictogram={<Artwork name="buildings/house" size={56} />}
          />
          <RadioGroupItem
            value="prefecture"
            label="En préfecture"
            hint="Service momentanément indisponible"
            pictogram={<Artwork name="institutions/justice" size={56} />}
            disabled
          />
        </RadioGroup>
      </fieldset>
    )
  },
}

export const RichHorizontal: Story = {
  name: 'Radio riche en ligne',
  render: () => (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-4 text-base leading-6 text-foreground">Mode de contact préféré</legend>
      <RadioGroup defaultValue="courriel" className="flex flex-col gap-4 sm:flex-row">
        <RadioGroupItem
          value="courriel"
          label="Courriel"
          pictogram={<Artwork name="digital/mail-send" size={56} />}
        />
        <RadioGroupItem
          value="application"
          label="Application"
          pictogram={<Artwork name="digital/application" size={56} />}
        />
        <RadioGroupItem
          value="calendrier"
          label="Rendez-vous"
          pictogram={<Artwork name="digital/calendar" size={56} />}
        />
      </RadioGroup>
    </fieldset>
  ),
}
