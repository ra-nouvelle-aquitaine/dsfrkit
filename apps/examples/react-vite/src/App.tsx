import {
  RiFacebookCircleFillIcon,
  RiInstagramFillIcon,
  RiLayoutLeftLineIcon,
  RiLinkedinBoxFillIcon,
  RiMenuLineIcon,
  RiMore2LineIcon,
  RiNotification3LineIcon,
  RiSearch2LineIcon,
  RiTwitterXFillIcon,
  RiYoutubeFillIcon,
} from '@dsfrkit/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  AvatarFallback,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ConsentBanner,
  ConsentBannerActions,
  ConsentBannerContent,
  ConsentBannerTitle,
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Follow,
  FollowDescription,
  FollowNewsletter,
  FollowSocial,
  FollowTitle,
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  Grid,
  HeaderBrand,
  Heading,
  Indicator,
  Input,
  Kbd,
  Link,
  Logo,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Navigation,
  NavigationItem,
  NavigationSection,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Progress,
  Quote,
  RadioGroup,
  RadioGroupItem,
  Range,
  ScrollArea,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Tile,
  TileGrid,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dsfrkit/react'
import { useEffect, useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Composants utilitaires                                             */
/* ------------------------------------------------------------------ */

function ConsentBannerDemo() {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)}>
        Afficher la bannière de consentement
      </Button>
      {show && (
        <ConsentBanner>
          <ConsentBannerTitle>À propos des cookies sur ce site</ConsentBannerTitle>
          <ConsentBannerContent>
            Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services
            disponibles sur ce site.
          </ConsentBannerContent>
          <ConsentBannerActions>
            <Button onClick={() => setShow(false)}>Tout accepter</Button>
            <Button onClick={() => setShow(false)} variant="secondary">
              Tout refuser
            </Button>
            <Button onClick={() => setShow(false)} variant="secondary">
              Personnaliser
            </Button>
          </ConsentBannerActions>
        </ConsentBanner>
      )}
    </>
  )
}

function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:bg-background-contrast transition-colors h-full px-6 border-l border-border flex items-center justify-center">
        <Indicator count={3} variant="default" className="flex">
          <Flex align="center" justify="center" className="p-0 text-foreground cursor-pointer">
            <RiNotification3LineIcon size={24} aria-hidden="true" />
          </Flex>
        </Indicator>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-bold text-base px-4 pt-3 pb-2">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Box className="max-h-96 overflow-y-auto">
          <DropdownMenuItem className="flex flex-col items-start px-4 py-3 cursor-pointer border-b border-border rounded-none outline-none">
            <Text as="span" size="2" weight="bold">
              Nouveau document
            </Text>
            <Text as="span" size="2" className="text-foreground-muted mt-1">
              Le document "Rapport annuel" a été ajouté.
            </Text>
            <Text as="span" size="1" className="text-foreground-muted mt-2">
              Il y a 5 min
            </Text>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start px-4 py-3 cursor-pointer border-b border-border rounded-none outline-none">
            <Text as="span" size="2" weight="bold">
              Validation requise
            </Text>
            <Text as="span" size="2" className="text-foreground-muted mt-1">
              Votre action est requise sur le dossier #1234.
            </Text>
            <Text as="span" size="1" className="text-foreground-muted mt-2">
              Il y a 2 heures
            </Text>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start px-4 py-3 cursor-pointer opacity-70 border-b border-border rounded-none outline-none">
            <Text as="span" size="2" weight="bold">
              Mise à jour système
            </Text>
            <Text as="span" size="2" className="text-foreground-muted mt-1">
              La maintenance est terminée.
            </Text>
            <Text as="span" size="1" className="text-foreground-muted mt-2">
              Hier
            </Text>
          </DropdownMenuItem>
        </Box>
        <DropdownMenuItem className="p-3 mt-1 justify-center text-primary font-medium text-sm cursor-pointer rounded-none outline-none">
          Voir toutes les notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------------------------------------------ */
/*  LAYOUT STANDARD — site vitrine / portail public                    */
/* ------------------------------------------------------------------ */
function StandardDemo() {
  const [rangeValue, setRangeValue] = useState([50])

  return (
    <Flex direction="col" className="min-h-screen bg-background">
      {/* Header DSFR 2-rangées : marque + outils | puis navigation */}
      <header className="w-full bg-background-elevated border-b border-border">
        {/* Rangée 1 : Marque + Outils (liens rapides + recherche) */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-4">
          <HeaderBrand
            logo={<Logo size="md" />}
            serviceTitle="Service Public"
            serviceTagline="Direction générale de l'administration"
            href="/"
          />

          {/* Outils d'accès rapide — bloc droit, structure verticale comme DSFR */}
          <div className="hidden lg:flex flex-col items-end gap-2">
            {/* Liens rapides — ligne du haut */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="whitespace-nowrap font-medium gap-1 text-primary w-auto"
              >
                Espace pro
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="whitespace-nowrap font-medium gap-1 text-primary w-auto"
              >
                Mon compte
              </Button>
              <ThemeToggle
                iconOnly
                variant="ghost"
                className="text-primary hover:bg-background-alt"
              />
            </div>
            {/* Barre de recherche — ligne du bas */}
            <div className="w-full max-w-[300px]">
              <Input
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher sur le site"
                action={
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-3"
                    aria-label="Lancer la recherche"
                    title="Lancer la recherche"
                  >
                    <RiSearch2LineIcon size={18} />
                  </Button>
                }
              />
            </div>
          </div>

          {/* Mobile : juste le toggle thème + burger placeholder */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle iconOnly variant="ghost" />
          </div>
        </div>

        {/* Rangée 2 : Navigation principale */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <Navigation orientation="horizontal" aria-label="Navigation principale">
              <NavigationItem href="#" isActive>
                Accueil
              </NavigationItem>
              <NavigationItem href="#">Démarches</NavigationItem>
              <NavigationItem href="#">Actualités</NavigationItem>
              <NavigationItem href="#">Contact</NavigationItem>
            </Navigation>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {/* Fil d'Ariane */}
        <Container size="xl">
          <Box className="pt-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Accueil</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Démarches</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Carte nationale d'identité</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Box>
        </Container>

        {/* Hero */}
        <Section size="sm">
          <Container size="xl">
            <Box className="max-w-3xl">
              <Heading as="h1" size="6" className="mb-4">
                Demande de carte nationale d'identité
              </Heading>
              <Text size="4" className="text-foreground-muted mb-6">
                Effectuez votre demande de carte nationale d'identité en ligne. Le délai moyen de
                traitement est de 3 semaines.
              </Text>
              <Flex wrap="wrap" className="gap-3">
                <Button variant="primary" size="lg">
                  Commencer la démarche
                </Button>
                <Button variant="secondary" size="lg">
                  Suivre ma demande
                </Button>
              </Flex>
            </Box>
          </Container>

          {/* Alerte */}
          <Container size="xl" className="mt-8">
            <Alert variant="info" title="Information importante">
              À compter du 1er janvier 2025, les demandes de renouvellement peuvent être effectuées
              jusqu'à 6 mois avant la date d'expiration de votre titre actuel.
            </Alert>
          </Container>
        </Section>

        {/* Tuiles de services */}
        <Section size="sm" className="bg-background-alt">
          <Container size="xl">
            <Heading as="h2" size="5" className="mb-6">
              Services associés
            </Heading>
            <TileGrid columns={3}>
              <Tile
                title="Pré-demande en ligne"
                description="Remplissez votre pré-demande depuis chez vous pour gagner du temps au guichet."
                href="#"
              />
              <Tile
                title="Pièces justificatives"
                description="Consultez la liste des documents nécessaires selon votre situation."
                href="#"
              />
              <Tile
                title="Prendre rendez-vous"
                description="Trouvez un créneau disponible dans la mairie de votre choix."
                href="#"
              />
            </TileGrid>
          </Container>
        </Section>

        {/* Contenu éditorial */}
        <Section size="sm">
          <Container size="xl">
            <Grid className="md:grid-cols-3 gap-8">
              <Box className="md:col-span-2 space-y-6">
                <Heading as="h2" size="5">
                  Comment ça marche ?
                </Heading>
                {[
                  {
                    step: 1,
                    title: 'Pré-demande en ligne',
                    desc: 'Remplissez le formulaire en ligne et obtenez votre numéro de pré-demande.',
                  },
                  {
                    step: 2,
                    title: 'Rendez-vous en mairie',
                    desc: 'Présentez-vous avec vos pièces justificatives et votre numéro de pré-demande.',
                  },
                  {
                    step: 3,
                    title: 'Traitement du dossier',
                    desc: 'Suivez l’avancement de votre dossier en temps réel via le portail.',
                  },
                  {
                    step: 4,
                    title: 'Retrait du titre',
                    desc: "Retirez votre carte d'identité dans un délai de 3 mois après sa mise à disposition.",
                  },
                ].map((s) => (
                  <Flex key={s.step} className="gap-4">
                    <Flex
                      align="center"
                      justify="center"
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold"
                    >
                      {s.step}
                    </Flex>
                    <Box>
                      <Heading as="h3" size="3">
                        {s.title}
                      </Heading>
                      <Text className="text-foreground-muted">{s.desc}</Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
              <Box className="space-y-6">
                <Callout accent="info" title="Le saviez-vous ?">
                  La carte nationale d'identité est gratuite en cas de première demande ou de
                  renouvellement. En cas de perte ou de vol, un timbre fiscal de 25 € est requis.
                </Callout>
                <Card>
                  <CardContent className="p-5">
                    <CardTitle className="text-base mb-2">Besoin d'aide ?</CardTitle>
                    <CardDescription className="mb-4">
                      Contactez le centre d'appels.
                    </CardDescription>
                    <Text size="4" weight="bold" className="text-primary">
                      34 00
                    </Text>
                    <Text size="1" className="text-foreground-muted">
                      Service gratuit + prix d'un appel
                    </Text>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Container>
        </Section>

        {/* Composants showcase */}
        <Section size="sm" className="bg-background-alt">
          <Container size="xl">
            <Heading as="h2" size="5" className="mb-6">
              Composants
            </Heading>
            <Tabs defaultValue="forms">
              <TabsList>
                <TabsTrigger value="forms">Formulaires</TabsTrigger>
                <TabsTrigger value="overlays">Modales & Tooltips</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
              </TabsList>

              <TabsContent value="forms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulaires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Box>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom
                      </label>
                      <Input id="name" placeholder="Entrez votre nom" />
                    </Box>
                    <Box>
                      <label htmlFor="email-input" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email-input" type="email" placeholder="votre@email.fr" />
                    </Box>
                    <Box>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Votre message..." rows={3} />
                    </Box>
                    <Box>
                      <Text as="span" size="2" weight="medium" className="block mb-2">
                        Sélecteur
                      </Text>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">Option A</SelectItem>
                          <SelectItem value="b">Option B</SelectItem>
                        </SelectContent>
                      </Select>
                    </Box>
                    <Box className="space-y-2">
                      <Text as="span" size="2" weight="medium">
                        Cases à cocher
                      </Text>
                      <Flex align="center" className="gap-2">
                        <Checkbox id="c1" />
                        <label htmlFor="c1" className="text-sm">
                          J'accepte les conditions
                        </label>
                      </Flex>
                    </Box>
                    <Box className="space-y-2">
                      <Text as="span" size="2" weight="medium">
                        Radio
                      </Text>
                      <RadioGroup defaultValue="o1">
                        <Flex align="center" className="gap-2">
                          <RadioGroupItem value="o1" id="r1" />
                          <label htmlFor="r1" className="text-sm">
                            Physique
                          </label>
                        </Flex>
                        <Flex align="center" className="gap-2">
                          <RadioGroupItem value="o2" id="r2" />
                          <label htmlFor="r2" className="text-sm">
                            Morale
                          </label>
                        </Flex>
                      </RadioGroup>
                    </Box>
                    <Box className="space-y-2">
                      <Text as="span" size="2" weight="medium">
                        Toggle
                      </Text>
                      <Toggle>Notifications</Toggle>
                    </Box>
                    <Box className="space-y-2">
                      <Text as="span" size="2" weight="medium">
                        Range
                      </Text>
                      <Range
                        value={rangeValue}
                        onValueChange={setRangeValue}
                        min={0}
                        max={100}
                        step={1}
                        showValue
                        formatValue={(v) => `${v} %`}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overlays" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Modales</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row flex-wrap gap-4 p-6">
                    <Modal>
                      <ModalTrigger asChild>
                        <Button>Ouvrir la modale</Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>Confirmation</ModalTitle>
                          <ModalDescription>Êtes-vous sûr ?</ModalDescription>
                        </ModalHeader>
                        <Box className="py-4">
                          <Text>Cette action est irréversible.</Text>
                        </Box>
                        <ModalFooter>
                          <ModalClose asChild>
                            <Button variant="tertiary">Annuler</Button>
                          </ModalClose>
                          <Button>Confirmer</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Consentement</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ConsentBannerDemo />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Infobulles</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-4 p-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="tertiary">Survolez-moi</Button>
                        </TooltipTrigger>
                        <TooltipContent>Information complémentaire</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alertes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <Alert variant="info" title="Information">
                      Ceci est une alerte d'information.
                    </Alert>
                    <Alert variant="success" title="Succès">
                      Votre demande a été traitée.
                    </Alert>
                    <Alert variant="warning" title="Attention">
                      Vérifiez les informations saisies.
                    </Alert>
                    <Alert variant="error" title="Erreur">
                      Une erreur est survenue.
                    </Alert>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <Flex wrap="wrap" className="gap-2">
                      <Badge>Défaut</Badge>
                      <Badge variant="success">Succès</Badge>
                      <Badge variant="error">Erreur</Badge>
                      <Badge variant="warning">Attention</Badge>
                      <Badge variant="info">Info</Badge>
                    </Flex>
                    <Flex wrap="wrap" className="gap-2">
                      <Tag>Simple</Tag>
                      <Tag variant="info">Info</Tag>
                      <Tag variant="success">Succès</Tag>
                      <Tag dismissible onDismiss={() => {}}>
                        Supprimable
                      </Tag>
                      <Tag pressable>Sélectionnable</Tag>
                    </Flex>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Accordéons</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="i1">
                        <AccordionTrigger>Qu'est-ce que le DSFR ?</AccordionTrigger>
                        <AccordionContent>
                          Le Système de Design de l'État (DSFR) est un ensemble de composants
                          réutilisables.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="i2">
                        <AccordionTrigger>Comment utiliser DSFRKit ?</AccordionTrigger>
                        <AccordionContent>
                          Il suffit d'installer le paquet et d'importer les composants nécessaires.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Divers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <Quote author="Victor Hugo" sourceItems={[{ label: 'Les Misérables' }]}>
                      La liberté commence où l'ignorance finit.
                    </Quote>
                    <Stepper
                      currentStep={2}
                      steps={[
                        { title: 'Identité' },
                        { title: 'Coordonnées' },
                        { title: 'Confirmation' },
                      ]}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Liens</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2 p-6">
                    <Link href="#">Lien par défaut</Link>
                    <Link href="#" variant="muted">
                      Lien atténué
                    </Link>
                    <Link href="https://www.service-public.gouv.fr/" external>
                      Lien externe
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pagination</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">10</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Container>
        </Section>

        {/* Actualités */}
        <Section size="sm">
          <Container size="xl">
            <Heading as="h2" size="5" className="mb-6">
              Actualités
            </Heading>
            <Grid className="md:grid-cols-3 gap-6">
              {[
                {
                  date: '15 mars 2025',
                  title: 'Nouveau formulaire de pré-demande',
                  desc: 'Le formulaire a été simplifié pour réduire le temps de saisie.',
                },
                {
                  date: '2 mars 2025',
                  title: "Extension des horaires d'ouverture",
                  desc: 'Les mairies ouvrent désormais le samedi matin.',
                },
                {
                  date: '18 février 2025',
                  title: 'Suivi en temps réel',
                  desc: 'Une notification SMS vous informe de chaque étape.',
                },
              ].map((a) => (
                <Card key={a.title}>
                  <CardContent className="p-5">
                    <Text size="1" className="text-foreground-muted mb-2">
                      {a.date}
                    </Text>
                    <CardTitle className="text-base mb-2">{a.title}</CardTitle>
                    <CardDescription>{a.desc}</CardDescription>
                  </CardContent>
                  <CardFooter className="px-5 pb-5">
                    <Link href="#">Lire la suite</Link>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      </main>

      <Follow>
        <FollowNewsletter>
          <FollowTitle>Abonnez-vous à notre lettre d'information</FollowTitle>
          <FollowDescription>
            Vous recevrez chaque semaine les dernières actualités.
          </FollowDescription>
          <Flex className="w-full mt-4 gap-2">
            <Input
              type="email"
              placeholder="Votre adresse courriel"
              className="flex-1 max-w-sm"
              aria-label="Votre adresse courriel"
            />
            <Button>S'abonner</Button>
          </Flex>
        </FollowNewsletter>
        <FollowSocial>
          <FollowTitle>Suivez-nous sur les réseaux sociaux</FollowTitle>
          <Flex className="gap-4 mt-2">
            <Button
              variant="tertiary"
              icon={<RiFacebookCircleFillIcon aria-hidden="true" />}
              aria-label="Facebook"
            />
            <Button
              variant="tertiary"
              icon={<RiTwitterXFillIcon aria-hidden="true" />}
              aria-label="X (Twitter)"
            />
            <Button
              variant="tertiary"
              icon={<RiInstagramFillIcon aria-hidden="true" />}
              aria-label="Instagram"
            />
            <Button
              variant="tertiary"
              icon={<RiLinkedinBoxFillIcon aria-hidden="true" />}
              aria-label="LinkedIn"
            />
            <Button
              variant="tertiary"
              icon={<RiYoutubeFillIcon aria-hidden="true" />}
              aria-label="YouTube"
            />
          </Flex>
        </FollowSocial>
      </Follow>

      <Footer>
        <FooterBody>
          <FooterBrand
            logo={<Logo size="md" />}
            description="Service public de délivrance des titres d'identité."
            href="/"
          />
          <FooterContent>
            <FooterLinks title="À propos">
              <Link href="#" className="text-sm">
                Missions
              </Link>
              <Link href="#" className="text-sm">
                Organisation
              </Link>
              <Link href="#" className="text-sm">
                Budget
              </Link>
            </FooterLinks>
            <FooterLinks title="Aide">
              <Link href="#" className="text-sm">
                FAQ
              </Link>
              <Link href="#" className="text-sm">
                Contact
              </Link>
              <Link href="#" className="text-sm">
                Accessibilité
              </Link>
            </FooterLinks>
            <FooterLinks title="Liens utiles">
              <Link href="#" className="text-sm">
                service-public.gouv.fr
              </Link>
              <Link href="#" className="text-sm">
                data.gouv.fr
              </Link>
            </FooterLinks>
          </FooterContent>
        </FooterBody>
        <FooterBottom>
          <FooterLegalLinks>
            <Link href="#" className="text-xs">
              Plan du site
            </Link>
            <Link href="#" className="text-xs">
              Mentions légales
            </Link>
            <Link href="#" className="text-xs">
              Données personnelles
            </Link>
            <Link href="#" className="text-xs">
              Accessibilité : partiellement conforme
            </Link>
          </FooterLegalLinks>
        </FooterBottom>
      </Footer>
    </Flex>
  )
}

/* ------------------------------------------------------------------ */
/*  LAYOUT DASHBOARD — application métier / back-office                */
/* ------------------------------------------------------------------ */

const dossiers = [
  {
    ref: 'DOS-2025-001',
    titre: "Demande d'autorisation environnementale",
    statut: 'Validé',
    statutVariant: 'success' as const,
    progression: 100,
    agent: 'ML',
    agentNom: 'Marie L.',
    date: '15/03/2025',
  },
  {
    ref: 'DOS-2025-002',
    titre: 'Instruction permis de construire',
    statut: 'En cours',
    statutVariant: 'warning' as const,
    progression: 65,
    agent: 'PD',
    agentNom: 'Pierre D.',
    date: '12/03/2025',
  },
  {
    ref: 'DOS-2025-003',
    titre: 'Déclaration préalable de travaux',
    statut: 'Nouveau',
    statutVariant: 'info' as const,
    progression: 10,
    agent: 'SM',
    agentNom: 'Sophie M.',
    date: '10/03/2025',
  },
  {
    ref: 'DOS-2025-004',
    titre: 'Recours gracieux – Refus PC',
    statut: 'Urgent',
    statutVariant: 'error' as const,
    progression: 30,
    agent: 'JD',
    agentNom: 'Jean D.',
    date: '08/03/2025',
  },
  {
    ref: 'DOS-2025-005',
    titre: "Certificat d'urbanisme opérationnel",
    statut: 'En cours',
    statutVariant: 'warning' as const,
    progression: 45,
    agent: 'ML',
    agentNom: 'Marie L.',
    date: '05/03/2025',
  },
]

/* Sidebar content — shared between desktop aside and mobile Sheet */
function SidebarContent() {
  return (
    <>
      <ScrollArea className="flex-1 w-full border-r-0">
        <Box className="p-4">
          <Navigation orientation="vertical">
            <NavigationSection title="Navigation" defaultOpen>
              <NavigationItem href="#" isActive>
                Vue d'ensemble
              </NavigationItem>
              <NavigationItem href="#">Dossiers</NavigationItem>
              <NavigationItem href="#">Agents</NavigationItem>
              <NavigationItem href="#">Calendrier</NavigationItem>
              <NavigationItem href="#">Statistiques</NavigationItem>
            </NavigationSection>
            <NavigationSection title="Administration">
              <NavigationItem href="#">Configuration</NavigationItem>
              <NavigationItem href="#">Rôles & droits</NavigationItem>
              <NavigationItem href="#">Journal d'audit</NavigationItem>
            </NavigationSection>
          </Navigation>
        </Box>
      </ScrollArea>
      <Box className="p-4 border-t border-border">
        <Flex align="center" className="gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Box className="flex-1 min-w-0">
            <Text size="2" weight="medium" className="truncate">
              Jean Dupont
            </Text>
            <Text size="1" className="text-foreground-muted truncate">
              Administrateur
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

function DashboardDemo() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Flex className="min-h-screen bg-background-alt">
      {/* ── Desktop sidebar (collapsible) ── */}
      <aside
        className={`flex-shrink-0 bg-background border-r border-border hidden md:flex flex-col transition-all duration-200 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden border-r-0'}`}
      >
        <Flex align="center" className="h-16 gap-3 px-4 border-b border-border shrink-0">
          <Flex
            align="center"
            justify="center"
            className="w-10 h-10 bg-primary text-primary-foreground rounded-lg font-bold text-lg"
          >
            App
          </Flex>
          <Flex direction="col" className="min-w-0">
            <Text as="span" size="2" weight="bold" className="leading-tight truncate">
              MonApplication
            </Text>
            <Text as="span" size="1" className="text-foreground-muted leading-tight truncate">
              Région Nouvelle-Aquitaine
            </Text>
          </Flex>
        </Flex>
        <SidebarContent />
      </aside>

      {/* ── Corps (header + contenu) ── */}
      <Flex direction="col" className="flex-1 min-w-0 overflow-hidden">
        <header className="sticky top-0 z-40 flex items-center gap-2 h-16 px-3 md:px-4 bg-background border-b border-border">
          {/* Mobile: Sheet sidebar trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-foreground hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Ouvrir le menu"
              >
                <RiMenuLineIcon size={20} aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 flex flex-col">
              <SheetHeader className="px-4 pt-12 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <Flex
                    align="center"
                    justify="center"
                    className="w-8 h-8 bg-primary text-primary-foreground rounded-lg font-bold text-sm"
                  >
                    App
                  </Flex>
                  MonApplication
                </SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Desktop: toggle sidebar */}
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:flex p-2 rounded-md text-foreground hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={sidebarOpen ? 'Réduire le menu' : 'Ouvrir le menu'}
          >
            {sidebarOpen ? (
              <RiLayoutLeftLineIcon size={20} aria-hidden="true" />
            ) : (
              <RiMenuLineIcon size={20} aria-hidden="true" />
            )}
          </button>

          {/* Search bar */}
          <Flex align="center" className="flex-1 min-w-0 px-1 md:px-4">
            <Button
              variant="secondary"
              className="relative w-full justify-start text-sm text-foreground-muted bg-background border border-border pr-16 h-9 md:h-10 px-3 md:px-4 py-2 hover:bg-background-contrast font-normal font-sans"
              onClick={() => setCommandOpen(true)}
            >
              <RiSearch2LineIcon size={16} className="shrink-0 opacity-50 mr-2 md:mr-3" />
              <Text as="span" className="truncate text-left">
                Rechercher un dossier, un agent...
              </Text>
              <Box className="pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] hidden h-5 select-none items-center gap-1 xl:flex">
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </Box>
            </Button>
          </Flex>

          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Rechercher un dossier, un agent, une action..." />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>Vue d'ensemble</CommandItem>
                <CommandItem>Dossiers</CommandItem>
                <CommandItem>Agents</CommandItem>
                <CommandItem>Statistiques</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Dossiers récents">
                <CommandItem>DOS-2025-001 — Autorisation environnementale</CommandItem>
                <CommandItem>DOS-2025-002 — Permis de construire</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions rapides">
                <CommandItem>
                  Nouveau dossier<CommandShortcut>Ctrl+N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Exporter les données<CommandShortcut>Ctrl+E</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <Flex align="center" className="shrink-0 h-full">
            <NotificationDropdown />
            <ThemeToggle size="lg" iconOnly variant="ghost" className="h-full" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 p-2 h-full px-3 rounded-none hover:bg-background-contrast transition-colors border-l border-border"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Box className="hidden lg:block text-left">
                    <Text size="2" className="font-medium text-foreground">
                      Jean Dupont
                    </Text>
                    <Text size="1" className="text-muted-foreground">
                      Administrateur
                    </Text>
                  </Box>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="min-w-[200px]">
                <Box className="px-4 py-3 border-b border-border">
                  <Text className="font-medium text-foreground">Jean Dupont</Text>
                  <Text size="2" className="text-muted-foreground">
                    Administrateur
                  </Text>
                </Box>
                <DropdownMenuItem>Mon profil</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Se déconnecter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </header>

        <main id="main-content" className="flex-1 flex flex-col min-w-0">
          <Box className="flex-1 p-4 md:p-6 overflow-auto">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Accueil</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Vue d'ensemble</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Titre + actions */}
            <Flex align="center" justify="between" className="mb-6">
              <Box>
                <Heading as="h1" size="5">
                  Vue d'ensemble
                </Heading>
                <Text size="2" className="text-foreground-muted mt-1">
                  Suivi des dossiers — Mars 2025
                </Text>
              </Box>
              <Flex align="center" className="gap-2">
                <Select defaultValue="mars">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="janvier">Janvier</SelectItem>
                    <SelectItem value="fevrier">Février</SelectItem>
                    <SelectItem value="mars">Mars</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="primary" size="sm">
                  Nouveau dossier
                </Button>
              </Flex>
            </Flex>

            {/* KPIs */}
            <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="p-6">
                <CardContent className="p-0">
                  <Text size="1" className="text-muted-foreground">
                    Dossiers actifs
                  </Text>
                  <Heading as="h3" size="5" className="mt-1">
                    567
                  </Heading>
                  <Badge variant="success" className="mt-2">
                    +12 %
                  </Badge>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <Text size="1" className="text-muted-foreground">
                    En attente
                  </Text>
                  <Heading as="h3" size="5" className="mt-1">
                    38
                  </Heading>
                  <Badge variant="warning" className="mt-2">
                    +3
                  </Badge>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <Text size="1" className="text-muted-foreground">
                    Taux de complétion
                  </Text>
                  <Heading as="h3" size="5" className="mt-1">
                    89 %
                  </Heading>
                </CardContent>
              </Card>
              <Card className="border-destructive p-6">
                <CardContent className="p-0">
                  <Text size="1" className="text-muted-foreground">
                    Urgents
                  </Text>
                  <Heading as="h3" size="5" className="mt-1">
                    7
                  </Heading>
                  <Badge variant="error" className="mt-2">
                    -2
                  </Badge>
                </CardContent>
              </Card>
            </Grid>

            <Separator className="my-6" />

            {/* Onglets */}
            <Tabs defaultValue="recents" className="w-full">
              <TabsList>
                <TabsTrigger value="recents">Dossiers récents</TabsTrigger>
                <TabsTrigger value="stats">Statistiques</TabsTrigger>
              </TabsList>

              <TabsContent value="recents">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Référence</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Progression</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Assigné à</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dossiers.map((d) => (
                          <TableRow key={d.ref}>
                            <TableCell className="font-medium font-mono text-xs">{d.ref}</TableCell>
                            <TableCell>{d.titre}</TableCell>
                            <TableCell>
                              <Badge variant={d.statutVariant}>{d.statut}</Badge>
                            </TableCell>
                            <TableCell>
                              <Flex align="center" className="gap-2">
                                <Progress value={d.progression} className="w-20" />
                                <Text
                                  as="span"
                                  size="1"
                                  className="text-foreground-muted tabular-nums"
                                >
                                  {d.progression} %
                                </Text>
                              </Flex>
                            </TableCell>
                            <TableCell>
                              <Text as="span" size="2" className="text-foreground-muted">
                                {d.date}
                              </Text>
                            </TableCell>
                            <TableCell>
                              <Flex align="center" className="gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-[10px]">{d.agent}</AvatarFallback>
                                </Avatar>
                                <Text as="span" size="2">
                                  {d.agentNom}
                                </Text>
                              </Flex>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <RiMore2LineIcon size={16} aria-hidden="true" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Voir le dossier</DropdownMenuItem>
                                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                                  <DropdownMenuItem>Réassigner</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Clôturer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Grid className="grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <CardTitle className="text-sm mb-4">Répartition par statut</CardTitle>
                      <Box className="space-y-3">
                        {[
                          { label: 'Validés', count: 342, color: 'bg-success', pct: 60 },
                          { label: 'En cours', count: 187, color: 'bg-warning', pct: 33 },
                          { label: 'Nouveaux', count: 31, color: 'bg-info', pct: 5 },
                          { label: 'Urgents', count: 7, color: 'bg-destructive', pct: 2 },
                        ].map((s) => (
                          <Box key={s.label}>
                            <Flex align="center" justify="between" className="mb-1">
                              <Flex align="center" className="gap-2">
                                <Box
                                  className={`inline-block h-2.5 w-2.5 rounded-full ${s.color}`}
                                />
                                <Text as="span" size="2">
                                  {s.label}
                                </Text>
                              </Flex>
                              <Flex align="center" className="gap-2">
                                <Tag>{s.count}</Tag>
                                <Text
                                  as="span"
                                  size="1"
                                  className="text-foreground-muted w-8 text-right"
                                >
                                  {s.pct} %
                                </Text>
                              </Flex>
                            </Flex>
                            <Progress value={s.pct} className="h-1.5" />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <CardTitle className="text-sm mb-4">Activité mensuelle</CardTitle>
                      <Box className="space-y-4">
                        {[
                          { label: 'Dossiers créés', value: 48, max: 60 },
                          { label: 'Dossiers clôturés', value: 35, max: 60 },
                          { label: 'Avis rendus', value: 52, max: 60 },
                          { label: 'Relances envoyées', value: 14, max: 60 },
                        ].map((s) => (
                          <Box key={s.label}>
                            <Flex justify="between" className="text-sm mb-1">
                              <Text as="span" size="2">
                                {s.label}
                              </Text>
                              <Text as="span" size="2" weight="bold" className="tabular-nums">
                                {s.value}
                              </Text>
                            </Flex>
                            <Progress value={(s.value / s.max) * 100} />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </TabsContent>
            </Tabs>
          </Box>
          {/* /content */}
        </main>
      </Flex>
      {/* /body */}
    </Flex>
  )
}

/* ------------------------------------------------------------------ */
/*  APP — sélecteur de layout                                          */
/* ------------------------------------------------------------------ */
function AppContent() {
  const [layout, setLayout] = useState<'standard' | 'dashboard'>('standard')

  return (
    <Box className="min-h-screen bg-background text-foreground">
      <Flex
        align="center"
        justify="center"
        className="gap-4 py-3 px-4 bg-background-contrast border-b border-border"
      >
        <Text as="span" size="2" weight="medium" className="text-foreground-muted">
          Layout (exemples de présentation DSFRKit) :
        </Text>
        <ButtonGroup
          type="single"
          value={layout}
          onValueChange={(v) => v && setLayout(v as 'standard' | 'dashboard')}
        >
          <ButtonGroupItem value="standard">Standard (vitrine)</ButtonGroupItem>
          <ButtonGroupItem value="dashboard">Dashboard (métier)</ButtonGroupItem>
        </ButtonGroup>
      </Flex>
      {layout === 'standard' ? <StandardDemo /> : <DashboardDemo />}
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
