import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import prompts from 'prompts'
import { fetchArtworks } from './fetch-artworks'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function init() {
  console.log(chalk.bold.blue('\n🇫🇷 Initialisation du projet DSFRKit\n'))

  // Vérifier si nous sommes dans un projet initialisé
  const hasPackageJson = await fs.pathExists('package.json')
  let packageManager = 'npm'

  if (!hasPackageJson) {
    console.log(chalk.yellow('⚠️  Aucun dépôt formel détecté (package.json introuvable).'))
    const createVite = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Voulez-vous initialiser un nouveau projet React avec Vite maintenant ?',
      initial: true,
    })

    if (createVite.value) {
      const pmPrompt = await prompts({
        type: 'select',
        name: 'pm',
        message: 'Quel gestionnaire de paquets utiliser ?',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'pnpm', value: 'pnpm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'bun', value: 'bun' },
        ],
        initial: 0,
      })
      packageManager = pmPrompt.pm

      const viteSpinner = ora('Création du projet Vite...').start()
      try {
        const createCmd = packageManager === 'npm' || packageManager === 'bun' ? 'create' : 'create'
        await execa(packageManager, [
          createCmd,
          'vite@latest',
          '.',
          '--template',
          'react-ts',
          '--yes',
        ])
        viteSpinner.succeed('Projet Vite créé avec succès')

        // Installer les dépendances fraîchement créées
        const installSpinner = ora('Installation des dépendances de base...').start()
        await execa(packageManager, ['install'])
        installSpinner.succeed('Dépendances de base installées')
      } catch (error) {
        viteSpinner.fail('Erreur lors de la création du projet Vite')
        console.error(error)
        process.exit(1)
      }
    } else {
      console.log(
        chalk.yellow('Veuillez initialiser un projet (ex: npm init) avant de configurer DSFRKit.')
      )
      process.exit(1)
    }
  } else {
    // Détecter le gestionnaire de paquets si le projet existe
    packageManager = await detectPackageManager()
  }

  // Questions de configuration
  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: 'Où voulez-vous stocker les composants ?',
      initial: 'src/components/ui',
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Installer les dépendances nécessaires ?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'fetchArtworks',
      message: 'Télécharger les icônes et SVG officiels DSFR (recommandé) ?',
      initial: true,
    },
    {
      type: 'multiselect',
      name: 'llmTools',
      message: "Quels outils d'assistance IA utilisez-vous ? (Optionnel)",
      choices: [
        { title: 'GitHub Copilot', value: 'copilot' },
        { title: 'Claude Code', value: 'claude' },
        { title: 'Cursor', value: 'cursor' },
        { title: 'Windsurf', value: 'windsurf' },
        { title: 'OpenAI Codex', value: 'codex' },
        { title: 'Autre (AGENTS.md)', value: 'agents' },
      ],
      instructions: false,
      hint: '- Espace pour sélectionner. Entrée pour valider (vide pour ignorer).',
    },
  ])

  if (!response.componentsPath) {
    console.log(chalk.yellow('❌ Initialisation annulée'))
    process.exit(0)
  }

  const spinner = ora('Configuration en cours...').start()

  try {
    // Créer le dossier des composants
    const componentsDir = path.join(process.cwd(), response.componentsPath)
    await fs.ensureDir(componentsDir)

    // Créer le fichier utils
    const libDir = path.join(process.cwd(), 'src/lib')
    await fs.ensureDir(libDir)

    const utilsContent = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    await fs.writeFile(path.join(libDir, 'utils.ts'), utilsContent)

    // Créer ou mettre à jour tailwind.config
    await createTailwindConfig()

    spinner.succeed('Configuration créée avec succès')

    // Installer les dépendances
    if (response.installDeps) {
      const depsSpinner = ora('Installation des dépendances...').start()

      try {
        // Installer les dépendances de développement (preset et outils)
        await execa(packageManager, [
          packageManager === 'npm' ? 'install' : 'add',
          '-D',
          '@dsfrkit/config',
          'tailwindcss',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
        ])
        depsSpinner.succeed('Dépendances de développement installées')
      } catch (error) {
        depsSpinner.fail("Erreur lors de l'installation des dépendances de développement")
        console.error(error)
      }

      // Détecter si le projet se trouve dans un monorepo (ex: pnpm workspace)
      async function findMonorepoRoot(): Promise<string | null> {
        let dir = process.cwd()
        while (true) {
          if (await fs.pathExists(path.join(dir, 'pnpm-workspace.yaml'))) return dir
          const pkgPath = path.join(dir, 'package.json')
          if (await fs.pathExists(pkgPath)) {
            try {
              const pkg = await fs.readJSON(pkgPath)
              if (pkg.workspaces) return dir
            } catch {}
          }
          const parent = path.dirname(dir)
          if (parent === dir) break
          dir = parent
        }
        return null
      }

      const monorepoRoot = await findMonorepoRoot()
      // Utiliser le protocole workspace:* uniquement si on est dans un monorepo pnpm local
      const tokensSpecifier =
        packageManager === 'pnpm' && monorepoRoot
          ? '@dsfrkit/tokens@workspace:*'
          : '@dsfrkit/tokens'

      const tokensSpinner = ora(`Installation de ${tokensSpecifier}...`).start()
      try {
        await execa(packageManager, [packageManager === 'npm' ? 'install' : 'add', tokensSpecifier])
        tokensSpinner.succeed(`${tokensSpecifier} installé`)
      } catch (error) {
        tokensSpinner.fail("Erreur lors de l'installation de @dsfrkit/tokens")
        console.error(error)
      }
    }

    // Téléchargement des artworks
    if (response.fetchArtworks) {
      try {
        await fetchArtworks()
      } catch (_e) {
        console.log(
          chalk.yellow(
            '\n⚠️  Le téléchargement des artworks a échoué. Vous pourrez réessayer avec la commande: dsfrkit fetch-artworks\n'
          )
        )
      }
    }

    if (response.llmTools && response.llmTools.length > 0) {
      const llmSpinner = ora('Création des instructions IA...').start()
      try {
        const aiRulesContent = `# RÈGLES DSFRKIT POUR LES IA
Tu utilises la librairie @dsfrkit/react. N'écris JAMAIS de composants d'UI en HTML brut ou classes Tailwind.
Pour la documentation complète et à jour de tous les composants (props, exemples, layouts), réfère-toi toujours à ce fichier :
https://ra-nouvelle-aquitaine.github.io/dsfrkit/llms.txt
`
        const tools = response.llmTools as string[]
        for (const tool of tools) {
          if (tool === 'copilot') {
            const githubDir = path.join(process.cwd(), '.github')
            await fs.ensureDir(githubDir)
            await fs.writeFile(path.join(githubDir, 'copilot-instructions.md'), aiRulesContent)
          } else if (tool === 'claude') {
            await fs.writeFile(path.join(process.cwd(), 'clauderc.md'), aiRulesContent)
          } else if (tool === 'cursor') {
            await fs.writeFile(path.join(process.cwd(), '.cursorrules'), aiRulesContent)
          } else if (tool === 'windsurf') {
            await fs.writeFile(path.join(process.cwd(), '.windsurfrules'), aiRulesContent)
          } else if (tool === 'agents' || tool === 'codex') {
            await fs.writeFile(path.join(process.cwd(), 'AGENTS.md'), aiRulesContent)
          }
        }

        const list = tools.join(', ')
        llmSpinner.succeed(`Fichiers d'instructions IA générés pour : ${list}`)
      } catch (_error) {
        llmSpinner.fail("Erreur lors de la création des fichiers d'instructions IA")
      }
    }

    console.log(chalk.green('\n✅ Projet initialisé avec succès !\n'))
    console.log(chalk.dim('Prochaines étapes :'))
    console.log(chalk.dim(`  1. Vérifiez votre ${chalk.bold('tailwind.config.js')}`))
    console.log(
      chalk.dim(`  2. Ajoutez des composants : ${chalk.bold('dsfrkit add button alert')}`)
    )
    console.log()
  } catch (error) {
    spinner.fail('Erreur lors de la configuration')
    console.error(error)
    process.exit(1)
  }
}

async function detectPackageManager(): Promise<string> {
  if (await fs.pathExists('pnpm-lock.yaml')) return 'pnpm'
  if (await fs.pathExists('yarn.lock')) return 'yarn'
  if (await fs.pathExists('bun.lockb')) return 'bun'
  return 'npm'
}

async function createTailwindConfig() {
  const configPath = path.join(process.cwd(), 'tailwind.config.js')

  const configContent = `import dsfrPreset from '@dsfrkit/config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsfrPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`

  // Ne pas écraser si existe déjà
  if (await fs.pathExists(configPath)) {
    console.log(chalk.yellow('\n⚠️  tailwind.config.js existe déjà'))
    console.log(chalk.dim('Vérifiez que le preset et le content sont bien configurés :'))
    console.log(chalk.dim('  presets: [dsfrPreset]'))
    console.log(chalk.dim("  content: [..., './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}']"))
  } else {
    await fs.writeFile(configPath, configContent)
  }

  const cssPath = path.join(process.cwd(), 'src/index.css')
  const cssContent = `@import '@dsfrkit/tokens/theme.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-marianne antialiased;
  }
}
`
  if (!(await fs.pathExists(cssPath))) {
    const srcDir = path.join(process.cwd(), 'src')
    if (await fs.pathExists(srcDir)) {
      await fs.writeFile(cssPath, cssContent)
      console.log(chalk.green('✓ index.css créé avec les imports DSFRKit'))
    }
  } else {
    const existingCss = await fs.readFile(cssPath, 'utf-8')
    if (!existingCss.includes('@dsfrkit/tokens/theme.css')) {
      console.log(
        chalk.yellow('\n⚠️  src/index.css existe déjà mais ne semble pas importer le thème DSFRKit.')
      )
      console.log(
        chalk.dim(
          "Ajoutez cette ligne tout en haut de votre fichier :\n  @import '@dsfrkit/tokens/theme.css';"
        )
      )
    }
  }
}
