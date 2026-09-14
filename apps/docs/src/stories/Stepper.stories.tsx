import {
  Alert,
  Button,
  Calendar,
  Checkbox,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Stepper,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { format, isValid, parse } from 'date-fns'
import { fr } from 'date-fns/locale'
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

type FormValues = {
  civility: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  postalCode: string
  city: string
  pickup: string
  certify: boolean
}

type FieldName = keyof FormValues
type FormErrors = Partial<Record<FieldName, string>>

const initialValues: FormValues = {
  civility: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  postalCode: '',
  city: '',
  pickup: '',
  certify: false,
}

const wizardSteps = [
  {
    id: 'identity',
    title: 'Votre identité',
    description: 'Étape suivante : Vos coordonnées',
    fields: ['civility', 'firstName', 'lastName', 'birthDate'] as FieldName[],
  },
  {
    id: 'contact',
    title: 'Vos coordonnées',
    description: 'Étape suivante : Retrait du titre',
    fields: ['email', 'phone', 'postalCode', 'city'] as FieldName[],
  },
  {
    id: 'pickup',
    title: 'Retrait du titre',
    description: 'Étape suivante : Récapitulatif',
    fields: ['pickup', 'certify'] as FieldName[],
  },
  { id: 'summary', title: 'Récapitulatif', fields: [] as FieldName[] },
]

const pickupLabels: Record<string, string> = {
  mairie: 'En mairie',
  domicile: 'À domicile (lettre recommandée)',
}

const MIN_BIRTH_DATE = new Date(1900, 0, 1)

/** Date saisie au format JJ/MM/AAAA, ou `undefined` si elle est incomplète ou impossible (31/02…). */
const parseFrenchDate = (value: string): Date | undefined => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) return undefined
  const date = parse(value.trim(), 'dd/MM/yyyy', new Date())
  return isValid(date) ? date : undefined
}

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 10H4v8h16v-8ZM7 5H4v4h16V5h-3v2h-2V5H9v2H7V5Z"
    />
  </svg>
)

/**
 * Date de naissance : saisie libre au format JJ/MM/AAAA, ou choix dans le
 * `Calendar` ouvert par le bouton du champ (menus mois / année, dates futures
 * désactivées). Le calendrier rend le focus au bouton à sa fermeture.
 */
const BirthDateField = ({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
}) => {
  const [open, setOpen] = React.useState(false)
  const selected = parseFrenchDate(value)
  const today = new Date()

  return (
    <div className="w-full sm:max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <Input
          id="wizard-birthDate"
          label="Date de naissance"
          hint="Format attendu : JJ/MM/AAAA"
          placeholder="Ex. : 14/07/1990"
          inputMode="numeric"
          autoComplete="bday"
          maxLength={10}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          error={error}
          addon={
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="-mr-2"
                aria-label={
                  selected
                    ? `Choisir une date dans le calendrier, date sélectionnée : ${format(selected, 'd MMMM yyyy', { locale: fr })}`
                    : 'Choisir une date dans le calendrier'
                }
                icon={<CalendarIcon />}
              />
            </PopoverTrigger>
          }
        />
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            locale={fr}
            selected={selected}
            defaultMonth={selected ?? new Date(today.getFullYear() - 30, 0)}
            startMonth={MIN_BIRTH_DATE}
            endMonth={today}
            disabled={{ after: today }}
            onSelect={(date) => {
              if (!date) return
              onChange(format(date, 'dd/MM/yyyy'))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/** Règles de validation, champ par champ. Retourne le message d'erreur ou `undefined`. */
const validators: Record<FieldName, (values: FormValues) => string | undefined> = {
  civility: (v) => (v.civility ? undefined : 'Sélectionnez une civilité.'),
  firstName: (v) => (v.firstName.trim() ? undefined : 'Renseignez votre prénom.'),
  lastName: (v) => (v.lastName.trim() ? undefined : 'Renseignez votre nom.'),
  birthDate: (v) => {
    if (!v.birthDate.trim()) return 'Renseignez votre date de naissance.'
    const date = parseFrenchDate(v.birthDate)
    if (!date) return 'La date doit respecter le format JJ/MM/AAAA. Exemple : 14/07/1990'
    if (date > new Date()) return 'La date de naissance ne peut pas être dans le futur.'
    if (date < MIN_BIRTH_DATE) return 'La date de naissance doit être postérieure au 01/01/1900.'
    return undefined
  },
  email: (v) => {
    if (!v.email.trim()) return 'Renseignez votre adresse électronique.'
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)
      ? undefined
      : 'Le format de l’adresse électronique est invalide. Exemple : nom@domaine.fr'
  },
  phone: (v) =>
    !v.phone || /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v.phone)
      ? undefined
      : 'Le format du numéro est invalide. Exemple : 06 12 34 56 78',
  postalCode: (v) =>
    /^\d{5}$/.test(v.postalCode) ? undefined : 'Le code postal doit comporter 5 chiffres.',
  city: (v) => (v.city.trim() ? undefined : 'Renseignez votre commune.'),
  pickup: (v) => (v.pickup ? undefined : 'Choisissez un mode de retrait.'),
  certify: (v) => (v.certify ? undefined : 'Vous devez certifier l’exactitude des informations.'),
}

const validateFields = (fields: FieldName[], values: FormValues): FormErrors => {
  const errors: FormErrors = {}
  for (const field of fields) {
    const message = validators[field](values)
    if (message) errors[field] = message
  }
  return errors
}

/** Message d'erreur de groupe (radios), présenté comme `fr-message--error`. */
const FieldsetError = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <p id={id} className="m-0 mt-4 flex items-start gap-1 text-xs leading-5 text-error" role="alert">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="mt-0.5 size-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
      />
    </svg>
    <span>{children}</span>
  </p>
)

/**
 * Parcours complet : chaque étape valide ses champs avant de passer à la
 * suivante, les erreurs s'affichent sous les champs concernés et le focus est
 * placé sur le premier champ invalide. Une fois une étape soumise, les erreurs
 * se mettent à jour pendant la saisie. Le récapitulatif permet de revenir
 * modifier une étape.
 */
export const Dynamic: Story = {
  name: 'Formulaire en plusieurs étapes',
  args: {
    steps: wizardSteps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  render: function StepperFormRender(args) {
    const [step, setStep] = React.useState(1)
    const [values, setValues] = React.useState<FormValues>(initialValues)
    const [errors, setErrors] = React.useState<FormErrors>({})
    const [submittedSteps, setSubmittedSteps] = React.useState<Set<number>>(new Set())
    const [sent, setSent] = React.useState(false)
    const headingRef = React.useRef<HTMLDivElement>(null)
    const isFirstRender = React.useRef(true)

    const current = wizardSteps[step - 1]
    const isSummary = step === wizardSteps.length

    // À chaque changement d'étape, le focus revient en tête du formulaire pour
    // que les lecteurs d'écran annoncent le titre de la nouvelle étape.
    // biome-ignore lint/correctness/useExhaustiveDependencies: l'effet doit se rejouer à chaque changement d'étape ou d'envoi.
    React.useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      headingRef.current?.focus()
    }, [step, sent])

    const update = <K extends FieldName>(field: K, value: FormValues[K]) => {
      const nextValues = { ...values, [field]: value }
      setValues(nextValues)
      // Correction en direct uniquement après une première tentative de validation.
      if (submittedSteps.has(step)) {
        setErrors((previous) => {
          const next = { ...previous }
          const message = validators[field](nextValues)
          if (message) next[field] = message
          else delete next[field]
          return next
        })
      }
    }

    const goTo = (target: number) => {
      setErrors({})
      setStep(target)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isSummary) {
        setSent(true)
        return
      }

      const stepErrors = validateFields(current.fields, values)
      setSubmittedSteps((previous) => new Set(previous).add(step))
      setErrors(stepErrors)

      const firstInvalid = current.fields.find((field) => stepErrors[field])
      if (firstInvalid) {
        document.getElementById(`wizard-${firstInvalid}`)?.focus()
        return
      }

      goTo(step + 1)
    }

    const handleReset = () => {
      setValues(initialValues)
      setSubmittedSteps(new Set())
      setSent(false)
      goTo(1)
    }

    const errorCount = Object.keys(errors).length

    if (sent) {
      return (
        <Flex direction="col" className="w-full gap-6">
          <div ref={headingRef} tabIndex={-1} className="outline-none">
            <Alert variant="success" title="Votre demande a bien été envoyée">
              Un courriel de confirmation a été envoyé à {values.email}. Vous serez prévenu dès que
              votre titre sera disponible.
            </Alert>
          </div>
          <Button variant="secondary" type="button" onClick={handleReset} className="self-start">
            Faire une nouvelle demande
          </Button>
        </Flex>
      )
    }

    return (
      <form noValidate onSubmit={handleSubmit} className="w-full">
        <div ref={headingRef} tabIndex={-1} className="outline-none">
          <Stepper {...args} steps={wizardSteps} currentStep={step} />
        </div>

        {errorCount > 0 && (
          <Alert variant="error" size="sm" className="mb-6">
            {errorCount === 1
              ? 'Le formulaire contient 1 erreur.'
              : `Le formulaire contient ${errorCount} erreurs.`}
          </Alert>
        )}

        <p className="mb-6 text-sm text-muted-foreground">
          Sauf mention contraire, tous les champs sont obligatoires.
        </p>

        {step === 1 && (
          <Flex direction="col" className="gap-6">
            <fieldset
              className={
                errors.civility
                  ? 'relative m-0 border-0 p-0 before:absolute before:inset-y-0 before:-left-3 before:w-0.5 before:bg-error'
                  : 'm-0 border-0 p-0'
              }
              aria-describedby={errors.civility ? 'wizard-civility-error' : undefined}
            >
              <legend
                id="wizard-civility-legend"
                className="mb-3 text-base leading-6 text-foreground"
              >
                Civilité
              </legend>
              <RadioGroup
                id="wizard-civility"
                aria-labelledby="wizard-civility-legend"
                value={values.civility}
                onValueChange={(value) => update('civility', value)}
                className="flex flex-row gap-6"
                aria-invalid={errors.civility ? true : undefined}
              >
                <RadioGroupItem
                  id="wizard-civility-mme"
                  value="Madame"
                  label="Madame"
                  variant={errors.civility ? 'error' : 'default'}
                />
                <RadioGroupItem
                  value="Monsieur"
                  label="Monsieur"
                  variant={errors.civility ? 'error' : 'default'}
                />
              </RadioGroup>
              {errors.civility && (
                <FieldsetError id="wizard-civility-error">{errors.civility}</FieldsetError>
              )}
            </fieldset>
            <Flex className="flex-col gap-6 sm:flex-row">
              <Input
                id="wizard-firstName"
                label="Prénom"
                autoComplete="given-name"
                value={values.firstName}
                onChange={(event) => update('firstName', event.target.value)}
                error={errors.firstName}
              />
              <Input
                id="wizard-lastName"
                label="Nom"
                autoComplete="family-name"
                value={values.lastName}
                onChange={(event) => update('lastName', event.target.value)}
                error={errors.lastName}
              />
            </Flex>
            <BirthDateField
              value={values.birthDate}
              onChange={(value) => update('birthDate', value)}
              error={errors.birthDate}
            />
          </Flex>
        )}

        {step === 2 && (
          <Flex direction="col" className="gap-6">
            <Input
              id="wizard-email"
              label="Adresse électronique"
              hint="Format attendu : nom@domaine.fr"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              error={errors.email}
            />
            <Input
              id="wizard-phone"
              label="Téléphone (facultatif)"
              hint="Format attendu : 06 12 34 56 78"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => update('phone', event.target.value)}
              error={errors.phone}
            />
            <Flex className="flex-col gap-6 sm:flex-row">
              <div className="sm:w-40">
                <Input
                  id="wizard-postalCode"
                  label="Code postal"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={values.postalCode}
                  onChange={(event) => update('postalCode', event.target.value)}
                  error={errors.postalCode}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="wizard-city"
                  label="Commune"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={(event) => update('city', event.target.value)}
                  error={errors.city}
                />
              </div>
            </Flex>
          </Flex>
        )}

        {step === 3 && (
          <Flex direction="col" className="gap-8">
            <fieldset
              className={
                errors.pickup
                  ? 'relative m-0 border-0 p-0 before:absolute before:inset-y-0 before:-left-3 before:w-0.5 before:bg-error'
                  : 'm-0 border-0 p-0'
              }
              aria-describedby={errors.pickup ? 'wizard-pickup-error' : undefined}
            >
              <legend
                id="wizard-pickup-legend"
                className="mb-3 text-base leading-6 text-foreground"
              >
                Mode de retrait
              </legend>
              <RadioGroup
                aria-labelledby="wizard-pickup-legend"
                value={values.pickup}
                onValueChange={(value) => update('pickup', value)}
                aria-invalid={errors.pickup ? true : undefined}
              >
                <RadioGroupItem
                  id="wizard-pickup"
                  value="mairie"
                  label={pickupLabels.mairie}
                  hint="Sur rendez-vous, sous 3 semaines environ"
                  variant={errors.pickup ? 'error' : 'default'}
                />
                <RadioGroupItem
                  value="domicile"
                  label={pickupLabels.domicile}
                  hint="Frais d’envoi : 6,50 €"
                  variant={errors.pickup ? 'error' : 'default'}
                />
              </RadioGroup>
              {errors.pickup && (
                <FieldsetError id="wizard-pickup-error">{errors.pickup}</FieldsetError>
              )}
            </fieldset>
            <Checkbox
              id="wizard-certify"
              label="Je certifie sur l’honneur l’exactitude des informations fournies"
              checked={values.certify}
              onCheckedChange={(checked) => update('certify', checked === true)}
              error={errors.certify}
            />
          </Flex>
        )}

        {isSummary && (
          <dl className="m-0 divide-y divide-border border-y border-border">
            {[
              {
                step: 1,
                label: 'Identité',
                value: `${values.civility} ${values.firstName} ${values.lastName}, né(e) le ${values.birthDate}`,
              },
              {
                step: 2,
                label: 'Coordonnées',
                value: [values.email, values.phone, `${values.postalCode} ${values.city}`]
                  .filter(Boolean)
                  .join(' · '),
              },
              { step: 3, label: 'Retrait', value: pickupLabels[values.pickup] },
            ].map((row) => (
              <Flex key={row.label} justify="between" align="start" className="gap-4 py-4">
                <div>
                  <dt className="text-sm font-bold text-foreground-title">{row.label}</dt>
                  <dd className="m-0 mt-1 text-base">{row.value}</dd>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => goTo(row.step)}
                  aria-label={`Modifier : ${row.label}`}
                >
                  Modifier
                </Button>
              </Flex>
            ))}
          </dl>
        )}

        <Flex
          justify="between"
          className="mt-8 flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row"
        >
          {step > 1 ? (
            <Button variant="secondary" type="button" onClick={() => goTo(step - 1)}>
              Étape précédente
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit">{isSummary ? 'Envoyer ma demande' : 'Étape suivante'}</Button>
        </Flex>
      </form>
    )
  },
}
