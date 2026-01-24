import * as React from 'react'
import { cn } from '../../lib/utils'
import { useTheme } from '../../providers'
import { Button, type ButtonProps } from './button'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './modal'
import { RadioGroup, RadioGroupItem } from './radio'
import { ThemeArtworkDark, ThemeArtworkLight, ThemeArtworkSystem } from './theme-artwork'

export interface ThemeToggleProps extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  /**
   * Si true, le bouton n'affiche que l'icône, sans le texte.
   */
  iconOnly?: boolean
  /**
   * Affiche une bordure autour du bouton
   */
  withBorder?: boolean
}

/**
 * Composant de sélection du thème (Paramètres d'affichage)
 * Conforme au DSFR : Bouton ouvrant une modale avec choix du thème (Clair, Sombre, Système)
 */
export function ThemeToggle({
  size = 'md',
  iconOnly = false,
  withBorder = false,
  className,
  variant = 'ghost',
  ...props
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  const currentTheme = theme ?? 'system'

  // Icône fixe DSFR pour les paramètres d'affichage (soleil/lune)
  const triggerIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      className="fill-current w-[1em] h-[1em]"
    >
      <path d="M13 20v3h-2v-3h2Zm5.364-3.05 2.121 2.121-1.414 1.414-2.121-2.121 1.414-1.414Zm-12.728 0 1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 0 0-.2 7.995L12 16V8Zm-8 3v2H1v-2h3Zm19 0v2h-3v-2h3ZM4.929 3.515 7.05 5.636 5.636 7.05 3.515 4.93v-.001l1.414-1.414Zm14.142-.001 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121v-.001ZM13 1v3h-2V1h2Z" />
    </svg>
  )

  const triggerLabel = "Paramètres d'affichage"

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(withBorder && 'border border-border', className)}
          aria-label={iconOnly ? triggerLabel : undefined}
          icon={triggerIcon}
          {...props}
        >
          {!iconOnly && triggerLabel}
        </Button>
      </ModalTrigger>

      <ModalContent className="sm:max-w-[480px]">
        <ModalHeader className="border-b-0 pb-0">
          <ModalTitle>Paramètres d'affichage</ModalTitle>
          <ModalDescription>
            Choisissez un thème pour personnaliser l'apparence du site.
          </ModalDescription>
        </ModalHeader>

        <div className="py-6 px-2">
          <RadioGroup
            value={currentTheme}
            onValueChange={(val) => {
              setTheme(val as 'light' | 'dark' | 'system')
            }}
            className="flex flex-col gap-6 justify-center"
          >
            <ThemeOption
              value="light"
              label="Thème clair"
              Artwork={ThemeArtworkLight}
              autoFocus={currentTheme === 'light'}
            />
            <ThemeOption
              value="dark"
              label="Thème sombre"
              Artwork={ThemeArtworkDark}
              autoFocus={currentTheme === 'dark'}
            />
            <ThemeOption
              value="system"
              label="Système"
              Artwork={ThemeArtworkSystem}
              hint="Utilise les paramètres système"
              autoFocus={currentTheme === 'system'}
            />
          </RadioGroup>
        </div>
      </ModalContent>
    </Modal>
  )
}

interface ThemeOptionProps {
  value: string
  label: string
  hint?: string
  Artwork: React.ElementType
  autoFocus?: boolean
}

function ThemeOption({ value, label, hint, Artwork, autoFocus }: ThemeOptionProps) {
  const id = React.useId()
  const itemRef = React.useRef<HTMLButtonElement>(null)

  // Only focus when the modal element actually mounts and corresponds to the active theme
  // biome-ignore lint/correctness/useExhaustiveDependencies: exécuté uniquement au montage pour focus l'option de thème active
  React.useEffect(() => {
    if (autoFocus && itemRef.current) {
      itemRef.current.focus()
    }
  }, [])

  return (
    <label
      htmlFor={id}
      className="flex flex-row items-center cursor-pointer border border-border hover:bg-muted focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-colors"
    >
      <div className="flex-1 px-6 py-6 border-r border-border flex items-center h-[96px]">
        <RadioGroupItem ref={itemRef} value={value} id={id} className="mb-0" />
        <div className="ml-3 grid gap-1 leading-none">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
        </div>
      </div>
      <div className="w-[124px] h-[96px] shrink-0 flex items-center justify-center bg-background-alt overflow-hidden">
        <Artwork className="w-20 h-20" aria-hidden="true" />
      </div>
    </label>
  )
}
