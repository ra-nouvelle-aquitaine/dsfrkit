import {
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  FooterTop,
  Logo,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Pied de page DSFR (\`fr-footer\`).

**Typographie :** les tailles réduites sont celles du DSFR — 14px pour la description et les liens institutionnels, 12px pour les catégories du bandeau supérieur, les liens obligatoires et la mention de licence. Le bloc-marque, lui, est grand (\`<Logo size="lg" />\`).

**Composition :**
- \`FooterTop\` (facultatif) — bandeau gris de \`FooterLinks\` (catégories de liens) ;
- \`FooterBody\` — \`FooterBrand\` à gauche, \`FooterContent\` à droite. Sans enfants, \`FooterContent\` affiche les liens institutionnels obligatoires (info.gouv.fr, service-public.gouv.fr, legifrance.gouv.fr, data.gouv.fr) ;
- \`FooterBottom\` — \`FooterLegalLinks\` (plan du site, accessibilité, mentions légales, données personnelles, gestion des cookies) et \`copyright\` pour la mention de licence.

Les liens ne sont soulignés qu'au survol, comme dans le DSFR.

**Liens d'évitement :** \`Footer\` porte \`id="footer"\` par défaut, cible de « Aller au pied de page » dans \`SkipLinks\`.

**Composition 1.2 :** des \`FooterLinks\` placés dans \`FooterContent\` restent affichés en colonnes espacées ; préférez \`FooterTop\` pour suivre le DSFR.
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

const legalLinks = (
  <FooterLegalLinks>
    <a href="#plan">Plan du site</a>
    <a href="#accessibilite">Accessibilité : partiellement conforme</a>
    <a href="#mentions">Mentions légales</a>
    <a href="#donnees">Données personnelles</a>
    <a href="#cookies">Gestion des cookies</a>
  </FooterLegalLinks>
)

const copyright = (
  <p className="m-0">
    Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce
    site sont proposés sous{' '}
    <a
      href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
      target="_blank"
      rel="noopener external"
      title="Licence etalab - nouvelle fenêtre"
    >
      licence etalab-2.0
    </a>
  </p>
)

export const Default: Story = {
  name: 'Pied de page minimal',
  render: () => (
    <Footer>
      <FooterBody>
        <FooterBrand
          logo={<Logo size="lg" />}
          href="/"
          linkTitle="Retour à l’accueil du site - République Française"
        />
        <FooterContent description="Ce service vous accompagne dans vos démarches administratives en ligne : suivi de vos demandes, prise de rendez-vous et accès à vos documents." />
      </FooterBody>
      <FooterBottom copyright={copyright}>{legalLinks}</FooterBottom>
    </Footer>
  ),
}

export const WithNavigation: Story = {
  name: 'Pied de page avec navigation',
  render: () => (
    <Footer>
      <FooterTop>
        {['Démarches', 'Vie pratique', 'Actualités', 'Aide', 'Contact', 'À propos'].map(
          (category) => (
            <FooterLinks key={category} title={category}>
              <a href="#lien">Lien de navigation</a>
              <a href="#lien">Lien de navigation</a>
              <a href="#lien">Lien de navigation</a>
              <a href="#lien">Lien de navigation</a>
            </FooterLinks>
          )
        )}
      </FooterTop>
      <FooterBody>
        <FooterBrand
          logo={<Logo size="lg" serviceTitle={'Intitulé\nofficiel'} />}
          href="/"
          linkTitle="Retour à l’accueil du site - Intitulé officiel"
        />
        <FooterContent description="Ce service vous accompagne dans vos démarches administratives en ligne : suivi de vos demandes, prise de rendez-vous et accès à vos documents." />
      </FooterBody>
      <FooterBottom copyright={copyright}>{legalLinks}</FooterBottom>
    </Footer>
  ),
}

export const WithOperatorLogo: Story = {
  name: 'Pied de page avec logo opérateur',
  render: () => (
    <Footer>
      <FooterBody>
        <FooterBrand
          logo={<Logo size="lg" />}
          href="/"
          linkTitle="Retour à l’accueil du site - République Française"
          operatorLogo={
            <div
              className="flex h-[5.625rem] w-40 items-center justify-center bg-background-alt-blue-france text-sm text-muted-foreground"
              role="img"
              aria-label="Logo de l’opérateur"
            >
              Logo opérateur
            </div>
          }
        />
        <FooterContent description="Ce service vous accompagne dans vos démarches administratives en ligne : suivi de vos demandes, prise de rendez-vous et accès à vos documents." />
      </FooterBody>
      <FooterBottom copyright={copyright}>{legalLinks}</FooterBottom>
    </Footer>
  ),
}

export const CustomContentLinks: Story = {
  name: 'Liens de contenu personnalisés',
  render: () => (
    <Footer>
      <FooterBody>
        <FooterBrand logo={<Logo size="lg" />} href="/" />
        <FooterContent
          description="Plateforme académique de gestion des inscriptions."
          links={[
            { label: 'education.gouv.fr', href: 'https://www.education.gouv.fr', external: true },
            {
              label: 'service-public.gouv.fr',
              href: 'https://service-public.gouv.fr',
              external: true,
            },
            { label: 'Nous contacter', href: '/contact' },
          ]}
        />
      </FooterBody>
      <FooterBottom copyright="© Ministère de l’Éducation nationale">{legalLinks}</FooterBottom>
    </Footer>
  ),
}
