import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Upload } from './upload'

describe('Component: Upload (DSFR)', () => {
  it('links the hint and error to the file input without dangling ids', () => {
    render(
      <Upload
        id="document"
        label="Document justificatif"
        hint="Format PDF, 10 Mo maximum"
        error="Le fichier dépasse 10 Mo"
        success="Fichier ajouté"
      />
    )

    const input = screen.getByLabelText(/Document justificatif/)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'document-hint document-error')
    expect(document.getElementById('document-hint')).toBeInTheDocument()
    expect(document.getElementById('document-error')).toBeInTheDocument()
    expect(document.getElementById('document-success')).not.toBeInTheDocument()
  })
})
