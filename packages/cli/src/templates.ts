/**
 * Templates des composants DSFR
 * Ces templates sont copiés dans le projet utilisateur via la commande `dsfrkit add`
 */

export const componentTemplates = {
  button: `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-france-main text-white hover:bg-blue-france-625 focus-visible:ring-blue-france-main',
        secondary: 'bg-red-marianne-main text-white hover:bg-red-marianne-625 focus-visible:ring-red-marianne-main',
        tertiary: 'border-2 border-blue-france-main text-blue-france-main hover:bg-blue-france-50 focus-visible:ring-blue-france-main',
        ghost: 'text-blue-france-main hover:bg-blue-france-50 focus-visible:ring-blue-france-main',
        error: 'bg-error-main text-white hover:bg-error-625 focus-visible:ring-error-main',
        success: 'bg-success-main text-white hover:bg-success-625 focus-visible:ring-success-main',
        warning: 'bg-warning-main text-white hover:bg-warning-625 focus-visible:ring-warning-main',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
`,

  alert: `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        info: 'border-info-main bg-info-50 text-info-main',
        success: 'border-success-main bg-success-50 text-success-main',
        warning: 'border-warning-main bg-warning-50 text-warning-main',
        error: 'border-error-main bg-error-50 text-error-main',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {title && (
          <h5 className="mb-1 font-bold leading-none tracking-tight">
            {title}
          </h5>
        )}
        {children && <div className="text-sm">{children}</div>}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert, alertVariants }
`,

  card: `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg border bg-white transition-shadow',
  {
    variants: {
      variant: {
        default: 'border-grey-200 shadow-sm hover:shadow-md',
        bordered: 'border-2 border-blue-france-main',
        elevated: 'border-grey-200 shadow-lg',
        ghost: 'border-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-bold leading-none tracking-tight text-blue-france-main',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-grey-500', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
`,

  input: `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border font-marianne text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-grey-300 bg-white focus-visible:ring-blue-france-main',
        error: 'border-error-main bg-error-50 focus-visible:ring-error-main',
        success: 'border-success-main bg-success-50 focus-visible:ring-success-main',
      },
      inputSize: {
        sm: 'h-9 px-3 py-1 text-sm',
        md: 'h-11 px-4 py-2',
        lg: 'h-14 px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, error, hint, id, ...props }, ref) => {
    const inputId = id || React.useId()
    const errorId = \`\${inputId}-error\`
    const hintId = \`\${inputId}-hint\`

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-grey-850"
          >
            {label}
            {props.required && <span className="text-error-main ml-1">*</span>}
          </label>
        )}

        {hint && !error && (
          <p id={hintId} className="text-sm text-grey-500">
            {hint}
          </p>
        )}

        <input
          id={inputId}
          className={cn(
            inputVariants({ variant: error ? 'error' : variant, inputSize, className })
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          {...props}
        />

        {error && (
          <p id={errorId} className="text-sm text-error-main font-medium">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border font-marianne text-base transition-colors placeholder:text-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
  {
    variants: {
      variant: {
        default: 'border-grey-300 bg-white focus-visible:ring-blue-france-main',
        error: 'border-error-main bg-error-50 focus-visible:ring-error-main',
        success: 'border-success-main bg-success-50 focus-visible:ring-success-main',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || React.useId()
    const errorId = \`\${textareaId}-error\`
    const hintId = \`\${textareaId}-hint\`

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-grey-850"
          >
            {label}
            {props.required && <span className="text-error-main ml-1">*</span>}
          </label>
        )}

        {hint && !error && (
          <p id={hintId} className="text-sm text-grey-500">
            {hint}
          </p>
        )}

        <textarea
          id={textareaId}
          className={cn(
            textareaVariants({ variant: error ? 'error' : variant, className }),
            'px-4 py-2'
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          {...props}
        />

        {error && (
          <p id={errorId} className="text-sm text-error-main font-medium">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, inputVariants, Textarea, textareaVariants }
`,

  modal: `import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalPortal = DialogPrimitive.Portal
const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-grey-1000/50 backdrop-blur-sm',
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const modalContentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-2xl rounded-lg border-grey-200',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ size, className }))}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
        <span className="sr-only">Fermer</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
)
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-bold text-blue-france-main', className)}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-grey-500', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}
`,

  select: `import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-11 w-full items-center justify-between rounded-md border border-grey-300 bg-white px-4 py-2 text-base',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-grey-200 bg-white shadow-md',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-blue-france-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
}
`,
  'theme-artwork': `import type * as React from 'react'

export const ThemeArtworkLight = (props: React.SVGProps<SVGSVGElement>) => (
	<svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px" {...props}>
		<use className="fr-artwork-decorative" href="/dist/artwork/pictograms/environment/sun.svg#artwork-decorative" />
		<use className="fr-artwork-minor" href="/dist/artwork/pictograms/environment/sun.svg#artwork-minor" />
		<use className="fr-artwork-major" href="/dist/artwork/pictograms/environment/sun.svg#artwork-major" />
	</svg>
)

export const ThemeArtworkDark = (props: React.SVGProps<SVGSVGElement>) => (
	<svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px" {...props}>
		<use className="fr-artwork-decorative" href="/dist/artwork/pictograms/environment/moon.svg#artwork-decorative" />
		<use className="fr-artwork-minor" href="/dist/artwork/pictograms/environment/moon.svg#artwork-minor" />
		<use className="fr-artwork-major" href="/dist/artwork/pictograms/environment/moon.svg#artwork-major" />
	</svg>
)

export const ThemeArtworkSystem = (props: React.SVGProps<SVGSVGElement>) => (
	<svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px" {...props}>
		<use className="fr-artwork-decorative" href="/dist/artwork/pictograms/system/system.svg#artwork-decorative" />
		<use className="fr-artwork-minor" href="/dist/artwork/pictograms/system/system.svg#artwork-minor" />
		<use className="fr-artwork-major" href="/dist/artwork/pictograms/system/system.svg#artwork-major" />
	</svg>
)
`,

  'theme-toggle': `import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button, type ButtonProps } from './button'
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from './modal'
import { RadioGroup, RadioGroupItem } from './radio'
import { ThemeArtworkDark, ThemeArtworkLight, ThemeArtworkSystem } from './theme-artwork'

export interface ThemeToggleProps extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
    /** 
     * Si true, le bouton n'affiche que l'icône, sans le texte.
     */
    iconOnly?: boolean
}

/**
 * Composant de sélection du thème (Paramètres d'affichage)
 */
export function ThemeToggle({
    size = 'md',
    iconOnly = false,
    className,
    variant = 'ghost',
    ...props
}: ThemeToggleProps) {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = React.useState(false)

    const currentTheme = theme ?? 'system'

    const triggerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="fill-current w-[1em] h-[1em]">
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
                    className={className}
                    aria-label={iconOnly ? triggerLabel : undefined}
                    icon={triggerIcon}...props
                >!iconOnly && triggerLabel
                </Button>
            </ModalTrigger>

            <ModalContent className="sm:max-w-[480px]">
                <ModalHeader className="border-b-0 pb-0">
                    <ModalTitle>Paramètres d'affichage</ModalTitle>
                    <ModalDescription>Choisissez un thème pour personnaliser l'apparence du site.</ModalDescription>
                </ModalHeader>

                <div className="py-6 px-2">
                    <RadioGroup
                        value=currentTheme
                        onValueChange={(val) => setTheme(val)}
                        className="flex flex-col gap-6 justify-center"
                    >
                        <ThemeOption value="light" label="Thème clair" Artwork={ThemeArtworkLight} />
                        <ThemeOption value="dark" label="Thème sombre" Artwork={ThemeArtworkDark} />
                        <ThemeOption value="system" label="Système" Artwork={ThemeArtworkSystem} hint="Utilise les paramètres système" />
                    </RadioGroup>
                </div>
            </ModalContent>
        </Modal>
    )
}

function ThemeOption({
    value,
    label,
    hint,
    Artwork,
}: {
    value: string
    label: string
    hint?: string
    Artwork: React.ElementType
}
)
{
  const id = React.useId()

  return (
        <label htmlFor={id}
  className =
    "flex flex-row items-center cursor-pointer border border-border hover:bg-muted focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-colors">
            <div className =
    "flex-1 px-6 py-6 border-r border-border flex items-center h-[96px]">
                <RadioGroupItem value =
      { value }
  id = { id }
  label = { label }
  hint = { hint }
  className="mb-0" />
            </div>
            <div
  className =
    "w-[124px] h-[96px] shrink-0 flex items-center justify-center bg-background-alt overflow-hidden">
                <Artwork className = 'w-20 h-20'
  aria-hidden="true" />
            </div>
        </label>
  )
}
`,
}
