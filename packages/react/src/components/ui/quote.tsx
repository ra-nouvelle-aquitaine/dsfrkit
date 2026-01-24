import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Quote (Citation) DSFR
 * Refondu en Tailwind natif sémantique
 *
 * @example
 * ```tsx
 * <Quote
 *   author="Marie Curie"
 *   sourceItems={[{ label: 'Nobel Prize Lecture', cite: true }, { label: '1911' }]}
 * >
 *   Dans la vie, rien n'est à craindre, tout est à comprendre.
 * </Quote>
 * ```
 */

export interface QuoteSourceItem {
  /** Texte de la source */
  label: string
  /** Si true, rendu dans un <cite> */
  cite?: boolean
  /** URL optionnel pour le lien */
  href?: string
}

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** Texte de la citation */
  children: React.ReactNode
  /** Auteur de la citation */
  author?: string
  /** URL de référence pour l'attribut cite de blockquote */
  cite?: string
  /** Liste d'éléments de source (titre, date, etc.) */
  sourceItems?: QuoteSourceItem[]
  /** URL optionnelle d'une image (portrait de l'auteur) */
  imageUrl?: string
  /** Texte alternatif de l'image */
  imageAlt?: string
}

const Quote = React.forwardRef<HTMLElement, QuoteProps>(
  ({ className, author, cite, sourceItems, imageUrl, imageAlt = '', children, ...props }, ref) => {
    const hasCaption = author || (sourceItems && sourceItems.length > 0) || imageUrl

    return (
      <figure
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          'relative p-0 m-0',
          'pl-8 mb-6', // Espacement DSFR
          'shadow-[inset_2px_0_0_0_theme(colors.primary.DEFAULT)]', // Ligne décorative gauche DSFR
          'flex flex-col',
          imageUrl ? 'sm:flex-row sm:items-start' : 'items-start',
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {/* Icône guillemet stylisée DSFR */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mb-2 text-primary shrink-0"
            aria-hidden="true"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>

          <blockquote cite={cite} className="m-0 mb-4 p-0">
            {/* Texte de citation DSFR : grand, gras, sans italique */}
            <p className="m-0 text-xl font-bold text-foreground leading-relaxed">« {children} »</p>
          </blockquote>

          {hasCaption && (
            <figcaption className="flex flex-col m-0 p-0 text-sm">
              {author && (
                <p className="m-0 mb-1 font-bold text-foreground text-base tracking-tight">
                  {author}
                </p>
              )}

              {sourceItems && sourceItems.length > 0 && (
                <ul className="flex flex-wrap gap-2 m-0 p-0 list-none italic text-xs text-muted-foreground">
                  {sourceItems.map((item, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: liste statique de sources, l'ordre ne change jamais
                    <li key={i} className="m-0 p-0 inline-flex items-center">
                      {item.cite ? (
                        <cite className="not-italic">
                          {item.href ? (
                            <a href={item.href} className="hover:underline underline-offset-2">
                              {item.label}
                            </a>
                          ) : (
                            <span className="italic">{item.label}</span>
                          )}
                        </cite>
                      ) : item.href ? (
                        <a href={item.href} className="hover:underline underline-offset-2">
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </figcaption>
          )}
        </div>

        {/* Image DSFR (portrait auteur) */}
        {imageUrl && (
          <div className="mt-4 sm:mt-0 sm:ml-6 shrink-0 inline-flex">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-20 h-20 rounded-full object-cover shadow-sm bg-muted"
            />
          </div>
        )}
      </figure>
    )
  }
)

Quote.displayName = 'Quote'

export { Quote }
