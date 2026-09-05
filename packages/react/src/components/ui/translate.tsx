'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Composant Translate (Sélection de langue) DSFR — fr-translate
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/selecteur-de-langue
 *
 * @example
 * ```tsx
 * <Translate
 *   currentLanguage="FR"
 *   languages={[
 *     { code: 'fr', label: 'Français', nativeLabel: 'FR' },
 *     { code: 'en', label: 'English', nativeLabel: 'EN' },
 *     { code: 'de', label: 'Deutsch', nativeLabel: 'DE' },
 *   ]}
 *   onLanguageChange={(code) => console.log(code)}
 * />
 * ```
 */

export interface TranslateLanguage {
  code: string
  label: string
  nativeLabel: string
  href?: string
}

export interface TranslateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Code de la langue courante */
  currentLanguage: string
  /** Liste des langues disponibles */
  languages: TranslateLanguage[]
  /** Callback lors du changement de langue */
  onLanguageChange?: (code: string) => void
}

const Translate = React.forwardRef<HTMLDivElement, TranslateProps>(
  ({ className, currentLanguage, languages, onLanguageChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [alignment, setAlignment] = React.useState<'left-0' | 'right-0'>('left-0')
    const menuId = React.useId()
    const containerRef = React.useRef<HTMLDivElement>(null)
    const menuRef = React.useRef<HTMLUListElement>(null)

    // Close menu on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Dynamic horizontal alignment to prevent overflow
    React.useLayoutEffect(() => {
      if (isOpen && menuRef.current) {
        // Reset to left first to measure natural position
        setAlignment('left-0')
        // We defer the measurement slightly to allow the DOM to render the initial left-0 state
        requestAnimationFrame(() => {
          if (!menuRef.current) return
          const rect = menuRef.current.getBoundingClientRect()
          if (rect.right > window.innerWidth) {
            setAlignment('right-0')
          }
        })
      }
    }, [isOpen])

    const current = languages.find((l) => l.code === currentLanguage)

    return (
      <div
        ref={(el) => {
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
          ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        }}
        className={cn('fr-translate relative inline-block', className)}
        {...props}
      >
        {/* Trigger button */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((v) => !v)}
          className={cn(
            'inline-flex items-center gap-2 px-3 py-2 text-sm font-bold',
            'text-foreground bg-transparent border-0 cursor-pointer',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {/* Translate Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
          <span>{current?.nativeLabel ?? currentLanguage.toUpperCase()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className={cn('transition-transform', isOpen && 'rotate-180')}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <ul
            id={menuId}
            ref={menuRef}
            aria-label="Sélection de la langue"
            className={cn(
              'absolute top-full z-50 mt-1 min-w-[10rem] m-0',
              alignment,
              'bg-popover text-popover-foreground border shadow-md',
              'py-1 list-none p-0'
            )}
          >
            {languages.map((lang) => {
              const isActive = lang.code === currentLanguage
              return (
                <li key={lang.code} aria-current={isActive ? 'true' : undefined}>
                  {lang.href ? (
                    <RouterAnchor
                      href={lang.href}
                      hrefLang={lang.code}
                      lang={lang.code}
                      className={cn(
                        'flex items-center px-4 py-2 text-sm no-underline',
                        'text-foreground hover:bg-accent hover:text-accent-foreground',
                        isActive &&
                          'font-bold text-primary shadow-[inset_2px_0_0_0_theme(colors.primary.DEFAULT)]'
                      )}
                    >
                      <span>
                        {lang.nativeLabel} - {lang.label}
                      </span>
                    </RouterAnchor>
                  ) : (
                    <button
                      type="button"
                      lang={lang.code}
                      onClick={() => {
                        onLanguageChange?.(lang.code)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center px-4 py-2 text-sm m-0',
                        'text-foreground bg-transparent border-0 cursor-pointer',
                        'hover:bg-accent hover:text-accent-foreground',
                        isActive &&
                          'font-bold text-primary shadow-[inset_2px_0_0_0_theme(colors.primary.DEFAULT)]'
                      )}
                    >
                      <span>
                        {lang.nativeLabel} - {lang.label}
                      </span>
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)

Translate.displayName = 'Translate'

export { Translate }
