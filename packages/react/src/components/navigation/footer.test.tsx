import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Footer,
  FooterBody,
  FooterBottom,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  FooterTop,
} from './footer'

describe('Component: Footer (fr-footer)', () => {
  it('should display the mandatory institutional links by default', () => {
    render(
      <Footer>
        <FooterBody>
          <FooterContent description="Présentation du service." />
        </FooterBody>
      </Footer>
    )

    for (const name of [
      'info.gouv.fr',
      'service-public.gouv.fr',
      'legifrance.gouv.fr',
      'data.gouv.fr',
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('target', '_blank')
    }
  })

  it('should render categories, legal links and licence as lists and text', () => {
    render(
      <Footer>
        <FooterTop>
          <FooterLinks title="Démarches">
            <a href="#a">Lien A</a>
            <a href="#b">Lien B</a>
          </FooterLinks>
        </FooterTop>
        <FooterBottom copyright="Contenus sous licence etalab-2.0">
          <FooterLegalLinks>
            <a href="#plan">Plan du site</a>
            <a href="#mentions">Mentions légales</a>
          </FooterLegalLinks>
        </FooterBottom>
      </Footer>
    )

    const [categoryList, legalList] = screen.getAllByRole('list')
    expect(screen.getByRole('heading', { name: 'Démarches' })).toBeInTheDocument()
    expect(within(categoryList).getAllByRole('listitem')).toHaveLength(2)
    expect(within(legalList).getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Contenus sous licence etalab-2.0')).toBeInTheDocument()
  })

  it('should expose id="footer" by default for the skip link, and let it be overridden', () => {
    const { rerender } = render(<Footer />)
    expect(screen.getByRole('contentinfo')).toHaveAttribute('id', 'footer')

    rerender(<Footer id="pied-de-page" />)
    expect(screen.getByRole('contentinfo')).toHaveAttribute('id', 'pied-de-page')
  })

  it('should lay out 1.2 link columns placed in FooterContent as a spaced grid', () => {
    const { container } = render(
      <Footer>
        <FooterBody>
          <FooterContent>
            <FooterLinks title="Démarches">
              <a href="#a">Lien A</a>
            </FooterLinks>
            {/* biome-ignore lint/complexity/noUselessFragments: vérifie la détection à travers un fragment */}
            <>
              <FooterLinks title="Aide">
                <a href="#b">Lien B</a>
              </FooterLinks>
            </>
          </FooterContent>
        </FooterBody>
      </Footer>
    )

    const columns = container.querySelector('[data-footer-columns]')
    expect(columns).toHaveClass('grid', 'gap-x-6')
    expect(within(columns as HTMLElement).getAllByRole('heading')).toHaveLength(2)
    // Pas de liens institutionnels ajoutés à une composition qui fournit ses propres liens
    expect(screen.queryByRole('link', { name: 'info.gouv.fr' })).not.toBeInTheDocument()
  })
})
