import {
  Box,
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

const meta = {
  title: 'Inputs/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: `Sélecteur de date avancé avec prise en charge complète de l'accessibilité. Utilisé pour choisir une date ou une plage de dates.`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      table: { type: { summary: 'string' }, defaultValue: { summary: 'single' } },
      control: 'radio',
      options: ['default', 'single', 'multiple', 'range'],
      description: 'Mode de sélection du calendrier',
    },
    showOutsideDays: {
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      control: 'boolean',
      description: 'Affiche les jours des mois précédents et suivants',
    },
    captionLayout: {
      table: { type: { summary: 'string' }, defaultValue: { summary: 'label' } },
      control: 'radio',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Affichage du titre : label simple ou menus déroulants mois/année',
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// ── Calendrier simple ─────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'label',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        {...args}
        mode={'single' as const}
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-border bg-background-elevated shadow-sm"
        locale={fr}
      />
    )
  },
}

// ── Avec menus déroulants mois/année ──────────────────────────────────────────
export const DropdownNavigation: Story = {
  name: 'Sélecteurs Mois / Année',
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        startMonth={new Date(1920, 0)}
        endMonth={new Date(2030, 11)}
        className="rounded-md border border-border bg-background-elevated shadow-sm"
        locale={fr}
      />
    )
  },
}

// ── Date Picker – mode single ─────────────────────────────────────────────────
export const DatePickerSingle: Story = {
  name: 'Date Picker – Single (Input + Calendrier)',
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const [open, setOpen] = useState(false)

    return (
      <Box className="w-[320px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Box>
              <Input
                label="Date de naissance"
                hint="Format : jj/mm/aaaa"
                value={date ? format(date, 'dd/MM/yyyy', { locale: fr }) : ''}
                readOnly
                placeholder="Sélectionnez une date"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
                addon={
                  <CalendarIconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpen(!open)
                    }}
                  />
                }
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={date}
              onSelect={(d) => {
                setDate(d || undefined)
                if (d) setOpen(false)
              }}
              startMonth={new Date(1920, 0)}
              endMonth={new Date(2030, 11)}
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </Box>
    )
  },
}

// ── Date Picker – mode multiple ───────────────────────────────────────────────
export const DatePickerMultiple: Story = {
  name: 'Date Picker – Multiple (Input + Calendrier)',
  render: () => {
    const [dates, setDates] = useState<Date[]>([])
    const [open, setOpen] = useState(false)

    const label =
      dates.length === 0
        ? ''
        : dates.length === 1
          ? format(dates[0], 'dd/MM/yyyy', { locale: fr })
          : `${dates.length} dates sélectionnées`

    return (
      <Box className="w-[320px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Box>
              <Input
                label="Dates d'indisponibilité"
                hint="Sélectionnez plusieurs dates"
                value={label}
                readOnly
                placeholder="Aucune date sélectionnée"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
                addon={
                  <CalendarIconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpen(!open)
                    }}
                  />
                }
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={(d) => setDates(d || [])}
              locale={fr}
            />
          </PopoverContent>
        </Popover>
        {dates.length > 0 && (
          <Text as="p" className="mt-2 text-sm text-foreground-muted">
            {dates.map((d) => format(d, 'dd MMM', { locale: fr })).join(', ')}
          </Text>
        )}
      </Box>
    )
  },
}

// ── Date Picker – mode range ──────────────────────────────────────────────────
export const DatePickerRange: Story = {
  name: 'Date Picker – Plage de dates (Input + Calendrier)',
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    const [open, setOpen] = useState(false)

    const label = range?.from
      ? range.to
        ? `${format(range.from, 'dd/MM/yyyy', { locale: fr })} – ${format(range.to, 'dd/MM/yyyy', { locale: fr })}`
        : format(range.from, 'dd/MM/yyyy', { locale: fr })
      : ''

    return (
      <Box className="w-[320px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Box>
              <Input
                label="Période de congés"
                hint="Sélectionnez une date de début et de fin"
                value={label}
                readOnly
                placeholder="Début – Fin"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
                addon={
                  <CalendarIconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpen(!open)
                    }}
                  />
                }
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </Box>
    )
  },
}

// ── Composant bouton icône calendrier réutilisable ─────────────────────────────
function CalendarIconButton({ onClick }: { onClick: React.MouseEventHandler }) {
  return (
    <Button
      variant="tertiary"
      size="sm"
      type="button"
      aria-label="Ouvrir le calendrier"
      onClick={onClick}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      }
    />
  )
}
