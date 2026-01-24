import { Box, Translate } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Branding/Translate',
  component: Translate,
  parameters: {
    docs: {
      description: {
        component: `Menu ou bouton de choix de langue du site.
`,
      },
    },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Box className="min-h-[200px]">
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Translate>

export default meta
type Story = StoryObj<typeof meta>

const languages = [
  { code: 'fr', label: 'Français', nativeLabel: 'FR' },
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'de', label: 'Deutsch', nativeLabel: 'DE' },
  { code: 'es', label: 'Español', nativeLabel: 'ES' },
]

export const Default: Story = {
  args: {
    currentLanguage: 'fr',
    languages,
    onLanguageChange: (code: string) => console.log('Language changed:', code),
  },
}

export const English: Story = {
  args: {
    currentLanguage: 'en',
    languages,
  },
}
