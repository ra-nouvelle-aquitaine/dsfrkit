import { ExternalLinkIcon } from '@dsfrkit/icons'
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Container,
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLinks,
  Header,
  HeaderActions,
  HeaderBody,
  HeaderNav,
  Heading,
  Link,
  NavigationItem,
  Section,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  ThemeProvider,
  ThemeToggle,
} from '@dsfrkit/react'
import { useEffect, useState } from 'react'

import pkg from '../../../packages/react/package.json'
import { DSFRKitLogo } from './components/DSFRKitLogo'
import { InstallationGuide, RoutingGuide } from './Guides'

function AppContent() {
  const isDev = import.meta.env.DEV
  const [storybookUrl] = useState(isDev ? 'http://localhost:6006' : './storybook/')
  const exampleUrl = isDev ? 'http://localhost:5173' : './example/'
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    // Smooth scroll for anchor links
    document.documentElement.style.scrollBehavior = 'smooth'

    // Intersection Observer for Scroll Spy
    const observers: IntersectionObserver[] = []
    const sections = ['features', 'guides', 'components']

    for (const id of sections) {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            }
          },
          { rootMargin: '-100px 0px -80% 0px' } // Trigger when section is near the top
        )
        observer.observe(element)
        observers.push(observer)
      }
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      for (const obs of observers) obs.disconnect()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // Adjust based on header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Box className="min-h-screen bg-background text-foreground">
      {/* Header DSFR */}
      <Header
        size="xl"
        className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all"
      >
        <HeaderBody>
          <div className="flex items-center gap-4 lg:gap-8">
            <Box className="hidden sm:flex items-center gap-2">
              <DSFRKitLogo iconOnly={false} className="h-16 w-auto !p-0 !m-0" />
              <Badge variant="info">
                <span className="lowercase">v</span>
                {pkg.version}
              </Badge>
            </Box>
            <Box className="flex sm:hidden items-center">
              <DSFRKitLogo iconOnly className="h-8 w-auto !p-0 !m-0" />
            </Box>
          </div>
          <HeaderNav>
            <NavigationItem
              onClick={(e) => handleNavClick(e, 'features')}
              isActive={activeSection === 'features'}
              href="#features"
            >
              Fonctionnalités
            </NavigationItem>
            <NavigationItem
              href="guides"
              onClick={(e) => handleNavClick(e, 'guides')}
              isActive={activeSection === 'guides'}
            >
              Installation
            </NavigationItem>
            <NavigationItem
              href="#components"
              onClick={(e) => handleNavClick(e, 'components')}
              isActive={activeSection === 'components'}
            >
              Composants
            </NavigationItem>
            <NavigationItem
              href={storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExternalLinkIcon className="w-4 h-4 opacity-70" aria-hidden="true" />}
              iconPosition="end"
            >
              Storybook
            </NavigationItem>
            <NavigationItem
              href={exampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExternalLinkIcon className="w-4 h-4 opacity-70" aria-hidden="true" />}
              iconPosition="end"
            >
              Exemple
            </NavigationItem>
          </HeaderNav>
          <HeaderActions>
            <ThemeToggle iconOnly variant="ghost" />
          </HeaderActions>
        </HeaderBody>
      </Header>

      {/* Hero Section */}
      <Section className="bg-background-alt py-12">
        <Container size="xl">
          <Box className="max-w-3xl">
            <Heading as="h1" size="6" className="font-bold mb-4 text-foreground">
              Construisez des interfaces conformes au DSFR
            </Heading>
            <Text className="text-lg text-foreground-muted mb-6">
              DSFRKit est une bibliothèque de composants React qui implémente le{' '}
              <Link href="https://www.systeme-de-design.gouv.fr/" external showExternalIcon>
                Système de Design de l'État français (DSFR)
              </Link>
              . Elle utilise Radix UI pour l'accessibilité et Tailwind CSS pour le styling.
            </Text>
            <Box className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.open(storybookUrl, '_blank')}
                className="flex items-center gap-2"
              >
                📚 Voir tous les composants (Storybook){' '}
                <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open('https://github.com/ra-nouvelle-aquitaine/dsfrkit', '_blank')
                }
                className="flex items-center gap-2"
              >
                GitHub <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Features */}
      <Section id="features" className="py-12">
        <Container size="xl">
          <Heading as="h2" size="5" className="font-bold mb-8 text-foreground">
            Pourquoi DSFRKit ?
          </Heading>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">⚛️ React</CardTitle>
                <CardDescription>
                  Une architecture frontend moderne et réactive propulsée par l'écosystème React et
                  l'expressivité de TypeScript.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">🧩 Shadcn UI</CardTitle>
                <CardDescription>
                  Inspiré de l'approche Shadcn, ajoutez chaque composant via la CLI, devenez
                  propriétaire du code métier modulaire.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                  ♿ Accessible (Radix UI)
                </CardTitle>
                <CardDescription>
                  Tous nos composants complexes utilisent des primitives Radix pour une conformité
                  WAI-ARIA et lecteurs d'écran par défaut.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                  🎨 Conforme DSFR
                </CardTitle>
                <CardDescription>
                  Respect strict des couleurs, typographies, et espacements du Système de Design de
                  l'État français.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                  💅 Tailwind CSS
                </CardTitle>
                <CardDescription>
                  Un styling ultra-flexible utilisant les classes utilitaires pour personnaliser le
                  rendu aux spécificités de votre application.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                  🌙 Thème Sombre Natif
                </CardTitle>
                <CardDescription>
                  Les couleurs et palettes s'adaptent instantanément du thème clair au sombre pour
                  garantir un confort visuel maximal.
                </CardDescription>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Section>

      {/* Guides & Documentation */}
      <Section id="guides" className="py-12 bg-background-alt border-t border-border">
        <Container size="xl">
          <Heading as="h2" size="5" className="font-bold mb-6 text-foreground">
            Guides & Documentation
          </Heading>
          <Text className="text-foreground-muted mb-8 max-w-3xl block">
            Prêt à utiliser DSFRKit dans votre projet ? Suivez notre guide d'installation ou
            consultez les détails sur l'intégration de votre librairie de routage habituelle.
          </Text>

          <Tabs
            defaultValue="installation"
            className="w-full bg-background border border-border p-6 rounded-lg shadow-sm"
          >
            <Box className="flex">
              <TabsList>
                <TabsTrigger value="installation">Installation & Mise en route</TabsTrigger>
                <TabsTrigger value="routing">Routage & Liens</TabsTrigger>
              </TabsList>
            </Box>
            <TabsContent value="installation">
              <InstallationGuide />
            </TabsContent>
            <TabsContent value="routing">
              <RoutingGuide />
            </TabsContent>
          </Tabs>

          <Box className="mt-16 text-center">
            <Heading as="h3" size="4" className="font-bold mb-4">
              Besoin d'aller plus loin ?
            </Heading>
            <Text className="text-foreground-muted mb-6 block">
              Explorez la totalité des composants, toutes leurs props et variantes interactives
              depuis notre catalogue Storybook dédié.
            </Text>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(storybookUrl, '_blank')}
              className="flex items-center gap-2 mx-auto"
            >
              Lancer le catalogue Storybook{' '}
              <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Box>
        </Container>
      </Section>

      {/* Components Preview */}
      <Section id="components" className="py-12">
        <Container size="xl">
          <Box className="flex items-center justify-between mb-8">
            <Heading as="h2" size="5" className="font-bold text-foreground">
              Aperçu des composants
            </Heading>
            <Button
              variant="tertiary"
              onClick={() => window.open(storybookUrl, '_blank')}
              className="flex items-center gap-2"
            >
              Voir tous les composants <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Box>

          {/* Buttons */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <CardTitle className="mb-4">Boutons</CardTitle>
              <Box className="flex flex-wrap gap-3">
                <Button variant="primary">Primaire</Button>
                <Button variant="secondary">Secondaire</Button>
                <Button variant="tertiary">Tertiaire</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </Box>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <CardTitle className="mb-4">Alertes</CardTitle>
              <Box className="space-y-3">
                <Alert variant="info" title="Information">
                  Ceci est une alerte d'information.
                </Alert>
                <Alert variant="success" title="Succès">
                  Votre action a été effectuée avec succès.
                </Alert>
                <Alert variant="warning" title="Attention">
                  Cette action nécessite votre attention.
                </Alert>
                <Alert variant="error" title="Erreur">
                  Une erreur est survenue.
                </Alert>
              </Box>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <CardTitle className="mb-4">Badges</CardTitle>
              <Box className="flex flex-wrap gap-2">
                <Badge>Par défaut</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Succès</Badge>
                <Badge variant="warning">Attention</Badge>
                <Badge variant="error">Erreur</Badge>
                <Badge variant="primary">Primaire</Badge>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterBody>
          <FooterBrand
            logo={<DSFRKitLogo iconOnly={false} className="h-12 w-auto mb-2" />}
            href="/"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection('')
            }}
          />
          <FooterContent>
            <FooterLinks title="Ressources">
              <Link
                href="https://www.systeme-de-design.gouv.fr/"
                external
                showExternalIcon
                className="font-normal text-foreground w-fit text-sm"
              >
                DSFR Officiel
              </Link>
              <Link
                href={storybookUrl}
                external
                showExternalIcon
                className="font-normal text-foreground w-fit text-sm"
              >
                Storybook
              </Link>
            </FooterLinks>
            <FooterLinks title="Code source">
              <Link
                href="https://github.com/ra-nouvelle-aquitaine/dsfrkit"
                external
                showExternalIcon
                className="font-normal text-foreground w-fit text-sm"
              >
                GitHub
              </Link>
            </FooterLinks>
          </FooterContent>
        </FooterBody>
        <FooterBottom>
          <Text>Fait avec ❤️ par la DSI de la Région académique Nouvelle-Aquitaine</Text>
        </FooterBottom>
      </Footer>
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
