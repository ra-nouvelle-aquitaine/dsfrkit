const fs = require('node:fs')
const path = require('node:path')

const COMPONENTS_DIR = path.resolve(__dirname, '../../../packages/react/src/components')
const INDEX_FILE = path.resolve(__dirname, '../public/llms.txt')
const LLMS_DIR = path.resolve(__dirname, '../public/llms')

// Fonction pour scanner récursivement les dossiers
const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist
  fs.readdirSync(dir).forEach((file) => {
    const dirFile = path.join(dir, file)
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist)
    } else {
      filelist.push(dirFile)
    }
  })
  return filelist
}

// Basic instructions pour le fichier INDEX (llms.txt)
const baseInstructions = `# DSFRKit - Instructions pour les IA (LLMs)

Tu travailles dans un projet qui utilise la librairie React \`@dsfrkit/react\`.

## 🚨 RÈGLES ABSOLUES
N'écris JAMAIS de code HTML brut ou de classes Tailwind pour recréer un composant d'interface (Squelette, Flex, Layout, Typographie, Composants UI, etc.). Tu DOIS toujours importer le composant correspondant depuis \`@dsfrkit/react\`.

- Pour fusionner des classes Tailwind avec des composants existants, utilise toujours l'utilitaire \`cn()\`.

## 🌐 Routage (Routing)
DSFRKit s'intègre avec tous les routeurs React (Next.js, React Router, TanStack Router) via le \`RouterProvider\`. 
Une fois configuré, utilise le composant \`<Link asChild>\` de DSFRKit pour la navigation, ou les props \`href\` natives de DSFRKit (sur Button, Tile, etc.).

## 🎨 Icônes et Artworks (Pictogrammes)
Le projet contient un système dédié pour l'iconographie :
- **Icônes** : Utilise le package \`@dsfrkit/icons\`. Les imports se terminent par \`Icon\` (ex: \`import { MailIcon } from '@dsfrkit/icons'\`). Passe les en prop \`icon\` (ex: \`<Button icon={<MailIcon />} />\`).
- **Artworks** : Le composant \`Artwork\` fournit les pictogrammes officiels DSFR multicolores (ex: \`<Artwork name="environment/sun" size={80} />\`). En cas d'artworks manquants, conseille la commande \`npx @dsfrkit/cli fetch-artworks\`.

## 📦 Composants disponibles (UI, Layout, Typographie...)

Voici le catalogue des composants du design system localisés. Consulte leur documentation respective en suivant les liens pour générer le code de l'interface demandée :

`

// Ensure output dirs exist
if (!fs.existsSync(LLMS_DIR)) {
  fs.mkdirSync(LLMS_DIR, { recursive: true })
}
const outputDir = path.dirname(INDEX_FILE)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const files = walkSync(COMPONENTS_DIR).filter(
  (f) =>
    f.endsWith('.tsx') &&
    !f.includes('.test.tsx') &&
    !f.includes('.stories.tsx') &&
    !f.includes('index.tsx') &&
    !f.includes('index.ts')
)

const indexLinks = []

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8')
  // Component name from filename (e.g., box.tsx -> Box, text.tsx -> Text)
  const basename = path.basename(file, '.tsx')
  const slug = basename.toLowerCase()
  const componentName = basename
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  const jsdocRegex = /\/\*\*([\s\S]*?)\*\//g
  let match
  let componentDocs = ''

  while ((match = jsdocRegex.exec(content)) !== null) {
    const docText = match[1]
    if (
      docText.toLowerCase().includes('composant') ||
      docText.includes('@example') ||
      docText.toLowerCase().includes('exemple')
    ) {
      const cleaned = docText
        .split('\n')
        .map((line) => line.replace(/^[\s]*\*/, '').trim())
        .filter((line) => line.length > 0)
        .join('\n')

      if (cleaned) {
        componentDocs += `${cleaned}\n\n`
      }
    }
  }

  // Si on a extrait de la documentation utile pour ce fichier
  if (componentDocs) {
    const mdContent = `# Composant ${componentName}\n\n## Import\n\`\`\`tsx\nimport { ${componentName} } from '@dsfrkit/react'\n\`\`\`\n\n## Documentation et Usages\n${componentDocs.trim()}\n`

    // Ecrire le fichier markdown individuel du composant
    const mdFilePath = path.join(LLMS_DIR, `${slug}.md`)
    fs.writeFileSync(mdFilePath, mdContent)

    // Ajouter le lien dans l'index llmstxt
    indexLinks.push(
      `- [${componentName}](/llms/${slug}.md): Documentation technique, interface de Props et exemples d'utilisation.`
    )
  }
}

// Générer l'index final llms.txt avec la liste des liens
const finalIndexContent = `${baseInstructions + indexLinks.join('\n')}\n`
fs.writeFileSync(INDEX_FILE, finalIndexContent)

console.log(
  `✅ Fichier llms.txt regénéré avec succès ("${indexLinks.length}" composants liés dans /llms/)`
)
