import {
  RiFileTextLineIcon,
  RiFolder2LineIcon,
  RiHome3LineIcon,
  RiMailLineIcon,
  RiSettings3LineIcon,
} from '@dsfrkit/icons'
import {
  Box,
  Header,
  HeaderBody,
  HeaderBrand,
  HeaderNav,
  Logo,
  Navigation,
  NavigationItem,
  NavigationMegaMenu,
  NavigationMegaMenuCategory,
  NavigationMenu,
  NavigationSection,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Navigation principale (\`fr-nav\`) et menu latéral (\`fr-sidemenu\`).

**Navigation principale** (\`orientation="horizontal"\`, par défaut) :
- \`NavigationItem\` — lien direct ; \`isActive\` pose \`aria-current="page"\` et le soulignement bleu ;
- \`NavigationMenu\` — bouton qui déroule une liste de liens (menu) ;
- \`NavigationMegaMenu\` — bouton qui ouvre un panneau pleine largeur avec bouton « Fermer », accroche éditoriale facultative (\`leader\`) et colonnes \`NavigationMegaMenuCategory\`.

Un seul menu est ouvert à la fois. Il se referme avec **Échap** (le focus revient sur son bouton), au clic en dehors, quand le focus quitte la navigation ou quand un lien est activé. Sous le point de rupture \`lg\` (992px), les entrées s'empilent et les menus se déroulent sous leur bouton ; dans un \`Header\`, c'est le bouton burger de l'en-tête qui ouvre la navigation.

**Menu latéral** (\`orientation="vertical"\`) : \`NavigationSection\` regroupe des liens dans une section repliable.
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      description:
        "Orientation de la navigation. 'horizontal' pour le menu principal (Header), 'vertical' pour un menu latéral (SideMenu/Dashboard).",
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    title: {
      description:
        "Le titre de la navigation (visible uniquement en orientation 'vertical'). Idéal pour titrer un menu latéral.",
      control: 'text',
    },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

const megaMenuCategories = [
  {
    title: 'Famille',
    links: ['Naissance', 'Mariage et PACS', 'Divorce et séparation', 'Aides aux familles'],
  },
  {
    title: 'Logement',
    links: ['Location', 'Achat immobilier', 'Aides au logement', 'Travaux'],
  },
  {
    title: 'Travail',
    links: ['Contrat de travail', 'Chômage', 'Formation', 'Retraite'],
  },
  {
    title: 'Papiers',
    links: ['Carte d’identité', 'Passeport', 'Permis de conduire', 'Carte grise'],
  },
]

const mainNavigationEntries = (
  <>
    <NavigationItem href="#accueil" isActive>
      Accueil
    </NavigationItem>
    <NavigationMenu title="Mes démarches">
      <NavigationItem href="#suivi">Suivre une démarche</NavigationItem>
      <NavigationItem href="#rendez-vous">Prendre rendez-vous</NavigationItem>
      <NavigationItem href="#documents">Mes documents</NavigationItem>
      <NavigationItem href="#paiements">Mes paiements</NavigationItem>
    </NavigationMenu>
    <NavigationMegaMenu
      title="Thématiques"
      leader={{
        title: 'Toutes les thématiques',
        description:
          'Retrouvez les démarches administratives classées par grand thème de la vie quotidienne.',
        link: { label: 'Voir toute la rubrique', href: '#thematiques' },
      }}
    >
      {megaMenuCategories.map((category) => (
        <NavigationMegaMenuCategory
          key={category.title}
          title={category.title}
          href={`#${category.title}`}
        >
          {category.links.map((link) => (
            <NavigationItem key={link} href={`#${link}`}>
              {link}
            </NavigationItem>
          ))}
        </NavigationMegaMenuCategory>
      ))}
    </NavigationMegaMenu>
    <NavigationItem href="#aide">Aide et contact</NavigationItem>
  </>
)

/**
 * Navigation principale complète : lien actif, menu déroulant et méga-menu.
 * Ouvrez « Mes démarches » puis « Thématiques » : le premier se referme.
 */
export const MainNavigation: Story = {
  name: 'Navigation principale (menu et méga-menu)',
  parameters: {
    docs: {
      source: {
        code: `
<Navigation aria-label="Menu principal">
  <NavigationItem href="/" isActive>Accueil</NavigationItem>
  <NavigationMenu title="Mes démarches">
    <NavigationItem href="/suivi">Suivre une démarche</NavigationItem>
    <NavigationItem href="/rendez-vous">Prendre rendez-vous</NavigationItem>
  </NavigationMenu>
  <NavigationMegaMenu
    title="Thématiques"
    leader={{
      title: 'Toutes les thématiques',
      description: 'Retrouvez les démarches classées par grand thème.',
      link: { label: 'Voir toute la rubrique', href: '/thematiques' },
    }}
  >
    <NavigationMegaMenuCategory title="Famille" href="/famille">
      <NavigationItem href="/famille/naissance">Naissance</NavigationItem>
      <NavigationItem href="/famille/mariage">Mariage et PACS</NavigationItem>
    </NavigationMegaMenuCategory>
    <NavigationMegaMenuCategory title="Logement" href="/logement">
      <NavigationItem href="/logement/location">Location</NavigationItem>
    </NavigationMegaMenuCategory>
  </NavigationMegaMenu>
  <NavigationItem href="/aide">Aide et contact</NavigationItem>
</Navigation>
        `.trim(),
      },
    },
  },
  render: () => (
    <Box className="min-h-[34rem] pt-6">
      <div className="fr-container">
        <Navigation aria-label="Menu principal">{mainNavigationEntries}</Navigation>
      </div>
    </Box>
  ),
}

/**
 * Menu déroulant seul, avec la rubrique courante signalée sur le bouton
 * (`isActive`) et sur le lien de la page (`aria-current="page"`).
 */
export const DropdownMenus: Story = {
  name: 'Menus déroulants',
  render: () => (
    <Box className="min-h-[28rem] pt-6">
      <div className="fr-container">
        <Navigation aria-label="Menu principal">
          <NavigationItem href="#accueil">Accueil</NavigationItem>
          <NavigationMenu title="Actualités" isActive>
            <NavigationItem href="#communiques" isActive>
              Communiqués de presse
            </NavigationItem>
            <NavigationItem href="#agenda">Agenda</NavigationItem>
            <NavigationItem href="#dossiers">Dossiers thématiques</NavigationItem>
          </NavigationMenu>
          <NavigationMenu title="Publications">
            <NavigationItem href="#rapports">Rapports</NavigationItem>
            <NavigationItem href="#statistiques">Statistiques</NavigationItem>
            <NavigationItem href="#guides">Guides pratiques</NavigationItem>
          </NavigationMenu>
          <NavigationItem href="#contact">Contact</NavigationItem>
        </Navigation>
      </div>
    </Box>
  ),
}

/**
 * Méga-menu sans accroche éditoriale : le bouton « Fermer » reste disponible
 * en haut à droite du panneau.
 */
export const MegaMenuWithoutLeader: Story = {
  name: 'Méga-menu sans accroche',
  render: () => (
    <Box className="min-h-[30rem] pt-6">
      <div className="fr-container">
        <Navigation aria-label="Menu principal">
          <NavigationItem href="#accueil">Accueil</NavigationItem>
          <NavigationMegaMenu title="Services en ligne">
            {megaMenuCategories.map((category) => (
              <NavigationMegaMenuCategory key={category.title} title={category.title}>
                {category.links.map((link) => (
                  <NavigationItem key={link} href={`#${link}`}>
                    {link}
                  </NavigationItem>
                ))}
              </NavigationMegaMenuCategory>
            ))}
          </NavigationMegaMenu>
        </Navigation>
      </div>
    </Box>
  ),
}

/**
 * Navigation dans l'en-tête : sous `lg`, le bouton burger du Header ouvre la
 * navigation, dont les menus se déroulent alors en accordéon.
 */
export const InHeader: Story = {
  name: 'Dans un Header',
  render: () => (
    <Box className="min-h-[36rem]">
      <Header>
        <HeaderBody>
          <HeaderBrand
            logo={<Logo size="sm" />}
            serviceTitle="Nom du site / service"
            serviceTagline="Baseline - précisions sur l’organisation"
            href="#"
          />
          <HeaderNav>
            <Navigation aria-label="Menu principal">{mainNavigationEntries}</Navigation>
          </HeaderNav>
        </HeaderBody>
      </Header>
    </Box>
  ),
}

export const VerticalSideMenu: Story = {
  args: {
    orientation: 'vertical',
    title: 'Titre de rubrique',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Box className="w-full max-w-80">
  <Navigation orientation="vertical" title="Titre de rubrique">
    <NavigationSection title="Titre du lien 1" defaultOpen isActive>
      <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>Accueil</NavigationItem>
      <NavigationSection title="Documents" defaultOpen>
        <NavigationItem href="#" icon={<RiFileTextLineIcon />}>Notes de frais</NavigationItem>
        <NavigationItem href="#" icon={<RiFolder2LineIcon />}>Rapports</NavigationItem>
      </NavigationSection>
      <NavigationItem href="#" icon={<RiSettings3LineIcon />}>Paramètres</NavigationItem>
      <NavigationItem href="#" icon={<RiMailLineIcon />}>Contact</NavigationItem>
    </NavigationSection>
  </Navigation>
</Box>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Box className="w-full max-w-80 p-4">
      <Navigation {...args}>
        <NavigationSection title="Titre du lien 1" defaultOpen isActive>
          <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>
            Accueil
          </NavigationItem>
          <NavigationSection title="Documents" defaultOpen>
            <NavigationItem href="#" icon={<RiFileTextLineIcon />}>
              Notes de frais
            </NavigationItem>
            <NavigationItem href="#" icon={<RiFolder2LineIcon />}>
              Rapports
            </NavigationItem>
          </NavigationSection>
          <NavigationItem href="#" icon={<RiSettings3LineIcon />}>
            Paramètres
          </NavigationItem>
          <NavigationItem href="#" icon={<RiMailLineIcon />}>
            Contact
          </NavigationItem>
        </NavigationSection>
      </Navigation>
    </Box>
  ),
}

export const VerticalWithoutTitle: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Box className="w-full max-w-80">
  <Navigation orientation="vertical">
    <NavigationItem href="#" isActive>Accueil</NavigationItem>
    <NavigationItem href="#">Services</NavigationItem>
    <NavigationItem href="#">Contact</NavigationItem>
  </Navigation>
</Box>
        `.trim(),
      },
    },
  },
  render: () => (
    <Box className="w-full max-w-80 p-4">
      <Navigation orientation="vertical">
        <NavigationItem href="#" isActive>
          Accueil
        </NavigationItem>
        <NavigationItem href="#">Services</NavigationItem>
        <NavigationItem href="#">Contact</NavigationItem>
      </Navigation>
    </Box>
  ),
}
