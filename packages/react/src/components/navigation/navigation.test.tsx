import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header, HeaderBody, HeaderBrand, HeaderNav } from './header'
import {
  Navigation,
  NavigationItem,
  NavigationMegaMenu,
  NavigationMegaMenuCategory,
  NavigationMenu,
} from './navigation'

const renderNavigation = () =>
  render(
    <>
      <Navigation aria-label="Menu principal">
        <NavigationItem href="#accueil" isActive>
          Accueil
        </NavigationItem>
        <NavigationMenu title="Démarches">
          <NavigationItem href="#identite">Carte d’identité</NavigationItem>
          <NavigationItem href="#passeport">Passeport</NavigationItem>
        </NavigationMenu>
        <NavigationMegaMenu
          title="Thématiques"
          leader={{
            title: 'Toutes les thématiques',
            description: 'Les démarches classées par thème.',
            link: { label: 'Voir toute la rubrique', href: '#thematiques' },
          }}
        >
          <NavigationMegaMenuCategory title="Famille" href="#famille">
            <NavigationItem href="#naissance">Naissance</NavigationItem>
          </NavigationMegaMenuCategory>
        </NavigationMegaMenu>
      </Navigation>
      <button type="button">Hors navigation</button>
    </>
  )

describe('Component: Navigation (menus DSFR)', () => {
  it('should expose the current page and toggle a menu with aria-expanded', async () => {
    const user = userEvent.setup()
    renderNavigation()

    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute('aria-current', 'page')

    const menuButton = screen.getByRole('button', { name: 'Démarches' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'Passeport' })).not.toBeInTheDocument()

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    const panel = document.getElementById(menuButton.getAttribute('aria-controls') ?? '')
    expect(panel).not.toHaveAttribute('hidden')
    expect(screen.getByRole('link', { name: 'Passeport' })).toBeVisible()

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should keep a single menu open at a time', async () => {
    const user = userEvent.setup()
    renderNavigation()

    const menuButton = screen.getByRole('button', { name: 'Démarches' })
    const megaButton = screen.getByRole('button', { name: 'Thématiques' })

    await user.click(menuButton)
    await user.click(megaButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(megaButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('heading', { name: 'Toutes les thématiques' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Famille' })).toBeVisible()
  })

  it('should close with Escape and give focus back to the menu button', async () => {
    const user = userEvent.setup()
    renderNavigation()

    const megaButton = screen.getByRole('button', { name: 'Thématiques' })
    await user.click(megaButton)
    await user.tab()
    await user.keyboard('{Escape}')

    expect(megaButton).toHaveAttribute('aria-expanded', 'false')
    expect(megaButton).toHaveFocus()
  })

  it('should close the mega menu with its « Fermer » button', async () => {
    const user = userEvent.setup()
    renderNavigation()

    const megaButton = screen.getByRole('button', { name: 'Thématiques' })
    await user.click(megaButton)
    await user.click(screen.getByRole('button', { name: 'Fermer' }))

    expect(megaButton).toHaveAttribute('aria-expanded', 'false')
    expect(megaButton).toHaveFocus()
  })

  it('should close when a link is activated or when clicking outside', async () => {
    const user = userEvent.setup()
    renderNavigation()

    const menuButton = screen.getByRole('button', { name: 'Démarches' })
    await user.click(menuButton)
    await user.click(screen.getByRole('link', { name: 'Passeport' }))
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    await user.click(screen.getByRole('button', { name: 'Hors navigation' }))
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should open a menu rendered without a Navigation root', async () => {
    const user = userEvent.setup()
    render(
      <ul>
        <NavigationMenu title="Ressources">
          <NavigationItem href="#guides">Guides</NavigationItem>
        </NavigationMenu>
      </ul>
    )

    await user.click(screen.getByRole('button', { name: 'Ressources' }))
    expect(screen.getByRole('link', { name: 'Guides' })).toBeVisible()
  })

  it('should close the open menu before the Header mobile panel on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Header>
        <HeaderBody>
          <HeaderBrand serviceTitle="Service" href="#" />
          <HeaderNav>
            <Navigation aria-label="Menu principal">
              <NavigationMenu title="Démarches">
                <NavigationItem href="#identite">Carte d’identité</NavigationItem>
              </NavigationMenu>
            </Navigation>
          </HeaderNav>
        </HeaderBody>
      </Header>
    )

    const burger = screen.getByRole('button', { name: 'Ouvrir le menu' })
    await user.click(burger)
    // Dans le Header, la navigation n'ajoute pas son propre bouton « Menu ».
    expect(screen.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument()

    const menuButton = screen.getByRole('button', { name: 'Démarches' })
    await user.click(menuButton)
    await user.keyboard('{Escape}')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})
