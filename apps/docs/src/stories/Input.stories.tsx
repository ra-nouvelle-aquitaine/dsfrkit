import { MailIcon, SearchIcon } from '@dsfrkit/icons'
import {
  Box,
  Button,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  PasswordInput,
  Text,
  Textarea,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `Champ de saisie texte simple. Inclut par défaut les labels, les textes d'aide et l'affichage des erreurs.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Libellé du champ de saisie',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'info', 'warning'],
      description:
        'Variante de style globale (adapte la bordure gauche et inférieure en error ou success)',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du champ de saisie',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le champ de saisie',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Affiche un astérisque rouge et rend la saisie sémantiquement obligatoire',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    type: {
      control: 'text',
      description: 'Type du champ de saisie (text, password, email, number...)',
    },
    placeholder: {
      control: 'text',
      description: "Texte d'exemple fantôme",
    },
    hint: {
      control: 'text',
      description: 'Texte descriptif additionnel affiché sous le libellé',
    },
    error: {
      control: 'text',
      description: "Message d'erreur de validation (affiche également l'icône d'erreur)",
    },
    success: {
      control: 'text',
      description: "Message de succès de validation (affiche également l'icône de succès)",
    },
    info: {
      control: 'text',
      description: "Message d'information (affiche également l'icône d'info)",
    },
    warning: {
      control: 'text',
      description: "Message d'avertissement (affiche également l'icône de warning)",
    },
    value: {
      control: 'text',
      description: 'Valeur du champ de saisie',
    },
    id: {
      control: 'text',
      description: "Attribut HTML 'id' explicite (généré automatiquement sinon)",
    },
    name: {
      control: 'text',
      description: "Attribut HTML 'name'",
    },
    autoComplete: {
      control: 'text',
      description: "Attribut HTML 'autocomplete' (ex: 'email', 'new-password')",
    },
    icon: {
      control: 'text',
      description: "Icône décorative présente à l'intérieur du champ de saisie (composant React)",
    },
    addon: {
      control: 'text',
      description:
        "Élément dynamique ou bouton simple à l'intérieur du champ de saisie (composant React)",
    },
    position: {
      control: 'radio',
      options: ['start', 'end'],
      description: "Position de l'icône, de l'addon ou de l'action",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'end' } },
    },
    action: {
      control: 'text',
      description: "Bouton d'action structurellement rattaché au champ de saisie (composant React)",
    },
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '320px' }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Adresse email',
    placeholder: 'exemple@gouv.fr',
    type: 'email',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Adresse email',
    placeholder: 'exemple@gouv.fr',
    type: 'email',
    icon: <MailIcon className="h-5 w-5" />,
    position: 'start',
  },
}

export const WithAddon: Story = {
  args: {
    label: 'Domaine',
    placeholder: 'https://monsite.fr',
    type: 'url',
    addon: (
      <Button variant="ghost" size="sm">
        Vérifier
      </Button>
    ),
    position: 'end',
  },
}

export const WithAction: Story = {
  args: {
    label: 'Rechercher un document',
    placeholder: 'Mot-clé...',
    type: 'search',
    action: <Button>Rechercher</Button>,
  },
}

export const WithActionIcon: Story = {
  args: {
    label: 'Rechercher',
    type: 'search',
    action: (
      <Button title="Lancer la recherche" className="px-3" aria-label="Lancer la recherche">
        <SearchIcon className="h-5 w-5" />
      </Button>
    ),
  },
}

export const WithActionStart: Story = {
  args: {
    label: 'Site web',
    placeholder: 'monsite.fr',
    type: 'text',
    action: (
      <Button variant="secondary" className="px-3 pointer-events-none">
        https://
      </Button>
    ),
    position: 'start',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Entrez votre mot de passe',
    hint: 'Le mot de passe doit contenir au moins 8 caractères',
  },
}

export const Required: Story = {
  args: {
    label: 'Nom complet',
    placeholder: 'Jean Dupont',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'email-invalide',
    error: 'Veuillez entrer une adresse email valide',
    variant: 'error',
    icon: <MailIcon className="h-5 w-5" />,
    position: 'start',
  },
}

export const Success: Story = {
  args: {
    label: 'Email vérifié',
    type: 'email',
    variant: 'success',
    defaultValue: 'utilisateur@gouv.fr',
    success: 'Cette adresse email est bien associée à votre compte',
  },
}

export const Info: Story = {
  args: {
    label: 'Identifiant',
    type: 'text',
    variant: 'info',
    info: 'Votre identifiant comporte 9 chiffres.',
  },
}

export const Warning: Story = {
  args: {
    label: 'Mot de passe',
    type: 'password',
    variant: 'warning',
    warning: 'Votre mot de passe expirera dans 3 jours.',
  },
}

export const Small: Story = {
  args: {
    label: 'Code postal',
    placeholder: '75001',
    inputSize: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Recherche',
    placeholder: 'Rechercher...',
    inputSize: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Champ désactivé',
    defaultValue: 'Valeur non modifiable',
    disabled: true,
  },
}

/**
 * Exemple de champ mot de passe avec bouton afficher/masquer,
 * stylé correctement selon les standards du backend tailwind de dsfrkit.
 */
export const PasswordField: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Box className="space-y-8">
        <PasswordInput
          label="Mot de passe"
          hint="Votre mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial."
          required
          autoComplete="new-password"
        />
        <PasswordInput
          label="Mot de passe incorrect"
          error="Mot de passe invalide. Veuillez réessayer."
          required
        />
        <PasswordInput
          label="Nouveau mot de passe"
          success="Le niveau de sécurité du mot de passe est excellent."
          required
        />
      </Box>
    )
  },
}

// Exemple d'un champ mot de passe de type One Time Password
export const OneTimePassword: StoryObj<typeof Input> = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // input-otp utilise "color: transparent" volontairement pour permettre
            // le bon fonctionnement des gestionnaires de mots de passe (1Password) sur iOS.
            // Axe (Storybook A11y) remonte un faux-positif (contraste 1:1). On le rétrograde en warning.
            id: 'color-contrast',
            reviewOnFail: true,
          },
        ],
      },
    },
  },
  render: () => {
    return (
      <Box className="space-y-4">
        <Box className="space-y-2">
          <label htmlFor="otp-input" className="text-sm font-bold block text-foreground-title">
            Code de vérification (OTP)
          </label>
          <Text as="p" size="2" className="text-foreground-muted">
            Veuillez entrer le code à 6 chiffres qui vous a été envoyé.
          </Text>
        </Box>
        <InputOTP id="otp-input" aria-label="Code de vérification (OTP)" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Box>
    )
  },
}

// Stories pour Textarea
const textareaMeta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'info', 'warning'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    info: { control: 'text' },
    warning: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '400px' }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Textarea>

export const TextareaDefault: StoryObj<typeof textareaMeta> = {
  render: () => <Textarea label="Message" placeholder="Écrivez votre message ici..." />,
}

export const TextareaWithHint: StoryObj<typeof textareaMeta> = {
  render: () => (
    <Textarea
      label="Description"
      placeholder="Décrivez votre demande..."
      hint="Maximum 500 caractères"
    />
  ),
}

export const TextareaWithError: StoryObj<typeof textareaMeta> = {
  render: () => (
    <Textarea
      label="Commentaire"
      error="Veuillez remplir ce champ obligatoirement avant validation."
    />
  ),
}

export const TextareaWithSuccess: StoryObj<typeof textareaMeta> = {
  render: () => (
    <Textarea
      label="Justificatif"
      defaultValue="Suite à ma demande de renouvellement..."
      success="Les informations complémentaires ont bien été enregistrées."
    />
  ),
}

export const TextareaWithInfo: StoryObj<typeof textareaMeta> = {
  render: () => (
    <Textarea label="Complément" info="Optionnel. Ajoutez des informations si nécessaire." />
  ),
}

export const TextareaWithWarning: StoryObj<typeof textareaMeta> = {
  render: () => (
    <Textarea
      label="Description du problème"
      warning="Veuillez être le plus précis possible pour accélérer le traitement."
    />
  ),
}

export const TextareaRequired: StoryObj<typeof textareaMeta> = {
  render: () => <Textarea label="Observations" placeholder="Vos observations..." required />,
}
