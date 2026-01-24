import { describe, expect, it } from 'vitest'
import { componentTemplates } from './templates'

describe('CLI Installation Templates', () => {
  it('should export a comprehensive map of component templates', () => {
    expect(componentTemplates).toBeDefined()

    // Core components should exist
    expect(componentTemplates.button).toBeDefined()
    expect(componentTemplates.card).toBeDefined()
    expect(componentTemplates.alert).toBeDefined()
    expect(componentTemplates.input).toBeDefined()
    expect(componentTemplates.modal).toBeDefined()
    expect(componentTemplates.select).toBeDefined()
  })

  it('should contain valid React structures with CVA for essential variants', () => {
    expect(componentTemplates.button).toContain('const buttonVariants = cva(')
    expect(componentTemplates.alert).toContain('const alertVariants = cva(')
    expect(componentTemplates.card).toContain('const cardVariants = cva(')
    expect(componentTemplates.input).toContain('const inputVariants = cva(')
  })

  it('should enforce strict import formats for external libraries', () => {
    // Buttons uses radix/cva/react
    expect(componentTemplates.button).toContain('import * as React')
    expect(componentTemplates.button).toContain('class-variance-authority')
    expect(componentTemplates.button).toContain('@/lib/utils')

    // Modal uses Radix
    expect(componentTemplates.modal).toContain('@radix-ui/react-dialog')
  })
})
