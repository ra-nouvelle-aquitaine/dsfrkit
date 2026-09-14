const dsfrPreset = require('@dsfrkit/config').default

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [dsfrPreset],
  content: [
    './assets/**/*.{js,jsx,ts,tsx}',
    './templates/**/*.html.twig',
    // Classes utilisées par les composants de @dsfrkit/react (Symfony UX React)
    './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}',
  ],
}
