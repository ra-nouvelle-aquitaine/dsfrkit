import {
  RiAccountCircleLineIcon,
  RiLayoutLeftLineIcon,
  RiMenuLineIcon,
  RiMore2LineIcon,
  RiNotification3LineIcon,
  RiQuestionLineIcon,
  RiSearch2LineIcon,
  RiSearchLineIcon,
} from '@dsfrkit/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Artwork,
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
  FollowNewsletter,
  FollowNewsletterForm,
  FollowSocial,
  FollowSocialLink,
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  FooterTop,
  Grid,
  Header,
  HeaderActions,
  HeaderBody,
  HeaderBrand,
  HeaderNav,
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
  NavigationMegaMenu,
  NavigationMegaMenuCategory,
  NavigationMenu,
  NavigationSection,
  Notice,
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
  SkipLinks,
  Stepper,
  Summary,
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
  Toaster,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
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

const thematiques = [
  {
    title: 'Famille',
    links: ['Naissance', 'Mariage et PACS', 'Divorce et séparation', 'Aides aux familles'],
  },
  { title: 'Logement', links: ['Location', 'Achat immobilier', 'Aides au logement', 'Travaux'] },
  { title: 'Travail', links: ['Contrat de travail', 'Chômage', 'Formation', 'Retraite'] },
  {
    title: 'Papiers',
    links: ['Carte d’identité', 'Passeport', 'Permis de conduire', 'Carte grise'],
  },
]

const etapes = [
  {
    picto: 'document/document-add',
    title: 'Pré-demande en ligne',
    desc: 'Remplissez le formulaire en ligne et obtenez votre numéro de pré-demande.',
  },
  {
    picto: 'buildings/city-hall',
    title: 'Rendez-vous en mairie',
    desc: 'Présentez-vous avec vos pièces justificatives et votre numéro de pré-demande.',
  },
  {
    picto: 'document/document-search',
    title: 'Traitement du dossier',
    desc: 'Suivez l’avancement de votre dossier en temps réel via le portail.',
  },
  {
    picto: 'document/national-identity-card',
    title: 'Retrait du titre',
    desc: "Retirez votre carte d'identité dans un délai de 3 mois après sa mise à disposition.",
  },
]

function StandardDemo() {
  const [rangeValue, setRangeValue] = useState([50])
  const { toast } = useToast()

  return (
    <Flex direction="col" className="min-h-screen bg-background">
      <SkipLinks
        links={[
          { targetId: 'main-content', label: 'Contenu' },
          { targetId: 'main-navigation', label: 'Menu' },
          { targetId: 'footer', label: 'Pied de page' },
        ]}
      />

      {/* En-tête DSFR : bloc-marque, accès rapides et recherche, puis navigation principale */}
      <Header>
        <HeaderBody>
          <HeaderBrand
            logo={<Logo size="md" />}
            serviceTitle="Service Public"
            serviceTagline="Direction générale de l'administration"
            href="/"
          />
          <HeaderActions className="hidden lg:flex lg:flex-col lg:items-end">
            <Flex align="center" className="gap-2">
              <Button variant="ghost" size="sm" icon={<RiQuestionLineIcon />}>
                Aide
              </Button>
              <Button variant="ghost" size="sm" icon={<RiAccountCircleLineIcon />}>
                Mon compte
              </Button>
              <ThemeToggle iconOnly variant="ghost" size="sm" />
            </Flex>
            {/* biome-ignore lint/a11y/useSemanticElements: l'élément <search> n'est pas typé par React 18 ; role="search" expose le repère de recherche, comme dans le DSFR. */}
            <form
              role="search"
              className="w-80"
              onSubmit={(event) => {
                event.preventDefault()
                toast({ title: 'Recherche lancée' })
              }}
            >
              <Input
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher sur le site"
                action={
                  <Button type="submit" icon={<RiSearchLineIcon />} aria-label="Rechercher" />
                }
              />
            </form>
          </HeaderActions>
          <HeaderNav>
            <Navigation id="main-navigation" aria-label="Menu principal">
              <NavigationItem href="#" isActive>
                Accueil
              </NavigationItem>
              <NavigationMenu title="Mes démarches">
                <NavigationItem href="#">Suivre une démarche</NavigationItem>
                <NavigationItem href="#">Prendre rendez-vous</NavigationItem>
                <NavigationItem href="#">Mes documents</NavigationItem>
                <NavigationItem href="#">Mes paiements</NavigationItem>
              </NavigationMenu>
              <NavigationMegaMenu
                title="Thématiques"
                leader={{
                  title: 'Toutes les thématiques',
                  description:
                    'Retrouvez les démarches administratives classées par grand thème de la vie quotidienne.',
                  link: { label: 'Voir toute la rubrique', href: '#' },
                }}
              >
                {thematiques.map((categorie) => (
                  <NavigationMegaMenuCategory
                    key={categorie.title}
                    title={categorie.title}
                    href="#"
                  >
                    {categorie.links.map((lien) => (
                      <NavigationItem key={lien} href="#">
                        {lien}
                      </NavigationItem>
                    ))}
                  </NavigationMegaMenuCategory>
                ))}
              </NavigationMegaMenu>
              <NavigationMenu title="Actualités">
                <NavigationItem href="#">Communiqués de presse</NavigationItem>
                <NavigationItem href="#">Agenda</NavigationItem>
                <NavigationItem href="#">Dossiers thématiques</NavigationItem>
              </NavigationMenu>
              <NavigationItem href="#">Contact</NavigationItem>
            </Navigation>
          </HeaderNav>
        </HeaderBody>
      </Header>

      <Notice
        variant="warning"
        title="Maintenance programmée"
        link={{ label: 'Voir les services concernés', href: '#' }}
        closable
      >
        Le service de pré-demande sera indisponible dimanche de 2h à 6h.
      </Notice>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
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
                icon={<Artwork name="digital/application" size={80} />}
                href="#"
              />
              <Tile
                title="Pièces justificatives"
                description="Consultez la liste des documents nécessaires selon votre situation."
                icon={<Artwork name="document/document" size={80} />}
                href="#"
              />
              <Tile
                title="Prendre rendez-vous"
                description="Trouvez un créneau disponible dans la mairie de votre choix."
                icon={<Artwork name="digital/calendar" size={80} />}
                href="#"
              />
            </TileGrid>
          </Container>
        </Section>

        {/* Contenu éditorial avec sommaire */}
        <Section size="sm">
          <Container size="xl">
            <Grid columns="1" className="gap-8 md:grid-cols-12">
              <Box className="md:col-span-4">
                <Summary
                  title="Sur cette page"
                  items={[
                    { label: 'Comment ça marche ?', href: '#comment-ca-marche' },
                    {
                      label: 'Avant de commencer',
                      href: '#avant-de-commencer',
                      items: [
                        { label: 'Coût', href: '#cout' },
                        { label: 'Besoin d’aide', href: '#aide' },
                      ],
                    },
                    { label: 'Questions fréquentes', href: '#faq' },
                  ]}
                />
              </Box>
              <Box className="space-y-10 md:col-span-8">
                <section className="space-y-6">
                  <Heading as="h2" size="5" id="comment-ca-marche" className="scroll-mt-4">
                    Comment ça marche ?
                  </Heading>
                  <ol className="m-0 list-none space-y-6 p-0">
                    {etapes.map((etape, index) => (
                      <li key={etape.title}>
                        <Flex align="start" className="gap-4">
                          <Artwork name={etape.picto} size={64} className="shrink-0" />
                          <Box>
                            <Heading as="h3" size="3" className="m-0">
                              {index + 1}. {etape.title}
                            </Heading>
                            <Text className="text-foreground-muted">{etape.desc}</Text>
                          </Box>
                        </Flex>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="space-y-6">
                  <Heading as="h2" size="5" id="avant-de-commencer" className="scroll-mt-4">
                    Avant de commencer
                  </Heading>
                  <Callout accent="info" title="Coût" id="cout" titleMarkup="h3">
                    La carte nationale d'identité est gratuite en cas de première demande ou de
                    renouvellement. En cas de perte ou de vol, un timbre fiscal de 25 € est requis.
                  </Callout>
                  <Card id="aide">
                    <CardHeader>
                      <CardTitle as="h3">Besoin d'aide ?</CardTitle>
                      <CardDescription>Contactez le centre d'appels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Text size="4" weight="bold" className="text-primary">
                        34 00
                      </Text>
                      <Text size="1" className="text-foreground-muted">
                        Service gratuit + prix d'un appel
                      </Text>
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-6">
                  <Heading as="h2" size="5" id="faq" className="scroll-mt-4">
                    Questions fréquentes
                  </Heading>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="delai">
                      <AccordionTrigger>Quel est le délai de fabrication ?</AccordionTrigger>
                      <AccordionContent>
                        Comptez environ 3 semaines après le rendez-vous en mairie. Les délais
                        peuvent s'allonger avant les périodes de vacances.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mineur">
                      <AccordionTrigger>
                        Mon enfant mineur peut-il faire la demande ?
                      </AccordionTrigger>
                      <AccordionContent>
                        Oui, en présence d'un parent exerçant l'autorité parentale, qui signe la
                        demande.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
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
                    <CardTitle>Formulaire de contact</CardTitle>
                    <CardDescription>
                      Libellés, aides et messages sont portés par les composants de saisie.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(event) => {
                        event.preventDefault()
                        toast({
                          title: 'Message envoyé',
                          description: 'Nous vous répondrons sous 48 heures.',
                          variant: 'success',
                        })
                      }}
                    >
                      <Input label="Nom" autoComplete="family-name" required />
                      <Input
                        label="Adresse électronique"
                        hint="Format attendu : nom@domaine.fr"
                        type="email"
                        autoComplete="email"
                        required
                      />
                      <Box className="space-y-2">
                        <label htmlFor="contact-motif" className="block text-base leading-6">
                          Motif de la demande
                        </label>
                        <Select>
                          <SelectTrigger id="contact-motif">
                            <SelectValue placeholder="Sélectionnez un motif" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demarche">Question sur une démarche</SelectItem>
                            <SelectItem value="technique">Problème technique</SelectItem>
                          </SelectContent>
                        </Select>
                      </Box>
                      <Textarea label="Message" rows={3} />
                      <fieldset className="m-0 border-0 p-0">
                        <legend id="contact-profil" className="mb-3 text-base leading-6">
                          Vous êtes
                        </legend>
                        <RadioGroup
                          aria-labelledby="contact-profil"
                          defaultValue="particulier"
                          className="flex flex-row gap-6"
                        >
                          <RadioGroupItem value="particulier" label="Un particulier" />
                          <RadioGroupItem value="professionnel" label="Un professionnel" />
                        </RadioGroup>
                      </fieldset>
                      <fieldset className="m-0 border-0 p-0">
                        <legend id="contact-rappel" className="mb-3 text-base leading-6">
                          Comment souhaitez-vous être recontacté ?
                        </legend>
                        <RadioGroup
                          aria-labelledby="contact-rappel"
                          defaultValue="courriel"
                          className="grid gap-4 md:grid-cols-2"
                        >
                          <RadioGroupItem
                            value="courriel"
                            label="Par courriel"
                            pictogram={<Artwork name="digital/mail-send" size={56} />}
                          />
                          <RadioGroupItem
                            value="rendez-vous"
                            label="En rendez-vous"
                            hint="Au guichet de votre mairie"
                            pictogram={<Artwork name="digital/calendar" size={56} />}
                          />
                        </RadioGroup>
                      </fieldset>
                      <Range
                        label="Degré d'urgence"
                        value={rangeValue}
                        onValueChange={setRangeValue}
                        min={0}
                        max={100}
                        step={1}
                        showValue
                        formatValue={(v) => `${v} %`}
                      />
                      <Toggle label="Recevoir la copie du message" />
                      <Checkbox label="J'accepte que mes données soient utilisées pour traiter ma demande" />
                      <Button type="submit">Envoyer</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overlays" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Modales</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row flex-wrap gap-4">
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
                    <Button
                      variant="secondary"
                      onClick={() => toast({ title: 'Brouillon enregistré', variant: 'success' })}
                    >
                      Afficher un toast
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Consentement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConsentBannerDemo />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Infobulles</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-4">
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
                  <CardContent className="space-y-4">
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
                  <CardContent className="space-y-4">
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
                    <CardTitle>Citation et indicateur d'étapes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                  <CardContent className="flex flex-col space-y-2">
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
                  <CardContent>
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
            <Grid columns="1" className="gap-6 md:grid-cols-3">
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
                  <CardHeader>
                    <Text size="1" className="m-0 text-foreground-muted">
                      {a.date}
                    </Text>
                    <CardTitle as="h3">{a.title}</CardTitle>
                    <CardDescription>{a.desc}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href="#">Lire la suite</Link>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      </main>

      <Follow>
        <FollowNewsletter
          title="Abonnez-vous à notre lettre d'information"
          description="Vous recevrez chaque semaine les dernières actualités."
        >
          <FollowNewsletterForm
            onSubmit={() => toast({ title: 'Inscription enregistrée', variant: 'success' })}
          />
        </FollowNewsletter>
        <FollowSocial>
          <FollowSocialLink network="facebook" href="https://www.facebook.com" />
          <FollowSocialLink network="twitter-x" href="https://x.com" />
          <FollowSocialLink network="instagram" href="https://www.instagram.com" />
          <FollowSocialLink network="linkedin" href="https://www.linkedin.com" />
          <FollowSocialLink network="youtube" href="https://www.youtube.com" />
        </FollowSocial>
      </Follow>

      <Footer id="footer">
        <FooterTop>
          <FooterLinks title="Démarches" titleAs="h2">
            <a href="#identite">Carte d'identité</a>
            <a href="#passeport">Passeport</a>
            <a href="#permis">Permis de conduire</a>
          </FooterLinks>
          <FooterLinks title="À propos" titleAs="h2">
            <a href="#missions">Missions</a>
            <a href="#organisation">Organisation</a>
            <a href="#budget">Budget</a>
          </FooterLinks>
          <FooterLinks title="Aide" titleAs="h2">
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </FooterLinks>
        </FooterTop>
        <FooterBody>
          <FooterBrand
            logo={<Logo size="lg" />}
            href="/"
            linkTitle="Retour à l’accueil du site - Service Public"
          />
          <FooterContent description="Service public de délivrance des titres d'identité : pré-demande en ligne, prise de rendez-vous et suivi de votre dossier." />
        </FooterBody>
        <FooterBottom copyright="Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous licence etalab-2.0">
          <FooterLegalLinks>
            <a href="#plan">Plan du site</a>
            <a href="#accessibilite">Accessibilité : partiellement conforme</a>
            <a href="#mentions">Mentions légales</a>
            <a href="#donnees">Données personnelles</a>
            <a href="#cookies">Gestion des cookies</a>
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
          <Logo size="sm" showMotto={false} />
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
              <Button
                variant="ghost"
                className="md:hidden"
                icon={<RiMenuLineIcon />}
                aria-label="Ouvrir le menu"
              />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 flex flex-col">
              <SheetHeader className="px-4 pt-12 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <Logo size="sm" showMotto={false} />
                  MonApplication
                </SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Desktop: toggle sidebar */}
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:inline-flex"
            icon={sidebarOpen ? <RiLayoutLeftLineIcon /> : <RiMenuLineIcon />}
            aria-label={sidebarOpen ? 'Réduire le menu' : 'Ouvrir le menu'}
            aria-expanded={sidebarOpen}
          />

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
                <Button variant="ghost" className="h-full gap-2 border-l border-border px-3">
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
                </Button>
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
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={<RiMore2LineIcon />}
                                    aria-label={`Actions pour le dossier ${d.ref}`}
                                  />
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
      {/* Une seule fois, à la racine : affiche les notifications de toast() */}
      <Toaster />
    </ThemeProvider>
  )
}

export default App
