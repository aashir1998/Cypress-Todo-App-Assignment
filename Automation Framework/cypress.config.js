require('../node_modules/dotenv/lib/main').config();

const { defineConfig } = require('../node_modules/cypress/lib/cypress');

module.exports = defineConfig({
  reporter: '../node_modules/cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  requestTimeout: 120000,
  responseTimeout: 120000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  numTestsKeptInMemory: 1,

  env: {
    todoApiUrl: process.env.CYPRESS_TODO_API_URL,
    todoAppUrl: process.env.CYPRESS_TODO_APP_URL,
    grepFilterSpecs: true,
    grepOmitFiltered: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Essential plugins only
      require('../node_modules/@cypress/grep/src/plugin')(config);
      require('../node_modules/cypress-mochawesome-reporter/plugin')(on);

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0
    },

    baseUrl: process.env.CYPRESS_BASE_URL,

    // Test file patterns - simplified to catch all test files
    specPattern: ['cypress/e2e/**/*.cy.js']
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'cypress/component/**/*.cy.js'
  }
});
