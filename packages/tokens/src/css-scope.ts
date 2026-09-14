/**
 * Extrait les variables CSS déclarées par une règle de premier niveau.
 *
 * L'extraction est **portée** : seules les déclarations d'un bloc dont la liste
 * de sélecteurs contient exactement `selector`, et qui n'est imbriqué dans
 * aucune at-rule (`@media`, `@supports`, `@-moz-document`…), sont retenues.
 *
 * Une lecture « à plat » du fichier ferait écraser les valeurs de `:root` par
 * les surcharges contextuelles du DSFR — par exemple `--shadow-color` de
 * `:root[data-fr-theme=dark]`, `--underline-img` de `.fr-raw-link[href]` ou
 * `--underline-thickness` du correctif Firefox `@-moz-document`.
 */
export function extractScopedVariables(css: string, selector: string): Record<string, string> {
  const variables: Record<string, string> = {}
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '')

  let depth = 0
  let buffer = ''
  let currentSelector = ''

  for (const char of source) {
    if (char === '{') {
      if (depth === 0) {
        currentSelector = buffer.trim()
        buffer = ''
      }
      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1
      if (depth === 0) {
        const selectors = currentSelector.split(',').map((part) => part.trim())
        if (selectors.includes(selector)) {
          const declaration = /--([A-Za-z][A-Za-z0-9-]*)\s*:\s*([^;}]+)/g
          for (const match of buffer.matchAll(declaration)) {
            variables[match[1]] = match[2].trim().replace(/\s+/g, ' ')
          }
        }
        buffer = ''
      }
      continue
    }

    // Une instruction de premier niveau (`@charset "UTF-8";`) ne fait pas
    // partie du sélecteur du bloc suivant.
    if (char === ';' && depth === 0) {
      buffer = ''
      continue
    }

    buffer += char
  }

  return variables
}
