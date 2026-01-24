import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function copyFile(src: string, dest: string): Promise<void> {
  await fs.mkdir(path.dirname(dest), { recursive: true })
  await fs.copyFile(src, dest)
}

async function copyDir(srcDir: string, destDir: string): Promise<number> {
  try {
    const entries = await fs.readdir(srcDir, { withFileTypes: true })
    let copied = 0
    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name)
      const destPath = path.join(destDir, entry.name)
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath)
      } else if (entry.isFile()) {
        await copyFile(srcPath, destPath)
        copied++
      }
    }
    return copied
  } catch (_err) {
    // le répertoire n'existe pas
    return 0
  }
}

async function main(): Promise<void> {
  const root = path.join(__dirname, '..')
  const src = path.join(root, 'src')
  const dist = path.join(root, 'dist')

  await fs.mkdir(dist, { recursive: true })

  // Copier les fichiers CSS (et fournir un repli si theme.css est manquant)
  const cssFiles = ['dsfr-variables.css', 'theme.css']
  for (const f of cssFiles) {
    const s = path.join(src, f)
    const d = path.join(dist, f)
    try {
      await copyFile(s, d)
      console.log(`Copié ${f}`)
    } catch (_err) {
      if (f === 'theme.css') {
        // theme.css est important ; créer un repli minimal qui importe dsfr-variables si disponible
        const fallbackExists = await fs
          .access(path.join(src, 'dsfr-variables.css'))
          .then(() => true)
          .catch(() => false)
        const fallbackContent = fallbackExists
          ? "@import './dsfr-variables.css';\n/* Repli theme.css généré par scripts/copy-assets.ts — exécutez 'pnpm -w --filter @dsfrkit/tokens run sync:dsfr' pour remplir avec les vrais jetons */\n"
          : "/* theme.css introuvable. Exécutez 'pnpm -w --filter @dsfrkit/tokens run sync:dsfr' pour générer les jetons. */\n"
        try {
          await fs.writeFile(d, fallbackContent)
          console.warn(`⚠️ ${f} était manquant dans src — repli créé dans dist (${d})`)
        } catch (writeErr) {
          console.error(`❌ Échec de l'écriture du repli pour ${f} :`, writeErr)
        }
      } else {
        console.warn(`⚠️ ${f} introuvable dans src, ignoré.`)
      }
    }
  }

  // Copier les polices
  const fontsCopied = await copyDir(path.join(src, 'fonts'), path.join(dist, 'fonts'))
  if (fontsCopied > 0) console.log(`Copié ${fontsCopied} polices`)
  else console.warn('⚠️ Aucune police copiée (répertoire src/fonts absent ou vide)')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
