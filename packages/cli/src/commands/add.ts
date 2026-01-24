import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
import prompts from 'prompts'
import { componentTemplates } from '../templates.js'
import { fetchArtworks } from './fetch-artworks.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Mapping des composants disponibles
const AVAILABLE_COMPONENTS = {
  button: {
    name: 'Button',
    files: ['button.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  },
  alert: {
    name: 'Alert',
    files: ['alert.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  },
  card: {
    name: 'Card',
    files: ['card.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  },
  input: {
    name: 'Input',
    files: ['input.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  },
  modal: {
    name: 'Modal',
    files: ['modal.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@radix-ui/react-dialog'],
  },
  select: {
    name: 'Select',
    files: ['select.tsx'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@radix-ui/react-select'],
  },
  themetoggle: {
    name: 'ThemeToggle',
    files: ['theme-toggle.tsx', 'theme-artwork.tsx'],
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-radio-group'],
  },
}

type ComponentName = keyof typeof AVAILABLE_COMPONENTS

export async function add(components: string[]) {
  console.log(chalk.bold.blue('\n🇫🇷 Ajout de composants DSFR\n'))

  // Si aucun composant spécifié, demander
  let selectedComponents: ComponentName[] = []

  if (!components || components.length === 0) {
    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Quels composants voulez-vous ajouter ?',
      choices: Object.entries(AVAILABLE_COMPONENTS).map(([key, value]) => ({
        title: value.name,
        value: key,
      })),
    })

    if (!response.components || response.components.length === 0) {
      console.log(chalk.yellow('❌ Aucun composant sélectionné'))
      process.exit(0)
    }

    selectedComponents = response.components
  } else {
    // Valider les composants fournis
    selectedComponents = components.filter((c) => {
      if (!(c in AVAILABLE_COMPONENTS)) {
        console.log(chalk.yellow(`⚠️  Composant inconnu : ${c}`))
        return false
      }
      return true
    }) as ComponentName[]

    if (selectedComponents.length === 0) {
      console.log(chalk.red('❌ Aucun composant valide'))
      console.log(
        chalk.dim(`Composants disponibles : ${Object.keys(AVAILABLE_COMPONENTS).join(', ')}`)
      )
      process.exit(1)
    }
  }

  // Détecter le dossier des composants
  const componentsPath = await detectComponentsPath()

  for (const componentName of selectedComponents) {
    const spinner = ora(`Ajout de ${AVAILABLE_COMPONENTS[componentName].name}...`).start()

    try {
      await copyComponent(componentName, componentsPath)
      spinner.succeed(`${AVAILABLE_COMPONENTS[componentName].name} ajouté`)

      if (componentName === 'themetoggle') {
        spinner.text = 'Téléchargement des Artworks DSFR requis pour ThemeToggle...'
        try {
          await fetchArtworks()
        } catch (_e) {
          spinner.warn(
            "Les artworks n'ont pas pu être téléchargés. Exécutez `dsfrkit fetch-artworks`."
          )
        }
      }
    } catch (error) {
      spinner.fail(`Erreur lors de l'ajout de ${AVAILABLE_COMPONENTS[componentName].name}`)
      console.error(error)
    }
  }

  console.log(chalk.green('\n✅ Composants ajoutés avec succès !\n'))
  console.log(chalk.dim('Vous pouvez maintenant les utiliser :'))
  for (const name of selectedComponents) {
    console.log(
      chalk.dim(`  import { ${AVAILABLE_COMPONENTS[name].name} } from '@/components/ui/${name}'`)
    )
  }
  console.log()
}

async function detectComponentsPath(): Promise<string> {
  const possiblePaths = ['src/components/ui', 'components/ui', 'app/components/ui']

  for (const p of possiblePaths) {
    if (await fs.pathExists(path.join(process.cwd(), p))) {
      return p
    }
  }

  // Par défaut
  const defaultPath = 'src/components/ui'
  await fs.ensureDir(path.join(process.cwd(), defaultPath))
  return defaultPath
}

async function copyComponent(name: ComponentName, targetPath: string) {
  const component = AVAILABLE_COMPONENTS[name]

  for (const file of component.files) {
    const targetFile = path.join(process.cwd(), targetPath, file)
    const templateKey = file.replace('.tsx', '') as keyof typeof componentTemplates
    const template = componentTemplates[templateKey]

    if (template) {
      await fs.writeFile(targetFile, template)
    }
  }
}
