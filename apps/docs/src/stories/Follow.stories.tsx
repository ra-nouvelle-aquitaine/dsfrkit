import {
  RiFacebookCircleFillIcon,
  RiInstagramFillIcon,
  RiLinkedinBoxFillIcon,
  RiTwitterXFillIcon,
  RiYoutubeFillIcon,
} from '@dsfrkit/icons'
import {
  Button,
  Flex,
  Follow,
  FollowDescription,
  FollowNewsletter,
  FollowSocial,
  FollowTitle,
  Input,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Branding/Follow',
  component: Follow,
  parameters: {
    docs: {
      description: {
        component: `Composant de lettres d'information et réseaux sociaux incitant l'utilisateur à suivre les actualités du site.
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Follow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Follow>
      <FollowNewsletter>
        <FollowTitle>Abonnez-vous à notre lettre d’information</FollowTitle>
        <FollowDescription>
          Vous recevrez chaque semaine les dernières actualités du DSFR.
        </FollowDescription>
        <Flex className="w-full mt-4 gap-2">
          <Input
            type="email"
            placeholder="Votre adresse courriel (ex: nom@domaine.fr)"
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
  ),
}
