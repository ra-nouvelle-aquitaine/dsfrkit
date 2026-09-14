import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { extractScopedVariables } from './css-scope'

const css = readFileSync(join(__dirname, 'dsfr-variables.css'), 'utf8')
const light = extractScopedVariables(css, ':root')
const dark = extractScopedVariables(css, '[data-fr-theme="dark"]')

/**
 * Ces variables étaient auparavant écrasées dans `:root` par des surcharges
 * contextuelles du DSFR (thème sombre, `.fr-raw-link`, correctif Firefox
 * `@-moz-document`), parce que la synchronisation lisait le CSS « à plat ».
 * Le rendu clair héritait notamment d'une ombre deux fois trop opaque.
 */
describe('dsfr-variables.css — portée des surcharges DSFR', () => {
  it('utilise l’ombre du thème clair dans :root', () => {
    expect(light['shadow-color']).toBe('rgba(0, 0, 18, 0.16)')
    expect(light['raised-shadow']).toBe('0 1px 3px var(--shadow-color)')
  })

  it('réserve l’ombre plus opaque au thème sombre', () => {
    expect(dark['shadow-color']).toBe('rgba(0, 0, 18, 0.32)')
  })

  it('conserve le mécanisme de soulignement officiel dans :root', () => {
    expect(light['text-decoration']).toBe('none')
    expect(light['underline-img']).toBe('linear-gradient(0deg, currentColor, currentColor)')
    expect(light['underline-hover-width']).toBe('0')
    expect(light['underline-thickness']).toBe('0.0625em')
  })

  it('n’hérite pas des surcharges de .fr-raw-link', () => {
    expect(light['external-link-content']).toBe("''")
  })

  it('ne fait pas fuiter les variables locales des composants dans :root', () => {
    for (const name of ['hover', 'active', 'icon-size', 'collapse', 'collapser', 'brighten']) {
      expect(light).not.toHaveProperty(name)
    }
  })
})

describe('extractScopedVariables', () => {
  it('ignore les blocs imbriqués dans une at-rule', () => {
    const sample = `
      :root { --a: 1; }
      @media (min-width: 48em) { :root { --a: 2; } }
      @-moz-document url-prefix() { :root { --a: 3; } }
    `
    expect(extractScopedVariables(sample, ':root')).toEqual({ a: '1' })
  })

  it('ignore les autres sélecteurs et les instructions de premier niveau', () => {
    const sample = `@charset "UTF-8"; :root { --a: 1; } .fr-raw-link { --a: 9; }`
    expect(extractScopedVariables(sample, ':root')).toEqual({ a: '1' })
  })

  it('retient chaque sélecteur d’une liste', () => {
    const sample = `.dark, [data-fr-theme="dark"] { --a: 1; }`
    expect(extractScopedVariables(sample, '[data-fr-theme="dark"]')).toEqual({ a: '1' })
  })
})
