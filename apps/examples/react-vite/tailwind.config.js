import dsfrPreset from '@dsfrkit/config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsfrPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}',
  ],
}
