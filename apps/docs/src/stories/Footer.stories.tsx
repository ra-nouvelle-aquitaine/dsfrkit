import {
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  Link,
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
        component: `
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Footer>
  <FooterBody>
    <FooterBrand logo={<Logo size="sm" />} description="Service public numérique" href="/" />
    <FooterContent>
      <FooterLinks title="Liens utiles">
        <Link href="#" className="font-normal text-foreground w-fit text-sm">Plan du site</Link>
        <Link href="#" className="font-normal text-foreground w-fit text-sm">Accessibilité</Link>
        <Link href="#" className="font-normal text-foreground w-fit text-sm">Mentions légales</Link>
      </FooterLinks>
      <FooterLinks title="Aide">
        <Link href="#" className="font-normal text-foreground w-fit text-sm">FAQ</Link>
        <Link href="#" className="font-normal text-foreground w-fit text-sm">Contact</Link>
      </FooterLinks>
    </FooterContent>
  </FooterBody>
  <FooterBottom>
    <FooterLegalLinks>
      <Link href="#" className="font-normal text-foreground w-fit text-xs">Accessibilité : partiellement conforme</Link>
      <Link href="#" className="font-normal text-foreground w-fit text-xs">Mentions légales</Link>
      <Link href="#" className="font-normal text-foreground w-fit text-xs">Données personnelles</Link>
      <Link href="#" className="font-normal text-foreground w-fit text-xs">Gestion des cookies</Link>
    </FooterLegalLinks>
  </FooterBottom>
</Footer>
        `.trim(),
      },
    },
  },
  render: () => (
    <Footer>
      <FooterBody>
        <FooterBrand logo={<Logo size="sm" />} description="Service public numérique" href="/" />
        <FooterContent>
          <FooterLinks title="Liens utiles">
            <Link href="#" className="font-normal text-foreground w-fit text-sm">
              Plan du site
            </Link>
            <Link href="#" className="font-normal text-foreground w-fit text-sm">
              Accessibilité
            </Link>
            <Link href="#" className="font-normal text-foreground w-fit text-sm">
              Mentions légales
            </Link>
          </FooterLinks>
          <FooterLinks title="Aide">
            <Link href="#" className="font-normal text-foreground w-fit text-sm">
              FAQ
            </Link>
            <Link href="#" className="font-normal text-foreground w-fit text-sm">
              Contact
            </Link>
          </FooterLinks>
        </FooterContent>
      </FooterBody>
      <FooterBottom>
        <FooterLegalLinks>
          <Link href="#" className="font-normal text-foreground w-fit text-xs">
            Accessibilité : partiellement conforme
          </Link>
          <Link href="#" className="font-normal text-foreground w-fit text-xs">
            Mentions légales
          </Link>
          <Link href="#" className="font-normal text-foreground w-fit text-xs">
            Données personnelles
          </Link>
          <Link href="#" className="font-normal text-foreground w-fit text-xs">
            Gestion des cookies
          </Link>
        </FooterLegalLinks>
      </FooterBottom>
    </Footer>
  ),
}
