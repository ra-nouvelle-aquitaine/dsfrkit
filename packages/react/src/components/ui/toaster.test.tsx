import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toaster } from './toaster'
import { toast } from './use-toast'

describe('Component: Toaster', () => {
  it('should render the notifications queued by toast() once mounted', async () => {
    render(<Toaster />)

    act(() => {
      toast({ title: 'Brouillon enregistré', description: 'Disponible dans votre espace.' })
    })

    expect(await screen.findByText('Brouillon enregistré')).toBeInTheDocument()
    expect(screen.getByText('Disponible dans votre espace.')).toBeInTheDocument()
  })

  it('should render nothing without a mounted Toaster', () => {
    render(<p>Page</p>)

    act(() => {
      toast({ title: 'Notification invisible' })
    })

    expect(screen.queryByText('Notification invisible')).not.toBeInTheDocument()
  })
})
