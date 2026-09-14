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
})
