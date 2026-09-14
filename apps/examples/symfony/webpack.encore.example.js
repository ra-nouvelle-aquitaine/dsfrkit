const Encore = require('@symfony/webpack-encore')

Encore.setOutputPath('public/build/')
  .setPublicPath('/build')
  // assets/app.js importe assets/styles/app.css : une seule entrée suffit.
  .addEntry('app', './assets/app.js')

  // Enable PostCSS loader for Tailwind
  .enablePostCssLoader()

  // Enable TypeScript
  .enableTypeScriptLoader()

  // Enable React (if using UX React)
  .enableReactPreset()

  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

module.exports = Encore.getWebpackConfig()
