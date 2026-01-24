import path from 'node:path'
import chalk from 'chalk'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'

export async function fetchArtworks() {
  console.log(chalk.bold.blue('\n🇫🇷 Téléchargement des Artworks DSFR\n'))

  const spinner = ora('Téléchargement depuis le dépôt officiel...').start()

  try {
    // Determine public directory
    const publicDir = path.join(process.cwd(), 'public')
    if (!(await fs.pathExists(publicDir))) {
      await fs.ensureDir(publicDir)
    }

    const targetDir = path.join(publicDir, 'dist', 'artwork')

    // Create a temporary directory for sparse cloning
    const tmpDir = path.join(process.cwd(), 'node_modules', '.cache', `dsfr-fetch-${Date.now()}`)
    await fs.ensureDir(tmpDir)

    try {
      // 1. Init sparse repo
      await execa(
        'git',
        [
          'clone',
          '--depth',
          '1',
          '--filter=blob:none',
          '--sparse',
          'https://github.com/GouvernementFR/dsfr.git',
          '.',
        ],
        { cwd: tmpDir }
      )

      // 2. Set sparse checkout path
      await execa('git', ['sparse-checkout', 'set', 'src/dsfr/core/asset/artwork'], { cwd: tmpDir })

      // 3. Ensure target directory exists
      await fs.ensureDir(targetDir)

      // 4. Copy artworks
      const sourceDir = path.join(tmpDir, 'src', 'dsfr', 'core', 'asset', 'artwork')
      await fs.copy(sourceDir, targetDir, { overwrite: true })

      spinner.succeed('Artworks téléchargés avec succès !')
      console.log(
        chalk.dim(`\nLes fichiers ont été copiés dans : ${chalk.bold('public/dist/artwork')}`)
      )
      console.log(chalk.dim('Vous pouvez maintenant utiliser les composants comme ThemeToggle.\n'))
    } finally {
      // Cleanup
      await fs.remove(tmpDir).catch(() => {})
    }
  } catch (error) {
    spinner.fail('Erreur lors du téléchargement des artworks.')
    console.error(error)
    throw error
  }
}
