import {
  Box,
  DatePicker,
  type DatePickerRangeProps,
  type DatePickerSingleProps,
  type DateRange,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, waitFor, within } from 'storybook/test'

// Les contrôles `date` de Storybook transmettent un horodatage : le convertir en Date
const toDate = (value: Date | number | undefined) =>
  value === undefined ? undefined : new Date(value)
const withDates = <T extends { minDate?: Date; maxDate?: Date }>(args: T): T => ({
  ...args,
  minDate: toDate(args.minDate),
  maxDate: toDate(args.maxDate),
})

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: `Sélecteur de date : champ de saisie au format JJ/MM/AAAA et calendrier dans une fenêtre, pour une date ou une plage de dates.

**Quand l'utiliser ?**
- Pour toute saisie de date : il remplace \`<input type="date">\`, dont le calendrier natif ne suit pas le DSFR et change selon le navigateur.

**Comportement**
- La saisie au clavier est complétée au fil de la frappe (barres, séparateur de plage) : le clavier numérique des mobiles suffit.
- La saisie est lue et validée : format, date existante, bornes \`minDate\` / \`maxDate\`, ordre de la plage. Le message s'affiche à la sortie du champ ; la prop \`error\` reste prioritaire.
- \`onValueChange\` reçoit la date (ou la plage) et \`{ inputValue, error }\` ; la date vaut \`undefined\` tant que la saisie est incomplète ou invalide.`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range'],
      description: 'Une date (`single`) ou une plage de dates (`range`).',
      table: { defaultValue: { summary: 'single' } },
    },
    minDate: {
      control: 'date',
      description: 'Première date sélectionnable (incluse), dans le calendrier comme à la saisie.',
      table: { category: 'Bornes' },
    },
    maxDate: {
      control: 'date',
      description: 'Dernière date sélectionnable (incluse), dans le calendrier comme à la saisie.',
      table: { category: 'Bornes' },
    },
    captionLayout: {
      control: 'radio',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description:
        'Titre du calendrier : libellé simple ou menus déroulants mois / année (date de naissance).',
      table: { category: 'Calendrier', defaultValue: { summary: 'label' } },
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Nombre de mois affichés côte à côte.',
      table: { category: 'Calendrier', defaultValue: { summary: '1' } },
    },
    calendarLabel: {
      control: 'text',
      description: 'Libellé accessible du bouton et de la fenêtre du calendrier.',
      table: {
        category: 'Calendrier',
        defaultValue: { summary: 'Choisir une date dans le calendrier' },
      },
    },
    errorMessages: {
      control: 'object',
      description:
        'Messages par erreur de saisie : `invalid`, `beforeMin`, `afterMax`, `rangeOrder`.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Message d’erreur externe, prioritaire sur la validation intégrée.',
      table: { category: 'Validation' },
    },
    onValueChange: {
      control: false,
      description: 'Appelé à chaque saisie ou sélection : `(valeur, { inputValue, error })`.',
      table: { category: 'Événements' },
    },
  },
  render: (args) => <DatePicker {...withDates(args)} />,
  decorators: [
    (Story) => (
      <Box className="min-h-[420px] w-full max-w-[360px]">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type SingleStory = StoryObj<DatePickerSingleProps>
type RangeStory = StoryObj<DatePickerRangeProps>

const formatDay = (date: Date | undefined) => (date ? date.toLocaleDateString('fr-FR') : 'aucune')

export const Default: SingleStory = {
  args: {
    label: 'Date du rendez-vous',
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Date du rendez-vous')

    await step('type digits only: the slashes are inserted', async () => {
      await userEvent.type(input, '14072026')
      await expect(input).toHaveValue('14/07/2026')
    })
  },
}

export const BirthDate: SingleStory = {
  name: 'Date de naissance',
  parameters: {
    docs: {
      description: {
        story:
          'Menus déroulants mois / année et bornes : les jours hors bornes sont désactivés dans le calendrier et refusés à la saisie, avec un message qui donne la limite.',
      },
    },
  },
  args: {
    label: 'Date de naissance',
    captionLayout: 'dropdown',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
    autoComplete: 'bday',
    errorMessages: { afterMax: 'La date de naissance ne peut pas être dans le futur.' },
  },
}

export const Controlled: SingleStory = {
  name: 'Mode contrôlé',
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 1))

    return (
      <Box className="space-y-4">
        <DatePicker {...withDates(args)} value={date} onValueChange={setDate} />
        <Text className="text-sm">
          Valeur : <span className="font-semibold text-primary">{formatDay(date)}</span>
        </Text>
      </Box>
    )
  },
  args: {
    label: 'Date de rentrée',
  },
}

export const Validation: SingleStory = {
  name: 'Validation de la saisie',
  args: {
    label: 'Date de début',
    minDate: new Date(2026, 0, 1),
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Date de début')

    await step('type a date that does not exist and leave the field', async () => {
      await userEvent.type(input, '31022026')
      await userEvent.tab()
      await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'))
      await expect(canvas.getByRole('alert')).toHaveTextContent('Exemple')
    })
  },
}

export const ExternalError: SingleStory = {
  name: 'Erreur externe',
  args: {
    label: 'Date de naissance',
    required: true,
    error: 'Renseignez votre date de naissance.',
  },
}

export const Range: RangeStory = {
  name: 'Plage de dates',
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>()

    return (
      <Box className="space-y-4">
        <DatePicker {...withDates(args)} mode="range" value={range} onValueChange={setRange} />
        <Text className="text-sm">
          Du <span className="font-semibold text-primary">{formatDay(range?.from)}</span> au{' '}
          <span className="font-semibold text-primary">{formatDay(range?.to)}</span>
        </Text>
      </Box>
    )
  },
  args: {
    label: 'Période de congés',
    numberOfMonths: 2,
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Période de congés')

    await step('type both dates: the separator is inserted', async () => {
      await userEvent.type(input, '0109202615092026')
      await expect(input).toHaveValue('01/09/2026 – 15/09/2026')
    })
  },
}

export const Disabled: SingleStory = {
  name: 'Désactivé',
  args: {
    label: 'Date de clôture',
    defaultValue: new Date(2026, 5, 30),
    disabled: true,
  },
}
