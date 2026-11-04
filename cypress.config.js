const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultBrowser: 'chrome',
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})