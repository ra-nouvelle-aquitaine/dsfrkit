import { Command } from 'commander'
import { add } from './commands/add'
import { fetchArtworks } from './commands/fetch-artworks'
import { init } from './commands/init'

const program = new Command()

program
  .name('dsfrkit')
  .description("CLI pour le Système de Design de l'État français (DSFR)")
  .version('0.1.0')

program.command('init').description('Initialiser le projet avec la configuration DSFR').action(init)

program
  .command('add')
  .description('Ajouter des composants au projet')
  .argument('[components...]', 'Composants à ajouter (ex: button alert)')
  .action(add)

program
  .command('fetch-artworks')
  .description('Télécharge les SVG officiels DSFR dans le dossier public/dist/artwork')
  .action(fetchArtworks)

program.parse()
