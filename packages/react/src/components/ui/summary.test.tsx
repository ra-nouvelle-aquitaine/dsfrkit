import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Summary } from './summary'

const items = [
  { label: 'Conditions', href: '#conditions' },
  {
    label: 'Démarche',
    href: '#demarche',
    items: [
      { label: 'Documents', href: '#documents' },
      { label: 'Délais', href: '#delais' },
    ],
  },
]

describe('Component: Summary (fr-summary)', () => {
  it('should expose a navigation landmark named by its title', () => {
    render(<Summary items={items} />)

    const nav = screen.getByRole('navigation', { name: 'Sommaire' })
    expect(within(nav).getByRole('heading', { level: 2, name: 'Sommaire' })).toBeInTheDocument()
  })

  it('should render nested ordered lists with anchor links', () => {
    render(<Summary items={items} />)

    const [rootList, nestedList] = screen.getAllByRole('list')
    expect(rootList.tagName).toBe('OL')
    expect(within(rootList).getAllByRole('listitem')).toHaveLength(4)
    expect(within(nestedList).getAllByRole('listitem')).toHaveLength(2)

    // Le numéro est décoratif : le nom accessible reste l'intitulé seul.
    expect(screen.getByRole('link', { name: 'Délais' })).toHaveAttribute('href', '#delais')
  })

  it('should number sub-sections after their parent', () => {
    render(<Summary items={items} />)

    const numbers = Array.from(document.querySelectorAll('a > span[aria-hidden="true"]')).map(
      (span) => span.textContent?.trim()
    )
    expect(numbers).toEqual(['1.', '2.', '2.1.', '2.2.'])
  })

  it('should let the title level follow the page hierarchy', () => {
    render(<Summary items={items} title="Sur cette page" titleAs="h3" />)

    expect(screen.getByRole('heading', { level: 3, name: 'Sur cette page' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Sur cette page' })).toBeInTheDocument()
  })
})
