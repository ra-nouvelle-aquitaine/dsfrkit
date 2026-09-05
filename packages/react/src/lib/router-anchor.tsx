'use client'

import * as React from 'react'
import { useRouter } from '../providers/router-provider'

/**
 * Une adresse que le routeur de l'application sait prendre en charge.
 *
 * Seules les adresses internes lui sont confiées : une URL absolue, une ancre
 * de fragment ou un protocole (`mailto:`, `tel:`) le ferait échouer, ou lui
 * ferait intercepter une navigation que le navigateur assure déjà seul.
 */
export function isRoutableHref(href: string | undefined): boolean {
  if (!href) return false

  return href.startsWith('/') && !href.startsWith('//')
}

export type RouterAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Ancre déléguée au routeur enregistré par `RouterProvider`.
 *
 * Sans provider — ou pour une adresse que le routeur ne sait pas suivre — le
 * rendu retombe sur l'ancre native, à balisage et attributs identiques. Les
 * composants qui exposent un `href` s'appuient dessus plutôt que d'écrire
 * `<a>` en dur : c'est ce qui leur donne la navigation sans rechargement
 * promise par le guide d'installation.
 */
const RouterAnchor = React.forwardRef<HTMLAnchorElement, RouterAnchorProps>(
  ({ href, target, ...props }, ref) => {
    const router = useRouter()

    // `target` quitte le document courant : le routeur n'a rien à y faire.
    if (router && !target && isRoutableHref(href)) {
      const adaptedProps = router.linkPropsAdapter({ href, ...props })

      return <router.Link ref={ref} {...adaptedProps} />
    }

    return <a ref={ref} href={href} target={target} {...props} />
  }
)

RouterAnchor.displayName = 'RouterAnchor'

export { RouterAnchor }
