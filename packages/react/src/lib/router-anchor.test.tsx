import { fireEvent, render, screen } from '@testing-library/react'
import type * as React from 'react'
import { describe, expect, it } from 'vitest'
import { Footer, FooterBrand } from '../components/navigation/footer'
import { Header, HeaderBrand } from '../components/navigation/header'
import { Navigation, NavigationItem } from '../components/navigation/navigation'
import { Tag } from '../components/ui/tag'
import { Tile } from '../components/ui/tile'
import { Translate } from '../components/ui/translate'
import { RouterProvider } from '../providers/router-provider'

/**
 * Link de test : il n'assure aucune navigation, il se contente de signer le
 * balisage rendu. Un `data-router` sur l'ancre suffit donc à distinguer le lien
 * confié au routeur de l'ancre native que le navigateur rechargerait.
 */
const TestLink = ({ children, ...props }: { children?: React.ReactNode } & Record<string, any>) => (
  <a data-router="true" {...props}>
    {children}
  </a>
)

const withRouter = (ui: React.ReactNode) =>
  render(<RouterProvider Link={TestLink}>{ui}</RouterProvider>)

describe('RouterAnchor', () => {
  it('should render a native anchor when no RouterProvider is mounted', () => {
    render(
      <Tag clickable href="/actualites">
        Actualités
      </Tag>
    )

    const link = screen.getByRole('link', { name: 'Actualités' })
    expect(link).toHaveAttribute('href', '/actualites')
    expect(link).not.toHaveAttribute('data-router')
  })

  it('should delegate an internal href to the router Link', () => {
    withRouter(
      <Tag clickable href="/actualites">
        Actualités
      </Tag>
    )

    expect(screen.getByRole('link', { name: 'Actualités' })).toHaveAttribute('data-router', 'true')
  })

  it.each([
    ['an absolute URL', 'https://www.gouvernement.fr'],
    ['a protocol-relative URL', '//www.gouvernement.fr'],
    ['a fragment', '#contenu'],
    ['a mail address', 'mailto:contact@example.fr'],
  ])('should leave %s to the browser', (_label, href) => {
    withRouter(
      <Tag clickable href={href}>
        Lien
      </Tag>
    )

    expect(screen.getByRole('link', { name: 'Lien' })).not.toHaveAttribute('data-router')
  })

  // `Tag` n'expose ni `target` ni `rel` — ses props dérivent de
  // `HTMLAttributes`, pas de `AnchorHTMLAttributes` — d'où la tuile ici.
  it('should leave a link opening another tab to the browser', () => {
    withRouter(<Tile title="Document" href="/document.pdf" target="_blank" />)

    const link = screen.getByRole('link', { name: 'Document' })
    expect(link).not.toHaveAttribute('data-router')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('should apply linkPropsAdapter so routers expecting `to` receive it', () => {
    const ToLink = ({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, any>) => (
      <a data-to={props.to} href={props.to}>
        {children}
      </a>
    )

    render(
      <RouterProvider
        Link={ToLink}
        linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}
      >
        <Tag clickable href="/actualites">
          Actualités
        </Tag>
      </RouterProvider>
    )

    expect(screen.getByRole('link', { name: 'Actualités' })).toHaveAttribute(
      'data-to',
      '/actualites'
    )
  })

  it('should keep the DSFR classes of the component it renders', () => {
    withRouter(
      <Tag clickable href="/actualites" variant="blue-france">
        Actualités
      </Tag>
    )

    expect(screen.getByRole('link', { name: 'Actualités' })).toHaveClass('cursor-pointer')
  })
})

describe('RouterProvider coverage', () => {
  it('should route the Tile title link', () => {
    withRouter(<Tile title="Démarches" href="/demarches" />)

    expect(screen.getByRole('link', { name: 'Démarches' })).toHaveAttribute('data-router', 'true')
  })

  it('should route the HeaderBrand service title', () => {
    withRouter(
      <Header>
        <HeaderBrand serviceTitle="Collège Louise Michel" href="/" />
      </Header>
    )

    expect(screen.getByRole('link', { name: 'Collège Louise Michel' })).toHaveAttribute(
      'data-router',
      'true'
    )
  })

  it('should route the FooterBrand logo', () => {
    withRouter(
      <Footer>
        <FooterBrand logo={<span>Marianne</span>} href="/" />
      </Footer>
    )

    expect(screen.getByRole('link', { name: 'Marianne' })).toHaveAttribute('data-router', 'true')
  })

  it('should route a Navigation item', () => {
    withRouter(
      <Navigation>
        <NavigationItem href="/actualites">Actualités</NavigationItem>
      </Navigation>
    )

    expect(screen.getByRole('link', { name: 'Actualités' })).toHaveAttribute('data-router', 'true')
  })

  it('should route a Translate language link', () => {
    withRouter(
      <Translate
        currentLanguage="fr"
        languages={[
          { code: 'fr', label: 'Français', nativeLabel: 'Français', href: '/fr' },
          { code: 'en', label: 'Anglais', nativeLabel: 'English', href: '/en' },
        ]}
      />
    )

    // Le sélecteur n'ouvre sa liste qu'au clic : sans cela, aucun lien n'existe.
    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('link', { name: /English/ })).toHaveAttribute('data-router', 'true')
  })
})
