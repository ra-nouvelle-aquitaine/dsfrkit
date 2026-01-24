import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

describe('Component: Accordion (DSFR/Radix)', () => {
  it('should hide contents natively until expanded, with proper ARIA controls', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="section1">
          <AccordionTrigger>Comment obtenir un passeport ?</AccordionTrigger>
          <AccordionContent>Veuillez vous adresser à votre mairie.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    // Verify trigger properties
    const trigger = screen.getByRole('button', { name: 'Comment obtenir un passeport ?' })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Radix dynamically removes generic content from tree when collapsed usually.
    expect(screen.queryByText('Veuillez vous adresser à votre mairie.')).not.toBeInTheDocument()

    // Perform expansion
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Veuillez vous adresser à votre mairie.')).toBeVisible()
  })

  it('should flawlessly support multiple expansions mode', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="multiple">
        <AccordionItem value="s1">
          <AccordionTrigger>T1</AccordionTrigger>
          <AccordionContent>C1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="s2">
          <AccordionTrigger>T2</AccordionTrigger>
          <AccordionContent>C2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: 'T1' }))
    await user.click(screen.getByRole('button', { name: 'T2' }))

    // In a multiple accordion, both regions are open simultaneously
    expect(screen.getByRole('button', { name: 'T1' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'T2' })).toHaveAttribute('aria-expanded', 'true')
  })
})
