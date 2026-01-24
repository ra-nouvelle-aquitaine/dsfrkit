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

function parseCSSVariables(css: string): Record<string, string> {
  const variables: Record<string, string> = {}
  const regex = /--([^:]+):\s*([^;]+);/g
  let match

  while ((match = regex.exec(css)) !== null) {
    const [, name, value] = match
    // Filtrer les noms de variables valides et les valeurs simples (pas de règles CSS)
    if (
      /^[a-zA-Z][a-zA-Z0-9-]*$/.test(name.trim()) &&
      !value.includes('{') &&
      !value.includes(':before') &&
      !value.includes(':after')
    ) {
      variables[name.trim()] = value.trim()
    }
  }

  return variables
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

  const content = `@import './dsfr-variables.css';\n\n/* Polices DSFR (générées par sync-dsfr) */\n\n/* Marianne - Regular */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Regular.woff2') format('woff2'),\n    url('./fonts/Marianne-Regular.woff') format('woff');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Regular Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Regular_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Regular_Italic.woff') format('woff');\n  font-weight: 400;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Marianne - Medium */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Medium.woff2') format('woff2'),\n    url('./fonts/Marianne-Medium.woff') format('woff');\n  font-weight: 500;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Medium Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Medium_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Medium_Italic.woff') format('woff');\n  font-weight: 500;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Marianne - Bold */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Bold.woff2') format('woff2'),\n    url('./fonts/Marianne-Bold.woff') format('woff');\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Marianne - Bold Italic */\n@font-face {\n  font-family: 'Marianne';\n  src: url('./fonts/Marianne-Bold_Italic.woff2') format('woff2'),\n    url('./fonts/Marianne-Bold_Italic.woff') format('woff');\n  font-weight: 700;\n  font-style: italic;\n  font-display: swap;\n}\n\n/* Spectral - Regular (pour les titres) */\n@font-face {\n  font-family: 'Spectral';\n  src: url('./fonts/Spectral-Regular.woff2') format('woff2'),\n    url('./fonts/Spectral-Regular.woff') format('woff');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* Spectral - ExtraBold */\n@font-face {\n  font-family: 'Spectral';\n  src: url('./fonts/Spectral-ExtraBold.woff2') format('woff2'),\n    url('./fonts/Spectral-ExtraBold.woff') format('woff');\n  font-weight: 800;\n  font-style: normal;\n  font-display: swap;\n}\n`

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
    const lightVariables = parseCSSVariables(coreCss)
    console.log(`   ${Object.keys(lightVariables).length} variables trouvées\n`)

    console.log('🌙 Analyse des variables CSS (dark mode)...')
    const darkVariables = parseCSSVariables(schemeCss)
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

main()
