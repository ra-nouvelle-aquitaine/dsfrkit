const fs = require('node:fs')
const path = require('node:path')

/**
 * Génère `public/llms.txt` et une fiche par module public dans `public/llms/`.
 *
 * La source de vérité est l'index du paquet (`packages/react/src/index.ts`) :
 * chaque nom exporté est suivi à travers les fichiers barils jusqu'à son module
 * d'origine, de sorte que le catalogue liste tous les composants publics, avec
 * leurs vrais noms d'import. Chaque fiche réunit :
 * - l'import (valeurs et types) ;
 * - la description d'usage de la story Storybook du composant ;
 * - la JSDoc des déclarations exportées (exemples compris) ;
 * - le code source des interfaces et types de props exportés.
 */

const REACT_SRC = path.resolve(__dirname, '../../../packages/react/src')
const PACKAGE_INDEX = path.join(REACT_SRC, 'index.ts')
const STORIES_DIR = path.resolve(__dirname, '../src/stories')
const INDEX_FILE = path.resolve(__dirname, '../public/llms.txt')
const LLMS_DIR = path.resolve(__dirname, '../public/llms')

// Modules dont le contenu n'a pas de sens pour une IA (données brutes).
const SKIPPED_MODULES = new Set(['pictograms'])

// Basic instructions pour le fichier INDEX (llms.txt)
const baseInstructions = `# DSFRKit - Instructions pour les IA (LLMs)

Tu travailles dans un projet qui utilise la librairie React \`@dsfrkit/react\`.

## 🚨 RÈGLES ABSOLUES
N'écris JAMAIS de code HTML brut ou de classes Tailwind pour recréer un composant d'interface (Squelette, Flex, Layout, Typographie, Composants UI, etc.). Tu DOIS toujours importer le composant correspondant depuis \`@dsfrkit/react\`.

- Pour fusionner des classes Tailwind avec des composants existants, utilise toujours l'utilitaire \`cn()\`.

## 🌐 Routage (Routing)
DSFRKit s'intègre avec tous les routeurs React (Next.js, React Router, TanStack Router) via le \`RouterProvider\`. 
Une fois configuré, toutes les adresses internes (\`/…\`) des composants DSFRKit passent par le routeur : \`Link\`, \`NavigationItem\`, \`Breadcrumb\`, \`Summary\`, \`Tile\`… Utilise leur prop \`href\` ; \`asChild\` n'est nécessaire que pour envelopper un lien externe à DSFRKit.

## 🎨 Icônes et Artworks (Pictogrammes)
Le projet contient un système dédié pour l'iconographie :
- **Icônes** : Utilise le package \`@dsfrkit/icons\`. Les imports se terminent par \`Icon\` (ex: \`import { MailIcon } from '@dsfrkit/icons'\`). Passe les en prop \`icon\` (ex: \`<Button icon={<MailIcon />} />\`).
- **Artworks** : Le composant \`Artwork\` fournit les pictogrammes officiels DSFR multicolores (ex: \`<Artwork name="environment/sun" size={80} />\`). En cas d'artworks manquants, conseille la commande \`npx @dsfrkit/cli fetch-artworks\`.

## 🧩 Mise en place à la racine de l'application
- \`ThemeProvider\` : thème clair / sombre (obligatoire).
- \`Toaster\` : à monter **une seule fois** si l'application utilise \`toast()\` ou \`useToast()\` ; sans lui, aucune notification ne s'affiche.
- \`RouterProvider\` : facultatif, pour la navigation sans rechargement.
- CSS : \`@import '@dsfrkit/tokens/theme.css';\` en tête de la feuille de styles, preset \`@dsfrkit/config\` dans \`tailwind.config.js\` avec \`./node_modules/@dsfrkit/react/dist/**/*.{js,mjs}\` dans \`content\`.

## 📦 Catalogue

Voici la liste exhaustive des exports publics de \`@dsfrkit/react\`, générée depuis \`packages/react/src/index.ts\`. Chaque fiche donne l'import exact (sous-composants compris), les recommandations d'usage, les exemples et l'interface des props.
`

const resolveModule = (fromFile, specifier) => {
  const base = path.resolve(path.dirname(fromFile), specifier)
  const candidates = [
    `${base}.tsx`,
    `${base}.ts`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ]
  return candidates.find((candidate) => fs.existsSync(candidate))
}

/** Réexportations nommées d'un fichier : `export { A, type B, C as D } from './x'`. */
const parseReExports = (file) => {
  const content = fs.readFileSync(file, 'utf-8')
  const entries = []
  const regex = /export\s+(type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const allTypes = Boolean(match[1])
    const target = resolveModule(file, match[3])
    for (const raw of match[2].split(',')) {
      const part = raw.replace(/\/\/.*$/gm, '').trim()
      if (!part) continue
      const isType = allTypes || part.startsWith('type ')
      const [local, exported] = part.replace(/^type\s+/, '').split(/\s+as\s+/)
      entries.push({ local: local.trim(), name: (exported || local).trim(), isType, target })
    }
  }
  return entries
}

/** Suit un nom à travers les barils (`index.ts`) jusqu'au fichier qui le déclare. */
const resolveOrigin = (file, localName, depth = 0) => {
  if (depth > 5 || !/[\\/]index\.tsx?$/.test(file)) return file
  const entry = parseReExports(file).find((candidate) => candidate.name === localName)
  return entry?.target ? resolveOrigin(entry.target, entry.local, depth + 1) : file
}

// ─── 1. Exports publics regroupés par module d'origine ───────────────────────

const modules = new Map()

for (const entry of parseReExports(PACKAGE_INDEX)) {
  if (!entry.target) continue
  const origin = resolveOrigin(entry.target, entry.local)
  const slug = path.basename(origin).replace(/\.tsx?$/, '')
  if (SKIPPED_MODULES.has(slug)) continue

  if (!modules.has(origin)) {
    modules.set(origin, { file: origin, slug, values: [], types: [] })
  }
  const module = modules.get(origin)
  const list = entry.isType ? module.types : module.values
  if (!list.includes(entry.name)) list.push(entry.name)
}

// ─── 2. Descriptions d'usage issues des stories ──────────────────────────────

const storyDescriptions = new Map()

for (const storyFile of fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith('.stories.tsx'))) {
  const content = fs.readFileSync(path.join(STORIES_DIR, storyFile), 'utf-8')
  const component = content.match(/\bcomponent:\s*([A-Z][A-Za-z0-9]*)\s*,/)
  const description = content.match(/description:\s*\{\s*component:\s*`((?:\\`|[^`])*)`/)
  const title = content.match(/\btitle:\s*['"]([^'"]+)['"]/)
  if (!component) continue
  storyDescriptions.set(component[1], {
    description: description
      ? description[1].replace(/\\`/g, '`').replace(/\\\$/g, '$').trim()
      : '',
    title: title ? title[1] : '',
  })
}

// ─── 3. Extraction depuis le code source ─────────────────────────────────────

const cleanJsdoc = (text) =>
  text
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trimEnd())
    .join('\n')
    .replace(/^\n+|\n+$/g, '')

/** JSDoc placées juste avant une déclaration exportée par le module : `{ name, text }[]`. */
const extractDeclarationDocs = (content, exportedNames) => {
  const docs = []
  const regex =
    /\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*(?:export\s+)?(?:const|function|class|let)\s+([A-Za-z0-9_]+)/g
  let match
  while ((match = regex.exec(content)) !== null) {
    if (!exportedNames.includes(match[2])) continue
    const cleaned = cleanJsdoc(match[1])
    if (cleaned) docs.push({ name: match[2], text: cleaned })
  }
  return docs
}

/** Code source d'une interface ou d'un alias de type (commentaires compris). */
const extractTypeSource = (content, name) => {
  const declaration = new RegExp(
    `(?:\\/\\*\\*(?:(?!\\*\\/)[\\s\\S])*\\*\\/\\s*)?(?:export\\s+)?(interface|type)\\s+${name}\\b`
  )
  const match = declaration.exec(content)
  if (!match) return null

  let depth = 0
  let started = match[1] === 'type'
  for (let i = match.index + match[0].length; i < content.length; i++) {
    const char = content[i]
    if ('{(['.includes(char)) {
      depth++
      started = true
    } else if ('})]'.includes(char)) {
      depth--
      if (depth === 0 && match[1] === 'interface') return content.slice(match.index, i + 1)
    } else if (char === '\n' && started && depth === 0 && match[1] === 'type') {
      const next = content[i + 1]
      if (next && !/[\s|&]/.test(next)) return content.slice(match.index, i).trimEnd()
    }
  }
  return content.slice(match.index).trimEnd()
}

/** Première phrase du premier paragraphe (lignes jointes jusqu'à la ligne vide). */
const firstSentence = (text) => {
  const lines = text.replace(/`/g, '').replace(/\*\*/g, '').split('\n')
  const start = lines.findIndex(
    (line) => line.trim() && !line.startsWith('#') && !line.startsWith('@')
  )
  if (start === -1) return ''
  // Le paragraphe s'arrête à la ligne vide, ou quand une ligne sans ponctuation
  // finale est suivie d'une majuscule (phrase JSDoc écrite sans point).
  const end = lines.findIndex(
    (line, index) =>
      index > start &&
      (!line.trim() || (/^\s*\p{Lu}/u.test(line) && !/[.!?:,;]\s*$/.test(lines[index - 1])))
  )
  const paragraph = lines
    .slice(start, end === -1 ? undefined : end)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  const sentence = paragraph.match(/^.*?[.!?](?=\s|$)/)
  return sentence ? sentence[0] : paragraph
}

// ─── 4. Écriture des fiches ──────────────────────────────────────────────────

if (!fs.existsSync(LLMS_DIR)) fs.mkdirSync(LLMS_DIR, { recursive: true })
for (const file of fs.readdirSync(LLMS_DIR)) {
  if (file.endsWith('.md')) fs.unlinkSync(path.join(LLMS_DIR, file))
}

const pascal = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const sections = { components: [], utilities: [] }

const sortedModules = [...modules.values()].sort((a, b) => a.slug.localeCompare(b.slug))

for (const module of sortedModules) {
  const content = fs.readFileSync(module.file, 'utf-8')
  const isComponent = module.file.includes(`${path.sep}components${path.sep}`)
  const expected = pascal(module.slug).toLowerCase()
  const primary =
    module.values.find((name) => name.toLowerCase() === expected) ||
    module.values.find((name) => /^[A-Z]/.test(name)) ||
    module.values[0] ||
    module.types[0]

  const story = module.values.map((name) => storyDescriptions.get(name)).find(Boolean)
  const declarationDocs = extractDeclarationDocs(content, module.values)
  const typeSources = module.types.map((name) => extractTypeSource(content, name)).filter(Boolean)

  const imports = []
  if (module.values.length) {
    imports.push(`import { ${module.values.join(', ')} } from '@dsfrkit/react'`)
  }
  if (module.types.length) {
    imports.push(`import type { ${module.types.join(', ')} } from '@dsfrkit/react'`)
  }

  const summary =
    firstSentence(story?.description ?? '') ||
    firstSentence(
      (declarationDocs.find((doc) => doc.name === primary) ?? declarationDocs[0])?.text ?? ''
    ) ||
    (isComponent ? `Composant ${primary} de DSFRKit.` : `Utilitaire ${primary} de DSFRKit.`)

  const parts = [
    `# ${isComponent ? 'Composant' : 'Utilitaire'} ${primary}`,
    `> ${summary}`,
    `## Import\n\`\`\`tsx\n${imports.join('\n')}\n\`\`\``,
  ]
  if (story?.description) {
    parts.push(`## Usage recommandé\n${story.description}`)
  }
  if (declarationDocs.length) {
    parts.push(
      `## Documentation et exemples\n${declarationDocs.map((doc) => doc.text).join('\n\n')}`
    )
  }
  if (typeSources.length) {
    parts.push(`## Props et types\n\`\`\`ts\n${typeSources.join('\n\n')}\n\`\`\``)
  }
  if (story?.title) {
    parts.push(`## Storybook\nRubrique : \`${story.title}\``)
  }

  fs.writeFileSync(path.join(LLMS_DIR, `${module.slug}.md`), `${parts.join('\n\n')}\n`)

  const exportsLabel = module.values.length > 1 ? ` (${module.values.join(', ')})` : ''
  const line = `- [${primary}](/llms/${module.slug}.md)${exportsLabel} : ${summary}`
  sections[isComponent ? 'components' : 'utilities'].push(line)
}

const finalIndexContent = `${baseInstructions}
### Composants

${sections.components.join('\n')}

### Fournisseurs, hooks et utilitaires

${sections.utilities.join('\n')}
`
fs.writeFileSync(INDEX_FILE, finalIndexContent)

console.log(
  `✅ llms.txt regénéré : ${sections.components.length} modules de composants et ${sections.utilities.length} modules utilitaires documentés dans /llms/`
)
