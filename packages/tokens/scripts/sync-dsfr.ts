#!/usr/bin/env npx ts-node

/**
 * Script de synchronisation des tokens DSFR
 * Récupère les dernières valeurs depuis le DSFR officiel
 *
 * Usage: pnpm sync:dsfr
 */

import fs from 'node:fs/promises'
import https from 'node:https'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractScopedVariables } from '../src/css-scope'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('🔄 Synchronisation avec le DSFR officiel...')

async function getLatestDSFRVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get('https://registry.npmjs.org/@gouvfr/dsfr/latest', (res) => {
        let data = ''
        res.on('data', (chunk: string) => (data += chunk))
        res.on('end', () => {
          try {
            const json = JSON.parse(data) as { version: string }
            resolve(json.version)
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', reject)
  })
}

async function fetchFile(url: string, asText = false): Promise<string | Buffer> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk: Buffer) => chunks.push(chunk))
        res.on('end', () => {
          const data = Buffer.concat(chunks)
          resolve(asText ? data.toString('utf8') : data)
        })
      })
      .on('error', reject)
  })
}

function extractColors(variables: Record<string, string>): Record<string, string> {
  const colors: Record<string, string> = {}
  Object.entries(variables).forEach(([name, value]) => {
    if (
      name.startsWith('blue-france') ||
      name.startsWith('red-marianne') ||
      name.startsWith('grey') ||
      name.startsWith('info') ||
      name.startsWith('success') ||
      name.startsWith('warning') ||
      name.startsWith('error')
    ) {
      colors[name] = value
    }
  })
  return colors
}

const FONT_FILES = [
  'Marianne-Regular.woff2',
  'Marianne-Regular.woff',
  'Marianne-Regular_Italic.woff2',
  'Marianne-Regular_Italic.woff',
  'Marianne-Medium.woff2',
  'Marianne-Medium.woff',
  'Marianne-Medium_Italic.woff2',
  'Marianne-Medium_Italic.woff',
  'Marianne-Bold.woff2',
  'Marianne-Bold.woff',
  'Marianne-Bold_Italic.woff2',
  'Marianne-Bold_Italic.woff',
  'Spectral-Regular.woff2',
  'Spectral-Regular.woff',
  'Spectral-ExtraBold.woff2',
  'Spectral-ExtraBold.woff',
]

async function downloadFonts(dsfrVersion: string): Promise<void> {
  const fontsDir = path.join(__dirname, '../src/fonts')
  await fs.mkdir(fontsDir, { recursive: true })

  console.log('📥 Téléchargement des polices DSFR...')
  for (const fontFile of FONT_FILES) {
    const url = `https://raw.githubusercontent.com/GouvernementFR/dsfr/v${dsfrVersion}/src/dsfr/core/asset/fonts/${fontFile}`

    const targetPath = path.join(fontsDir, fontFile)
    try {
      const data = (await fetchFile(url, false)) as Buffer
      await fs.writeFile(targetPath, data)
      console.log(`   ✅ ${fontFile}`)
    } catch (error) {
      console.error(`   ❌ Erreur pour ${fontFile}:`, error)
    }
  }
  console.log(`   ${FONT_FILES.length} polices téléchargées\n`)
}

async function generateCSSVariablesFile(
  lightVariables: Record<string, string>,
  darkVariables: Record<string, string>
): Promise<void> {
  const cssPath = path.join(__dirname, '../src/dsfr-variables.css')

  // Light mode (default :root)
  const lightBlock = `:root {\n${Object.entries(lightVariables)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')}\n}\n`

  // Dark mode — under multiple selectors for compatibility
  const darkVarsStr = Object.entries(darkVariables)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')

  const darkBlock = `\n/* Dark mode — DSFR scheme.css */\n.dark,\n[data-theme="dark"],\n[data-fr-theme="dark"] {\n${darkVarsStr}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not(.light):not([data-theme="light"]):not([data-fr-theme="light"]) {\n${darkVarsStr}\n  }\n}\n`

  const finalContent = `${lightBlock}${darkBlock}`
  await fs.writeFile(cssPath, finalContent)
  console.log(
    '📝 Fichier CSS des variables généré: packages/tokens/src/dsfr-variables.css (light + dark)\n'
  )
}

async function generateThemeCssFile(): Promise<void> {
  const themePath = path.join(__dirname, '../src/theme.css')

  const content = `@import './dsfr-variables.css';\n\n/* Jetons de focus DSFR.\n  Le DSFR fixe la couleur de focus à #0a76f6 directement dans les règles\n  outline-color de core.css, sans l'exposer comme variable CSS. On la\n  déclare donc ici comme jeton unique du design system, afin qu'aucun\n  composant ne porte de couleur codée en dur et que la valeur reste\n  surchargeable. Elle est volontairement identique en thème clair et sombre.\n*/\n:root {\n  --dsfr-focus-default: #0a76f6;\n  --dsfr-focus-offset: var(--background-default-grey);\n\n  /* Voile des surfaces modales (.fr-modal), également codé en dur par le\n     DSFR et identique dans les deux thèmes. */\n  --dsfr-overlay: rgba(22, 22, 22, 0.64);\n\n  /* Fait suivre le thème aux contrôles natifs du navigateur : bouton de\n     sélection de fichier, ascenseurs, sélecteurs de date. Sans cette\n     déclaration ils restent clairs en thème sombre, car ils suivent le\n     réglage du système et non l'attribut de thème de la page. */\n  color-scheme: light;\n}\n\n.dark,\n[data-theme="dark"],\n[data-fr-theme="dark"] {\n  color-scheme: dark;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not(.light):not([data-theme="light"]):not([data-fr-theme="light"]) {\n    color-scheme: dark;\n  }\n}\n\n/* Polices DSFR (générées par sync-dsfr) */\n\n/* Marianne - Regular */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Regular.woff2') format('woff2'),\n    url('./fonts/Marianne-Regular.woff') format('woff');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Regular Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Regular_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Regular_Italic.woff') format('woff');\n  font-weight: 400;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Marianne - Medium */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Medium.woff2') format('woff2'),\n    url('./fonts/Marianne-Medium.woff') format('woff');\n  font-weight: 500;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Medium Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Medium_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Medium_Italic.woff') format('woff');\n  font-weight: 500;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Marianne - Bold */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Bold.woff2') format('woff2'),\n    url('./fonts/Marianne-Bold.woff') format('woff');\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Bold Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Bold_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Bold_Italic.woff') format('woff');\n  font-weight: 700;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Spectral - Regular (pour les titres) */\n@font-face {\n  font-family: 'Spectral';\n  src: url('./fonts/Spectral-Regular.woff2') format('woff2'),\n    url('./fonts/Spectral-Regular.woff') format('woff');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Spectral - ExtraBold */\n@font-face {\n  font-family: 'Spectral';\n  src: url('./fonts/Spectral-ExtraBold.woff2') format('woff2'),\n    url('./fonts/Spectral-ExtraBold.woff') format('woff');\n  font-weight: 800;\n  font-style: normal;\n  font-display: swap;\n}\n\n/*\n  Support des artworks DSFR.\n  Ces classes sont utilisées dans les SVG DSFR via <use className="...">\n  pour adapter automatiquement les couleurs aux thèmes clair et sombre.\n  Elles ne proviennent pas du CSS officiel : elles doivent être conservées\n  à chaque régénération.\n*/\n.fr-artwork-decorative {\n  fill: var(--artwork-decorative-blue-france);\n}\n\n.fr-artwork-minor {\n  fill: var(--artwork-minor-red-marianne);\n}\n\n.fr-artwork-major {\n  fill: var(--artwork-major-blue-france);\n}\n`

  await fs.writeFile(themePath, content)
  console.log('📝 Fichier theme.css généré: packages/tokens/src/theme.css')
}

async function main(): Promise<void> {
  try {
    console.log('📦 Vérification de la dernière version DSFR...')
    const latestVersion = await getLatestDSFRVersion()
    console.log(`   Latest version: ${latestVersion}`)

    const DSFR_VERSION = latestVersion
    const DSFR_CORE_CSS_URL = `https://unpkg.com/@gouvfr/dsfr@${DSFR_VERSION}/dist/core/core.css`
    const DSFR_SCHEME_CSS_URL = `https://unpkg.com/@gouvfr/dsfr@${DSFR_VERSION}/dist/scheme/scheme.css`

    console.log(`Version cible : ${DSFR_VERSION}\n`)

    console.log('📥 Téléchargement du CSS DSFR (core + scheme)...')
    const coreCss = (await fetchFile(DSFR_CORE_CSS_URL, true)) as string
    console.log(`   core.css: ${coreCss.length} caractères`)
    const schemeCss = (await fetchFile(DSFR_SCHEME_CSS_URL, true)) as string
    console.log(`   scheme.css: ${schemeCss.length} caractères\n`)

    console.log('🔍 Analyse des variables CSS (light mode)...')
    const lightVariables = extractScopedVariables(coreCss, ':root')
    console.log(`   ${Object.keys(lightVariables).length} variables trouvées\n`)

    console.log('🌙 Analyse des variables CSS (dark mode)...')
    // Le thème sombre est décrit par scheme.css, mais core.css porte aussi
    // quelques surcharges sombres (dont --shadow-color) sous le même sélecteur.
    const darkVariables = {
      ...extractScopedVariables(schemeCss, ':root[data-fr-theme=dark]'),
      ...extractScopedVariables(coreCss, ':root[data-fr-theme=dark]'),
    }
    console.log(`   ${Object.keys(darkVariables).length} variables dark trouvées\n`)

    console.log('📝 Génération du fichier CSS des variables (light + dark)...')
    await generateCSSVariablesFile(lightVariables, darkVariables)

    console.log('🎨 Extraction des couleurs...')
    const colors = extractColors(lightVariables)
    console.log(`   ${Object.keys(colors).length} couleurs extraites\n`)

    console.log('Échantillon:')
    Object.entries(colors)
      .slice(0, 10)
      .forEach(([name, value]) => {
        console.log(`   --${name}: ${value}`)
      })

    await downloadFonts(DSFR_VERSION)

    // Générer le fichier theme.css dans tokens qui importe les variables + déclare les @font-face
    await generateThemeCssFile()

    const reportPath = path.join(__dirname, '../.sync-report.json')
    const report = {
      timestamp: new Date().toISOString(),
      dsfrVersion: DSFR_VERSION,
      latestVersion,
      variablesCount: Object.keys(lightVariables).length,
      darkVariablesCount: Object.keys(darkVariables).length,
      colorsCount: Object.keys(colors).length,
      fontsCount: 16,
      needsUpdate: latestVersion !== DSFR_VERSION,
    }

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
    console.log('\n✅ Rapport créé: .sync-report.json')
  } catch (error) {
    console.error('\n❌ Erreur:', error)
    process.exit(1)
  }
}

// N'exécute la synchronisation que lorsque le script est lancé directement.
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
if (invokedPath === fileURLToPath(import.meta.url)) {
  main()
}
