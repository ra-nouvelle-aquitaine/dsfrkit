const Encore = require('@symfony/webpack-encore')

Encore.setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './assets/app.js')
  .addStyleEntry('app', './assets/styles/app.css')

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
