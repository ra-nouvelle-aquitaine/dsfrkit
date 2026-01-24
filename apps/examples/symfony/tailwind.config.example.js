import dsfrPreset from '@dsfrkit/config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsfrPreset],
  content: ['./assets/**/*.{js,jsx,ts,tsx}', './templates/**/*.html.twig'],
}
